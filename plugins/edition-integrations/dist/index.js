import { createRequire } from 'module';

createRequire(import.meta.url);

// node_modules/preact/dist/preact.mjs
var n;
var l;
var u;
var v = [];
function _(l2, u2, t2) {
  var i2, o2, r2, e2 = {};
  for (r2 in u2) "key" == r2 ? i2 = u2[r2] : "ref" == r2 ? o2 = u2[r2] : e2[r2] = u2[r2];
  if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (r2 in l2.defaultProps) void 0 === e2[r2] && (e2[r2] = l2.defaultProps[r2]);
  return m(l2, e2, i2, o2, null);
}
function m(n2, t2, i2, o2, r2) {
  var e2 = { type: n2, props: t2, key: i2, ref: o2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == r2 ? ++u : r2, __i: -1, __u: 0 };
  return null != l.vnode && l.vnode(e2), e2;
}
n = v.slice, l = { __e: function(n2, l2, u2, t2) {
  for (var i2, o2, r2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((o2 = i2.constructor) && null != o2.getDerivedStateFromError && (i2.setState(o2.getDerivedStateFromError(n2)), r2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), r2 = i2.__d), r2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, u = 0, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

// src/index.ts
var defaultOptions = {
  plausibleScriptSrc: "",
  hypothesisGroupId: ""
};
var themeCss = `
body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
/* Constrain the reading column on the article itself \u2014 Quartz's grid track
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
var HYPOTHESIS_GROUP_PLACEHOLDER = "GROUP_ID";
var isRealGroupId = (groupId) => {
  const trimmed = groupId.trim();
  return trimmed.length > 0 && !/^__.*__$/.test(trimmed);
};
var hypothesisConfig = (groupId) => {
  const group = isRealGroupId(groupId) ? groupId.trim() : HYPOTHESIS_GROUP_PLACEHOLDER;
  return `
window.hypothesisConfig = function () {
  return {
    // First-party flow: sidebar collapsed, highlights always visible \u2014 same as the
    // canonical site's publish.js.
    openSidebar: false,
    showHighlights: 'always',
    // R1 hook \u2014 per-edition group locking. Requires Publisher-tier / third-party
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
var plausibleInit = `
window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) }
window.plausible.init = window.plausible.init || function (o) { window.plausible.o = o || {} }
window.plausible.init({ autoCapturePageviews: false })
`;
var spaRuntime = `
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
  // early when it finds one already there \u2014 that is the client's own
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

    // Already present and functioning \u2014 do nothing. One client only, never two
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
var EditionIntegrations = (userOpts) => {
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
      const head = [
        _("style", { dangerouslySetInnerHTML: { __html: themeCss } }),
        _("script", {
          dangerouslySetInnerHTML: { __html: hypothesisConfig(opts.hypothesisGroupId) }
        })
      ];
      if (opts.plausibleScriptSrc) {
        head.push(
          _("script", { dangerouslySetInnerHTML: { __html: plausibleInit } }),
          _("script", { async: true, src: opts.plausibleScriptSrc })
        );
      }
      head.push(_("script", { dangerouslySetInnerHTML: { __html: spaRuntime } }));
      return { additionalHead: head };
    }
  };
};
var src_default = EditionIntegrations;

export { EditionIntegrations, src_default as default };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map