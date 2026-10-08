import { PageFrame } from '@quartz-community/types';

/**
 * Quartz's default frame, with the book's header (edit-on-github) as its own cell
 * of the page grid, the "grid-header" area Quartz's grids already have in every
 * layout, instead of inside the centre column.
 *
 * That cell is sticky against the whole page: in the default frame the header
 * sat in .center, and below Quartz's desktop layout the right rail and footer are
 * rows under .center, so on a short page scrolled to its end the header left the
 * screen with it.
 *
 * It is the page's one bar: the logo (a left-sidebar component that asks to lead
 * it), then the header (the explorer's menu button, title, controls). The rest of
 * the bar's styling is the header's CSS, which loads in <head> where
 * edition-integrations can move its breakpoints; this <style> is in <body>.
 */
declare const BookFrame: PageFrame;

export { BookFrame };
