import { describe, expect, it } from "vitest";
import { diff, findParagraph, hunks, splitBlocks, tokens } from "../src/components/scripts/source";

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

  it("groups line changes into hunks with context", () => {
    const a = "a\nb\nc\nd\ne\nf\ng\nh\ni\nj";
    const hs = hunks(a, a.replace("b", "B").replace("i", "I"), 1);
    expect(hs.map((h) => h.b)).toEqual([1, 8]);
    expect(hunks(a, a)).toEqual([]);
  });
});
