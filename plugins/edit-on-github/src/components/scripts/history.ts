/**
 * The History panel: a page's version history, for readers, in three plain
 * states (batch 2a): Being edited (what is proposed, then what is accepted on
 * drafts) above Published (newest first, the book's releases as milestones). It
 * borrows the editor's overlay (editor.ts) but dresses as the reader's header:
 * the --tb-* tokens, the UI font for controls and the text font for what changed.
 * No repo, file path or branch: readers see the page's title, dates, names, roles
 * and what changed in plain words.
 *
 *   header      Page history › <page title>                              × Close
 *   timeline    Being edited · Published, each version with Show changes, Read this version, Compare
 *   view        ← Page history · a banner · the version as it was, or two versions compared
 *
 * The versions come from quartz-book's /.well-known/history.json (built with the
 * site; a site built before it has /.well-known/history/<slug>.json, published
 * versions only). What is proposed, each diff and each version as it was come
 * from the platform function (/api/history, /api/page-revision), which reads
 * GitHub as the App, so no reader's browser calls GitHub.
 *
 * Body-mounted, like the editor: the page itself, its paragraph numbers and its
 * Hypothes.is anchors are never touched. All server text goes in with
 * textContent, except the rendering, which goes through sanitise().
 */
import { OVERLAY_ID, el, injectStyle, safeUserMessage, sanitise } from "./editor";
import { body, renderRichDiff } from "./rich-diff";
import { declinedCss, declinedDetails, declinedKind } from "./declined";
import { roleBadge } from "./roles";
import {
  historyApi,
  openKind,
  openRole,
  readBookHistory,
  readDeclined,
  releaseLabel,
  withReleases,
} from "./timeline";
import type { DeclinedItem, Entry, OpenItem, PageHistory } from "./timeline";

type Tracker = (name: string, props?: Record<string, string>) => void;

export interface HistoryOptions {
  /** .../api/page-revision?book=<slug> */
  endpoint: string;
  /** /.well-known/history/<slug>.json: the page's published versions alone (a build before history.json). */
  listUrl: string;
  /** /.well-known/history.json: the book's version history (quartz-book, batch 2a). */
  bookHistoryUrl?: string;
  /** The page's repo path now: sent to the endpoint, never shown. */
  path: string;
  /** The page's title, for the header and the list's first line. */
  title: string;
  /** GitHub's history for the page: where the panel sends a reader when it can't load. */
  githubHref: string;
  trigger: HTMLElement;
  track: Tracker;
}

const STYLE_ID = "tb-history-style";
/** page-revision's cap on one names call. */
const MAX_NAMES = 30;
const FETCH_TIMEOUT = 20000;
const A_READER = "a reader";

/**
 * What changed (rich-diff.ts), and the timeline's action buttons and diff box,
 * scoped by `S`: the panel's overlay, or the book's /history page (batch 2c, a
 * declined proposal's Show changes there).
 */
