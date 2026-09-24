/**
 * The in-site editor: GitHub's "edit a file" flow, in the book's own styling,
 * for readers who have never used GitHub.
 *
 *   header      repo / folder / file.md  [drafts]                        ×
 *   toolbar     Edit | Preview | Changes          Cancel  [Propose changes…]
 *   box         the markdown (whole page, or one paragraph with its neighbours
 *               shown faintly above and below)
 *   dialog      "Propose changes": title, description, who you are (sign in
 *               with GitHub, or name + email), what will happen, Propose
 *
 * Proposals go to the platform function's /api/propose-edit, which opens a pull
 * request into the book's drafts branch (or files an issue if drafts moved on).
 * All reader text is rendered with textContent. The one HTML insertion is the
 * Preview tab, which renders through GitHub's own markdown API and is sanitised
 * again here.
 *
 * Every failure path keeps what the reader typed until they close the editor.
 */
import { findParagraph, hunks, diff, tokens } from "./source";
import type { Block } from "./source";

type Tracker = (name: string, props?: Record<string, string>) => void;

export interface EditorOptions {
  /** .../api/propose-edit */
  endpoint: string;
  /** The page's repo path, e.g. chapters/chapter-03.md */
  path: string;
  /** "owner/repo", for the breadcrumb. */
  repo: string;
  /** Where "Open on GitHub instead" goes when the editor can't load. */
  githubHref: string;
  mode: "page" | "paragraph";
  /** The paragraph element, in paragraph mode. */
  para?: HTMLElement;
  trigger: HTMLElement;
  track: Tracker;
}

interface Identity {
  token: string;
  login: string;
  id: number;
  name: string;
  at: number;
}

const OVERLAY_ID = "tb-editor";
const STYLE_ID = "tb-editor-style";
const ID_KEY = "tb-gh-identity";
const ID_TTL = 7.5 * 60 * 60 * 1000; // under the server's 8h
const FETCH_TIMEOUT = 20000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const USER_MESSAGE_MAX = 200;

// --- small DOM helpers ----------------------------------------------------------

type Attrs = Record<string, string | boolean | number>;
const el = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Attrs = {},
  ...children: (Node | string | null | false)[]
): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false) continue;
    if (k === "text") node.textContent = String(v);
    else if (k === "class") node.className = String(v);
    else node.setAttribute(k, v === true ? "" : String(v));
  }
  for (const c of children) if (c) node.append(c);
  return node;
};

const SVG_NS = "http://www.w3.org/2000/svg";
/** Octicon-sized icons drawn from paths; no <title>, so they add no text. */
const icon = (d: string): SVGSVGElement => {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", d);
  path.setAttribute("fill", "currentColor");
  svg.append(path);
  return svg;
};
export const PENCIL =
  "M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Zm-2.677 2.323L3.64 10.92a.25.25 0 0 0-.064.108l-.558 1.953 1.953-.558a.25.25 0 0 0 .108-.064l6.11-6.11Z";
const BRANCH =
  "M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z";
const FILE =
  "M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z";
const GITHUB =
  "M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z";

const safeUserMessage = (data: unknown): string | null => {
  const raw = (data as { userMessage?: unknown } | null)?.userMessage;
  const m = typeof raw === "string" ? raw.trim() : "";
  return m ? m.slice(0, USER_MESSAGE_MAX) : null;
};

const loadIdentity = (): Identity | null => {
  try {
    const raw = sessionStorage.getItem(ID_KEY);
    if (!raw) return null;
    const id = JSON.parse(raw) as Identity;
    if (typeof id.token !== "string" || Date.now() - id.at > ID_TTL) return null;
    return id;
  } catch {
    return null;
  }
};
const saveIdentity = (id: Identity | null) => {
  try {
    if (id) sessionStorage.setItem(ID_KEY, JSON.stringify(id));
    else sessionStorage.removeItem(ID_KEY);
  } catch {
    /* private mode: sign-in lasts for this editor only */
  }
};

// --- styles -----------------------------------------------------------------------

