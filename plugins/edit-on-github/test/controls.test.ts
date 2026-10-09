/* eslint-disable no-restricted-syntax -- test pages are closed after each test */
import { afterEach, describe, expect, it } from "vitest";
import { Window } from "happy-dom";
import { summary } from "../src/components/scripts/history";
import { renderToString } from "preact-render-to-string";
import type { QuartzComponentProps } from "@quartz-community/types";
import EditOnGitHub, {
  encodePath,
  proposeEndpoint,
  repoPath,
} from "../src/components/EditOnGitHub";

// The page script as a browser gets it (vitest.config.ts bundles it the way
// tsup.config.ts does).
const script = EditOnGitHub({}).afterDOMLoaded as string;

const render = (
  opts: Record<string, unknown>,
  relativePath = "chapters/chapter-03.md",
  filePath: string | null = "book/" + relativePath,
  frontmatter: Record<string, unknown> = { title: "Chapter 3" },
) => {
  const Component = EditOnGitHub(opts);
  const slug = relativePath.replace(/\.md$/, "");
  const props = {
    fileData: { relativePath, filePath, slug, frontmatter },
    cfg: { pageTitle: "A Book" },
  } as unknown as QuartzComponentProps;
  return renderToString(Component(props) as never);
};

type Call = unknown[];
type Page = Window & { eval: (code: string) => unknown; calls: Call[]; [k: string]: unknown };
const opened: Page[] = [];
afterEach(async () => {
  while (opened.length) await opened.pop()!.happyDOM.close();
});

/** A page carrying the rendered row, a tbTrack spy, and the script, after "nav". */
const page = (row: string, fetchImpl?: (...a: unknown[]) => Promise<unknown>) => {
  const w = new Window({ url: "https://book.example.org/chapters/chapter-03" }) as unknown as Page;
  w.document.write(`<html><head></head><body><h1>T</h1>${row}<p>after</p></body></html>`);
  w.calls = [];
  w.eval("window.tbTrack = function () { window.calls.push([].slice.call(arguments)) }");
  w.localStorage.setItem("tb-contribute-explained", "1");
  if (fetchImpl) (w as unknown as { fetch: unknown }).fetch = fetchImpl;
  w.eval(script);
  w.document.dispatchEvent(new w.CustomEvent("nav"));
  opened.push(w);
  return w;
};
const $ = <T extends Element = HTMLElement>(w: Page, sel: string) =>
  w.document.querySelector(sel) as unknown as T;
/**
 * A key press. happy-dom doesn't move focus on Tab, so this does what a browser
 * does when the page doesn't prevent it: focus the next (or previous) tabbable
 * element in document order, leaving the page for the address bar at the end.
 */
const key = (w: Page, k: string, shiftKey = false) => {
  const target = (w.document.activeElement ?? w.document.body) as unknown as EventTarget;
  const e = new w.KeyboardEvent("keydown", { key: k, shiftKey, bubbles: true, cancelable: true });
  target.dispatchEvent(e as never);
  if (k !== "Tab" || e.defaultPrevented) return;
  const tabbable = [
    ...w.document.querySelectorAll("a[href], button, input, textarea, [tabindex]"),
  ].filter(
    (el) =>
      (el as unknown as HTMLElement).tabIndex >= 0 &&
      !el.closest("[hidden]") &&
      !(el as unknown as HTMLButtonElement).disabled,
  ) as unknown as HTMLElement[];
  const i = tabbable.indexOf(w.document.activeElement as unknown as HTMLElement);
  const next = tabbable[shiftKey ? i - 1 : i + 1];
  if (next) next.focus();
  else (w.document.activeElement as unknown as HTMLElement | null)?.blur();
};
const tick = (ms = 20) => new Promise((r) => setTimeout(r, ms));
const ENDPOINT = "https://fn.example/api/suggest-edit";
const withSuggest = { repo: "o/r", contentDir: "", suggestEndpoint: ENDPOINT };

/** Opens the modal and sends a suggestion, as a reader would. */
const fill = (w: Page, website = "") => {
  $<HTMLButtonElement>(w, "button.tb-suggest-btn").click();
  $<HTMLInputElement>(w, "#tb-sg-name").value = "A Reader";
  $<HTMLTextAreaElement>(w, "#tb-sg-suggestion").value = '"recieve" should be "receive"';
  $<HTMLInputElement>(w, "#tb-sg-website").value = website;
  $<HTMLFormElement>(w, "#tb-suggest-overlay form").requestSubmit();
};

