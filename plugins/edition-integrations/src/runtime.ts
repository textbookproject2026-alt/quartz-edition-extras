/**
 * The reader-facing runtime ported from book one's publish.js
 * (BOOK-ONE-TO-QUARTZ §1a, §1b, §8 step 4), less the SPA handling: sites run
 * with enableSPA: false, so every navigation is a full page load and each
 * script below runs once per page.
 *
 *   - analyticsLoader: the per-site Plausible script behind the hostname guard
 *   - trackRuntime:    window.tbTrack(), the one door for custom events
 *   - tagHelper:       the "Tag your annotation" panel beside the sidebar
 *   - annotationBadge: the per-page annotation count, which opens the sidebar
 *   - paragraphNumbers: the ¶ numbers' style, click-to-link, and the toggle
 *
 * Event names are Plausible's history for book one and must not change:
 * annotation_tag_copied {tag}, annotation_sidebar_opened, annotation_badge_clicked.
 * Added with paragraph numbers: paragraph_numbers_toggled {to}, paragraph_link_copied.
 *
 * Every piece is failure-safe the way publish.js is: armed inside try/catch,
 * only reads the Hypothes.is client's state, and its worst case is "absent".
 * Props carry fixed, enumerable values only — never a path or reader text;
 * Plausible already records the page.
 */

/**
 * Loads the Plausible script only when the page is served from `siteDomain`,
 * so previews (`*.pages.dev`, localhost) count nothing, not even a pageview.
 * Sets window.__tbAnalytics so tbTrack() follows the same answer.
 */
