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
  font-size: 1.125rem;      /* 18px body */
  line-height: 1.65;
}
article p { margin: 1.5rem 0; }  /* 24px vertical rhythm */
h1 { font-size: 2.25rem;  font-weight: 700; line-height: 1.15; }
h2 { font-size: 1.75rem;  font-weight: 700; line-height: 1.2; }
h3 { font-size: 1.375rem; font-weight: 600; line-height: 1.3; }
h4 { font-size: 1.125rem; font-weight: 600; line-height: 1.4; letter-spacing: 0.04em; }
/* 720px reading measure (~72ch at 18px). If the page grid still allots a wider
   centre track, narrow it here after a DevTools check \u2014 see setup guide step 5. */
.center { max-width: 720px; }
/* Purple links, bold + underlined, hover darkens (tertiary) \u2014 n-o.ooo signature.
   Internal-link wash + external \u2197 come from Quartz defaults via theme colours. */
article a { font-weight: 600; text-decoration: underline; text-underline-offset: 2px; }
article a:hover { color: var(--tertiary); }
/* Warm off-white for code, per palette "Background soft" */
pre, article code { background-color: #F7F7F5; }
`;
var hypothesisConfig = (groupId) => `
window.hypothesisConfig = function () {
  return {
    openSidebar: false,
    // R1 hook \u2014 per-edition group locking. Requires Publisher-tier / third-party
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
`;
var plausibleInit = `
window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) }
window.plausible.init = window.plausible.init || function (o) { window.plausible.o = o || {} }
window.plausible.init({ autoCapturePageviews: false })
document.addEventListener("nav", function () { window.plausible("pageview") })
`;
var EditionIntegrations = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts };
  return {
    name: "EditionIntegrations",
    externalResources() {
      const head = [
        _("style", { dangerouslySetInnerHTML: { __html: themeCss } }),
        _("script", { dangerouslySetInnerHTML: { __html: hypothesisConfig(opts.hypothesisGroupId) } }),
        _("script", { async: true, src: "https://hypothes.is/embed.js" })
      ];
      if (opts.plausibleScriptSrc) {
        head.push(
          _("script", { dangerouslySetInnerHTML: { __html: plausibleInit } }),
          _("script", { async: true, src: opts.plausibleScriptSrc })
        );
      }
      return { additionalHead: head };
    }
  };
};
var src_default = EditionIntegrations;

export { EditionIntegrations, src_default as default };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map