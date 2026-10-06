import { afterEach, describe, expect, it } from "vitest";
import { Window } from "happy-dom";
import {
  analyticsLoader,
  annotationBadge,
  explorerFollowsContents,
  explorerKeepsPageStill,
  phoneMenuStartsClosed,
  noTracking,
  paragraphNumbers,
  readerPrefs,
  annotationsControl,
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

  it("adds no toggle of its own: the Appearance panel has it", () => {
    const w = page("https://book.example.org/chapters/chapter-03", body);
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
    // The stop below the sticky header is design.ts's, in --tb-header-h.
    expect(css).not.toContain("scroll-margin-top");
  });
});

describe("the phone menu starts closed", () => {
  const explorerPage = () =>
    page(
      "https://book.example.org/x",
      '<div class="explorer"><button class="explorer-toggle mobile-explorer">Menu</button>' +
        '<div class="explorer-content"></div></div>',
    );
  const withWidth = (w: Page, narrow: boolean) => {
    w.matchMedia = ((q: string) => ({
      matches: narrow,
      media: q,
    })) as unknown as typeof w.matchMedia;
  };

  it("closes a menu Quartz left open on a phone", async () => {
    const w = explorerPage();
    withWidth(w, true);
    w.eval(phoneMenuStartsClosed("800px"));
    w.document.dispatchEvent(new w.Event("nav"));
    await tick(20);
    const ex = w.document.querySelector(".explorer")!;
    expect(ex.classList.contains("collapsed")).toBe(true);
    expect(ex.getAttribute("aria-expanded")).toBe("false");
  });

  it("never overrides the reader's own tap", async () => {
    const w = explorerPage();
    withWidth(w, true);
    w.eval(phoneMenuStartsClosed("800px"));
    (w.document.querySelector(".explorer-toggle") as unknown as HTMLElement).click();
    w.document.dispatchEvent(new w.Event("nav"));
    await tick(20);
    expect(w.document.querySelector(".explorer")!.classList.contains("collapsed")).toBe(false);
  });

  it("leaves wider screens alone", async () => {
    const w = explorerPage();
    withWidth(w, false);
    w.eval(phoneMenuStartsClosed("800px"));
    w.document.dispatchEvent(new w.Event("nav"));
    await tick(20);
    expect(w.document.querySelector(".explorer")!.classList.contains("collapsed")).toBe(false);
  });
});

describe("the explorer keeps the page still", () => {
  /** A page whose browser scrollIntoView is a spy, with the script run after it. */
  const withSpy = () => {
    const w = page(
      "https://book.example.org/chapters/introduction",
      '<ul class="explorer-ul"><li><a class="active">Intro</a></li></ul><h2 id="h">H</h2>',
    );
    w.eval(
      "window.__calls = []; Element.prototype.scrollIntoView = function () { window.__calls.push(this) }",
    );
    w.eval(explorerKeepsPageStill);
    return { w, calls: () => w.__calls as unknown[] };
  };
  const rect = (top: number, height: number) => () => ({ top, bottom: top + height, height });

  it("scrolls only the list when the entry is outside it", () => {
    const { w, calls } = withSpy();
    const list = w.document.querySelector(".explorer-ul") as unknown as HTMLElement;
    const active = w.document.querySelector(".active") as unknown as HTMLElement;
    list.getBoundingClientRect = rect(100, 400) as unknown as typeof list.getBoundingClientRect;
    active.getBoundingClientRect = rect(900, 20) as unknown as typeof active.getBoundingClientRect;
    active.scrollIntoView({ behavior: "smooth" });
    expect(calls()).toHaveLength(0);
    // 900 - 100 - (400 - 20) / 2: the entry ends up centred in the list.
    expect(list.scrollTop).toBe(610);
    expect(w.scrollY).toBe(0);
  });

  it("leaves the list alone when the entry is already in view", () => {
    const { w, calls } = withSpy();
    const list = w.document.querySelector(".explorer-ul") as unknown as HTMLElement;
    const active = w.document.querySelector(".active") as unknown as HTMLElement;
    list.getBoundingClientRect = rect(100, 400) as unknown as typeof list.getBoundingClientRect;
    active.getBoundingClientRect = rect(200, 20) as unknown as typeof active.getBoundingClientRect;
    active.scrollIntoView();
    expect(calls()).toHaveLength(0);
    expect(list.scrollTop).toBe(0);
  });

  it("passes anything outside the explorer to the browser", () => {
    const { w, calls } = withSpy();
    const h = w.document.getElementById("h")!;
    h.scrollIntoView();
    expect(calls()).toEqual([h]);
  });
});

