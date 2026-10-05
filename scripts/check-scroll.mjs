#!/usr/bin/env node
// Checks a Quartz build: a chapter opened with no #fragment stays at the top.
// Quartz's explorer scrolls the current page's entry into view when it
// renders, which used to scroll the window as well (edition-integrations'
// explorerKeepsPageStill). It serves the build locally and drives headless
// Chrome over the DevTools protocol (Node 22+'s WebSocket; no npm packages).
//
//   node scripts/check-scroll.mjs <out-dir> [page.html]
//
// <page.html> is a chapter, relative to <out-dir> (default
// chapters/introduction.html). At 1280x800, three seconds after load, the
// window must be at scrollY 0 and the explorer's active entry inside the
// explorer's list. Hypothes.is and Plausible are blocked. Chrome is found at
// $CHROME or its usual macOS path.
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { existsSync, mkdtempSync, readFileSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";

const [out, page = "chapters/introduction.html"] = process.argv.slice(2);
if (!out) {
  console.error("usage: check-scroll.mjs <out-dir> [page.html]");
  process.exit(2);
}
const CHROME =
  process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

let failed = 0;
const check = (name, ok, detail) => {
  console.log(`[${ok ? "  ok  " : " FAIL "}] ${name}${ok ? "" : `\n         ${JSON.stringify(detail)}`}`);
  if (!ok) failed++;
};

const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png" };
const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname).replace(/^\/+/, "");
  const file = [path, `${path}.html`, join(path, "index.html")].map((c) => join(out, c))
    .find((f) => existsSync(f) && statSync(f).isFile());
  if (!file) return res.writeHead(404).end();
  res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = `http://127.0.0.1:${server.address().port}`;

const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=0", "--no-first-run",
  `--user-data-dir=${mkdtempSync(join(tmpdir(), "check-scroll-"))}`, "about:blank"],
  { stdio: ["ignore", "ignore", "pipe"] });
const wsUrl = await new Promise((resolve, reject) => {
  let err = "";
  chrome.stderr.on("data", (d) => {
    err += d;
    const m = /DevTools listening on (ws:\S+)/.exec(err);
    if (m) resolve(m[1]);
  });
  chrome.on("exit", () => reject(new Error(`Chrome exited: ${err}`)));
});
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let nextId = 0;
const waiting = new Map();
const events = [];
ws.addEventListener("message", ({ data }) => {
  const msg = JSON.parse(data);
  if (msg.id && waiting.has(msg.id)) {
    const { resolve, reject } = waiting.get(msg.id);
    waiting.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  } else if (msg.method) events.forEach((fn) => fn(msg));
});
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const id = ++nextId;
    waiting.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, ...(sessionId && { sessionId }) }));
  });
const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
const cdp = (method, params) => send(method, params, sessionId);

try {
  await cdp("Page.enable");
  await cdp("Page.bringToFront"); // a background tab gets no animation frames: no smooth scroll
  await cdp("Network.enable");
  await cdp("Network.setBlockedURLs", { urls: ["*hypothes.is*", "*plausible.io*"] });
  await cdp("Emulation.setDeviceMetricsOverride", { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
  const loaded = new Promise((r) => events.push((m) => m.method === "Page.loadEventFired" && r()));
  await cdp("Page.navigate", { url: `${origin}/${page}` });
  await loaded;
  await new Promise((r) => setTimeout(r, 3000));
  const { result } = await cdp("Runtime.evaluate", { returnByValue: true, expression: `(() => {
    const list = document.querySelector(".explorer-ul"), active = list?.querySelector(".active");
    const r = active?.getBoundingClientRect(), box = list?.getBoundingClientRect();
    return { scrollY, hash: location.hash, active: !!active,
      inside: !!r && r.top >= box.top && r.bottom <= box.bottom };
  })()` });
  const seen = result.value;
  check(`${page} opened with no #fragment at 1280x800 is at the top 3s after load`,
    seen.scrollY === 0 && !seen.hash, seen);
  check("…and the explorer's active entry is inside the explorer's list", seen.active && seen.inside, seen);
} finally {
  chrome.kill();
  server.close();
}
console.log(`\n  ${failed ? `${failed} failed` : "all passed"}`);
process.exit(failed ? 1 : 0);
