/**
 * edition-integrations — Quartz v5 transformer plugin.
 *
 * Injects, site-wide via externalResources().additionalHead:
 *   1. Theme fine-tuning CSS (type scale + reading measure; colours/fonts come
 *      from quartz.config.yaml theme, this covers what the config can't express)
 *   2. Hypothes.is client, sidebar collapsed — same first-party flow as the
 *      canonical site's publish.js
 *   3. Plausible per-site script (pa-*.js) with SPA-correct pageviews
 *   4. A small SPA runtime that re-injects (2) and fires (3) on Quartz's "nav"
 *      event, because client-side navigation destroys both
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

// --- 3. Plausible (per-site script, SPA-aware) ---------------------------------
// Queue stub first so calls made before pa-*.js lands are buffered, then init with
// autocapture OFF: the script's own pageview capture doesn't know about Quartz's
// client-side routing. The pageviews themselves are fired from the SPA runtime
// below. If Plausible's dashboard snippet ever changes its init signature, mirror
// the dashboard here.
const plausibleInit = `
window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) }
window.plausible.init = window.plausible.init || function (o) { window.plausible.o = o || {} }
window.plausible.init({ autoCapturePageviews: false })
`;

// --- 4. SPA runtime -----------------------------------------------------------
// Why this exists at all — two things Quartz's router (quartz/components/scripts/
// spa.inline.ts) does on every client-side navigation:
//
//   1. `micromorph(document.body, html.body)` rewrites the <body> subtree to match
//      the incoming page. Hypothes.is appends its own elements to <body>, and
//      nothing in the incoming page corresponds to them, so the morph deletes them
//      — the sidebar and highlights vanish on the first link click.
//   2. It then wipes every <head> element without [data-persist] and appends the
//      incoming page's head nodes. Those nodes were produced by DOMParser, whose
//      documents have scripting disabled, so each <script> carries the "already
//      started" flag and is inert once adopted. Despite the comment in the router,
//      head scripts do NOT re-execute — a head-injected embed never comes back on
//      its own.
//
// So re-injection has to be driven by JS that outlives the swap. Everything below
// hangs off the "nav" event — the same event Quartz's own Explorer component
// listens on — which fires once on initial load AND once per navigation. Verified
// against Quartz v5 source rather than assumed:
//
//   * enableSPA: true  — quartz/components/scripts/spa.inline.ts ends with a
//     top-level `notifyNav(getFullSlug(window))` (line 198), immediately after
//     createRouter(). That is an unconditional initial-load dispatch.
//   * enableSPA: false — quartz/plugins/emitters/componentResources.ts (the else
//     branch at line 263) pushes a stub that does exactly one thing: dispatch a
//     "nav" CustomEvent.
//
// Ordering also holds: both live in `afterDOMLoaded`, bundled into postscript.js,
// which renderPage.tsx emits as an afterDOMReady resource at the end of <body>.
// This script is an inline <head> script, so it executes during parse — the
// listener is always registered before the initial-load dispatch. Hence NO
// immediate ensureHypothesis() call at script execution: it would inject embed.js,
// then the initial "nav" would fire while that async script is still in flight
// (boot marker not yet stamped), and the handler would sweep the pending tag and
// re-append it — a self-inflicted double boot. One code path, driven by "nav".
//
// Listeners are bound to `document`, which is never replaced, so a single
// registration covers the whole session. Deliberately NOT paired with
// window.addCleanup(): that tears listeners down on prenav, which is exactly what
// this one must survive.
//
// This mirrors the canonical site's publish.js, which re-runs its injections on
// History-API navigation for the same reason.
//
// TEMPORARY: "[edition-hyp]" console tracing at every decision point, to diagnose
// the sidebar misbehaviour on the deployed edition. Remove once resolved.
const spaRuntime = `
;(function () {
  // Run-once guard, in case a future router change does re-execute head scripts:
  // a second registration would mean two pageviews per navigation.
  if (window.__editionIntegrations) return
  window.__editionIntegrations = true

  console.log("[edition-hyp] head script executed; guard passed, registering nav listener", {
    path: window.location.pathname,
    readyState: document.readyState,
  })

  // Hypothes.is' boot script stamps this <link> into the document and returns
  // early when it finds one already there — that is the client's own
  // single-instance guard, and we reuse it as ours. <hypothesis-sidebar> is the
  // visible half; the client is only healthy when both are present.
  var BOOT_MARKER = 'link[type="application/annotator+html"]'
  var SIDEBAR = "hypothesis-sidebar"
  var CLIENT_ELEMENTS = "hypothesis-sidebar, hypothesis-notebook, hypothesis-profile, hypothesis-adder"
  var INJECTED = "script[data-edition-hypothesis]"

  function ensureHypothesis() {
    var hasBootMarker = !!document.querySelector(BOOT_MARKER)
    var hasSidebar = !!document.querySelector(SIDEBAR)
    console.log("[edition-hyp] boot marker present?", hasBootMarker)
    console.log("[edition-hyp] hypothesis-sidebar present?", hasSidebar)

    // Already present and functioning — do nothing. One client only, never two
    // sidebars.
    if (hasBootMarker && hasSidebar) {
      console.log("[edition-hyp] decision: BAIL (client healthy, leaving it alone)")
      return
    }

    console.log("[edition-hyp] decision: SWEEP+INJECT (client missing or half-dead)")

    // Otherwise the client is gone or half-dead. Sweep whatever survived before
    // re-booting: a stale boot marker would make embed.js bail out and leave us
    // with no sidebar at all, and a stranded sidebar element would leave us with
    // two.
    var stale = document.querySelectorAll(BOOT_MARKER + ", " + CLIENT_ELEMENTS + ", " + INJECTED)
    console.log("[edition-hyp] stale elements swept:", stale.length, Array.prototype.map.call(stale, function (el) {
      return el.tagName.toLowerCase()
    }))
    for (var i = 0; i < stale.length; i++) stale[i].remove()

    // window.hypothesisConfig is set by a sibling head script and lives on
    // window, so it survives navigation and every re-boot picks up the same
    // first-party settings.
    var s = document.createElement("script")
    s.async = true
    s.src = "https://hypothes.is/embed.js"
    s.setAttribute("data-edition-hypothesis", "")
    s.addEventListener("load", function () {
      console.log("[edition-hyp] embed.js loaded")
    })
    s.addEventListener("error", function () {
      console.log("[edition-hyp] embed.js FAILED to load")
    })
    document.head.appendChild(s)
    console.log("[edition-hyp] embed.js script appended to head")
  }

  // Exactly one pageview per real navigation. "nav" is already once-per-navigation,
  // but a link pointing at the current page still round-trips through the router,
  // so dedupe on pathname the way publish.js does. No-op when Plausible isn't
  // configured for this edition.
  var lastPath = null
  function firePageview() {
    if (typeof window.plausible !== "function") return
    if (window.location.pathname === lastPath) return
    lastPath = window.location.pathname
    window.plausible("pageview")
  }

  var navCount = 0
  document.addEventListener("nav", function () {
    navCount++
    console.log("[edition-hyp] nav event received #" + navCount, window.location.pathname)
    ensureHypothesis()
    firePageview()
  })
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
      // The embed.js tag is NOT emitted here. A static head tag loads once and is
      // never revived by the router (see spaRuntime above), so injection is left
      // entirely to the "nav" handler — which fires on initial load too, giving one
      // code path instead of a static tag racing a re-injection on first paint.
      head.push(h("script", { dangerouslySetInnerHTML: { __html: spaRuntime } }) as VNode);
      return { additionalHead: head };
    },
  };
};

export default EditionIntegrations;
