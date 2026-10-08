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
 *   5. Paragraph numbers' style and click-to-link (src/runtime.ts)
 *   6. The reader's Appearance settings, applied before first paint, and the
 *      public-annotations switch (readerPrefs, annotationsControl in src/runtime.ts);
 *      the header that changes them is edit-on-github's
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
  annotationsControl,
  annotationRoom,
  annotationSheet,
  breakpointBand,
  explorerFollowsContents,
  explorerKeepsPageStill,
  noTracking,
  phoneMenuStartsClosed,
  privacyNotice,
  paragraphNumbers,
  readerPrefs,
  tagHelper,
  targetFlash,
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
   * true (the default, editions): Hypothes.is's public layer, as on hypothes.is.
   * false (books): no public layer. Readers see and post only in the groups
   * below; until hypothesisGroupId is set, the client isn't loaded at all.
   */
  publicAnnotations: boolean;
  /**
   * With publicAnnotations false: a restricted Hypothes.is group (anyone reads,
   * members post) that every reader's client loads. It is what keeps Public out:
   * the client's groupsAllowlist only takes effect when a listed group loaded,
   * and a reader who isn't in any class group has no other. "" (the default):
   * the client isn't loaded.
   */
  hypothesisGroupId: string;
  /** With publicAnnotations false: class groups readers may also use (members only). */
  hypothesisGroups: string[];
  /**
   * The book's reading order, as slugs ("chapters/introduction"): the links
   * under "## Contents" in its index.md, which the builder reads. The
   * explorer lists pages in this order. [] (the default) keeps its own.
   */
  explorerOrder: string[];
  /**
   * The platform's Privacy page. Set: the first-visit privacy notice links to it
   * (privacyNotice). "" (the default): no notice.
   */
  privacyUrl: string;
}

const defaultOptions: Options = {
  plausibleScriptSrc: "",
  siteDomain: "",
  tagHelper: true,
  annotationBadge: true,
  paragraphNumbers: true,
  publicAnnotations: true,
  hypothesisGroupId: "",
  hypothesisGroups: [],
  explorerOrder: [],
  privacyUrl: "",
};

// --- 1. Design values --------------------------------------------------------
// design.yaml, beside dist/, read now (when the book builds): the palette and
// fonts (overriding the config's theme block), the --tb-* tokens, the type
// scale, the lead paragraph, the annotation highlight and print (src/design.ts).

// --- 2. Hypothes.is -----------------------------------------------------------
// Editions keep Hypothes.is's public layer (publicAnnotations, the default).
// Books turn it off. What the real client does (hypothesis/client, checked
// against hypothes.is on 08 Oct 2026):
//   - groupsAllowlist alone doesn't hide Public: when none of the listed groups
//     loaded, the client drops the filter and shows every group, Public included.
//   - `group` makes the client fetch that group by id even for a reader who is
//     logged out or not a member; a restricted group is world-readable, so it
//     always loads, the allowlist then holds, and Public isn't offered, read,
//     highlighted or postable (a direct link to a public annotation included).
//     The client reads `group` only from the JSON config script (or a
//     #annotations:group: fragment), never from window.hypothesisConfig: there
//     it is ignored and Public comes back (hypothesisGroupJson).
//   - `services` without a grant token hands login to the host page: no one
//     could sign in. Not used.
// So "groups" mode needs the restricted group (hypothesisGroupId); without it a
// book loads no client ("off"), which is the only other way to keep Public out.
type AnnotationMode = "public" | "groups" | "off";

// A configured id counts as real only when it's non-empty and not a scaffolding
// placeholder left unfilled by an edition build (e.g. "__TOKEN__").
const isRealGroupId = (groupId: string): boolean => {
  const trimmed = groupId.trim();
  return trimmed.length > 0 && !/^__.*__$/.test(trimmed);
};

export const annotationMode = (opts: Pick<Options, "publicAnnotations" | "hypothesisGroupId">): AnnotationMode =>
  opts.publicAnnotations ? "public" : isRealGroupId(opts.hypothesisGroupId) ? "groups" : "off";

