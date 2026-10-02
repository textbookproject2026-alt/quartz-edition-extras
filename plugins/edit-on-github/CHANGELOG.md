# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- The History panel: with `revisionEndpoint` set (the shared builder sets it for every
  book) and the editor on, "View revision history ↗" becomes "History", which lists the
  page's published revisions (the builder's `/.well-known/history/<slug>.json`) in the
  editor's overlay. Opening one loads its diff (the editor's Changes view) and the page
  as it was from the platform function's `/api/page-revision`. No-script and modified
  clicks still go to GitHub. Events `page_history_opened`, `page_revision_opened`.
- The in-site editor: with `suggestEndpoint` set, "Edit on GitHub ↗" becomes "Edit
  this page", a GitHub-style editor (Edit / Preview / Changes, Propose changes) that
  sends a pull request into the book's drafts branch through the platform function's
  `/api/propose-edit`, anonymously or signed in with GitHub. Numbered paragraphs get a
  pencil that opens it on one paragraph. Option `editor` (default `true`). Events
  `page_editor_opened`, `page_edit_submitted`, `github_signin`.
- Initial Quartz community plugin template.
