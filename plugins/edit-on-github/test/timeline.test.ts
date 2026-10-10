// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import {
  bookRows,
  historyApi,
  matchesFilter,
  openKind,
  openRole,
  readBookHistory,
  readDeclined,
  releaseLabel,
  withReleases,
} from "../src/components/scripts/timeline";
import type { BookHistory, Entry, OpenItem } from "../src/components/scripts/timeline";
import { mountBookHistory } from "../src/components/scripts/book-history";

const e = (sha: string, date: string, who = "Ann", role: Entry["role"] = "author"): Entry => ({
  sha,
  date,
  who,
  role,
  summary: `change ${sha}`,
});

const history: BookHistory = {
  version: 1,
  releases: [{ tag: "v2026", date: "2026-03-01" }],
  pages: [
    {
      path: "/chapters/one",
      source: "chapters/one.md",
      title: "One",
      published: [e("c", "2026-04-01"), e("a", "2026-02-01")],
      drafts: [e("d", "2026-05-01", "Bo", "contributor")],
      releases: {},
    },
    {
      path: "/chapters/two",
      source: "chapters/two.md",
      title: "Two",
      published: [e("b", "2026-02-15", "Cy", "editor")],
      drafts: [],
      releases: {},
    },
  ],
};

describe("the version history's three states", () => {
  it("reads only the book's history file", () => {
    expect(readBookHistory(history)).toBe(history);
    expect(readBookHistory({ version: 2, pages: [], releases: [] })).toBeNull();
    expect(readBookHistory(null)).toBeNull();
    expect(readBookHistory([])).toBeNull();
  });

  it("names releases as editions for a year, else by number", () => {
    expect(releaseLabel("v2026")).toBe("2026 edition");
    expect(releaseLabel("v0.1")).toBe("Release 0.1");
  });

  it("puts /api/history beside the configured page-revision endpoint, with its book", () => {
    expect(historyApi("https://fn.example/api/page-revision?book=ont", "chapters/one.md")).toBe(
      "https://fn.example/api/history?book=ont&path=chapters%2Fone.md",
    );
    expect(historyApi("/api/page-revision?book=ont")).toBe("/api/history?book=ont");
  });

  it("places each release above the changes made since it", () => {
    const rows = withReleases(history.pages[0]!.published, history.releases);
    expect(rows.map((r) => ("release" in r ? r.release.tag : r.entry.sha))).toEqual([
      "c",
      "v2026",
      "a",
    ]);
    // A release newer than every change comes first; one older than all comes last.
    expect(
      withReleases(
        [e("x", "2026-01-01")],
        [
          { tag: "v1", date: "2026-06-01" },
          { tag: "v0", date: "2025-01-01" },
        ],
      ).map((r) => ("release" in r ? r.release.tag : r.entry.sha)),
    ).toEqual(["v1", "x", "v0"]);
  });

  it("gives an open item's person their role on the page, else contributor", () => {
    const item: OpenItem = {
      kind: "note",
      number: 4,
      url: "u",
      date: "2026-05-02",
      summary: "",
      who: { name: "Reader", github: "ann" },
      paragraph: 3,
    };
    expect(openRole(item, history.pages[0]!.published)).toBe("author");
    expect(openRole({ ...item, who: { name: "Someone" } }, history.pages[0]!.published)).toBe(
      "contributor",
    );
    expect(openKind(item)).toBe("Note on ¶3");
    expect(openKind({ ...item, kind: "edit" })).toBe("Proposed edit");
    expect(openKind({ ...item, kind: "suggestion" })).toBe("Suggestion");
  });

  it("lists the whole book newest first and filters it", () => {
    const rows = bookRows(history);
    expect(rows.map((r) => `${r.sha}:${r.state}`)).toEqual([
      "d:drafts",
      "c:published",
      "b:published",
      "a:published",
    ]);
    const as = (r: (typeof rows)[number]) => ({ page: r.page.source, who: r.who, state: r.state });
    expect(
      rows.filter((r) => matchesFilter({ page: "chapters/one.md", person: "", state: "" }, as(r)))
        .length,
    ).toBe(3);
    expect(
      rows
        .filter((r) => matchesFilter({ page: "", person: "cy", state: "" }, as(r)))
        .map((r) => r.sha),
    ).toEqual(["b"]);
    expect(
      rows
        .filter((r) => matchesFilter({ page: "", person: "", state: "drafts" }, as(r)))
        .map((r) => r.sha),
    ).toEqual(["d"]);
  });
});

