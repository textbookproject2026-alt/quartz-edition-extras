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
  accentSoft: "colour", // decoration only: link underlines, hover tints; never text
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
  fonts: { text: "font", ui: "font", mono: "font" },
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
  layout: {
    measure: "number",
    wideMeasure: "number",
    headerHeight: "length",
    rhythm: "length",
    mobileWidth: "length",
    narrowWidth: "length",
  },
  controls: { size: "length" },
  homeLink: { height: "length", iconHeight: "length" },
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
  hex: 'a six-digit hex colour, like "#52562F"',
  colour: 'a hex or rgb()/rgba() colour, like "#52562F"',
  length: "a size with a unit, like 1.125rem, 720px or 11pt",
  number: "a plain number, like 600 or 1.65",
  font: "a font family name, like Source Sans 3",
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

const TEXT_STACK = 'Georgia, "Times New Roman", serif';
const UI_STACK = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
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
  --tb-accent-soft: ${p.accentSoft};
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
  const ui = `"${d.fonts.ui}", ${UI_STACK}`;
  const mono = `"${d.fonts.mono}", ${MONO_STACK}`;
  // Dark mode off: a dark saved-theme (or system preference) still gets the
  // light palette. Quartz's dark block is :root[saved-theme="dark"], so ours
  // must name it too to outrank it.
  const dark = d.darkMode ? d.palette.dark : d.palette.light;
  return `
:root {${colours(d.palette.light)}
  --titleFont: ${ui};
  --headerFont: ${ui};
  --bodyFont: ${text};
  --codeFont: ${mono};
  --tb-font-text: ${text};
  --tb-font-ui: ${ui};
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
  /* The reader's text size (Appearance panel): the chapter only, never the chrome. */
  --tb-text-scale: 1;
  --tb-header-h: ${layout.headerHeight};
  /* The open Hypothes.is sidebar's width, from hypothesisConfig's onLayoutChange. */
  --tb-hypothesis-width: 0px;
  --tb-size-controls: ${d.controls.size};
  --tb-home-link-height: ${d.homeLink.height};
  --tb-home-link-icon-height: ${d.homeLink.iconHeight};
  --tb-measure-em: ${layout.measure};
  --tb-rhythm: ${layout.rhythm};
  /* The width of the annotation client's collapsed tab and buttons, reserved on phones. */
  --tb-annotation-gutter: 2.5rem;
}
:root[saved-theme="dark"] {${colours(dark)}
}
/* Quartz sets html { overflow-x: hidden } so nothing scrolls sideways. iOS
   Safari then stops keeping position: sticky elements (the header) stuck: they
   scroll away with the page. overflow-x: clip cuts off the same overflow without
   making a scroll container, so the header stays put and the page still can't
   scroll sideways. Browsers without clip keep Quartz's hidden. */
@supports (overflow-x: clip) {
  html { overflow-x: clip; }
}
/* Interface text (nav, explorer, search, controls, headings) in the ui face;
   the chapter's own paragraphs, lists, quotes, tables and captions in the text face. */
body {
  font-family: var(--tb-font-ui);
}
article p,
article li,
article blockquote,
article table,
article figcaption,
article dd,
article dt {
  font-family: var(--tb-font-text);
}
article h1,
article h2,
article h3,
article h4,
article h5,
article h6,
.article-title {
  font-family: var(--tb-font-ui);
}
/* The reader's settings (readerPrefs, applied in <head> before first paint). */
:root[data-tb-text="small"] { --tb-text-scale: 0.9; }
:root[data-tb-text="large"] { --tb-text-scale: 1.15; }
:root[data-tb-width="wide"] { --tb-measure-em: ${layout.wideMeasure}; }
/* The reading column, on the article itself: Quartz's grid track runs wider. In
   ems of body text, so it keeps its characters a line at every text size. */
article {
  max-width: calc(var(--tb-measure-em) * var(--tb-size-body) * var(--tb-text-scale));
  margin-left: auto;
  margin-right: auto;
}
article p,
article li {
  font-size: calc(var(--tb-size-body) * var(--tb-text-scale));
  line-height: var(--tb-lh-body) !important; /* base.scss sets ~1.42 */
}
article p { margin: var(--tb-rhythm) 0; }
/* The paragraph right after a chapter's title (transforms.ts marks it). */
article p.tb-lead {
  font-size: calc(var(--tb-size-lead) * var(--tb-text-scale));
  line-height: var(--tb-lh-lead) !important;
}
article h1 { font-size: calc(var(--tb-size-h1) * var(--tb-text-scale)); font-weight: ${t.h1.weight}; line-height: ${t.h1.lineHeight}; }
article h2 { font-size: calc(var(--tb-size-h2) * var(--tb-text-scale)); font-weight: ${t.h2.weight}; line-height: ${t.h2.lineHeight}; }
article h3 { font-size: calc(var(--tb-size-h3) * var(--tb-text-scale)); font-weight: ${t.h3.weight}; line-height: ${t.h3.lineHeight}; }
/* The "keycap" h4: a real heading, tracked capitals in CSS only. */
article h4 {
  font-size: calc(var(--tb-size-h4) * var(--tb-text-scale));
  font-weight: ${t.h4.weight};
  line-height: ${t.h4.lineHeight};
  letter-spacing: ${t.h4.letterSpacing};
  text-transform: uppercase;
}
article h2 { margin-top: calc(var(--tb-rhythm) * 2); }
article h3,
article h4 { margin-top: calc(var(--tb-rhythm) * 1.5); }
article a { font-weight: ${t.linkWeight}; text-decoration: underline; text-underline-offset: 2px; text-decoration-color: var(--tb-accent-soft); }
article a:hover { color: var(--tertiary); }
pre, article code { background-color: var(--tb-bg-soft); }

/* Hypothes.is: the highlight colour only. The client itself is not touched. */
.hypothesis-highlight { background-color: var(--tb-annotation); }
.hypothesis-highlight.hypothesis-highlight-focused,
.hypothesis-highlight:focus { background-color: var(--tb-annotation-focused); }
/* Public annotations turned off with the client already loaded: its highlights
   go now; the client itself goes at the next page load (it has no unload). */
:root.tb-annotations-off .hypothesis-highlight,
:root.tb-annotations-off .hypothesis-highlight.hypothesis-highlight-focused {
  background-color: transparent;
}
/* Anchored headings and paragraphs stop below the sticky header. */
article [id],
article [data-pnum] { scroll-margin-top: calc(var(--tb-header-h) + 1rem); }
/* The sidebar open on a wide screen: the page makes room for it, so the text and
   the paragraph pencils stay in view, and the right rail (graph, contents,
   backlinks) goes under the chapter, as on Quartz's tablet layout, so the text
   keeps its width. Narrower than this, the sidebar overlays the page. */
@media (min-width: 1280px) {
  :root.tb-hypothesis-expanded body {
    box-sizing: border-box;
    padding-right: var(--tb-hypothesis-width);
  }
  :root.tb-hypothesis-expanded .page > #quartz-body {
    grid-template-columns: 320px auto;
    grid-template-rows: auto auto auto auto;
    grid-template-areas:
      "grid-sidebar-left grid-header"
      "grid-sidebar-left grid-center"
      "grid-sidebar-left grid-sidebar-right"
      "grid-sidebar-left grid-footer";
  }
  :root.tb-hypothesis-expanded .page > #quartz-body > .sidebar.right {
    position: static;
    height: auto;
  }
  /* The tag helper beside the open sidebar (14rem, 16px each side) kept off the
     text too, when the text column stays at least 560px with that room taken
     (tagHelper measures and sets the class); otherwise it overlays. */
  :root.tb-hypothesis-expanded.tb-tag-helper-room body {
    padding-right: calc(var(--tb-hypothesis-width) + 14rem + 32px);
  }
}

@media (max-width: ${layout.mobileWidth}) {
  :root {
    --tb-size-h1: ${t.mobile.h1};
    --tb-size-h2: ${t.mobile.h2};
    --tb-size-h3: ${t.mobile.h3};
  }
  article p.tb-lead { font-size: var(--tb-size-body); }
}

/* Phones: Quartz's phone layout, where the left sidebar is the header row. */
@media (max-width: ${layout.narrowWidth}) {
  /* One compact row: menu, the book's title on one line, search as an icon.
     The full title is the page's own heading. */
  #quartz-body .left.sidebar {
    flex-wrap: nowrap;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
    max-width: 100%;
  }
  #quartz-body .left.sidebar .page-title {
    flex: 1 1 auto;
    min-width: 0;
    /* The unwrapped title must not widen the header, or the whole phone
       layout grows with it: its own length doesn't count toward the width. */
    contain: inline-size;
    margin: 0;
    font-size: 1.05rem;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* Links get text-wrap: pretty, which turns wrapping back on inside the title.
     A block that clips itself, so the link's own box never runs past the screen. */
  #quartz-body .left.sidebar .page-title a {
    display: block;
    white-space: nowrap;
    text-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* Quartz's mobile spacer (flex: 2) would take most of the row; the title's own
     growth already pushes search to the right. */
  #quartz-body .left.sidebar .spacer {
    display: none;
  }
  /* Search and reader mode take only their icons' width; the title gets the rest. */
  #quartz-body .left.sidebar > .flex-component {
    flex: 0 0 auto;
  }
  #quartz-body .left.sidebar .search {
    flex: 0 0 auto;
    width: auto;
  }
  #quartz-body .left.sidebar .search .search-button {
    width: auto;
    padding: 0.4rem;
    border-color: transparent;
    background: none;
  }
  /* The button keeps its aria-label; only the visible word goes. */
  #quartz-body .left.sidebar .search .search-button p { display: none; }
  /* The front page's heading is the book's title: the header doesn't repeat it,
     but keeps its place so the row doesn't jump. */
  body[data-slug="index"] #quartz-body .left.sidebar .page-title { visibility: hidden; }

  /* Quartz's phone grid is one auto column, sized by its items' content: a graph
     canvas drawn wider at load (a window narrowed afterwards) held the whole page
     wider than the screen. Its items may be as narrow as the screen; what's
     inside clips (the graph's frame) or wraps. */
  .page > #quartz-body > * {
    min-width: 0;
  }

  /* The annotation client's tab and its eye and note buttons sit on the right
     edge: the header bar keeps clear of them, open or closed. */
  html.tb-hypothesis-on #quartz-body .left.sidebar {
    box-sizing: border-box;
    padding-right: var(--tb-annotation-gutter);
  }

  /* Quartz's open menu panel is positioned inside the header, which starts at
     the page's side margin, so a 100vw panel ran that far past the screen's
     right edge. Pin it to the screen instead. */
  #quartz-body .explorer .explorer-content {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    max-width: 100vw;
    /* The page's side margin on the left, and the annotation gutter on the right. */
    padding-left: 1rem;
    padding-right: var(--tb-annotation-gutter);
  }

  /* Compact: the header bar, and the space from it to the page's heading. */
  #quartz-body .left.sidebar {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  #quartz-body .page-header h1.article-title { margin-top: 0.75rem; }
  #quartz-body .page-header .breadcrumb-container { margin-top: 0.25rem; }
}

/* Wherever Quartz's grid isn't its desktop one, nothing but the page is at the
   right edge, where the annotation client's strip sits: the header and the text
   keep clear of it, open or closed. (On a desktop the right rail is under it.)
   The width is Quartz's own: breakpointBand (runtime.ts) reads its tablet grid
   rule and gives this rule that rule's upper bound, before the first paint. The
   strip exists only once a script has loaded the client, so until then this
   placeholder matches nothing. */
@media (max-width: 0px) {
  html.tb-hypothesis-on #quartz-body .center {
    box-sizing: border-box;
    padding-right: var(--tb-annotation-gutter);
  }
}

/* Print: the chapter alone, at full width, with no annotation layer, always light. */
@media print {
  :root, :root[saved-theme="dark"] {${colours(d.palette.light)}
  }
  #quartz-body > .sidebar,
  #quartz-body > footer,
  .page-header .breadcrumb-container,
  .page-header .content-meta,
  .center > hr,
  .page-footer,
  .tb-page-controls,
  .tb-header,
  .tb-dialog,
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
  // Source Serif 4 is a variable font with an optical-size axis; asking for
  // opsz 8..60 lets the browser pick the right cut for each size. A family
  // without that axis would 400 on this request, so it is asked for by name.
  const text =
    d.fonts.text.trim() === "Source Serif 4"
      ? `${family(d.fonts.text)}:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,600`
      : `${family(d.fonts.text)}:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700`;
  const ui = `${family(d.fonts.ui)}:wght@400;600;700`;
  const mono = `${family(d.fonts.mono)}:wght@400;600`;
  return `https://fonts.googleapis.com/css2?family=${text}&family=${ui}&family=${mono}&display=swap`;
};
