/**
 * Cite this page (the header's ⋯ menu): an APA 7 reference and a Creative
 * Commons attribution line, from what the header carries (the book's title,
 * authors and licence from the registry; the page's title) and the page's URL.
 * A field that's missing is left out, with the punctuation around it.
 *
 * Each result is a list of runs, { text, italic? }, so the dialog can set the
 * titles in italics with textContent alone, and `plain()` gives the copy.
 */
export interface CiteInput {
  authors: string;
  bookTitle: string;
  pageTitle: string;
  licence: string;
  url: string;
  /** The day the reader looked, for APA's "Retrieved …" (the page can change). */
  accessed: Date;
}
export type Run = { text: string; italic?: boolean };

const LICENCES: Record<string, { name: string; url: string }> = {
  "CC-BY-4.0": { name: "CC BY 4.0", url: "https://creativecommons.org/licenses/by/4.0/" },
  "CC-BY-SA-4.0": { name: "CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/" },
  "CC-BY-NC-4.0": { name: "CC BY-NC 4.0", url: "https://creativecommons.org/licenses/by-nc/4.0/" },
  "CC-BY-NC-SA-4.0": { name: "CC BY-NC-SA 4.0", url: "https://creativecommons.org/licenses/by-nc-sa/4.0/" },
  "CC0-1.0": { name: "CC0 1.0", url: "https://creativecommons.org/publicdomain/zero/1.0/" },
};

/** "A Name, B Name and C Name" (or with &) as a list of names. */
export const splitAuthors = (authors: string): string[] =>
  authors
    .split(/\s*(?:,|&|\band\b)\s*/)
    .map((n) => n.trim())
    .filter(Boolean);

/**
 * "Brandon Sommer" -> "Sommer, B."; one word (an organisation) stays as it is.
 * ponytail: the last word is taken as the surname, so "Ludwig van Beethoven"
 * comes out "Beethoven, L. v."; give such names in the registry already inverted
 * if it matters.
 */
export const apaName = (name: string): string => {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length < 2) return name;
  const last = parts.pop()!;
  return `${last}, ${parts.map((p) => `${p.charAt(0).toUpperCase()}.`).join(" ")}`;
};

/** APA's list: "A", "A, & B", "A, B, & C". */
const apaList = (names: string[]): string =>
  names.length <= 1
    ? (names[0] ?? "")
    : names.length === 2
      ? `${names[0]}, & ${names[1]}`
      : `${names.slice(0, -1).join(", ")}, & ${names.at(-1)}`;

const sentence = (s: string) => (/[.?!]$/.test(s) ? s : `${s}.`);

export const apa = (c: CiteInput): Run[] => {
  const who = apaList(splitAuthors(c.authors).map(apaName));
  const day = c.accessed.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  // A page of the book is "In <book>"; the front page (no title of its own) is the book.
  const page = c.pageTitle && c.pageTitle !== c.bookTitle ? c.pageTitle : "";
  const runs: Run[] = [];
  const title: Run[] = page
    ? [{ text: `${sentence(page)} ` }, ...(c.bookTitle ? [{ text: "In " }, { text: c.bookTitle, italic: true }, { text: ". " }] : [])]
    : c.bookTitle
      ? [{ text: c.bookTitle, italic: true }, { text: ". " }]
      : [];
  if (who) runs.push({ text: `${sentence(who)} (n.d.). ` }, ...title);
  else if (title.length) {
    // No author: the title takes the author's place, then the date.
    const [first, ...rest] = title;
    runs.push({ ...first!, text: first!.text.replace(/ $/, "") }, { text: " (n.d.). " }, ...rest);
  } else runs.push({ text: "(n.d.). " });
  runs.push({ text: `Retrieved ${day}, from ${c.url}` });
  return runs;
};

