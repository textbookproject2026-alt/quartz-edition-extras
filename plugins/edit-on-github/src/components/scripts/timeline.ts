/**
 * The version history as readers see it (batch 2a, Part B): three states, not a
 * branch graph. Published (on the live branch), Being edited (accepted, on drafts,
 * not yet published) and Proposed (open proposals and notes, waiting for the
 * authors), with the book's releases as milestones. The data is quartz-book's
 * /.well-known/history.json (built with the site) and the function's /api/history
 * (what is proposed, asked for when the panel opens). Pure helpers; history.ts
 * (a page's panel) and book-history.ts (the book's /history page) draw them.
 */
import type { Role } from "./roles";

export interface Entry {
  sha: string;
  date: string;
  who: string;
  role: Role | null;
  summary: string;
  pr?: number;
  /** The page's path in that commit, where it has moved since. */
  path?: string;
}
export interface PageHistory {
  path: string;
  source: string;
  title: string;
  published: Entry[];
  drafts: Entry[];
  releases: Record<string, string | null>;
}
export interface Release {
  tag: string;
  date: string;
}
export interface BookHistory {
  version: number;
  releases: Release[];
  pages: PageHistory[];
}
export interface OpenItem {
  kind: "edit" | "note" | "suggestion";
  number: number;
  url: string;
  date: string;
  summary: string;
  who: { name: string; github?: string } | null;
  paragraph?: number;
  files?: string[];
}

/** The book's history file, or null when it isn't one (an edition, a site built before it). */
export const readBookHistory = (data: unknown): BookHistory | null => {
  const d = data as BookHistory | null;
  return d && d.version === 1 && Array.isArray(d.pages) && Array.isArray(d.releases) ? d : null;
};

/** "2026 edition" for a year's tag (v2026), else "Release 0.1". */
export const releaseLabel = (tag: string): string => {
  const t = tag.replace(/^v/i, "");
  return /^\d{4}$/.test(t) ? `${t} edition` : `Release ${t}`;
};

/** /api/history beside the configured /api/page-revision, with its book. "" if it can't be derived. */
export const historyApi = (revisionEndpoint: string, path = ""): string => {
  try {
    const rev = new URL(revisionEndpoint, "https://x.invalid");
    const url = new URL("history", rev);
    url.searchParams.set("book", rev.searchParams.get("book") ?? "");
    if (path) url.searchParams.set("path", path);
    return revisionEndpoint.startsWith("http") ? url.toString() : `${url.pathname}${url.search}`;
  } catch {
    return "";
  }
};

/** The role of the person behind an open item: theirs in the page's history if they have one there, else contributor. */
export const openRole = (item: OpenItem, known: Entry[]): Role => {
  const names = [item.who?.github, item.who?.name].filter(Boolean).map((n) => n!.toLowerCase());
  const seen = known.find(
    (e) => e.role && e.role !== "contributor" && names.includes(e.who.toLowerCase()),
  );
  return seen?.role ?? "contributor";
};

/** What a proposal or note is, in words: "Proposed edit", "Note on ¶4", "Suggestion". */
export const openKind = (item: OpenItem): string =>
  item.kind === "edit"
    ? "Proposed edit"
    : item.kind === "note"
      ? item.paragraph
        ? `Note on ¶${item.paragraph}`
        : "Note"
      : "Suggestion";

export type Row = { release: Release } | { entry: Entry };

/**
 * The published versions, newest first, with each release as a milestone where it
 * falls: after (above) the changes made since it, before the ones it contains.
 */
export const withReleases = (published: Entry[], releases: Release[]): Row[] => {
  const rows: Row[] = [];
  const pending = [...releases].sort((a, b) => b.date.localeCompare(a.date));
  for (const entry of published) {
    while (pending.length && pending[0]!.date >= entry.date)
      rows.push({ release: pending.shift()! });
    rows.push({ entry });
  }
  for (const release of pending) rows.push({ release });
  return rows;
};

/** The entries of the whole book, newest first, each with its page: the /history timeline. */
export interface BookRow extends Entry {
  state: "published" | "drafts";
  page: PageHistory;
}
export const bookRows = (h: BookHistory): BookRow[] =>
  h.pages
    .flatMap((page) => [
      ...page.drafts.map((e) => ({ ...e, state: "drafts" as const, page })),
      ...page.published.map((e) => ({ ...e, state: "published" as const, page })),
    ])
    .sort(
      (a, b) =>
        b.date.localeCompare(a.date) ||
        a.page.title.localeCompare(b.page.title) ||
        a.sha.localeCompare(b.sha),
    );

/** Filters for the /history timeline: "" means any. */
export interface Filter {
  page: string;
  person: string;
  state: "" | "proposed" | "drafts" | "published";
}
export const matchesFilter = (
  f: Filter,
  row: { page?: string; who: string; state: string },
): boolean =>
  (!f.page || row.page === f.page) &&
  (!f.person || row.who.toLowerCase() === f.person.toLowerCase()) &&
  (!f.state || row.state === f.state);
