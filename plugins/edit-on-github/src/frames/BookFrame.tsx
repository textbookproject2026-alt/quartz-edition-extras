import { h, Fragment, type FunctionComponent } from "preact";
import type { PageFrame, PageFrameProps, QuartzComponent } from "@quartz-community/types";

/** A component that asks to be drawn in the page grid's header row (EditOnGitHub). */
const isHeader = (c: QuartzComponent) => (c as { tbHeader?: boolean }).tbHeader === true;
/** A left-sidebar component that goes first in that row instead (home-link's logo). */
const isLead = (c: QuartzComponent) => (c as { tbHeaderLead?: boolean }).tbHeaderLead === true;

/**
 * Quartz's default frame, with the book's header (edit-on-github) as its own cell
 * of the page grid, the "grid-header" area Quartz's grids already have in every
 * layout, instead of inside the centre column.
 *
 * That cell is sticky against the whole page: in the default frame the header
 * sat in .center, and below Quartz's desktop layout the right rail and footer are
 * rows under .center, so on a short page scrolled to its end the header left the
 * screen with it.
 *
 * It is the page's one bar: the logo (a left-sidebar component that asks to lead
 * it), then the header (the explorer's menu button, title, controls). The rest of
 * the bar's styling is the header's CSS, which loads in <head> where
 * edition-integrations can move its breakpoints; this <style> is in <body>.
 */
export const BookFrame: PageFrame = {
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
    footer: Footer,
  }: PageFrameProps) {
    // Quartz's component type returns `unknown`; preact's h() wants its own.
    const draw = (C: QuartzComponent) =>
      h(C as unknown as FunctionComponent<typeof componentData>, componentData);
    const each = (list: QuartzComponent[]) => list.map(draw);
    const top = beforeBody.filter(isHeader);
    const lead = top.length ? left.filter(isLead) : [];
    return h(
      Fragment,
      null,
      h("div", { class: "left sidebar" }, ...each(left.filter((c) => !lead.includes(c)))),
      top.length ? h("div", { class: "tb-header-slot" }, ...each(lead), ...each(top)) : null,
      h(
        "div",
        { class: "center" },
        h(
          "div",
          { class: "page-header" },
          h("div", { class: "popover-hint" }, ...each(beforeBody.filter((c) => !isHeader(c)))),
        ),
        draw(Content),
        h("hr", null),
        h("div", { class: "page-footer" }, ...each(afterBody)),
      ),
      h("div", { class: "right sidebar" }, ...each(right)),
      draw(Footer),
    ) as unknown as ReturnType<PageFrame["render"]>;
  },
};
