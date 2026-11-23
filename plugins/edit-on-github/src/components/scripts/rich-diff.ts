/**
 * What changed, as a reader sees it: the History panel's diff with the front
 * matter dropped and each line's Markdown shown as formatting (headings, bold,
 * italics, links, lists, quotes) instead of its marks. Lines are compared as
 * source (so a bold line turned into a heading still counts as changed); words
 * within a changed line are compared as the text a reader sees, and the removed
 * and added words are <del> and <ins>.
 *
 * Line-by-line on purpose: a block that spans lines (a table, a fenced code
 * block) shows line by line as text, not as the rendered block.
 */
import { el } from "./editor";
import { blocks, diff, pairs, showUnchanged, tokens } from "./source";

/** The page's text without its front matter (the --- block at the top). */
export const body = (md: string): string => {
  const m = /^---\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/.exec(md);
  return m ? md.slice(m[0].length) : md;
};

interface Style {
  b?: boolean;
  i?: boolean;
  code?: boolean;
  link?: boolean;
  sup?: boolean;
}
/** A word or a run of spaces, with its formatting. */
export interface Run {
  v: string;
  s: Style;
}
export interface Line {
  kind: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "li" | "quote" | "note" | "rule" | "blank";
  /** A list item's or a footnote's marker: "•", "3.", "1". */
  marker?: string;
  runs: Run[];
}

const wordRuns = (text: string, s: Style): Run[] => tokens(text).map((v) => ({ v, s: { ...s } }));

