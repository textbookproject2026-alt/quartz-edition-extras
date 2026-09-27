import { QuartzComponent } from '@quartz-community/types';

interface HomeLinkOptions {
    /** Where the link goes: the platform's portal. */
    url: string;
    /** The link's accessible name. The logos themselves are hidden from assistive tech. */
    label: string;
}
declare const _default: (userOpts?: Partial<HomeLinkOptions>) => QuartzComponent;

export { _default as HomeLink, type HomeLinkOptions };