export const attribution = (c: CiteInput): Run[] => {
  const page = c.pageTitle && c.pageTitle !== c.bookTitle ? c.pageTitle : "";
  const lic = LICENCES[c.licence];
  const runs: Run[] = [{ text: `“${page || c.bookTitle || c.url}”` }];
  if (c.authors) runs.push({ text: ` by ${splitAuthors(c.authors).join(", ")}` });
  if (page && c.bookTitle) runs.push({ text: ", from " }, { text: c.bookTitle, italic: true });
  runs.push({ text: `, ${c.url}` });
  if (lic) runs.push({ text: `, is licensed under ${lic.name} (${lic.url})` });
  else if (c.licence) runs.push({ text: `, is licensed under ${c.licence}` });
  runs.push({ text: "." });
  return runs;
};

export const plain = (runs: Run[]): string => runs.map((r) => r.text).join("");

/** The licence's short name for the dialog's label ("CC BY-SA 4.0"), or "". */
export const licenceName = (id: string): string => LICENCES[id]?.name ?? id;

// --- The builder's citations ------------------------------------------------------
// A book on the shared builder embeds <script id="tb-cite">: the page's and the
// book's CSL-JSON and their citations in four styles, formatted at build time
// (quartz-book's builder/citations.mjs). The dialog picks a scope and a style,
// fills in the reader's access date, and makes BibTeX, RIS and CSL-JSON here.
// Without it (an edition), the dialog is APA and the attribution above.

export type StyleKey = "apa" | "chicago" | "mla" | "harvard";
export const STYLES: [StyleKey, string][] = [
  ["apa", "APA 7"],
  ["chicago", "Chicago"],
  ["mla", "MLA"],
  ["harvard", "Harvard"],
];
export type Scope = "paragraph" | "chapter" | "book";

type CslName = { family?: string; given?: string; literal?: string };
type CslDate = { "date-parts": number[][] };
export interface CslItem {
  id: string;
  type: string;
  title: string;
  URL: string;
  author?: CslName[];
  publisher?: string;
  issued?: CslDate;
  accessed?: CslDate;
  language?: string;
  abstract?: string;
  keyword?: string;
  DOI?: string;
  "container-title"?: string;
  license?: string;
  note?: string;
}
export interface CiteData {
  version: number;
  chapter: CslItem | null;
  book: CslItem;
  styles: { chapter?: Record<StyleKey, Run[]>; book: Record<StyleKey, Run[]> };
}

/** The page's embedded data, or null (an edition, or a page built before it). */
export const readCiteData = (doc: Document): CiteData | null => {
  try {
    const d = JSON.parse(doc.getElementById("tb-cite")?.textContent ?? "") as CiteData;
    return d && d.version === 1 && d.book?.URL && d.styles?.book ? d : null;
  } catch {
    return null;
  }
};

/** Cite Them Right's access date: "9 October 2026". */
export const accessedText = (d: Date): string =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

/**
 * One scope's item and citations. "paragraph" is the chapter's, at its #p<n>
 * address and with "(para. n)" after it; the access date is today's.
 */
export function scoped(data: CiteData, scope: Scope, accessed: Date, para = 0) {
  const own = scope !== "book" && data.chapter && data.styles.chapter;
  const base = own ? data.chapter! : data.book;
  const styles = own ? data.styles.chapter! : data.styles.book;
  const n = scope === "paragraph" && own ? para : 0;
  const url = n ? `${base.URL}#p${n}` : base.URL;
  const day = accessedText(accessed);
  const out = {} as Record<StyleKey, Run[]>;
  for (const [key] of STYLES)
    out[key] = (styles[key] ?? []).map((r) => ({
      ...r,
      text: r.text.replaceAll("{accessed}", day).replace(base.URL, n ? `${url} (para. ${n})` : url),
    }));
  const item: CslItem = {
    ...base,
    id: url,
    URL: url,
    accessed: { "date-parts": [[accessed.getFullYear(), accessed.getMonth() + 1, accessed.getDate()]] },
    ...(n ? { note: `para. ${n}` } : {}),
  };
  return { item, styles: out };
}