describe("a note to the authors on one paragraph", () => {
  const LONG = "Consider a situation that will be familiar to anyone who has spent time in the literature of any contested field. Two research teams investigate the same phenomenon, and both seemingly do everything right, and more besides.";
  const notePage = (signed = false) => {
    const w = new Window({ url: "https://book.example.org/chapters/chapter-03" }) as unknown as Page;
    w.document.write(`<html><head></head><body>${render(withSuggest)}<article><p data-pnum="1" id="p1">Short one.</p><p data-pnum="2" id="p2">${LONG}</p></article></body></html>`);
    w.calls = [];
    w.eval("window.tbTrack = function () { window.calls.push([].slice.call(arguments)) }");
    w.localStorage.setItem("tb-contribute-explained", "1");
    if (signed) w.sessionStorage.setItem("tb-gh-identity", JSON.stringify({ token: "tok", login: "ada-l", id: 42, name: "Ada", at: Date.now() }));
    const posts: Record<string, unknown>[] = [];
    (w as unknown as { fetch: unknown }).fetch = async (_u: string, init: { body: string }) => {
      posts.push(JSON.parse(init.body));
      return { ok: true, status: 201, json: async () => ({ issueUrl: "https://github.com/o/r/issues/8" }) };
    };
    w.eval(script);
    w.document.dispatchEvent(new w.CustomEvent("nav"));
    opened.push(w);
    return { w, posts };
  };

  it("sits after each paragraph's pencil, out of the tab order like it", () => {
    const { w } = notePage();
    const b = $<HTMLButtonElement>(w, "#p2 > button.tb-pnote");
    expect(b.previousElementSibling?.className).toBe("tb-pedit");
    expect(b.tabIndex).toBe(-1);
    expect(b.getAttribute("aria-hidden")).toBe("true");
    expect(b.title).toBe("Note to the authors about ¶2");
    expect(b.textContent).toBe("");
  });

  it("opens the note form about that paragraph and files it with ¶, quote and page", async () => {
    const { w, posts } = notePage();
    $<HTMLButtonElement>(w, "#p2 > button.tb-pnote").click();
    expect($(w, "#tb-suggest-title").textContent).toBe("Note to the authors about ¶2");
    const quote = $(w, ".tb-sg-quote").textContent!;
    expect(quote.length).toBeLessThanOrEqual(200);
    expect(quote.endsWith("…") && LONG.startsWith(quote.slice(0, -1))).toBe(true);
    $<HTMLInputElement>(w, "#tb-sg-name").value = "A Reader";
    $<HTMLTextAreaElement>(w, "#tb-sg-suggestion").value = "This needs a source.";
    $<HTMLFormElement>(w, "#tb-suggest-overlay form").requestSubmit();
    await tick();
    expect(posts[0]).toMatchObject({ name: "A Reader", path: "chapters/chapter-03.md", paragraph: 2, quote, page: "/chapters/chapter-03" });
    expect(posts[0]).not.toHaveProperty("identity");
    expect(w.calls.map((c) => c[0])).toContain("section_note_opened");
    // A short paragraph is quoted whole.
    $<HTMLButtonElement>(w, "#tb-suggest-overlay .tb-sg-quiet, #tb-suggest-overlay button.tb-sg-close").click();
    $<HTMLButtonElement>(w, "#p1 > button.tb-pnote").click();
    expect($(w, ".tb-sg-quote").textContent).toBe("Short one.");
  });

  it("signed in with the editor's GitHub sign-in: the name filled in, and the sign-in sent", async () => {
    const { w, posts } = notePage(true);
    $<HTMLButtonElement>(w, "button.tb-suggest-btn").click();
    expect($<HTMLInputElement>(w, "#tb-sg-name").value).toBe("Ada");
    expect($(w, "#tb-sg-who").textContent).toContain("@ada-l");
    $<HTMLTextAreaElement>(w, "#tb-sg-suggestion").value = "A note on the page.";
    $<HTMLFormElement>(w, "#tb-suggest-overlay form").requestSubmit();
    await tick();
    expect(posts[0]).toMatchObject({ identity: "tok" });
    expect(posts[0]).not.toHaveProperty("paragraph");
  });
});

describe("the Edit and History links", () => {
  it("built from the repo root, point at the file's repo path", () => {
    const html = render({ repo: "o/r", contentDir: "" });
    expect(html).toContain('href="https://github.com/o/r/edit/main/chapters/chapter-03.md"');
    expect(html).toContain('href="https://github.com/o/r/commits/main/chapters/chapter-03.md"');
  });

  it("keep an edition's links as they were (content/ is Quartz's default -d)", () => {
    const html = render({ repo: "o/r" }, "chapters/01-intro.md");
    expect(html).toContain("/edit/main/content/chapters/01-intro.md");
  });

  it("encode each segment, keeping / as the separator", () => {
    expect(encodePath(repoPath("", "chapters/Chapter 3 & #1.md"))).toBe(
      "chapters/Chapter%203%20%26%20%231.md",
    );
    expect(repoPath("./book/", "a/b.md")).toBe("book/a/b.md");
  });

  it("keep class edit-on-github on the GitHub edit link, which the editor and edition-integrations find", () => {
    const w = page(render({ repo: "o/r", contentDir: "" }));
    expect($<HTMLAnchorElement>(w, "a.edit-on-github").getAttribute("href")).toBe(
      "https://github.com/o/r/edit/main/chapters/chapter-03.md",
    );
  });

  it("leave out what needs a source file on a virtual page, a page with none, a builder page or no repo", () => {
    for (const html of [
      render({ repo: "o/r" }, ""),
      render({ repo: "o/r" }, "tags/index.md", null), // a tag listing
      render({ repo: "" }),
      render({ repo: "o/r" }, "how-to-comment.md", "book/how-to-comment.md", { tbBuilderPage: true }),
    ]) {
      expect(html).toContain('class="tb-header tb-page-controls"');
      for (const needsSource of ["edit-on-github", "tb-history-link", "data-tb-download", "View source", "data-source-path"])
        expect(html, needsSource).not.toContain(needsSource);
      expect(html).toContain("data-tb-cite");
    }
  });
});