/** Inline Markdown to runs: the marks go, their formatting stays. */
export const inline = (text: string, base: Style = {}): Run[] => {
  const out: Run[] = [];
  const s: Style = { ...base };
  let buf = "";
  const flush = () => {
    if (buf) out.push(...wordRuns(buf, s));
    buf = "";
  };
  const wordChar = (c: string | undefined) => !!c && /[\p{L}\p{N}]/u.test(c);
  for (let i = 0; i < text.length; ) {
    const rest = text.slice(i);
    let m: RegExpExecArray | null;
    if (rest[0] === "\\" && rest.length > 1) {
      buf += rest[1];
      i += 2;
    } else if ((m = /^`([^`]+)`/.exec(rest))) {
      flush();
      out.push(...wordRuns(m[1]!, { ...s, code: true }));
      i += m[0].length;
    } else if ((m = /^!?\[\[([^\]|#]*)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]/.exec(rest))) {
      flush();
      const shown = m[2] ?? m[1]!.split("/").pop() ?? m[1]!;
      out.push(...wordRuns(shown, { ...s, link: true }));
      i += m[0].length;
    } else if ((m = /^!\[([^\]]*)\]\([^)]*\)/.exec(rest))) {
      flush();
      out.push(...wordRuns(`(image${m[1] ? `: ${m[1]}` : ""})`, { ...s, i: true }));
      i += m[0].length;
    } else if ((m = /^\[\^([^\]]+)\]/.exec(rest))) {
      flush();
      out.push({ v: m[1]!, s: { ...s, sup: true } });
      i += m[0].length;
    } else if ((m = /^\[([^\]]+)\]\([^)]*\)/.exec(rest))) {
      flush();
      out.push(...inline(m[1]!, { ...s, link: true }));
      i += m[0].length;
    } else if ((m = /^<\/?[a-zA-Z][^>]*>/.exec(rest))) {
      flush(); // HTML tags: the text between them stays
      i += m[0].length;
    } else if (rest.startsWith("**") || rest.startsWith("__")) {
      const mark = rest.slice(0, 2);
      if (s.b || text.indexOf(mark, i + 2) > i + 2) {
        flush();
        s.b = !s.b;
      } else buf += mark;
      i += 2;
    } else if (
      (rest[0] === "*" || rest[0] === "_") &&
      // _ inside a word (snake_case) is a letter, not a mark
      !(rest[0] === "_" && wordChar(text[i - 1]) && wordChar(text[i + 1]))
    ) {
      if (s.i || text.indexOf(rest[0], i + 1) > i + 1) {
        flush();
        s.i = !s.i;
      } else buf += rest[0];
      i += 1;
    } else {
      buf += rest[0];
      i += 1;
    }
  }
  flush();
  return out;
};

/** One source line: its block kind from the leading mark, the rest as runs. */
export const parseLine = (line: string): Line => {
  let m: RegExpExecArray | null;
  if (!line.trim()) return { kind: "blank", runs: [] };
  if (/^\s{0,3}([-*_])(\s*\1){2,}\s*$/.test(line)) return { kind: "rule", runs: [] };
  if ((m = /^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line)))
    return { kind: `h${m[1]!.length}` as Line["kind"], runs: inline(m[2]!) };
  if ((m = /^\s*([-*+]|\d+[.)])\s+(?:\[[ xX]\]\s+)?(.*)$/.exec(line)))
    return {
      kind: "li",
      marker: /\d/.test(m[1]!) ? m[1]!.replace(")", ".") : "•",
      runs: inline(m[2]!),
    };
  if ((m = /^\s{0,3}>\s?(.*)$/.exec(line))) return { kind: "quote", runs: inline(m[1]!) };
  if ((m = /^\[\^([^\]]+)\]:\s*(.*)$/.exec(line)))
    return { kind: "note", marker: m[1]!, runs: inline(m[2]!) };
  return { kind: "p", runs: inline(line) };
};

/** A run as DOM: its text inside its formatting. */
const runNode = (r: Run): Node => {
  let n: Node = document.createTextNode(r.v);
  if (r.s.code) n = el("code", {}, n);
  if (r.s.i) n = el("em", {}, n);
  if (r.s.b) n = el("strong", {}, n);
  if (r.s.link) n = el("span", { class: "tb-rd-link" }, n);
  if (r.s.sup) n = el("sup", {}, n);
  return n;
};

/** A run as it was ("="), removed ("-") or added ("+"). */
type Part = { run: Run; t: "=" | "-" | "+" };

/**
 * One paragraph's row, as track changes: kept runs as they are, removed ones struck
 * in <del>, added ones in <ins>, in reading order. A paragraph only removed is all
 * <del>, one only added all <ins>.
 */
const row = (line: Line, parts: Part[]) => {
  const t = parts.some((p) => p.t !== "=")
    ? parts.every((p) => p.t !== "+")
      ? " tb-ed-del"
      : parts.every((p) => p.t !== "-")
        ? " tb-ed-add"
        : " tb-ed-mod"
    : "";
  const text = el("div", { class: "tb-rd-text" });
  if (line.marker) text.append(el("span", { class: "tb-rd-marker", text: line.marker }));
  let wrap: HTMLElement | null = null;
  for (const { run, t: k } of parts) {
    if (k === "=") {
      wrap = null;
      text.append(runNode(run));
      continue;
    }
    const tag = k === "-" ? "DEL" : "INS";
    if (wrap?.tagName !== tag) {
      wrap = el(k === "-" ? "del" : "ins");
      text.append(wrap);
    }
    wrap.append(runNode(run));
  }
  return el("div", { class: `tb-rd-line tb-rd-${line.kind}${t}` }, text);
};

const whole = (runs: Run[], t: Part["t"]): Part[] => runs.map((run) => ({ run, t }));

/** A removed paragraph and the one it became, as one paragraph of track changes. */
const tracked = (was: Line, now: Line): HTMLElement => {
  const x = was.runs;
  const y = now.runs;
  const parts: Part[] = [];
  let i = 0;
  let j = 0;
  for (const w of diff(
    x.map((r) => r.v),
    y.map((r) => r.v),
  ))
    parts.push(
      w.t === "-"
        ? { run: x[i++]!, t: "-" }
        : w.t === "+"
          ? { run: y[j++]!, t: "+" }
          : (i++, { run: y[j++]!, t: "=" }),
    );
  return row(now, parts);
};

/** The History panel's "What changed": front matter dropped, Markdown shown as formatting. */
export const renderRichDiff = (before: string, after: string): HTMLElement => {
  const box = el("div", { class: "tb-ed-diff tb-rd" });
  const a = body(before);
  const b = body(after);
  const bs = blocks(a, b);
  if (!bs.length) {
    box.append(
      el("p", {
        class: "tb-ed-panel tb-ed-muted",
        text:
          a !== b || before === after
            ? "No changes to the text."
            : "Only the page’s details (such as its title or topic) changed; the text is the same.",
      }),
    );
    return box;
  }
  for (const bl of bs) {
    if ("same" in bl) {
      const same = el(
        "details",
        { class: "tb-rd-same" },
        el("summary", { text: showUnchanged(bl.same.length) }),
      );
      for (const v of bl.same) {
        const line = parseLine(v);
        same.append(row(line, whole(line.runs, "=")));
      }
      box.append(same);
      continue;
    }
    const ops = bl.ops;
    for (let k = 0; k < ops.length; ) {
      const op = ops[k]!;
      if (op.t === "=") {
        const line = parseLine(op.v);
        box.append(row(line, whole(line.runs, "=")));
        k++;
        continue;
      }
      // A run of removed lines then added ones, in reading order: each added paragraph
      // with the removed one it came from (removed ones before it struck first), new ones
      // alone, removed ones left over at the end.
      const dels: string[] = [];
      const adds: string[] = [];
      while (ops[k]?.t === "-") dels.push(ops[k++]!.v);
      while (ops[k]?.t === "+") adds.push(ops[k++]!.v);
      const from = new Map(pairs(dels, adds).map(([i, j]) => [j, i]));
      const gone = (i: number) => {
        const l = parseLine(dels[i]!);
        box.append(row(l, whole(l.runs, "-")));
      };
      let i = 0;
      adds.forEach((v, j) => {
        const now = parseLine(v);
        const at = from.get(j);
        if (at === undefined) return void box.append(row(now, whole(now.runs, "+")));
        for (; i < at; i++) gone(i);
        box.append(tracked(parseLine(dels[at]!), now));
        i = at + 1;
      });
      for (; i < dels.length; i++) gone(i);
    }
  }
  return box;
};
