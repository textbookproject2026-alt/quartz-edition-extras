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
function k(n2) {
  return n2.children;
}
n = v.slice, l = { __e: function(n2, l2, u2, t2) {
  for (var i2, o2, r2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((o2 = i2.constructor) && null != o2.getDerivedStateFromError && (i2.setState(o2.getDerivedStateFromError(n2)), r2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), r2 = i2.__d), r2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, u = 0, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

// src/frames/BookFrame.tsx
var isHeader = (c2) => c2.tbHeader === true;
var isLead = (c2) => c2.tbHeaderLead === true;
var BookFrame = {
  name: "book",
  css: `
.page[data-frame="book"] > #quartz-body > .tb-header-slot {
  grid-area: grid-header;
  position: sticky;
  top: 0;
  z-index: 2;
  min-width: 0;
}
@media print { .page[data-frame="book"] > #quartz-body > .tb-header-slot { display: none; } }
`,
  render({
    componentData,
    beforeBody,
    pageBody: Content,
    afterBody,
    left,
    right,
    footer: Footer
  }) {
    const draw = (C2) => _(C2, componentData);
    const each = (list) => list.map(draw);
    const top = beforeBody.filter(isHeader);
    const lead = top.length ? left.filter(isLead) : [];
    return _(
      k,
      null,
      _("div", { class: "left sidebar" }, ...each(left.filter((c2) => !lead.includes(c2)))),
      top.length ? _("div", { class: "tb-header-slot" }, ...each(lead), ...each(top)) : null,
      _(
        "div",
        { class: "center" },
        _(
          "div",
          { class: "page-header" },
          _("div", { class: "popover-hint" }, ...each(beforeBody.filter((c2) => !isHeader(c2))))
        ),
        draw(Content),
        _("hr", null),
        _("div", { class: "page-footer" }, ...each(afterBody))
      ),
      _("div", { class: "right sidebar" }, ...each(right)),
      draw(Footer)
    );
  }
};

export { BookFrame };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map