describe("Suggest an edit", () => {
  it("is absent with the default suggestEndpoint", () => {
    expect(render({ repo: "o/r" })).not.toContain("tb-suggest-btn");
  });

  it("is rendered hidden, and shown only once the script arms it", () => {
    const html = render(withSuggest);
    expect(html).toMatch(/<button[^>]*class="tb-mi tb-suggest-btn"[^>]*hidden/);
    const w = page(html);
    expect($<HTMLButtonElement>(w, "button.tb-suggest-btn").hidden).toBe(false);
  });

  it("keyboard only: opens, holds focus, and gives it back on Escape", () => {
    const w = page(render(withSuggest));
    const btn = $<HTMLButtonElement>(w, "button.tb-suggest-btn");
    btn.focus();
    btn.click();
    const dialog = $(w, '#tb-suggest-overlay [role="dialog"]');
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(w.document.activeElement?.id).toBe("tb-sg-name");
    // Tab forward past the last control wraps to the first; Shift+Tab back.
    const visits: string[] = [];
    for (let i = 0; i < 12; i++) {
      key(w, "Tab");
      const el = w.document.activeElement as unknown as HTMLElement;
      if (!dialog.contains(el as never)) throw new Error("focus left the dialog");
      visits.push(el.id || el.className);
    }
    expect(visits).not.toContain("tb-sg-website"); // the honeypot is never reached
    key(w, "Tab", true);
    expect(dialog.contains(w.document.activeElement as never)).toBe(true);
    key(w, "Escape");
    expect($(w, "#tb-suggest-overlay")).toBeNull();
    // Focus goes back to Contribute: the item itself is in a closed menu.
    expect(w.document.activeElement).toBe($(w, "[data-tb-contribute]"));
  });

  it("has the four honeypot guards and a counter with no live region", () => {
    const w = page(render(withSuggest));
    $<HTMLButtonElement>(w, "button.tb-suggest-btn").click();
    const hp = $<HTMLInputElement>(w, "#tb-sg-website");
    expect(hp.name).toBe("website");
    expect(hp.closest(".tb-sg-hp")!.getAttribute("aria-hidden")).toBe("true");
    expect(hp.getAttribute("aria-hidden")).toBe("true");
    expect(hp.tabIndex).toBe(-1);
    expect($(w, 'label[for="tb-sg-website"]').textContent).toBe("Leave this field empty");
    const count = $(w, "#tb-sg-count");
    expect(count.hasAttribute("aria-live")).toBe(false);
    expect(count.getAttribute("role")).toBeNull();
    expect($(w, "#tb-sg-suggestion").getAttribute("aria-describedby")).toBe("tb-sg-count");
    expect($<HTMLInputElement>(w, "#tb-sg-path").value).toBe("chapters/chapter-03.md");
  });

  it("with the honeypot filled, answers as a success and sends nothing", async () => {
    const posts: unknown[] = [];
    const w = page(render(withSuggest), async (...a) => (posts.push(a), { ok: true }));
    fill(w, "https://spam.example");
    await tick();
    expect(posts).toEqual([]);
    expect($(w, ".tb-sg-pane-title").textContent).toBe("Thank you");
  });

  it("posts the contract's payload, and shows the issue link on 201", async () => {
    const posts: [string, { body: string }][] = [];
    const w = page(render(withSuggest), async (url, init) => {
      posts.push([url as string, init as { body: string }]);
      return {
        ok: true,
        status: 201,
        json: async () => ({ issueUrl: "https://github.com/o/r/issues/7" }),
      };
    });
    fill(w);
    await tick();
    expect(posts[0]![0]).toBe(ENDPOINT);
    // No email is asked for or sent: the issue shows the name only.
    expect(w.document.querySelector('#tb-suggest-overlay input[type="email"], #tb-sg-email')).toBeNull();
    expect(JSON.parse(posts[0]![1].body)).toEqual({
      name: "A Reader",
      suggestion: '"recieve" should be "receive"',
      reasoning: "",
      path: "chapters/chapter-03.md",
      website: "",
    });
    expect($<HTMLAnchorElement>(w, ".tb-sg-pane a").href).toBe("https://github.com/o/r/issues/7");
  });

  it("shows userMessage as capped text, never `error`, and keeps the draft", async () => {
    const long = "<b>Slow down</b> " + "x".repeat(300);
    const w = page(render(withSuggest), async () => ({
      ok: false,
      status: 429,
      json: async () => ({ error: "ratelimit: internal detail", userMessage: long }),
    }));
    fill(w);
    await tick();
    const msg = $(w, ".tb-sg-pane p:nth-child(2)");
    expect(msg.textContent).toBe(long.slice(0, 200));
    expect(msg.children).toHaveLength(0);
    expect($(w, ".tb-sg-pane").textContent).not.toContain("internal detail");
    $<HTMLButtonElement>(w, ".tb-sg-pane button").click();
    expect($<HTMLTextAreaElement>(w, "#tb-sg-suggestion").value).toBe(
      '"recieve" should be "receive"',
    );
  });

  it("falls back to its own copy when there is no userMessage", async () => {
    const w = page(render(withSuggest), async () => ({
      ok: false,
      status: 502,
      json: async () => ({ error: "x" }),
    }));
    fill(w);
    await tick();
    expect($(w, ".tb-sg-pane").textContent).toContain("nothing was lost");
  });
});

