/* eslint-disable no-restricted-syntax -- test pages are closed after each test */
// The header (batches 2+3): A sticky header, C Appearance, D Contribute,
// E the explainer, F the ⋯ menu. B (the sidebar's width) is edition-integrations'.
import { afterEach, describe, expect, it } from "vitest";
import { Window } from "happy-dom";
import { renderToString } from "preact-render-to-string";
import type { QuartzComponentProps } from "@quartz-community/types";
import EditOnGitHub, { SUBTITLES, folderName, rootOf } from "../src/components/EditOnGitHub";
import { apa, apaName, attribution, plain, splitAuthors } from "../src/components/scripts/cite";

const script = EditOnGitHub({}).afterDOMLoaded as string;
const ENDPOINT = "https://fn.example/api/suggest-edit";
const SHA = "c".repeat(40);
const BOOK = {
  repo: "o/r",
  contentDir: "",
  suggestEndpoint: ENDPOINT,
  sourceCommit: SHA,
  authors: "Brandon Sommer, Caroline Laschkolnig",
  licence: "CC-BY-SA-4.0",
};

const render = (
  opts: Record<string, unknown> = BOOK,
  relativePath = "chapters/chapter-03.md",
  frontmatter: Record<string, unknown> = { title: "Introduction" },
) =>
  renderToString(
    EditOnGitHub(opts)({
      fileData: { relativePath, filePath: "book/" + relativePath, slug: relativePath.replace(/\.md$/, ""), frontmatter },
      cfg: { pageTitle: "Ontology for Social Research" },
    } as unknown as QuartzComponentProps) as never,
  );

type Page = Window & { eval: (code: string) => unknown; calls: unknown[][]; [k: string]: unknown };
const opened: Page[] = [];
afterEach(async () => {
  while (opened.length) await opened.pop()!.happyDOM.close();
});

/** A page with the header, Quartz's search and backlinks, optional prefs/annotations stubs. */
const page = (
  html = render(),
  { prefs = true, explained = false, backlinks = 1, storage = true, popover = false, quartzBar = false } = {},
) => {
  const w = new Window({ url: "https://book.example.org/chapters/chapter-03" }) as unknown as Page;
  if (!storage) Object.defineProperty(w, "localStorage", { get: () => { throw new Error("denied") } });
  else if (explained) w.localStorage.setItem("tb-contribute-explained", "1");
  const links = Array.from({ length: backlinks }, (_, i) => `<li><a class="internal" href="x${i}">X${i}</a></li>`).join("");
  w.document.write(
    `<html><head></head><body><div class="left sidebar"><div class="search"><button class="search-button"></button></div>` +
      (quartzBar
        ? `<button class="readermode"></button><div class="explorer collapsed"><button class="mobile-explorer"></button><div id="explorer-0" class="explorer-content"></div></div>`
        : "") +
      `</div>` +
      `${html}<article><p data-pnum="1" id="p1">One.</p></article>` +
      `<div class="backlinks"><h3>Backlinks</h3><ul>${links || "<li>No backlinks found</li>"}</ul></div></body></html>`,
  );
  w.calls = [];
  w.eval("window.tbTrack = function () { window.calls.push([].slice.call(arguments)) }");
  if (prefs)
    w.eval(`
      window.prefSets = []
      window.tbPrefs = { v: { text: "standard", width: "standard", theme: "auto", numbers: "on", annotations: "on" },
        get: function (n) { return this.v[n] }, set: function (n, x) { this.v[n] = x; window.prefSets.push([n, x]) } }
      window.annoCalls = []
      window.tbAnnotations = {
        open: function () { window.annoCalls.push("open"); return Promise.resolve(true) },
        close: function () { window.annoCalls.push("close") },
        enable: function () { window.annoCalls.push("enable") },
        disable: function () { window.annoCalls.push("disable"); return { reload: true } },
      }`);
  // happy-dom has no Popover API: a stand-in that records the top layer.
  if (popover)
    w.eval(`window.topLayer = []
      HTMLElement.prototype.showPopover = function () { window.topLayer.push(this) }
      HTMLElement.prototype.hidePopover = function () { window.topLayer.splice(window.topLayer.indexOf(this), 1) }`);
  // Quartz's explorer and reader-mode scripts, as far as the header relies on them.
  if (quartzBar)
    w.eval(`document.querySelector(".mobile-explorer").addEventListener("click", function () {
        document.querySelector(".explorer").classList.toggle("collapsed") })
      document.querySelector(".readermode").addEventListener("click", function () {
        var on = document.documentElement.getAttribute("reader-mode") === "on"
        document.documentElement.setAttribute("reader-mode", on ? "off" : "on")
        document.dispatchEvent(new CustomEvent("readermodechange")) })`);
  w.eval(script);
  w.document.dispatchEvent(new w.CustomEvent("nav"));
  opened.push(w);
  return w;
};
const $ = <T extends Element = HTMLElement>(w: Page, sel: string) => w.document.querySelector(sel) as unknown as T;
const key = (w: Page, k: string, target?: Element) => {
  const e = new w.KeyboardEvent("keydown", { key: k, bubbles: true, cancelable: true });
  ((target ?? w.document.activeElement ?? w.document.body) as unknown as EventTarget).dispatchEvent(e as never);
};
const tick = (ms = 20) => new Promise((r) => setTimeout(r, ms));
const items = (w: Page, menu: string) =>
  Array.from(w.document.querySelectorAll(`${menu} [role="menuitem"]`)).filter(
    (el) => !(el as unknown as HTMLElement).hidden,
  ) as unknown as HTMLElement[];

