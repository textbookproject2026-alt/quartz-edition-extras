import { h } from "preact";
import type { ComponentChildren } from "preact";
import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
// @ts-expect-error: .inline.ts is bundled to a browser script string by tsup.config.ts
import controlsScript from "./scripts/controls.inline";

export interface Options {
  /** "owner/repo" of THIS book's or edition's repository. */
  repo: string;
  branch: string;
  /**
   * The repository directory `quartz build -d` reads, relative to the repo root.
   * "content" is Quartz's default, which every edition and book two use. The
   * shared builder builds a book from its repo root and sets "".
   */
  contentDir: string;
  /**
   * The suggest-edit function's URL. "" (the default) hides "Suggest an edit":
   * the function answers 403 to an origin the registry doesn't list, and an
   * edition's origin isn't listed.
   */
  suggestEndpoint: string;
  /**
   * The in-site editor: with a suggestEndpoint set, "Edit on GitHub ↗" becomes
   * "Edit this page", which opens a GitHub-style editor on the page itself, and
   * numbered paragraphs get a pencil. Proposals go to the same function's
   * /api/propose-edit, a sibling of suggestEndpoint. false keeps the plain
   * GitHub link. Without scripts the link still goes to GitHub either way.
   */
  editor: boolean;
  /**
   * The platform function's /api/page-revision for this book
   * (".../api/page-revision?book=<slug>"). Set by the shared builder for every
   * book it builds, which also writes each page's revision list to
   * /.well-known/history/<slug>.json. With it (and the editor on), "History"
   * opens the page's revisions on the site; without it, or without scripts,
   * the link goes to GitHub's history of the file.
   */
  revisionEndpoint: string;
  /**
   * What the page was built from, stamped on its controls row: the source
   * commit (data-source-commit) and each file's git blob sha by repo path
   * (data-source-blob). Set by the shared builder. The editor compares the blob
   * with the one it loads from drafts and says when unpublished changes are
   * waiting.
   */
  sourceCommit: string;
  sourceBlobs: Record<string, string>;
  /** Who wrote the book, as the registry gives it ("A Name, B Name"): Cite this page. */
  authors: string;
  /** The book's SPDX licence id ("CC-BY-SA-4.0"): Cite this page's attribution line. */
  licence: string;
  /** The page that explains the ways to contribute, relative to the site root. */
  howTo: string;
}

const defaultOptions: Options = {
  repo: "",
  branch: "main",
  contentDir: "content",
  suggestEndpoint: "",
  editor: true,
  revisionEndpoint: "",
  sourceCommit: "",
  sourceBlobs: {},
  authors: "",
  licence: "",
  howTo: "how-to-comment",
};

/** Where the builder writes a page's revision list (quartz-book's HISTORY_DIR). */
export const historyUrl = (slug: string): string => `/.well-known/history/${encodePath(slug)}.json`;

/** /api/propose-edit beside the configured /api/suggest-edit. "" if it can't be derived. */
export const proposeEndpoint = (suggestEndpoint: string): string => {
  try {
    return new URL("propose-edit", suggestEndpoint).toString();
  } catch {
    return "";
  }
};

/**
 * The page's repo path: the -d directory joined to Quartz's relativePath, which
 * is relative to that directory. (fileData.filePath is relative to Quartz's
 * working directory, so a build of a checkout elsewhere put that checkout's
 * name in the link.)
 */
export const repoPath = (contentDir: string, relativePath: string): string =>
  [...contentDir.split("/"), ...relativePath.split("/")]
    .filter((seg) => seg !== "" && seg !== ".")
    .join("/");

/** encodeURIComponent per segment: a space is %20, "/" stays the separator. */
export const encodePath = (path: string): string =>
  path.split("/").map(encodeURIComponent).join("/");

