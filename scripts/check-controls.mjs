#!/usr/bin/env node
// Checks a Quartz build for BOOK-ONE-TO-QUARTZ §8 step 5: the controls row,
// the suggest modal and its events, by running the built page's own scripts
// (edition-integrations' <head> scripts and edit-on-github's page script) in
// happy-dom.
//
//   node scripts/check-controls.mjs <out-dir> <page.html> <expected-edit-href>
//
// <out-dir> is the build's output; <page.html> a page in it, relative to it
// (e.g. chapters/chapter-03.html). The build must have edit-on-github's
// suggestEndpoint set, and edition-integrations' siteDomain set to
// "localhost", so events reach Plausible (a spy here). No network: the
// function's answers are stubbed. Needs `npm install` in
// plugins/edit-on-github (for happy-dom).
import { createRequire } from "node:module";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(here, "../plugins/edit-on-github/package.json"));
const { Window } = require("happy-dom");

const [out, pageFile, wantEdit] = process.argv.slice(2);
if (!wantEdit) {
  console.error("usage: check-controls.mjs <out-dir> <page.html> <expected-edit-href>");
  process.exit(2);
}

let failed = 0;
const check = (name, ok, detail) => {
  console.log(`[${ok ? "  ok  " : " FAIL "}] ${name}${ok ? "" : `\n         ${JSON.stringify(detail)}`}`);
  if (!ok) failed++;
};
const tick = (ms = 30) => new Promise((r) => setTimeout(r, ms));

