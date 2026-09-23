#!/usr/bin/env node
// Checks a Quartz build of a book for BOOK-ONE-TO-QUARTZ §8 step 3: the
// citation fix and the title transform, in edition-integrations.
//
//   node scripts/check-citations-and-titles.mjs <source> <before> <after>
//
// <source> is the book's markdown, <before> a build with the plugin as it was,
// <after> a build with the branch installed. Both builds from the same source.
// Exits 1 if any check fails. Reads only; writes nothing.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const [source, before, after] = process.argv.slice(2);
if (!after) {
  console.error("usage: check-citations-and-titles.mjs <source> <before> <after>");
  process.exit(2);
}

let failed = 0;
const check = (name, ok, detail = "") => {
  console.log(`[${ok ? "  ok  " : " FAIL "}] ${name}${ok || !detail ? "" : `\n         ${detail}`}`);
  if (!ok) failed++;
};

const files = (dir, ext) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return files(full, ext);
    return full.endsWith(ext) ? [full] : [];
  });

const read = (path) => readFileSync(path, "utf8");
const article = (html) => (/<article[^>]*>([\s\S]*?)<\/article>/.exec(html) ?? [, ""])[1];
const titleOf = (html) => (/<title>([^<]*)<\/title>/.exec(html) ?? [, null])[1];
const hrefs = (html) => [...html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)].map((m) => m[1]);
const ids = (html) => new Set([...html.matchAll(/\bid="([^"]*)"/g)].map((m) => m[1]));
const h1s = (html) => (html.match(/<h1\b/g) ?? []).length;
// What a page says apart from the build's hashed asset names.
const normal = (html) => html.replace(/resource-[a-z]+-[0-9a-f]+\.(js|css)/g, "resource");
const decode = (s) =>
  s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">");

// 1. No dead same-page citation anywhere.
const pages = files(after, ".html");
const dead = pages.filter((p) => /href="#(%5E|\^)/i.test(read(p)));
check("no href=\"#%5E (or #^) anywhere in the build", dead.length === 0,
  dead.map((p) => relative(after, p)).join(", "));

// 2. Chapter 3: every same-page citation lands on an id on the same page.
const ch3 = read(join(after, "chapters/chapter-03.html"));
const ch3Before = read(join(before, "chapters/chapter-03.html"));
const deadBefore = hrefs(ch3Before).filter((h) => /^#%5E/i.test(h));
const cites = hrefs(article(ch3)).filter((h) => /^#ref-/.test(h));
const pageIds = ids(ch3);
const missing = cites.filter((h) => !pageIds.has(h.slice(1)));
check(`Chapter 3 had ${deadBefore.length} dead citations before; now ${cites.length} same-page citations`,
  deadBefore.length === 32 && cites.length === 32, `${deadBefore.length} before, ${cites.length} after`);
check("each of them matches an id on the same page", missing.length === 0, missing.join(" "));

// 3. Cross-page citations are unchanged, on every page.
const crossChanged = [];
for (const page of pages) {
  const rel = relative(after, page);
  let old;
  try { old = read(join(before, rel)); } catch { continue; }
  const cross = (html) => hrefs(html).filter((h) => !h.startsWith("#") && h.includes("#ref-"));
  if (JSON.stringify(cross(old)) !== JSON.stringify(cross(read(page)))) crossChanged.push(rel);
}
check("cross-page citations are the same before and after", crossChanged.length === 0,
  crossChanged.join(", "));

// 4. Chapter 3's title comes from its H1, everywhere Quartz shows a title.
const h1Text = /^#\s+(.+?)\s*$/m.exec(read(join(source, "chapters/chapter-03.md")))[1]
  .replace(/[*_`]/g, "");
check("<title> reads the chapter's own heading",
  decode(titleOf(ch3) ?? "").startsWith(h1Text), `${titleOf(ch3)} / wanted ${h1Text}`);
const index = JSON.parse(read(join(after, "static/contentIndex.json")));
check("search and the explorer (contentIndex.json) read it too",
  index["chapters/chapter-03"]?.title === h1Text, index["chapters/chapter-03"]?.title);
// Quartz draws the article title as an H1 above <article>; the chapter's own
// H1 used to follow it inside, which made two.
check("one H1 on the page, where there were two", h1s(ch3) === 1 && h1s(ch3Before) === 2,
  `${h1s(ch3)} (was ${h1s(ch3Before)})`);
check("and it is the article title, reading the heading's text",
  decode((/<h1 class="article-title"[^>]*>([\s\S]*?)<\/h1>/.exec(ch3) ?? [, ""])[1]
    .replace(/<[^>]+>/g, "")).trim() === h1Text);

// 5. A page with its own frontmatter title, and pages with no H1, as they were.
const mdFiles = files(source, ".md");
const withTitle = mdFiles.filter((f) => /^---\r?\n[\s\S]*?^title:\s*\S/m.test(read(f).split(/\n---/)[0] + "\n"));
const noH1 = mdFiles.filter((f) => !/^#\s/m.test(read(f)));
const asBefore = (f) => {
  const rel = relative(source, f).replace(/\.md$/, ".html");
  const name = rel.split("/").map((s) => s.replace(/ /g, "-")).join("/");
  for (const candidate of [rel, name]) {
    try {
      return normal(read(join(before, candidate))) === normal(read(join(after, candidate)));
    } catch { /* try the other spelling */ }
  }
  return null;
};
const titleResults = withTitle.map((f) => [relative(source, f), asBefore(f)]);
check(`a page with a frontmatter title is byte-identical to before (${titleResults.length})`,
  titleResults.length > 0 && titleResults.every(([, same]) => same === true),
  JSON.stringify(titleResults));
const noH1Results = noH1.map((f) => [relative(source, f), asBefore(f)]).filter(([, s]) => s !== null);
check(`pages with no H1 are byte-identical to before (${noH1Results.length})`,
  noH1Results.length > 0 && noH1Results.every(([, same]) => same === true),
  JSON.stringify(noH1Results.filter(([, s]) => !s)));

console.log(`\n  ${failed ? `${failed} failed` : "all passed"}`);
process.exit(failed ? 1 : 0);
