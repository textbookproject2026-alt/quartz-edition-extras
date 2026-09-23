/**
 * design.yaml: the design values, read when a book builds (BOOK-ONE-TO-QUARTZ
 * §4a, §8 step 6).
 *
 * The file sits beside dist/, and Quartz's plugin install copies the whole
 * plugin directory, so it is found from this module's own URL. Because it is
 * read at build time, editing it needs no `npm run build`.
 *
 * It becomes one <style> that
 *   - overrides the colour and font variables Quartz generates from the
 *     config's theme block (so that block is inert), which the graph also reads;
 *   - defines the --tb-* tokens the controls row, the suggest modal, the tag
 *     helper and the badge already use (their literal fallbacks stay);
 *   - carries the rules publish.css applies to book one: the type scale and
 *     measure, the lead paragraph, the h4 capitals, the annotation highlight,
 *     the mobile scale and the print styles (publish.css §3, §6, §8, §9).
 * Selectors live here; every value comes from the file.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

export const DESIGN_FILE = fileURLToPath(new URL("../design.yaml", import.meta.url));

// --- the file's shape ----------------------------------------------------------

type Kind = "colour" | "hex" | "length" | "number" | "font" | "boolean";

const PALETTE = {
  accent: "hex",
  accentHover: "colour",
  accentWash: "colour",
  heading: "colour",
  ink: "colour",
  muted: "colour",
  faint: "colour",
  border: "colour",
  background: "colour",
  backgroundSoft: "colour",
  mark: "colour",
} as const;
const HEADING = { size: "length", weight: "number", lineHeight: "number" } as const;

const SCHEMA = {
  palette: { light: PALETTE, dark: PALETTE },
  darkMode: "boolean",
  annotation: { highlight: "colour", focused: "colour" },
  fonts: { text: "font", mono: "font" },
  type: {
    body: { size: "length", lineHeight: "number" },
    lead: { size: "length", lineHeight: "number" },
    h1: HEADING,
    h2: HEADING,
    h3: HEADING,
    h4: { ...HEADING, letterSpacing: "length" },
    linkWeight: "number",
    mobile: { h1: "length", h2: "length", h3: "length" },
  },
  layout: { measure: "length", rhythm: "length", mobileWidth: "length" },
  controls: { size: "length" },
  print: { size: "length", lineHeight: "number", margin: "length" },
} as const;

type Shape<S> = S extends "boolean"
  ? boolean
  : S extends Kind
    ? string
    : { [K in keyof S]: Shape<S[K]> };
export type Design = Shape<typeof SCHEMA>;
type Palette = Shape<typeof PALETTE>;

// Plain values only: nothing that could end a declaration, a rule or the <style>.
const VALID: Record<Kind, RegExp> = {
  hex: /^#[0-9a-f]{6}$/i,
  colour:
    /^(#[0-9a-f]{3,8}|rgba?\(\s*[\d.]+%?\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*(,\s*[\d.]+%?\s*)?\))$/i,
  length: /^-?\d*\.?\d+(px|rem|em|pt|cm|mm|in|%)$/,
  number: /^\d*\.?\d+$/,
  font: /^[A-Za-z0-9][A-Za-z0-9 ]*$/,
  boolean: /^(true|false)$/,
};
const EXPECTED: Record<Kind, string> = {
  hex: 'a six-digit hex colour, like "#7C6CF0"',
  colour: 'a hex or rgb()/rgba() colour, like "#7C6CF0"',
  length: "a size with a unit, like 1.125rem, 720px or 11pt",
  number: "a plain number, like 600 or 1.65",
  font: "a font family name, like Inter",
  boolean: "true or false",
};

const check = (schema: unknown, value: unknown, path: string, errors: string[]): unknown => {
  if (typeof schema === "string") {
    const kind = schema as Kind;
    const ok =
      kind === "boolean"
        ? typeof value === "boolean"
        : (typeof value === "string" || typeof value === "number") &&
          VALID[kind].test(String(value).trim());
    if (!ok) errors.push(`${path}: ${JSON.stringify(value)} is not ${EXPECTED[kind]}`);
    return kind === "boolean" ? value : String(value).trim();
  }
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    errors.push(
      `${path || "the file"}: expected a group of values, found ${JSON.stringify(value)}`,
    );
    return {};
  }
  const out: Record<string, unknown> = {};
  const fields = schema as Record<string, unknown>;
  const given = value as Record<string, unknown>;
  for (const key of Object.keys(given)) {
    if (!(key in fields)) errors.push(`${path ? path + "." : ""}${key}: not a design value`);
  }
  for (const [key, sub] of Object.entries(fields)) {
    const at = path ? `${path}.${key}` : key;
    if (!(key in given)) errors.push(`${at}: missing`);
    else out[key] = check(sub, given[key], at, errors);
  }
  return out;
};

/** Parses and checks design.yaml's text. Throws, naming every bad key. */
export const parseDesign = (text: string, file = DESIGN_FILE): Design => {
  const errors: string[] = [];
  let raw: unknown;
  try {
    raw = parse(text);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }
  const design = errors.length ? undefined : check(SCHEMA, raw, "", errors);
  if (errors.length) {
    throw new Error(`edition-integrations: ${file} is not valid:\n  ${errors.join("\n  ")}`);
  }
  return design as Design;
};

