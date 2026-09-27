# home-link

The platform's home link: the Confused for Now logo, linking to the portal
(`https://confused4now.org/`). It is the first item in the left sidebar, above the
book's own title, on every page type. On a phone, where the sidebar is one row, it
takes a line of its own above that row, at the left. It scrolls with the page.

A plain `<a href>`: no script, so it works with `enableSPA: false`.

## Logos

Both logos are inline SVGs in the link, so there is no extra request and
`currentColor` follows light and dark mode. CSS shows one at a time:

- **Quartz's desktop breakpoint (1200px) and up:** `assets/logo-full.svg`.
- **Below it:** `assets/icon-only-logo.svg`.

`assets/text-only-logo.svg` isn't used; it is kept for later.

The SVGs are marked `aria-hidden="true" focusable="false"`; the link's
`aria-label` names it. Each file has no XML prologue or id, `fill="currentColor"`
on its root, and a viewBox cut to the drawn bounds, so its height is what shows.
The paths are the designer's, unchanged.

To change a logo, replace its file in `assets/` and run `npm run logos`, which
writes `src/components/logos.ts` (`npm run build` runs it first). A test fails if
the two disagree.

## Options

| Option  | Default                     | Notes                    |
| ------- | --------------------------- | ------------------------ |
| `url`   | `https://confused4now.org/` | Where the link goes.     |
| `label` | `Confused for Now (home)`   | The link's `aria-label`. |

## Style

From `design.yaml` in `edition-integrations`, so it changes there, not here:

- **Height:** `homeLink.height` (`--tb-home-link-height`), 32px, for the full logo;
  `homeLink.iconHeight` (`--tb-home-link-icon-height`), 28px, for the icon.
- **Colour:** the text colour (Quartz's `--dark`, the palette's `heading`);
  `accent` (`--secondary`) on hover and keyboard focus. Focus also draws a 2px
  ring in `accent`.

Without `edition-integrations` it falls back to 32px and 28px and Quartz's own
theme colours.

## In quartz-book

```yaml
- source:
    repo: "https://github.com/textbookproject2026-alt/quartz-edition-extras.git"
    subdir: plugins/home-link
    name: home-link
  enabled: true
  options:
    url: "https://confused4now.org/"
  layout:
    position: left
    priority: 5
```

Priority 5 puts it before `page-title` (10).

## Development

```
npm ci
npm run check
npm run build   # dist/ is committed: Quartz installs the plugin without building it
```
