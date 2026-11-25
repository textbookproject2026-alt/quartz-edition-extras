import { describe, expect, it } from "vitest";
import { h } from "preact";
import { renderToString } from "preact-render-to-string";
import type { PageFrameProps, QuartzComponent } from "@quartz-community/types";
import { BookFrame } from "../src/frames";

const part = (cls: string, flag?: string) => {
  const C = (() => h("i", { class: cls })) as unknown as QuartzComponent;
  if (flag) (C as unknown as Record<string, boolean>)[flag] = true;
  return C;
};
const draw = (left: QuartzComponent[], beforeBody: QuartzComponent[]) =>
  renderToString(
    BookFrame.render({
      componentData: {},
      left,
      right: [],
      beforeBody,
      afterBody: [],
      pageBody: part("body"),
      footer: part("foot"),
    } as unknown as PageFrameProps) as never,
  );

describe("the book frame", () => {
  it("draws the logo, then the header, in the header row, and the rest where they were", () => {
    const html = draw(
      [part("logo", "tbHeaderLead"), part("explorer")],
      [part("hdr", "tbHeader"), part("title")],
    );
    expect(html).toContain('<div class="left sidebar"><i class="explorer"></i></div>');
    expect(html).toContain(
      '<div class="tb-header-slot"><i class="logo"></i><i class="hdr"></i></div>',
    );
    expect(html).toContain('<div class="popover-hint"><i class="title"></i></div>');
  });

  it("without a header, leaves the logo in the sidebar and draws no header row", () => {
    const html = draw([part("logo", "tbHeaderLead")], [part("title")]);
    expect(html).toContain('<div class="left sidebar"><i class="logo"></i></div>');
    expect(html).not.toContain("tb-header-slot");
  });

  it("with a donation link, draws the line and button with the footer; without one, the footer alone", () => {
    const hdr = part("hdr", "tbHeader");
    (hdr as unknown as Record<string, string>).tbDonate = "https://paypal.me/example";
    const html = draw([], [hdr]);
    expect(html).toContain('<div class="tb-footer-slot"><div class="tb-donate">');
    expect(html).toContain("Donations help pay for hosting, domains and the upkeep of the site.");
    expect(html).toContain(
      '<a class="tb-donate-btn" href="https://paypal.me/example" target="_blank" rel="noopener noreferrer" aria-label="Donate via PayPal (opens in a new tab)">Donate</a></div><i class="foot"></i></div>',
    );
    const plain = draw([], [part("hdr", "tbHeader")]);
    expect(plain).not.toContain("tb-donate");
    expect(plain).not.toContain("tb-footer-slot");
    expect(plain).toContain('<i class="foot"></i>');
  });
});
