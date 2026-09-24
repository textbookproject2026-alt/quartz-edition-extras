import { QuartzTransformerPlugin } from '@quartz-community/types';

interface Options {
    /** Per-edition Plausible script src (https://plausible.io/js/pa-….js). "" disables analytics. */
    plausibleScriptSrc: string;
    /**
     * The one hostname Plausible counts on. When set, any other host (a
     * *.pages.dev preview, localhost) loads no Plausible script and sends no
     * event, not even a pageview. "" (the default) counts on every host, as
     * editions always have.
     */
    siteDomain: string;
    /** The "Tag your annotation" panel beside the open Hypothes.is sidebar. */
    tagHelper: boolean;
    /** The per-page annotation count, which opens the sidebar. */
    annotationBadge: boolean;
    /**
     * Paragraph numbers (¶) in the margin of every page but the home page, with
     * a toggle in the controls row that each reader's browser remembers.
     */
    paragraphNumbers: boolean;
    /**
     * The page-views endpoint (suggest-edit-function's /api/page-views), for the
     * "n views" count in the controls row. "" shows no count.
     */
    viewsEndpoint: string;
    /** The book's registry slug, which the views endpoint is asked about. */
    bookSlug: string;
    /** Hypothes.is group ID — inert: it would only take effect if the commented services block below were enabled, and that is unused by decision (Publisher tier not bought, R1 closed). */
    hypothesisGroupId: string;
}
declare const EditionIntegrations: QuartzTransformerPlugin<Partial<Options>>;

export { EditionIntegrations, EditionIntegrations as default };
