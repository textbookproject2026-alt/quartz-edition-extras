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

  it("carries what book one's readers see today, pending D12", () => {
    expect(design.palette.light.accent).toBe("#7C6CF0");
    expect(design.darkMode).toBe(false);
  });

  it("overrides every colour and font variable Quartz generates", () => {
    for (const [prop, value] of Object.entries({
      "--light": "#FFFFFF",
      "--lightgray": "#E6E6E6",
      "--gray": "#9B9BA1",
      "--darkgray": "#2B2B2B",
      "--dark": "#2B2B2B",
      "--secondary": "#7C6CF0",
      "--tertiary": "#6A57E0",
      "--highlight": "#EEEBFD",
      "--textHighlight": "#FDF2B3",
    })) {
      expect(declared(css, ":root", prop), prop).toBe(value);
    }
    for (const prop of ["--titleFont", "--headerFont", "--bodyFont"]) {
      expect(declared(css, ":root", prop)).toMatch(/^"Inter", /);
    }
    expect(declared(css, ":root", "--codeFont")).toMatch(/^"JetBrains Mono", /);
    // Quartz's own value for #7C6CF0, which it derives from the accent.
    expect(declared(css, ":root", "--accent-h")).toBe("247");
  });

  it("defines publish.css's --tb-* tokens with its values", () => {
    for (const [prop, value] of Object.entries({
      "--tb-accent": "#7C6CF0",
      "--tb-accent-hover": "#6A57E0",
      "--tb-accent-wash": "#EEEBFD",
      "--tb-ink": "#2B2B2B",
      "--tb-muted": "#6E6E73",
      "--tb-faint": "#9B9BA1",
      "--tb-border": "#E6E6E6",
      "--tb-bg": "#FFFFFF",
      "--tb-bg-soft": "#F7F7F5",
      "--tb-mark": "#FDF2B3",
      "--tb-annotation": "rgba(124, 108, 240, 0.22)",
      "--tb-annotation-focused": "rgba(124, 108, 240, 0.40)",
      "--tb-size-body": "1.125rem",
      "--tb-lh-body": "1.65",
      "--tb-size-lead": "1.25rem",
      "--tb-lh-lead": "1.6",
      "--tb-size-h1": "2.25rem",
      "--tb-size-h2": "1.75rem",
      "--tb-size-h3": "1.375rem",
      "--tb-size-h4": "1.125rem",
      "--tb-size-controls": "0.85rem",
      "--tb-measure": "720px",
      "--tb-rhythm": "1.5rem",
    })) {
      expect(declared(css, ":root", prop), prop).toBe(value);
    }
  });

  it("keeps the page light for a dark saved-theme while dark mode is off", () => {
    expect(declared(css, ':root[saved-theme="dark"]', "--light")).toBe("#FFFFFF");
    expect(declared(css, ':root[saved-theme="dark"]', "--secondary")).toBe("#7C6CF0");
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
      "https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=JetBrains+Mono:wght@400;600&display=swap",
    );
  });
});

describe("editing design.yaml", () => {
  it("changes the CSS from the file alone, with no rebuild", () => {
    const dir = mkdtempSync(join(tmpdir(), "design-"));
    const file = join(dir, "design.yaml");
    writeFileSync(file, shipped.replace('accent: "#7C6CF0"', 'accent: "#0B7A75"'));
    const css = designCss(loadDesign(file));
    expect(declared(css, ":root", "--secondary")).toBe("#0B7A75");
    expect(declared(css, ":root", "--tb-accent")).toBe("#0B7A75");
  });

  it("uses the dark palette once dark mode is on", () => {
    const css = designCss(parseDesign(shipped.replace("darkMode: false", "darkMode: true")));
    expect(declared(css, ':root[saved-theme="dark"]', "--light")).toBe("#161618");
    expect(declared(css, ':root[saved-theme="dark"]', "--secondary")).toBe("#A79AF7");
    expect(declared(css, ":root", "--light")).toBe("#FFFFFF");
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