describe("the explorer follows the Contents", () => {
  type Node = { slugSegments: string[]; isFolder: boolean; displayName: string };
  const file = (slug: string, displayName: string): Node => ({
    slugSegments: slug.split("/"),
    isFolder: false,
    displayName,
  });
  const folder = (slug: string): Node => ({
    slugSegments: slug.split("/"),
    isFolder: true,
    displayName: slug,
  });
  /** The sort the explorer builds from data-data-fns after a nav event, as it builds it. */
  const sortAfterNav = (order: string[]) => {
    const w = page(
      "https://book.example.org/chapters/introduction",
      `<div class="explorer" data-data-fns='{"filterFn":"(n) => true"}'></div>`,
    );
    w.eval(explorerFollowsContents(order));
    w.document.dispatchEvent(new w.Event("nav"));
    const fns = JSON.parse(
      (w.document.querySelector("div.explorer") as unknown as HTMLElement).dataset.dataFns!,
    );
    expect(fns.filterFn).toBe("(n) => true");
    return new Function("a", "b", "return (" + fns.sortFn + ")(a, b)") as (
      a: Node,
      b: Node,
    ) => number;
  };
  const ORDER = [
    "chapters/introduction",
    "chapters/chapter-01",
    "chapters/chapter-02",
    "chapters/chapter-10",
    "glossary",
  ];
  const names = (nodes: Node[]) => nodes.map((n) => n.slugSegments.join("/"));

  it("sorts the chapters in Contents order, Introduction first", () => {
    const sort = sortAfterNav(ORDER);
    const chapters = [
      file("chapters/chapter-10", "Chapter 10"),
      file("chapters/chapter-02", "Chapter 2"),
      file("chapters/introduction", "Introduction"),
      file("chapters/chapter-01", "Chapter 1"),
    ];
    expect(names(chapters.sort(sort))).toEqual(ORDER.slice(0, 4));
  });

  it("ranks a folder by its first listed page, and puts unlisted nodes after, in the default order", () => {
    const sort = sortAfterNav(ORDER);
    const root = [
      file("zz", "Zz"),
      file("glossary", "Glossary"),
      file("about", "About"),
      folder("assets"),
      folder("chapters"),
    ];
    expect(names(root.sort(sort))).toEqual(["chapters", "glossary", "assets", "about", "zz"]);
    const unlisted = [
      file("chapters/appendix-10", "Appendix 10"),
      file("chapters/appendix-2", "Appendix 2"),
      file("chapters/chapter-01", "Chapter 1"),
    ];
    expect(names(unlisted.sort(sort))).toEqual([
      "chapters/chapter-01",
      "chapters/appendix-2",
      "chapters/appendix-10",
    ]);
  });

  it("can't be closed early by a slug", () => {
    expect(explorerFollowsContents(["a</script><script>alert(1)"])).not.toContain("</");
  });
});

describe("the reader's settings (C)", () => {
  type Prefs = { get: (n: string) => string; set: (n: string, v: string) => void };
  const root = (w: Page) => w.document.documentElement;

  it("applies every stored setting to <html> before the body is drawn", () => {
    const w = page("https://book.example.org/x");
    for (const [k, v] of [["theme", "dark"], ["tb-text", "large"], ["tb-width", "wide"], ["tb-pnum", "off"], ["tb-annotations", "off"]])
      w.localStorage.setItem(k!, v!);
    w.eval(readerPrefs);
    expect(root(w).getAttribute("saved-theme")).toBe("dark");
    expect(root(w).getAttribute("data-tb-text")).toBe("large");
    expect(root(w).getAttribute("data-tb-width")).toBe("wide");
    expect(root(w).classList.contains("tb-pnum-off")).toBe(true);
    expect(root(w).classList.contains("tb-annotations-off")).toBe(true);
  });

  it("defaults: theme follows the system, standard text and width, numbers and annotations on", () => {
    const w = page("https://book.example.org/x");
    w.eval(readerPrefs);
    const prefs = w.tbPrefs as Prefs;
    expect(["auto", "standard", "standard", "on", "on"]).toEqual(
      ["theme", "text", "width", "numbers", "annotations"].map((n) => prefs.get(n)),
    );
    expect(["light", "dark"]).toContain(root(w).getAttribute("saved-theme"));
    expect(root(w).getAttribute("data-tb-text")).toBe("standard");
  });

  it("keeps Quartz's theme key and values, stores defaults as absence, and ignores junk", () => {
    const w = page("https://book.example.org/x");
    w.localStorage.setItem("tb-text", "enormous");
    w.eval(readerPrefs);
    const prefs = w.tbPrefs as Prefs;
    expect(prefs.get("text")).toBe("standard");
    let changed = "";
    w.document.addEventListener("themechange", ((e: CustomEvent) => (changed = e.detail.theme)) as never);
    prefs.set("theme", "dark");
    expect(w.localStorage.getItem("theme")).toBe("dark");
    expect(changed).toBe("dark");
    prefs.set("theme", "auto");
    expect(w.localStorage.getItem("theme")).toBeNull();
    prefs.set("numbers", "off");
    expect(w.localStorage.getItem("tb-pnum")).toBe("off");
    prefs.set("numbers", "on");
    expect(w.localStorage.getItem("tb-pnum")).toBeNull();
    prefs.set("width", "huge");
    expect(w.localStorage.getItem("tb-width")).toBeNull();
  });

  it("renders with the defaults, and still changes for this page, when storage throws", () => {
    const w = page("https://book.example.org/x");
    Object.defineProperty(w, "localStorage", { get: () => { throw new Error("denied") } });
    w.eval(readerPrefs);
    const prefs = w.tbPrefs as Prefs;
    expect(root(w).getAttribute("data-tb-text")).toBe("standard");
    prefs.set("text", "small");
    expect(root(w).getAttribute("data-tb-text")).toBe("small");
  });
});

