import { describe, expect, it } from "vitest";
import {
  fixBlockRefLinks,
  hasOwnTitle,
  markLeadParagraph,
  titleFromFirstHeading,
} from "../src/transforms";
import type { HastNode, PageData } from "../src/transforms";

const text = (value: string): HastNode => ({ type: "text", value });
const el = (
  tagName: string,
  properties: Record<string, unknown>,
  ...children: HastNode[]
): HastNode => ({
  type: "element",
  tagName,
  properties,
  children,
});
const root = (...children: HastNode[]): HastNode => ({ type: "root", children });

describe("same-page citations", () => {
  it("points #^id and #%5Eid at the id Quartz gave the reference", () => {
    const tree = root(
      el("p", {}, el("a", { href: "#%5Eref-bhaskar-1979" }, text("Bhaskar, 1979"))),
      el("p", {}, el("a", { href: "#^ref-archer-1995" }, text("Archer, 1995"))),
    );
    expect(fixBlockRefLinks(tree)).toBe(2);
    const hrefs: unknown[] = [];
    const collect = (n: HastNode) => {
      if (n.tagName === "a") hrefs.push(n.properties?.href);
      (n.children ?? []).forEach(collect);
    };
    collect(tree);
    expect(hrefs).toEqual(["#ref-bhaskar-1979", "#ref-archer-1995"]);
  });

  it("leaves cross-page citations, plain anchors and other links alone", () => {
    const links = [
      "../chapters/chapter-03#ref-bhaskar-1979",
      "chapter-03#%5Eref-x",
      "#ref-already-fixed",
      "https://example.org/#^x",
      "#",
    ];
    const tree = root(...links.map((href) => el("a", { href }, text("x"))));
    expect(fixBlockRefLinks(tree)).toBe(0);
    expect((tree.children ?? []).map((a) => a.properties?.href)).toEqual(links);
  });
});

describe("the title from the first heading", () => {
  const chapter = () =>
    root(
      el("h1", { id: "chapter-3-structure" }, text("Chapter 3: "), el("em", {}, text("Structure"))),
      el("p", {}, text("Body.")),
      el("h2", { id: "introduction" }, text("Introduction")),
      el("h1", { id: "a-second-h1" }, text("A second H1")),
    );
  const toc = () => [
    { depth: 0, text: "Chapter 3: Structure", slug: "chapter-3-structure" },
    { depth: 1, text: "Introduction", slug: "introduction" },
    { depth: 2, text: "Deeper", slug: "deeper" },
  ];

  it("uses the first H1 as the title and takes it out of the body", () => {
    const tree = chapter();
    const data: PageData = { frontmatter: { title: "chapter-03", tags: ["x"] }, toc: toc() };
    expect(titleFromFirstHeading(tree, data, "# Chapter 3: *Structure*\n")).toBe(
      "Chapter 3: Structure",
    );
    expect(data.frontmatter).toEqual({ title: "Chapter 3: Structure", tags: ["x"] });
    const h1s = (tree.children ?? []).filter((n) => n.tagName === "h1");
    expect(h1s.map((n) => n.properties?.id)).toEqual(["a-second-h1"]);
    expect(data.toc).toEqual([
      { depth: 0, text: "Introduction", slug: "introduction" },
      { depth: 1, text: "Deeper", slug: "deeper" },
    ]);
  });

  it("keeps a page's own frontmatter title, even one equal to the filename", () => {
    for (const source of [
      "---\ntitle: chapter-03\n---\n# Chapter 3\n",
      '---\naliases: [x]\ntitle: "My page"\n---\n# Heading\n',
    ]) {
      const tree = chapter();
      const data: PageData = { frontmatter: { title: "chapter-03" }, toc: toc() };
      expect(titleFromFirstHeading(tree, data, source)).toBeNull();
      expect(tree).toEqual(chapter());
      expect(data).toEqual({ frontmatter: { title: "chapter-03" }, toc: toc() });
    }
  });

  it("leaves a page with no top-level H1 as it was", () => {
    const tree = root(
      el("h2", {}, text("Only an h2")),
      el("blockquote", {}, el("h1", {}, text("Quoted"))),
    );
    const data: PageData = { frontmatter: { title: "notes" } };
    expect(titleFromFirstHeading(tree, data, "## Only an h2\n")).toBeNull();
    expect(data.frontmatter).toEqual({ title: "notes" });
    expect(tree.children).toHaveLength(2);
  });

  it("reads an empty frontmatter title as no title", () => {
    expect(hasOwnTitle('---\ntitle: ""\n---\n')).toBe(false);
    expect(hasOwnTitle("---\ntitle:\n---\n")).toBe(false);
    expect(hasOwnTitle("---\ntags: [a]\n---\n")).toBe(false);
    expect(hasOwnTitle("# no frontmatter\n")).toBe(false);
    expect(hasOwnTitle("---\ntitle: Real\n---\n")).toBe(true);
  });
});

describe("the lead paragraph", () => {
  const classOf = (node: HastNode) => node.properties?.className;

  it("marks the paragraph right after the first H1, across whitespace", () => {
    const lead = el("p", {}, text("Welcome."));
    const tree = root(
      el("h1", { id: "t" }, text("Title")),
      text("\n"),
      lead,
      el("p", {}, text("x")),
    );
    expect(markLeadParagraph(tree)).toBe(true);
    expect(classOf(lead)).toEqual(["tb-lead"]);
  });

  it("keeps a paragraph's own classes", () => {
    const lead = el("p", { className: ["intro"] }, text("Welcome."));
    markLeadParagraph(root(el("h1", {}, text("Title")), lead));
    expect(classOf(lead)).toEqual(["intro", "tb-lead"]);
  });

  it("marks nothing when the H1 is followed by something else, or there is no H1", () => {
    const afterCallout = el("p", {}, text("x"));
    expect(
      markLeadParagraph(
        root(
          el("h1", {}, text("Chapter 3")),
          el("blockquote", { className: ["callout"] }),
          afterCallout,
        ),
      ),
    ).toBe(false);
    expect(classOf(afterCallout)).toBeUndefined();
    const first = el("p", {}, text("x"));
    expect(markLeadParagraph(root(el("h2", {}, text("A")), first))).toBe(false);
    expect(classOf(first)).toBeUndefined();
  });

  it("survives the title transform removing the H1", () => {
    const lead = el("p", {}, text("Welcome."));
    const tree = root(el("h1", { id: "t" }, text("Title")), lead);
    markLeadParagraph(tree);
    titleFromFirstHeading(tree, {}, "# Title\n\nWelcome.\n");
    expect(tree.children).toEqual([lead]);
    expect(classOf(lead)).toEqual(["tb-lead"]);
  });
});
