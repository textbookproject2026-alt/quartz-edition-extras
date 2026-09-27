import { afterEach, describe, expect, it } from "vitest";
import { Window } from "happy-dom";
import {
  analyticsLoader,
  annotationBadge,
  noTracking,
  paragraphNumbers,
  tagHelper,
  targetFlash,
  trackRuntime,
} from "../src/runtime";

type Call = unknown[];
type Page = Window & {
  eval: (code: string) => unknown;
  plausibleCalls: Call[];
  [key: string]: unknown;
};

const SRC = "https://plausible.io/js/pa-test.js";
const opened: Page[] = [];

/** A page at `url`, with a spy standing in for Plausible before anything runs. */
const page = (url: string, body = '<h1 class="article-title">T</h1>'): Page => {
  const w = new Window({
    url,
    settings: {
      disableJavaScriptFileLoading: true,
      disableCSSFileLoading: true,
      disableIframePageLoading: true,
    },
  }) as unknown as Page;
  w.document.write(`<html><head></head><body>${body}</body></html>`);
  w.plausibleCalls = [];
  w.eval("window.plausible = function () { window.plausibleCalls.push([].slice.call(arguments)) }");
  opened.push(w);
  return w;
};

const names = (w: Page) => w.plausibleCalls.map((c) => c[0]);
const tick = (ms = 30) => new Promise((r) => setTimeout(r, ms));

/** A stand-in for embed.js's <hypothesis-sidebar>, with its toggle. */
const sidebar = (w: Page, expanded: boolean) => {
  const host = w.document.createElement("hypothesis-sidebar");
  const shadow = host.attachShadow({ mode: "open" });
  shadow.innerHTML = `<button aria-expanded="${expanded}"></button>`;
  w.document.body.appendChild(host);
  return shadow.querySelector("button")!;
};

afterEach(async () => {
  while (opened.length) await opened.pop()!.happyDOM.close();
});

describe("the hostname guard", () => {
  it("on the real domain, loads Plausible and lets events through", () => {
    const w = page("https://book.example.org/chapters/chapter-03");
    w.eval(analyticsLoader(SRC, "book.example.org"));
    w.eval(trackRuntime);
    w.eval('tbTrack("annotation_badge_clicked")');
    const scripts = [...w.document.querySelectorAll("script")].map((s) => s.getAttribute("src"));
    expect(scripts).toContain(SRC);
    expect(names(w)).toEqual(["annotation_badge_clicked"]);
  });

  for (const host of [
    "http://localhost:8080/",
    "https://book.pages.dev/",
    "https://drafts.book.pages.dev/x",
  ]) {
    it(`on ${new URL(host).hostname}, sends nothing at all, not even a pageview`, () => {
      const w = page(host);
      w.eval(analyticsLoader(SRC, "book.example.org"));
      w.eval(trackRuntime);
      w.eval('tbTrack("annotation_badge_clicked"); tbTrack("annotation_tag_copied", { tag: "x" })');
      expect(w.document.querySelectorAll("script[src]")).toHaveLength(0);
      expect(w.plausibleCalls).toEqual([]);
    });
  }

  it("with no analytics configured, tbTrack exists and does nothing", () => {
    const w = page("https://book.example.org/");
    w.eval(noTracking);
    w.eval('tbTrack("annotation_badge_clicked")');
    expect(w.plausibleCalls).toEqual([]);
  });

  it("passes props the way publish.js's track() did", () => {
    const w = page("https://book.example.org/");
    w.eval(trackRuntime);
    w.eval('tbTrack("annotation_tag_copied", { tag: "copy-edit" })');
    expect(w.plausibleCalls).toEqual([["annotation_tag_copied", { props: { tag: "copy-edit" } }]]);
  });
});

describe("the tag helper", () => {
  it("counts the sidebar opening once, shows the panel, and counts a copied tag", async () => {
    const w = page("https://book.example.org/");
    w.eval(trackRuntime);
    w.eval(tagHelper);
    const toggle = sidebar(w, false);
    await tick();
    expect(w.document.getElementById("tb-tag-helper")).toBeNull();

    toggle.setAttribute("aria-expanded", "true");
    await tick();
    expect(names(w)).toEqual(["annotation_sidebar_opened"]);
    const chips = [...w.document.querySelectorAll("#tb-tag-helper button.tb-tag-chip")];
    expect(chips.map((c) => c.textContent)).toEqual(["copy-edit", "discussion"]);

    (chips[1] as unknown as HTMLElement).click();
    expect(w.plausibleCalls[1]).toEqual([
      "annotation_tag_copied",
      { props: { tag: "discussion" } },
    ]);

    toggle.setAttribute("aria-expanded", "false");
    await tick();
    expect(w.document.getElementById("tb-tag-helper")).toBeNull();
    toggle.setAttribute("aria-expanded", "true");
    await tick();
    expect(names(w).filter((n) => n === "annotation_sidebar_opened")).toHaveLength(2);
  });
});