describe("the three events", () => {
  it("fire exactly as §1a names them", async () => {
    let ok = true;
    const w = page(render(withSuggest), async () =>
      ok
        ? { ok: true, status: 201, json: async () => ({ issueUrl: "u" }) }
        : { ok: false, status: 500, json: async () => ({}) },
    );
    const edit = $<HTMLAnchorElement>(w, "a.edit-on-github");
    edit.addEventListener("click", (e) => e.preventDefault());
    // A modified click is still the GitHub link; a plain one opens the in-site editor.
    edit.dispatchEvent(
      new w.MouseEvent("click", { bubbles: true, cancelable: true, ctrlKey: true }) as never,
    );
    fill(w);
    await tick();
    key(w, "Escape");
    ok = false;
    fill(w);
    await tick();
    expect(w.calls).toEqual([
      ["edit_on_github_clicked"],
      ["suggest_edit_opened"],
      ["suggest_edit_submitted", { outcome: "success" }],
      ["suggest_edit_opened"],
      ["suggest_edit_submitted", { outcome: "error" }],
    ]);
  });

  it("are dropped silently where tbTrack doesn't exist (book two)", () => {
    const w = page(render(withSuggest));
    w.eval("delete window.tbTrack");
    expect(() => $<HTMLButtonElement>(w, "button.tb-suggest-btn").click()).not.toThrow();
    expect($(w, "#tb-suggest-overlay")).not.toBeNull();
  });
});

