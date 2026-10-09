# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Page history is a timeline: Being edited (proposed, then drafts) above Published,
  releases as milestones, Show changes, Read this version (with a banner) and
  Compare. Book history (⋯) and the /history page's script: proposed dots, tap to
  read a dot, the book's timeline with filters. Dates from history.json show the
  same day in every time zone.

### Changed

- The History panel dresses as the reader's header: the --tb-* tokens (light and
  dark), the UI font for controls and the text font for what changed. Its header is
  "Page history › <page title>" with a Close button; no repo, file path or branch.
  Rows say what changed in plain words (`summary()`: "Paragraph 12 changed", "Text
  changed", "First published"; people's own messages stay) and "Published <date>, by
  <name>". The history link no longer carries data-repo/data-branch.
- The History panel's What changed (rich-diff.ts) hides the front matter and shows
  each line as the page does: headings, bold, italics, links, lists and quotes as
  formatting, not their marks. Removed and added lines are tinted; within a changed
  line the removed and added words are <del>/<ins>. "Only the page's details
  changed" when only the front matter did.
- The controls row is now a sticky header on every page: the book's title and the
  page's place on the left; Search (Quartz's own, also Cmd/Ctrl-K), Contribute ▾,
  Annotate, Appearance (Aa) and ⋯ on the right, icons only on a phone. Contribute
  holds Edit this page (or Edit on GitHub ↗ without an editor), Note to the authors
  (the suggest form), Public comment and How contributing works, each with a
  one-line subtitle. ⋯ holds Cite this page (APA 7 and a CC attribution line, each
  with Copy), Print, Page history, What links here, Download as Markdown and View
  source at the build's commit. A first Contribute, pencil or Annotate on a site
  shows how contributing works, once. Options `authors`, `licence`, `howTo`; a
  page with frontmatter `tbBuilderPage: true` gets the header without the items
  that need a source file. Every menu and panel: aria-expanded, Escape closes it
  and gives focus back.

- The in-site editor needs GitHub sign-in, asked for before the source loads: a reader
  who isn't signed in gets a "Sign in with GitHub" panel (the popup, so the page and
  paragraph stay put) and a one-line pointer to "Suggest an edit", which needs no
  account. The name-and-email path is gone from the editor.
- The editor is one history entry on the page (`#edit`, or `#edit-<¶>` for a
  paragraph). Back, Escape, Cancel and × close it back to the page at the scroll
  position it was opened from; a reload with `#edit` reopens it; Forward reopens it.
  Before, Back left the page for the one before it (often the chapters listing).

### Added

- Options `sourceCommit` and `sourceBlobs` (set by the shared builder): the controls
  row carries `data-source-path`, `data-source-commit` and `data-source-blob`. When the
  drafts blob the editor loads differs from the built one, it says "This page has
  changes waiting for review; you're editing the latest draft."

- The History panel: with `revisionEndpoint` set (the shared builder sets it for every
  book) and the editor on, "View revision history ↗" becomes "History", which lists the
  page's published revisions (the builder's `/.well-known/history/<slug>.json`) in the
  editor's overlay. Opening one loads its diff (the editor's Changes view) and the page
  as it was from the platform function's `/api/page-revision`. No-script and modified
  clicks still go to GitHub. Events `page_history_opened`, `page_revision_opened`.
- The in-site editor: with `suggestEndpoint` set, "Edit on GitHub ↗" becomes "Edit
  this page", a GitHub-style editor (Edit / Preview / Changes, Propose changes) that
  sends a pull request into the book's drafts branch through the platform function's
  `/api/propose-edit`, signed in with GitHub. Numbered paragraphs get a
  pencil that opens it on one paragraph. Option `editor` (default `true`). Events
  `page_editor_opened`, `page_edit_submitted`, `github_signin`.
- Initial Quartz community plugin template.
