import { PageFrame } from '@quartz-community/types';

/**
 * Quartz's default frame, with the book's header (edit-on-github) as its own cell
 * of the page grid, the "grid-header" area Quartz's grids already have in every
 * layout, instead of inside the centre column.
 *
 * That cell is sticky against the whole page: in the default frame the header
 * sat in .center, and below Quartz's desktop layout the right rail and footer are
 * rows under .center, so on a short page scrolled to its end the header left the
 * screen with it. On a phone it sticks just under Quartz's own sticky bar (the
 * menu button), at --tb-sticky-top, which the page script measures.
 */
declare const BookFrame: PageFrame;

export { BookFrame };
