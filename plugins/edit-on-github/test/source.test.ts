import { describe, expect, it } from "vitest";
import { blocks, diff, findParagraph, pairRuns, splitBlocks, tokens, unchangedLabel } from "../src/components/scripts/source";

const SRC = [
  "---",
  "title: X",
  "---",
  "",
  "# Chapter 3",
  "",
  "Critical realism holds that [[Unobservables|unobservable]] structures are real. ^ref-a",
  "",
  "> [!note]",
  "> A callout.",
  "",
  "```",
  "code",
  "```",
  "",
  "See [Bhaskar, 1979](#^ref-bhaskar) for the argument, and **emergence**.[^1]",
  "",
  "Same words.",
  "",
  "Same words.",
  "",
].join("\n");

describe("finding a rendered paragraph in the source", () => {
  it("splits blocks, skipping frontmatter and code, numbering only paragraphs", () => {
    expect(splitBlocks(SRC).map((b) => [b.start, b.ordinal])).toEqual([
      [4, 0],
      [6, 1],
      [8, 0],
      [15, 2],
      [17, 3],
      [19, 4],
    ]);
  });

  it("matches through wikilinks, block ids, links, emphasis and footnotes", () => {
    expect(findParagraph(SRC, "Critical realism holds that unobservable structures are real.", 1)?.start).toBe(6);
    expect(findParagraph(SRC, "See Bhaskar, 1979 for the argument, and emergence.1", 2)?.start).toBe(15);
  });

  it("breaks ties by paragraph number, and gives up on text that isn't there", () => {
    expect(findParagraph(SRC, "Same words.", 3)?.start).toBe(17);
    expect(findParagraph(SRC, "Same words.", 4)?.start).toBe(19);
    expect(findParagraph(SRC, "Nothing like any block at all", 1)).toBeNull();
  });
});

describe("diffing", () => {
  it("diffs words and re-joins exactly", () => {
    const ops = diff(tokens("the cat sat"), tokens("the dog sat"));
    expect(ops.filter((o) => o.t !== "+").map((o) => o.v).join("")).toBe("the cat sat");
    expect(ops.filter((o) => o.t !== "-").map((o) => o.v).join("")).toBe("the dog sat");
  });

  it("splits a diff into unchanged paragraphs and changed runs", () => {
    const a = "One.\n\nTwo.\n\nThree here.\n\nFour.\n\nFive.";
    expect(blocks(a, a.replace("Three here.", "Three there."))).toEqual([
      { same: ["One.", "Two."] },
      { ops: [{ t: "-", v: "Three here." }, { t: "+", v: "Three there." }] },
      { same: ["Four.", "Five."] },
    ]);
    expect(blocks(a, a)).toEqual([]);
    expect(unchangedLabel(1)).toBe("1 unchanged paragraph");
    expect(unchangedLabel(3)).toBe("3 unchanged paragraphs");
  });

  it("pairs removed and added lines and marks only the changed words", () => {
    const rs = pairRuns([{ t: "-", v: "the cat sat" }, { t: "+", v: "the dog sat" }, { t: "+", v: "New." }]);
    expect(rs.map((r) => r.t)).toEqual(["-", "+", "+"]);
    expect(rs[0]!.words.filter((w) => w.changed).map((w) => w.v)).toEqual(["cat"]);
    expect(rs[1]!.words.filter((w) => w.changed).map((w) => w.v)).toEqual(["dog"]);
    expect(rs[1]!.words.map((w) => w.v).join("")).toBe("the dog sat");
    expect(rs[2]!.words).toEqual([{ v: "New.", changed: true }]);
    expect(pairRuns([{ t: "-", v: "a b c" }, { t: "+", v: "a x y c" }])[1]!.words).toEqual([
      { v: "a ", changed: false },
      { v: "x y", changed: true },
      { v: " c", changed: false },
    ]);
  });
});
