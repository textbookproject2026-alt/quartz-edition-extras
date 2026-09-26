import { describe, expect, it } from "vitest";
import type { VNode } from "preact";
import { render } from "preact-render-to-string";
import type { QuartzComponentProps } from "@quartz-community/types";
import HomeLink from "../src/components/HomeLink";

const props = { displayClass: undefined } as unknown as QuartzComponentProps;
const html = (opts?: Parameters<typeof HomeLink>[0], p = props) =>
  render(HomeLink(opts)(p) as VNode);

describe("HomeLink", () => {
  it("is a plain link to the portal, in the platform's words", () => {
    expect(html()).toBe(
      '<p class="home-link"><a href="https://confused4now.org/">confused for now</a></p>',
    );
  });

  it("takes the address and the words from its options", () => {
    expect(html({ url: "https://example.org/", label: "home" })).toContain(
      '<a href="https://example.org/">home</a>',
    );
  });

  it("keeps Quartz's display class", () => {
    const out = html(undefined, { displayClass: "mobile-only" } as unknown as QuartzComponentProps);
    expect(out).toContain('class="mobile-only home-link"');
  });

  it("ships no script, so it works with SPA off", () => {
    const Comp = HomeLink();
    expect(Comp.afterDOMLoaded).toBeUndefined();
    expect(Comp.beforeDOMLoaded).toBeUndefined();
  });

  it("takes its size and colours from design.yaml's variables", () => {
    const { css } = HomeLink();
    expect(css).toContain("var(--tb-size-home-link, 0.85rem)");
    expect(css).toMatch(/\.home-link a \{[^}]*color: var\(--gray\)/);
    expect(css).toMatch(/:hover,\s*\.home-link a:focus-visible \{[^}]*color: var\(--secondary\)/);
    expect(css).toContain("font-style: italic");
    expect(css).not.toContain("position: fixed");
  });
});
