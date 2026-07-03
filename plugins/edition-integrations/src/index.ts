/**
 * edition-integrations — Quartz v5 transformer plugin.
 *
 * Injects, site-wide via externalResources().additionalHead:
 *   1. Theme fine-tuning CSS (type scale + reading measure; colours/fonts come
 *      from quartz.config.yaml theme, this covers what the config can't express)
 *   2. Hypothes.is client, sidebar collapsed — same first-party flow as the
 *      canonical site's publish.js
 *   3. Plausible per-site script (pa-*.js) with SPA-correct pageviews
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
import { h } from "preact"
import type { VNode } from "preact"
import type { QuartzTransformerPlugin } from "@quartz-community/types"

interface Options {
  /** Per-edition Plausible script src (https://plausible.io/js/pa-….js). "" disables analytics. */
  plausibleScriptSrc: string
  /** Hypothes.is group ID — only takes effect once the services block below is uncommented (Publisher tier, R1). */
  hypothesisGroupId: string
}

const defaultOptions: Options = {
  plausibleScriptSrc: "",
  hypothesisGroupId: "",
}

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
`

// --- 2. Hypothes.is -----------------------------------------------------------
const hypothesisConfig = (groupId: string) => `
window.hypothesisConfig = function () {
  return {
    openSidebar: false,
    // R1 hook — per-edition group locking. Requires Publisher-tier / third-party
    // auth; the services array 404s on the standard account tier (verified,
    // hypothesis-spike-baseline.md). When access lands, uncomment and set
    // hypothesisGroupId in quartz.config.yaml:
    //
    // services: [{
    //   apiUrl: "https://hypothes.is/api/",
    //   authority: "YOUR_AUTHORITY",
    //   grantToken: "GENERATED_PER_USER",
    //   groups: ["${groupId || "GROUP_ID"}"],
    // }],
  }
}
`

// --- 3. Plausible (per-site script, SPA-aware) ---------------------------------
// The pa-*.js script's own autocapture doesn't know about Quartz's client-side
// routing, so we disable it and fire on Quartz's "nav" event instead — which
// fires exactly once on initial load and once per SPA navigation. If Plausible's
// dashboard snippet ever changes its init signature, mirror the dashboard here.
const plausibleInit = `
window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) }
window.plausible.init = window.plausible.init || function (o) { window.plausible.o = o || {} }
window.plausible.init({ autoCapturePageviews: false })
document.addEventListener("nav", function () { window.plausible("pageview") })
`

export const EditionIntegrations: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "EditionIntegrations",
    // No-op: this plugin only injects head resources via externalResources(),
    // but Quartz's loader requires a transformer to expose at least one of
    // textTransform/markdownPlugins/htmlPlugins to be recognized as a valid
    // transformer instance (see quartz/plugins/loader/config-loader.ts).
    htmlPlugins() {
      return []
    },
    externalResources() {
      const head: VNode[] = [
        h("style", { dangerouslySetInnerHTML: { __html: themeCss } }) as VNode,
        h("script", { dangerouslySetInnerHTML: { __html: hypothesisConfig(opts.hypothesisGroupId) } }) as VNode,
        h("script", { async: true, src: "https://hypothes.is/embed.js" }) as VNode,
      ]
      if (opts.plausibleScriptSrc) {
        head.push(
          h("script", { dangerouslySetInnerHTML: { __html: plausibleInit } }) as VNode,
          h("script", { async: true, src: opts.plausibleScriptSrc }) as VNode,
        )
      }
      return { additionalHead: head }
    },
  }
}

export default EditionIntegrations