/** A folder's name as a reader would say it: "chapters" -> "Chapters". */
export const folderName = (segment: string): string => {
  const words = segment.replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

/** The site root from a page's slug, as a relative href ("./", "../", ...). */
export const rootOf = (slug: string): string => {
  const depth = slug.split("/").length - 1;
  return depth > 0 ? "../".repeat(depth) : "./";
};

const SVG = (d: string) =>
  h(
    "svg",
    { viewBox: "0 0 16 16", width: 16, height: 16, "aria-hidden": "true", focusable: "false" },
    h("path", { d, fill: "currentColor" }),
  );
// Octicons (MIT): search, pencil, comment.
const SEARCH =
  "M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z";
const PENCIL =
  "M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Zm-2.677 2.323L3.64 10.92a.25.25 0 0 0-.064.108l-.558 1.953 1.953-.558a.25.25 0 0 0 .108-.064l6.11-6.11Z";
const COMMENT =
  "M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z";

/** The one-line explanations under each Contribute item (D). */
export const SUBTITLES = {
  edit: "GitHub sign-in · reviewed before it's published",
  github: "Opens the file on GitHub · needs a GitHub account",
  note: "No account · goes to the authors as a GitHub issue, visible on the book's repository, not on this page",
  comment: "Hypothes.is account · anyone reading the book can see it",
  explain: "Who sees each one, and which account it needs",
} as const;

/**
 * The sticky header on every page (A): the book's title and where the page sits
 * on the left; Search, Contribute ▾, Annotate, Appearance (Aa) and ⋯ on the
 * right, icons only on a phone.
 *
 * Contribute (D) holds what was the controls row: Edit this page (or Edit on
 * GitHub, where there's no editor), Note to the authors (the suggest-an-edit
 * form), Public comment, How contributing works. ⋯ (F) holds Cite, Print, Page
 * history, What links here, Download as Markdown and View source. Annotate and
 * Appearance are run by edition-integrations' window.tbAnnotations and
 * window.tbPrefs; every button stays hidden until its script arms it, and a
 * reader without scripts gets the plain GitHub links.
 *
 * The root keeps class "tb-page-controls" and the data-source-* stamp, and Edit
 * keeps class "edit-on-github" and its href shape: book two's post-build form,
 * edition-integrations and the editor find them by those. A page with no source
 * file (a folder or tag listing, the builder's own pages: frontmatter
 * tbBuilderPage) gets the header without the items that need one.
 */
const EditOnGitHub: QuartzComponentConstructor<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts };

  const Component: QuartzComponent = ({ fileData, cfg }: QuartzComponentProps) => {
    const slug = String(fileData.slug ?? "");
    const relativePath = fileData.relativePath;
    const fm = (fileData.frontmatter ?? {}) as Record<string, unknown>;
    // Virtual pages (tag/folder listings, 404) have no source file. They can
    // still have a relativePath (tags/index.md), not a filePath.
    const hasSource = Boolean(
      opts.repo && fileData.filePath && relativePath && fm.tbBuilderPage !== true,
    );
    const path = hasSource ? repoPath(opts.contentDir, relativePath!) : "";
    const gh = encodePath(path);
    const sha = opts.sourceCommit || opts.branch;
    const root = rootOf(slug);
    const editEndpoint =
      hasSource && opts.editor && opts.suggestEndpoint ? proposeEndpoint(opts.suggestEndpoint) : "";
    const blob = hasSource ? opts.sourceBlobs[path] : undefined;
    const editHref = `https://github.com/${opts.repo}/edit/${opts.branch}/${gh}`;
    const historyHref = `https://github.com/${opts.repo}/commits/${opts.branch}/${gh}`;

    const item = (
      tag: "a" | "button",
      attrs: Record<string, unknown>,
      title: string,
      subtitle?: string,
    ) =>
      h(
        tag,
        {
          role: "menuitem",
          tabindex: -1,
          ...(tag === "button" ? { type: "button" } : {}),
          ...attrs,
          class: ["tb-mi", attrs.class].filter(Boolean).join(" "),
        },
        h("span", { class: "tb-mi-t" }, title),
        subtitle ? h("span", { class: "tb-mi-s" }, subtitle) : null,
      );
    const away = { target: "_blank", rel: "noopener noreferrer" };
    const btn = (attrs: Record<string, unknown>, icon: ComponentChildren, label: string) =>
      h(
        "button",
        { type: "button", class: "tb-hdr-btn", hidden: true, ...attrs },
        icon,
        h("span", { class: "tb-hdr-label" }, label),
      );
    const menu = (id: string, label: string, ...items: ComponentChildren[]) =>
      h("div", { class: "tb-menu", id, role: "menu", "aria-label": label, hidden: true }, ...items);

    const folders = slug.split("/").slice(0, -1);
    const crumbs = folders.map((seg, i) =>
      h("a", { href: root + folders.slice(0, i + 1).join("/") + "/" }, folderName(seg)),
    );

    const contribute = [
      hasSource
        ? editEndpoint
          ? item(
              "a",
              {
                class: "edit-on-github",
                href: editHref,
                ...away,
                "data-edit-endpoint": editEndpoint,
                "data-path": path,
                "data-repo": opts.repo,
              },
              "Edit this page",
              SUBTITLES.edit,
            )
          : item("a", { class: "edit-on-github", href: editHref, ...away }, "Edit on GitHub ↗", SUBTITLES.github)
        : null,
      // Hidden until the script arms the form, so it is never a dead control.
      hasSource && opts.suggestEndpoint
        ? item(
            "button",
            { class: "tb-suggest-btn", hidden: true, "data-endpoint": opts.suggestEndpoint, "data-path": path },
            "Note to the authors",
            SUBTITLES.note,
          )
        : null,
      item("button", { "data-tb-comment": "", hidden: true }, "Public comment", SUBTITLES.comment),
      item("button", { "data-tb-explain": "" }, "How contributing works", SUBTITLES.explain),
    ];

    const more = [
      item("button", { "data-tb-cite": "" }, "Cite this page"),
      item("button", { "data-tb-print": "" }, "Print / save as PDF"),
      // With a revision endpoint the page script opens the History panel; the
      // href stays GitHub's history of the file, the fallback.
      hasSource
        ? item(
            "a",
            opts.editor && opts.revisionEndpoint && slug
              ? {
                  class: "tb-history-link",
                  href: historyHref,
                  ...away,
                  "data-revision-endpoint": opts.revisionEndpoint,
                  "data-history": historyUrl(slug),
                  "data-path": path,
                  "data-repo": opts.repo,
                  "data-branch": opts.branch,
                }
              : { class: "tb-history-link", href: historyHref, ...away },
            opts.editor && opts.revisionEndpoint && slug ? "Page history" : "Page history ↗",
          )
        : null,
      item("button", { "data-tb-backlinks": "" }, "What links here"),
      hasSource
        ? item(
            "button",
            {
              "data-tb-download": `https://raw.githubusercontent.com/${opts.repo}/${sha}/${gh}`,
              "data-file": path.split("/").pop(),
            },
            "Download as Markdown",
          )
        : null,
      hasSource
        ? item("a", { href: `https://github.com/${opts.repo}/blob/${sha}/${gh}`, ...away }, "View source ↗")
        : null,
    ];

    return h(
      "div",
      {
        class: "tb-header tb-page-controls",
        "data-book-title": cfg?.pageTitle ?? "",
        "data-page-title": typeof fm.title === "string" ? fm.title : "",
        "data-authors": opts.authors,
        "data-licence": opts.licence,
        "data-how-to": root + opts.howTo,
        ...(hasSource ? { "data-source-path": path } : {}),
        ...(hasSource && opts.sourceCommit ? { "data-source-commit": opts.sourceCommit } : {}),
        ...(blob ? { "data-source-blob": blob } : {}),
      },
      h(
        "div",
        { class: "tb-hdr-where" },
        h("a", { class: "tb-hdr-title", href: root }, cfg?.pageTitle ?? ""),
        crumbs.length
          ? h("nav", { class: "tb-hdr-crumbs", "aria-label": "Breadcrumb" }, ...crumbs)
          : null,
      ),
      h(
        "div",
        { class: "tb-hdr-actions" },
        btn({ "data-tb-search": "", "aria-keyshortcuts": "Control+K Meta+K" }, SVG(SEARCH), "Search"),
        h(
          "div",
          { class: "tb-hdr-wrap" },
          btn(
            {
              "data-tb-contribute": "",
              "aria-haspopup": "menu",
              "aria-expanded": "false",
              "aria-controls": "tb-contribute-menu",
            },
            SVG(PENCIL),
            "Contribute ▾",
          ),
          menu("tb-contribute-menu", "Contribute", ...contribute),
        ),
        btn(
          { "data-tb-annotate": "" },
          SVG(COMMENT),
          "Annotate",
        ),
        h(
          "div",
          { class: "tb-hdr-wrap" },
          btn(
            { "data-tb-appearance": "", "aria-expanded": "false", "aria-controls": "tb-appearance" },
            h("span", { class: "tb-hdr-glyph", "aria-hidden": "true" }, "Aa"),
            "Appearance",
          ),
          h("div", { class: "tb-panel", id: "tb-appearance", role: "dialog", "aria-label": "Appearance", hidden: true }),
        ),
        h(
          "div",
          { class: "tb-hdr-wrap" },
          btn(
            { "data-tb-more": "", "aria-haspopup": "menu", "aria-expanded": "false", "aria-controls": "tb-more-menu" },
            h("span", { class: "tb-hdr-glyph", "aria-hidden": "true" }, "⋯"),
            "More",
          ),
          menu("tb-more-menu", "More", ...more),
        ),
        h("span", { class: "tb-hdr-status", role: "status" }),
      ),
      // Without scripts the menus can't open: the plain links, as the row had.
      hasSource
        ? h(
            "noscript",
            null,
            h("a", { class: "tb-hdr-plain", href: editHref, ...away }, "Edit on GitHub ↗"),
            h("a", { class: "tb-hdr-plain", href: historyHref, ...away }, "View revision history ↗"),
          )
        : null,
    );
  };

  // Every value from edition-integrations' design.yaml tokens, with this
  // plugin's own fallbacks where it isn't installed. No colour of its own.
  Component.css = `
/* Sticky across the whole centre column: the header's wrappers stop being boxes,
   so its containing block is .center, not the short .page-header. */
.center > .page-header,
.center > .page-header > .popover-hint { display: contents; }
.tb-header {
  position: sticky;
  top: 0;
  z-index: 1;
  /* Its own width decides icons-only: a phone, or a centre column squeezed by the
     open annotation sidebar. */
  container: tb-header / inline-size;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: var(--tb-header-h, 3.25rem);
  margin: 0 0 1.5rem;
  padding: 0.4rem 0;
  box-sizing: border-box;
  border-bottom: 1px solid var(--tb-border, var(--lightgray));
  background: var(--tb-bg, var(--light));
  font-family: var(--tb-font-ui, sans-serif);
  font-size: var(--tb-size-controls, 0.85rem);
  line-height: 1.3;
}
/* The sidebars hold Quartz's search overlay, the graph's full view and the phone
   menu: they stack above the header. */
#quartz-body > .sidebar { z-index: 2; }
/* Search lives in the header now; Quartz's own button stays, unseen, for its overlay. */
.left.sidebar .search > .search-button { display: none; }
.popover .tb-header { display: none; }
.tb-hdr-where { display: flex; align-items: baseline; gap: 0.6rem; min-width: 0; flex: 1 1 auto; }
.tb-hdr-title {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 700;
  font-size: 1rem;
  color: var(--tb-ink, var(--dark));
  text-decoration: none;
}
.tb-hdr-crumbs { display: flex; gap: 0.4rem; white-space: nowrap; color: var(--tb-muted, var(--gray)); }
.tb-hdr-crumbs a { color: inherit; text-decoration: none; }
.tb-hdr-crumbs a::before { content: "›"; margin-right: 0.4rem; color: var(--tb-faint, var(--gray)); }
.tb-hdr-title:hover, .tb-hdr-crumbs a:hover { color: var(--tb-accent, var(--secondary)); }
.tb-hdr-actions { display: flex; align-items: center; gap: 0.25rem; flex: 0 0 auto; }
.tb-hdr-wrap { position: relative; }
.tb-hdr-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 2.25rem;
  padding: 0.3rem 0.6rem;
  border: 1px solid transparent;
  border-radius: 6px;
  background: none;
  color: var(--tb-muted, var(--darkgray));
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}
.tb-hdr-btn[hidden] { display: none; }
.tb-hdr-btn:hover, .tb-hdr-btn[aria-expanded="true"] {
  border-color: var(--tb-border, var(--lightgray));
  background: var(--tb-bg-soft, var(--lightgray));
  color: var(--tb-ink, var(--dark));
}
.tb-hdr-btn:focus-visible, .tb-mi:focus-visible, .tb-header a:focus-visible, .tb-panel :focus-visible {
  outline: 2px solid var(--tb-accent, var(--secondary));
  outline-offset: 2px;
}
.tb-hdr-glyph { font-weight: 700; min-width: 1rem; text-align: center; }
.tb-anno-count:not(:empty) {
  padding: 0 0.4rem;
  border-radius: 999px;
  background: var(--tb-accent-wash, var(--highlight));
  color: var(--tb-accent, var(--secondary));
  font-size: 0.75rem;
}
.tb-menu, .tb-panel {
  position: absolute;
  right: 0;
  top: calc(100% + 0.35rem);
  z-index: 3;
  width: max-content;
  max-width: min(24rem, calc(100vw - 2rem));
  padding: 0.35rem;
  border: 1px solid var(--tb-border, var(--lightgray));
  border-radius: 10px;
  background: var(--tb-bg, var(--light));
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
}
.tb-menu[hidden], .tb-panel[hidden] { display: none; }
.tb-mi {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  width: 100%;
  padding: 0.5rem 0.65rem;
  border: 0;
  border-radius: 6px;
  background: none;
  color: var(--tb-ink, var(--dark));
  font: inherit;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
}
.tb-mi[hidden] { display: none; }
.tb-mi:hover, .tb-mi:focus { background: var(--tb-bg-soft, var(--lightgray)); }
.tb-mi[aria-disabled="true"] { color: var(--tb-faint, var(--gray)); cursor: default; background: none; }
.tb-mi-t { font-weight: 600; }
.tb-mi-s { max-width: 21rem; color: var(--tb-muted, var(--gray)); font-size: 0.8rem; line-height: 1.35; white-space: normal; }
.tb-panel { width: 17rem; padding: 0.75rem 0.85rem; }
.tb-panel fieldset { margin: 0 0 0.7rem; padding: 0; border: 0; }
.tb-panel fieldset:last-of-type { margin-bottom: 0; }
.tb-panel legend { margin-bottom: 0.3rem; padding: 0; font-weight: 700; color: var(--tb-ink, var(--dark)); }
.tb-panel .tb-seg { display: flex; flex-wrap: wrap; gap: 0.25rem; }
.tb-panel .tb-seg label {
  display: inline-flex; align-items: center; gap: 0.3rem;
  padding: 0.25rem 0.55rem; border: 1px solid var(--tb-border, var(--lightgray)); border-radius: 999px;
  color: var(--tb-ink, var(--dark)); cursor: pointer;
}
.tb-panel .tb-seg label:has(input:checked) {
  border-color: var(--tb-accent, var(--secondary));
  background: var(--tb-accent-wash, var(--highlight));
  color: var(--tb-accent, var(--secondary));
}
.tb-panel .tb-seg input { margin: 0; accent-color: var(--tb-accent, var(--secondary)); }
.tb-panel .tb-panel-note { margin: 0.4rem 0 0; color: var(--tb-muted, var(--gray)); }
.tb-panel .tb-panel-note button { margin-left: 0.3rem; }
.tb-hdr-status:empty { display: none; }
.tb-hdr-status {
  position: absolute; right: 0; top: calc(100% + 0.35rem); padding: 0.35rem 0.7rem; border-radius: 999px;
  background: var(--tb-ink, var(--dark)); color: var(--tb-bg, var(--light));
}
.tb-hdr-plain { margin-left: 0.75rem; color: var(--tb-muted, var(--gray)); font-weight: 600; }
/* A narrow header (a phone, or the centre column beside the open annotation
   sidebar): icons only, each keeping its name for assistive tech; the title gets
   the rest of the row, and a menu opens the header's full width. */
@container tb-header (max-width: 640px) {
  .tb-hdr-where, .tb-hdr-actions { gap: 0.3rem; }
  .tb-hdr-crumbs { display: none; }
  .tb-hdr-btn { padding: 0.3rem 0.5rem; }
  .tb-hdr-label {
    position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden;
    clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0;
  }
  .tb-hdr-wrap { position: static; }
  .tb-menu, .tb-panel { left: 0; right: 0; width: auto; max-width: none; }
}
@media (max-width: 800px) {
  .tb-header { gap: 0.4rem; margin-bottom: 1rem; }
}
.tb-dialog {
  width: min(34rem, calc(100vw - 2rem));
  max-height: calc(100vh - 4rem);
  padding: 1.25rem 1.4rem;
  border: 1px solid var(--tb-border, var(--lightgray));
  border-radius: 12px;
  background: var(--tb-bg, var(--light));
  color: var(--tb-ink, var(--dark));
  font-family: var(--tb-font-ui, sans-serif);
  font-size: 0.95rem;
  line-height: 1.5;
}
.tb-dialog::backdrop { background: rgba(0, 0, 0, 0.45); }
.tb-dialog h2 { margin: 0 2rem 0.6rem 0; font-size: 1.2rem; }
.tb-dialog h3 { margin: 1rem 0 0.25rem; font-size: 1rem; }
.tb-dialog p { margin: 0.25rem 0; }
.tb-dialog a { color: var(--tb-accent, var(--secondary)); }
.tb-dialog-x {
  position: absolute; top: 0.6rem; right: 0.7rem; border: 0; background: none;
  color: var(--tb-faint, var(--gray)); font-size: 1.4rem; line-height: 1; cursor: pointer;
}
.tb-dialog-row { display: flex; align-items: center; justify-content: flex-end; gap: 0.6rem; margin-top: 0.75rem; }
.tb-route { padding-top: 0.1rem; }
.tb-cite-text { padding: 0.6rem 0.75rem; border-radius: 8px; background: var(--tb-bg-soft, var(--lightgray)); overflow-wrap: anywhere; }
.tb-cite-said { color: var(--tb-muted, var(--gray)); }
.tb-btn {
  padding: 0.35rem 0.9rem; border: 1px solid var(--tb-border, var(--lightgray)); border-radius: 6px;
  background: var(--tb-bg, var(--light)); color: var(--tb-ink, var(--dark)); font: inherit; font-weight: 600; cursor: pointer;
}
.tb-btn-primary { border-color: var(--tb-accent, var(--secondary)); background: var(--tb-accent, var(--secondary)); color: var(--tb-bg, var(--light)); }
.tb-btn:focus-visible, .tb-dialog-x:focus-visible, .tb-dialog a:focus-visible {
  outline: 2px solid var(--tb-accent, var(--secondary)); outline-offset: 2px;
}
@media print { .tb-header, .tb-dialog { display: none !important; } }
`;
  Component.afterDOMLoaded = controlsScript;

  return Component;
};

export default EditOnGitHub;
