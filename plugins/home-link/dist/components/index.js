// node_modules/@quartz-community/utils/dist/lang.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Math.random().toString(8);

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/components/HomeLink.tsx
var defaultOptions = {
  url: "https://confused4now.org/",
  label: "confused for now"
};
var css = `
.home-link {
  margin: 0;
  font-family: var(--tb-font-text, var(--bodyFont));
  font-size: var(--tb-size-home-link, 0.85rem);
  font-style: italic;
  font-weight: 400;
  line-height: 1.3;
}
.home-link a {
  color: var(--gray);
  background-color: transparent;
  font-weight: inherit;
  text-decoration: none;
}
.home-link a:hover,
.home-link a:focus-visible {
  color: var(--secondary);
  text-decoration: underline;
  text-underline-offset: 0.15em;
}
.home-link a:focus-visible {
  outline: 2px solid var(--secondary);
  outline-offset: 2px;
  border-radius: 2px;
}
/* On a phone the left sidebar is one row (menu, title, search), and the
   explorer makes that row a sticky bar. The link sits just above the bar, in
   space the bar leaves for it, at the page's top left: it scrolls away with
   the page while the bar stays, and the row is laid out as before. Absolute
   within the bar (sticky, so its containing block), never fixed. A page
   without the explorer (the 404) keeps the link in the flow. */
@media all and (max-width: 800px) {
  .page > #quartz-body .sidebar.left.left:has(> .home-link):has(.explorer) {
    margin-top: 1.75rem;
  }
  .sidebar.left:has(.explorer) > .home-link {
    position: absolute;
    bottom: 100%;
    left: 0;
    white-space: nowrap;
  }
}
`;
var HomeLink_default = ((userOpts) => {
  const opts = { ...defaultOptions, ...userOpts };
  const HomeLink = ({ displayClass }) => /* @__PURE__ */ u2("p", { class: classNames(displayClass, "home-link"), children: /* @__PURE__ */ u2("a", { href: opts.url, children: opts.label }) });
  HomeLink.css = css;
  return HomeLink;
});

export { HomeLink_default as HomeLink };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map