export const loadDesign = (file = DESIGN_FILE): Design => {
  let text: string;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    throw new Error(
      `edition-integrations: ${file} is missing. It ships beside dist/; ` +
        "reinstall the plugin (npx quartz plugin update edition-integrations).",
    );
  }
  return parseDesign(text, file);
};

// --- what it emits -------------------------------------------------------------

const TEXT_STACK = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const MONO_STACK = "ui-monospace, SFMono-Regular, Menlo, monospace";

/** Quartz derives --accent-h/s/l from the accent; keep them in step with ours. */
const hsl = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [
    number,
    number,
    number,
  ];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

/** The colour variables for one palette: Quartz's, then the --tb-* tokens. */
const colours = (p: Palette) => {
  const accent = hsl(p.accent);
  return `
  --light: ${p.background};
  --lightgray: ${p.border};
  --gray: ${p.faint};
  --darkgray: ${p.ink};
  --dark: ${p.heading};
  --secondary: ${p.accent};
  --tertiary: ${p.accentHover};
  --highlight: ${p.accentWash};
  --textHighlight: ${p.mark};
  --accent-h: ${accent.h};
  --accent-s: ${accent.s}%;
  --accent-l: ${accent.l}%;
  --tb-accent: ${p.accent};
  --tb-accent-hover: ${p.accentHover};
  --tb-accent-wash: ${p.accentWash};
  --tb-ink: ${p.ink};
  --tb-muted: ${p.muted};
  --tb-faint: ${p.faint};
  --tb-border: ${p.border};
  --tb-bg: ${p.background};
  --tb-bg-soft: ${p.backgroundSoft};
  --tb-mark: ${p.mark};`;
};

