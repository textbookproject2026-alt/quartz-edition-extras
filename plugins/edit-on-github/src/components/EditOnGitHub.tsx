import { h } from "preact"
import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"

export interface Options {
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
