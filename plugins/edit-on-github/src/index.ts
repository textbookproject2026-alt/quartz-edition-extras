/**
 * edit-on-github — Quartz v5 component plugin.
 *
 * Renders an "Edit on GitHub ↗" link on each page. Unlike the canonical site's
 * publish.js (which has to reverse-map Obsidian Publish URLs back to .md paths),
 * Quartz hands us the true source path directly: fileData.filePath is
 * repo-relative (e.g. "content/chapters/01-introduction.md"), so the edit URL
 * is just repo + branch + filePath. Nothing to break when slugs change.
 *
 * Scaffolding: replaces src/index.ts in a fresh clone of
 * github.com/quartz-community/plugin-template. Keep tsup.config.ts / tsconfig.json.
 * In package.json change only:
 *   "name": "edit-on-github",
 *   "description": "Per-page Edit on GitHub link for textbook editions",
 *   "quartz": { "category": ["component"] }
 * Then: npm i && npm run build — and COMMIT dist/.
 *
 * Placement + per-edition repo/branch are set in quartz.config.yaml:
 *   options: { repo: "OWNER/REPO", branch: main }
 *   layout:  { position: beforeBody, priority: 25 }
 */
import { h } from "preact"
import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"

interface Options {
  /** "owner/repo" of THIS edition's repository — each edition sets its own. */
  repo: string
  branch: string
}

const defaultOptions: Options = {
  repo: "",
  branch: "main",
}

const EditOnGitHub: QuartzComponentConstructor<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }

  const Component: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    const filePath = fileData.filePath
    // Virtual pages (tag/folder listings, 404) have no source file — render nothing.
    if (!opts.repo || !filePath) return null
    const href = `https://github.com/${opts.repo}/edit/${opts.branch}/${filePath}`
    return h(
      "a",
      { class: "edit-on-github", href, target: "_blank", rel: "noopener noreferrer" },
      "Edit on GitHub ↗",
    )
  }

  Component.css = `
.edit-on-github {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--gray);
  text-decoration: none;
  margin: 0 0 0.5rem 0;
}
.edit-on-github:hover { color: var(--secondary); }
`

  return Component
}

export default EditOnGitHub