export const analyticsLoader = (src: string, siteDomain: string): string => `
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

/**
 * window.tbTrack(name, props): the single choke point for custom events, as
 * track() was in publish.js. A plausible() that is missing (blocked, offline,
 * still loading, or turned off by the hostname guard) or throws is a silent
 * no-op. Other plugins (the controls row) call it through the same guard.
 */
export const trackRuntime = `
window.tbTrack = window.tbTrack || function (name, props) {
  try {
    if (window.__tbAnalytics === false) return
    if (typeof window.plausible !== "function") return
    window.plausible(name, props ? { props: props } : undefined)
  } catch (e) { /* analytics may never break a reader's path */ }
}
`;

/** tbTrack() for a site with no analytics configured. */
export const noTracking = `
window.tbTrack = window.tbTrack || function () {}
`;

/**
 * The tag helper (publish.js:181-550). While the Hypothes.is sidebar is open, a
 * small panel beside it teaches the tag convention with copy-to-clipboard
 * chips. The composer lives in a cross-origin iframe, so this can't fill in the
 * Tags field; it only reads the client's open/closed state from the open shadow
 * root of <hypothesis-sidebar>, and tears itself down on any error.
 */
export const tagHelper = `
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
      var done = function () { flash("copied — paste into the Tags field") }
      var fail = function () { flash('couldn\\'t copy — type "' + tag + '" in the Tags field') }
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
      close.textContent = "×"
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

/**
 * The annotation badge (publish.js:552-776). The page's count of public
 * annotations from the unauthenticated Hypothes.is search API (limit=0, so no
 * annotation bodies travel). "Annotate this page" at zero. Clicking opens the
 * sidebar through the client's own toggle.
 *
 * The query URI is location.origin + location.pathname, canonicalised: Pages
 * 308-redirects /x.html to /x, and /index to /. With full page loads there is
 * no in-flight dedupe or re-injection loop to port. Counts are cached in
 * sessionStorage for 5 minutes, and dropped when the sidebar closes.
 *
 * It goes at the end of edit-on-github's controls row (§8 step 5); beside a
 * bare Edit link, from an edit-on-github pinned before the row; else under the
 * article title.
 */
export const annotationBadge = `
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

/**
 * Paragraph numbers: the style that draws them, and the toggle.
 *
 * The transform (transforms.ts, numberParagraphs) marks each body paragraph
 * `data-pnum="n"`; this draws the number in the left margin with ::before, so
 * it is never part of the page's text and Hypothes.is anchors don't move. A
 * reader's choice is kept in localStorage ("tb-pnum": "off") and applied here,
 * in the head, before the body paints, so the numbers never flash on and off.
 *
 * Clicking a number puts the paragraph's link in the address bar and copies
 * it. The toggle goes in the controls row, beside the annotation badge; on a
 * page without numbered paragraphs there is no toggle.
 */
export const paragraphNumbers = `
;(function () {
  try {
    var KEY = "tb-pnum"
    var OFF = "tb-pnum-off"
    var root = document.documentElement
    var stored = function () { try { return localStorage.getItem(KEY) } catch (e) { return null } }
    var store = function (on) { try { on ? localStorage.removeItem(KEY) : localStorage.setItem(KEY, "off") } catch (e) {} }
    if (stored() === "off") root.classList.add(OFF)

    var style = document.createElement("style")
    style.id = "tb-pnum-style"
    style.textContent = [
      "[data-pnum] { position: relative; }",
      "[data-pnum]::before { content: attr(data-pnum); position: absolute; left: -3.25rem; width: 2.5rem;",
      // line-height 1 and a top in the number's own ems put it on the first
      // line's baseline at the body and lead sizes alike.
      "  top: 1.15em; text-align: right; font-family: var(--tb-font-text, sans-serif); font-size: 0.72rem;",
      "  font-weight: 500; line-height: 1; font-variant-numeric: tabular-nums; letter-spacing: 0.02em;",
      "  color: var(--tb-faint, #9B9BA1); cursor: pointer; user-select: none; -webkit-user-select: none; }",
      "[data-pnum]:hover::before, [data-pnum]:target::before { color: var(--tb-accent, #7C6CF0); }",
      "[data-pnum]:target { background: var(--tb-accent-wash, #EEEBFD); box-shadow: 0 0 0 0.35rem var(--tb-accent-wash, #EEEBFD); border-radius: 2px; }",
      "." + OFF + " [data-pnum]::before { content: none; }",
      "." + OFF + " [data-pnum]:target { background: none; box-shadow: none; }",
      // Other pages' paragraphs shown in a popover keep their own numbers to themselves.
      ".popover [data-pnum]::before { content: none; }",
      "@media (max-width: 800px) { [data-pnum]::before { left: -1.9rem; width: 1.6rem; font-size: 0.65rem; } }",
      "button.tb-pnum-toggle { font-family: var(--tb-font-text, sans-serif); font-size: var(--tb-size-controls, 0.85rem);",
      "  line-height: 1.4; padding: 0.15rem 0.7rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 999px;",
      "  background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-muted, #6E6E73); cursor: pointer; }",
      "button.tb-pnum-toggle:hover { border-color: var(--tb-accent, #7C6CF0); color: var(--tb-accent, #7C6CF0); }",
      "button.tb-pnum-toggle[aria-pressed=\\"true\\"] { border-color: var(--tb-accent, #7C6CF0); color: var(--tb-accent, #7C6CF0);",
      "  background: var(--tb-accent-wash, #EEEBFD); }",
      ".tb-pnum-flash { position: fixed; bottom: 1.25rem; left: 50%; transform: translateX(-50%); z-index: 9999;",
      "  padding: 0.4rem 0.9rem; border-radius: 999px; background: var(--tb-ink, #2B2B2B); color: var(--tb-bg, #FFFFFF);",
      "  font-family: var(--tb-font-text, sans-serif); font-size: 0.85rem; }",
      "@media print { button.tb-pnum-toggle, .tb-pnum-flash { display: none !important; }",
      "  [data-pnum]:target { background: none; box-shadow: none; } }",
    ].join("\\n")
    document.head.appendChild(style)

    var flashTimer = null
    var flash = function (text) {
      var el = document.querySelector(".tb-pnum-flash")
      if (!el) {
        el = document.createElement("div")
        el.className = "tb-pnum-flash"
        el.setAttribute("role", "status")
        document.body.appendChild(el)
      }
      el.textContent = text
      clearTimeout(flashTimer)
      flashTimer = setTimeout(function () { el.remove() }, 2200)
    }

    var arm = function () {
      var paras = document.querySelectorAll("[data-pnum]")
      if (!paras.length) return

      // A click left of a numbered paragraph is a click on its number.
      document.addEventListener("click", function (ev) {
        try {
          if (root.classList.contains(OFF)) return
          var p = ev.target && ev.target.closest ? ev.target.closest("[data-pnum]") : null
          if (!p || p.closest(".popover")) return
          if (ev.clientX >= p.getBoundingClientRect().left) return
          var url = location.origin + location.pathname + "#" + encodeURIComponent(p.id)
          history.replaceState(null, "", "#" + encodeURIComponent(p.id))
          var done = function () { flash("Link to \\u00b6" + p.getAttribute("data-pnum") + " copied") }
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(done, function () { flash("\\u00b6" + p.getAttribute("data-pnum") + " \\u2014 link in the address bar") })
          } else flash("\\u00b6" + p.getAttribute("data-pnum") + " \\u2014 link in the address bar")
          window.tbTrack("paragraph_link_copied")
        } catch (e) {}
      })

      var anchor = document.querySelector(".tb-page-controls") || document.querySelector("h1.article-title")
      if (!anchor || !anchor.parentNode) return
      var b = document.createElement("button")
      b.type = "button"
      b.className = "tb-pnum-toggle"
      b.textContent = "\\u00b6 Numbers"
      b.title = "Show or hide paragraph numbers"
      var sync = function () { b.setAttribute("aria-pressed", String(!root.classList.contains(OFF))) }
      sync()
      b.addEventListener("click", function () {
        var on = root.classList.toggle(OFF) === false
        store(on)
        sync()
        window.tbTrack("paragraph_numbers_toggled", { to: on ? "on" : "off" })
      })
      if (anchor.classList.contains("tb-page-controls")) anchor.appendChild(b)
      else {
        var row = document.createElement("p")
        row.className = "tb-pnum-row"
        row.appendChild(b)
        anchor.insertAdjacentElement("afterend", row)
      }
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", arm)
    else arm()
  } catch (e) { /* numbers stay as the page drew them; nothing else affected */ }
})()
`;
