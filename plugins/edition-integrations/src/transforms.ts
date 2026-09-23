/**
 * The two HTML transforms (BOOK-ONE-TO-QUARTZ §2 #1 and #2, §8 step 3).
 *
 * 1. Same-page citations. The authoring app writes Obsidian block references,
 *    `[Bhaskar, 1979](#^ref-bhaskar-1979)`. Quartz gives the reference paragraph
 *    `id="ref-bhaskar-1979"` (it strips the `^`) but leaves the link's href as
 *    `#%5Eref-bhaskar-1979`, so the click goes nowhere. A fragment-only href
 *    whose fragment starts with `^` becomes `#` plus the rest. Cross-page
 *    citations already work (Quartz rewrites them) and are not fragment-only,
 *    so they are never touched.
 *
 * 2. Page titles (D4). A page with no frontmatter `title` gets its filename as
 *    the title (note-properties' fallback), so `<title>`, the explorer, search
 *    and the graph read `chapter-03`, and the chapter's own `# Chapter 3: …`
 *    appears as a second H1 under the article title. When the frontmatter has
 *    no `title`, the first top-level H1 becomes the title and leaves the body,
 *    along with its table-of-contents entry. A page with a frontmatter `title`,
 *    or with no H1, is left exactly as it was.
 *
 * No dependencies beyond the tree itself, so nothing new ships in dist/.
 */

export interface HastNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

interface TocEntry {
  depth: number;
  text: string;
  slug: string;
}

export interface PageData {
  frontmatter?: Record<string, unknown>;
  toc?: TocEntry[];
  [key: string]: unknown;
}

const walk = (node: HastNode, fn: (node: HastNode) => void): void => {
  fn(node);
  for (const child of node.children ?? []) walk(child, fn);
};

const textOf = (node: HastNode): string =>
  node.type === "text" ? (node.value ?? "") : (node.children ?? []).map(textOf).join("");

// --- 1. same-page citations ---------------------------------------------------

const BLOCK_REF = /^#(?:\^|%5[Ee])(.+)$/;

/** Rewrites `#^id` (in either spelling) to `#id`. Returns how many changed. */
export const fixBlockRefLinks = (tree: HastNode): number => {
  let changed = 0;
  walk(tree, (node) => {
    if (node.type !== "element" || node.tagName !== "a") return;
    const href = node.properties?.href;
    if (typeof href !== "string") return;
    const match = BLOCK_REF.exec(href);
    if (!match) return;
    node.properties!.href = `#${match[1]}`;
    changed++;
  });
  return changed;
};

// --- 2. the title from the first heading ----------------------------------------

/**
 * True when the page's own frontmatter names a title. Read from the source,
 * not from `frontmatter.title`, because note-properties has already filled that
 * in with the filename when it was missing.
 */
export const hasOwnTitle = (source: string): boolean => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source.trimStart());
  if (!match) return false;
  const line = /^title\s*:\s*(.*?)\s*$/m.exec(match[1]!);
  if (!line) return false;
  const value = line[1]!.replace(/^(["'])(.*)\1$/, "$2").trim();
  return value.length > 0;
};

/**
 * Moves the first top-level H1 into the page's title. Returns the new title, or
 * null when nothing was changed (the page has its own title, or no H1).
 */
export const titleFromFirstHeading = (
  tree: HastNode,
  data: PageData,
  source: string,
): string | null => {
  if (hasOwnTitle(source)) return null;
  const children = tree.children ?? [];
  const index = children.findIndex((n) => n.type === "element" && n.tagName === "h1");
  if (index === -1) return null;
  const h1 = children[index]!;
  const title = textOf(h1).replace(/\s+/g, " ").trim();
  if (!title) return null;

  children.splice(index, 1);
  data.frontmatter = { ...(data.frontmatter ?? {}), title };

  // The heading's entry in the table of contents would point at nothing now.
  const id = h1.properties?.id;
  if (data.toc && typeof id === "string") {
    const kept = data.toc.filter((entry) => entry.slug !== id);
    if (kept.length !== data.toc.length) {
      const top = Math.min(...kept.map((entry) => entry.depth));
      data.toc = kept.map((entry) => ({ ...entry, depth: entry.depth - top }));
      if (data.toc.length === 0) delete data.toc;
    }
  }
  return title;
};
