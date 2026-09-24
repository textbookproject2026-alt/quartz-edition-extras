/**
 * A page's topic, and which colour each topic gets.
 *
 * The rule matches quartz-book's builder/lib.mjs (topicOf), so a page reads as
 * the same topic in its book's graph and in the portal's catalog:
 *   1. frontmatter `topic:` (a string, or the first entry of a list);
 *   2. else the first frontmatter tag, other than the `concept` marker;
 *   3. else none.
 *
 * Colours are categorical slots, handed out once per build to the most-used
 * topics (most pages first, then A–Z). There are TOPIC_SLOTS of them; any
 * topic past that shares the neutral "Other" colour rather than getting a
 * made-up hue. The slot is fixed for the build, so highlighting a topic in the
 * legend never repaints the others.
 */

export const TOPIC_SLOTS = 8;

type Frontmatter = Record<string, unknown> | undefined;

const firstText = (value: unknown): string => {
  const list = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];
  for (const v of list) {
    const s = String(v ?? "").trim();
    if (s) return s;
  }
  return "";
};

const normaliseTag = (tag: string) => tag.trim().replace(/^#+/, "").toLowerCase();

/** The topic a page's frontmatter gives it, as written, or null. */
export function topicOf(frontmatter: Frontmatter): string | null {
  const fm = frontmatter ?? {};
  const explicit = firstText(fm.topic);
  if (explicit) return explicit;
  const raw = fm.tags ?? fm.tag;
  const tags = (Array.isArray(raw) ? raw : typeof raw === "string" ? raw.split(",") : [])
    .map((t) => normaliseTag(String(t ?? "")))
    .filter((t) => t && t !== "concept");
  return tags[0] ?? null;
}

/** Two spellings of one topic ("Social theory", "social  theory") are one topic. */
export const topicKey = (label: string) => label.trim().toLowerCase().replace(/\s+/g, " ");

export interface TopicIndex {
  /** Topic labels in slot order: topics[i] is drawn in --tb-topic-(i+1). */
  topics: string[];
  /** Page slug -> slot. Pages with no topic, or one past the last slot, are absent: "Other". */
  pages: Record<string, number>;
}

export function topicIndex(files: { slug?: unknown; frontmatter?: Frontmatter }[]): TopicIndex {
  const byKey = new Map<string, { label: string; count: number; slugs: string[] }>();
  for (const f of files) {
    if (typeof f.slug !== "string") continue;
    const label = topicOf(f.frontmatter);
    if (!label) continue;
    const key = topicKey(label);
    let t = byKey.get(key);
    if (!t) byKey.set(key, (t = { label, count: 0, slugs: [] }));
    t.count++;
    t.slugs.push(f.slug);
  }
  const ranked = [...byKey.values()]
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "en", { sensitivity: "base" }))
    .slice(0, TOPIC_SLOTS);
  const pages: Record<string, number> = {};
  ranked.forEach((t, i) => {
    for (const s of t.slugs) pages[s] = i;
  });
  return { topics: ranked.map((t) => t.label), pages };
}
