# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-09-27

### Changed

- The link is the Confused for Now logo, not text: the full logo at Quartz's
  desktop breakpoint (1200px) and up, the icon below it. Both are inline SVGs in
  `currentColor`, generated from `assets/` into `src/components/logos.ts`
  (`npm run logos`), hidden from assistive tech; the link is named by `label`,
  now "Confused for Now (home)".
- Heights from design.yaml's `homeLink.height` (32px) and `homeLink.iconHeight`
  (28px), replacing `homeLink.size`. The colour is the text colour (`--dark`),
  `accent` on hover and focus, with a focus ring.

### Added

- `assets/text-only-logo.svg`, unused, kept for later.

## [0.1.0] - 2026-09-26

### Added

- `HomeLink`: _confused for now_, linking to the portal, first in the left sidebar
  above the book's title. On a phone it takes its own line above the sidebar row.
  Size from design.yaml's `homeLink.size`, colours from its palette (`faint`, and
  `accent` on hover and focus).