// edition-integrations' inline <head> scripts, as check-events.mjs finds them
// (not Hypothes.is itself: the badge's count is stubbed at 0).
const MARKERS = ["__tbAnalytics", "plausible.init", "tbTrack", "tb-anno-badge"];
const html = readFileSync(join(out, pageFile), "utf8");
const head = /<head>([\s\S]*?)<\/head>/.exec(html)[1];
const headScripts = [...head.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
  .map((m) => m[1]).filter((js) => MARKERS.some((m) => js.includes(m)));
// edit-on-github's page script: Quartz emits each component script as its own file.
const scriptsDir = join(out, "static", "scripts");
const controls = readdirSync(scriptsDir).map((f) => readFileSync(join(scriptsDir, f), "utf8"))
  .filter((js) => js.includes("tb-suggest-overlay"));
const body = /<body[^>]*>([\s\S]*)<\/body>/.exec(html)[1].replace(/<script[\s\S]*?<\/script>/g, "");

check("the build carries the controls script exactly once", controls.length === 1, controls.length);

/** The page at http://localhost:8080/<page>, with a Plausible spy and a stub function. */
const load = (answer) => {
  const w = new Window({ url: `http://localhost:8080/${pageFile.replace(/\.html$/, "")}`,
    settings: { disableJavaScriptFileLoading: true, disableCSSFileLoading: true,
      disableIframePageLoading: true } });
  w.document.write(`<html><head></head><body>${body}</body></html>`);
  w.calls = [];
  w.posts = [];
  w.eval("window.plausible = function () { window.calls.push([].slice.call(arguments)) }");
  w.fetch = async (url, init) => {
    if (String(url).includes("hypothes.is")) return { ok: true, json: async () => ({ total: 0 }) };
    if (!init?.body) return answer(); // the editor's GET of the page source
    w.posts.push([url, JSON.parse(init.body)]);
    return answer();
  };
  for (const js of headScripts) w.eval(js);
  w.eval(controls[0]);
  w.document.dispatchEvent(new w.CustomEvent("nav"));
  return w;
};

/** A key press; on an unprevented Tab, focus moves as a browser would move it. */
const press = (w, key, shiftKey = false) => {
  const e = new w.KeyboardEvent("keydown", { key, shiftKey, bubbles: true, cancelable: true });
  (w.document.activeElement ?? w.document.body).dispatchEvent(e);
  if (key !== "Tab" || e.defaultPrevented) return;
  const all = [...w.document.querySelectorAll("a[href], button, input, textarea, [tabindex]")]
    .filter((el) => el.tabIndex >= 0 && !el.closest("[hidden]") && !el.disabled);
  const next = all[all.indexOf(w.document.activeElement) + (shiftKey ? -1 : 1)];
  if (next) next.focus();
  else w.document.activeElement?.blur();
};

// 1. The links.
{
  const w = load();
  const edit = w.document.querySelector(".tb-page-controls a.edit-on-github");
  check(`Edit is ${wantEdit}`, edit?.getAttribute("href") === wantEdit, edit?.getAttribute("href"));
  const history = w.document.querySelector(".tb-page-controls a.tb-history-link");
  check("History is the same file's commit list",
    history?.getAttribute("href") === wantEdit.replace("/edit/", "/commits/"),
    history?.getAttribute("href"));
  const btn = w.document.querySelector(".tb-page-controls button.tb-suggest-btn");
  check("Suggest an edit is shown once the script has armed it", btn && !btn.hidden);
  await w.__tbAnnoBadge?.ready;
  const row = [...w.document.querySelector(".tb-page-controls").children].map((el) => el.className);
  check("the row reads Edit, History, Suggest, then the annotation badge",
    JSON.stringify(row) === JSON.stringify(["edit-on-github", "tb-history-link", "tb-suggest-btn",
      "tb-anno-badge"]), row);
  await w.happyDOM.close();
}

// 2. Keyboard only: open, hold focus, give it back on Escape.
{
  const w = load();
  const btn = w.document.querySelector("button.tb-suggest-btn");
  btn.focus();
  btn.click(); // what Enter or Space on a focused <button> does
  const dialog = w.document.querySelector('#tb-suggest-overlay [role="dialog"][aria-modal="true"]');
  check("the modal opens with focus on its first field",
    !!dialog && w.document.activeElement?.id === "tb-sg-name", w.document.activeElement?.id);
  let escaped = null;
  const seen = new Set();
  for (const shift of [false, true]) {
    for (let i = 0; i < 20; i++) {
      press(w, "Tab", shift);
      const el = w.document.activeElement;
      seen.add(el?.id || el?.className);
      if (!dialog.contains(el)) escaped = escaped ?? (el?.outerHTML?.slice(0, 80) ?? "nothing");
    }
  }
  check("20 Tabs and 20 Shift+Tabs never leave the dialog", escaped === null, escaped);
  check("…and never reach the honeypot", !seen.has("tb-sg-website"), [...seen]);
  press(w, "Escape");
  check("Escape closes it", !w.document.getElementById("tb-suggest-overlay"));
  check("…and focus is back on Suggest an edit", w.document.activeElement === btn,
    w.document.activeElement?.outerHTML?.slice(0, 80));
  await w.happyDOM.close();
}

// 3. The three event names, exactly, and the honeypot sends nothing.
{
  let answer = { ok: true, status: 201, json: async () => ({ issueUrl: "https://example.org/1" }) };
  const w = load(() => answer);
  const send = async (website = "") => {
    w.document.querySelector("button.tb-suggest-btn").click();
    w.document.getElementById("tb-sg-name").value = "A Reader";
    w.document.getElementById("tb-sg-email").value = "reader@example.org";
    w.document.getElementById("tb-sg-suggestion").value = "a change";
    w.document.getElementById("tb-sg-website").value = website;
    w.document.querySelector("#tb-suggest-overlay form").requestSubmit();
    await tick();
    const title = w.document.querySelector(".tb-sg-pane-title")?.textContent;
    press(w, "Escape");
    return title;
  };
  const edit = w.document.querySelector("a.edit-on-github");
  edit.addEventListener("click", (e) => e.preventDefault());
  // A modified click is still the GitHub link (a plain one opens the in-site editor).
  edit.dispatchEvent(new w.MouseEvent("click", { bubbles: true, cancelable: true, ctrlKey: true }));
  await send();
  answer = { ok: false, status: 429, json: async () => ({ error: "x", userMessage: "Slow down." }) };
  await send();
  const before = w.posts.length;
  const hpTitle = await send("https://spam.example");
  check("with the honeypot filled, nothing is sent and the reader sees thanks",
    w.posts.length === before && hpTitle === "Thank you", { posts: w.posts.length - before, hpTitle });
  check("the POST carries the page's repo path",
    w.posts[0]?.[1]?.path === wantEdit.split("/edit/")[1].split("/").slice(1).map(decodeURIComponent).join("/"),
    w.posts[0]?.[1]);
  const events = w.calls.filter(([n]) => n !== "pageview")
    .map(([name, opts]) => [name, opts?.props ?? null]);
  check("a spy on window.plausible sees the three events exactly as §1a names them",
    JSON.stringify(events) === JSON.stringify([
      ["edit_on_github_clicked", null],
      ["suggest_edit_opened", null],
      ["suggest_edit_submitted", { outcome: "success" }],
      ["suggest_edit_opened", null],
      ["suggest_edit_submitted", { outcome: "error" }],
      ["suggest_edit_opened", null],
    ]), events);
  await w.happyDOM.close();
}

// 4. The in-site editor is armed: the Edit link opens it, numbered paragraphs get a pencil.
{
  const w = load(() => ({ ok: true, status: 200, json: async () => ({}) }));
  const edit = w.document.querySelector("a.edit-on-github");
  check("Edit reads \"Edit this page\" and points the editor at /api/propose-edit",
    edit?.textContent === "Edit this page" && /\/api\/propose-edit$/.test(edit?.dataset.editEndpoint ?? ""),
    [edit?.textContent, edit?.dataset.editEndpoint]);
  const numbered = w.document.querySelectorAll("[data-pnum]").length;
  const pencils = w.document.querySelectorAll("[data-pnum] > button.tb-pedit").length;
  check("one pencil per numbered paragraph", numbered > 0 && pencils === numbered, { numbered, pencils });
  edit.click();
  check("a plain click opens the editor", !!w.document.getElementById("tb-editor"));
  press(w, "Escape");
  await w.happyDOM.close();
}

console.log(`\n  ${failed ? `${failed} failed` : "all passed"}`);
process.exit(failed ? 1 : 0);