describe("the annotation badge", () => {
  const withCount = (w: Page, total: number | "fail") => {
    const asked: string[] = [];
    (w as unknown as { fetch: unknown }).fetch = async (url: string) => {
      asked.push(url);
      if (total === "fail") throw new Error("offline");
      return { ok: true, json: async () => ({ total, rows: [] }) };
    };
    return asked;
  };

  it("asks for the canonical page URI and shows the count beside the Edit link", async () => {
    const w = page(
      "https://book.example.org/chapters/chapter-03.html",
      '<h1 class="article-title">T</h1><p><a class="edit-on-github" href="#">Edit</a></p>',
    );
    const asked = withCount(w, 3);
    w.eval(trackRuntime);
    w.eval(annotationBadge);
    await (w.__tbAnnoBadge as { ready: Promise<unknown> }).ready;
    expect(asked).toEqual([
      "https://api.hypothes.is/api/search?limit=0&uri=" +
        encodeURIComponent("https://book.example.org/chapters/chapter-03"),
    ]);
    const badge = w.document.querySelector("button.tb-anno-badge")!;
    expect(badge.textContent).toBe("3 annotations");
    expect(badge.previousElementSibling?.className).toBe("edit-on-github");
  });

  it("goes at the end of the controls row when the page has one", async () => {
    const w = page(
      "https://book.example.org/chapters/chapter-03",
      '<h1 class="article-title">T</h1><div class="tb-page-controls">' +
        '<a class="edit-on-github" href="#">Edit</a><a class="tb-history-link" href="#">History</a>' +
        '<button class="tb-suggest-btn">Suggest</button></div>',
    );
    withCount(w, 1);
    w.eval(trackRuntime);
    w.eval(annotationBadge);
    await (w.__tbAnnoBadge as { ready: Promise<unknown> }).ready;
    const row = w.document.querySelector(".tb-page-controls")!;
    expect(row.lastElementChild?.className).toBe("tb-anno-badge");
    expect(w.document.querySelectorAll("button.tb-anno-badge")).toHaveLength(1);
  });

  it("canonicalises /index to /", async () => {
    const w = page("https://book.example.org/index.html");
    const asked = withCount(w, 0);
    w.eval(trackRuntime);
    w.eval(annotationBadge);
    await (w.__tbAnnoBadge as { ready: Promise<unknown> }).ready;
    expect(decodeURIComponent(asked[0]!.split("uri=")[1]!)).toBe("https://book.example.org/");
    expect(w.document.querySelector("button.tb-anno-badge")!.textContent).toBe(
      "Annotate this page",
    );
  });

  it("clicking counts the click and opens the sidebar, never closes it", async () => {
    const w = page("https://book.example.org/x");
    withCount(w, 1);
    w.eval(trackRuntime);
    w.eval(annotationBadge);
    await (w.__tbAnnoBadge as { ready: Promise<unknown> }).ready;
    const badge = w.document.querySelector("button.tb-anno-badge") as unknown as HTMLElement;
    expect(badge.textContent).toBe("1 annotation");

    badge.click();
    expect(badge.textContent).toBe("annotation tools blocked"); // no client yet
    const toggle = sidebar(w, false);
    let clicks = 0;
    toggle.onclick = () => clicks++;
    badge.click();
    expect(badge.textContent).toBe("1 annotation");
    expect(clicks).toBe(1);
    toggle.setAttribute("aria-expanded", "true");
    badge.click();
    expect(clicks).toBe(1);
    expect(names(w)).toEqual(Array(3).fill("annotation_badge_clicked"));
  });

  it("shows nothing when the count can't be had, and breaks nothing", async () => {
    const w = page("https://book.example.org/x");
    withCount(w, "fail");
    w.eval(trackRuntime);
    w.eval(annotationBadge);
    await (w.__tbAnnoBadge as { ready: Promise<unknown> }).ready;
    expect(w.document.querySelector("button.tb-anno-badge")).toBeNull();
  });
});