describe("the in-site editor", () => {
  const SOURCE = "# T\n\nFirst paragraph.\n\nSecond paragraph, recieve.\n";
  const SHA = "a".repeat(40);
  const rowAndParas = (opts: Record<string, string | boolean>) =>
    render(opts) +
    '<p data-pnum="1" id="p1">First paragraph.</p><p data-pnum="2" id="p2">Second paragraph, recieve.</p>';

  it("derives /api/propose-edit from the suggest endpoint", () => {
    expect(proposeEndpoint(ENDPOINT)).toBe("https://fn.example/api/propose-edit");
    expect(proposeEndpoint("not a url")).toBe("");
  });

  it("turns Edit into 'Edit this page', keeping the GitHub href as the no-script fallback", () => {
    const html = render(withSuggest);
    expect(html).toContain(">Edit this page</span>");
    expect(html).toContain('data-edit-endpoint="https://fn.example/api/propose-edit"');
    expect(html).toContain('href="https://github.com/o/r/edit/main/chapters/chapter-03.md"');
  });

  it("stays the plain GitHub link with no endpoint (editions), or with editor: false", () => {
    for (const html of [render({ repo: "o/r" }), render({ ...withSuggest, editor: false })]) {
      expect(html).toContain(">Edit on GitHub ↗</a>");
      expect(html).not.toContain("data-edit-endpoint");
    }
  });

  it("puts a text-free pencil on every numbered paragraph", () => {
    const w = page(rowAndParas(withSuggest));
    expect(w.document.querySelectorAll("[data-pnum] > button.tb-pedit").length).toBe(2);
    expect($(w, "#p2").textContent).toBe("Second paragraph, recieve.");
    expect($(w, "#p2 > button.tb-pedit").getAttribute("tabindex")).toBe("-1");
  });

  const ID = { token: "v1.tok.sig", login: "reader", id: 7, name: "A Reader" };
  const signedIn = (w: Page) =>
    w.sessionStorage.setItem("tb-gh-identity", JSON.stringify({ ...ID, at: Date.now() }));
  /** A page whose function serves SOURCE at SHA, and records every proposal. */
  const editorPage = (
    opts: Record<string, unknown> = withSuggest,
    url = "https://book.example.org/chapters/chapter-03",
    login = true,
  ) => {
    const sent: unknown[] = [];
    const gets: string[] = [];
    const w = new Window({ url }) as unknown as Page;
    if (login) signedIn(w);
    w.localStorage.setItem("tb-contribute-explained", "1");
    w.document.write(
      `<html><head></head><body><h1>T</h1>${render(opts as Record<string, string>)}<p data-pnum="1" id="p1">First paragraph.</p><p data-pnum="2" id="p2">Second paragraph, recieve.</p></body></html>`,
    );
    w.calls = [];
    w.eval("window.tbTrack = function () { window.calls.push([].slice.call(arguments)) }");
    (w as unknown as { fetch: unknown }).fetch = async (u: string, init?: { body?: string }) => {
      if (!init?.body) {
        gets.push(u);
        return { ok: true, status: 200, json: async () => ({ content: SOURCE, sha: SHA, branch: "drafts" }) };
      }
      sent.push(JSON.parse(init.body));
      return { ok: true, status: 201, json: async () => ({ prUrl: "https://github.com/o/r/pull/1" }) };
    };
    w.eval(script);
    w.document.dispatchEvent(new w.CustomEvent("nav"));
    opened.push(w);
    return { w, sent, gets };
  };
  const propose = (w: Page) => {
    [...w.document.querySelectorAll("#tb-editor .tb-ed-primary")]
      .find((b) => b.textContent === "Propose changes…")!
      .dispatchEvent(new w.MouseEvent("click") as never);
  };
  /** The Propose dialog's "What did you change, and why?". */
  const summarise = (w: Page, text: string) => {
    const ta = $<HTMLTextAreaElement>(w, "#tb-ed-msg");
    ta.value = text;
    ta.dispatchEvent(new w.Event("input") as never);
  };
  const type = (w: Page, text: string) => {
    const ta = $<HTMLTextAreaElement>(w, "#tb-editor textarea.tb-ed-text");
    ta.value = text;
    ta.dispatchEvent(new w.Event("input") as never);
  };
  /** history.back(), and its popstate. */
  const back = async (w: Page) => {
    w.history.back();
    await tick();
  };

  it("a paragraph edit becomes a paragraph proposal, credited to the signed-in reader", async () => {
    const { w, sent } = editorPage();
    $<HTMLButtonElement>(w, "#p2 > button.tb-pedit").click();
    await tick();
    expect($<HTMLTextAreaElement>(w, "#tb-editor textarea.tb-ed-text").value).toBe(
      "Second paragraph, recieve.",
    );
    type(w, "Second paragraph, receive.");
    propose(w);
    expect($(w, "#tb-editor .tb-ed-who").textContent).toContain("@reader");
    expect(w.document.querySelector("#tb-ed-name, #tb-ed-email, #tb-ed-website")).toBeNull();
    // The summary is required: 10 to 500 characters, said before anything is sent.
    expect($(w, "label[for=tb-ed-msg]").textContent).toBe("What did you change, and why?");
    expect($(w, "#tb-ed-msg-hint").textContent).toMatch(/notified .* accept or decline/);
    $<HTMLFormElement>(w, "#tb-editor form").requestSubmit();
    summarise(w, "too short");
    $<HTMLFormElement>(w, "#tb-editor form").requestSubmit();
    await tick();
    expect(sent).toHaveLength(0);
    expect($(w, "#tb-ed-msg-err").textContent).toMatch(/at least 10 characters/);
    expect(w.document.activeElement).toBe($(w, "#tb-ed-msg"));
    summarise(w, "  Fixed the spelling of\n receive.  ");
    $<HTMLFormElement>(w, "#tb-editor form").requestSubmit();
    await tick();
    expect(sent[0]).toEqual({
      mode: "paragraph",
      path: "chapters/chapter-03.md",
      baseSha: SHA,
      startLine: 4,
      original: "Second paragraph, recieve.",
      replacement: "Second paragraph, receive.",
      paragraph: 2,
      title: "Edit ¶2 of chapter-03.md",
      summary: "Fixed the spelling of receive.",
      description: "",
      identity: ID.token,
    });
    expect(w.calls.map((c) => c[0])).toEqual(["page_editor_opened", "page_edit_submitted"]);
  });

  it("asks for GitHub sign-in before loading the source, and opens on the same paragraph after", async () => {
    const { w, gets } = editorPage(withSuggest, undefined, false);
    let popupUrl = "";
    (w as unknown as { open: unknown }).open = (u: string) => ((popupUrl = u), { close() {} });
    $<HTMLButtonElement>(w, "#p2 > button.tb-pedit").click();
    await tick();
    expect(gets).toEqual([]);
    expect(w.document.querySelector("#tb-editor textarea.tb-ed-text")).toBeNull();
    const gate = $(w, "#tb-editor .tb-ed-gate");
    expect(gate.textContent).toContain("Sign in to edit");
    expect(gate.textContent).toContain("No GitHub account?");
    const btn = [...gate.querySelectorAll("button")].find((b) => b.textContent === "Sign in with GitHub")!;
    expect(w.document.activeElement).toBe(btn);
    btn.click();
    expect(popupUrl).toBe(
      "https://fn.example/api/github-auth?origin=" + encodeURIComponent("https://book.example.org"),
    );
    // A message from anywhere but the function is ignored.
    w.dispatchEvent(new w.MessageEvent("message", { origin: "https://evil.example", data: { type: "tb-github-identity", ...ID } }) as never);
    await tick();
    expect(gets).toEqual([]);
    w.dispatchEvent(new w.MessageEvent("message", { origin: "https://fn.example", data: { type: "tb-github-identity", ...ID } }) as never);
    await tick();
    expect(gets).toEqual(["https://fn.example/api/propose-edit?path=chapters%2Fchapter-03.md"]);
    expect($<HTMLTextAreaElement>(w, "#tb-editor textarea.tb-ed-text").value).toBe(
      "Second paragraph, recieve.",
    );
    expect(w.location.hash).toBe("#edit-2");
  });

  it("points a reader without GitHub at Suggest an edit, which needs no account", async () => {
    const { w } = editorPage(withSuggest, undefined, false);
    $<HTMLAnchorElement>(w, "a.edit-on-github").click();
    await tick();
    const link = [...w.document.querySelectorAll("#tb-editor .tb-ed-gate button")].find(
      (b) => b.textContent === "Suggest an edit",
    )!;
    link.click();
    await tick();
    expect(w.document.getElementById("tb-editor")).toBeNull();
    expect(w.document.getElementById("tb-suggest-overlay")).not.toBeNull();
  });

  it("is one history entry: Back, Escape and × return to the page where it was opened", async () => {
    const { w } = editorPage();
    const start = w.history.length;
    w.scrollTo(0, 640);
    for (const how of ["back", "escape", "x", "cancel"]) {
      $<HTMLButtonElement>(w, "#p2 > button.tb-pedit").click();
      await tick();
      expect(w.location.hash).toBe("#edit-2");
      expect(w.document.getElementById("tb-editor")).not.toBeNull();
      if (how === "back") await back(w);
      else if (how === "escape") {
        key(w, "Escape");
        await tick();
      } else {
        const sel = how === "x" ? "#tb-editor .tb-ed-x" : "#tb-editor .tb-ed-actions .tb-ed-btn";
        $<HTMLButtonElement>(w, sel).click();
        await tick();
      }
      expect(w.document.getElementById("tb-editor"), how).toBeNull();
      expect(w.location.href, how).toBe("https://book.example.org/chapters/chapter-03");
      expect(w.scrollY, how).toBe(640);
    }
    // Each open pushed one entry, and each close went back over it.
    expect(w.history.length).toBe(start + 1);
  });

  it("Back with unsaved text asks first, and keeps the text", async () => {
    const { w } = editorPage();
    $<HTMLAnchorElement>(w, "a.edit-on-github").click();
    await tick();
    expect(w.location.hash).toBe("#edit");
    type(w, "# T\n\nchanged\n");
    await back(w);
    expect(w.document.getElementById("tb-editor")).not.toBeNull();
    expect(w.location.hash).toBe("#edit");
    expect($(w, "#tb-editor .tb-ed-discard").hidden).toBe(false);
    expect($<HTMLTextAreaElement>(w, "#tb-editor textarea.tb-ed-text").value).toBe("# T\n\nchanged\n");
    [...w.document.querySelectorAll<HTMLButtonElement>("#tb-editor .tb-ed-discard button")]
      .find((b) => b.textContent === "Discard")!
      .click();
    await tick();
    expect(w.document.getElementById("tb-editor")).toBeNull();
    expect(w.location.hash).toBe("");
  });

  it("after a proposal, Back still returns to the page", async () => {
    const { w, sent } = editorPage();
    $<HTMLAnchorElement>(w, "a.edit-on-github").click();
    await tick();
    type(w, "# T\n\nchanged\n");
    propose(w);
    summarise(w, "Changed the body text.");
    $<HTMLFormElement>(w, "#tb-editor form").requestSubmit();
    await tick();
    expect(sent).toHaveLength(1);
    expect($(w, "#tb-editor .tb-ed-result").textContent).toContain("Proposal opened");
    await back(w);
    expect(w.document.getElementById("tb-editor")).toBeNull();
    expect(w.location.hash).toBe("");
  });

  it("reopens on a reload with #edit, with the page under it in history", async () => {
    const { w } = editorPage(withSuggest, "https://book.example.org/chapters/chapter-03#edit-2");
    await tick();
    expect($<HTMLTextAreaElement>(w, "#tb-editor textarea.tb-ed-text").value).toBe(
      "Second paragraph, recieve.",
    );
    expect(w.location.hash).toBe("#edit-2");
    await back(w);
    expect(w.document.getElementById("tb-editor")).toBeNull();
    expect(w.location.href).toBe("https://book.example.org/chapters/chapter-03");
    // Forward onto the entry opens it again.
    w.history.forward();
    await tick();
    expect(w.document.getElementById("tb-editor")).not.toBeNull();
  });

  it("a reload of its own entry reopens in place, with no second page entry", async () => {
    // The page, then the editor's entry on it (what a reload of #edit-2 finds).
    const w = new Window({ url: "https://book.example.org/chapters/chapter-03" }) as unknown as Page;
    signedIn(w);
    w.history.pushState({ tbEditor: true }, "", "#edit-2");
    w.document.write(
      `<html><head></head><body>${render(withSuggest)}<p data-pnum="1">First paragraph.</p><p data-pnum="2">Second paragraph, recieve.</p></body></html>`,
    );
    (w as unknown as { fetch: unknown }).fetch = async () => ({
      ok: true,
      status: 200,
      json: async () => ({ content: SOURCE, sha: SHA, branch: "drafts" }),
    });
    w.eval(script);
    w.document.dispatchEvent(new w.CustomEvent("nav"));
    opened.push(w);
    await tick();
    expect($<HTMLTextAreaElement>(w, "#tb-editor textarea.tb-ed-text").value).toBe(
      "Second paragraph, recieve.",
    );
    expect(w.history.length).toBe(2);
    await back(w);
    expect(w.document.getElementById("tb-editor")).toBeNull();
    expect(w.location.href).toBe("https://book.example.org/chapters/chapter-03");
  });

  it("stamps what the page was built from, and says when drafts has moved on", async () => {
    const built = { ...withSuggest, sourceCommit: "c".repeat(40), sourceBlobs: { "chapters/chapter-03.md": "b".repeat(40) } };
    const html = render(built as unknown as Record<string, string>);
    expect(html).toContain('data-source-path="chapters/chapter-03.md"');
    expect(html).toContain(`data-source-commit="${"c".repeat(40)}"`);
    expect(html).toContain(`data-source-blob="${"b".repeat(40)}"`);

    const moved = editorPage(built);
    $<HTMLAnchorElement>(moved.w, "a.edit-on-github").click();
    await tick();
    const note = [...moved.w.document.querySelectorAll<HTMLElement>("#tb-editor .tb-ed-note")].find((n) =>
      n.textContent!.includes("waiting for review"),
    )!;
    expect(note.textContent).toBe("This page has changes waiting for review; you’re editing the latest draft.");
    expect(note.hidden).toBe(false);

    const same = editorPage({ ...built, sourceBlobs: { "chapters/chapter-03.md": SHA } });
    $<HTMLAnchorElement>(same.w, "a.edit-on-github").click();
    await tick();
    expect(
      [...same.w.document.querySelectorAll<HTMLElement>("#tb-editor .tb-ed-note")].every((n) => n.hidden),
    ).toBe(true);
  });
});

