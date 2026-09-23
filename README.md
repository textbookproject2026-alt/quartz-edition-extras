# quartz-edition-extras

The two Quartz v5 plugins that department editions of the textbook install at build
time. Nothing else lives here.

**Every department edition builds against this repository.** The edition template's
`quartz.config.yaml` names it by URL, and each edition's `quartz.lock.json` pins a
specific commit of it. If this repo is deleted, renamed or made private, the next
build of every edition fails — and nothing in the failure points here. Treat it as
production infrastructure, not a scratch repo.

- **Canonical textbook:** `textbookproject2026-alt/textbook`
- **Edition template (consumer of this repo):** `textbookproject2026-alt/textbook-edition-template`
- **Operating guide:** `docs/updating-department-editions.md` in the textbook repo —
  how a change here reaches a live edition, and why it doesn't on its own.
- **Service inventory:** `docs/INFRASTRUCTURE.md` in `textbookproject2026-alt/textbook-registry`
  (this repo is shared service S6 there; moved from the textbook repo on 22 Sep 2026).

---

## The two plugins

### `plugins/edition-integrations` — transformer

Injects three things into every page's `<head>`, site-wide:

1. **Theme fine-tuning CSS** — type scale, vertical rhythm, and a 720px reading
   measure. Colours and font *families* come from the edition's
   `quartz.config.yaml` theme block; this covers what that config cannot express,
   and references Quartz's generated CSS variables so a palette change in the
   config propagates automatically.
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

It also applies two HTML transforms to every page (`src/transforms.ts`,
BOOK-ONE-TO-QUARTZ §8 step 3):

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

`scripts/check-citations-and-titles.mjs <source> <before> <after>` checks both
against two builds of a book, one with the plugin as it was and one with the change.

**Options**

| Option | Default | Notes |
|---|---|---|
| `plausibleScriptSrc` | `""` | The edition's own script address from Plausible → Site settings → Site installation. `""` simply disables analytics; nothing breaks. |
| `siteDomain` | `""` | The one hostname Plausible counts on (a book's `site.domain`). `""` counts on every host, as editions always have. |
| `tagHelper` | `true` | The tag helper panel. |
| `annotationBadge` | `true` | The annotation count badge. |
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
**Edit on GitHub ↗**, **View revision history ↗**, and, when `suggestEndpoint`
is set, **Suggest an edit**. edition-integrations puts its annotation badge at
the end of the row.

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
- **Events**, with book one's names: `edit_on_github_clicked`,
  `suggest_edit_opened`, `suggest_edit_submitted {outcome}`. They go through
  edition-integrations' `window.tbTrack()`, and are dropped silently where it
  isn't installed.

`scripts/check-controls.mjs <out-dir> <page.html> <expected-edit-href>` checks
a build: the links, the row's order, keyboard-only use of the modal, the
honeypot, and the three events.

**Options**

| Option | Default | Notes |
|---|---|---|
| `repo` | `""` | The edition's own `owner/repository`. The template ships the placeholder `OWNER/REPO`; an edition that never replaced it gets a 404 on every page and no other visible symptom. |
| `branch` | `"main"` | |
| `contentDir` | `"content"` | The repo directory `quartz build -d` reads. `content` is Quartz's default, which editions and book two use, so their links are unchanged. The shared builder builds a book from its repo root and sets `""`. |
| `suggestEndpoint` | `""` | The suggest-edit function's URL. `""` hides Suggest: the function answers 403 to an origin the registry doesn't list, and an edition's origin isn't listed. |

Default position `beforeBody`, priority `25` — it sits with the page meta, under
the title.

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
edition's `quartz.lock.json`. **The pin never moves on its own.** An edition
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
warns you.

### Releasing a change

1. `npm run check && npm run build` in the plugin directory.
2. Commit **both** `src/` and `dist/`.
3. Push to `main`.
4. **Bump the pin in the template**, in
   `textbook-edition-template/quartz.lock.json` — otherwise every edition forked
   from that point still starts on the old commit.
5. Announce it to coordinators, naming the plugin, so they can run
   `npx quartz plugin update <name>`. See
   `docs/updating-department-editions.md` in the textbook repo.

Step 4 is the one that gets missed, and it is invisible when it is.

> **Known discrepancy, 4 September 2026.** The template pins both plugins at
> `eece8e6`, seven commits behind this repo's `main`. Everything since — including
> the Hypothes.is navigation fix series and the Publisher-tier correction — is
> unreleased to every edition. Tracked as item 3.5 in
> `docs/DOCS-REMEDIATION.md` in the textbook repo.

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