describe("paragraph numbers", () => {
  const body =
    '<h1 class="article-title">T</h1><div class="tb-page-controls"><a class="edit-on-github" href="#">Edit</a></div>' +
    '<article><p data-pnum="1" id="p1">One.</p><p data-pnum="2" id="p2">Two.</p></article>';

  it("adds the toggle to the controls row, pressed, and it turns the numbers off and back", () => {
    const w = page("https://book.example.org/chapters/chapter-03", body);
    w.eval(noTracking);
    w.eval(paragraphNumbers);
    const b = w.document.querySelector("button.tb-pnum-toggle") as unknown as HTMLButtonElement;
    expect(b.parentElement!.className).toBe("tb-page-controls");
    expect(b.getAttribute("aria-pressed")).toBe("true");
    b.click();
    expect(w.document.documentElement.classList.contains("tb-pnum-off")).toBe(true);
    expect(b.getAttribute("aria-pressed")).toBe("false");
    expect(w.localStorage.getItem("tb-pnum")).toBe("off");
    b.click();
    expect(w.document.documentElement.classList.contains("tb-pnum-off")).toBe(false);
    expect(w.localStorage.getItem("tb-pnum")).toBeNull();
  });

  it("a reader's 'off' is applied before the body is drawn", () => {
    const w = page("https://book.example.org/chapters/chapter-03", body);
    w.localStorage.setItem("tb-pnum", "off");
    w.eval(noTracking);
    w.eval(paragraphNumbers);
    expect(w.document.documentElement.classList.contains("tb-pnum-off")).toBe(true);
  });

  it("a page with no numbered paragraphs gets no toggle", () => {
    const w = page("https://book.example.org/", '<h1 class="article-title">T</h1><p>Home.</p>');
    w.eval(noTracking);
    w.eval(paragraphNumbers);
    expect(w.document.querySelector("button.tb-pnum-toggle")).toBeNull();
  });

  it("draws the numbers with CSS, never as text", () => {
    const w = page("https://book.example.org/chapters/chapter-03", body);
    w.eval(noTracking);
    w.eval(paragraphNumbers);
    expect(w.document.querySelector("article")!.textContent).toBe("One.Two.");
    expect(w.document.getElementById("tb-pnum-style")!.textContent).toContain(
      "content: attr(data-pnum)",
    );
  });
});

describe("target flash", () => {
  const body =
    '<article><p id="p1"><a class="internal" href="#ref-a">A, 1979</a></p>' +
    '<p data-pnum="2" id="ref-a">A. (1979). A book.</p><h2 id="two">Two</h2></article>' +
    '<div class="popover"><p id="ref-b">Elsewhere.</p></div>';
  const flashing = (w: Page) =>
    [...w.document.querySelectorAll(".tb-flash")].map((e) => (e as unknown as HTMLElement).id);

  it("flashes the reference a same-page link jumps to, then clears", async () => {
    const w = page("https://book.example.org/chapters/chapter-03", body);
    w.eval(targetFlash);
    expect(flashing(w)).toEqual([]);
    w.location.hash = "#ref-a";
    await tick(200);
    expect(flashing(w)).toEqual(["ref-a"]);
    await tick(3100);
    expect(flashing(w)).toEqual([]);
  });

  it("flashes again when the same link is clicked a second time", async () => {
    const w = page("https://book.example.org/chapters/chapter-03#ref-a", body);
    w.eval(targetFlash);
    await tick(200);
    w.document.querySelector(".tb-flash")?.classList.remove("tb-flash");
    (w.document.querySelector('a[href="#ref-a"]') as unknown as HTMLElement).click();
    await tick(200);
    expect(flashing(w)).toEqual(["ref-a"]);
  });

  it("flashes the target of a page opened at a fragment, once it holds still", async () => {
    const w = page("https://book.example.org/chapters/chapter-03#ref-a", body);
    w.eval(targetFlash);
    await tick(200);
    expect(flashing(w)).toEqual(["ref-a"]);
  });

  it("leaves popovers and missing ids alone", async () => {
    const w = page("https://book.example.org/chapters/chapter-03", body);
    w.eval(targetFlash);
    w.location.hash = "#ref-b";
    await tick(200);
    w.location.hash = "#nowhere";
    await tick(200);
    expect(flashing(w)).toEqual([]);
  });

  it("uses the design's mark colour and stops the target below the top edge", () => {
    const w = page("https://book.example.org/chapters/chapter-03", body);
    w.eval(targetFlash);
    const css = w.document.getElementById("tb-flash-style")!.textContent!;
    expect(css).toContain("var(--tb-mark, #FDF2B3)");
    expect(css).toContain("scroll-margin-top: 3.75rem");
  });
});
