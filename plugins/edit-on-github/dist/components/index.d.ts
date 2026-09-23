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
}
/**
 * The controls row under the title (BOOK-ONE-TO-QUARTZ §1b, §8 step 5):
 * Edit on GitHub, View revision history, Suggest an edit, and the annotation
 * badge, which edition-integrations adds to the row when it is installed.
 *
 * Edit keeps class "edit-on-github" and its href shape: book two's post-build
 * form and edition-integrations both find the link by it.
 */
declare const EditOnGitHub: QuartzComponentConstructor<Partial<Options>>;

export { EditOnGitHub, type Options as EditOnGitHubOptions };
