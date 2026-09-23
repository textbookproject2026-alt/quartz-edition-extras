#!/usr/bin/env node
// Checks a Quartz build for BOOK-ONE-TO-QUARTZ §8 step 6: that design.yaml's
// values are what a reader's browser ends up with, on screen, in the graph
// and in print. It serves the build locally and drives headless Chrome over
// the DevTools protocol (Node 22+'s WebSocket; no npm packages).
//
//   node scripts/check-design.mjs <out-dir> <design.yaml> [page.html] [--pdf <file>]
//
// <design.yaml> is the file the build used (the installed plugin's copy).
// <page.html> is a chapter, relative to <out-dir> (default
// chapters/chapter-03.html). --pdf also saves the page's print as a PDF.
// Hypothes.is and Plausible are blocked: a fake highlight stands in for the
// annotation layer. Chrome is found at $CHROME or its usual macOS path.
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { existsSync, mkdtempSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { inflateSync } from "node:zlib";

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(here, "../plugins/edition-integrations/package.json"));
const { parse } = require("yaml");

const args = process.argv.slice(2);
const pdfAt = args.indexOf("--pdf");
const pdfOut = pdfAt === -1 ? null : args.splice(pdfAt, 2)[1];
const [out, designFile, page = "chapters/chapter-03.html"] = args;
if (!designFile) {
  console.error("usage: check-design.mjs <out-dir> <design.yaml> [page.html] [--pdf <file>]");
  process.exit(2);
}
const CHROME =
  process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const design = parse(readFileSync(designFile, "utf8"));
const light = design.palette.light;

let failed = 0;
const check = (name, ok, detail) => {
  console.log(`[${ok ? "  ok  " : " FAIL "}] ${name}${ok ? "" : `\n         ${JSON.stringify(detail)}`}`);
  if (!ok) failed++;
};

// --- 1. the built files ---------------------------------------------------------

const pages = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith(".html")) pages.push(path.slice(out.length + 1));
  }
};
walk(out);
const html = Object.fromEntries(pages.map((p) => [p, readFileSync(join(out, p), "utf8")]));
const styled = pages.filter((p) => (html[p].match(/--tb-measure:/g) ?? []).length === 1);
check(`every page (${pages.length}) carries the design stylesheet once`, styled.length === pages.length,
  pages.filter((p) => !styled.includes(p)));
const accentIn = pages.filter((p) => html[p].includes(`--secondary: ${light.accent};`));
check(`…with design.yaml's accent, ${light.accent}`, accentIn.length === pages.length,
  pages.filter((p) => !accentIn.includes(p)));
const leads = pages.filter((p) => html[p].includes('class="tb-lead"'));
check("no page has more than one lead paragraph",
  pages.every((p) => (html[p].match(/class="tb-lead"/g) ?? []).length <= 1));
console.log(`         lead paragraph on: ${leads.join(", ") || "(none)"}`);

// --- 2. a browser -------------------------------------------------------------------

const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png" };
const server = createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname).replace(/^\/+/, "");
  const candidates = [path, `${path}.html`, join(path, "index.html")];
  const file = candidates.map((c) => join(out, c)).find((f) => existsSync(f) && statSync(f).isFile());
  if (!file) return res.writeHead(404).end();
  res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = `http://127.0.0.1:${server.address().port}`;

