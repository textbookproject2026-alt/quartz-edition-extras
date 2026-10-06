import { QuartzComponentConstructor } from '@quartz-community/types';

interface Options {
    /** "owner/repo" of THIS book's or edition's repository. */
    repo: string;
    branch: string;
    /**
     * The repository directory `quartz build -d` reads, relative to the repo root.
     * "content" is Quartz's default, which every edition and book two use. The
     * shared builder builds a book from its repo root and sets "".
     */
    contentDir: string;
    /**
     * The suggest-edit function's URL. "" (the default) hides "Suggest an edit":
     * the function answers 403 to an origin the registry doesn't list, and an
     * edition's origin isn't listed.
     */
    suggestEndpoint: string;
    /**
     * The in-site editor: with a suggestEndpoint set, "Edit on GitHub ↗" becomes
     * "Edit this page", which opens a GitHub-style editor on the page itself, and
     * numbered paragraphs get a pencil. Proposals go to the same function's
     * /api/propose-edit, a sibling of suggestEndpoint. false keeps the plain
     * GitHub link. Without scripts the link still goes to GitHub either way.
     */
    editor: boolean;
    /**
     * The platform function's /api/page-revision for this book
     * (".../api/page-revision?book=<slug>"). Set by the shared builder for every
     * book it builds, which also writes each page's revision list to
     * /.well-known/history/<slug>.json. With it (and the editor on), "History"
     * opens the page's revisions on the site; without it, or without scripts,
     * the link goes to GitHub's history of the file.
     */
    revisionEndpoint: string;
    /**
     * What the page was built from, stamped on its controls row: the source
     * commit (data-source-commit) and each file's git blob sha by repo path
     * (data-source-blob). Set by the shared builder. The editor compares the blob
     * with the one it loads from drafts and says when unpublished changes are
     * waiting.
     */
    sourceCommit: string;
    sourceBlobs: Record<string, string>;
    /** Who wrote the book, as the registry gives it ("A Name, B Name"): Cite this page. */
    authors: string;
    /** The book's SPDX licence id ("CC-BY-SA-4.0"): Cite this page's attribution line. */
    licence: string;
    /** The page that explains the ways to contribute, relative to the site root. */
    howTo: string;
}
/**
 * The sticky header on every page (A): the book's title and where the page sits
 * on the left; Search, Contribute ▾, Annotate, Appearance (Aa) and ⋯ on the
 * right, icons only on a phone.
 *
 * Contribute (D) holds what was the controls row: Edit this page (or Edit on
 * GitHub, where there's no editor), Note to the authors (the suggest-an-edit
 * form), Public comment, How contributing works. ⋯ (F) holds Cite, Print, Page
 * history, What links here, Download as Markdown and View source. Annotate and
 * Appearance are run by edition-integrations' window.tbAnnotations and
 * window.tbPrefs; every button stays hidden until its script arms it, and a
 * reader without scripts gets the plain GitHub links.
 *
 * The root keeps class "tb-page-controls" and the data-source-* stamp, and Edit
 * keeps class "edit-on-github" and its href shape: book two's post-build form,
 * edition-integrations and the editor find them by those. A page with no source
 * file (a folder or tag listing, the builder's own pages: frontmatter
 * tbBuilderPage) gets the header without the items that need one.
 */
declare const EditOnGitHub: QuartzComponentConstructor<Partial<Options>>;

export { EditOnGitHub, type Options as EditOnGitHubOptions };