const injectStyle = () => {
  if (document.getElementById(STYLE_ID)) return;
  const O = `#${OVERLAY_ID}`;
  const style = el("style", { id: STYLE_ID });
  // The --tb-* tokens with literal fallbacks: the overlay is body-mounted and
  // must render without edition-integrations.
  style.textContent = `
${O} { position: fixed; inset: 0; z-index: 10000; display: flex; flex-direction: column; overflow: hidden;
  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);
  font-family: var(--tb-font-text, sans-serif); font-size: 0.9rem; line-height: 1.5; }
${O} [hidden] { display: none !important; }
${O} button { font: inherit; cursor: pointer; }
${O} button:disabled { cursor: default; opacity: 0.55; }
${O} :focus-visible { outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }
${O} .tb-ed-head { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.25rem;
  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }
${O} .tb-ed-crumbs { display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem; min-width: 0; flex: 1;
  font-family: var(--tb-font-mono, monospace); font-size: 0.85rem; }
${O} .tb-ed-crumbs svg { color: var(--tb-muted, #6E6E73); flex: none; }
${O} .tb-ed-sep { color: var(--tb-faint, #9B9BA1); }
${O} .tb-ed-file { font-weight: 600; overflow-wrap: anywhere; }
${O} .tb-ed-pill { display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; padding: 0.05rem 0.55rem;
  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 999px; background: var(--tb-bg, #FFFFFF);
  color: var(--tb-muted, #6E6E73); font-size: 0.78rem; }
${O} .tb-ed-x { border: 0; background: none; color: var(--tb-faint, #9B9BA1); font-size: 1.4rem; line-height: 1; padding: 0.1rem 0.4rem; }
${O} .tb-ed-x:hover { color: var(--tb-ink, #2B2B2B); }
${O} .tb-ed-main { flex: 1; overflow: auto; padding: 1rem 1.25rem 2rem; }
${O} .tb-ed-inner { max-width: 60rem; margin: 0 auto; }
${O} .tb-ed-note { margin: 0 0 0.75rem; padding: 0.6rem 0.8rem; border: 1px solid var(--tb-border, #E6E6E6);
  border-left: 3px solid var(--tb-accent, #7C6CF0); border-radius: 6px; background: var(--tb-accent-wash, #EEEBFD); }
${O} .tb-ed-box { border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; overflow: hidden; background: var(--tb-bg, #FFFFFF); }
${O} .tb-ed-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem;
  padding: 0.4rem 0.5rem 0; border-bottom: 1px solid var(--tb-border, #E6E6E6); background: var(--tb-bg-soft, #F7F7F5); }
${O} [role="tablist"] { display: flex; gap: 0.15rem; overflow-x: auto; }
${O} [role="tab"] { border: 1px solid transparent; border-bottom: 0; border-radius: 6px 6px 0 0; margin-bottom: -1px;
  padding: 0.4rem 0.9rem; background: none; color: var(--tb-muted, #6E6E73); }
${O} [role="tab"][aria-selected="true"] { border-color: var(--tb-border, #E6E6E6); background: var(--tb-bg, #FFFFFF);
  color: var(--tb-ink, #2B2B2B); font-weight: 600; }
${O} .tb-ed-actions { display: flex; gap: 0.5rem; padding-bottom: 0.4rem; margin-left: auto; }
${O} .tb-ed-btn { padding: 0.35rem 0.9rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px;
  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-weight: 600; }
${O} .tb-ed-btn:hover:not(:disabled) { border-color: var(--tb-muted, #6E6E73); }
${O} .tb-ed-primary { border-color: var(--tb-accent, #7C6CF0); background: var(--tb-accent, #7C6CF0); color: #FFFFFF; }
${O} .tb-ed-primary:hover:not(:disabled) { border-color: var(--tb-accent-hover, #6A57E0); background: var(--tb-accent-hover, #6A57E0); }
${O} .tb-ed-ctx { margin: 0; padding: 0.5rem 1rem; color: var(--tb-faint, #9B9BA1); font-family: var(--tb-font-mono, monospace);
  font-size: 0.8rem; white-space: pre-wrap; overflow-wrap: anywhere; background: var(--tb-bg-soft, #F7F7F5); }
${O} textarea.tb-ed-text { display: block; width: 100%; box-sizing: border-box; min-height: 60vh; margin: 0; padding: 0.9rem 1rem;
  border: 0; resize: vertical; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);
  font-family: var(--tb-font-mono, monospace); font-size: 0.875rem; line-height: 1.65; tab-size: 2; }
${O} .tb-ed-para textarea.tb-ed-text { min-height: 12rem; }
${O} textarea.tb-ed-text:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--tb-accent, #7C6CF0); }
${O} .tb-ed-panel { padding: 1rem; }
${O} .tb-ed-preview { font-size: 1rem; line-height: 1.65; }
${O} .tb-ed-preview img { max-width: 100%; }
${O} .tb-ed-muted { color: var(--tb-muted, #6E6E73); }
${O} .tb-ed-diff { font-family: var(--tb-font-mono, monospace); font-size: 0.8rem; }
${O} .tb-ed-hunk { border-top: 1px solid var(--tb-border, #E6E6E6); }
${O} .tb-ed-hunk:first-child { border-top: 0; }
${O} .tb-ed-hh { padding: 0.25rem 0.75rem; background: var(--tb-accent-wash, #EEEBFD); color: var(--tb-muted, #6E6E73); }
${O} .tb-ed-line { display: grid; grid-template-columns: 1.5rem 1fr; white-space: pre-wrap; overflow-wrap: anywhere; }
${O} .tb-ed-line > span:first-child { text-align: center; color: var(--tb-faint, #9B9BA1); user-select: none; }
${O} .tb-ed-line > span:last-child { padding-right: 0.75rem; }
${O} .tb-ed-del { background: #FFEBE9; }
${O} .tb-ed-add { background: #E6FFEC; }
${O} .tb-ed-del del { background: #FFC1C0; text-decoration: none; border-radius: 2px; }
${O} .tb-ed-add ins { background: #ABF2BC; text-decoration: none; border-radius: 2px; }
${O} .tb-ed-foot { margin: 0.75rem 0 0; color: var(--tb-muted, #6E6E73); }
${O} .tb-ed-discard { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding: 0.6rem 1.25rem;
  border-bottom: 1px solid var(--tb-border, #E6E6E6); background: #FFF8C5; }
${O} .tb-ed-scrim { position: absolute; inset: 0; display: flex; align-items: flex-start; justify-content: center;
  padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45); }
${O} .tb-ed-dialog { width: 100%; max-width: 34rem; padding: 1.25rem 1.5rem; border: 1px solid var(--tb-border, #E6E6E6);
  border-radius: 12px; background: var(--tb-bg, #FFFFFF); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }
${O} .tb-ed-dialog h2 { margin: 0 0 1rem; font-size: 1.15rem; font-weight: 600; color: var(--tb-ink, #2B2B2B); }
${O} .tb-ed-field { margin-bottom: 0.9rem; }
${O} .tb-ed-field label { display: block; margin-bottom: 0.25rem; font-weight: 600; }
${O} .tb-ed-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }
${O} .tb-ed-field input, ${O} .tb-ed-field textarea { display: block; width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem;
  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 6px; background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B);
  font: inherit; font-size: 1rem; line-height: 1.45; }
${O} .tb-ed-field textarea { min-height: 5rem; resize: vertical; }
${O} [aria-invalid="true"] { border-color: #B3261E !important; }
${O} .tb-ed-err { margin: 0.25rem 0 0; color: #B3261E; }
${O} .tb-ed-who { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem; padding: 0.7rem 0.8rem;
  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px; background: var(--tb-bg-soft, #F7F7F5); }
${O} .tb-ed-who img { width: 28px; height: 28px; border-radius: 50%; }
${O} .tb-ed-who > span { flex: 1 1 14rem; min-width: 0; }
${O} .tb-ed-gh { display: inline-flex; align-items: center; gap: 0.45rem; }
${O} .tb-ed-link { border: 0; background: none; padding: 0; color: var(--tb-accent, #7C6CF0); text-decoration: underline; }
${O} .tb-ed-what { display: flex; gap: 0.6rem; margin: 0.25rem 0 1rem; color: var(--tb-muted, #6E6E73); }
${O} .tb-ed-what svg { flex: none; margin-top: 0.2rem; }
${O} .tb-ed-what code, ${O} .tb-ed-note code { font-family: var(--tb-font-mono, monospace); font-size: 0.85em;
  padding: 0.05rem 0.3rem; border-radius: 4px; background: var(--tb-bg-soft, #F7F7F5); }
${O} .tb-ed-row { display: flex; justify-content: flex-end; gap: 0.5rem; }
${O} .tb-ed-hp { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
${O} .tb-ed-result:focus { outline: none; }
${O} .tb-ed-result p { margin: 0 0 0.75rem; }
${O} .tb-ed-result a { color: var(--tb-accent, #7C6CF0); font-weight: 600; }
@media (max-width: 768px) {
  ${O} .tb-ed-head, ${O} .tb-ed-main { padding-left: 0.75rem; padding-right: 0.75rem; }
  ${O} .tb-ed-actions { width: 100%; justify-content: flex-end; }
  ${O} .tb-ed-scrim { padding: 0; align-items: stretch; }
  ${O} .tb-ed-dialog { max-width: none; border: 0; border-radius: 0; }
}
@media print { ${O} { display: none !important; } }
`;
  document.head.append(style);
};

