import { h, Fragment, type FunctionComponent } from "preact";
import type { PageFrame, PageFrameProps, QuartzComponent } from "@quartz-community/types";
import { DONATE_LABEL, DONATE_TEXT } from "../donate";

/** A component that asks to be drawn in the page grid's header row (EditOnGitHub). */
const isHeader = (c: QuartzComponent) => (c as { tbHeader?: boolean }).tbHeader === true;
/** A left-sidebar component that goes first in that row instead (home-link's logo). */
const isLead = (c: QuartzComponent) => (c as { tbHeaderLead?: boolean }).tbHeaderLead === true;
/** The donation link the header was given (edit-on-github's donateUrl), or "". */
const donateOf = (c: QuartzComponent) => (c as { tbDonate?: string }).tbDonate ?? "";

/**
 * The donation line: a plain outbound link, no PayPal script, so nothing is loaded
 * from PayPal and no cookie is set. It goes above the site footer, inside its grid
 * cell, and never into print.
 */
const donation = (url: string) =>
  h(
    "div",
    { class: "tb-donate" },
    h("p", { class: "tb-donate-text" }, DONATE_TEXT),
    h(
      "a",
      {
        class: "tb-donate-btn",
        href: url,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": DONATE_LABEL,
      },
      "Donate",
    ),
  );

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
.page[data-frame="book"] > #quartz-body > .tb-footer-slot {
  grid-area: grid-footer;
  min-width: 100%;
  max-width: 100%;
}
.tb-donate {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
  margin: 1.5rem 0 1.25rem;
  font-family: var(--tb-font-ui, sans-serif);
}
.tb-donate-text {
  flex: 1 1 18rem;
  max-width: 40rem;
  margin: 0;
  color: var(--tb-muted, var(--gray));
  font-size: 0.9rem;
  line-height: 1.45;
}
.tb-donate-btn {
  flex: none;
  padding: 0.3rem 0.95rem;
  border: 1px solid var(--tb-border, var(--lightgray));
  border-radius: 6px;
  color: var(--tb-accent, var(--secondary));
  background: transparent;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
}
.tb-donate-btn:hover { background: var(--tb-accent-wash, var(--highlight)); border-color: var(--tb-accent-soft, var(--gray)); }
.tb-donate-btn:focus-visible { outline: 2px solid var(--tb-accent, var(--secondary)); outline-offset: 2px; }
@media print { .page[data-frame="book"] > #quartz-body > .tb-footer-slot { display: none !important; } }
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
    const donate = top.map(donateOf).find(Boolean);
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
      // With a donation link, the footer and the line above it share the footer's cell.
      donate ? h("div", { class: "tb-footer-slot" }, donation(donate), draw(Footer)) : draw(Footer),
    ) as unknown as ReturnType<PageFrame["render"]>;
  },
};