describe("the book's /history page", () => {
  it("adds what is proposed to the static swimlane and lists every change", async () => {
    document.body.innerHTML = `<figure class="tb-swim"><svg class="tb-swimlane"><rect class="tb-swim-lane" data-lane="0" y="22" height="34"/>
      <circle class="tb-swim-dot" data-lane="2" tabindex="0"><title>2026-02-01 · One: change a (Ann)</title></circle>
      <text class="tb-swim-axis" x="118">2026-01-01</text><text class="tb-swim-axis" x="744">2026-05-01</text></svg></figure>
      <div data-tb-book-history></div><div class="tb-history-static"><p>plain list</p></div>`;
    const proposed: OpenItem[] = [
      {
        kind: "edit",
        number: 9,
        url: "https://github.com/o/b/pull/9",
        date: "2026-06-01",
        summary: "Fix a typo",
        who: { name: "Dee" },
        files: ["chapters/two.md"],
      },
    ];
    const real = globalThis.fetch;
    globalThis.fetch = (async (url: string) =>
      new Response(
        JSON.stringify(String(url).includes("/api/history") ? { items: proposed } : history),
        { status: 200 },
      )) as typeof fetch;
    try {
      await mountBookHistory(
        document.querySelector("[data-tb-book-history]")!,
        "/.well-known/history.json",
        "/api/page-revision?book=b",
      );
    } finally {
      globalThis.fetch = real;
    }
    const dot = document.querySelector('circle[data-lane="0"]')!;
    expect(dot.getAttribute("cx")).toBe("744.0"); // after the axis: at its end
    expect(dot.querySelector("title")!.textContent).toBe(
      "2026-06-01 · Proposed edit: Fix a typo (Dee)",
    );
    expect(document.querySelector(".tb-history-static")!.hasAttribute("hidden")).toBe(true);
    const items = [...document.querySelectorAll(".tb-bh-summary")].map((n) => n.textContent);
    expect(items).toEqual(["Fix a typo", "change d", "change c", "change b", "change a"]);
    const state = document.querySelectorAll<HTMLSelectElement>(".tb-bh-select")[2]!;
    state.value = "proposed";
    state.dispatchEvent(new Event("change"));
    expect([...document.querySelectorAll(".tb-bh-summary")].map((n) => n.textContent)).toEqual([
      "Fix a typo",
    ]);
    // A tap on a dot shows its summary (phones have no hover).
    document
      .querySelector<SVGElement>('circle[data-lane="2"]')!
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(document.querySelector(".tb-swim-caption")!.textContent).toBe(
      "2026-02-01 · One: change a (Ann)",
    );
  });
});

