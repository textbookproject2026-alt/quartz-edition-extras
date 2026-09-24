import { describe, expect, it } from "vitest";
import { TOPIC_SLOTS, topicIndex, topicOf } from "../src/topics";

describe("topicOf", () => {
  it("takes frontmatter topic first, as written", () => {
    expect(topicOf({ topic: "Social ontology", tags: ["methods"] })).toBe("Social ontology");
    expect(topicOf({ topic: ["Ontology", "Methods"] })).toBe("Ontology");
  });

  it("falls back to the first tag, never the concept marker", () => {
    expect(topicOf({ tags: ["concept", "#Ontology", "methods"] })).toBe("ontology");
    expect(topicOf({ tag: "methods, ontology" })).toBe("methods");
  });

  it("is null with neither", () => {
    expect(topicOf({})).toBeNull();
    expect(topicOf(undefined)).toBeNull();
    expect(topicOf({ topic: "  ", tags: ["concept"] })).toBeNull();
  });
});

describe("topicIndex", () => {
  const page = (slug: string, topic?: string) => ({ slug, frontmatter: topic ? { topic } : {} });

  it("gives the most-used topics the first slots, then A–Z; spelling variants are one topic", () => {
    const idx = topicIndex([
      page("a", "Methods"),
      page("b", "Ontology"),
      page("c", "ontology"),
      page("d", "Ethics"),
      page("e"),
    ]);
    expect(idx.topics).toEqual(["Ontology", "Ethics", "Methods"]);
    expect(idx.pages).toEqual({ a: 2, b: 0, c: 0, d: 1 });
  });

  it("folds topics past the last slot into Other (absent), never a new colour", () => {
    const files = Array.from({ length: TOPIC_SLOTS + 2 }, (_, i) => page(`p${i}`, `T${i}`));
    const idx = topicIndex(files);
    expect(idx.topics).toHaveLength(TOPIC_SLOTS);
    expect(Object.keys(idx.pages)).toHaveLength(TOPIC_SLOTS);
    expect(idx.pages[`p${TOPIC_SLOTS + 1}`]).toBeUndefined();
  });
});
