# quartz-edition-extras

The Quartz v5 plugins that the platform's books (quartz-book) and department editions
install at build time. Nothing else lives here.

**Every department edition builds against this repository.** The edition template's
`quartz.config.yaml` names it by URL, and each edition's `quartz.lock.json` pins a
specific commit of it. If this repo is deleted, renamed or made private, the next
build of every edition fails — and nothing in the failure points here. Treat it as
production infrastructure, not a scratch repo.

- **Canonical textbook:** `textbookproject2026-alt/ontology-for-social-research-a-criti`, since 27 Sep 2026 (textbook-edition-template #12). The previous one, `textbookproject2026-alt/textbook` (book one), was retired from the platform that day (textbook-registry #54). The plugins serve the edition template and every book on the builder.
- **Edition template (consumer of this repo):** `textbookproject2026-alt/textbook-edition-template`
- **Platform builder (consumer of this repo):** `textbookproject2026-alt/quartz-book`, pinned in its `quartz.lock.json` and moved by its `bump-extras` bot.
- **Operating guide:** `docs/updating-department-editions.md` in the edition template
  (moved from the textbook repo at BOOK-ONE-TO-QUARTZ §8 step 18) — how a change here
  reaches a live edition, and why it doesn't on its own.
- **Service inventory:** `docs/INFRASTRUCTURE.md` in `textbookproject2026-alt/textbook-registry`
  (this repo is shared service S6 there; moved from the textbook repo on 22 Sep 2026).

---

## The plugins

### `plugins/edition-integrations` — transformer

Injects these into every page's `<head>`, site-wide:

1. **The design values from `design.yaml`** (below): the palette and fonts, the
   type scale and reading measure, the lead paragraph, the annotation
   highlight, and the print styles.
2. **The Hypothes.is client**, sidebar collapsed — the same first-party flow the
   canonical Obsidian Publish site runs from `publish.js`.
3. **The per-site Plausible script** (`pa-….js`), stock configuration. With
   `siteDomain` set, it loads only on that host, so a `*.pages.dev` preview or
   `localhost` counts nothing, not even a pageview.
4. **Book one's reader runtime**, ported from its `publish.js` without the SPA
   handling (`src/runtime.ts`, BOOK-ONE-TO-QUARTZ §8 step 4):
   `window.tbTrack()` (the one door for custom events, a silent no-op when
   Plausible is missing or guarded off), the **tag helper** beside the open
   Hypothes.is sidebar, and the **annotation badge** (the page's public count,
   which opens the sidebar). Their events keep book one's names:
   `annotation_tag_copied {tag}`, `annotation_sidebar_opened`,
   `annotation_badge_clicked`. The badge goes at the end of edit-on-github's
   controls row, or under the title when there is none.

It also applies three HTML transforms to every page (`src/transforms.ts`,
BOOK-ONE-TO-QUARTZ §8 steps 3 and 6):

- **Same-page citations.** The authoring app writes Obsidian block references,
  `[Bhaskar, 1979](#^ref-bhaskar-1979)`. Quartz gives the reference paragraph
  `id="ref-bhaskar-1979"` but leaves the href as `#%5Eref-…`, so the click went
  nowhere (32 links in book one's Chapter 3, and in every edition's copy). A
  fragment-only `#^id` href becomes `#id`. Cross-page citations already worked
  and are not touched.
- **Titles from the first heading** (decision D4). A page with no frontmatter
  `title` used to be titled by its filename (`chapter-03`) in `<title>`, the
  explorer, search and the graph, with its own `# Chapter 3: …` as a second H1.
  Now the first top-level H1 becomes the title and leaves the body, with its
  table-of-contents entry. A page with a frontmatter `title`, or with no H1, is
  unchanged.
- **The lead paragraph.** A paragraph directly after the page's first H1 gets
  class `tb-lead`, which `design.yaml`'s stylesheet sets larger, as book one's
  `publish.css` does. It is marked before the title transform removes the H1.
  A chapter that opens with anything else (Chapter 3 opens with a callout) has
  no lead, as on Publish.

`scripts/check-citations-and-titles.mjs <source> <before> <after>` checks the
first two against two builds of a book, one with the plugin as it was and one
with the change.

#### `design.yaml`: the design values

`plugins/edition-integrations/design.yaml` holds the palette (light, and dark
for when dark mode is on), the fonts, the type scale, the reading measure and
rhythm, the annotation highlight, the controls row's and the home link's size, and the print
settings (BOOK-ONE-TO-QUARTZ §4a). It was seeded from book one's `publish.css`.
Two values wait for the client (D12): the accent stays `#7C6CF0`, and dark
mode stays off.

- **It is read when a book builds, not when the plugin is compiled.** Changing a
  value needs no `npm run build`. Quartz's plugin install copies the whole plugin
  directory, so the file arrives beside `dist/` with the rest of the plugin.
- **It overrides the theme block** in `quartz.config.yaml`. Its stylesheet comes
  after Quartz's and redefines the variables Quartz generates from that block
  (`--light` … `--textHighlight`, the font variables, and the accent's
  hue/saturation/lightness). The theme block is still needed for Quartz to
  build, but its values no longer reach the page. Quartz's graph reads the
  same variables when it draws, so the graph follows the palette.
- **It defines the `--tb-*` tokens** that the controls row, the suggest modal,
  the tag helper and the badge use. Their literal fallbacks stay, for an
  edition that pins edit-on-github without this plugin.
- **A bad value fails the build.** Every value must be a plain colour, size or
  number. Anything else, or a missing or unknown key, stops the build with the
  key's name, rather than breaking the page quietly.
- **Print** shows the chapter alone: no explorer, graph, outline, breadcrumbs,
  reading time, controls, footer or annotation layer. It prints at full width
  in black, with underlined links, and without splitting code, quotes or tables.

`scripts/check-design.mjs <out-dir> <design.yaml> [page.html] [--pdf <file>]`
checks a build in headless Chrome: the stylesheet on every page, the variables
the graph reads, the graph as drawn (this needs the network, because the graph
loads d3 and pixi from jsDelivr), the controls row, dark mode off, the
highlight, and print. `--pdf` saves the print.

`scripts/check-scroll.mjs <out-dir> [page.html]` checks that a chapter opened
with no `#fragment` is still at the top three seconds after load (1280x800),
with the explorer's active entry inside the explorer's list.

**Options**

| Option | Default | Notes |
|---|---|---|
| `plausibleScriptSrc` | `""` | The edition's own script address from Plausible → Site settings → Site installation. `""` simply disables analytics; nothing breaks. |
| `siteDomain` | `""` | The one hostname Plausible counts on (a book's `site.domain`). `""` counts on every host, as editions always have. |
| `tagHelper` | `true` | The tag helper panel. |
| `annotationBadge` | `true` | The annotation count badge. |
| `paragraphNumbers` | `true` | ¶ numbers in the margin (every page but the home page), click to copy a paragraph's link, and a reader's toggle in the controls row. Frontmatter `paragraphNumbers: false` opts a page out. |
| `hypothesisGroupId` | `""` | **Inert. Leave empty, permanently.** |

`hypothesisGroupId` is documented dead code. It would only take effect if the
commented `services` block in `src/index.ts` were enabled, and that is unused by
decision: per-cohort annotation isolation would need Hypothes.is's Publisher tier,
which the project decided not to buy. Config-based group locking also 404s on the
standard tier. Do not fill it in and do not uncomment the block.

**Why there is no SPA handling.** Editions run with `enableSPA: false`, so every
navigation is a full page load and every head script runs again from scratch. Both
integrations are therefore plain one-shot head injections — no re-injection on
navigation, no persistence of client state across a route swap, no custom pageview
firing. The SPA mode is incompatible with the annotation sidebar: it tears the
Hypothes.is panel out of the page on every click and the panel cannot be revived.
The history of that fight is in this repo's log (`998e606` … `1043f34`); the
current answer is "don't run SPA", and the machinery for the other approach has
been removed. Please don't reintroduce it.

### `plugins/edit-on-github` — component

The **controls row** under each page title (BOOK-ONE-TO-QUARTZ §1b, §8 step 5):
**Edit this page** (or **Edit on GitHub ↗**, see below), **View revision
history ↗**, and, when `suggestEndpoint` is set, **Suggest an edit**.
edition-integrations puts its annotation badge at the end of the row.

- **The in-site editor** (`src/components/scripts/editor.ts`, `source.ts`). With
  `suggestEndpoint` set and `editor` on (the default), the Edit link reads **Edit
  this page** and opens a GitHub-style editor over the page: a breadcrumb to the
  file on the drafts branch, **Edit / Preview / Changes** tabs, and a **Propose
  changes** dialog (a required *What did you change, and why?*, 10–500 characters,
  which becomes the PR's title tail, its commit subject and its Summary; an optional
  description; and *Sign in with GitHub*). Every numbered paragraph also gets a pencil in its right margin that
  opens the same editor on just that paragraph, found in the source by its words
  (`findParagraph`; if it can't be found, the whole page opens with a note).
  Proposals go to the function's `/api/propose-edit` (derived from
  `suggestEndpoint`), which opens a PR into drafts, or files an issue when drafts
  moved on. A modified click on the link, and any click with scripts off, still
  goes to GitHub. The pencils hold no text (Hypothes.is anchors are safe) and are
  out of the tab order; keyboard and screen-reader users have Edit this page.
  Editions have no endpoint, so they keep the plain GitHub link.

- **Notes on a paragraph.** Where Note to the authors is armed, each numbered
  paragraph also gets a note button just below its pencil (in the pencil's place
  where there is none; above the paragraph on a phone, as the pencil). It opens the
  note form titled *Note to the authors about ¶n*, quoting the paragraph's first
  ~200 characters, and sends `paragraph`, `quote` and `page` with the note; the
  function files it with the `#p<n>` permalink and the label `section-note`. Any
  note carries the editor's GitHub sign-in when the tab has one, so the issue
  names the reader as @login. Event: `section_note_opened`.
- **Cite** (⋯). On a book built by quartz-book the page carries
  `<script id="tb-cite">` (the page's and the book's CSL-JSON and their citations,
  formatted at build time): the dialog offers *This paragraph (¶n)* (the one the
  address names, else the first on screen), *This page* and *Whole book*; APA 7,
  Chicago, MLA and Harvard (the reader's last choice kept); Copy; and BibTeX, RIS
  and CSL-JSON made from the CSL-JSON (`scripts/cite.ts`), with the reader's access
  date. Elsewhere (an edition), APA 7 from the header's data, as before. The CC
  attribution line is under both. Events: `citation_copied {style, scope}`,
  `citation_downloaded {format, scope}`.
- **Download** (⋯). On a book built by quartz-book the page carries
  `<script id="tb-downloads">`: the item reads *Download…* and opens a chooser,
  this page's PDF and EPUB, the whole book's PDF, EPUB and ODT (only the files the
  build made), and the Markdown source as before. Elsewhere it is *Download as
  Markdown*. Event: `download {format, scope}`.
- **Credit** (batch 2a). The role badge (`scripts/roles.ts`, `.tb-role[data-role]`:
  Author, Editor, Contributor) is the one shape for roles, in the History panel and
  in what quartz-book's builder writes on the page (the byline `.tb-byline`, the
  chapter's contributors `.tb-credits-foot`, the front page's `.tb-credits-block`),
  all styled here. The note form says under the name that an accepted suggestion is
  credited by it, and the Contribute explainer links the contributors page's *How
  credit works* when the book has one (`data-credits`).
- **Version history** (batch 2a). ⋯ → *Page history* is a timeline in three plain
  states: *Being edited* (open proposals and notes from the function's
  `/api/history`, then accepted drafts changes) above *Published* (newest first,
  releases as milestones). Each version has *Show changes* (the word diff, inline),
  *Read this version* (under "You are reading the version of …") and *Compare*,
  with any other version or with now (page-revision's `base=`). The data is
  quartz-book's `/.well-known/history.json` (`scripts/timeline.ts` reads it); a
  site built before it falls back to the page's `/.well-known/history/<slug>.json`.
  The book's `/history` page (built by quartz-book, a static SVG swimlane that works
  without scripts) gets *Book history* in ⋯, and `scripts/book-history.ts` adds
  what is proposed to the swimlane, tap-to-read dots and the whole book's timeline,
  filterable by chapter, person and state. Events: `page_version_read`,
  `page_versions_compared`.
- **The links** come from Quartz's own source path, so no reverse-mapping from
  URLs: `contentDir` joined to `fileData.relativePath` (which is relative to the
  `-d` directory), encoded per segment. The Edit link keeps class
  `edit-on-github` and its href shape; book two's post-build form and
  edition-integrations find it by them. Tag and folder listings get no row.
- **Suggest an edit** is book one's modal, ported from `publish.js:805-1450`
  (`src/components/scripts/controls.inline.ts`): the four honeypot guards, the
  focus trap, the character counter without a live region, and the
  `userMessage` contract (shown as text, capped at 200 characters; `error` is
  never shown). The button is rendered hidden and shown only once the script
  has armed it, so a reader with scripts blocked never meets a dead control.
- **The row's size and colour** come from edition-integrations' `--tb-*`
  tokens (`design.yaml`), with its own values as fallbacks.
- **Events**, with book one's names: `edit_on_github_clicked`,
  `suggest_edit_opened`, `suggest_edit_submitted {outcome}`; and the editor's
  `page_editor_opened {mode}`, `page_edit_submitted {outcome, mode}`
  (`proposed` / `issue` / `error`), `github_signin {outcome}`. They go through
  edition-integrations' `window.tbTrack()`, and are dropped silently where it
  isn't installed.

`scripts/check-controls.mjs <out-dir> <page.html> <expected-edit-href>` checks
a build: the links, the row's order, keyboard-only use of the modal, the
honeypot, the three events, and that the editor is armed (link, pencils).

**Options**

| Option | Default | Notes |
|---|---|---|
| `repo` | `""` | The edition's own `owner/repository`. The template ships the placeholder `OWNER/REPO`; an edition that never replaced it gets a 404 on every page and no other visible symptom. |
| `branch` | `"main"` | |
| `contentDir` | `"content"` | The repo directory `quartz build -d` reads. `content` is Quartz's default, which editions and book two use, so their links are unchanged. The shared builder builds a book from its repo root and sets `""`. |
| `suggestEndpoint` | `""` | The suggest-edit function's URL. `""` hides Suggest: the function answers 403 to an origin the registry doesn't list, and an edition's origin isn't listed. |
| `editor` | `true` | The in-site editor, when `suggestEndpoint` is set. `false` keeps **Edit on GitHub ↗**. |

Default position `beforeBody`, priority `25` — it sits with the page meta, under
the title.

### `plugins/textbook-graph` — component

The graph view: a fork of `quartz-community/graph` (MIT) that colours nodes by topic
(frontmatter `topic:`, else the first tag), keeps labels on and decluttered, and adds a
topic legend that highlights a topic's pages. quartz-book uses it in place of the
community plugin; the edition template picks it up at §8 step 22. Details in its
README.

### `plugins/home-link` — component

The Confused for Now logo, linking to the portal: the first item in the left
sidebar, above the book's title, on every page type. The full logo at Quartz's
desktop breakpoint (1200px) and up, the icon below it, both inline SVGs in
`currentColor`. On a phone it takes its own line above the sidebar row. A plain
link, no script. Its heights are design.yaml's `homeLink.height` and
`homeLink.iconHeight`, and its colours the palette's (the text colour, `accent` on
hover and focus). Option `url` (default `https://confused4now.org/`). Details in its
README.

---

## How an edition consumes these

From the template's `quartz.config.yaml`:

```yaml
  - source:
      repo: "https://github.com/textbookproject2026-alt/quartz-edition-extras.git"
      subdir: plugins/edition-integrations
      name: edition-integrations
```

`npx quartz plugin install` resolves that to an exact commit and writes it into the
edition's `quartz.lock.json`. **The pin never moves on its own.**

> **Only with the platform patch is the pin what gets installed** (27 Sep 2026).
> Upstream Quartz restored a `subdir` plugin by cloning this repo's default branch
> and ignored the lock's commit, while printing it. So until then, every consumer
> built with this repo's `main` as of its last fresh install, whatever it pinned.
> `quartz/cli/plugin-git-handlers.js` in quartz-book (#18) and in the edition
> template (#10, §8 step 22) now fetches the pinned commit and records it in
> `.quartz/plugins/<name>/.quartz-locked-commit`. An edition gets the patch with
> `sync-upstream.sh`.

An edition
collects a change here only when its coordinator runs:

```
npx quartz plugin update edition-integrations
```

and then commits and pushes the updated lock file. The updated pin *is* the change.

---

## Working on a plugin

Each plugin directory is a clone of
[`quartz-community/plugin-template`](https://github.com/quartz-community/plugin-template)
with `src/index.ts` replaced. Keep the template's `tsup.config.ts` and
`tsconfig.json` untouched.

```sh
cd plugins/edition-integrations
npm install
npm run check     # typecheck + lint + format + test
npm run build
```

**Commit `dist/`.** Quartz v5 plugins ship pre-built and are installed straight
from the repository — there is no build step on the consumer's side. A source
change without a rebuilt, committed `dist/` has no effect anywhere, and nothing
warns you. The one exception is `edition-integrations/design.yaml`, which is
read at build time.

### Releasing a change

1. `npm run check && npm run build` in the plugin directory.
2. Commit **both** `src/` and `dist/`. The `ci` check fails if `dist/` isn't
   what `src/` builds to.
3. Open a pull request and merge it once `ci` is green. `main` is protected
   (since 27 Sep 2026): a pull request and the `ci` check, no review, admins
   included. quartz-book's `bump-extras` bot then opens its pin pull request,
   with a design preview of every book.
4. **Bump the pin in the template**, in
   `textbook-edition-template/quartz.lock.json`, for all three plugins it uses
   (`edition-integrations`, `edit-on-github`, `textbook-graph`) at one commit —
   otherwise every edition forked from that point still starts on the old commit.
5. Announce it to coordinators, naming the plugin, so they can run
   `npx quartz plugin update <name>`. See
   `docs/updating-department-editions.md` in the edition template.

Step 4 is the one that gets missed, and it is invisible when it is.

> **Resolved.** The note that stood here (4 Sep 2026) said the template pinned both
> plugins at `eece8e6`. They moved to `8f4e323` the same month, and to `265bb8d`,
> with `textbook-graph`, at BOOK-ONE-TO-QUARTZ §8 step 22 (edition template #10).
> As the note above says, the old pins were never what got installed anyway. The
> record is item 3.5 in `textbook-registry/docs/history/DOCS-REMEDIATION.md`.

---

## Two things that look wrong and aren't

- **Each plugin's own `README.md` is the upstream template's boilerplate**
  ("Quartz Community Plugin Template"), and their `package.json` still carries the
  template's `author`, `homepage` and `repository` fields. Nothing depends on
  those values. This file is the real documentation.
- **`node_modules/` is present in each plugin directory** but git-ignored.

## Licence

Each plugin carries the template's MIT `LICENSE`. The textbook itself is
CC-BY-SA-4.0; that applies to content, not to this build machinery.
