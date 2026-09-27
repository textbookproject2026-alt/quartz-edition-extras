import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import { classNames } from "@quartz-community/utils/lang";
import { logoFull, logoIcon } from "./logos";

export interface HomeLinkOptions {
  /** Where the link goes: the platform's portal. */
  url: string;
  /** The link's accessible name. The logos themselves are hidden from assistive tech. */
  label: string;
}

export const defaultOptions: HomeLinkOptions = {
  url: "https://confused4now.org/",
  label: "Confused for Now (home)",
};

/**
 * The platform's logo, linking home to the portal, above the book's own title
 * in the left sidebar. A plain link: no script, so it works with SPA off.
 *
 * Both logos are inline, so there is no extra request and `currentColor` follows
 * the theme. The full logo shows at Quartz's desktop breakpoint (1200px) and
 * up, the icon below it; CSS shows only one at a time.
 *
 * The heights and colours are design.yaml's (edition-integrations): its
 * `homeLink.height` and `homeLink.iconHeight` become --tb-home-link-height and
 * --tb-home-link-icon-height, and its palette becomes Quartz's --dark (`heading`,
 * the text colour) and --secondary (`accent`). The fallbacks are for a site
 * without that plugin.
 */
export const css = `
.home-link {
  margin: 0;
  line-height: 0;
}
.home-link a {
  display: inline-block;
  color: var(--dark);
  background-color: transparent;
  border-radius: 2px;
}
.home-link a:hover,
.home-link a:focus-visible {
  color: var(--secondary);
}
.home-link a:focus-visible {
  outline: 2px solid var(--secondary);
  outline-offset: 3px;
}
.home-link svg {
  display: block;
  width: auto;
}
.home-link .home-link-full {
  display: none;
  height: var(--tb-home-link-height, 32px);
}
.home-link .home-link-icon {
  height: var(--tb-home-link-icon-height, 28px);
}
@media all and (min-width: 1200px) {
  .home-link .home-link-full {
    display: block;
  }
  .home-link .home-link-icon {
    display: none;
  }
}
/* On a phone the left sidebar is one row (menu, title, search), and the
   explorer makes that row a sticky bar. The link sits just above the bar, in
   space the bar leaves for it, at the page's top left: it scrolls away with
   the page while the bar stays, and the row is laid out as before. Absolute
   within the bar (sticky, so its containing block), never fixed. A page
   without the explorer (the 404) keeps the link in the flow. */
@media all and (max-width: 800px) {
  .page > #quartz-body .sidebar.left.left:has(> .home-link):has(.explorer) {
    margin-top: calc(var(--tb-home-link-icon-height, 28px) + 0.5rem);
  }
  .sidebar.left:has(.explorer) > .home-link {
    position: absolute;
    bottom: 100%;
    left: 0;
  }
}
`;

const Logo = ({ logo, className }: { logo: typeof logoFull; className: string }) => (
  <svg
    class={className}
    viewBox={logo.viewBox}
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    dangerouslySetInnerHTML={{ __html: logo.markup }}
  />
);

export default ((userOpts?: Partial<HomeLinkOptions>) => {
  const opts = { ...defaultOptions, ...userOpts };
  const HomeLink: QuartzComponent = ({ displayClass }: QuartzComponentProps) => (
    <p class={classNames(displayClass, "home-link")}>
      <a href={opts.url} aria-label={opts.label}>
        <Logo logo={logoFull} className="home-link-full" />
        <Logo logo={logoIcon} className="home-link-icon" />
      </a>
    </p>
  );
  HomeLink.css = css;
  return HomeLink;
}) satisfies QuartzComponentConstructor<Partial<HomeLinkOptions>>;
