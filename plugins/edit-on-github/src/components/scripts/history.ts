/**
 * The History panel: a page's published revisions, for readers. It borrows the
 * editor's overlay (editor.ts) but dresses as the reader's header: the --tb-*
 * tokens (so light, dark and the book's palette follow), the UI font for
 * controls and the text font for what changed. No repo, file path or branch:
 * readers see the page's title, dates, names and what changed in plain words.
 *
 *   header      Page history › <page title>                              × Close
 *   list        newest first: what changed, when, by whom (the build's list, a static file)
 *   revision    ← All versions · what changed, when, by whom · What changed | The page as it was
 *
 * The list is built into the site by quartz-book (git log --follow on the live
 * branch, at /.well-known/history/<slug>.json). Opening a revision asks the
 * platform function's /api/page-revision, which reads GitHub as the App, so no
 * reader's browser calls GitHub. Changes reuses the editor's diff view; "Page as
 * it was" is GitHub's rendering of the file, sanitised again here as the
 * editor's Preview is.
 *
 * Body-mounted, like the editor: the page itself, its paragraph numbers and its
 * Hypothes.is anchors are never touched. All server text goes in with
 * textContent, except the rendering, which goes through sanitise().
 */
import {
  OVERLAY_ID,
  el,
  injectStyle,
  safeUserMessage,
  sanitise,
} from "./editor";
import { body, renderRichDiff } from "./rich-diff";

type Tracker = (name: string, props?: Record<string, string>) => void;

export interface HistoryOptions {
  /** .../api/page-revision?book=<slug> */
  endpoint: string;
  /** /.well-known/history/<slug>.json */
  listUrl: string;
  /** The page's repo path now: sent to the endpoint, never shown. */
  path: string;
  /** The page's title, for the header and the list's first line. */
  title: string;
  /** GitHub's history for the page: where the panel sends a reader when it can't load. */
  githubHref: string;
  trigger: HTMLElement;
  track: Tracker;
}

interface Revision {
  sha: string;
  date: string;
  who: string;
  reader?: boolean;
  message: string;
  path: string;
}

const STYLE_ID = "tb-history-style";
/** page-revision's cap on one names call. */
const MAX_NAMES = 30;
const FETCH_TIMEOUT = 20000;