// --- preview ------------------------------------------------------------------------

/** Obsidian syntax GitHub doesn't know, reduced to what a reader would see. */
const forPreview = (md: string): string =>
  md
    .replace(/^---\n[\s\S]*?\n---\n?/, "")
    .replace(/!\[\[[^\]]*\]\]/g, "")
    .replace(/\[\[([^\]|]*)\|([^\]]*)\]\]/g, "$2")
    .replace(/\[\[([^\]]*)\]\]/g, (_m, t: string) => t.split("/").pop()!)
    .replace(/\s\^[A-Za-z0-9-]+\s*$/gm, "")
    .replace(/%%[\s\S]*?%%/g, "");

const DROP = "script, style, iframe, object, embed, form, input, button, link, meta, base, frame, frameset";

/** GitHub's renderer already sanitises; this is the second lock. */
const sanitise = (html: string): DocumentFragment => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll(DROP).forEach((n) => n.remove());
  doc.querySelectorAll("*").forEach((n) => {
    for (const a of Array.from(n.attributes)) {
      const v = a.value.trim().toLowerCase();
      if (a.name.startsWith("on") || ((a.name === "href" || a.name === "src") && /^(javascript|data|vbscript):/.test(v)))
        n.removeAttribute(a.name);
    }
    if (n.tagName === "A") {
      n.setAttribute("target", "_blank");
      n.setAttribute("rel", "noopener noreferrer");
    }
  });
  const frag = document.createDocumentFragment();
  frag.append(...Array.from(doc.body.childNodes));
  return frag;
};

