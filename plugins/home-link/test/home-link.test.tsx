import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import type { VNode } from "preact";
import { render } from "preact-render-to-string";
import type { QuartzComponentProps } from "@quartz-community/types";
import HomeLink from "../src/components/HomeLink";
import { logoFull, logoIcon } from "../src/components/logos";

const props = { displayClass: undefined } as unknown as QuartzComponentProps;
const html = (opts?: Parameters<typeof HomeLink>[0], p = props) =>
  render(HomeLink(opts)(p) as VNode);
const asset = (file: string) =>
  readFileSync(new URL(`../assets/${file}`, import.meta.url), "utf8").trim();

describe("HomeLink", () => {
  it("is a plain link to the portal, named for assistive tech", () => {
    expect(html()).toMatch(
      /^<p class="home-link"><a href="https:\/\/confused4now\.org\/" aria-label="Confused for Now \(home\)"><svg /,
    );
  });

  it("inlines both logos, hidden from assistive tech, in currentColor", () => {
    const svgs = html().match(/<svg [^>]*>/g) ?? [];
    expect(svgs).toEqual([
      `<svg class="home-link-full" viewBox="${logoFull.viewBox}" fill="currentColor" aria-hidden="true" focusable="false">`,
      `<svg class="home-link-icon" viewBox="${logoIcon.viewBox}" fill="currentColor" aria-hidden="true" focusable="false">`,
    ]);
    expect(html()).toContain(logoFull.markup);
    expect(html()).toContain(logoIcon.markup);
  });

  it("inlines the SVGs in assets/ as they are (npm run logos)", () => {
    for (const [logo, file] of [
      [logoFull, "logo-full.svg"],
      [logoIcon, "icon-only-logo.svg"],
    ] as const) {
      expect(asset(file)).toBe(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${logo.viewBox}" fill="currentColor">${logo.markup}</svg>`,
      );
    }
  });

  it("takes the address and the name from its options", () => {
    expect(html({ url: "https://example.org/", label: "home" })).toContain(
      '<a href="https://example.org/" aria-label="home">',
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

  it("shows one logo at a time: the full one from 1200px, the icon below", () => {
    const { css } = HomeLink();
    expect(css).toMatch(/\n\.home-link \.home-link-full \{[^}]*display: none;/);
    expect(css).not.toMatch(/\n\.home-link \.home-link-icon \{[^}]*display: none;/);
    expect(css).toMatch(
      /@media all and \(min-width: 1200px\) \{\s*\.home-link \.home-link-full \{\s*display: block;\s*\}\s*\.home-link \.home-link-icon \{\s*display: none;\s*\}\s*\}/,
    );
  });

  it("takes its heights and colours from design.yaml's variables", () => {
    const { css } = HomeLink();
    expect(css).toContain("height: var(--tb-home-link-height, 32px)");
    expect(css).toContain("height: var(--tb-home-link-icon-height, 28px)");
    expect(css).toMatch(/\.home-link a \{[^}]*color: var\(--dark\)/);
    expect(css).toMatch(/:hover,\s*\.home-link a:focus-visible \{[^}]*color: var\(--secondary\)/);
    expect(css).toMatch(/\.home-link a:focus-visible \{[^}]*outline: 2px solid var\(--secondary\)/);
    expect(css).not.toContain("position: fixed");
  });
});
