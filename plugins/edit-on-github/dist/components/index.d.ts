import { QuartzComponentConstructor } from '@quartz-community/types';

interface Options {
    /** "owner/repo" of THIS edition's repository — each edition sets its own. */
    repo: string;
    branch: string;
}
declare const EditOnGitHub: QuartzComponentConstructor<Partial<Options>>;

export { EditOnGitHub, type Options as EditOnGitHubOptions };