export const hypothesisConfig = (mode: AnnotationMode, anchor = "", groups: string[] = []) => {
  const only =
    mode === "groups"
      ? `
    // No public layer: the anchor group (restricted; its \`group\` is in the JSON
    // config) and the class groups only. Highlights start off; the sidebar's eye
    // turns them on.
    groupsAllowlist: ${JSON.stringify([anchor.trim(), ...groups.filter(isRealGroupId).map((g) => g.trim())])},
    showHighlights: 'never',`
      : `
    // Public layer, as the canonical site's publish.js: highlights always shown.
    showHighlights: 'always',`;
  return `
window.hypothesisConfig = function () {
  return {
    openSidebar: false,${only}
    // The open sidebar's width as a CSS variable, so the page makes room for it
    // on wide screens (design.ts) instead of sitting under it.
    onLayoutChange: function (layout) {
      try {
        var w = layout && layout.expanded ? Math.round(layout.width) : 0
        document.documentElement.style.setProperty("--tb-hypothesis-width", w + "px")
        document.documentElement.classList.toggle("tb-hypothesis-expanded", w > 0)
        document.dispatchEvent(new CustomEvent("tb-hypothesis-layout"))
      } catch (e) {}
    },
  }
}
`;
};

/** The client's JSON config, which is where it reads `group` from. */
export const hypothesisGroupJson = (anchor: string) =>
  JSON.stringify({ group: anchor.trim() }).replace(/</g, "\\u003c");

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
//
// It marks <html class="tb-hypothesis-on">: on a phone the design reserves room
// at the right of the header and the text for the client's tab and buttons, so
// they never sit over either (design.ts, layout.narrowWidth).
//
// A reader who turned public annotations off (Appearance panel, "tb-annotations")
// gets no client at all. window.tbLoadHypothesis is the same load, for turning
// them back on later in the page (annotationsControl).
const hypothesisLoader = `
;(function () {
  window.tbLoadHypothesis = function () {
    // Run-once guard: exactly one embed.js per page load. A second client's
    // connection is refused by the host frame ("Ignoring second request from
    // Hypothesis sidebar to connect to host frame"), leaving a present-but-dead
    // sidebar — so guard even though nothing should evaluate this twice.
    if (window.__editionIntegrations) return
    window.__editionIntegrations = true
    document.documentElement.classList.add("tb-hypothesis-on")

    var s = document.createElement("script")
    s.async = true
    s.src = "https://hypothes.is/embed.js"
    s.setAttribute("data-edition-hypothesis", "")
    document.head.appendChild(s)
  }
  var off = false
  try { off = !!window.tbPrefs && window.tbPrefs.get("annotations") === "off" } catch (e) {}
  if (!off) window.tbLoadHypothesis()
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
        // First of the scripts: the phone layout's width, the theme and the
        // reader's settings, all before paint.
        h("script", { dangerouslySetInnerHTML: { __html: breakpointBand(design.layout.narrowWidth) } }) as VNode,
        h("script", { dangerouslySetInnerHTML: { __html: readerPrefs } }) as VNode,
      ];
      const mode = annotationMode(opts);
      if (mode === "groups")
        head.push(
          h("script", {
            type: "application/json",
            class: "js-hypothesis-config",
            dangerouslySetInnerHTML: { __html: hypothesisGroupJson(opts.hypothesisGroupId) },
          }) as VNode,
        );
      if (mode !== "off")
        head.push(
          h("script", {
            dangerouslySetInnerHTML: {
              __html: hypothesisConfig(mode, opts.hypothesisGroupId, opts.hypothesisGroups),
            },
          }) as VNode,
        );
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
      // "off": no client, so nothing that drives or counts it.
      const annotations = mode !== "off";
      if (annotations && opts.tagHelper) head.push(script(tagHelper));
      if (annotations && opts.annotationBadge)
        head.push(script(annotationBadge(mode === "groups" ? opts.hypothesisGroupId.trim() : "")));
      if (opts.paragraphNumbers) head.push(script(paragraphNumbers));
      // Always, and before the explorer's script runs: see explorerKeepsPageStill.
      head.push(script(explorerKeepsPageStill));
      if (opts.explorerOrder.length) head.push(script(explorerFollowsContents(opts.explorerOrder)));
      // Always: it completes fixBlockRefLinks, which is not optional either.
      head.push(script(targetFlash));
      head.push(script(phoneMenuStartsClosed(design.layout.narrowWidth)));
      if (annotations) head.push(script(annotationsControl(mode === "groups")));
      if (opts.privacyUrl) head.push(script(privacyNotice(opts.privacyUrl)));
      if (annotations) {
        head.push(script(annotationSheet(design.layout.narrowWidth)));
        head.push(script(annotationRoom(design.layout.narrowWidth)));
        // Last, so window.hypothesisConfig above is already set when embed.js boots.
        head.push(h("script", { dangerouslySetInnerHTML: { __html: hypothesisLoader } }) as VNode);
      }
      return { additionalHead: head };
    },
  };
};

export default EditionIntegrations;