/** The one stylesheet. Placed after Quartz's own, so equal selectors win. */
export const designCss = (d: Design): string => {
  const { type: t, layout, print } = d;
  const text = `"${d.fonts.text}", ${TEXT_STACK}`;
  const mono = `"${d.fonts.mono}", ${MONO_STACK}`;
  // Dark mode off: a dark saved-theme (or system preference) still gets the
  // light palette. Quartz's dark block is :root[saved-theme="dark"], so ours
  // must name it too to outrank it.
  const dark = d.darkMode ? d.palette.dark : d.palette.light;
  return `
:root {${colours(d.palette.light)}
  --titleFont: ${text};
  --headerFont: ${text};
  --bodyFont: ${text};
  --codeFont: ${mono};
  --tb-font-text: ${text};
  --tb-font-mono: ${mono};
  --tb-annotation: ${d.annotation.highlight};
  --tb-annotation-focused: ${d.annotation.focused};
  --tb-size-body: ${t.body.size};
  --tb-lh-body: ${t.body.lineHeight};
  --tb-size-lead: ${t.lead.size};
  --tb-lh-lead: ${t.lead.lineHeight};
  --tb-size-h1: ${t.h1.size};
  --tb-size-h2: ${t.h2.size};
  --tb-size-h3: ${t.h3.size};
  --tb-size-h4: ${t.h4.size};
  --tb-size-controls: ${d.controls.size};
  --tb-measure: ${layout.measure};
  --tb-rhythm: ${layout.rhythm};
}
:root[saved-theme="dark"] {${colours(dark)}
}
body {
  font-family: var(--tb-font-text);
}
/* The reading column, on the article itself: Quartz's grid track runs wider. */
article {
  max-width: var(--tb-measure);
  margin-left: auto;
  margin-right: auto;
}
article p,
article li {
  font-size: var(--tb-size-body);
  line-height: var(--tb-lh-body) !important; /* base.scss sets ~1.42 */
}
article p { margin: var(--tb-rhythm) 0; }
/* The paragraph right after a chapter's title (transforms.ts marks it). */
article p.tb-lead {
  font-size: var(--tb-size-lead);
  line-height: var(--tb-lh-lead) !important;
}
article h1 { font-size: var(--tb-size-h1); font-weight: ${t.h1.weight}; line-height: ${t.h1.lineHeight}; }
article h2 { font-size: var(--tb-size-h2); font-weight: ${t.h2.weight}; line-height: ${t.h2.lineHeight}; }
article h3 { font-size: var(--tb-size-h3); font-weight: ${t.h3.weight}; line-height: ${t.h3.lineHeight}; }
/* The "keycap" h4: a real heading, tracked capitals in CSS only. */
article h4 {
  font-size: var(--tb-size-h4);
  font-weight: ${t.h4.weight};
  line-height: ${t.h4.lineHeight};
  letter-spacing: ${t.h4.letterSpacing};
  text-transform: uppercase;
}
article h2 { margin-top: calc(var(--tb-rhythm) * 2); }
article h3,
article h4 { margin-top: calc(var(--tb-rhythm) * 1.5); }
article a { font-weight: ${t.linkWeight}; text-decoration: underline; text-underline-offset: 2px; }
article a:hover { color: var(--tertiary); }
pre, article code { background-color: var(--tb-bg-soft); }

/* Hypothes.is: the highlight colour only. The client itself is not touched. */
.hypothesis-highlight { background-color: var(--tb-annotation); }
.hypothesis-highlight.hypothesis-highlight-focused,
.hypothesis-highlight:focus { background-color: var(--tb-annotation-focused); }

@media (max-width: ${layout.mobileWidth}) {
  :root {
    --tb-size-h1: ${t.mobile.h1};
    --tb-size-h2: ${t.mobile.h2};
    --tb-size-h3: ${t.mobile.h3};
  }
  article p.tb-lead { font-size: var(--tb-size-body); }
}

/* Print: the chapter alone, at full width, with no annotation layer. */
@media print {
  #quartz-body > .sidebar,
  #quartz-body > footer,
  .page-header .breadcrumb-container,
  .page-header .content-meta,
  .center > hr,
  .page-footer,
  .tb-page-controls,
  .tb-anno-badge-row,
  #tb-tag-helper,
  #tb-suggest-overlay,
  .popover,
  hypothesis-sidebar,
  hypothesis-notebook,
  hypothesis-profile,
  hypothesis-adder {
    display: none !important;
  }
  .page,
  .page > #quartz-body {
    display: block;
    max-width: none;
    margin: 0;
    padding: 0;
  }
  .page > #quartz-body .center,
  article {
    max-width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
  }
  article,
  article p,
  article li {
    font-size: ${print.size};
    line-height: ${print.lineHeight} !important;
    color: #000;
  }
  .hypothesis-highlight,
  .hypothesis-highlight.hypothesis-highlight-focused {
    background-color: transparent;
  }
  article a {
    color: #000;
    text-decoration: underline;
    background: none;
  }
  article pre,
  article blockquote,
  article table {
    break-inside: avoid;
  }
  .article-title,
  article h1,
  article h2,
  article h3 {
    break-after: avoid;
  }
  @page {
    margin: ${print.margin};
  }
}
`;
};

/** The design's fonts from Google Fonts, whatever the config's theme block names. */
export const fontHref = (d: Design): string => {
  const family = (name: string) => name.trim().replace(/ +/g, "+");
  const text = `${family(d.fonts.text)}:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700`;
  const mono = `${family(d.fonts.mono)}:wght@400;600`;
  return `https://fonts.googleapis.com/css2?family=${text}&family=${mono}&display=swap`;
};
