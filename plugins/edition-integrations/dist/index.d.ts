import { QuartzTransformerPlugin } from '@quartz-community/types';

interface Options {
    /** Per-edition Plausible script src (https://plausible.io/js/pa-….js). "" disables analytics. */
    plausibleScriptSrc: string;
    /** Hypothes.is group ID — inert: it would only take effect if the commented services block below were enabled, and that is unused by decision (Publisher tier not bought, R1 closed). */
    hypothesisGroupId: string;
}
declare const EditionIntegrations: QuartzTransformerPlugin<Partial<Options>>;

export { EditionIntegrations, EditionIntegrations as default };
