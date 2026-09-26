import { QuartzComponent } from '@quartz-community/types';

interface HomeLinkOptions {
    /** Where the link goes: the platform's portal. */
    url: string;
    /** The link text, set in italics. */
    label: string;
}
declare const _default: (userOpts?: Partial<HomeLinkOptions>) => QuartzComponent;

export { _default as HomeLink, type HomeLinkOptions };
