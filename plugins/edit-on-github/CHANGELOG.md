# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

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
