/**
 * The in-site editor's pure parts: finding a rendered paragraph in the page's
 * markdown source, and diffing for the Changes tab. No DOM, so vitest runs them
 * in node.
 */

export interface Block {
  /** 0-based first line in the source. */
  start: number;
  /** The block's exact source text (its lines joined with "\n"). */
  text: string;
  /** Ordinal among the blocks that look like body paragraphs, from 1; 0 if not one. */
  ordinal: number;
}

const FENCE = /^\s{0,3}(```|~~~)/;
// Blocks whose first line marks them as something other than a running-text
// paragraph: headings, quotes and callouts, lists, tables, HTML, embeds, math,
// rules, footnote definitions.
const NOT_PARAGRAPH = /^\s{0,3}(#{1,6}\s|>|[-*+]\s|\d+[.)]\s|\||<|!\[|\$\$|---|\*\*\*|___|\[\^[^\]]+\]:)/;

/**
 * The source's blank-line-separated blocks, skipping frontmatter, fenced code and
 * $$ math, with their line numbers.
 */
export const splitBlocks = (source: string): Block[] => {
  const lines = source.split("\n");
  const blocks: Block[] = [];
  let i = 0;
  if (lines[0]?.trim() === "---") {
    const end = lines.findIndex((l, k) => k > 0 && (l.trim() === "---" || l.trim() === "..."));
    if (end > 0) i = end + 1;
  }
  let ordinal = 0;
  while (i < lines.length) {
    const line = lines[i]!;
    if (!line.trim()) {
      i++;
      continue;
    }
    const fence = FENCE.exec(line);
    if (fence || line.trim() === "$$") {
      const close = fence ? fence[1]! : "$$";
      let j = i + 1;
      while (j < lines.length && !lines[j]!.trim().startsWith(close)) j++;
      i = j + 1;
      continue;
    }
    let j = i;
    while (j < lines.length && lines[j]!.trim() && !FENCE.test(lines[j]!)) j++;
    const text = lines.slice(i, j).join("\n");
    const isParagraph = !NOT_PARAGRAPH.test(line);
    blocks.push({ start: i, text, ordinal: isParagraph ? ++ordinal : 0 });
    i = j;
  }
  return blocks;
};

/**
 * The words a block shows once rendered, lower-cased: link and wikilink syntax
 * reduced to their visible text, embeds, HTML tags, Obsidian block ids and
 * footnote markers dropped.
 */
export const sourceWords = (md: string): string[] =>
  words(
    md
      .replace(/\s\^[A-Za-z0-9-]+\s*$/gm, " ") // ^block-id at a line's end
      .replace(/!\[\[[^\]]*\]\]/g, " ")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/\[\[([^\]|]*)\|([^\]]*)\]\]/g, "$2")
      .replace(/\[\[([^\]]*)\]\]/g, (_m, t: string) => t.split("/").pop()!.replace(/#/g, " "))
      .replace(/\[\^[^\]]*\]/g, " ")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/<[^>]+>/g, " "),
  );

export const words = (text: string): string[] =>
  text.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];

/** Shared words (as a multiset) over the longer list's length: 1 is identical. */
export const overlap = (a: string[], b: string[]): number => {
  if (!a.length || !b.length) return 0;
  const counts = new Map<string, number>();
  for (const w of a) counts.set(w, (counts.get(w) ?? 0) + 1);
  let shared = 0;
  for (const w of b) {
    const n = counts.get(w) ?? 0;
    if (n > 0) {
      shared++;
      counts.set(w, n - 1);
    }
  }
  return shared / Math.max(a.length, b.length);
};

const THRESHOLD = 0.75;

/**
 * The source block a rendered paragraph came from, or null when no block is a
 * convincing match (the source moved on since the page was built, or the
 * paragraph is generated). Ties go to the block whose paragraph ordinal is
 * nearest the rendered paragraph's number.
 */
export const findParagraph = (source: string, renderedText: string, pnum: number): Block | null => {
  const target = words(renderedText);
  if (!target.length) return null;
  let best: Block | null = null;
  let bestScore = 0;
  let bestDistance = Infinity;
  for (const block of splitBlocks(source)) {
    const score = overlap(sourceWords(block.text), target);
    if (score < THRESHOLD) continue;
    const distance = block.ordinal ? Math.abs(block.ordinal - pnum) : 1e6;
    if (score > bestScore + 0.02 || (Math.abs(score - bestScore) <= 0.02 && distance < bestDistance)) {
      best = block;
      bestScore = Math.max(score, bestScore);
      bestDistance = distance;
    }
  }
  return best;
};

// --- diff -----------------------------------------------------------------------

export type Op = { t: "=" | "-" | "+"; v: string };

const MAX_CELLS = 400_000;

/** A minimal-ish diff of two token lists: common ends trimmed, LCS on the middle. */
export const diff = (a: string[], b: string[]): Op[] => {
  let s = 0;
  while (s < a.length && s < b.length && a[s] === b[s]) s++;
  let ea = a.length;
  let eb = b.length;
  while (ea > s && eb > s && a[ea - 1] === b[eb - 1]) {
    ea--;
    eb--;
  }
  const head: Op[] = a.slice(0, s).map((v) => ({ t: "=", v }));
  const tail: Op[] = a.slice(ea).map((v) => ({ t: "=", v }));
  const ma = a.slice(s, ea);
  const mb = b.slice(s, eb);
  let mid: Op[];
  if ((ma.length + 1) * (mb.length + 1) > MAX_CELLS) {
    // Too big to align: everything in the middle is replaced.
    mid = [...ma.map((v): Op => ({ t: "-", v })), ...mb.map((v): Op => ({ t: "+", v }))];
  } else {
    const w = mb.length + 1;
    const L = new Uint32Array((ma.length + 1) * w);
    for (let i = ma.length - 1; i >= 0; i--)
      for (let j = mb.length - 1; j >= 0; j--)
        L[i * w + j] =
          ma[i] === mb[j] ? L[(i + 1) * w + j + 1]! + 1 : Math.max(L[(i + 1) * w + j]!, L[i * w + j + 1]!);
    mid = [];
    let i = 0;
    let j = 0;
    while (i < ma.length && j < mb.length) {
      if (ma[i] === mb[j]) {
        mid.push({ t: "=", v: ma[i]! });
        i++;
        j++;
      } else if (L[(i + 1) * w + j]! >= L[i * w + j + 1]!) mid.push({ t: "-", v: ma[i++]! });
      else mid.push({ t: "+", v: mb[j++]! });
    }
    while (i < ma.length) mid.push({ t: "-", v: ma[i++]! });
    while (j < mb.length) mid.push({ t: "+", v: mb[j++]! });
  }
  return [...head, ...mid, ...tail];
};

/** Words and the whitespace between them, so a word diff re-joins exactly. */
export const tokens = (line: string): string[] => line.split(/(\s+)/).filter((t) => t !== "");

export interface Hunk {
  /** 1-based line numbers where the hunk starts, before and after. */
  a: number;
  b: number;
  ops: Op[];
}

/** Line diff grouped into hunks with `context` unchanged lines around each change. */
export const hunks = (before: string, after: string, context = 2): Hunk[] => {
  const ops = diff(before.split("\n"), after.split("\n"));
  const out: Hunk[] = [];
  let la = 1;
  let lb = 1;
  let current: Hunk | null = null;
  let trailing = 0;
  ops.forEach((op, k) => {
    const changedNear = ops.slice(Math.max(0, k - context), k + context + 1).some((o) => o.t !== "=");
    if (changedNear) {
      if (!current || (op.t === "=" && trailing > 2 * context)) {
        current = { a: la, b: lb, ops: [] };
        out.push(current);
      }
      current.ops.push(op);
      trailing = op.t === "=" ? trailing + 1 : 0;
    } else {
      current = null;
      trailing = 0;
    }
    if (op.t !== "+") la++;
    if (op.t !== "-") lb++;
  });
  return out;
};