describe("A. the sticky header", () => {
  it("has the book's title and the page's place on the left, and the five controls on the right", () => {
    const w = page(undefined, { explained: true });
    expect($(w, ".tb-hdr-title").textContent).toBe("Ontology for Social Research");
    expect($(w, ".tb-hdr-title").getAttribute("href")).toBe("../");
    expect($(w, ".tb-hdr-crumbs a").textContent).toBe("Chapters");
    expect($(w, ".tb-hdr-crumbs a").getAttribute("href")).toBe("../chapters/");
    const shown = Array.from(w.document.querySelectorAll(".tb-hdr-actions > .tb-hdr-btn, .tb-hdr-actions > .tb-hdr-wrap > .tb-hdr-btn"))
      .filter((b) => !(b as unknown as HTMLElement).hidden)
      .map((b) => b.querySelector(".tb-hdr-label")!.textContent);
    expect(shown).toEqual(["Search", "Contribute ▾", "Annotate", "Appearance", "More"]);
  });

  it("is sticky, keeps Quartz's overlays above it, and shows only icons on a phone", () => {
    const css = EditOnGitHub({}).css as string;
    expect(css).toMatch(/\.tb-header \{\s*position: sticky;\s*top: 0;\s*z-index: 2;/);
    expect(css).toContain(".center > .page-header > .popover-hint { display: contents; }");
    expect(css).toContain(".page > #quartz-body > .sidebar.right { z-index: 1; }");
    expect(css).toMatch(/\.sidebar:has\(\.search-container\.active, \.global-graph-outer\.active\),\s*html\.mobile-no-scroll [^{]*\{ z-index: 3; \}/);
    expect(css).toMatch(/@media \(max-width: 800px\) \{[^}]*\.sidebar\.right \{ position: relative; \}/);
    // Icons only when the header itself is narrow: a phone, or beside the open sidebar.
    expect(css).toContain("container: tb-header / inline-size;");
    const narrow = css.slice(css.indexOf("@container tb-header (max-width: 640px)"));
    expect(narrow).toMatch(/\.tb-hdr-label \{[^}]*clip-path: inset\(50%\)/);
    expect(css).toMatch(/@media print \{ \.tb-header, \.tb-dialog \{ display: none !important; \} \}/);
  });

  it("has Quartz's explorer menu and reader mode as its own buttons, pressing Quartz's", async () => {
    const w = page(undefined, { explained: true, quartzBar: true });
    const menu = $<HTMLButtonElement>(w, "[data-tb-menu]");
    const quartzMenu = $<HTMLButtonElement>(w, ".mobile-explorer");
    expect(menu.hidden).toBe(false);
    expect(menu.getAttribute("aria-controls")).toBe("explorer-0");
    expect(quartzMenu.tabIndex).toBe(-1);
    menu.click();
    await tick();
    expect($(w, ".explorer").classList.contains("collapsed")).toBe(false);
    // Close, in the same place: the drawer opens below the header.
    expect(menu.getAttribute("aria-expanded")).toBe("true");
    expect(menu.classList.contains("tb-closes")).toBe(true);
    expect(menu.querySelector(".tb-hdr-label")!.textContent).toBe("Close menu");
    expect(quartzMenu.tabIndex).toBe(-1);
    menu.click();
    await tick();
    expect(menu.getAttribute("aria-expanded")).toBe("false");
    expect(menu.querySelector(".tb-hdr-label")!.textContent).toBe("Menu");
    const reader = $<HTMLButtonElement>(w, "[data-tb-reader]");
    expect(reader.hidden).toBe(false);
    reader.click();
    expect(w.document.documentElement.getAttribute("reader-mode")).toBe("on");
    expect(reader.getAttribute("aria-pressed")).toBe("true");
  });

  it("without Quartz's explorer or reader mode, has neither button", () => {
    const w = page(undefined, { explained: true });
    expect($(w, "[data-tb-menu]").hidden).toBe(true);
    expect($(w, "[data-tb-reader]").hidden).toBe(true);
    expect($(w, "[data-tb-reader-item]").hidden).toBe(true);
  });

  it("Search opens Quartz's own search, and stays hidden where there is none", () => {
    const w = page(undefined, { explained: true });
    let opened = 0;
    $<HTMLButtonElement>(w, ".search .search-button").addEventListener("click", () => opened++);
    $<HTMLButtonElement>(w, "[data-tb-search]").click();
    expect(opened).toBe(1);
    expect($(w, "[data-tb-search]").getAttribute("aria-keyshortcuts")).toContain("Control+K");

    const bare = new Window({ url: "https://book.example.org/x" }) as unknown as Page;
    bare.document.write(`<html><body>${render()}</body></html>`);
    bare.eval(script);
    bare.document.dispatchEvent(new bare.CustomEvent("nav"));
    expect($<HTMLButtonElement>(bare, "[data-tb-search]").hidden).toBe(true);
    void bare.happyDOM.close();
  });

  it("never clips: goes to icons whenever its contents are wider than it, and back when they fit", async () => {
    const w = page(undefined, { explained: true });
    const header = $(w, ".tb-header");
    let content = 900;
    Object.defineProperty(header, "scrollWidth", { get: () => (header.classList.contains("tb-hdr-icons") ? 500 : content) });
    Object.defineProperty(header, "clientWidth", { get: () => 600 });
    w.dispatchEvent(new w.Event("resize"));
    await tick(40);
    expect(header.classList.contains("tb-hdr-icons")).toBe(true);
    content = 580; // the labels fit again
    w.dispatchEvent(new w.Event("resize"));
    await tick(40);
    expect(header.classList.contains("tb-hdr-icons")).toBe(false);
    const css = EditOnGitHub({}).css as string;
    expect(css).toMatch(/\.tb-header\.tb-hdr-icons \.tb-hdr-label \{[^}]*clip-path: inset\(50%\)/);
    expect(css).toMatch(/\.tb-hdr-crumbs \{[^}]*min-width: 0; overflow: hidden;/);
  });

  it("names folders as a reader would, and finds the root from any depth", () => {
    expect(folderName("further-reading")).toBe("Further reading");
    expect(rootOf("index")).toBe("./");
    expect(rootOf("a/b/c")).toBe("../../");
  });
});

describe("C. Appearance", () => {
  it("opens from the keyboard on the current choice, changes a setting, and Escape gives focus back", () => {
    const w = page(undefined, { explained: true });
    const aa = $<HTMLButtonElement>(w, "[data-tb-appearance]");
    aa.focus();
    aa.click();
    expect(aa.getAttribute("aria-expanded")).toBe("true");
    const legends = Array.from(w.document.querySelectorAll("#tb-appearance legend")).map((l) => l.textContent);
    expect(legends).toEqual(["Text size", "Width", "Theme", "Paragraph numbers", "Public annotations"]);
    expect((w.document.activeElement as unknown as HTMLInputElement).value).toBe("standard");
    const large = $<HTMLInputElement>(w, 'input[name="tb-pref-text"][value="large"]');
    large.checked = true;
    large.dispatchEvent(new w.Event("change") as never);
    const off = $<HTMLInputElement>(w, 'input[name="tb-pref-numbers"][value="off"]');
    off.checked = true;
    off.dispatchEvent(new w.Event("change") as never);
    expect(w.prefSets).toEqual([["text", "large"], ["numbers", "off"]]);
    expect(w.calls).toContainEqual(["paragraph_numbers_toggled", { to: "off" }]);
    key(w, "Escape", large as unknown as Element);
    expect($(w, "#tb-appearance").hidden).toBe(true);
    expect(aa.getAttribute("aria-expanded")).toBe("false");
    expect(w.document.activeElement).toBe(aa);
  });

  it("opens in the top layer where there is one, placed under its button, and leaves it on close", () => {
    const w = page(undefined, { explained: true, popover: true });
    const aa = $<HTMLButtonElement>(w, "[data-tb-appearance]");
    const panel = $(w, "#tb-appearance");
    aa.click();
    expect(panel.getAttribute("popover")).toBe("manual");
    expect(w.topLayer).toEqual([panel]);
    expect(panel.style.top).toMatch(/px$/);
    $<HTMLButtonElement>(w, "[data-tb-more]").click();
    expect(w.topLayer).toEqual([$(w, "#tb-more-menu")]);
    key(w, "Escape", $(w, "#tb-more-menu"));
    expect(w.topLayer).toEqual([]);
    expect($(w, "#tb-more-menu").hidden).toBe(true);
  });

  it("annotations off mid-page says a reload finishes it, and offers one", () => {
    const w = page(undefined, { explained: true });
    $<HTMLButtonElement>(w, "[data-tb-appearance]").click();
    const off = $<HTMLInputElement>(w, 'input[name="tb-pref-annotations"][value="off"]');
    off.checked = true;
    off.dispatchEvent(new w.Event("change") as never);
    expect(w.annoCalls).toEqual(["disable"]);
    const note = $(w, "#tb-appearance .tb-panel-note");
    expect(note.textContent).toContain("goes away when the page reloads");
    expect(note.querySelector("button")!.textContent).toBe("Reload");
  });

  it("stays hidden without edition-integrations' settings", () => {
    const w = page(undefined, { prefs: false, explained: true });
    expect($<HTMLButtonElement>(w, "[data-tb-appearance]").hidden).toBe(true);
    expect($<HTMLButtonElement>(w, "[data-tb-annotate]").hidden).toBe(true);
  });
});

describe("D. Contribute", () => {
  it("has the four routes, each with its one-line subtitle, in order", () => {
    const w = page(undefined, { explained: true });
    const list = items(w, "#tb-contribute-menu").map((i) => [
      i.querySelector(".tb-mi-t")!.textContent,
      i.querySelector(".tb-mi-s")!.textContent,
    ]);
    expect(list).toEqual([
      ["Edit this page", "GitHub sign-in · reviewed before it's published"],
      ["Note to the authors", "No account · goes to the authors as a GitHub issue, visible on the book's repository, not on this page"],
      ["Public comment", "Hypothes.is account · anyone reading the book can see it"],
      ["How contributing works", SUBTITLES.explain],
    ]);
  });

  it("an edition without an endpoint keeps its fallback in place of Edit and Note", () => {
    const html = render({ repo: "o/r" });
    expect(html).toContain(">Edit on GitHub ↗</span>");
    expect(html).not.toContain("tb-suggest-btn");
    expect(html).not.toContain("data-edit-endpoint");
  });

  it("is a menu by keyboard: arrows move, Escape closes it and gives focus back", () => {
    const w = page(undefined, { explained: true });
    const btn = $<HTMLButtonElement>(w, "[data-tb-contribute]");
    expect(btn.getAttribute("aria-haspopup")).toBe("menu");
    btn.focus();
    btn.click();
    expect(btn.getAttribute("aria-expanded")).toBe("true");
    const list = items(w, "#tb-contribute-menu");
    expect(w.document.activeElement).toBe(list[0]);
    key(w, "ArrowDown");
    expect(w.document.activeElement).toBe(list[1]);
    key(w, "ArrowUp");
    key(w, "ArrowUp");
    expect(w.document.activeElement).toBe(list.at(-1));
    key(w, "Escape");
    expect($(w, "#tb-contribute-menu").hidden).toBe(true);
    expect(w.document.activeElement).toBe(btn);
  });

  it("as Close on a narrow screen, a tap closes the sidebar even when the client closed it on the press", async () => {
    const w = page(undefined, { explained: true });
    w.eval("window.matchMedia = function () { return { matches: true } }");
    const root = w.document.documentElement;
    const annotate = $<HTMLButtonElement>(w, "[data-tb-annotate]");
    root.classList.add("tb-hypothesis-expanded");
    w.document.dispatchEvent(new w.CustomEvent("tb-hypothesis-layout") as never);
    expect(annotate.classList.contains("tb-closes")).toBe(true);
    expect(annotate.querySelector(".tb-hdr-label")!.textContent).toBe("Close annotations");
    // Hypothes.is closes its sidebar on any press in the page, before the click.
    annotate.dispatchEvent(new w.Event("pointerdown", { bubbles: true }) as never);
    root.classList.remove("tb-hypothesis-expanded");
    w.document.dispatchEvent(new w.CustomEvent("tb-hypothesis-layout") as never);
    annotate.click();
    await tick();
    expect(w.annoCalls).toEqual(["close"]);
    // Closed, the next tap opens it.
    annotate.dispatchEvent(new w.Event("pointerdown", { bubbles: true }) as never);
    annotate.click();
    await tick();
    expect(w.annoCalls).toContain("open");
  });

  it("Public comment opens the annotation sidebar", async () => {
    const w = page(undefined, { explained: true });
    $<HTMLButtonElement>(w, "[data-tb-comment]").click();
    await tick();
    expect(w.annoCalls).toEqual(["open"]);
  });
});

describe("E. the explainer", () => {
  it("isn't shown on page load; the first Contribute shows it, then never again", () => {
    const w = page();
    expect($(w, "dialog.tb-dialog")).toBeNull();
    const btn = $<HTMLButtonElement>(w, "[data-tb-contribute]");
    btn.click();
    const d = $(w, "dialog.tb-dialog");
    expect(d.getAttribute("aria-label")).toBe("How contributing works");
    expect($(w, "#tb-contribute-menu").hidden).toBe(true);
    const text = d.textContent!;
    for (const route of ["Edit this page", "Note to the authors", "Public comment"]) expect(text).toContain(route);
    expect(text).toContain("Who sees it");
    const hrefs = Array.from(d.querySelectorAll("a")).map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["https://github.com/signup", "https://hypothes.is/signup", "../how-to-comment"]);
    // Continue carries on to the menu.
    const go = Array.from(d.querySelectorAll("button")).find((b) => b.textContent === "Continue to Contribute")!;
    go.click();
    expect($(w, "dialog.tb-dialog")).toBeNull();
    expect($(w, "#tb-contribute-menu").hidden).toBe(false);
    expect(w.localStorage.getItem("tb-contribute-explained")).toBe("1");
    key(w, "Escape");
    btn.click();
    expect($(w, "dialog.tb-dialog")).toBeNull();
    expect($(w, "#tb-contribute-menu").hidden).toBe(false);
  });

  it("comes first for a pencil and for Annotate too, and How contributing works reopens it", async () => {
    const w = page(render({ ...BOOK, editor: true }));
    $<HTMLButtonElement>(w, "[data-tb-annotate]").click();
    const go = Array.from(w.document.querySelectorAll("dialog.tb-dialog button")).find((b) =>
      b.textContent!.startsWith("Continue"),
    )!;
    expect(go.textContent).toBe("Continue: open annotations");
    go.click();
    await tick();
    expect(w.annoCalls).toEqual(["open"]);
    $<HTMLButtonElement>(w, "[data-tb-explain]").click();
    const again = $(w, "dialog.tb-dialog");
    expect(Array.from(again.querySelectorAll("button")).map((b) => b.textContent)).toEqual(["×", "Close"]);
  });

  it("a book without the public layer: margin comments in groups, or none without a client", () => {
    const routes = (w: Page) => {
      $<HTMLButtonElement>(w, "[data-tb-explain]").click();
      const d = $(w, "dialog.tb-dialog");
      return { titles: [...d.querySelectorAll("h3")].map((h) => h.textContent), text: d.textContent! };
    };
    const groups = page(undefined, { explained: true });
    groups.eval("window.tbAnnotations.groupsOnly = true");
    groups.document.dispatchEvent(new groups.CustomEvent("nav"));
    const g = routes(groups);
    expect(g.titles).toEqual(["Edit this page", "Note to the authors", "Margin comment"]);
    expect(g.text).toContain("Public comments are switched off on this book.");
    expect(g.text).not.toContain("Anyone on the internet");
    const none = page(undefined, { explained: true, prefs: false });
    expect(routes(none).titles).toEqual(["Edit this page", "Note to the authors"]);
    expect(items(none, "#tb-contribute-menu").map((i) => i.querySelector(".tb-mi-t")!.textContent)).not.toContain("Public comment");
  });

  it("says what this site has: a book's three routes, an edition's two, and the note's real masking", () => {
    const routes = (w: Page) => {
      $<HTMLButtonElement>(w, "[data-tb-explain]").click();
      const d = $(w, "dialog.tb-dialog");
      return { intro: d.querySelector("p")!.textContent, titles: [...d.querySelectorAll("h3")].map((h) => h.textContent), text: d.textContent! };
    };
    const book = routes(page(undefined, { explained: true }));
    expect(book.intro).toBe("There are three ways to help with this book. They differ in who sees what you write, and in which account you need.");
    expect(book.titles).toEqual(["Edit this page", "Note to the authors", "Public comment"]);
    expect(book.text).toContain("Who sees it: The authors. It becomes a public issue on the book's GitHub repository, showing your name. It doesn't appear on this page.");
    expect(book.text).toContain("Account: None. You give your name.");
    expect(book.text).toContain("Who sees it: Anyone on the internet, with your Hypothes.is username.");
    expect(book.text).not.toMatch(/email/i);
    // An edition: no editor, no suggest form.
    const edition = routes(page(render({ repo: "o/r" }), { explained: true }));
    expect(edition.intro).toBe("There are two ways to help with this edition. They differ in who sees what you write, and in which account you need.");
    expect(edition.titles).toEqual(["Edit on GitHub", "Public comment"]);
    expect(edition.text).not.toContain("Note to the authors");
    expect(edition.text).toContain("Who sees it: The edition's maintainers review it. The proposal is public on the edition's GitHub repository and shows your GitHub username.");
    // The same on a page with no source file of its own.
    const listing = render(BOOK, "chapters/index.md", {});
    expect(listing).toContain('data-routes="edit note comment"');
  });

  it("works with no storage at all: shown once on the page", () => {
    const w = page(undefined, { storage: false });
    const btn = $<HTMLButtonElement>(w, "[data-tb-contribute]");
    btn.click();
    expect($(w, "dialog.tb-dialog")).not.toBeNull();
    ($(w, "dialog.tb-dialog") as unknown as HTMLDialogElement).close();
    btn.click();
    expect($(w, "dialog.tb-dialog")).toBeNull();
  });
});

describe("the type badge", () => {
  it("names what kind of text it is beside the title; nothing for an edition", () => {
    expect(page(render({ ...BOOK, type: "paper" })).document.querySelector(".tb-type-badge")?.textContent).toBe("Paper");
    expect(page(render(BOOK)).document.querySelector(".tb-type-badge")).toBeNull();
  });
});

describe("F. the ⋯ menu", () => {
  it("has Cite, Print, Page history, What links here, Download and View source at the build's commit", () => {
    const w = page(undefined, { explained: true });
    const list = items(w, "#tb-more-menu");
    expect(list.map((i) => i.querySelector(".tb-mi-t")!.textContent)).toEqual([
      "Cite this page",
      "Print / save as PDF",
      "Page history ↗",
      "What links here",
      "Download as Markdown",
      "View source ↗",
    ]);
    expect(list[5]!.getAttribute("href")).toBe(`https://github.com/o/r/blob/${SHA}/chapters/chapter-03.md`);
    expect(list[4]!.getAttribute("data-tb-download")).toBe(
      `https://raw.githubusercontent.com/o/r/${SHA}/chapters/chapter-03.md`,
    );
  });

  it("Page statistics (and Book statistics on the front page): the platform dashboard, filtered", () => {
    const stats = { ...BOOK, statsUrl: "https://plausible.io/share/confused4now.org?auth=k", statsHost: "book.example.org" };
    const w = page(render(stats), { explained: true });
    const pg = items(w, "#tb-more-menu").find((i) => i.textContent?.includes("Page statistics"))!;
    expect(pg.getAttribute("href")).toBe(
      "https://plausible.io/share/confused4now.org?auth=k&f=is,hostname,book.example.org&f=is,page,/chapters/chapter-03",
    );
    expect(items(w, "#tb-more-menu").some((i) => i.textContent?.includes("Book statistics"))).toBe(false);
    const front = page(render({ ...stats, statsUrl: "https://plausible.io/confused4now.org" }, "index.md"), { explained: true });
    const book = items(front, "#tb-more-menu").find((i) => i.textContent?.includes("Book statistics"))!;
    expect(book.getAttribute("href")).toBe("https://plausible.io/confused4now.org?f=is,hostname,book.example.org");
    expect(items(front, "#tb-more-menu").find((i) => i.textContent?.includes("Page statistics"))!.getAttribute("href")).toMatch(/f=is,page,\/$/);
  });

  it("no statistics where the site isn't counted", () => {
    const w = page(render(BOOK), { explained: true });
    expect(items(w, "#tb-more-menu").some((i) => /statistics/.test(i.textContent ?? ""))).toBe(false);
  });

  it("Cite gives APA 7 and the licence's attribution, each with a copy button", () => {
    const w = page(undefined, { explained: true });
    $<HTMLButtonElement>(w, "[data-tb-cite]").click();
    const d = $(w, "dialog.tb-dialog");
    const heads = Array.from(d.querySelectorAll("h3")).map((h) => h.textContent);
    expect(heads).toEqual(["APA 7", "Attribution (CC BY-SA 4.0)"]);
    const [ref, attr] = Array.from(d.querySelectorAll(".tb-cite-text")).map((p) => p.textContent);
    expect(ref).toMatch(/^Sommer, B\., & Laschkolnig, C\. \(n\.d\.\)\. Introduction\. In Ontology for Social Research\. Retrieved \w+ \d+, \d{4}, from https:\/\/book\.example\.org\/chapters\/chapter-03$/);
    expect(d.querySelector(".tb-cite-text i")!.textContent).toBe("Ontology for Social Research");
    expect(attr).toBe(
      "“Introduction” by Brandon Sommer, Caroline Laschkolnig, from Ontology for Social Research, https://book.example.org/chapters/chapter-03, is licensed under CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/).",
    );
    expect(Array.from(d.querySelectorAll("button")).filter((b) => b.textContent === "Copy")).toHaveLength(2);
  });

  it("Print prints; What links here scrolls to the backlinks, and is disabled with none", () => {
    const w = page(undefined, { explained: true });
    let printed = 0;
    (w as unknown as { print: () => void }).print = () => printed++;
    $<HTMLButtonElement>(w, "[data-tb-print]").click();
    expect(printed).toBe(1);
    let scrolled = 0;
    $(w, ".backlinks").scrollIntoView = () => void scrolled++;
    $<HTMLButtonElement>(w, "[data-tb-backlinks]").click();
    expect(scrolled).toBe(1);
    expect(w.document.activeElement).toBe($(w, ".backlinks h3"));

    const none = page(undefined, { explained: true, backlinks: 0 });
    expect($(none, "[data-tb-backlinks]").getAttribute("aria-disabled")).toBe("true");
  });

  it("Download fetches the file at the build's commit and saves it as a .md", async () => {
    const w = page(undefined, { explained: true });
    const asked: string[] = [];
    (w as unknown as { fetch: unknown }).fetch = async (u: string) => {
      asked.push(u);
      return { ok: true, blob: async () => new w.Blob(["# Hi"], { type: "text/markdown" }) };
    };
    let saved = "";
    const create = w.document.createElement.bind(w.document);
    (w.document as unknown as { createElement: unknown }).createElement = (t: string) => {
      const n = create(t);
      if (t === "a") n.addEventListener("click", (e: Event) => ((saved = (n as HTMLAnchorElement).download), e.preventDefault()));
      return n;
    };
    $<HTMLButtonElement>(w, "[data-tb-download]").click();
    await tick(50);
    expect(asked).toEqual([`https://raw.githubusercontent.com/o/r/${SHA}/chapters/chapter-03.md`]);
    expect(saved).toBe("chapter-03.md");
  });
});

describe("Cite's formats", () => {
  const base = {
    authors: "Brandon Sommer and Caroline Laschkolnig",
    bookTitle: "A Book",
    pageTitle: "Chapter One",
    licence: "CC-BY-SA-4.0",
    url: "https://b.example/c1",
    accessed: new Date("2026-10-06T12:00:00Z"),
  };
  it("APA names: surname and initials, an organisation as given, & before the last", () => {
    expect(splitAuthors("A B, C D & E F and G H")).toEqual(["A B", "C D", "E F", "G H"]);
    expect(apaName("Mary Ann Smith")).toBe("Smith, M. A.");
    expect(apaName("UNESCO")).toBe("UNESCO");
    expect(plain(apa({ ...base, authors: "Ann Lee, Bo Wu, Cy Ng" }))).toMatch(/^Lee, A\., Wu, B\., & Ng, C\. \(n\.d\.\)/);
  });
  it("drops a missing field cleanly", () => {
    expect(plain(apa({ ...base, authors: "" }))).toBe(
      "Chapter One. (n.d.). In A Book. Retrieved October 6, 2026, from https://b.example/c1",
    );
    expect(plain(apa({ ...base, pageTitle: "" }))).toBe(
      "Sommer, B., & Laschkolnig, C. (n.d.). A Book. Retrieved October 6, 2026, from https://b.example/c1",
    );
    expect(plain(attribution({ ...base, authors: "", licence: "" }))).toBe(
      "“Chapter One”, from A Book, https://b.example/c1.",
    );
  });
});