// --- diff rendering --------------------------------------------------------------------

const renderDiff = (before: string, after: string): HTMLElement => {
  const box = el("div", { class: "tb-ed-diff" });
  const hs = hunks(before, after);
  if (!hs.length) {
    box.append(el("p", { class: "tb-ed-panel tb-ed-muted", text: "No changes yet." }));
    return box;
  }
  const line = (kind: "=" | "-" | "+", content: Node[] | string) => {
    const row = el("div", { class: `tb-ed-line${kind === "-" ? " tb-ed-del" : kind === "+" ? " tb-ed-add" : ""}` });
    const text = el("span");
    if (typeof content === "string") text.textContent = content || " ";
    else text.append(...content);
    row.append(el("span", { text: kind === "=" ? " " : kind }), text);
    return row;
  };
  for (const h of hs) {
    const hunk = el("div", { class: "tb-ed-hunk" }, el("div", { class: "tb-ed-hh", text: `Line ${h.b}` }));
    for (let k = 0; k < h.ops.length; ) {
      const op = h.ops[k]!;
      if (op.t === "=") {
        hunk.append(line("=", op.v));
        k++;
        continue;
      }
      // A run of removals then additions: pair them up line by line, word-diffed.
      const dels: string[] = [];
      const adds: string[] = [];
      while (h.ops[k]?.t === "-") dels.push(h.ops[k++]!.v);
      while (h.ops[k]?.t === "+") adds.push(h.ops[k++]!.v);
      const paired = Math.min(dels.length, adds.length);
      const words = dels.map((d, i) => (i < paired ? diff(tokens(d), tokens(adds[i]!)) : null));
      dels.forEach((d, i) => {
        const w = words[i];
        hunk.append(line("-", w ? w.filter((o) => o.t !== "+").map((o) => (o.t === "-" ? el("del", { text: o.v }) : document.createTextNode(o.v))) : d));
      });
      adds.forEach((a, i) => {
        const w = words[i];
        hunk.append(line("+", w ? w.filter((o) => o.t !== "-").map((o) => (o.t === "+" ? el("ins", { text: o.v }) : document.createTextNode(o.v))) : a));
      });
    }
    box.append(hunk);
  }
  return box;
};

// --- the editor ------------------------------------------------------------------------

let closeCurrent: (() => void) | null = null;
export const closeIfOpen = () => closeCurrent?.();

