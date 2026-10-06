# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Reader settings, applied in <head> before first paint (`readerPrefs`,
  `window.tbPrefs`): theme Auto/Light/Dark on Quartz's `theme` key, text size
  Small/Standard/Large (the chapter only), width Standard/Wide, paragraph numbers
  (`tb-pnum`, the old toggle's key; its button moved to edit-on-github's
  Appearance panel) and public annotations (`tb-annotations`: off loads no
  embed.js). `window.tbAnnotations` opens the sidebar, turning annotations on
  first, or turns them off mid-page (highlights hidden, sidebar collapsed, the
  client's tab goes on reload). `onLayoutChange` sets `--tb-hypothesis-width`, and
  the page makes room for the open sidebar at 1024px and up. design.yaml's
  `layout.measure` is now ems of body text (36, about 70 characters; `wideMeasure`
  48), with `layout.headerHeight` for the sticky header. The annotation badge
  counts on the header's Annotate.

### Added

- `explorerOrder`: the book's reading order, as slugs (the builder reads the links under
  "## Contents" in index.md). The explorer lists pages in that order, so Introduction comes
  before Chapter 1 instead of after Chapter 11; a folder ranks by its first listed page,
  and unlisted pages follow in the explorer's own order. Default `[]` keeps the
  explorer's order and adds no script.

### Fixed

- Opening a page no longer scrolls it down. Quartz's explorer scrolled the current page's
  entry into view with `scrollIntoView`, which moved the window as well (a chapter opened
  at 1280x800 loaded at scrollY 692). Now only the explorer's list scrolls, and a page
  opens at its top. Always on.

### Added

- Following a link to a place on a page flashes that place in the `mark` colour for three
  seconds, as Publish does, and stops it 3.75rem below the top edge. This covers a citation
  jumping to its reference, the same link clicked again, and a page opened at a
  `#fragment`. Always on, like the block-reference fix it completes
  (BOOK-ONE-TO-QUARTZ proof run, F5).
- Paragraph numbers: body paragraphs are numbered (`data-pnum`, `id="p<n>"`) on every
  page but the home page, drawn in the margin by CSS so Hypothes.is anchors don't move.
  Clicking a number copies its link. A "¶ Numbers" toggle in the controls row, remembered
  per browser. Options: `paragraphNumbers` (default on); frontmatter
  `paragraphNumbers: false|true` per page.
- `design.yaml`, the design values, read when a book builds: the palette and
  fonts (overriding the config's theme block), the `--tb-*` tokens, the type
  scale, the lead paragraph, the annotation highlight and print styles
  (BOOK-ONE-TO-QUARTZ §8 step 6).
- Initial Quartz community plugin template.
