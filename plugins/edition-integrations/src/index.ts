/**
 * edition-integrations — Quartz v5 transformer plugin.
 *
 * Injects, site-wide via externalResources().additionalHead:
 *   1. The design values from design.yaml (src/design.ts): colours and fonts,
 *      which override the config's theme block, the --tb-* tokens, the type
 *      scale and measure, the annotation highlight and print styles
 *   2. Hypothes.is client, sidebar collapsed — same first-party flow as the
 *      canonical site's publish.js
 *   3. Plausible per-site script (pa-*.js), stock configuration, behind a
 *      hostname guard when `siteDomain` is set
 *   4. window.tbTrack() for custom events, the annotation tag helper and the
 *      annotation badge, ported from book one's publish.js (src/runtime.ts)
 *
 *   5. Paragraph numbers' style and toggle, and the page-views count
 *      (src/runtime.ts)
 *
 * and applies four HTML transforms to every page (src/transforms.ts):
 *   - same-page citations `#^id` point at the reference they name
 *   - the paragraph right after the first H1 is marked as the lead
 *   - with no frontmatter title, the first H1 becomes the page's title
 *   - body paragraphs are numbered (data-pnum), every page but the home page
 *
 * Editions run with enableSPA: false, so every navigation is a full page load and
 * every head script runs again from scratch. Both integrations are therefore plain
 * one-shot head injections: no re-injection on navigation, no persistence of client
 * state across a route swap, no custom pageview firing.
 *
 * Scaffolding: this file replaces src/index.ts in a fresh clone of
 * github.com/quartz-community/plugin-template. Keep the template's
 * tsup.config.ts / tsconfig.json untouched. In package.json change only:
 *   "name": "edition-integrations",
 *   "description": "Textbook edition theme + Hypothes.is + Plausible",
 *   "quartz": { "category": ["transformer"] }
 * Then: npm i && npm run build — and COMMIT dist/ (v5 plugins ship pre-built).
 *
 * No JSX on purpose: h() calls keep the template's src/index.ts entry intact.
 */
import { h } from "preact";
import type { VNode } from "preact";
import type { QuartzTransformerPlugin } from "@quartz-community/types";
import { designCss, fontHref, loadDesign } from "./design";
import {
  fixBlockRefLinks,
  markLeadParagraph,
  numberParagraphs,
  titleFromFirstHeading,
  wantsParagraphNumbers,
} from "./transforms";
import type { HastNode, PageData } from "./transforms";
import {
  analyticsLoader,
  annotationBadge,
  noTracking,
  pageViews,
  paragraphNumbers,
  tagHelper,
  trackRuntime,
} from "./runtime";

interface Options {
  /** Per-edition Plausible script src (https://plausible.io/js/pa-….js). "" disables analytics. */
  plausibleScriptSrc: string;
  /**
   * The one hostname Plausible counts on. When set, any other host (a
   * *.pages.dev preview, localhost) loads no Plausible script and sends no
   * event, not even a pageview. "" (the default) counts on every host, as
   * editions always have.
   */
  siteDomain: string;
  /** The "Tag your annotation" panel beside the open Hypothes.is sidebar. */
  tagHelper: boolean;
  /** The per-page annotation count, which opens the sidebar. */
  annotationBadge: boolean;
  /**
   * Paragraph numbers (¶) in the margin of every page but the home page, with
   * a toggle in the controls row that each reader's browser remembers.
   */
  paragraphNumbers: boolean;
  /**
   * The page-views endpoint (suggest-edit-function's /api/page-views), for the
   * "n views" count in the controls row. "" shows no count.
   */
  viewsEndpoint: string;
  /** The book's registry slug, which the views endpoint is asked about. */
  bookSlug: string;
  /** Hypothes.is group ID — inert: it would only take effect if the commented services block below were enabled, and that is unused by decision (Publisher tier not bought, R1 closed). */
  hypothesisGroupId: string;
}

