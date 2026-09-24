# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Paragraph numbers: body paragraphs are numbered (`data-pnum`, `id="p<n>"`) on every
  page but the home page, drawn in the margin by CSS so Hypothes.is anchors don't move.
  Clicking a number copies its link. A "¶ Numbers" toggle in the controls row, remembered
  per browser. Options: `paragraphNumbers` (default on); frontmatter
  `paragraphNumbers: false|true` per page.
- Page views: "n views" in the controls row from the platform's page-views endpoint.
  Options: `viewsEndpoint`, `bookSlug` (both set by quartz-book from the registry).
- `design.yaml`, the design values, read when a book builds: the palette and
  fonts (overriding the config's theme block), the `--tb-*` tokens, the type
  scale, the lead paragraph, the annotation highlight and print styles
  (BOOK-ONE-TO-QUARTZ §8 step 6).
- Initial Quartz community plugin template.
