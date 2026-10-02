import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { DESIGN_FILE, designCss, fontHref, loadDesign, parseDesign } from "../src/design";

const shipped = readFileSync(DESIGN_FILE, "utf8");

/** The value a declaration has inside the first block the selector opens. */
const declared = (css: string, selector: string, prop: string): string | undefined => {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) return undefined;
  const block = css.slice(start, css.indexOf("}", start));
  return new RegExp(`${prop}:\\s*([^;]+);`).exec(block)?.[1]?.trim();
};

describe("design.yaml as shipped", () => {
  const design = loadDesign();
  const css = designCss(design);

  it("sits beside dist/, where the built plugin looks for it", () => {
    expect(DESIGN_FILE.endsWith("/edition-integrations/design.yaml")).toBe(true);
  });

  it("carries the Confused for Now palette (v3, 2 Oct 2026), with dark mode on", () => {
    expect(design.palette.light.accent).toBe("#52562F");
    expect(design.palette.dark.accent).toBe("#A7A374");
    expect(design.darkMode).toBe(true);
    expect(design.fonts).toEqual({ text: "Source Serif 4", ui: "Source Sans 3", mono: "JetBrains Mono" });
  });

  it("clears WCAG AA for every text colour, in both themes", () => {
    const srgb = (hex: string) =>
      [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number];
    const rgba = (c: string): [number, number, number, number] => {
      const m = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\s*\)$/i.exec(c);
      if (m) return [Number(m[1]) / 255, Number(m[2]) / 255, Number(m[3]) / 255, m[4] === undefined ? 1 : Number(m[4])];
      return [...srgb(c), 1];
    };
    /** The colour as seen over the background (rgba blended), as luminance. */
    const luminance = (c: string, over: string) => {
      const [r, g, b, a] = rgba(c);
      const bg = srgb(over);
      const lin = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
      const [R, G, B] = [r, g, b].map((v, i) => lin(v * a + bg[i] * (1 - a)));
      return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    };
    const contrast = (fg: string, bg: string) => {
      const [hi, lo] = [luminance(fg, bg), luminance(bg, bg)].sort((x, y) => y - x);
      return (hi + 0.05) / (lo + 0.05);
    };
    for (const theme of ["light", "dark"] as const) {
      const p = design.palette[theme];
      for (const surface of [p.background, p.backgroundSoft]) {
        for (const key of ["ink", "heading", "muted", "accent"] as const) {
          expect(contrast(p[key], surface), `${theme} ${key} on ${surface}`).toBeGreaterThanOrEqual(4.5);
        }
      }
      // Focus rings and the graph's current page use the accent: 3:1 is the floor.
      expect(contrast(p.accent, p.background)).toBeGreaterThanOrEqual(3);
    }
    // accentSoft is decoration only, and this is why: in light mode it would fail as text.
    expect(contrast(design.palette.light.accentSoft, design.palette.light.background)).toBeLessThan(4.5);
    // The figures recorded in design.yaml's header.
    expect(contrast(design.palette.light.ink, "#FFFFFF")).toBeCloseTo(16.1, 1);
    expect(contrast(design.palette.light.accent, "#FFFFFF")).toBeCloseTo(7.7, 1);
    expect(contrast(design.palette.dark.accent, "#17181C")).toBeCloseTo(6.9, 1);
  });

  it("overrides every colour and font variable Quartz generates", () => {
    for (const [prop, value] of Object.entries({
      "--light": "#FFFFFF",
      "--lightgray": "#DADCE0",
      "--gray": "#9AA0A6",
      "--darkgray": "#202124",
      "--dark": "#202124",
      "--secondary": "#52562F",
      "--tertiary": "#353820",
      "--highlight": "#F0EFE8",
      "--textHighlight": "#FDF2B3",
    })) {
      expect(declared(css, ":root", prop), prop).toBe(value);
    }
    for (const prop of ["--titleFont", "--headerFont"]) {
      expect(declared(css, ":root", prop)).toMatch(/^"Source Sans 3", /);
    }
    expect(declared(css, ":root", "--bodyFont")).toMatch(/^"Source Serif 4", Georgia/);
    expect(declared(css, ":root", "--tb-font-ui")).toMatch(/^"Source Sans 3", /);
    expect(declared(css, ":root", "--tb-font-text")).toMatch(/^"Source Serif 4", /);
    expect(declared(css, ":root", "--codeFont")).toMatch(/^"JetBrains Mono", /);
    // Quartz's own hue for #52562F, which it derives from the accent.
    expect(declared(css, ":root", "--accent-h")).toBe("66");
  });

  it("defines publish.css's --tb-* tokens with its values", () => {
    for (const [prop, value] of Object.entries({
      "--tb-accent": "#52562F",
      "--tb-accent-hover": "#353820",
      "--tb-accent-soft": "#9B9569",
      "--tb-accent-wash": "#F0EFE8",
      "--tb-ink": "#202124",
      "--tb-muted": "#5F6368",
      "--tb-faint": "#9AA0A6",
      "--tb-border": "#DADCE0",
      "--tb-bg": "#FFFFFF",
      "--tb-bg-soft": "#F1F3F4",
      "--tb-mark": "#FDF2B3",
      "--tb-annotation": "rgba(155, 149, 105, 0.30)",
      "--tb-annotation-focused": "rgba(155, 149, 105, 0.50)",
      "--tb-size-body": "1.125rem",
      "--tb-lh-body": "1.65",
      "--tb-size-lead": "1.25rem",
      "--tb-lh-lead": "1.6",
      "--tb-size-h1": "2.25rem",
      "--tb-size-h2": "1.75rem",
      "--tb-size-h3": "1.375rem",
      "--tb-size-h4": "1.125rem",
      "--tb-size-controls": "0.85rem",
      "--tb-home-link-height": "32px",
      "--tb-home-link-icon-height": "28px",
      "--tb-measure": "720px",
      "--tb-rhythm": "1.5rem",
    })) {
      expect(declared(css, ":root", prop), prop).toBe(value);
    }
  });

  it("uses the dark palette for a dark saved-theme, and the light one in print", () => {
    expect(declared(css, ':root[saved-theme="dark"]', "--light")).toBe("#17181C");
    expect(declared(css, ':root[saved-theme="dark"]', "--secondary")).toBe("#A7A374");
    const print = css.slice(css.indexOf("@media print"));
    expect(declared(print, ':root, :root[saved-theme="dark"]', "--light")).toBe("#FFFFFF");
    expect(declared(print, ':root, :root[saved-theme="dark"]', "--secondary")).toBe("#52562F");
  });

  it("sets the chapter's prose in the text face and the interface in the ui face", () => {
    expect(declared(css, "body", "font-family")).toBe("var(--tb-font-ui)");
    expect(css).toMatch(/article p,\narticle li,\narticle blockquote,[^{]*\{\s*font-family: var\(--tb-font-text\);/);
    expect(css).toMatch(/article h1,\narticle h2,[^{]*\.article-title \{\s*font-family: var\(--tb-font-ui\);/);
    expect(declared(css, "article a", "text-decoration-color")).toBe("var(--tb-accent-soft)");
  });

  it("has the lead paragraph, the h4 capitals and the annotation highlight", () => {
    expect(declared(css, "article p.tb-lead", "font-size")).toBe("var(--tb-size-lead)");
    expect(declared(css, "article h4", "text-transform")).toBe("uppercase");
    expect(declared(css, "article h4", "letter-spacing")).toBe("0.04em");
    expect(declared(css, ".hypothesis-highlight", "background-color")).toBe("var(--tb-annotation)");
  });

  it("prints the chapter alone, without the annotation layer", () => {
    const print = css.slice(css.indexOf("@media print"));
    for (const hidden of [
      "#quartz-body > .sidebar",
      "#quartz-body > footer",
      ".tb-page-controls",
      "hypothesis-sidebar",
      "hypothesis-adder",
    ]) {
      expect(print).toContain(hidden);
    }
    expect(print).toContain("font-size: 11pt;");
    expect(print).toContain("margin: 2cm;");
    expect(print).toMatch(/\.hypothesis-highlight[^{]*\{\s*background-color: transparent;/);
  });

  it("loads its own fonts", () => {
    expect(fontHref(design)).toBe(
      "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,600&family=Source+Sans+3:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap",
    );
  });
});

describe("editing design.yaml", () => {
  it("changes the CSS from the file alone, with no rebuild", () => {
    const dir = mkdtempSync(join(tmpdir(), "design-"));
    const file = join(dir, "design.yaml");
    writeFileSync(file, shipped.replace('accent: "#52562F"', 'accent: "#0B7A75"'));
    const css = designCss(loadDesign(file));
    expect(declared(css, ":root", "--secondary")).toBe("#0B7A75");
    expect(declared(css, ":root", "--tb-accent")).toBe("#0B7A75");
  });

  it("keeps a dark saved-theme light once dark mode is off", () => {
    const css = designCss(parseDesign(shipped.replace("darkMode: true", "darkMode: false")));
    expect(declared(css, ':root[saved-theme="dark"]', "--light")).toBe("#FFFFFF");
    expect(declared(css, ':root[saved-theme="dark"]', "--secondary")).toBe("#52562F");
  });

  it("names a missing fonts.ui or accentSoft", () => {
    const noUi = shipped.replace("  ui: Source Sans 3\n", "");
    expect(() => parseDesign(noUi)).toThrow(/fonts\.ui: missing/);
    const noSoft = shipped.replace(/    accentSoft: "#9B9569".*\n/, "");
    expect(() => parseDesign(noSoft)).toThrow(/palette\.light\.accentSoft: missing/);
  });

  it("refuses a value that could break out of the stylesheet, naming the key", () => {
    const bad = shipped.replace('mark: "#FDF2B3"', 'mark: "red; } body { display: none"');
    expect(() => parseDesign(bad)).toThrow(/palette\.light\.mark: .* is not a hex or rgb/);
  });

  it("names a missing value, an unknown one and a typo'd kind", () => {
    const edited = shipped
      .replace("  margin: 2cm\n", "  margins: 2cm\n")
      .replace("measure: 720px", "measure: 720");
    let message = "";
    try {
      parseDesign(edited);
    } catch (error) {
      message = (error as Error).message;
    }
    expect(message).toContain("print.margins: not a design value");
    expect(message).toContain("print.margin: missing");
    expect(message).toContain("layout.measure: 720 is not a size with a unit");
  });

  it("says where the file should be when it is missing", () => {
    expect(() => loadDesign("/nowhere/design.yaml")).toThrow(/missing\. It ships beside dist\//);
  });
});
