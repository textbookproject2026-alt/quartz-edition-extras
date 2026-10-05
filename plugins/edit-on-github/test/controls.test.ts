/* eslint-disable no-restricted-syntax -- test pages are closed after each test */
import { afterEach, describe, expect, it } from "vitest";
import { Window } from "happy-dom";
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
  opts: Record<string, string | boolean>,
  relativePath = "chapters/chapter-03.md",
  filePath: string | null = "book/" + relativePath,
) => {
  const Component = EditOnGitHub(opts);
  const props = { fileData: { relativePath, filePath } } as unknown as QuartzComponentProps;
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
  $<HTMLInputElement>(w, "#tb-sg-email").value = "reader@example.org";
  $<HTMLTextAreaElement>(w, "#tb-sg-suggestion").value = '"recieve" should be "receive"';
  $<HTMLInputElement>(w, "#tb-sg-website").value = website;
  $<HTMLFormElement>(w, "#tb-suggest-overlay form").requestSubmit();
};

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

  it("keep the class-then-href shape book two's form reads", () => {
    expect(render({ repo: "o/r" })).toMatch(
      /class="edit-on-github" href="https:\/\/github\.com\/[^"]+\/edit\/[^/"]+\/([^"]+\.md)"/,
    );
  });

  it("render nothing for a virtual page, a page with no source file, or no repo", () => {
    expect(render({ repo: "o/r" }, "")).toBe("");
    expect(render({ repo: "o/r" }, "tags/index.md", null)).toBe(""); // a tag listing
    expect(render({ repo: "" })).toBe("");
  });
});

describe("Suggest an edit", () => {
  it("is absent with the default suggestEndpoint", () => {
    expect(render({ repo: "o/r" })).not.toContain("tb-suggest-btn");
  });

  it("is rendered hidden, and shown only once the script arms it", () => {
    const html = render(withSuggest);
    expect(html).toMatch(/<button[^>]*class="tb-suggest-btn"[^>]*hidden/);
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
    expect(w.document.activeElement).toBe(btn);
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
    expect(JSON.parse(posts[0]![1].body)).toEqual({
      name: "A Reader",
      email: "reader@example.org",
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
    expect(html).toContain(">Edit this page</a>");
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

  it("a paragraph edit becomes a paragraph proposal", async () => {
    const sent: unknown[] = [];
    const w = page(rowAndParas(withSuggest), async (_url, init) => {
      const body = (init as { body?: string } | undefined)?.body;
      if (!body) {
        return {
          ok: true,
          status: 200,
          json: async () => ({ content: SOURCE, sha: SHA, branch: "drafts", signIn: false }),
        };
      }
      sent.push(JSON.parse(body));
      return {
        ok: true,
        status: 201,
        json: async () => ({ prUrl: "https://github.com/o/r/pull/1" }),
      };
    });
    $<HTMLButtonElement>(w, "#p2 > button.tb-pedit").click();
    await tick();
    const ta = $<HTMLTextAreaElement>(w, "#tb-editor textarea.tb-ed-text");
    expect(ta.value).toBe("Second paragraph, recieve.");
    ta.value = "Second paragraph, receive.";
    ta.dispatchEvent(new w.Event("input") as never);
    [...w.document.querySelectorAll<HTMLButtonElement>("#tb-editor .tb-ed-primary")]
      .find((b) => b.textContent === "Propose changes…")!
      .click();
    $<HTMLInputElement>(w, "#tb-ed-name").value = "A Reader";
    $<HTMLInputElement>(w, "#tb-ed-email").value = "reader@example.org";
    $<HTMLFormElement>(w, "#tb-editor form").requestSubmit();
    await tick();
    expect(sent[0]).toMatchObject({
      mode: "paragraph",
      path: "chapters/chapter-03.md",
      baseSha: SHA,
      startLine: 4,
      original: "Second paragraph, recieve.",
      replacement: "Second paragraph, receive.",
      paragraph: 2,
      title: "Edit ¶2 of chapter-03.md",
      name: "A Reader",
    });
    expect(w.calls.map((c) => c[0])).toEqual(["page_editor_opened", "page_edit_submitted"]);
  });

  it("the name is optional, and the form says it is public", async () => {
    const sent: unknown[] = [];
    const w = page(rowAndParas(withSuggest), async (_url, init) => {
      const body = (init as { body?: string } | undefined)?.body;
      if (!body) {
        return { ok: true, status: 200, json: async () => ({ content: SOURCE, sha: SHA, branch: "drafts", signIn: false }) };
      }
      sent.push(JSON.parse(body));
      return { ok: true, status: 201, json: async () => ({ prUrl: "https://github.com/o/r/pull/1" }) };
    });
    $<HTMLButtonElement>(w, "#p2 > button.tb-pedit").click();
    await tick();
    const ta = $<HTMLTextAreaElement>(w, "#tb-editor textarea.tb-ed-text");
    ta.value = "Second paragraph, receive.";
    ta.dispatchEvent(new w.Event("input") as never);
    [...w.document.querySelectorAll<HTMLButtonElement>("#tb-editor .tb-ed-primary")]
      .find((b) => b.textContent === "Propose changes…")!
      .click();
    expect($<HTMLElement>(w, "#tb-ed-name-note").textContent).toContain("shown publicly in this page's history");
    expect($<HTMLInputElement>(w, "#tb-ed-name").getAttribute("aria-describedby")).toBe("tb-ed-name-note");
    $<HTMLInputElement>(w, "#tb-ed-email").value = "reader@example.org";
    $<HTMLFormElement>(w, "#tb-editor form").requestSubmit();
    await tick();
    expect(sent[0]).toMatchObject({ mode: "paragraph", name: "", email: "reader@example.org" });
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
      /class="tb-history-link" href="https:\/\/github\.com\/o\/r\/commits\/main\/chapters\/chapter-03\.md"[^>]*>History</,
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
    expect(rows[0]).toContain("Clearer");
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
      .find((b) => b.textContent === "← All revisions")!
      .click();
    expect($(w, "#tb-editor .tb-hi-rev").textContent).toContain("Jo Reader");
    key(w, "Escape");
    expect($(w, "#tb-editor")).toBeNull();
    expect(w.document.activeElement).toBe($(w, "a.tb-history-link"));
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
      "The page moved here from content/chapters/chapter-03.md; its text didn’t change.",
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
