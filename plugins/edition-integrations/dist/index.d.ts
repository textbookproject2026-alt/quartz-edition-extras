import { QuartzTransformerPlugin } from '@quartz-community/types';

interface Options {
    /** Per-edition Plausible script src (https://plausible.io/js/pa-….js). "" disables analytics. */
    plausibleScriptSrc: string;
    /** Hypothes.is group ID — only takes effect once the services block below is uncommented (Publisher tier, R1). */
    hypothesisGroupId: string;
}
declare const EditionIntegrations: QuartzTransformerPlugin<Partial<Options>>;

export { EditionIntegrations, EditionIntegrations as default };