const ymd = (d?: CslDate): number[] => d?.["date-parts"]?.[0] ?? [];
const pad = (n?: number) => String(n ?? "").padStart(2, "0");
const nameOf = (a: CslName) => (a.literal ? a.literal : [a.family, a.given].filter(Boolean).join(", "));

/** A citation key: first author's family name, the year, the title's first word, ASCII. */
export const citeKey = (item: CslItem): string => {
  const ascii = (s: string) =>
    s.normalize("NFKD").replace(/[^A-Za-z0-9]/g, "");
  const who = ascii(item.author?.[0]?.family ?? item.author?.[0]?.literal ?? "");
  const word = ascii((item.title.match(/[\p{L}\p{N}]+/gu) ?? []).find((w) => w.length > 3) ?? "");
  return `${who}${ymd(item.issued)[0] ?? ""}${word}`.toLowerCase() || "citation";
};

const BIB_TYPES: Record<string, string> = { chapter: "incollection", book: "book", report: "techreport" };
const bibEscape = (s: string) =>
  s.replace(/\\/g, "\\textbackslash{}").replace(/([{}&%$#_])/g, "\\$1").replace(/~/g, "\\textasciitilde{}").replace(/\^/g, "\\textasciicircum{}");

export function bibtex(item: CslItem): string {
  const [y, m, d] = ymd(item.issued);
  const [ay, am, ad] = ymd(item.accessed);
  const esc = (v?: string) => (v ? bibEscape(v) : undefined);
  // Values escaped here; the url stays verbatim, as biblatex reads it.
  const fields: [string, string | undefined][] = [
    ["author", item.author?.map((a) => (a.literal ? `{${bibEscape(a.literal)}}` : bibEscape(nameOf(a)))).join(" and ")],
    ["title", esc(item.title)],
    ["booktitle", item.type === "chapter" ? esc(item["container-title"]) : undefined],
    [item.type === "report" ? "institution" : "publisher", esc(item.publisher)],
    ["year", y ? String(y) : undefined],
    ["date", y && m && d ? `${y}-${pad(m)}-${pad(d)}` : undefined],
    ["url", item.URL],
    ["urldate", ay ? `${ay}-${pad(am)}-${pad(ad)}` : undefined],
    ["doi", item.DOI],
    ["language", esc(item.language)],
    ["note", esc(item.note)],
    ["keywords", esc(item.keyword)],
    ["abstract", esc(item.abstract)],
  ];
  const body = fields
    .filter(([, v]) => v)
    .map(([k, v]) => `  ${k} = {${v}}`)
    .join(",\n");
  return `@${BIB_TYPES[item.type] ?? "misc"}{${citeKey(item)},\n${body}\n}\n`;
}

const RIS_TYPES: Record<string, string> = { chapter: "CHAP", book: "BOOK", report: "RPRT" };

export function ris(item: CslItem): string {
  const [y, m, d] = ymd(item.issued);
  const [ay, am, ad] = ymd(item.accessed);
  const lines: [string, string | undefined][] = [
    ["TY", RIS_TYPES[item.type] ?? "GEN"],
    ["TI", item.title],
    ...(item.author ?? []).map((a): [string, string] => ["AU", nameOf(a)]),
    ["T2", item["container-title"]],
    ["PB", item.publisher],
    ["PY", y ? String(y) : undefined],
    ["DA", y ? `${y}/${pad(m)}/${pad(d)}` : undefined],
    ["UR", item.URL],
    ["Y2", ay ? `${ay}/${pad(am)}/${pad(ad)}` : undefined],
    ["DO", item.DOI],
    ["LA", item.language],
    ["AB", item.abstract],
    ...(item.keyword ?? "").split(/,\s*/).filter(Boolean).map((k): [string, string] => ["KW", k]),
    ["N1", item.note],
  ];
  return (
    lines
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}  - ${v!.replace(/\s+/g, " ")}`)
      .concat("ER  - ", "")
      .join("\r\n")
  );
}

export const cslJson = (item: CslItem): string => JSON.stringify([item], null, 2) + "\n";
