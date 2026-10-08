// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { body, inline, parseLine, renderRichDiff } from "../src/components/scripts/rich-diff";

const FM = '---\ntitle: "Introduction"\ntopic: "methods"\n---\n';

describe("the History panel's What changed, as the page shows it", () => {
  it("drops the front matter", () => {
    expect(body(`${FM}\n# Intro\n`)).toBe("\n# Intro\n");
    expect(body("No front matter\n")).toBe("No front matter\n");
  });

  it("turns Markdown marks into formatting", () => {
    const text = (s: string) => inline(s).map((r) => r.v).join("");
    expect(text("Some **bold** and *italic* and [a link](https://x) and [[chapters/two|Two]]")).toBe(
      "Some bold and italic and a link and Two",
    );
    expect(inline("**bold**").every((r) => r.s.b)).toBe(true);
    expect(inline("*it*")[0]!.s.i).toBe(true);
    expect(text("snake_case_name stays")).toBe("snake_case_name stays");
    expect(text("a lone * star")).toBe("a lone * star");
    expect(parseLine("## Two").kind).toBe("h2");
    expect(parseLine("- item").marker).toBe("•");
    expect(parseLine("> quoted").kind).toBe("quote");
  });

  it("shows no marks and no front matter, with removed and added words marked", () => {
    const box = renderRichDiff(
      `${FM}\n**Introduction**\n\nThe old text stays here.\n`,
      `---\ntitle: "Intro"\n---\n\n# Introduction\n\nThe new text stays here.\n`,
    );
    const shown = box.textContent ?? "";
    expect(shown).not.toMatch(/\*\*|#|---|title:|topic:/);
    // A bold line made a heading: removed as bold, added as a heading.
    expect(box.querySelector(".tb-ed-del strong")?.textContent).toBe("Introduction");
    expect(box.querySelector(".tb-ed-add.tb-rd-h1")?.textContent).toContain("Introduction");
    // Within the changed sentence only the changed word is marked.
    expect([...box.querySelectorAll("del")].map((d) => d.textContent)).toContain("old");
    expect([...box.querySelectorAll("ins")].map((d) => d.textContent)).toContain("new");
  });

  it("says when only the front matter changed", () => {
    expect(renderRichDiff(`${FM}Text\n`, `---\ntitle: "X"\n---\nText\n`).textContent).toBe(
      "Only the page’s details (such as its title or topic) changed; the text is the same.",
    );
  });
});