const historyStyle = () => {
  if (document.getElementById(STYLE_ID)) return;
  // .tb-hi on the overlay outranks the editor's #tb-editor rules; the editor
  // itself (no .tb-hi) is untouched.
  const H = `#${OVERLAY_ID}.tb-hi`;
  const style = el("style", { id: STYLE_ID });
  style.textContent = `
${H} .tb-hi-top { display: flex; align-items: center; gap: 0.75rem; min-height: var(--tb-header-h, 3.25rem);
  padding: 0.4rem 1.25rem; box-sizing: border-box; border-bottom: 1px solid var(--tb-border, #E6E6E6);
  background: var(--tb-bg, #FFFFFF); font-size: var(--tb-size-controls, 0.85rem); line-height: 1.3; }
${H} .tb-hi-where { display: flex; align-items: baseline; gap: 0.6rem; flex: 1 1 auto; min-width: 0; overflow: hidden; }
${H} .tb-hi-name { flex: none; font-weight: 700; font-size: 1rem; color: var(--tb-ink, #2B2B2B); white-space: nowrap; }
${H} .tb-hi-page { min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--tb-muted, #6E6E73); }
${H} .tb-hi-page::before { content: "›"; margin-right: 0.4rem; color: var(--tb-faint, #9B9BA1); }
${H} .tb-hi-btn { display: inline-flex; align-items: center; gap: 0.35rem; flex: none; min-height: 2.25rem; padding: 0.3rem 0.6rem;
  border: 1px solid transparent; border-radius: 6px; background: none; color: var(--tb-muted, #6E6E73); font-weight: 600; }
${H} .tb-hi-btn:hover { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-ink, #2B2B2B); }
${H} .tb-hi-x { font-size: 1.25rem; line-height: 1; }
${H} .tb-ed-main { padding: 1.5rem 1.25rem 3rem; }
${H} .tb-ed-inner { max-width: 44rem; }
${H} .tb-hi-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }
${H} .tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--tb-border, #E6E6E6); }
${H} .tb-hi-list li { border-bottom: 1px solid var(--tb-border, #E6E6E6); }
${H} .tb-hi-rev { display: block; width: 100%; margin: 0; padding: 0.85rem 0.5rem; border: 0; border-radius: 6px;
  background: none; color: inherit; text-align: left; }
${H} .tb-hi-rev:hover { background: var(--tb-accent-wash, #EEEBFD); }
${H} .tb-hi-rev:hover .tb-hi-msg { color: var(--tb-accent, #7C6CF0); }
${H} .tb-hi-msg { display: block; font-family: var(--tb-font-text, serif); font-size: 1.05rem; font-weight: 600;
  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }
${H} .tb-hi-meta { display: block; margin-top: 0.2rem; color: var(--tb-muted, #6E6E73); font-size: 0.85rem; }
${H} .tb-hi-back { margin: 0 0 1rem -0.6rem; }
${H} .tb-hi-head { margin: 0 0 1.25rem; }
${H} .tb-hi-head h2 { margin: 0 0 0.2rem; font-family: var(--tb-font-text, serif); font-size: 1.35rem; font-weight: 600;
  color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }
${H} .tb-hi-head p { margin: 0; }
${H} .tb-ed-box { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF); }
${H} .tb-ed-bar { background: var(--tb-bg, #FFFFFF); padding: 0 0.5rem; }
${H} [role="tab"] { border: 0; border-bottom: 2px solid transparent; border-radius: 0; margin-bottom: -1px; padding: 0.6rem 0.75rem;
  color: var(--tb-muted, #6E6E73); font-weight: 600; }
${H} [role="tab"][aria-selected="true"] { border-bottom-color: var(--tb-accent, #7C6CF0); background: none; color: var(--tb-ink, #2B2B2B); }
/* What changed (rich-diff.ts): the text as the page shows it, removed and added
   lines and words marked. The colours mix into the page's own background, so
   they hold in dark mode. */
${H} .tb-rd { padding: 0.5rem 0; font-family: var(--tb-font-text, serif); font-size: 1rem; line-height: 1.6;
  color: var(--tb-ink, #2B2B2B); }
${H} .tb-rd-line { display: grid; grid-template-columns: 1.75rem 1fr; padding: 0.1rem 1rem 0.1rem 0; }
${H} .tb-rd-sign { text-align: center; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); user-select: none; }
${H} .tb-rd-text { min-width: 0; overflow-wrap: anywhere; }
${H} .tb-rd-blank { min-height: 0.6rem; padding: 0; }
${H} .tb-rd-h1 .tb-rd-text { font-size: 1.5rem; font-weight: 700; line-height: 1.3; }
${H} .tb-rd-h2 .tb-rd-text { font-size: 1.3rem; font-weight: 700; line-height: 1.3; }
${H} .tb-rd-h3 .tb-rd-text { font-size: 1.15rem; font-weight: 700; }
${H} :is(.tb-rd-h4, .tb-rd-h5, .tb-rd-h6) .tb-rd-text { font-weight: 700; }
${H} :is(.tb-rd-li, .tb-rd-note) .tb-rd-text { padding-left: 1.4rem; text-indent: -1.4rem; }
${H} .tb-rd-marker { display: inline-block; min-width: 1.4rem; text-indent: 0; color: var(--tb-muted, #6E6E73); }
${H} .tb-rd-note { font-size: 0.9rem; }
${H} .tb-rd-quote .tb-rd-text { padding-left: 0.8rem; border-left: 3px solid var(--tb-border, #E6E6E6); font-style: italic; }
${H} .tb-rd-rule .tb-rd-text { align-self: center; border-top: 1px solid var(--tb-border, #E6E6E6); }
${H} .tb-rd-link { color: var(--tb-accent, #7C6CF0); }
${H} .tb-rd code { font-family: var(--tb-font-mono, monospace); font-size: 0.88em; }
${H} .tb-rd-gap { padding: 0.3rem 0; text-align: center; color: var(--tb-faint, #9B9BA1); font-family: var(--tb-font-ui, sans-serif); }
${H} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }
${H} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }
${H} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: line-through; border-radius: 2px; }
${H} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: none; border-radius: 2px; }
${H} .tb-ed-preview { font-family: var(--tb-font-text, serif); }
${H} .tb-hi-gh { color: var(--tb-accent, #7C6CF0); font-weight: 600; }
@media (max-width: 768px) {
  ${H} .tb-hi-top { padding-left: 0.75rem; padding-right: 0.75rem; }
  ${H} .tb-ed-main { padding: 1rem 0.75rem 2rem; }
  ${H} .tb-hi-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
}
`;
  document.head.append(style);
};

