/**
 * The History panel: a page's published revisions, in the editor's overlay and
 * styling (editor.ts), for readers.
 *
 *   header      History · repo / folder / file.md  [live branch]               ×
 *   list        newest first: message, who, when (the build's list, a static file)
 *   revision    ← All revisions · message, who, when · Changes | Page as it was
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
  BRANCH,
  FILE,
  OVERLAY_ID,
  el,
  icon,
  injectStyle,
  renderDiff,
  safeUserMessage,
  sanitise,
} from "./editor";

type Tracker = (name: string, props?: Record<string, string>) => void;

export interface HistoryOptions {
  /** .../api/page-revision?book=<slug> */
  endpoint: string;
  /** /.well-known/history/<slug>.json */
  listUrl: string;
  /** The page's repo path now. */
  path: string;
  /** "owner/repo", for the breadcrumb. */
  repo: string;
  branch: string;
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
const FETCH_TIMEOUT = 20000;

const historyStyle = () => {
  if (document.getElementById(STYLE_ID)) return;
  const O = `#${OVERLAY_ID}`;
  const style = el("style", { id: STYLE_ID });
  style.textContent = `
${O} .tb-hi-list { list-style: none; margin: 0; padding: 0; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;
  overflow: hidden; background: var(--tb-bg, #FFFFFF); }
${O} .tb-hi-list li + li { border-top: 1px solid var(--tb-border, #E6E6E6); }
${O} .tb-hi-rev { display: block; width: 100%; padding: 0.7rem 1rem; border: 0; background: none; color: inherit; text-align: left; }
${O} .tb-hi-rev:hover { background: var(--tb-bg-soft, #F7F7F5); }
${O} .tb-hi-msg { display: block; font-weight: 600; color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }
${O} .tb-hi-meta { display: block; margin-top: 0.15rem; color: var(--tb-muted, #6E6E73); font-size: 0.85rem; }
${O} .tb-hi-back { margin: 0 0 0.75rem; }
${O} .tb-hi-head { margin: 0 0 0.75rem; }
${O} .tb-hi-head h2 { margin: 0; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); overflow-wrap: anywhere; }
${O} .tb-hi-gh { color: var(--tb-accent, #7C6CF0); font-weight: 600; }
`;
  document.head.append(style);
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
  /** Names an anonymous proposal gave, learnt as revisions are opened. */
  const names = new Map<string, string>();

  const overlay = el("div", {
    id: OVERLAY_ID,
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "tb-hi-title",
    tabindex: -1,
  });
  const segments = o.path.split("/");
  const fileName = segments.pop()!;
  const crumbs = el(
    "div",
    { class: "tb-ed-crumbs", id: "tb-hi-title" },
    icon(FILE),
    el("span", { class: "tb-ed-file", text: "History" }),
  );
  crumbs.append(
    el("span", { class: "tb-ed-sep", text: "·" }),
    el("span", { text: o.repo.split("/").pop() || o.repo }),
  );
  for (const s of segments)
    crumbs.append(el("span", { class: "tb-ed-sep", text: "/" }), el("span", { text: s }));
  crumbs.append(el("span", { class: "tb-ed-sep", text: "/" }), el("span", { text: fileName }));
  crumbs.append(el("span", { class: "tb-ed-pill" }, icon(BRANCH), el("span", { text: o.branch })));
  const xBtn = el("button", {
    type: "button",
    class: "tb-ed-x",
    "aria-label": "Close the history",
    text: "×",
  });
  const main = el("div", { class: "tb-ed-main" });
  const inner = el("div", { class: "tb-ed-inner" });
  main.append(inner);
  overlay.append(el("div", { class: "tb-ed-head" }, crumbs, xBtn), main);

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
  const meta = (r: Revision) => `${whoOf(r)} · ${when(r.date)}`;

  let revisions: Revision[] | null = null;

  const showList = () => {
    inner.textContent = "";
    if (!revisions) return;
    if (!revisions.length) {
      inner.append(status("This page has no published revisions yet."));
      return;
    }
    inner.append(
      el("p", {
        class: "tb-ed-muted",
        text: `${revisions.length} published ${revisions.length === 1 ? "version" : "versions"} of this page, newest first. Open one to see what changed.`,
      }),
    );
    const list = el("ol", { class: "tb-hi-list" });
    revisions.forEach((r, i) => {
      const b = el(
        "button",
        { type: "button", class: "tb-hi-rev" },
        el("span", { class: "tb-hi-msg", text: r.message || "(no description)" }),
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
      class: "tb-ed-btn tb-hi-back",
      text: "← All revisions",
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
      el("h2", { text: r.message || "(no description)" }),
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
        };
        if (r.reader && typeof d.proposer === "string" && d.proposer.trim()) {
          names.set(r.sha, d.proposer.trim().slice(0, 80));
          metaLine.textContent = meta(r);
        }
        const before = typeof d.before === "string" ? d.before : "";
        const after = typeof d.after === "string" ? d.after : "";
        const tabNames = ["Changes", "Page as it was"];
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
              text: "The page was first published in this revision.",
            }),
          );
        changes.append(renderDiff(before, after));
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
            el("p", { class: "tb-ed-muted", text: "The page was removed in this revision." }),
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
          failure(err, "This revision couldn’t be loaded just now. Please try again in a moment."),
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
    })
    .catch((err) => {
      if (!req.current()) return;
      inner.textContent = "";
      inner.append(failure(err, "This page’s history couldn’t be loaded just now."));
    })
    .finally(req.done);
};
