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