const defaultOptions: Options = {
  plausibleScriptSrc: "",
  siteDomain: "",
  tagHelper: true,
  annotationBadge: true,
  paragraphNumbers: true,
  viewsEndpoint: "",
  bookSlug: "",
  hypothesisGroupId: "",
};

// --- 1. Design values --------------------------------------------------------
// design.yaml, beside dist/, read now (when the book builds): the palette and
// fonts (overriding the config's theme block), the --tb-* tokens, the type
// scale, the lead paragraph, the annotation highlight and print (src/design.ts).

// --- 2. Hypothes.is -----------------------------------------------------------
// Quartz editions match the canonical site: public, first-party annotation always
// loads, and that is the final arrangement — per-cohort isolation was considered
// and not adopted. Group-locking is therefore unused by decision rather than a
// pending upgrade. The embed loads unconditionally (mirroring publish.js), and an
// unset or placeholder group id falls through quietly, leaving public annotation
// active. The group-id plumbing below is kept as documented dead code.
const HYPOTHESIS_GROUP_PLACEHOLDER = "GROUP_ID";

// A configured hypothesisGroupId counts as "real" only when it's non-empty and not
// a scaffolding placeholder left unfilled by the edition build (e.g. "" or a
// "__TOKEN__"-style token). Anything else means "no group configured".
const isRealGroupId = (groupId: string): boolean => {
  const trimmed = groupId.trim();
  return trimmed.length > 0 && !/^__.*__$/.test(trimmed);
};

const hypothesisConfig = (groupId: string) => {
  // The Publisher-tier seam below is commented out and unused by decision, so this
  // value is only ever interpolated into a comment. A real group id is echoed as-is;
  // anything else keeps a neutral placeholder. Public first-party annotation loads
  // either way.
  const group = isRealGroupId(groupId) ? groupId.trim() : HYPOTHESIS_GROUP_PLACEHOLDER;
  return `
window.hypothesisConfig = function () {
  return {
    // First-party flow: sidebar collapsed, highlights always visible — same as the
    // canonical site's publish.js.
    openSidebar: false,
    showHighlights: 'always',
    // R1 hook — per-edition group locking. UNUSED BY DECISION: the Publisher
    // tier will not be bought, so this is a record of the shape the swap would
    // have taken, not a step waiting to be taken. It needs Publisher-tier /
    // third-party auth; the services array 404s on the standard account tier
    // (verified, hypothesis-spike-baseline.md). Do not uncomment:
    //
    // services: [{
    //   apiUrl: "https://hypothes.is/api/",
    //   authority: "YOUR_AUTHORITY",
    //   grantToken: "GENERATED_PER_USER",
    //   groups: ["${group}"],
    // }],
  }
}
`;
};

// --- 3. Plausible (per-site script) -------------------------------------------
// Queue stub first so calls made before pa-*.js lands are buffered, then init with
// stock options. autoCapturePageviews defaults to true, which fires exactly one
// pageview when the script loads — correct here, because with enableSPA: false
// every navigation is a full page load. (This used to be autocapture OFF plus a
// manual, deduped plausible("pageview") on Quartz's "nav" event, which existed
// solely because autocapture can't see client-side routing. There is no
// client-side routing any more, so the stock behaviour is the right one.) If
// Plausible's dashboard snippet ever changes its init signature, mirror the
// dashboard here.
const plausibleInit = `
window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) }
window.plausible.init = window.plausible.init || function (o) { window.plausible.o = o || {} }
window.plausible.init()
`;

