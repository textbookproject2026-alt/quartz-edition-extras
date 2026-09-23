import { createRequire } from 'module';

createRequire(import.meta.url);

// node_modules/preact/dist/preact.mjs
var n;
var l;
var u;
var v = [];
function _(l2, u2, t2) {
  var i2, o2, r2, e2 = {};
  for (r2 in u2) "key" == r2 ? i2 = u2[r2] : "ref" == r2 ? o2 = u2[r2] : e2[r2] = u2[r2];
  if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (r2 in l2.defaultProps) void 0 === e2[r2] && (e2[r2] = l2.defaultProps[r2]);
  return m(l2, e2, i2, o2, null);
}
function m(n2, t2, i2, o2, r2) {
  var e2 = { type: n2, props: t2, key: i2, ref: o2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == r2 ? ++u : r2, __i: -1, __u: 0 };
  return null != l.vnode && l.vnode(e2), e2;
}
n = v.slice, l = { __e: function(n2, l2, u2, t2) {
  for (var i2, o2, r2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((o2 = i2.constructor) && null != o2.getDerivedStateFromError && (i2.setState(o2.getDerivedStateFromError(n2)), r2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), r2 = i2.__d), r2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, u = 0, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

// src/transforms.ts
var walk = (node, fn) => {
  fn(node);
  for (const child of node.children ?? []) walk(child, fn);
};
var textOf = (node) => node.type === "text" ? node.value ?? "" : (node.children ?? []).map(textOf).join("");
var BLOCK_REF = /^#(?:\^|%5[Ee])(.+)$/;
var fixBlockRefLinks = (tree) => {
  let changed = 0;
  walk(tree, (node) => {
    if (node.type !== "element" || node.tagName !== "a") return;
    const href = node.properties?.href;
    if (typeof href !== "string") return;
    const match = BLOCK_REF.exec(href);
    if (!match) return;
    node.properties.href = `#${match[1]}`;
    changed++;
  });
  return changed;
};
var hasOwnTitle = (source) => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source.trimStart());
  if (!match) return false;
  const line = /^title\s*:\s*(.*?)\s*$/m.exec(match[1]);
  if (!line) return false;
  const value = line[1].replace(/^(["'])(.*)\1$/, "$2").trim();
  return value.length > 0;
};
var titleFromFirstHeading = (tree, data, source) => {
  if (hasOwnTitle(source)) return null;
  const children = tree.children ?? [];
  const index = children.findIndex((n2) => n2.type === "element" && n2.tagName === "h1");
  if (index === -1) return null;
  const h1 = children[index];
  const title = textOf(h1).replace(/\s+/g, " ").trim();
  if (!title) return null;
  children.splice(index, 1);
  data.frontmatter = { ...data.frontmatter ?? {}, title };
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

// src/runtime.ts
var analyticsLoader = (src, siteDomain) => `
;(function () {
  var allowed = location.hostname === ${JSON.stringify(siteDomain)}
  window.__tbAnalytics = allowed
  if (!allowed) return
  window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) }
  window.plausible.init = window.plausible.init || function (o) { window.plausible.o = o || {} }
  window.plausible.init()
  var s = document.createElement("script")
  s.async = true
  s.src = ${JSON.stringify(src)}
  document.head.appendChild(s)
})()
`;
var trackRuntime = `
window.tbTrack = window.tbTrack || function (name, props) {
  try {
    if (window.__tbAnalytics === false) return
    if (typeof window.plausible !== "function") return
    window.plausible(name, props ? { props: props } : undefined)
  } catch (e) { /* analytics may never break a reader's path */ }
}
`;
var noTracking = `
window.tbTrack = window.tbTrack || function () {}
`;
var tagHelper = `
;(function () {
  try {
    var PANEL_ID = "tb-tag-helper"
    var STYLE_ID = "tb-tag-helper-style"
    // Locked vocabulary: these exact strings feed tag-filtered tooling.
    var TAGS = ["copy-edit", "discussion"]
    var dismissed = false
    var arrivalObserver = null, arrivalTimer = null, probeTimer = null, probeAttempts = 0
    var stateObserver = null, attachedHost = null, sidebarOpen = false, flashTimer = null
    var onResize = null

    var teardown = function () {
      if (arrivalObserver) { arrivalObserver.disconnect(); arrivalObserver = null }
      if (stateObserver) { stateObserver.disconnect(); stateObserver = null }
      attachedHost = null
      clearTimeout(flashTimer); clearTimeout(arrivalTimer); clearTimeout(probeTimer)
      if (onResize) window.removeEventListener("resize", onResize)
      var p = document.getElementById(PANEL_ID)
      if (p) p.remove()
    }
    var safely = function (fn) {
      return function () { try { return fn.apply(this, arguments) } catch (e) { teardown() } }
    }

    var injectStyle = function () {
      if (document.getElementById(STYLE_ID)) return
      var style = document.createElement("style")
      style.id = STYLE_ID
      style.textContent = [
        "#" + PANEL_ID + " { position: fixed; top: 6rem; right: var(--tb-tag-right, 444px); z-index: 9999;",
        "  max-width: 15rem; padding: 0.75rem 0.85rem; border: 1px solid var(--tb-border, #E6E6E6);",
        "  border-radius: 10px; background: var(--tb-bg, #FFFFFF); box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);",
        "  font-family: var(--tb-font-text, sans-serif); font-size: var(--tb-size-controls, 0.85rem);",
        "  line-height: 1.4; color: var(--tb-ink, #2B2B2B); }",
        "#" + PANEL_ID + " p { margin: 0; }",
        "#" + PANEL_ID + " .tb-tag-title { font-weight: 600; margin: 0 1.25rem 0.5rem 0; }",
        "#" + PANEL_ID + " .tb-tag-chips { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }",
        "#" + PANEL_ID + " button.tb-tag-chip { font-family: var(--tb-font-mono, monospace); font-size: 0.8rem;",
        "  padding: 0.15rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 999px;",
        "  background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-ink, #2B2B2B); cursor: pointer; }",
        "#" + PANEL_ID + " button.tb-tag-chip:hover { border-color: var(--tb-accent, #7C6CF0);",
        "  color: var(--tb-accent, #7C6CF0); background: var(--tb-accent-wash, #EEEBFD); }",
        "#" + PANEL_ID + " .tb-tag-hint { color: var(--tb-muted, #6E6E73); }",
        "#" + PANEL_ID + " .tb-tag-status { color: var(--tb-accent, #7C6CF0); margin-top: 0.35rem; min-height: 1.4em; }",
        "#" + PANEL_ID + " button.tb-tag-close { position: absolute; top: 0.3rem; right: 0.45rem; font: inherit;",
        "  line-height: 1; padding: 0.1rem 0.25rem; border: 0; background: none; color: var(--tb-faint, #9B9BA1); cursor: pointer; }",
        "#" + PANEL_ID + " button.tb-tag-close:hover { color: var(--tb-ink, #2B2B2B); }",
        "@media (max-width: 768px) { #" + PANEL_ID + " { top: auto; bottom: 0.75rem; left: 0.75rem; right: 0.75rem; max-width: none; } }",
        "@media print { #" + PANEL_ID + " { display: none !important; } }",
      ].join("\\n")
      document.head.appendChild(style)
    }

    // execCommand fallback where the async clipboard API is missing or blocked.
    var copyLegacy = function (text) {
      var ta = document.createElement("textarea")
      ta.value = text
      ta.setAttribute("readonly", "")
      ta.style.position = "fixed"
      ta.style.opacity = "0"
      document.body.appendChild(ta)
      ta.select()
      var ok = false
      try { ok = document.execCommand("copy") } catch (e) { ok = false }
      ta.remove()
      return ok
    }
    var flash = function (msg) {
      var status = document.querySelector("#" + PANEL_ID + " .tb-tag-status")
      if (!status) return
      status.textContent = msg
      clearTimeout(flashTimer)
      flashTimer = setTimeout(function () { status.textContent = "" }, 3000)
    }
    var copyTag = function (tag) {
      var done = function () { flash("copied \u2014 paste into the Tags field") }
      var fail = function () { flash('couldn\\'t copy \u2014 type "' + tag + '" in the Tags field') }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(tag).then(done, function () { copyLegacy(tag) ? done() : fail() })
      } else {
        copyLegacy(tag) ? done() : fail()
      }
    }

    var buildPanel = function () {
      var panel = document.createElement("div")
      panel.id = PANEL_ID
      panel.setAttribute("role", "note")
      var close = document.createElement("button")
      close.type = "button"
      close.className = "tb-tag-close"
      close.textContent = "\xD7"
      close.setAttribute("aria-label", "Dismiss tag helper")
      close.addEventListener("click", safely(function () { dismissed = true; teardown() }))
      var title = document.createElement("p")
      title.className = "tb-tag-title"
      title.textContent = "Tag your annotation:"
      var chips = document.createElement("div")
      chips.className = "tb-tag-chips"
      TAGS.forEach(function (tag) {
        var chip = document.createElement("button")
        chip.type = "button"
        chip.className = "tb-tag-chip"
        chip.textContent = tag
        chip.addEventListener("click", safely(function () {
          window.tbTrack("annotation_tag_copied", { tag: tag })
          copyTag(tag)
        }))
        chips.append(chip)
      })
      var hint = document.createElement("p")
      hint.className = "tb-tag-hint"
      hint.textContent = "Add it in the Tags field under your comment."
      var status = document.createElement("p")
      status.className = "tb-tag-status"
      panel.append(close, title, chips, hint, status)
      return panel
    }

    // Just left of the sidebar; the bounding rect is what's real.
    var positionPanel = function (host) {
      var panel = document.getElementById(PANEL_ID)
      if (!panel) return
      var rect = host.getBoundingClientRect()
      var fromRight = window.innerWidth - rect.left
      var usable = fromRight > 0 && fromRight < window.innerWidth
      panel.style.setProperty("--tb-tag-right", (usable ? fromRight + 16 : 444) + "px")
    }
    onResize = safely(function () {
      var host = document.querySelector("hypothesis-sidebar")
      if (sidebarOpen && host) positionPanel(host)
    })
    var showPanel = function (host) {
      if (dismissed) return
      injectStyle()
      if (!document.getElementById(PANEL_ID)) document.body.appendChild(buildPanel())
      positionPanel(host)
    }
    var hidePanel = function () {
      var p = document.getElementById(PANEL_ID)
      if (p) p.remove()
    }
    // aria-expanded on the toggle is the signal; the collapsed class the fallback.
    var isOpen = function (shadow) {
      var btn = shadow.querySelector("button[aria-expanded]")
      if (btn) return btn.getAttribute("aria-expanded") === "true"
      var container = shadow.querySelector(".sidebar-container")
      if (container) return !container.classList.contains("sidebar-collapsed")
      return false
    }

    var update = safely(function () {
      var host = document.querySelector("hypothesis-sidebar")
      var open = !!(host && host.shadowRoot && isOpen(host.shadowRoot))
      if (open === sidebarOpen) return
      sidebarOpen = open
      if (open) {
        window.tbTrack("annotation_sidebar_opened") // once per closed->open transition
        showPanel(host)
        window.addEventListener("resize", onResize)
      } else {
        hidePanel()
        window.removeEventListener("resize", onResize)
        // The reader may have just annotated: this page's cached count is stale.
        if (window.__tbInvalidateAnnoCount) window.__tbInvalidateAnnoCount()
      }
    })
    // The sidebar is a React app; coalesce its mutations to one read per frame.
    var updateQueued = false
    var scheduleUpdate = function () {
      if (updateQueued) return
      updateQueued = true
      requestAnimationFrame(function () { updateQueued = false; update() })
    }
    var attach = function (host) {
      if (stateObserver && host === attachedHost) return true
      var shadow = host.shadowRoot
      if (!shadow) return false
      if (stateObserver) { stateObserver.disconnect(); stateObserver = null }
      attachedHost = host
      stateObserver = new MutationObserver(scheduleUpdate)
      stateObserver.observe(shadow, { subtree: true, childList: true, attributes: true,
        attributeFilter: ["aria-expanded", "class"] })
      update()
      return true
    }
    // embed.js boots async. Watch for <hypothesis-sidebar>; if it exists but
    // isn't upgraded yet, probe (25 x 200 ms) since attaching a shadow root
    // emits no mutation a light-DOM observer can see.
    var PROBE_LIMIT = 25
    var stopWaiting = function () {
      if (arrivalObserver) { arrivalObserver.disconnect(); arrivalObserver = null }
      clearTimeout(arrivalTimer); arrivalTimer = null
      clearTimeout(probeTimer); probeTimer = null
    }
    var tryAttach
    var startShadowProbe = function () {
      if (probeTimer || stateObserver || probeAttempts >= PROBE_LIMIT) return
      probeTimer = setTimeout(safely(function () {
        probeTimer = null
        probeAttempts++
        if (stateObserver) return
        if (tryAttach()) stopWaiting()
      }), 200)
    }
    tryAttach = function () {
      var host = document.querySelector("hypothesis-sidebar")
      if (!host) return false
      if (attach(host)) return true
      startShadowProbe()
      return false
    }
    if (!tryAttach()) {
      arrivalObserver = new MutationObserver(safely(function () { if (tryAttach()) stopWaiting() }))
      arrivalObserver.observe(document.documentElement, { childList: true, subtree: true })
      // embed.js blocked (adblock, CSP, offline): give up after 15 s.
      arrivalTimer = setTimeout(safely(function () {
        arrivalTimer = null
        if (!stateObserver && arrivalObserver) { arrivalObserver.disconnect(); arrivalObserver = null }
      }), 15000)
    }
  } catch (e) { /* helper absent; everything else untouched */ }
})()
`;
var annotationBadge = `
;(function () {
  try {
    var API = "https://api.hypothes.is/api/search"
    var BADGE_CLASS = "tb-anno-badge"
    var STYLE_ID = "tb-anno-badge-style"
    var CACHE_TTL = 5 * 60 * 1000
    var FETCH_TIMEOUT = 6000
    var BLOCKED_TEXT = "annotation tools blocked"

    var canonicalUri = function () {
      var path = location.pathname.replace(/\\.html$/, "")
      if (path === "/index" || /\\/index$/.test(path)) path = path.slice(0, -"index".length)
      return location.origin + path
    }
    var uri = canonicalUri()
    // "v2:" is the query schema: publish.js's entries (v1) used Publish's URLs.
    var cacheKey = "tb-anno-count:v2:" + uri
    var cacheGet = function () {
      try {
        var raw = sessionStorage.getItem(cacheKey)
        if (!raw) return null
        var entry = JSON.parse(raw)
        var age = Date.now() - entry.t
        return age >= 0 && age < CACHE_TTL && isFinite(entry.n) ? entry.n : null
      } catch (e) { return null }
    }
    var cachePut = function (n) {
      try { sessionStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), n: n })) } catch (e) {}
    }
    window.__tbInvalidateAnnoCount = function () {
      try { sessionStorage.removeItem(cacheKey) } catch (e) {}
    }

    var injectStyle = function () {
      if (document.getElementById(STYLE_ID)) return
      var style = document.createElement("style")
      style.id = STYLE_ID
      style.textContent = [
        "button." + BADGE_CLASS + " { font-family: var(--tb-font-text, sans-serif);",
        "  font-size: var(--tb-size-controls, 0.85rem); line-height: 1.4; padding: 0.15rem 0.7rem;",
        "  margin-left: 0.5rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 999px;",
        "  background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-muted, #6E6E73); cursor: pointer; }",
        "button." + BADGE_CLASS + ":hover { border-color: var(--tb-accent, #7C6CF0);",
        "  color: var(--tb-accent, #7C6CF0); background: var(--tb-accent-wash, #EEEBFD); }",
        ".tb-page-controls button." + BADGE_CLASS + " { margin-left: 0; }",
        "@media print { button." + BADGE_CLASS + " { display: none !important; } }",
      ].join("\\n")
      document.head.appendChild(style)
    }

    // Only ever opens: clicks the client's toggle when it is collapsed. The
    // client may be absent (blocked, still booting); say so on the badge.
    var openSidebar = function (badge, label) {
      try {
        var host = document.querySelector("hypothesis-sidebar")
        if (!host) { badge.textContent = BLOCKED_TEXT; return }
        if (badge.textContent === BLOCKED_TEXT) badge.textContent = label
        var btn = host.shadowRoot && host.shadowRoot.querySelector("button[aria-expanded]")
        if (btn && btn.getAttribute("aria-expanded") !== "true") btn.click()
      } catch (e) {}
    }

    var place = function (count) {
      var anchor = document.querySelector(".tb-page-controls") ||
        document.querySelector("a.edit-on-github") ||
        document.querySelector("h1.article-title")
      if (!anchor || !anchor.parentNode) return
      injectStyle()
      var old = document.querySelector("button." + BADGE_CLASS)
      if (old) old.remove()
      var b = document.createElement("button")
      b.type = "button"
      b.className = BADGE_CLASS
      var label = count === 0 ? "Annotate this page"
        : count === 1 ? "1 annotation" : count + " annotations"
      b.textContent = label
      b.addEventListener("click", function () {
        window.tbTrack("annotation_badge_clicked") // no count prop: page-identifying
        openSidebar(b, label)
      })
      if (anchor.classList.contains("tb-page-controls")) anchor.appendChild(b)
      else if (anchor.tagName === "A") anchor.insertAdjacentElement("afterend", b)
      else {
        var row = document.createElement("p")
        row.className = "tb-anno-badge-row"
        row.appendChild(b)
        anchor.insertAdjacentElement("afterend", row)
      }
    }

    var fetchCount = function () {
      var c = typeof AbortController === "function" ? new AbortController() : null
      var timer = setTimeout(function () { if (c) c.abort() }, FETCH_TIMEOUT)
      return fetch(API + "?limit=0&uri=" + encodeURIComponent(uri), c ? { signal: c.signal } : {})
        .then(function (res) {
          if (!res.ok) throw new Error("search API HTTP " + res.status)
          return res.json()
        })
        .then(function (body) {
          var n = Number(body.total)
          if (!isFinite(n) || n < 0) throw new Error("no usable total")
          return n
        })
        .finally(function () { clearTimeout(timer) })
    }

    var run = function () {
      var cached = cacheGet()
      if (cached !== null) { place(cached); return Promise.resolve(cached) }
      return fetchCount().then(function (n) { cachePut(n); place(n); return n })
        .catch(function () { return null }) // no badge; nothing else affected
    }
    window.__tbAnnoBadge = { uri: uri, ready: null }
    if (document.readyState === "loading") {
      window.__tbAnnoBadge.ready = new Promise(function (resolve) {
        document.addEventListener("DOMContentLoaded", function () { run().then(resolve) })
      })
    } else {
      window.__tbAnnoBadge.ready = run()
    }
  } catch (e) { /* badge absent */ }
})()
`;

// src/index.ts
var defaultOptions = {
  plausibleScriptSrc: "",
  siteDomain: "",
  tagHelper: true,
  annotationBadge: true,
  hypothesisGroupId: ""
};
var themeCss = `
body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
/* Constrain the reading column on the article itself \u2014 Quartz's grid track
   runs wider (measured 850px), so cap here rather than via .center. */
article {
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}
article p,
article li {
  font-size: 1.125rem;      /* 18px */
  line-height: 1.65 !important;  /* base.scss sets ~1.42; override to spec */
}
article p { margin: 1.5rem 0; }
article h1 { font-size: 2.25rem;  font-weight: 700; line-height: 1.15; }
article h2 { font-size: 1.75rem;  font-weight: 700; line-height: 1.2; }
article h3 { font-size: 1.375rem; font-weight: 600; line-height: 1.3; }
article h4 { font-size: 1.125rem; font-weight: 600; line-height: 1.4; letter-spacing: 0.04em; }
article a { font-weight: 600; text-decoration: underline; text-underline-offset: 2px; }
article a:hover { color: var(--tertiary); }
pre, article code { background-color: #F7F7F5; }
`;
var HYPOTHESIS_GROUP_PLACEHOLDER = "GROUP_ID";
var isRealGroupId = (groupId) => {
  const trimmed = groupId.trim();
  return trimmed.length > 0 && !/^__.*__$/.test(trimmed);
};
var hypothesisConfig = (groupId) => {
  const group = isRealGroupId(groupId) ? groupId.trim() : HYPOTHESIS_GROUP_PLACEHOLDER;
  return `
window.hypothesisConfig = function () {
  return {
    // First-party flow: sidebar collapsed, highlights always visible \u2014 same as the
    // canonical site's publish.js.
    openSidebar: false,
    showHighlights: 'always',
    // R1 hook \u2014 per-edition group locking. UNUSED BY DECISION: the Publisher
    // tier will not be bought, so this is a record of the shape the swap would
    // have taken, not a step waiting to be taken. It needs Publisher-tier /
    // third-party auth; the services array 404s on the standard account tier
    // (verified, hypothesis-spike-baseline.md). Do not uncomment:
    //
    // services: [{
    //   apiUrl: "https://hypothes.is/api/",
    //   authority: "YOUR_AUTHORITY",
    //   grantToken: "GENERATED_PER_USER",
    //   groups: ["${group}"],
    // }],
  }
}
`;
};
var plausibleInit = `
window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) }
window.plausible.init = window.plausible.init || function (o) { window.plausible.o = o || {} }
window.plausible.init()
`;
var hypothesisLoader = `
;(function () {
  // Run-once guard: exactly one embed.js per page load. A second client's
  // connection is refused by the host frame ("Ignoring second request from
  // Hypothesis sidebar to connect to host frame"), leaving a present-but-dead
  // sidebar \u2014 so guard even though nothing should evaluate this twice.
  if (window.__editionIntegrations) return
  window.__editionIntegrations = true

  var s = document.createElement("script")
  s.async = true
  s.src = "https://hypothes.is/embed.js"
  s.setAttribute("data-edition-hypothesis", "")
  document.head.appendChild(s)
})()
`;
var EditionIntegrations = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts };
  return {
    name: "EditionIntegrations",
    // Runs after every markdown plugin, so note-properties has already filled
    // in the filename as a fallback title, and the table of contents exists.
    htmlPlugins() {
      return [
        () => (tree, file) => {
          fixBlockRefLinks(tree);
          titleFromFirstHeading(tree, file.data, String(file.value ?? ""));
        }
      ];
    },
    externalResources() {
      const head = [
        _("style", { dangerouslySetInnerHTML: { __html: themeCss } }),
        _("script", {
          dangerouslySetInnerHTML: { __html: hypothesisConfig(opts.hypothesisGroupId) }
        })
      ];
      const script = (js) => _("script", { dangerouslySetInnerHTML: { __html: js } });
      if (opts.plausibleScriptSrc && opts.siteDomain) {
        head.push(script(analyticsLoader(opts.plausibleScriptSrc, opts.siteDomain)));
      } else if (opts.plausibleScriptSrc) {
        head.push(
          script(plausibleInit),
          _("script", { async: true, src: opts.plausibleScriptSrc })
        );
      }
      head.push(script(opts.plausibleScriptSrc ? trackRuntime : noTracking));
      if (opts.tagHelper) head.push(script(tagHelper));
      if (opts.annotationBadge) head.push(script(annotationBadge));
      head.push(_("script", { dangerouslySetInnerHTML: { __html: hypothesisLoader } }));
      return { additionalHead: head };
    }
  };
};
var src_default = EditionIntegrations;

export { EditionIntegrations, src_default as default };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map