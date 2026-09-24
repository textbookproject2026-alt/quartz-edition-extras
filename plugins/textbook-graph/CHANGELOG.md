# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-09-24

Forked from `quartz-community/graph` at `46f0ba1c3c0cc484697572e7bcf315fa384d80d2`
(the commit quartz-book's `quartz.lock.json` pinned) into
`quartz-edition-extras/plugins/textbook-graph`.

### Added

- Nodes coloured by topic: frontmatter `topic:`, else the first tag (not `concept`).
  Eight categorical slots (`--tb-topic-1` … `-8`, `--tb-topic-other`), handed to the
  most-used topics at build time (`src/topics.ts`); the rest are "Other".
- Always-on labels at a constant screen size, decluttered: each label takes the first of
  four spots (above, below, right, left) clear of other labels and dots, else hides,
  most-linked first, a highlighted topic's pages before the rest; the current page
  and the hovered node and its neighbours always keep theirs. Titles over 28 characters are shortened until
  hovered.
- A topic legend under the local graph and along the bottom of the global graph.
  Choosing a topic highlights its pages.

### Changed

- The current page is a dark ring, not a colour. The visited colour (and its
  `graph-visited` localStorage key) is gone: colour means topic only.