describe("the History panel", () => {
  const REVISIONS = "https://fn.example/api/page-revision?book=b";
  const withHistory = { ...withSuggest, revisionEndpoint: REVISIONS };
  const renderPage = (opts: Record<string, string | boolean>) =>
    renderToString(
      EditOnGitHub(opts)({
        fileData: {
          relativePath: "chapters/chapter-03.md",
          filePath: "x",
          slug: "chapters/chapter-03",
        },
      } as unknown as QuartzComponentProps) as never,
    );
  const LIST = [
    {
      sha: "b".repeat(40),
      date: "2026-09-03T10:00:00Z",
      who: "a reader",
      reader: true,
      message: "Clearer",
      path: "chapters/chapter-03.md",
    },
    {
      sha: "a".repeat(40),
      date: "2026-09-01T10:00:00Z",
      who: "ann",
      message: "First",
      path: "chapters/ch3.md",
    },
  ];

  it("is 'History' with an endpoint, keeping GitHub's history as the no-script href", () => {
    const html = renderPage(withHistory);
    expect(html).toMatch(
      /class="tb-mi tb-history-link" href="https:\/\/github\.com\/o\/r\/commits\/main\/chapters\/chapter-03\.md"[^>]*><span class="tb-mi-t">Page history</,
    );
    expect(html).toContain('data-history="/.well-known/history/chapters/chapter-03.json"');
  });

  it("stays GitHub's history without an endpoint (editions) or with editor: false", () => {
    expect(renderPage(withSuggest)).toContain("View revision history ↗");
    expect(renderPage({ ...withHistory, editor: false })).toContain("View revision history ↗");
  });

  it("lists the page's revisions, then opens one from the endpoint: its diff, the page as it was, the reader's name", async () => {
    const urls: string[] = [];
    const w = page(renderPage(withHistory), async (url) => {
      urls.push(String(url));
      if (String(url).endsWith(".json")) return { ok: true, status: 200, json: async () => LIST };
      if (String(url).includes("shas="))
        return {
          ok: true,
          status: 200,
          json: async () => ({ names: { ["b".repeat(40)]: "Jo Reader" } }),
        };
      return {
        ok: true,
        status: 200,
        json: async () => ({
          before: "One\nold line\n",
          after: "One\nnew line\n",
          html: "<p>new line</p><script>x()</script>",
          proposer: "Jo Reader",
          status: "modified",
        }),
      };
    });
    $<HTMLAnchorElement>(w, "a.tb-history-link").click();
    await tick();
    const rows = [...w.document.querySelectorAll("#tb-editor .tb-hi-rev")].map(
      (b) => b.textContent,
    );
    // Dressed for readers: the page, not the repo, the file or the branch.
    const top = $(w, "#tb-editor .tb-hi-top").textContent ?? "";
    expect(top).toContain("Page history");
    expect(top).not.toMatch(/chapter-03\.md|\bmain\b|\bo\/r\b/);
    expect(rows[0]).toContain("Clearer");
    expect(rows[0]).toContain("Published");
    expect(rows[0]).toContain("Jo Reader");
    expect(rows[0]).not.toContain("a reader");
    expect(rows[1]).toContain("ann");
    // One call for every "a reader" row's name, as the list opens.
    const names = new URL(urls[1]!);
    expect(Object.fromEntries(names.searchParams)).toEqual({ book: "b", shas: "b".repeat(40) });
    $<HTMLButtonElement>(w, "#tb-editor .tb-hi-rev").click();
    await tick();
    const rev = new URL(urls[2]!);
    expect(rev.origin + rev.pathname).toBe("https://fn.example/api/page-revision");
    expect(Object.fromEntries(rev.searchParams)).toEqual({
      book: "b",
      sha: "b".repeat(40),
      path: "chapters/chapter-03.md",
    });
    expect($(w, "#tb-editor .tb-ed-del").textContent).toContain("old");
    expect($(w, "#tb-editor .tb-ed-add").textContent).toContain("new");
    expect($(w, "#tb-hi-panel-1").innerHTML).toBe("<p>new line</p>");
    expect($(w, "#tb-editor .tb-hi-head").textContent).toContain("Jo Reader");
    // Back to the list: the reader's name is kept there too.
    [...w.document.querySelectorAll<HTMLButtonElement>("#tb-editor button")]
      .find((b) => b.textContent === "← All versions")!
      .click();
    expect($(w, "#tb-editor .tb-hi-rev").textContent).toContain("Jo Reader");
    key(w, "Escape");
    expect($(w, "#tb-editor")).toBeNull();
    expect(w.document.activeElement).toBe($(w, "[data-tb-more]")); // the item is in a closed menu
    expect(w.calls.map((c) => c[0])).toEqual(["page_history_opened", "page_revision_opened"]);
  });

  it("keeps 'a reader' when the names call fails, and asks nothing when no row needs a name", async () => {
    const urls: string[] = [];
    const w = page(renderPage(withHistory), async (url) => {
      urls.push(String(url));
      if (String(url).endsWith(".json")) return { ok: true, status: 200, json: async () => LIST };
      return { ok: false, status: 429, json: async () => ({}) };
    });
    $<HTMLAnchorElement>(w, "a.tb-history-link").click();
    await tick();
    expect($(w, "#tb-editor .tb-hi-rev").textContent).toContain("a reader");
    expect(urls.length).toBe(2);
    key(w, "Escape");

    const urls2: string[] = [];
    const w2 = page(renderPage(withHistory), async (url) => {
      urls2.push(String(url));
      return { ok: true, status: 200, json: async () => [LIST[1]] };
    });
    $<HTMLAnchorElement>(w2, "a.tb-history-link").click();
    await tick();
    expect(urls2.length).toBe(1);
  });

  it("says a page moved, rather than showing an empty diff", async () => {
    const w = page(renderPage(withHistory), async (url) =>
      String(url).endsWith(".json")
        ? { ok: true, status: 200, json: async () => LIST }
        : {
            ok: true,
            status: 200,
            json: async () => ({
              before: "Same\n",
              after: "Same\n",
              html: "<p>Same</p>",
              previousPath: "content/chapters/chapter-03.md",
              status: "renamed",
            }),
          },
    );
    $<HTMLAnchorElement>(w, "a.tb-history-link").click();
    await tick();
    $<HTMLButtonElement>(w, "#tb-editor .tb-hi-rev").click();
    await tick();
    expect($(w, "#tb-hi-panel-0").textContent).toBe(
      "The page moved to where it is now; its text didn’t change.",
    );
  });

  it("says so, with GitHub's history as the way on, when the endpoint refuses", async () => {
    const w = page(renderPage(withHistory), async (url) =>
      String(url).endsWith(".json")
        ? { ok: true, status: 200, json: async () => LIST }
        : {
            ok: false,
            status: 429,
            json: async () => ({ userMessage: "Too many revisions opened." }),
          },
    );
    $<HTMLAnchorElement>(w, "a.tb-history-link").click();
    await tick();
    $<HTMLButtonElement>(w, "#tb-editor .tb-hi-rev").click();
    await tick();
    const alert = $(w, '#tb-editor [role="alert"]');
    expect(alert.textContent).toContain("Too many revisions opened.");
    expect(alert.querySelector("a")?.getAttribute("href")).toBe(
      "https://github.com/o/r/commits/main/chapters/chapter-03.md",
    );
  });
});

describe("the History panel's plain words", () => {
  it("says the platform's stock messages as a reader would, and keeps people's own", () => {
    expect(summary("Edit ¶12 of introduction.md", false)).toBe("Paragraph 12 changed");
    expect(summary("Update introduction.md (#3)", false)).toBe("Text changed");
    expect(summary("Ontology: a new book from request #2", true)).toBe("First published");
    expect(summary("Ontology: a new book from request #2", false)).toBe("Ontology: a new book from request #2");
    expect(summary("Revise introduction for clarity", false)).toBe("Revise introduction for clarity");
    expect(summary("", false)).toBe("Changed (no description given)");
  });
});
