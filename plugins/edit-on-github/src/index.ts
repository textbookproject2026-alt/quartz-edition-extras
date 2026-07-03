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
 *
 * The component itself lives in src/components/EditOnGitHub.tsx and is built as
 * a separate "./components" bundle (see tsup.config.ts) because Quartz's
 * component loader (quartz/plugins/loader/componentLoader.ts) resolves a
 * plugin's manifest.components entries from the package's "./components"
 * subpath export, not from the main entry point.
 */
export { default as EditOnGitHub } from "./components/EditOnGitHub"
export type { EditOnGitHubOptions } from "./components"

// Re-export shared types from @quartz-community/types
export type {
  QuartzComponent,
  QuartzComponentProps,
  StringResource,
} from "@quartz-community/types"
