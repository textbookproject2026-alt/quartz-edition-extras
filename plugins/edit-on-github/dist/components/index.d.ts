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
}
/**
 * The controls row under the title (BOOK-ONE-TO-QUARTZ §1b, §8 step 5):
 * Edit this page (or Edit on GitHub), History, Suggest an edit, and the annotation
 * badge, which edition-integrations adds to the row when it is installed.
 *
 * Edit keeps class "edit-on-github" and its href shape: book two's post-build
 * form and edition-integrations both find the link by it. With the editor on,
 * it reads "Edit this page" and carries the data the page script needs; its
 * href stays the GitHub edit URL, the no-script fallback.
 */
declare const EditOnGitHub: QuartzComponentConstructor<Partial<Options>>;

export { EditOnGitHub, type Options as EditOnGitHubOptions };
