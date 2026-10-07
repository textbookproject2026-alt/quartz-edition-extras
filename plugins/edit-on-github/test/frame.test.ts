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
    expect(html).toContain('<div class="tb-header-slot"><i class="logo"></i><i class="hdr"></i></div>');
    expect(html).toContain('<div class="popover-hint"><i class="title"></i></div>');
  });

  it("without a header, leaves the logo in the sidebar and draws no header row", () => {
    const html = draw([part("logo", "tbHeaderLead")], [part("title")]);
    expect(html).toContain('<div class="left sidebar"><i class="logo"></i></div>');
    expect(html).not.toContain("tb-header-slot");
  });
});