const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=0", "--no-first-run",
  "--use-angle=swiftshader", "--enable-unsafe-swiftshader",
  `--user-data-dir=${mkdtempSync(join(tmpdir(), "check-design-"))}`, "about:blank"],
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
const listeners = [];
ws.addEventListener("message", ({ data }) => {
  const msg = JSON.parse(data);
  if (msg.id && waiting.has(msg.id)) {
    const { resolve, reject } = waiting.get(msg.id);
    waiting.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  } else if (msg.method) listeners.forEach((fn) => fn(msg));
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
await cdp("Page.enable");
await cdp("Page.bringToFront"); // a background tab gets no animation frames, so no graph
await cdp("Runtime.enable");
const pageErrors = [];
listeners.push((m) => {
  if (m.method !== "Runtime.exceptionThrown") return;
  const { exception, text } = m.params.exceptionDetails;
  pageErrors.push(exception?.description ?? text);
});
await cdp("Network.enable");
await cdp("Network.setBlockedURLs", { urls: ["*hypothes.is*", "*plausible.io*"] });
await cdp("Emulation.setDeviceMetricsOverride", { width: 1400, height: 1000, deviceScaleFactor: 1, mobile: false });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const open = async (path) => {
  const loaded = new Promise((r) => {
    const fn = (m) => m.method === "Page.loadEventFired" && m.sessionId === sessionId && r();
    listeners.push(fn);
  });
  await cdp("Page.navigate", { url: `${origin}/${path}` });
  await loaded;
  await sleep(2500); // the graph renders after load
};
const evaluate = async (expression) => {
  const { result, exceptionDetails } = await cdp("Runtime.evaluate",
    { expression, returnByValue: true, awaitPromise: true });
  if (exceptionDetails) throw new Error(JSON.stringify(exceptionDetails));
  return result.value;
};
const rootVar = (name) =>
  evaluate(`getComputedStyle(document.documentElement).getPropertyValue(${JSON.stringify(name)}).trim()`);
const style = (selector, prop) =>
  evaluate(`(() => { const el = document.querySelector(${JSON.stringify(selector)});
    return el ? getComputedStyle(el)[${JSON.stringify(prop)}] : null })()`);
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const css = (hex) => `rgb(${rgb(hex).join(", ")})`;

try {
  await open(page);
  check("the page runs without script errors", pageErrors.length === 0, pageErrors);

  // The variables Quartz's graph reads when it draws (graph.inline.ts: getComputedStyle
  // on <html>, --secondary --tertiary --gray --lightgray --dark --light --bodyFont).
  const graphVars = { "--secondary": light.accent, "--tertiary": light.accentHover,
    "--gray": light.faint, "--lightgray": light.border, "--dark": light.heading,
    "--light": light.background };
  const seen = {};
  for (const name of Object.keys(graphVars)) seen[name] = await rootVar(name);
  check("the variables the graph reads are design.yaml's palette",
    Object.entries(graphVars).every(([k, v]) => seen[k].toLowerCase() === v.toLowerCase()), seen);
  const bodyFont = await rootVar("--bodyFont");
  check(`…and its font, ${design.fonts.text}`, bodyFont.startsWith(`"${design.fonts.text}"`), bodyFont);

  // The graph as drawn: the current page's node is filled with --secondary.
  // At the top of the page: the graph's sidebar is sticky, so a scrolled page moves it.
  await evaluate("scrollTo(0, 0)");
  const box = await evaluate(`(() => { const r = document.querySelector(".graph-container")
    ?.getBoundingClientRect(); return r && { x: r.x, y: r.y, width: r.width, height: r.height } })()`);
  if (!box || !box.width) console.log("[  --  ] no graph on this page (it is off in this config): not checked");
  else {
    // It fetches its libraries from a CDN after load, so give it up to 10s to appear.
    let pixels;
    let count = 0;
    for (let tries = 0; tries < 20 && count === 0; tries++) {
      if (tries) await sleep(500);
      const shot = await cdp("Page.captureScreenshot", { format: "png", clip: { ...box, scale: 1 } });
      pixels = decodePng(Buffer.from(shot.data, "base64"));
      count = countNear(pixels, rgb(light.accent));
    }
    const offline = await evaluate(`/could not load/i.test(document.querySelector(".graph-container").textContent)`);
    let saved = count;
    if (offline) saved = "the graph says it could not load: it fetches d3 and pixi from cdn.jsdelivr.net, so this check needs the network";
    else if (!count) {
      saved = join(mkdtempSync(join(tmpdir(), "check-design-graph-")), "graph.png");
      const shot = await cdp("Page.captureScreenshot", { format: "png", clip: { ...box, scale: 1 } });
      writeFileSync(saved, Buffer.from(shot.data, "base64"));
    }
    check(`the graph is drawn in the accent (${count} pixels of ${light.accent})`, count > 0, saved);
    if (light.accent.toLowerCase() !== "#7c6cf0") {
      const old = countNear(pixels, rgb("#7C6CF0"));
      check(`…and none in the old accent (${old} pixels of #7C6CF0)`, old === 0, old);
    }
  }

  // The controls row and the type (publish.css §3, §4b).
  const row = { colour: await style(".tb-page-controls a", "color"),
    size: await style(".tb-page-controls a", "fontSize") };
  check("the controls row is the muted colour at the controls size",
    row.colour === css(light.muted) && row.size === `${parseFloat(design.controls.size) * 16}px`, row);
  const body = await style("article p:not(.tb-lead)", "fontSize");
  check("body text is design.yaml's size", body === `${parseFloat(design.type.body.size) * 16}px`, body);

  // Dark mode off: a dark saved-theme and a dark system both stay light.
  await cdp("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: "dark" }] });
  await evaluate(`document.documentElement.setAttribute("saved-theme", "dark")`);
  const darkBg = await rootVar("--light");
  const expectBg = design.darkMode ? design.palette.dark.background : light.background;
  check(`with a dark saved-theme, the background is ${expectBg} (darkMode: ${design.darkMode})`,
    darkBg.toLowerCase() === expectBg.toLowerCase(), darkBg);
  await evaluate(`document.documentElement.removeAttribute("saved-theme")`);
  await cdp("Emulation.setEmulatedMedia", { features: [] });

  // A stand-in for a Hypothes.is highlight, which the client wraps quoted text in.
  await evaluate(`(() => { const p = document.querySelector("article p");
    const h = document.createElement("hypothesis-highlight"); h.className = "hypothesis-highlight";
    h.textContent = "highlighted"; p.prepend(h) })()`);
  const screenHl = await style(".hypothesis-highlight", "backgroundColor");
  check(`on screen, a highlight is ${design.annotation.highlight}`,
    screenHl.replace(/\s/g, "") === design.annotation.highlight.replace(/\s/g, "").replace(/0\.(\d)0\)/, "0.$1)"),
    screenHl);

  // Print (publish.css §9).
  await cdp("Emulation.setEmulatedMedia", { media: "print" });
  await sleep(500); // Quartz's links transition their colour over 0.2s
  const hidden = await evaluate(`[".sidebar.left", ".sidebar.right", "#quartz-body > footer",
    ".breadcrumb-container", ".content-meta", ".tb-page-controls", ".page-footer"].map((s) => {
      const el = document.querySelector(s);
      return [s, el ? getComputedStyle(el).display : "absent"] })`);
  check("print hides the explorer, graph, outline, footer, breadcrumbs, reading time and controls",
    hidden.every(([, d]) => d === "none" || d === "absent"), hidden);
  const shown = await evaluate(`[".article-title", "article"].map((s) =>
    [s, getComputedStyle(document.querySelector(s)).display])`);
  check("…and keeps the title and the chapter", shown.every(([, d]) => d !== "none"), shown);
  const widths = await evaluate(`[document.querySelector("article").getBoundingClientRect().width,
    document.documentElement.clientWidth]`);
  check("the chapter prints at the full width", widths[0] >= widths[1] - 2, widths);
  const pt = parseFloat(design.print.size) * (96 / 72);
  const printed = { size: await style("article p:not(.tb-lead)", "fontSize"),
    colour: await style("article p:not(.tb-lead)", "color"),
    link: await style("article p a", "color"), linkLine: await style("article p a", "textDecorationLine"),
    highlight: await style(".hypothesis-highlight", "backgroundColor") };
  check(`text prints at ${design.print.size}, in black`,
    Math.abs(parseFloat(printed.size) - pt) < 0.1 && printed.colour === "rgb(0, 0, 0)", printed);
  if (printed.link === null) console.log("[  --  ] no link in a paragraph on this page: link print not checked");
  else check("links print black and underlined",
    printed.link === "rgb(0, 0, 0)" && printed.linkLine === "underline", printed);
  check("annotation highlights don't print", printed.highlight === "rgba(0, 0, 0, 0)", printed);
  const avoid = await evaluate(`["pre", "blockquote", "table"].map((t) => {
    const el = document.createElement(t); document.querySelector("article").append(el);
    const v = getComputedStyle(el).breakInside; el.remove(); return v })`);
  check("code, quotes and tables don't break across pages", avoid.every((v) => v === "avoid"), avoid);

  if (pdfOut) {
    await evaluate(`document.querySelector(".hypothesis-highlight")?.remove()`);
    const pdf = await cdp("Page.printToPDF", { preferCSSPageSize: true, printBackground: true });
    writeFileSync(pdfOut, Buffer.from(pdf.data, "base64"));
    console.log(`         print saved to ${pdfOut}`);
  }
  await cdp("Emulation.setEmulatedMedia", { media: "" });

  // The lead paragraph on a page that has one.
  if (leads[0]) {
    await open(leads[0]);
    const lead = await style("p.tb-lead", "fontSize");
    check(`the lead paragraph on ${leads[0]} is ${design.type.lead.size}`,
      lead === `${parseFloat(design.type.lead.size) * 16}px`, lead);
  }
} finally {
  await send("Browser.close").catch(() => {}); // closes its helper processes too
  ws.close();
  chrome.kill();
  server.close();
}

console.log(failed ? `\n${failed} check(s) failed` : "\nall checks passed");
process.exit(failed ? 1 : 0);

// --- PNG, just enough for Chrome's screenshots (8-bit RGB or RGBA) ------------------

function decodePng(buf) {
  let pos = 8;
  let width = 0;
  let height = 0;
  let channels = 4;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("ascii", pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      channels = data[9] === 6 ? 4 : 3;
    } else if (type === "IDAT") idat.push(data);
    pos += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const px = Buffer.alloc(height * stride);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    for (let x = 0; x < stride; x++) {
      const v = raw[y * (stride + 1) + 1 + x];
      const a = x >= channels ? px[y * stride + x - channels] : 0;
      const b = y > 0 ? px[(y - 1) * stride + x] : 0;
      const c = x >= channels && y > 0 ? px[(y - 1) * stride + x - channels] : 0;
      const p = a + b - c;
      const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
      const pred = [0, a, b, (a + b) >> 1, pa <= pb && pa <= pc ? a : pb <= pc ? b : c][filter];
      px[y * stride + x] = (v + pred) & 0xff;
    }
  }
  return { px, channels };
}

function countNear({ px, channels }, [r, g, b], tolerance = 12) {
  let n = 0;
  for (let i = 0; i < px.length; i += channels) {
    if (Math.abs(px[i] - r) <= tolerance && Math.abs(px[i + 1] - g) <= tolerance &&
        Math.abs(px[i + 2] - b) <= tolerance) n++;
  }
  return n;
}
