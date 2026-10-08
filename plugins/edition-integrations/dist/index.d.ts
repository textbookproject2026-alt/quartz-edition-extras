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
     * true (the default, editions): Hypothes.is's public layer, as on hypothes.is.
     * false (books): no public layer. Readers see and post only in the groups
     * below; until hypothesisGroupId is set, the client isn't loaded at all.
     */
    publicAnnotations: boolean;
    /**
     * With publicAnnotations false: a restricted Hypothes.is group (anyone reads,
     * members post) that every reader's client loads. It is what keeps Public out:
     * the client's groupsAllowlist only takes effect when a listed group loaded,
     * and a reader who isn't in any class group has no other. "" (the default):
     * the client isn't loaded.
     */
    hypothesisGroupId: string;
    /** With publicAnnotations false: class groups readers may also use (members only). */
    hypothesisGroups: string[];
    /**
     * The book's reading order, as slugs ("chapters/introduction"): the links
     * under "## Contents" in its index.md, which the builder reads. The
     * explorer lists pages in this order. [] (the default) keeps its own.
     */
    explorerOrder: string[];
    /**
     * The platform's Privacy page. Set: the first-visit privacy notice links to it
     * (privacyNotice). "" (the default): no notice.
     */
    privacyUrl: string;
}
type AnnotationMode = "public" | "groups" | "off";
declare const annotationMode: (opts: Pick<Options, "publicAnnotations" | "hypothesisGroupId">) => AnnotationMode;
declare const hypothesisConfig: (mode: AnnotationMode, anchor?: string, groups?: string[]) => string;
/** The client's JSON config, which is where it reads `group` from. */
declare const hypothesisGroupJson: (anchor: string) => string;
declare const EditionIntegrations: QuartzTransformerPlugin<Partial<Options>>;

export { EditionIntegrations, annotationMode, EditionIntegrations as default, hypothesisConfig, hypothesisGroupJson };
