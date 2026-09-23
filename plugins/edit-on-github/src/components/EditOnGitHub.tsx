import { h } from "preact";
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
}

const defaultOptions: Options = {
  repo: "",
  branch: "main",
  contentDir: "content",
  suggestEndpoint: "",
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

/**
 * The controls row under the title (BOOK-ONE-TO-QUARTZ §1b, §8 step 5):
 * Edit on GitHub, View revision history, Suggest an edit, and the annotation
 * badge, which edition-integrations adds to the row when it is installed.
 *
 * Edit keeps class "edit-on-github" and its href shape: book two's post-build
 * form and edition-integrations both find the link by it.
 */
const EditOnGitHub: QuartzComponentConstructor<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts };

  const Component: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    const relativePath = fileData.relativePath;
    // Virtual pages (tag/folder listings, 404) have no source file — render
    // nothing. They can still have a relativePath (tags/index.md), not a filePath.
    if (!opts.repo || !fileData.filePath || !relativePath) return null;
    const path = repoPath(opts.contentDir, relativePath);
    const gh = encodePath(path);
    const link = (cls: string, href: string, text: string) =>
      h("a", { class: cls, href, target: "_blank", rel: "noopener noreferrer" }, text);
    return h(
      "div",
      { class: "tb-page-controls" },
      link(
        "edit-on-github",
        `https://github.com/${opts.repo}/edit/${opts.branch}/${gh}`,
        "Edit on GitHub ↗",
      ),
      link(
        "tb-history-link",
        `https://github.com/${opts.repo}/commits/${opts.branch}/${gh}`,
        "View revision history ↗",
      ),
      // Hidden until the page's script arms the modal, so a reader whose
      // scripts are blocked never meets a button that does nothing.
      opts.suggestEndpoint
        ? h(
            "button",
            {
              type: "button",
              class: "tb-suggest-btn",
              hidden: true,
              "data-endpoint": opts.suggestEndpoint,
              "data-path": path,
            },
            "Suggest an edit",
          )
        : null,
    );
  };

  Component.css = `
.tb-page-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 1rem;
  margin: 0 0 0.5rem 0;
}
.tb-page-controls a,
.tb-page-controls button.tb-suggest-btn {
  display: inline-block;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--gray);
  text-decoration: none;
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
.tb-page-controls button.tb-suggest-btn[hidden] { display: none; }
.tb-page-controls a:hover,
.tb-page-controls button.tb-suggest-btn:hover { color: var(--secondary); }
.tb-page-controls a:focus-visible,
.tb-page-controls button.tb-suggest-btn:focus-visible {
  outline: 2px solid var(--secondary);
  outline-offset: 2px;
}
`;
  Component.afterDOMLoaded = controlsScript;

  return Component;
};

export default EditOnGitHub;