export const openEditor = (o: EditorOptions) => {
  if (closeCurrent) return;
  injectStyle();

  const previousOverflow = document.body.style.overflow;
  const fnOrigin = new URL(o.endpoint, location.href).origin;
  const authUrl = new URL("github-auth", new URL(o.endpoint, location.href)).toString();
  const segments = o.path.split("/");
  const fileName = segments.pop()!;
  const pnum = o.para ? Number(o.para.getAttribute("data-pnum")) || 0 : 0;

  let mode = o.mode;
  let source = ""; // the whole file, LF
  let baseSha = "";
  let branch = "drafts";
  let signInOn = false;
  let block: Block | null = null;
  let original = ""; // what the textarea started with
  let identity = loadIdentity();
  let busy = false;
  let dirty = false;
  let popup: Window | null = null;
  let controller: AbortController | null = null;

  // --- skeleton ---
  const overlay = el("div", { id: OVERLAY_ID, role: "dialog", "aria-modal": "true", "aria-labelledby": "tb-ed-title", tabindex: -1 });

  const branchPill = el("span", { class: "tb-ed-pill" }, icon(BRANCH), el("span", { text: branch }));
  const crumbs = el("div", { class: "tb-ed-crumbs", id: "tb-ed-title" }, icon(FILE));
  crumbs.append(el("span", { text: o.repo.split("/").pop() || o.repo }));
  for (const s of segments) crumbs.append(el("span", { class: "tb-ed-sep", text: "/" }), el("span", { text: s }));
  crumbs.append(el("span", { class: "tb-ed-sep", text: "/" }), el("span", { class: "tb-ed-file", text: fileName }));
  const paraLabel = el("span", { class: "tb-ed-muted", text: pnum ? ` · ¶${pnum}` : "" });
  crumbs.append(paraLabel, branchPill);
  const xBtn = el("button", { type: "button", class: "tb-ed-x", "aria-label": "Close the editor", text: "×" });
  const head = el("div", { class: "tb-ed-head" }, crumbs, xBtn);

  const discardBar = el(
    "div",
    { class: "tb-ed-discard", role: "alert", hidden: true },
    el("span", { text: "Discard your changes?" }),
  );
  const discardYes = el("button", { type: "button", class: "tb-ed-btn", text: "Discard" });
  const discardNo = el("button", { type: "button", class: "tb-ed-btn tb-ed-primary", text: "Keep editing" });
  discardBar.append(discardYes, discardNo);

  const main = el("div", { class: "tb-ed-main" });
  const inner = el("div", { class: "tb-ed-inner" });
  const note = el("p", { class: "tb-ed-note", hidden: true });
  const loading = el("p", { class: "tb-ed-muted", role: "status", text: "Loading the page’s source…" });
  inner.append(note, loading);
  main.append(inner);

  overlay.append(head, discardBar, main);

  // --- tabs + box ---
  const tabNames = ["Edit", "Preview", "Changes"] as const;
  const tablist = el("div", { role: "tablist", "aria-label": "Editor view" });
  const tabs = tabNames.map((name, i) =>
    el("button", {
      type: "button",
      role: "tab",
      id: `tb-ed-tab-${i}`,
      "aria-controls": `tb-ed-panel-${i}`,
      "aria-selected": i === 0 ? "true" : "false",
      tabindex: i === 0 ? 0 : -1,
      text: name === "Edit" ? "Edit" : name === "Preview" ? "Preview" : "Changes",
    }),
  );
  tablist.append(...tabs);
  const cancelBtn = el("button", { type: "button", class: "tb-ed-btn", text: "Cancel" });
  const proposeBtn = el("button", { type: "button", class: "tb-ed-btn tb-ed-primary", disabled: true, text: "Propose changes…" });
  const bar = el("div", { class: "tb-ed-bar" }, tablist, el("div", { class: "tb-ed-actions" }, cancelBtn, proposeBtn));

  const textarea = el("textarea", {
    class: "tb-ed-text",
    spellcheck: "true",
    "aria-label": "Markdown source",
    wrap: "soft",
  });
  const ctxBefore = el("pre", { class: "tb-ed-ctx", "aria-hidden": "true", hidden: true });
  const ctxAfter = el("pre", { class: "tb-ed-ctx", "aria-hidden": "true", hidden: true });
  const panels = [
    el("div", { role: "tabpanel", id: "tb-ed-panel-0", "aria-labelledby": "tb-ed-tab-0" }, ctxBefore, textarea, ctxAfter),
    el("div", { role: "tabpanel", id: "tb-ed-panel-1", "aria-labelledby": "tb-ed-tab-1", tabindex: 0, hidden: true }),
    el("div", { role: "tabpanel", id: "tb-ed-panel-2", "aria-labelledby": "tb-ed-tab-2", tabindex: 0, hidden: true }),
  ];
  const box = el("div", { class: "tb-ed-box" }, bar, ...panels);
  const foot = el("p", { class: "tb-ed-foot" });

  const current = () => textarea.value;
  const beforeText = () => original;

  const select = (i: number) => {
    tabs.forEach((t, k) => {
      t.setAttribute("aria-selected", k === i ? "true" : "false");
      t.tabIndex = k === i ? 0 : -1;
      panels[k]!.hidden = k !== i;
    });
    if (i === 1) renderPreview();
    if (i === 2) {
      panels[2]!.textContent = "";
      panels[2]!.append(renderDiff(beforeText(), current()));
    }
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(i));
    t.addEventListener("keydown", (e) => {
      const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      const n = (i + d + tabs.length) % tabs.length;
      select(n);
      tabs[n]!.focus();
    });
  });

  let previewSeq = 0;
  const renderPreview = () => {
    const panel = panels[1]!;
    panel.textContent = "";
    panel.className = "tb-ed-panel tb-ed-preview";
    const status = el("p", { class: "tb-ed-muted", text: "Rendering…" });
    panel.append(status);
    const seq = ++previewSeq;
    fetch("https://api.github.com/markdown", {
      method: "POST",
      headers: { Accept: "text/html", "Content-Type": "application/json" },
      body: JSON.stringify({ text: forPreview(current()), mode: "markdown" }),
    })
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then((html) => {
        if (seq !== previewSeq) return;
        panel.textContent = "";
        panel.append(sanitise(html));
      })
      .catch(() => {
        if (seq !== previewSeq) return;
        status.textContent = "Preview isn’t available right now. Your text is safe; the Changes tab still works.";
      });
  };

  textarea.addEventListener("input", () => {
    dirty = current() !== original;
    proposeBtn.disabled = !dirty;
  });

  // --- the Propose dialog ---
  const scrim = el("div", { class: "tb-ed-scrim", hidden: true });
  const dialog = el("div", {
    class: "tb-ed-dialog",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "tb-ed-dlg-title",
    tabindex: -1,
  });
  scrim.append(dialog);
  overlay.append(scrim);

  const field = (id: string, label: string, control: HTMLInputElement | HTMLTextAreaElement, optional = false) => {
    control.id = id;
    const err = el("p", { class: "tb-ed-err", id: `${id}-err` });
    const lab = el("label", { for: id, text: label }, optional ? el("span", { class: "tb-ed-opt", text: " (optional)" }) : null);
    return { wrap: el("div", { class: "tb-ed-field" }, lab, control, err), control, err };
  };
  const titleF = field("tb-ed-msg", "Title", el("input", { type: "text", maxlength: 200, autocomplete: "off" }));
  const descF = field("tb-ed-desc", "Extended description", el("textarea", { rows: 3, maxlength: 5000 }), true);
  const nameF = field("tb-ed-name", "Your name", el("input", { type: "text", autocomplete: "name" }));
  const emailF = field("tb-ed-email", "Your email", el("input", { type: "email", autocomplete: "email" }));
  const hp = el("input", { type: "text", name: "website", id: "tb-ed-website", tabindex: -1, autocomplete: "off", "aria-hidden": "true" });
  const hpWrap = el("div", { class: "tb-ed-hp", "aria-hidden": "true" }, el("label", { for: "tb-ed-website", text: "Leave this field empty" }), hp);

  const who = el("div", { class: "tb-ed-who" });
  const anon = el("div", {}, nameF.wrap, emailF.wrap, el("p", { class: "tb-ed-muted tb-ed-foot", text: "Your email is never published: the editors see it masked." }));
  const what = el("div", { class: "tb-ed-what" }, icon(BRANCH));
  const whatText = el("span");
  what.append(whatText);
  const dlgCancel = el("button", { type: "button", class: "tb-ed-btn", text: "Cancel" });
  const dlgSubmit = el("button", { type: "submit", class: "tb-ed-btn tb-ed-primary", text: "Propose changes" });
  const form = el(
    "form",
    { novalidate: true },
    el("h2", { id: "tb-ed-dlg-title", text: "Propose changes" }),
    titleF.wrap,
    descF.wrap,
    who,
    anon,
    hpWrap,
    what,
    el("div", { class: "tb-ed-row" }, dlgCancel, dlgSubmit),
  );
  const result = el("div", { class: "tb-ed-result", tabindex: -1, hidden: true });
  dialog.append(form, result);

  const renderWho = () => {
    who.textContent = "";
    if (identity) {
      const img = el("img", { src: `https://avatars.githubusercontent.com/u/${identity.id}?s=56`, alt: "" });
      const out = el("button", { type: "button", class: "tb-ed-link", text: "Sign out" });
      out.addEventListener("click", () => {
        identity = null;
        saveIdentity(null);
        renderWho();
      });
      who.append(img, el("span", {}, "Signed in as ", el("strong", { text: `@${identity.login}` }), " — this edit will be credited to your GitHub account."), out);
      who.hidden = false;
      anon.hidden = true;
    } else {
      anon.hidden = false;
      if (!signInOn) {
        who.hidden = true;
        return;
      }
      const btn = el("button", { type: "button", class: "tb-ed-btn tb-ed-gh" }, icon(GITHUB), "Sign in with GitHub");
      btn.addEventListener("click", signIn);
      who.append(btn, el("span", { class: "tb-ed-muted", text: "to get credit on your GitHub profile — or just add your name below." }));
      who.hidden = false;
    }
  };

  const onMessage = (e: MessageEvent) => {
    if (e.origin !== fnOrigin) return;
    const d = e.data as Partial<Identity> & { type?: string; error?: string };
    if (!d || d.type !== "tb-github-identity") return;
    popup = null;
    if (d.error || typeof d.token !== "string" || typeof d.login !== "string") {
      o.track("github_signin", { outcome: d.error === "denied" ? "cancelled" : "error" });
      return;
    }
    identity = { token: d.token, login: d.login, id: Number(d.id) || 0, name: d.name ?? "", at: Date.now() };
    saveIdentity(identity);
    o.track("github_signin", { outcome: "success" });
    renderWho();
    titleF.control.focus();
  };
  const signIn = () => {
    const url = `${authUrl}?origin=${encodeURIComponent(location.origin)}`;
    popup = window.open(url, "tb-github-signin", "popup,width=560,height=720");
    if (!popup) {
      who.append(el("p", { class: "tb-ed-err", role: "alert", text: "Your browser blocked the sign-in window. Allow pop-ups for this site, or add your name below." }));
    }
  };
  window.addEventListener("message", onMessage);

  const invalid = (f: { control: HTMLElement; err: HTMLElement }, msg: string) => {
    f.control.setAttribute("aria-invalid", "true");
    f.control.setAttribute("aria-describedby", f.err.id);
    f.err.textContent = msg;
  };
  const clear = (f: { control: HTMLElement; err: HTMLElement }) => {
    f.control.removeAttribute("aria-invalid");
    f.control.removeAttribute("aria-describedby");
    f.err.textContent = "";
  };
  for (const f of [titleF, nameF, emailF]) f.control.addEventListener("input", () => clear(f));

  const openDialog = () => {
    if (!titleF.control.value) {
      titleF.control.value = mode === "paragraph" && pnum ? `Edit ¶${pnum} of ${fileName}` : `Update ${fileName}`;
    }
    whatText.textContent = "";
    whatText.append(
      "This creates a new branch and opens a proposal to merge it into ",
      el("code", { text: branch }),
      ". Nothing changes in the book until an editor accepts it.",
    );
    renderWho();
    form.hidden = false;
    result.hidden = true;
    scrim.hidden = false;
    titleF.control.focus();
    titleF.control.select();
  };
  const closeDialog = () => {
    scrim.hidden = true;
    proposeBtn.focus();
  };
  proposeBtn.addEventListener("click", openDialog);
  dlgCancel.addEventListener("click", closeDialog);
  scrim.addEventListener("mousedown", (e) => {
    if (e.target === scrim && !busy) closeDialog();
  });

  const showResult = (title: string, message: string, link: { href: string; text: string } | null, retry: boolean) => {
    if (!overlay.isConnected) return;
    result.textContent = "";
    result.append(el("h2", { text: title }), el("p", { text: message }));
    if (link) {
      result.append(el("p", {}, el("a", { href: link.href, target: "_blank", rel: "noopener", text: link.text })));
    }
    const b = el("button", { type: "button", class: `tb-ed-btn${retry ? " tb-ed-primary" : ""}`, text: retry ? "Back to my edit" : "Close" });
    b.addEventListener("click", retry ? () => { result.hidden = true; form.hidden = false; dlgSubmit.focus(); } : () => close(true));
    result.append(el("div", { class: "tb-ed-row" }, b));
    form.hidden = true;
    result.hidden = false;
    result.focus();
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (busy) return;
    let bad: HTMLElement | null = null;
    for (const f of [titleF, nameF, emailF]) clear(f);
    const fail = (f: typeof titleF, msg: string) => {
      invalid(f, msg);
      bad ??= f.control;
    };
    if (!titleF.control.value.trim()) fail(titleF, "Please give your change a short title.");
    if (!identity) {
      if (!nameF.control.value.trim()) fail(nameF, "Please add your name.");
      const em = emailF.control.value.trim();
      if (!em) fail(emailF, "Please add your email.");
      else if (!EMAIL_RE.test(em)) fail(emailF, "That does not look like an email address.");
    }
    if (bad) {
      (bad as HTMLElement).focus();
      return;
    }

    const payload: Record<string, unknown> = {
      mode,
      path: o.path,
      baseSha,
      title: titleF.control.value.trim(),
      description: descF.control.value.trim(),
    };
    if (mode === "page") payload.content = current();
    else {
      payload.startLine = block!.start;
      payload.original = block!.text;
      payload.replacement = current();
      if (pnum) payload.paragraph = pnum;
    }
    if (identity) payload.identity = identity.token;
    else Object.assign(payload, { name: nameF.control.value.trim(), email: emailF.control.value.trim(), website: hp.value });

    if (hp.value) {
      showResult("Thank you", "Your edit has been received.", null, false);
      return;
    }

    busy = true;
    dlgSubmit.disabled = true;
    dlgSubmit.textContent = "Proposing…";
    const c = (controller = new AbortController());
    const timer = setTimeout(() => c.abort(), FETCH_TIMEOUT);
    fetch(o.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: c.signal,
    })
      .then(async (res) => {
        let data: unknown = null;
        try {
          data = await res.json();
        } catch {
          data = null;
        }
        if (res.status === 401 && identity) {
          identity = null;
          saveIdentity(null);
          renderWho();
        }
        if (!res.ok) throw Object.assign(new Error(String(res.status)), { userMessage: safeUserMessage(data) });
        return data as { prUrl?: unknown; issueUrl?: unknown; fallback?: unknown };
      })
      .then((data) => {
        dirty = false;
        if (data.fallback && typeof data.issueUrl === "string") {
          o.track("page_edit_submitted", { outcome: "issue", mode });
          showResult(
            "Sent to the editors",
            "The page changed while you were editing, so your change couldn’t be applied automatically. We’ve sent it to the editors as a suggestion instead, with exactly what you changed.",
            { href: data.issueUrl, text: "Follow it on GitHub" },
            false,
          );
        } else {
          o.track("page_edit_submitted", { outcome: "proposed", mode });
          showResult(
            "Proposal opened",
            "Thank you. An editor will review your change and merge it into the book, or reply to it.",
            typeof data.prUrl === "string" ? { href: data.prUrl, text: "View your proposal on GitHub" } : null,
            false,
          );
        }
      })
      .catch((err: { userMessage?: string | null } | null) => {
        o.track("page_edit_submitted", { outcome: "error", mode });
        showResult(
          "That did not go through",
          (err && err.userMessage) || "Something went wrong sending your change — nothing was lost. Try again in a moment.",
          null,
          true,
        );
      })
      .finally(() => {
        clearTimeout(timer);
        if (controller === c) controller = null;
        busy = false;
        dlgSubmit.disabled = false;
        dlgSubmit.textContent = "Propose changes";
      });
  });

  // --- closing ---
  const focusables = (scope: HTMLElement) =>
    Array.from(scope.querySelectorAll<HTMLElement>("a[href], button, input, textarea, select, [tabindex]")).filter(
      (n) => !(n as HTMLButtonElement).disabled && n.tabIndex >= 0 && !n.closest("[hidden]"),
    );

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      if (!scrim.hidden) {
        if (!busy) {
          if (!result.hidden && form.hidden && !dirty) close(true);
          else closeDialog();
        }
      } else requestClose();
      return;
    }
    if (e.key !== "Tab") return;
    const scope = scrim.hidden ? overlay : dialog;
    const items = focusables(scope);
    if (!items.length) {
      e.preventDefault();
      scope.focus();
      return;
    }
    const idx = items.indexOf(document.activeElement as HTMLElement);
    if (e.shiftKey ? idx <= 0 : idx === -1 || idx === items.length - 1) {
      e.preventDefault();
      items[e.shiftKey ? items.length - 1 : 0]!.focus();
    }
  };

  const onBeforeUnload = (e: BeforeUnloadEvent) => {
    if (!dirty) return;
    e.preventDefault();
    e.returnValue = "";
  };

  const close = (force = false): void => {
    if (!force && dirty) return requestClose();
    closeCurrent = null;
    controller?.abort();
    popup?.close();
    document.removeEventListener("keydown", onKeydown, true);
    window.removeEventListener("message", onMessage);
    window.removeEventListener("beforeunload", onBeforeUnload);
    overlay.remove();
    document.body.style.overflow = previousOverflow;
    if (o.trigger.isConnected) o.trigger.focus();
  };
  const requestClose = (): void => {
    if (!dirty) return close(true);
    discardBar.hidden = false;
    discardNo.focus();
  };
  discardYes.addEventListener("click", () => close(true));
  discardNo.addEventListener("click", () => {
    discardBar.hidden = true;
    textarea.focus();
  });
  xBtn.addEventListener("click", requestClose);
  cancelBtn.addEventListener("click", requestClose);
  document.addEventListener("keydown", onKeydown, true);
  window.addEventListener("beforeunload", onBeforeUnload);
  closeCurrent = () => close(true);

  document.body.style.overflow = "hidden";
  document.body.append(overlay);
  xBtn.focus();
  o.track("page_editor_opened", { mode });

  // --- load the source ---
  const loadFailed = (message: string) => {
    loading.textContent = "";
    loading.removeAttribute("class");
    loading.append(
      message + " ",
      el("a", { href: o.githubHref, target: "_blank", rel: "noopener noreferrer", text: "Open it on GitHub instead ↗" }),
    );
  };

  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), FETCH_TIMEOUT);
  fetch(`${o.endpoint}?path=${encodeURIComponent(o.path)}`, { signal: ctl.signal })
    .then(async (res) => {
      let data: unknown = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }
      if (!res.ok) throw Object.assign(new Error(String(res.status)), { userMessage: safeUserMessage(data) });
      return data as { content: string; sha: string; branch: string; signIn?: boolean };
    })
    .then((data) => {
      if (!overlay.isConnected) return;
      if (typeof data?.content !== "string" || typeof data.sha !== "string") throw new Error("bad source");
      source = data.content;
      baseSha = data.sha;
      branch = typeof data.branch === "string" ? data.branch : branch;
      signInOn = data.signIn === true;
      branchPill.lastChild!.textContent = branch;

      if (mode === "paragraph") {
        block = o.para ? findParagraph(source, o.para.textContent ?? "", pnum) : null;
        if (!block) {
          mode = "page";
          paraLabel.textContent = "";
          note.textContent = `We couldn’t find ¶${pnum} on its own in the page’s source (it may have changed since this page was published), so here is the whole page.`;
          note.hidden = false;
        }
      }
      if (mode === "paragraph" && block) {
        box.classList.add("tb-ed-para");
        const lines = source.split("\n");
        const n = block.text.split("\n").length;
        const before = lines.slice(Math.max(0, block.start - 3), block.start).join("\n").trim();
        const after = lines.slice(block.start + n, block.start + n + 3).join("\n").trim();
        ctxBefore.textContent = before.length > 220 ? `…${before.slice(-220)}` : before;
        ctxAfter.textContent = after.length > 220 ? `${after.slice(0, 220)}…` : after;
        ctxBefore.hidden = !before;
        ctxAfter.hidden = !after;
        original = block.text;
        foot.textContent = "You’re editing one paragraph, in Markdown. Your change is proposed to the editors, who decide whether it goes in.";
      } else {
        original = source;
        foot.textContent = "This is the page’s source, in Markdown. Your change is proposed to the editors, who decide whether it goes in.";
      }
      textarea.value = original;
      loading.remove();
      inner.append(box, foot);
      textarea.focus();
      textarea.setSelectionRange(0, 0);
    })
    .catch((err: { userMessage?: string | null } | null) => {
      if (!overlay.isConnected) return;
      loadFailed((err && err.userMessage) || "We couldn’t load this page’s source just now.");
    })
    .finally(() => clearTimeout(t));
};
