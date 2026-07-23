/**
 * edition-integrations — Quartz v5 transformer plugin.
 *
 * Injects, site-wide via externalResources().additionalHead:
 *   1. Theme fine-tuning CSS (type scale + reading measure; colours/fonts come
 *      from quartz.config.yaml theme, this covers what the config can't express)
 *   2. Hypothes.is client, sidebar collapsed — same first-party flow as the
 *      canonical site's publish.js
 *   3. Plausible per-site script (pa-*.js), stock configuration
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

interface Options {
  /** Per-edition Plausible script src (https://plausible.io/js/pa-….js). "" disables analytics. */
  plausibleScriptSrc: string;
  /** Hypothes.is group ID — only takes effect once the services block below is uncommented (Publisher tier, R1). */
  hypothesisGroupId: string;
}

const defaultOptions: Options = {
  plausibleScriptSrc: "",
  hypothesisGroupId: "",
};

// --- 1. Theme fine-tuning -----------------------------------------------------
// Values from visual-direction-v1.md. Colour/font *families* are set in
// quartz.config.yaml; this handles scale, rhythm and measure. Colours below are
// referenced through Quartz's generated CSS variables so a future palette change
// in the config propagates here automatically.
const themeCss = `
body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
/* Constrain the reading column on the article itself — Quartz's grid track
   runs wider (measured 850px), so cap here rather than via .center. */
article {
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}
article p,
article li {
  font-size: 1.125rem;      /* 18px */
  line-height: 1.65 !important;  /* base.scss sets ~1.42; override to spec */
}
article p { margin: 1.5rem 0; }
article h1 { font-size: 2.25rem;  font-weight: 700; line-height: 1.15; }
article h2 { font-size: 1.75rem;  font-weight: 700; line-height: 1.2; }
article h3 { font-size: 1.375rem; font-weight: 600; line-height: 1.3; }
article h4 { font-size: 1.125rem; font-weight: 600; line-height: 1.4; letter-spacing: 0.04em; }
article a { font-weight: 600; text-decoration: underline; text-underline-offset: 2px; }
article a:hover { color: var(--tertiary); }
pre, article code { background-color: #F7F7F5; }
`;

// --- 2. Hypothes.is -----------------------------------------------------------
// Quartz editions should match the canonical site: public, first-party annotation
// always loads. Group-locking is an *upgrade* an edition can opt into by setting a
// real hypothesisGroupId — never a prerequisite for the embed. So the embed loads
// unconditionally (mirroring publish.js), and an unset or placeholder group id just
// falls through quietly, leaving public annotation active.
const HYPOTHESIS_GROUP_PLACEHOLDER = "GROUP_ID";

// A configured hypothesisGroupId counts as "real" only when it's non-empty and not
// a scaffolding placeholder left unfilled by the edition build (e.g. "" or a
// "__TOKEN__"-style token). Anything else means "no group configured".
const isRealGroupId = (groupId: string): boolean => {
  const trimmed = groupId.trim();
  return trimmed.length > 0 && !/^__.*__$/.test(trimmed);
};

const hypothesisConfig = (groupId: string) => {
  // Group-locking is applied only for a real group id; otherwise the Publisher-tier
  // seam keeps a neutral placeholder and public first-party annotation still loads.
  const group = isRealGroupId(groupId) ? groupId.trim() : HYPOTHESIS_GROUP_PLACEHOLDER;
  return `
window.hypothesisConfig = function () {
  return {
    // First-party flow: sidebar collapsed, highlights always visible — same as the
    // canonical site's publish.js.
    openSidebar: false,
    showHighlights: 'always',
    // R1 hook — per-edition group locking. Requires Publisher-tier / third-party
    // auth; the services array 404s on the standard account tier (verified,
    // hypothesis-spike-baseline.md). When access lands, uncomment and set
    // hypothesisGroupId in quartz.config.yaml:
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
  return {
    name: "EditionIntegrations",
    // No-op: this plugin only injects head resources via externalResources(),
    // but Quartz's loader requires a transformer to expose at least one of
    // textTransform/markdownPlugins/htmlPlugins to be recognized as a valid
    // transformer instance (see quartz/plugins/loader/config-loader.ts).
    htmlPlugins() {
      return [];
    },
    externalResources() {
      const head: VNode[] = [
        h("style", { dangerouslySetInnerHTML: { __html: themeCss } }) as VNode,
        h("script", {
          dangerouslySetInnerHTML: { __html: hypothesisConfig(opts.hypothesisGroupId) },
        }) as VNode,
      ];
      if (opts.plausibleScriptSrc) {
        head.push(
          h("script", { dangerouslySetInnerHTML: { __html: plausibleInit } }) as VNode,
          h("script", { async: true, src: opts.plausibleScriptSrc }) as VNode,
        );
      }
      // Last, so window.hypothesisConfig above is already set when embed.js boots.
      head.push(h("script", { dangerouslySetInnerHTML: { __html: hypothesisLoader } }) as VNode);
      return { additionalHead: head };
    },
  };
};

export default EditionIntegrations;
