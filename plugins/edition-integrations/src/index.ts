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
// Why this exists at all — what Quartz's router (quartz/components/scripts/
// spa.inline.ts) does on every client-side navigation:
//
//   1. `micromorph(document.body, html.body)` rewrites the <body> subtree to match
//      the incoming page. It does NOT destroy the Hypothes.is client: measured on
//      the live edition, both <hypothesis-sidebar> and our injected embed.js tag
//      are still present after a nav. (An earlier revision of this comment
//      asserted the morph deleted them; that was wrong, and building on it is what
//      caused the bug fixed below.)
//   2. It wipes every <head> element without [data-persist] (line 124) and appends
//      the incoming page's head nodes. Those nodes were produced by DOMParser,
//      whose documents have scripting disabled, so each <script> carries the
//      "already started" flag and is inert once adopted. Despite the comment in
//      the router, head scripts do NOT re-execute.
//
// (2) is the whole problem. Hypothes.is stamps its boot marker —
// link[type="application/annotator+html"] — into <head>, so the wipe takes it,
// while the sidebar survives in <body>. A health check requiring BOTH therefore
// reads a perfectly healthy client as half-dead, sweeps, and re-injects embed.js.
// The second boot is refused by the host frame ("Ignoring second request from
// Hypothesis sidebar to connect to host frame") and you get a present-but-dead
// sidebar. That is a self-inflicted wound, not something the router did.
//
// The fix is to stop losing the state in the first place: the router preserves any
// <head> element carrying [data-persist] — the same mechanism it uses for its own
// route-announcer (line 107) — so we tag the client's head elements on `prenav`,
// which fires at line 87, well before the wipe at 124. Nothing is ever seen as
// half-dead, and embed.js is never re-loaded. The sidebar-authoritative health
// check below is the belt to that braces.
//
// Everything hangs off events that outlive the swap. "nav" fires once on initial
// load AND once per navigation. Verified against Quartz v5 source rather than
// assumed:
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
// these must survive.
//
// This mirrors the canonical site's publish.js, which re-runs its injections on
// History-API navigation for the same reason.
//
// TEMPORARY: "[edition-hyp]" console tracing at each decision point. Retained one
// more deploy cycle to confirm the fix on the live edition — the expected steady
// state is "PERSIST tagged" on every prenav and "BAIL" on every nav after the
// first, with embed.js appended exactly once per full page load. Remove after.
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

  // Hypothes.is' boot script stamps this <link> into <head> and returns early when
  // it finds one already there — that is the client's own single-instance guard.
  // <hypothesis-sidebar> is the visible half, and it lives in <body>.
  var BOOT_MARKER = 'link[type="application/annotator+html"]'
  var SIDEBAR = "hypothesis-sidebar"
  var CLIENT_ELEMENTS = "hypothesis-sidebar, hypothesis-notebook, hypothesis-profile, hypothesis-adder"
  var INJECTED = "script[data-edition-hypothesis]"
  // Everything the client (or we) put in <head> that must outlive the head wipe:
  // the boot marker, our embed tag, and any stylesheet/script the client loads
  // from its own origin.
  var PERSIST_IN_HEAD =
    BOOT_MARKER + ", " + INJECTED + ', link[href*="hypothes.is"], script[src*="hypothes.is"]'

  // Remembered so a lost boot marker can be restored faithfully rather than forged
  // from guesswork.
  var markerHref = null
  var markerRel = null

  // --- primary fix ---
  // Quartz's router removes every <head> element without [data-persist]. Tagging
  // the client's head state means the wipe simply passes over it, so the client is
  // never seen as half-dead and embed.js is never re-loaded. Called on prenav
  // (before the wipe), on nav, and after embed.js boots.
  function persistClientHead(when) {
    var els = document.head.querySelectorAll(PERSIST_IN_HEAD)
    for (var i = 0; i < els.length; i++) {
      els[i].setAttribute("data-persist", "")
      if (els[i].matches(BOOT_MARKER)) {
        markerHref = els[i].getAttribute("href")
        markerRel = els[i].getAttribute("rel")
      }
    }
    console.log("[edition-hyp] PERSIST tagged " + els.length + " head element(s) @ " + when)
    return els.length
  }

  // Restores the client's single-instance guard WITHOUT re-loading embed.js — used
  // only if the marker went missing while the sidebar is alive (i.e. the prenav
  // tagging didn't get to it, i.e. the client booted mid-navigation).
  function restoreBootMarker() {
    var link = document.createElement("link")
    link.setAttribute("type", "application/annotator+html")
    link.setAttribute("rel", markerRel || "hypothesis-client")
    link.setAttribute("href", markerHref || "https://hypothes.is/embed.js")
    link.setAttribute("data-persist", "")
    document.head.appendChild(link)
    console.log("[edition-hyp] boot marker restored (no embed.js re-load)")
  }

  function ensureHypothesis() {
    var hasBootMarker = !!document.querySelector(BOOT_MARKER)
    var hasSidebar = !!document.querySelector(SIDEBAR)
    console.log("[edition-hyp] boot marker present?", hasBootMarker)
    console.log("[edition-hyp] hypothesis-sidebar present?", hasSidebar)

    // The sidebar is authoritative. If it exists, a live client owns this page —
    // regardless of what happened to the head marker. Re-injecting here is what
    // produced the dead sidebar: the second client's connection is refused by the
    // host frame. So never re-inject while a live sidebar is present.
    if (hasSidebar) {
      if (!hasBootMarker) restoreBootMarker()
      persistClientHead("nav/bail")
      console.log("[edition-hyp] decision: BAIL (live sidebar is authoritative)")
      return
    }

    console.log("[edition-hyp] decision: SWEEP+INJECT (sidebar genuinely absent)")

    // No sidebar: the client is genuinely gone. Sweep whatever survived before
    // booting — a stale boot marker would make embed.js bail out and leave us with
    // no sidebar at all.
    var stale = document.querySelectorAll(BOOT_MARKER + ", " + CLIENT_ELEMENTS + ", " + INJECTED)
    console.log("[edition-hyp] stale elements swept:", stale.length, Array.prototype.map.call(stale, function (el) {
      return el.tagName.toLowerCase()
    }))
    for (var i = 0; i < stale.length; i++) stale[i].remove()

    // window.hypothesisConfig is set by a sibling head script and lives on
    // window, so it survives navigation and every boot picks up the same
    // first-party settings.
    var s = document.createElement("script")
    s.async = true
    s.src = "https://hypothes.is/embed.js"
    s.setAttribute("data-edition-hypothesis", "")
    s.setAttribute("data-persist", "")
    s.addEventListener("load", function () {
      console.log("[edition-hyp] embed.js loaded")
      // The client stamps its boot marker during load; tag it now so the very next
      // navigation can't take it.
      persistClientHead("embed.js load")
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

  // Fires at spa.inline.ts line 87, before the head wipe at line 124 — the one
  // moment where tagging [data-persist] actually saves the client's head state.
  // This is the primary fix; the sidebar-authoritative check in ensureHypothesis()
  // is the fallback for anything that slips past it.
  document.addEventListener("prenav", function () {
    console.log("[edition-hyp] prenav received (head wipe imminent)", window.location.pathname)
    persistClientHead("prenav")
  })

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