describe("public annotations on and off (C)", () => {
  type Annotations = { open: () => Promise<boolean>; disable: () => { reload: boolean }; on: () => boolean };
  const loaderStub = (w: Page) =>
    w.eval(`window.tbLoadHypothesis = function () {
      if (window.__editionIntegrations) return
      window.__editionIntegrations = true
      var s = document.createElement("script"); s.setAttribute("data-edition-hypothesis", ""); document.head.appendChild(s)
    }`);

  it("Annotate with annotations off turns them on, loads the client, and opens the sidebar", async () => {
    const w = page("https://book.example.org/x");
    w.localStorage.setItem("tb-annotations", "off");
    w.eval(readerPrefs);
    w.eval(annotationsControl);
    loaderStub(w);
    const a = w.tbAnnotations as Annotations;
    expect(a.on()).toBe(false);
    const opened = a.open();
    expect(w.localStorage.getItem("tb-annotations")).toBeNull();
    expect(w.document.documentElement.classList.contains("tb-annotations-off")).toBe(false);
    expect(w.document.querySelectorAll("script[data-edition-hypothesis]")).toHaveLength(1);
    const toggle = sidebar(w, false);
    let clicks = 0;
    toggle.onclick = () => {
      clicks++;
      toggle.setAttribute("aria-expanded", "true");
    };
    expect(await opened).toBe(true);
    expect(clicks).toBe(1);
  });

  it("asks again when an open doesn't hold (a mouse press closes the sidebar), and never toggles it shut", async () => {
    const w = page("https://book.example.org/x");
    w.eval(readerPrefs);
    w.eval(annotationsControl);
    loaderStub(w);
    const toggle = sidebar(w, false);
    let clicks = 0;
    // The first open is undone by the page's own press; the second holds.
    toggle.onclick = () => {
      clicks++;
      if (clicks === 2) toggle.setAttribute("aria-expanded", "true");
    };
    expect(await (w.tbAnnotations as Annotations).open()).toBe(true);
    expect(clicks).toBe(2);
    expect(await (w.tbAnnotations as Annotations).open()).toBe(true);
    expect(clicks).toBe(2); // already open: not clicked again
  });

  it("turning them off mid-page hides highlights, collapses the sidebar, and says a reload finishes it", () => {
    const w = page("https://book.example.org/x");
    w.eval(readerPrefs);
    w.eval(annotationsControl);
    loaderStub(w);
    (w.tbLoadHypothesis as () => void)();
    const toggle = sidebar(w, true);
    let clicks = 0;
    toggle.onclick = () => clicks++;
    expect((w.tbAnnotations as Annotations).disable()).toEqual({ reload: true });
    expect(clicks).toBe(1);
    expect(w.document.documentElement.classList.contains("tb-annotations-off")).toBe(true);
    expect(w.localStorage.getItem("tb-annotations")).toBe("off");
  });

  it("the badge asks Hypothes.is nothing while annotations are off, and counts on the header's Annotate", async () => {
    const off = page("https://book.example.org/x", '<button data-tb-annotate><span class="tb-anno-count"></span></button>');
    off.localStorage.setItem("tb-annotations", "off");
    let asked = 0;
    (off as unknown as { fetch: unknown }).fetch = async () => (asked++, { ok: true, json: async () => ({ total: 2 }) });
    off.eval(readerPrefs);
    off.eval(trackRuntime);
    off.eval(annotationBadge);
    await (off.__tbAnnoBadge as { ready: Promise<unknown> }).ready;
    expect(asked).toBe(0);

    const on = page("https://book.example.org/x", '<button data-tb-annotate><span class="tb-anno-count"></span></button>');
    (on as unknown as { fetch: unknown }).fetch = async () => ({ ok: true, json: async () => ({ total: 2 }) });
    on.eval(readerPrefs);
    on.eval(trackRuntime);
    on.eval(annotationBadge);
    await (on.__tbAnnoBadge as { ready: Promise<unknown> }).ready;
    const b = on.document.querySelector("[data-tb-annotate]")!;
    expect(b.querySelector(".tb-anno-count")!.textContent).toBe("2");
    expect(b.getAttribute("aria-label")).toBe("Annotate: 2 annotations");
    expect(on.document.querySelector("button.tb-anno-badge")).toBeNull();
  });
});