// --- 4. Hypothes.is loader ----------------------------------------------------
// Editions run with enableSPA: false, so a navigation is a full page load: the
// document — and with it the Hypothes.is client — is torn down and rebuilt from
// the incoming HTML, and this head script runs again on the new page. That makes
// the whole job "boot the client once per page load", which is all embed.js needs.
//
// This deliberately replaces a much larger runtime that kept the client alive
// across Quartz's client-side router (tagging its head elements [data-persist] on
// `prenav` so the router's head wipe passed over them, plus a health check and
// sweep on `nav`). That machinery fought a framework internal — the router's
// private [data-persist] contract and the exact ordering of its wipe — to work
// around SPA navigation destroying the client. Turning enableSPA off removes the
// problem it was solving, and full page loads are the cheaper trade than
// maintaining persistence code against Quartz's internals.
//
// It runs as an inline <head> script, i.e. during parse, so window.hypothesisConfig
// (set by the sibling script above) is already in place when embed.js boots. The
// tag is appended rather than emitted statically only so the run-once guard has
// something to guard.
const hypothesisLoader = `
;(function () {
  // Run-once guard: exactly one embed.js per page load. A second client's
  // connection is refused by the host frame ("Ignoring second request from
  // Hypothesis sidebar to connect to host frame"), leaving a present-but-dead
  // sidebar — so guard even though nothing should evaluate this twice.
  if (window.__editionIntegrations) return
  window.__editionIntegrations = true

  var s = document.createElement("script")
  s.async = true
  s.src = "https://hypothes.is/embed.js"
  s.setAttribute("data-edition-hypothesis", "")
  document.head.appendChild(s)
})()
`;

export const EditionIntegrations: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts };
  // Read once per build. A bad or missing file stops the build, naming the key.
  const design = loadDesign();
  return {
    name: "EditionIntegrations",
    // Runs after every markdown plugin, so note-properties has already filled
    // in the filename as a fallback title, and the table of contents exists.
    htmlPlugins() {
      return [
        () => (tree: unknown, file: { value?: unknown; data: unknown }) => {
          const data = file.data as PageData;
          fixBlockRefLinks(tree as HastNode);
          markLeadParagraph(tree as HastNode);
          titleFromFirstHeading(tree as HastNode, data, String(file.value ?? ""));
          // After the title: the H1 that became the title is gone by now.
          if (opts.paragraphNumbers && wantsParagraphNumbers(data.slug, data.frontmatter))
            numberParagraphs(tree as HastNode);
        },
      ];
    },
    externalResources() {
      const head: VNode[] = [
        h("link", { rel: "stylesheet", href: fontHref(design) }) as VNode,
        h("style", { dangerouslySetInnerHTML: { __html: designCss(design) } }) as VNode,
        h("script", {
          dangerouslySetInnerHTML: { __html: hypothesisConfig(opts.hypothesisGroupId) },
        }) as VNode,
      ];
      const script = (js: string) =>
        h("script", { dangerouslySetInnerHTML: { __html: js } }) as VNode;
      if (opts.plausibleScriptSrc && opts.siteDomain) {
        head.push(script(analyticsLoader(opts.plausibleScriptSrc, opts.siteDomain)));
      } else if (opts.plausibleScriptSrc) {
        head.push(
          script(plausibleInit),
          h("script", { async: true, src: opts.plausibleScriptSrc }) as VNode,
        );
      }
      // With no analytics configured, events go nowhere, but the helpers can
      // still call tbTrack() without checking.
      head.push(script(opts.plausibleScriptSrc ? trackRuntime : noTracking));
      if (opts.tagHelper) head.push(script(tagHelper));
      if (opts.annotationBadge) head.push(script(annotationBadge));
      if (opts.paragraphNumbers) head.push(script(paragraphNumbers));
      if (opts.viewsEndpoint && opts.bookSlug)
        head.push(script(pageViews(opts.viewsEndpoint, opts.bookSlug)));
      // Last, so window.hypothesisConfig above is already set when embed.js boots.
      head.push(h("script", { dangerouslySetInnerHTML: { __html: hypothesisLoader } }) as VNode);
      return { additionalHead: head };
    },
  };
};

export default EditionIntegrations;