/**
 * What changed, in plain words. Commit messages written by people stay as they
 * are; the platform's own stock messages ("Update introduction.md", "Edit ¶12 of
 * introduction.md", a new book's first commit) are said as a reader would.
 */
export const summary = (message: string, first: boolean): string => {
  const m = message.replace(/\s*\(#\d+\)\s*$/, "").trim();
  const para = /^Edit ¶(\d+) of \S+$/.exec(m);
  if (para) return `Paragraph ${para[1]} changed`;
  if (/^(Update|Edit) \S+\.md$/i.test(m)) return "Text changed";
  if (/^(Create|Add) \S+\.md$/i.test(m) || (first && /a new book from request/i.test(m)))
    return "First published";
  return m || (first ? "First published" : "Changed (no description given)");
};

/** "3 September 2026": the reader's own locale, the author's date. */
const when = (iso: string): string => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
};

const getJson = async (url: string, signal: AbortSignal): Promise<unknown> => {
  const res = await fetch(url, { signal, headers: { Accept: "application/json" } });
  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    /* not JSON: the status says enough */
  }
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`) as Error & { userMessage?: string | null };
    err.userMessage = safeUserMessage(data);
    throw err;
  }
  return data;
};

let closeCurrent: (() => void) | null = null;
export const closeIfOpen = () => closeCurrent?.();

export const openHistory = (o: HistoryOptions) => {
  if (closeCurrent || document.getElementById(OVERLAY_ID)) return;
  injectStyle();
  historyStyle();

  const previousOverflow = document.body.style.overflow;
  let controller: AbortController | null = null;
  let listScroll = 0;
  /** Names anonymous proposals gave: asked for in one call when the list opens. */
  const names = new Map<string, string>();

  const overlay = el("div", {
    id: OVERLAY_ID,
    class: "tb-hi",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "tb-hi-title",
    tabindex: -1,
  });
  const where = el(
    "div",
    { class: "tb-hi-where", id: "tb-hi-title" },
    el("span", { class: "tb-hi-name", text: "Page history" }),
    o.title ? el("span", { class: "tb-hi-page", text: o.title }) : null,
  );
  const xBtn = el(
    "button",
    { type: "button", class: "tb-hi-btn", "aria-label": "Close the history" },
    el("span", { class: "tb-hi-x", "aria-hidden": "true", text: "×" }),
    el("span", { class: "tb-hi-label", "aria-hidden": "true", text: "Close" }),
  );
  const main = el("div", { class: "tb-ed-main" });
  const inner = el("div", { class: "tb-ed-inner" });
  main.append(inner);
  overlay.append(el("div", { class: "tb-hi-top" }, where, xBtn), main);

  const status = (text: string) => el("p", { class: "tb-ed-muted", role: "status", text });
  const failure = (err: unknown, fallback: string) => {
    const box = el("div", { class: "tb-ed-note", role: "alert" });
    box.append(
      el("span", { text: `${(err as { userMessage?: string | null })?.userMessage || fallback} ` }),
      el("a", {
        class: "tb-hi-gh",
        href: o.githubHref,
        target: "_blank",
        rel: "noopener noreferrer",
        text: "See the history on GitHub ↗",
      }),
    );
    return box;
  };
  const fresh = () => {
    controller?.abort();
    const c = new AbortController();
    controller = c;
    const timer = setTimeout(() => c.abort(), FETCH_TIMEOUT);
    return { signal: c.signal, done: () => clearTimeout(timer), current: () => controller === c };
  };
  const whoOf = (r: Revision) => (r.reader && names.get(r.sha)) || r.who;
  const meta = (r: Revision) => `Published ${when(r.date)}, by ${whoOf(r)}`;
  const what = (i: number) => summary(revisions![i]!.message || "", i === revisions!.length - 1);

  let revisions: Revision[] | null = null;

  /**
   * The list says "a reader" for anonymous proposals whose commits predate the
   * Proposed-by trailer (the build has no GitHub access). One call asks for all
   * their names; without it, or without scripts, "a reader" stands.
   */
  const askNames = () => {
    const shas = [...new Set((revisions ?? []).filter((r) => r.reader).map((r) => r.sha))].slice(
      0,
      MAX_NAMES,
    );
    if (!shas.length) return;
    const url = new URL(o.endpoint, location.href);
    url.searchParams.set("shas", shas.join(","));
    const c = new AbortController();
    const timer = setTimeout(() => c.abort(), FETCH_TIMEOUT);
    getJson(url.toString(), c.signal)
      .then((data) => {
        const got = (data as { names?: Record<string, unknown> } | null)?.names ?? {};
        for (const [sha, name] of Object.entries(got))
          if (typeof name === "string" && name.trim()) names.set(sha, name.trim().slice(0, 80));
        const metas = inner.querySelectorAll<HTMLElement>(".tb-hi-list .tb-hi-meta");
        revisions?.forEach((r, i) => {
          if (metas[i]) metas[i]!.textContent = meta(r);
        });
      })
      .catch(() => {
        /* "a reader" stands */
      })
      .finally(() => clearTimeout(timer));
  };

  const showList = () => {
    inner.textContent = "";
    if (!revisions) return;
    if (!revisions.length) {
      inner.append(status("This page has no published revisions yet."));
      return;
    }
    const n = revisions.length;
    inner.append(
      el("p", {
        class: "tb-hi-intro",
        text: `${n === 1 ? "One published version" : `${n} published versions`} of ${o.title ? `“${o.title}”` : "this page"}, newest first. Open one to see what changed.`,
      }),
    );
    const list = el("ol", { class: "tb-hi-list" });
    revisions.forEach((r, i) => {
      const b = el(
        "button",
        { type: "button", class: "tb-hi-rev" },
        el("span", { class: "tb-hi-msg", text: what(i) }),
        el("span", { class: "tb-hi-meta", text: meta(r) }),
      );
      b.addEventListener("click", () => {
        listScroll = main.scrollTop;
        showRevision(i);
      });
      list.append(el("li", {}, b));
    });
    inner.append(list);
    main.scrollTop = listScroll;
  };

  const showRevision = (i: number) => {
    const r = revisions![i]!;
    inner.textContent = "";
    const back = el("button", {
      type: "button",
      class: "tb-hi-btn tb-hi-back",
      text: "← All versions",
    });
    back.addEventListener("click", () => {
      controller?.abort();
      showList();
      (inner.querySelectorAll<HTMLButtonElement>(".tb-hi-rev")[i] ?? xBtn).focus();
    });
    const metaLine = el("p", { class: "tb-ed-muted", text: meta(r) });
    const heading = el(
      "div",
      { class: "tb-hi-head" },
      el("h2", { text: what(i) }),
      metaLine,
    );
    const loading = status("Loading this revision…");
    inner.append(back, heading, loading);
    main.scrollTop = 0;
    back.focus();
    o.track("page_revision_opened");

    const req = fresh();
    const url = new URL(o.endpoint, location.href);
    url.searchParams.set("sha", r.sha);
    url.searchParams.set("path", r.path);
    getJson(url.toString(), req.signal)
      .then((data) => {
        if (!req.current()) return;
        const d = data as {
          before?: unknown;
          after?: unknown;
          html?: unknown;
          proposer?: unknown;
          status?: unknown;
          previousPath?: unknown;
        };
        if (r.reader && typeof d.proposer === "string" && d.proposer.trim()) {
          names.set(r.sha, d.proposer.trim().slice(0, 80));
          metaLine.textContent = meta(r);
        }
        const before = typeof d.before === "string" ? d.before : "";
        const after = typeof d.after === "string" ? d.after : "";
        const tabNames = ["What changed", "The page as it was"];
        const tablist = el("div", { role: "tablist", "aria-label": "Revision view" });
        const tabs = tabNames.map((name, k) =>
          el("button", {
            type: "button",
            role: "tab",
            id: `tb-hi-tab-${k}`,
            "aria-controls": `tb-hi-panel-${k}`,
            "aria-selected": k === 0 ? "true" : "false",
            tabindex: k === 0 ? 0 : -1,
            text: name,
          }),
        );
        tablist.append(...tabs);
        const changes = el("div", {
          role: "tabpanel",
          id: "tb-hi-panel-0",
          "aria-labelledby": "tb-hi-tab-0",
          tabindex: 0,
        });
        if (d.status === "added")
          changes.append(
            el("p", {
              class: "tb-ed-panel tb-ed-muted",
              text: "This is the page’s first published version.",
            }),
          );
        const moved =
          typeof d.previousPath === "string" && d.previousPath !== r.path ? d.previousPath : "";
        if (moved)
          changes.append(
            el("p", {
              class: "tb-ed-panel tb-ed-muted",
              text: `The page moved to where it is now${body(before) === body(after) ? "; its text didn’t change." : "."}`,
            }),
          );
        if (!moved || body(before) !== body(after)) changes.append(renderRichDiff(before, after));
        const page = el("div", {
          role: "tabpanel",
          id: "tb-hi-panel-1",
          "aria-labelledby": "tb-hi-tab-1",
          tabindex: 0,
          hidden: true,
          class: "tb-ed-panel tb-ed-preview",
        });
        if (typeof d.html === "string" && d.html) page.append(sanitise(d.html));
        else
          page.append(
            el("p", { class: "tb-ed-muted", text: "The page was taken down in this version." }),
          );
        const panels = [changes, page];
        const select = (k: number) =>
          tabs.forEach((t, j) => {
            t.setAttribute("aria-selected", j === k ? "true" : "false");
            t.tabIndex = j === k ? 0 : -1;
            panels[j]!.hidden = j !== k;
          });
        tabs.forEach((t, k) => {
          t.addEventListener("click", () => select(k));
          t.addEventListener("keydown", (e) => {
            const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
            if (!dir) return;
            e.preventDefault();
            const n = (k + dir + tabs.length) % tabs.length;
            select(n);
            tabs[n]!.focus();
          });
        });
        loading.replaceWith(
          el("div", { class: "tb-ed-box" }, el("div", { class: "tb-ed-bar" }, tablist), ...panels),
        );
      })
      .catch((err) => {
        if (!req.current()) return;
        loading.replaceWith(
          failure(err, "This version couldn’t be loaded just now. Please try again in a moment."),
        );
      })
      .finally(req.done);
  };

  // --- closing ---
  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== "Tab") return;
    const items = Array.from(
      overlay.querySelectorAll<HTMLElement>("a[href], button, [tabindex]"),
    ).filter(
      (n) => !(n as HTMLButtonElement).disabled && n.tabIndex >= 0 && !n.closest("[hidden]"),
    );
    if (!items.length) return;
    const idx = items.indexOf(document.activeElement as HTMLElement);
    if (e.shiftKey ? idx <= 0 : idx === -1 || idx === items.length - 1) {
      e.preventDefault();
      items[e.shiftKey ? items.length - 1 : 0]!.focus();
    }
  };
  const close = () => {
    closeCurrent = null;
    controller?.abort();
    document.removeEventListener("keydown", onKeydown, true);
    overlay.remove();
    document.body.style.overflow = previousOverflow;
    if (o.trigger.isConnected) o.trigger.focus();
  };
  xBtn.addEventListener("click", close);
  document.addEventListener("keydown", onKeydown, true);
  closeCurrent = close;

  document.body.style.overflow = "hidden";
  document.body.append(overlay);
  xBtn.focus();
  o.track("page_history_opened");

  inner.append(status("Loading this page’s history…"));
  const req = fresh();
  getJson(o.listUrl, req.signal)
    .then((data) => {
      if (!req.current()) return;
      revisions = (Array.isArray(data) ? data : []).filter(
        (r): r is Revision =>
          !!r &&
          typeof (r as Revision).sha === "string" &&
          typeof (r as Revision).path === "string",
      );
      showList();
      askNames();
    })
    .catch((err) => {
      if (!req.current()) return;
      inner.textContent = "";
      inner.append(failure(err, "This page’s history couldn’t be loaded just now."));
    })
    .finally(req.done);
};