describe("declined (batch 2c)", () => {
  const declined = [
    {
      kind: "edit",
      number: 14,
      url: "https://github.com/o/b/pull/14",
      date: "2026-04-15",
      proposed: "2026-04-10",
      summary: "Reword the opening",
      who: { name: "Dee" },
      files: ["chapters/one.md"],
      reason: "We keep the original wording.",
      decliner: "Alec Gordon",
      comments: [
        {
          id: 1,
          member: "m-0a1b2c3d4e",
          name: "Mo",
          date: "2026-04-16T10:00:00Z",
          text: "Maybe in 2027.",
        },
      ],
    },
    {
      kind: "suggestion",
      number: 6,
      url: "https://github.com/o/b/issues/6",
      date: "2026-01-20",
      proposed: "2026-01-19",
      summary: "Make it weirder",
      who: { name: "Ann" },
      files: ["chapters/two.md"],
      reason: null,
      decliner: null,
      comments: [],
    },
    {
      kind: "note",
      number: 7,
      url: "javascript:alert(1)",
      date: "2026-01-01",
      summary: "x",
      comments: [],
    },
  ];

  it("keeps only well-formed items with a GitHub link", () => {
    expect(readDeclined(declined).map((d) => d.number)).toEqual([14, 6]);
  });

  it("the /history page: a Declined filter, crossed rings for ones declined since the build, reason, decliner, comments, Show changes", async () => {
    document.body.innerHTML = `<figure class="tb-swim"><svg class="tb-swimlane"><rect class="tb-swim-lane" data-lane="0" y="22" height="34"/>
      <rect class="tb-swim-lane" data-lane="3" y="124" height="34"/>
      <g class="tb-swim-dot tb-swim-declined" data-lane="3" data-number="6" tabindex="0"><title>built</title></g>
      <text class="tb-swim-axis" x="118">2026-01-01</text><text class="tb-swim-axis" x="744">2026-05-01</text></svg></figure>
      <div data-tb-book-history></div><div class="tb-history-static"><p>plain list</p></div>`;
    const urls: string[] = [];
    const real = globalThis.fetch;
    globalThis.fetch = (async (url: string) => {
      urls.push(String(url));
      const body = String(url).includes("change=14")
        ? {
            number: 14,
            files: [{ path: "chapters/one.md", before: "Old opening.\n", after: "New opening.\n" }],
          }
        : String(url).includes("/api/history")
          ? { items: [], declined }
          : history;
      return new Response(JSON.stringify(body), { status: 200 });
    }) as typeof fetch;
    try {
      await mountBookHistory(
        document.querySelector("[data-tb-book-history]")!,
        "/.well-known/history.json",
        "/api/page-revision?book=b",
      );
      expect(
        new URL(urls.find((u) => u.includes("/api/history"))!, "https://x").searchParams.get(
          "declined",
        ),
      ).toBe("1");
      // #6 was drawn by the build; #14 is added; the bad one never.
      expect(
        [...document.querySelectorAll(".tb-swim-declined")].map((g) =>
          g.getAttribute("data-number"),
        ),
      ).toEqual(["6", "14"]);
      const state = document.querySelectorAll<HTMLSelectElement>(".tb-bh-select")[2]!;
      expect([...state.options].map((o) => o.textContent)).toContain("Declined");
      state.value = "declined";
      state.dispatchEvent(new Event("change"));
      expect([...document.querySelectorAll(".tb-bh-summary")].map((n) => n.textContent)).toEqual([
        "Reword the opening",
        "Make it weirder",
      ]);
      const [first, second] = [...document.querySelectorAll(".tb-bh-item")];
      expect(first!.querySelector(".tb-bh-state")!.textContent).toBe("Declined");
      expect(first!.querySelector(".tb-dc-who")!.textContent).toMatch(
        /^Proposed by Dee on .+\. Declined by Alec Gordon on .+\.$/,
      );
      expect(first!.querySelector(".tb-dc-reason")!.textContent).toBe(
        "Why it was declined: We keep the original wording.",
      );
      expect(first!.querySelector(".tb-dc-ctext")!.textContent).toBe("Maybe in 2027.");
      expect(second!.querySelector(".tb-dc-reason")!.textContent).toBe(
        "Why it was declined: No reason was recorded.",
      );
      expect(second!.querySelector("button")).toBeNull(); // a suggestion has no change to show
      [...first!.querySelectorAll("button")].find((b) => b.textContent === "Show changes")!.click();
      await new Promise((r) => setTimeout(r, 0));
      await new Promise((r) => setTimeout(r, 0));
      expect(new URL(urls.at(-1)!, "https://x").searchParams.get("change")).toBe("14");
      expect(first!.querySelector(".tb-ed-del")!.textContent).toContain("Old");
      expect(first!.querySelector(".tb-ed-add")!.textContent).toContain("New");
    } finally {
      globalThis.fetch = real;
    }
  });
});