export const diffCss = (S: string) => `
/* What changed (rich-diff.ts): the text as the page shows it, removed and added
   lines and words marked. The colours mix into the page's own background, so
   they hold in dark mode. */
${S} .tb-rd { padding: 0.5rem 0; font-family: var(--tb-font-text, serif); font-size: 1rem; line-height: 1.6;
  color: var(--tb-ink, #2B2B2B); }
${S} .tb-rd-line { display: grid; grid-template-columns: 1.75rem 1fr; padding: 0.1rem 1rem 0.1rem 0; }
${S} .tb-rd-sign { text-align: center; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); user-select: none; }
${S} .tb-rd-text { min-width: 0; overflow-wrap: anywhere; }
${S} .tb-rd-blank { min-height: 0.6rem; padding: 0; }
${S} .tb-rd-h1 .tb-rd-text { font-size: 1.5rem; font-weight: 700; line-height: 1.3; }
${S} .tb-rd-h2 .tb-rd-text { font-size: 1.3rem; font-weight: 700; line-height: 1.3; }
${S} .tb-rd-h3 .tb-rd-text { font-size: 1.15rem; font-weight: 700; }
${S} :is(.tb-rd-h4, .tb-rd-h5, .tb-rd-h6) .tb-rd-text { font-weight: 700; }
${S} :is(.tb-rd-li, .tb-rd-note) .tb-rd-text { padding-left: 1.4rem; text-indent: -1.4rem; }
${S} .tb-rd-marker { display: inline-block; min-width: 1.4rem; text-indent: 0; color: var(--tb-muted, #6E6E73); }
${S} .tb-rd-note { font-size: 0.9rem; }
${S} .tb-rd-quote .tb-rd-text { padding-left: 0.8rem; border-left: 3px solid var(--tb-border, #E6E6E6); font-style: italic; }
${S} .tb-rd-rule .tb-rd-text { align-self: center; border-top: 1px solid var(--tb-border, #E6E6E6); }
${S} .tb-rd-link { color: var(--tb-accent, #7C6CF0); }
${S} .tb-rd code { font-family: var(--tb-font-mono, monospace); font-size: 0.88em; }
${S} .tb-rd-gap { padding: 0.3rem 0; text-align: center; color: var(--tb-muted, #6E6E73); font-family: var(--tb-font-ui, sans-serif); }
${S} .tb-ed-del { background: color-mix(in srgb, #D1242F 12%, var(--tb-bg, #FFFFFF)); }
${S} .tb-ed-add { background: color-mix(in srgb, #1A7F37 12%, var(--tb-bg, #FFFFFF)); }
${S} .tb-ed-del del { background: color-mix(in srgb, #D1242F 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: line-through; border-radius: 2px; }
${S} .tb-ed-add ins { background: color-mix(in srgb, #1A7F37 32%, var(--tb-bg, #FFFFFF)); color: inherit; text-decoration: none; border-radius: 2px; }
${S} .tb-hi-actions { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.45rem; }
${S} .tb-hi-actions button, ${S} .tb-hi-actions a { min-height: 2rem; padding: 0.2rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6);
  border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font: inherit; font-size: 0.85rem; font-weight: 600;
  text-decoration: none; cursor: pointer; }
${S} .tb-hi-actions button[aria-pressed="true"] { border-color: var(--tb-accent, #7C6CF0); color: var(--tb-accent, #7C6CF0); }
${S} .tb-hi-diff { margin-top: 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; }
`;

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
${diffCss(H)}
${declinedCss(H)}
${H} .tb-ed-preview { font-family: var(--tb-font-text, serif); }
${H} .tb-hi-gh { color: var(--tb-accent, #7C6CF0); font-weight: 600; }
/* The timeline (batch 2a): bands for what is being edited and what is published,
   releases as milestones, each version with its actions. One column at any width;
   diffs wrap. */
${H} .tb-hi-band { margin: 0 0 1.75rem; }
${H} .tb-hi-band h2 { margin: 0 0 0.25rem; font-family: var(--tb-font-ui, sans-serif); font-size: 1.05rem; font-weight: 700; color: var(--tb-ink, #2B2B2B); }
${H} .tb-hi-band > p { margin: 0 0 0.6rem; color: var(--tb-muted, #6E6E73); font-size: 0.9rem; }
${H} .tb-hi-band.tb-hi-editing { padding: 0.75rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 10px;
  background: var(--tb-bg-soft, #F7F7F5); }
${H} .tb-hi-entry { padding: 0.75rem 0.25rem; border-bottom: 1px solid var(--tb-border, #E6E6E6); }
${H} .tb-hi-entry:last-child { border-bottom: 0; }
${H} .tb-hi-state { display: inline-block; margin-right: 0.4rem; padding: 0 0.4rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.02em; text-transform: uppercase; color: var(--tb-muted, #6E6E73); border: 1px solid var(--tb-border, #E6E6E6); }
${H} .tb-hi-release { display: flex; align-items: center; gap: 0.6rem; margin: 0.9rem 0; color: var(--tb-accent, #7C6CF0);
  font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; font-weight: 700; list-style: none; }
${H} .tb-hi-release::before, ${H} .tb-hi-release::after { content: ""; flex: 1 1 auto; border-top: 2px solid currentColor; opacity: 0.35; }
${H} .tb-hi-banner { margin: 0 0 1rem; padding: 0.6rem 0.8rem; border-left: 4px solid var(--tb-accent, #7C6CF0); border-radius: 4px;
  background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-ink, #2B2B2B); font-weight: 600; }
${H} .tb-hi-picking { margin: 0 0 1rem; padding: 0.6rem 0.8rem; border: 1px dashed var(--tb-accent, #7C6CF0); border-radius: 8px; }
${H} ol.tb-hi-list { list-style: none; margin: 0; padding: 0; border-top: 0; }
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
export const when = (iso: string): string => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
        // history.json's dates are days: as UTC midnight, they'd show the day before west of UTC.
        ...(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? { timeZone: "UTC" } : {}),
      });
};

export const getJson = async (url: string, signal: AbortSignal): Promise<unknown> => {
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

  // The page's history: its published versions, what is being edited, the releases.
  let page: PageHistory | null = null;
  let releases: { tag: string; date: string }[] = [];
  let proposed: OpenItem[] = [];
  /** What the authors declined on this page: the function's answer, else the build's copy. */
  let declined: DeclinedItem[] = [];
  let picking: Entry | null = null; // Compare: the first version picked

  const revUrl = (params: Record<string, string>) => {
    const url = new URL(o.endpoint, location.href);
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
    return url.toString();
  };
  const pathOf = (e: Entry) => e.path ?? page?.source ?? o.path;
  const newest = () => page?.published[0] ?? null;

  /** "9 October 2026 · Ann Author [Author] · #7": who, in what role, and where it came from. */
  const metaLine = (
    e: { date: string; who: string; role: string | null; pr?: number },
    state?: string,
  ) => {
    const p = el("p", { class: "tb-hi-meta" });
    if (state) p.append(el("span", { class: "tb-hi-state", text: state }));
    p.append(`${when(e.date)} · ${e.who}`);
    const badge = roleBadge(e.role);
    if (badge) p.append(" ", badge);
    if (e.pr && o.githubHref)
      p.append(
        " · ",
        el("a", {
          href: o.githubHref.replace(/\/commits\/.*$/, `/pull/${e.pr}`),
          target: "_blank",
          rel: "noopener noreferrer",
          text: `#${e.pr}`,
        }),
      );
    return p;
  };

  /** Show changes, inline under the version: its diff against the version before it. */
  const showChanges = (e: Entry, slot: HTMLElement, button: HTMLButtonElement) => {
    if (!slot.hidden) {
      slot.hidden = true;
      button.setAttribute("aria-pressed", "false");
      return;
    }
    button.setAttribute("aria-pressed", "true");
    slot.hidden = false;
    slot.textContent = "";
    slot.append(status("Loading what changed…"));
    o.track("page_revision_opened");
    const c = new AbortController();
    const timer = setTimeout(() => c.abort(), FETCH_TIMEOUT);
    getJson(revUrl({ sha: e.sha, path: pathOf(e) }), c.signal)
      .then((data) => {
        const d = data as {
          before?: unknown;
          after?: unknown;
          status?: unknown;
          previousPath?: unknown;
        };
        const before = typeof d.before === "string" ? d.before : "";
        const after = typeof d.after === "string" ? d.after : "";
        slot.textContent = "";
        if (d.status === "added")
          slot.append(
            el("p", {
              class: "tb-ed-panel tb-ed-muted",
              text: "This is the page’s first published version.",
            }),
          );
        const moved = typeof d.previousPath === "string" && d.previousPath !== pathOf(e);
        if (moved)
          slot.append(
            el("p", {
              class: "tb-ed-panel tb-ed-muted",
              text: `The page moved to where it is now${body(before) === body(after) ? "; its text didn’t change." : "."}`,
            }),
          );
        if (!moved || body(before) !== body(after)) slot.append(renderRichDiff(before, after));
      })
      .catch((err) => {
        slot.textContent = "";
        slot.append(failure(err, "What changed couldn’t be loaded just now."));
      })
      .finally(() => clearTimeout(timer));
  };

  /** A view in place of the timeline, with ← back to it. */
  const view = (title: string, banner: string) => {
    listScroll = main.scrollTop;
    inner.textContent = "";
    const back = el("button", {
      type: "button",
      class: "tb-hi-btn tb-hi-back",
      text: "← Page history",
    });
    back.addEventListener("click", () => {
      controller?.abort();
      showTimeline();
    });
    const box = el("div", {});
    inner.append(
      back,
      el("div", { class: "tb-hi-banner", role: "status", text: banner }),
      el("div", { class: "tb-hi-head" }, el("h2", { text: title })),
      box,
    );
    main.scrollTop = 0;
    back.focus();
    return box;
  };

  /** Read this version: the page as it was, with a clear banner. */
  const readVersion = (e: Entry) => {
    const box = view(e.summary, `You are reading the version of ${when(e.date)}.`);
    box.append(status("Loading this version…"));
    o.track("page_version_read");
    const req = fresh();
    getJson(revUrl({ sha: e.sha, path: pathOf(e) }), req.signal)
      .then((data) => {
        if (!req.current()) return;
        const html = (data as { html?: unknown }).html;
        box.textContent = "";
        box.append(
          typeof html === "string" && html
            ? el("div", { class: "tb-ed-panel tb-ed-preview" }, sanitise(html))
            : el("p", { class: "tb-ed-muted", text: "The page was taken down in this version." }),
        );
      })
      .catch((err) => {
        if (!req.current()) return;
        box.textContent = "";
        box.append(failure(err, "This version couldn’t be loaded just now."));
      })
      .finally(req.done);
  };

  /** Compare two versions: the older on the left of the diff, the newer after it. */
  const compare = (a: Entry, b: Entry) => {
    const [older, newer] = a.date <= b.date ? [a, b] : [b, a];
    const label = (v: Entry) =>
      `the version of ${when(v.date)}${v === newest() ? " (the one you read now)" : ""}`;
    const box = view("Compare versions", `Changes from ${label(older)} to ${label(newer)}.`);
    box.append(status("Loading the two versions…"));
    o.track("page_versions_compared");
    const req = fresh();
    getJson(revUrl({ sha: newer.sha, base: older.sha, path: pathOf(newer) }), req.signal)
      .then((data) => {
        if (!req.current()) return;
        const d = data as { before?: unknown; after?: unknown };
        box.textContent = "";
        box.append(
          el(
            "div",
            { class: "tb-hi-diff" },
            renderRichDiff(
              typeof d.before === "string" ? d.before : "",
              typeof d.after === "string" ? d.after : "",
            ),
          ),
        );
      })
      .catch((err) => {
        if (!req.current()) return;
        box.textContent = "";
        box.append(failure(err, "The versions couldn’t be compared just now."));
      })
      .finally(req.done);
  };

  /** One version in the timeline, with Show changes, Read this version and Compare. */
  const entryItem = (e: Entry, state: string | undefined) => {
    const li = el("li", { class: "tb-hi-entry" });
    const slot = el("div", { class: "tb-hi-diff", hidden: true });
    const show = el("button", { type: "button", "aria-pressed": "false", text: "Show changes" });
    show.addEventListener("click", () => showChanges(e, slot, show));
    const read = el("button", { type: "button", text: "Read this version" });
    read.addEventListener("click", () => readVersion(e));
    const cmp = el("button", {
      type: "button",
      text: picking ? (picking === e ? "Cancel compare" : "Compare with this") : "Compare…",
    });
    cmp.addEventListener("click", () => {
      if (!picking) {
        picking = e;
        showTimeline();
      } else if (picking === e) {
        picking = null;
        showTimeline();
      } else {
        const first = picking;
        picking = null;
        compare(first, e);
      }
    });
    const actions = el("div", { class: "tb-hi-actions" }, show, read, cmp);
    const now = newest();
    if (!picking && now && now.sha !== e.sha) {
      const withNow = el("button", { type: "button", text: "Compare with now" });
      withNow.addEventListener("click", () => compare(e, now));
      actions.append(withNow);
    }
    li.append(el("p", { class: "tb-hi-msg", text: e.summary }), metaLine(e, state), actions, slot);
    return li;
  };

  const openItem = (it: OpenItem) => {
    const li = el("li", { class: "tb-hi-entry" });
    li.append(
      el("p", { class: "tb-hi-msg", text: it.summary || openKind(it) }),
      metaLine(
        {
          date: it.date,
          who: it.who?.name ?? "A reader",
          role: openRole(it, [...(page?.published ?? []), ...(page?.drafts ?? [])]),
        },
        `Proposed · ${openKind(it)}`,
      ),
      el(
        "div",
        { class: "tb-hi-actions" },
        el("a", {
          href: it.url,
          target: "_blank",
          rel: "noopener noreferrer",
          text: `See #${it.number} on GitHub ↗`,
        }),
      ),
    );
    return li;
  };

  /** A declined proposal, note or suggestion (batch 2c), at the date it was declined. */
  const declinedEntry = (d: DeclinedItem) =>
    el(
      "li",
      { class: "tb-hi-entry tb-hi-declined-entry" },
      el("p", { class: "tb-hi-msg", text: d.summary || declinedKind(d) }),
      el(
        "p",
        { class: "tb-hi-meta" },
        el("span", { class: "tb-hi-state tb-hi-declined", text: "Declined" }),
        `${declinedKind(d).replace(/^Declined /, "")} · ${when(d.date)}`,
      ),
      declinedDetails(d, o.endpoint),
    );

  const showTimeline = () => {
    inner.textContent = "";
    if (!page) return;
    if (picking)
      inner.append(
        el("p", {
          class: "tb-hi-picking",
          role: "status",
          text: `Comparing the version of ${when(picking.date)}: pick the other version, below.`,
        }),
      );
    // Being edited: what is proposed, then what is accepted but not yet published.
    if (proposed.length || page.drafts.length) {
      const list = el("ol", { class: "tb-hi-list" });
      for (const it of proposed) list.append(openItem(it));
      for (const e of page.drafts) list.append(entryItem(e, "Being edited"));
      inner.append(
        el(
          "section",
          { class: "tb-hi-band tb-hi-editing", "aria-labelledby": "tb-hi-editing" },
          el("h2", { id: "tb-hi-editing", text: "Being edited" }),
          el("p", {
            text: "Proposals and notes waiting for the authors, and changes they have accepted that readers will see when the book is next published.",
          }),
          list,
        ),
      );
    }
    const list = el("ol", { class: "tb-hi-list" });
    // Declined items fall where they were declined, among the published versions.
    const pending = [...declined].sort((a, b) => b.date.localeCompare(a.date));
    for (const row of withReleases(page.published, releases)) {
      const at = "release" in row ? row.release.date : row.entry.date;
      while (pending.length && pending[0]!.date > at) list.append(declinedEntry(pending.shift()!));
      if ("release" in row)
        list.append(
          el("li", {
            class: "tb-hi-release",
            role: "separator",
            "aria-label": `${releaseLabel(row.release.tag)}, ${when(row.release.date)}`,
            text: `${releaseLabel(row.release.tag)} · ${when(row.release.date)}`,
          }),
        );
      else list.append(entryItem(row.entry, undefined));
    }
    for (const d of pending) list.append(declinedEntry(d));
    inner.append(
      el(
        "section",
        { class: "tb-hi-band", "aria-labelledby": "tb-hi-published" },
        el("h2", {
          id: "tb-hi-published",
          text: declined.length ? "Published and declined" : "Published",
        }),
        el("p", {
          text: page.published.length
            ? declined.length
              ? "What readers have seen, and what the authors declined and why, newest first."
              : "What readers have seen, newest first."
            : declined.length
              ? "This page has no published versions yet. What the authors declined, and why:"
              : "This page has no published versions yet.",
        }),
        list,
      ),
    );
    main.scrollTop = listScroll;
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
  // The book's history (built with the site); a site built before it has the
  // page's published list alone. What is proposed comes from the function, and
  // its absence never stops the rest.
  const fromBook = o.bookHistoryUrl
    ? getJson(o.bookHistoryUrl, req.signal).then((data) => {
        const h = readBookHistory(data);
        const found = h?.pages.find((p) => p.source === o.path) ?? null;
        if (h) releases = h.releases;
        if (h && !declined.length)
          declined = readDeclined(h.declined).filter((d) => d.files?.includes(o.path));
        return found;
      })
    : Promise.resolve(null);
  const api = historyApi(o.endpoint, o.path, { declined: "1" });
  const open = api
    ? getJson(api, req.signal)
        .then((data) => {
          declined = readDeclined((data as { declined?: unknown })?.declined);
          return ((data as { items?: OpenItem[] })?.items ?? []).filter(
            (i) => i && typeof i.url === "string",
          );
        })
        .catch(() => [] as OpenItem[])
    : Promise.resolve([] as OpenItem[]);
  fromBook
    .catch(() => null)
    .then(async (found) => {
      if (found) return found;
      // Before history.json: the page's published revisions.
      const list = (await getJson(o.listUrl, req.signal)) as {
        sha: string;
        date: string;
        who: string;
        message: string;
        path: string;
      }[];
      return {
        path: "",
        source: o.path,
        title: o.title,
        published: (Array.isArray(list) ? list : []).map((r, i, all) => ({
          sha: r.sha,
          date: r.date,
          who: r.who,
          role: null,
          summary: summary(r.message ?? "", i === all.length - 1),
          ...(r.path !== o.path ? { path: r.path } : {}),
        })),
        drafts: [],
        releases: {},
      } satisfies PageHistory;
    })
    .then(async (found) => {
      page = found;
      // "a reader": anonymous proposals whose commits predate the Proposed-by
      // trailer (the build has no GitHub access). One call asks for all their
      // names; without it, "a reader" stands.
      const all = [...found.published, ...found.drafts];
      const shas = [...new Set(all.filter((e) => e.who === A_READER).map((e) => e.sha))].slice(
        0,
        MAX_NAMES,
      );
      const names = shas.length
        ? getJson(revUrl({ shas: shas.join(",") }), req.signal)
            .then((d) => (d as { names?: Record<string, unknown> } | null)?.names ?? {})
            .catch(() => ({}) as Record<string, unknown>)
        : Promise.resolve({} as Record<string, unknown>);
      const [got, items] = await Promise.all([names, open]);
      for (const e of all) {
        const name = got[e.sha];
        if (e.who === A_READER && typeof name === "string" && name.trim())
          e.who = name.trim().slice(0, 80);
      }
      proposed = items;
      if (!req.current()) return;
      showTimeline();
    })
    .catch((err) => {
      if (!req.current()) return;
      inner.textContent = "";
      inner.append(failure(err, "This page’s history couldn’t be loaded just now."));
    })
    .finally(req.done);
};
