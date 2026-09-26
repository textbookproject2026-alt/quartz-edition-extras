# home-link

The platform's home link: _confused for now_, in italics, linking to the portal
(`https://confused4now.org/`). It is the first item in the left sidebar, above the
book's own title, on every page type. On a phone, where the sidebar is one row, it
takes a line of its own above that row, at the left. It scrolls with the page.

A plain `<a href>`: no script, so it works with `enableSPA: false`.

## Options

| Option  | Default                     | Notes                  |
| ------- | --------------------------- | ---------------------- |
| `url`   | `https://confused4now.org/` | Where the link goes.   |
| `label` | `confused for now`          | The words, in italics. |

## Style

From `design.yaml` in `edition-integrations`, so it changes there, not here:

- **Size:** `homeLink.size` (`--tb-size-home-link`), 0.85rem.
- **Colour:** the palette's `faint` (Quartz's `--gray`); `accent` (`--secondary`) on
  hover and keyboard focus, when it also gains its underline.
- **Font:** the body font (`fonts.text`).

Without `edition-integrations` it falls back to 0.85rem and Quartz's own theme
colours.

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
