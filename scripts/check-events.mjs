#!/usr/bin/env node
// Checks a Quartz build for BOOK-ONE-TO-QUARTZ §8 step 4: the Plausible
// events, the hostname guard, the tag helper and the annotation badge, by
// running the page's own edition-integrations scripts in happy-dom.
//
//   node scripts/check-events.mjs <page-guard-at-test-host.html> \
//        <page-guard-at-real-domain.html> <real-domain> <path> [count-origin]
//
// The first page was built with siteDomain set to "localhost", the second with
// siteDomain set to <real-domain>; <path> is the page's URL path (e.g.
// /chapters/chapter-03). [count-origin] is where the badge's count is checked
// (default https://<real-domain>): pick one whose page has annotations, so the
// comparison isn't 0 = 0. The only network request is a read of the public
// Hypothes.is search API, to compare the badge's count with it. Needs
// `npm install` in plugins/edition-integrations (for happy-dom).
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(here, "../plugins/edition-integrations/package.json"));
const { Window } = require("happy-dom");

const [testPage, realPage, realDomain, path, countOrigin] = process.argv.slice(2);
if (!path) {
  console.error("usage: check-events.mjs <test-host page> <real-domain page> <real-domain> <path>");
  process.exit(2);
}

let failed = 0;
const check = (name, ok, detail) => {
  console.log(`[${ok ? "  ok  " : " FAIL "}] ${name}${ok ? "" : `\n         ${JSON.stringify(detail)}`}`);
  if (!ok) failed++;
};
const tick = (ms = 40) => new Promise((r) => setTimeout(r, ms));
// The inline <head> scripts edition-integrations emits, in page order.
const MARKERS = ["hypothesisConfig", "__tbAnalytics", "plausible.init", "tbTrack", "tb-tag-helper",
  "tb-anno-badge", "__editionIntegrations"];

/** Loads a built page at `url` with a spy for Plausible, running only our scripts. */
const load = (file, url, fetchImpl) => {
  const html = readFileSync(file, "utf8");
  const head = /<head>([\s\S]*?)<\/head>/.exec(html)[1];
  const scripts = [...head.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m) => m[1]).filter((js) => MARKERS.some((m) => js.includes(m)));
  const staticSrcs = [...head.matchAll(/<script[^>]*\bsrc="([^"]*)"/g)].map((m) => m[1]);
  const body = /<body[^>]*>([\s\S]*)<\/body>/.exec(html)[1].replace(/<script[\s\S]*?<\/script>/g, "");
  const w = new Window({ url, settings: { disableJavaScriptFileLoading: true,
    disableCSSFileLoading: true, disableIframePageLoading: true } });
  w.document.write(`<html><head></head><body>${body}</body></html>`);
  w.calls = [];
  w.eval("window.plausible = function () { window.calls.push([].slice.call(arguments)) }");
  w.fetch = fetchImpl;
  for (const js of scripts) w.eval(js);
  return { w, staticSrcs, ours: scripts.length };
};

/** Does what a reader does: open the sidebar, copy a tag, press the badge. */
const readerActs = async (w) => {
  await w.__tbAnnoBadge?.ready;
  const host = w.document.createElement("hypothesis-sidebar");
  host.attachShadow({ mode: "open" }).innerHTML = '<button aria-expanded="false"></button>';
  w.document.body.appendChild(host);
  await tick();
  host.shadowRoot.querySelector("button").setAttribute("aria-expanded", "true");
  await tick();
  w.document.querySelector("#tb-tag-helper button.tb-tag-chip")?.click();
  w.document.querySelector("button.tb-anno-badge")?.click();
  await tick();
};
const loaded = (w) => [...w.document.querySelectorAll("script[src]")].map((s) => s.getAttribute("src"));
const stubCount = async () => ({ ok: true, json: async () => ({ total: 2, rows: [] }) });

// 1. Guard at the test host, page served there: the three events, exactly.
{
  const { w, ours } = load(testPage, `http://localhost:8080${path}`, stubCount);
  await readerActs(w);
  check(`the page carries edition-integrations' scripts (${ours})`, ours >= 5, ours);
  check("Plausible's script is loaded on the host the guard names",
    loaded(w).some((s) => /plausible\.io\/js\/pa-/.test(s)), loaded(w));
  check("a spy on window.plausible sees the three events exactly as §1a names them",
    JSON.stringify(w.calls.map(([name, opts]) => [name, opts?.props ?? null])) === JSON.stringify([
      ["annotation_sidebar_opened", null],
      ["annotation_tag_copied", { tag: "copy-edit" }],
      ["annotation_badge_clicked", null],
    ]), w.calls);
  await w.happyDOM.close();
}

// 2. Guard at the real domain, page served from localhost and from pages.dev: nothing.
for (const origin of ["http://localhost:8080", "https://social-research-methods.pages.dev"]) {
  const { w, staticSrcs } = load(realPage, origin + path, stubCount);
  await readerActs(w);
  const host = new URL(origin).hostname;
  check(`on ${host}, no Plausible script at all (no pageview possible)`,
    !loaded(w).some((s) => s.includes("plausible")) &&
      !staticSrcs.some((s) => s.includes("plausible")), loaded(w));
  check(`on ${host}, the spy sees no call, and init never ran`,
    w.calls.length === 0 && w.plausible.o === undefined, w.calls);
  check(`on ${host}, the helper and the badge still work`,
    !!w.document.querySelector("button.tb-anno-badge") &&
      !!w.document.getElementById("tb-tag-helper"));
  await w.happyDOM.close();
}

// 3. The badge's count, from the real API, equals the API's own answer.
{
  const uri = `${countOrigin || `https://${realDomain}`}${path}`;
  const { w } = load(realPage, uri, (...a) => fetch(...a));
  const shown = await w.__tbAnnoBadge.ready;
  const badge = w.document.querySelector("button.tb-anno-badge")?.textContent;
  const res = await fetch("https://api.hypothes.is/api/search?limit=0&uri=" + encodeURIComponent(uri));
  const total = (await res.json()).total;
  const want = total === 0 ? "Annotate this page" : total === 1 ? "1 annotation" : `${total} annotations`;
  check(`the badge for ${uri} shows the API's count (${total})`, shown === total && badge === want,
    { shown, badge, total });
  await w.happyDOM.close();
}

// 4. And on the real domain itself, Plausible loads.
{
  const { w } = load(realPage, `https://${realDomain}${path}`, stubCount);
  check(`on ${realDomain}, Plausible loads`, loaded(w).some((s) => s.includes("plausible")));
  await w.happyDOM.close();
}

console.log(`\n  ${failed ? `${failed} failed` : "all passed"}`);
process.exit(failed ? 1 : 0);
