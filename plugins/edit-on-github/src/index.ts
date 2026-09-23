/**
 * edit-on-github — Quartz v5 component plugin.
 *
 * The controls row under each page's title (BOOK-ONE-TO-QUARTZ §1b, §8 step 5):
 * "Edit on GitHub ↗", "View revision history ↗", and, when `suggestEndpoint` is
 * set, "Suggest an edit" (book one's modal, ported from publish.js). Unlike
 * publish.js, which reverse-mapped Obsidian Publish URLs to .md paths, Quartz
 * hands us the source path: fileData.relativePath is relative to the -d
 * directory, and `contentDir` says where that directory sits in the repo.
 *
 * Scaffolding: replaces src/index.ts in a fresh clone of
 * github.com/quartz-community/plugin-template. Keep tsup.config.ts / tsconfig.json.
 * In package.json change only:
 *   "name": "edit-on-github",
 *   "description": "Per-page Edit on GitHub link for textbook editions",
 *   "quartz": { "category": ["component"] }
 * Then: npm i && npm run build — and COMMIT dist/.
 *
 * Placement and options are set in quartz.config.yaml:
 *   options: { repo: "OWNER/REPO", branch: main, contentDir: content, suggestEndpoint: "" }
 *   layout:  { position: beforeBody, priority: 25 }
 *
 * The component itself lives in src/components/EditOnGitHub.tsx and is built as
 * a separate "./components" bundle (see tsup.config.ts) because Quartz's
 * component loader (quartz/plugins/loader/componentLoader.ts) resolves a
 * plugin's manifest.components entries from the package's "./components"
 * subpath export, not from the main entry point.
 */
export { default as EditOnGitHub } from "./components/EditOnGitHub";
export type { EditOnGitHubOptions } from "./components";

// Re-export shared types from @quartz-community/types
export type {
  QuartzComponent,
  QuartzComponentProps,
  StringResource,
} from "@quartz-community/types";
