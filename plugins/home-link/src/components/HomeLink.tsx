import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import { classNames } from "@quartz-community/utils/lang";

export interface HomeLinkOptions {
  /** Where the link goes: the platform's portal. */
  url: string;
  /** The link text, set in italics. */
  label: string;
}

export const defaultOptions: HomeLinkOptions = {
  url: "https://confused4now.org/",
  label: "confused for now",
};

/**
 * The platform's name, linking home to the portal, above the book's own title
 * in the left sidebar. A plain link: no script, so it works with SPA off.
 *
 * The size and colours are design.yaml's (edition-integrations): its
 * `homeLink.size` becomes --tb-size-home-link, and its palette becomes Quartz's
 * --gray (`faint`) and --secondary (`accent`). The fallbacks are for a site
 * without that plugin.
 */
export const css = `
.home-link {
  margin: 0;
  font-family: var(--tb-font-text, var(--bodyFont));
  font-size: var(--tb-size-home-link, 0.85rem);
  font-style: italic;
  font-weight: 400;
  line-height: 1.3;
}
.home-link a {
  color: var(--gray);
  background-color: transparent;
  font-weight: inherit;
  text-decoration: none;
}
.home-link a:hover,
.home-link a:focus-visible {
  color: var(--secondary);
  text-decoration: underline;
  text-underline-offset: 0.15em;
}
.home-link a:focus-visible {
  outline: 2px solid var(--secondary);
  outline-offset: 2px;
  border-radius: 2px;
}
/* On a phone the left sidebar is one row (menu, title, search), and the
   explorer makes that row a sticky bar. The link sits just above the bar, in
   space the bar leaves for it, at the page's top left: it scrolls away with
   the page while the bar stays, and the row is laid out as before. Absolute
   within the bar (sticky, so its containing block), never fixed. A page
   without the explorer (the 404) keeps the link in the flow. */
@media all and (max-width: 800px) {
  .page > #quartz-body .sidebar.left.left:has(> .home-link):has(.explorer) {
    margin-top: 1.75rem;
  }
  .sidebar.left:has(.explorer) > .home-link {
    position: absolute;
    bottom: 100%;
    left: 0;
    white-space: nowrap;
  }
}
`;

export default ((userOpts?: Partial<HomeLinkOptions>) => {
  const opts = { ...defaultOptions, ...userOpts };
  const HomeLink: QuartzComponent = ({ displayClass }: QuartzComponentProps) => (
    <p class={classNames(displayClass, "home-link")}>
      <a href={opts.url}>{opts.label}</a>
    </p>
  );
  HomeLink.css = css;
  return HomeLink;
}) satisfies QuartzComponentConstructor<Partial<HomeLinkOptions>>;
