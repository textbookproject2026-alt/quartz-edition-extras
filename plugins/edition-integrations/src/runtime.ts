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
 *   - paragraphNumbers: the ¶ numbers' style and click-to-link
 *   - readerPrefs:     the Appearance settings, applied before first paint
 *   - annotationsControl: turning public annotations on and off, opening the sidebar
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
 * The reader's settings (the header's Appearance panel), applied in <head>
 * before the body paints, so nothing flashes. Each is one localStorage key,
 * absent for its default; every read and write is in try/catch, and without
 * storage every page renders with the defaults.
 *
 *   theme        "theme"           auto | light | dark   Quartz's darkmode key and
 *                                                        values; auto follows the system
 *   text         "tb-text"         standard | small | large   the chapter only
 *   width        "tb-width"        standard | wide
 *   numbers      "tb-pnum"         on | off           the old ¶ toggle's key
 *   annotations  "tb-annotations"  on | off           off: embed.js is never loaded
 *
 * It sets <html saved-theme data-tb-text data-tb-width>, and the classes
 * tb-pnum-off and tb-annotations-off, which design.ts reads. A theme change
 * dispatches Quartz's "themechange" (the graph redraws on it). window.tbPrefs
 * { get, values, set } is what the panel calls.
 */
export const readerPrefs = `
;(function () {
  try {
    var root = document.documentElement
    var PREFS = {
      theme: { key: "theme", values: ["auto", "light", "dark"] },
      text: { key: "tb-text", values: ["standard", "small", "large"] },
      width: { key: "tb-width", values: ["standard", "wide"] },
      numbers: { key: "tb-pnum", values: ["on", "off"] },
      annotations: { key: "tb-annotations", values: ["on", "off"] },
    }
    var read = function (k) { try { return localStorage.getItem(k) } catch (e) { return null } }
    var write = function (k, v) {
      try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v) } catch (e) {}
    }
    // In memory too, so a change holds for this page where storage is refused.
    var memory = {}
    var get = function (name) {
      var p = PREFS[name]
      if (!p) return null
      var v = name in memory ? memory[name] : read(p.key)
      return p.values.indexOf(v) > 0 ? v : p.values[0]
    }
    var system = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null
    var theme = function () {
      var t = get("theme")
      return t === "auto" ? (system && system.matches ? "dark" : "light") : t
    }
    var bodyTheme = function () {
      if (!document.body) return
      document.body.classList.remove("theme-dark", "theme-light")
      document.body.classList.add("theme-" + theme())
    }
    var apply = function () {
      root.setAttribute("saved-theme", theme())
      root.setAttribute("data-tb-text", get("text"))
      root.setAttribute("data-tb-width", get("width"))
      root.classList.toggle("tb-pnum-off", get("numbers") === "off")
      root.classList.toggle("tb-annotations-off", get("annotations") === "off")
      bodyTheme()
    }
    var themeChanged = function () {
      try { document.dispatchEvent(new CustomEvent("themechange", { detail: { theme: theme() } })) } catch (e) {}
    }
    apply()
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bodyTheme)
    if (system) {
      var follow = function () { if (get("theme") === "auto") { apply(); themeChanged() } }
      if (system.addEventListener) system.addEventListener("change", follow)
      else if (system.addListener) system.addListener(follow)
    }
    window.tbPrefs = {
      get: get,
      values: function (name) { return PREFS[name] ? PREFS[name].values.slice() : [] },
      set: function (name, v) {
        var p = PREFS[name]
        if (!p || p.values.indexOf(v) < 0) return
        memory[name] = v
        write(p.key, v === p.values[0] ? null : v)
        apply()
        if (name === "theme") themeChanged()
      },
    }
  } catch (e) { /* Quartz's defaults: light theme, standard text */ }
})()
`;

/**
 * Public annotations on and off, and opening the sidebar (the header's Annotate
 * and Public comment, and the Appearance panel). window.tbAnnotations:
 *
 *   open()    turns annotations on if they were off, loads the client if it isn't
 *             loaded, then opens the sidebar with the client's own toggle once it
 *             is there. Resolves true when it opened, false if the client never
 *             came (blocked, offline) within 15 s.
 *   enable()  on, and the client loaded, sidebar left closed.
 *   disable() off for every later page. Hypothes.is has no unload: on this page
 *             the highlights are hidden (design.ts) and the sidebar is collapsed,
 *             and the client's tab stays until the next load. Returns
 *             { reload: true } when a client was loaded, so the panel can say so.
 *
 * Only ever reads the client's state and clicks its own toggle.
 */
export const annotationsControl = `
;(function () {
  try {
    var toggle = function () {
      var host = document.querySelector("hypothesis-sidebar")
      return host && host.shadowRoot ? host.shadowRoot.querySelector("button[aria-expanded]") : null
    }
    // The loader's own tag says whether a client was loaded on this page.
    var loaded = function () { return !!document.querySelector("script[data-edition-hypothesis]") }
    var load = function () { if (typeof window.tbLoadHypothesis === "function") window.tbLoadHypothesis() }
    window.tbAnnotations = {
      on: function () { return !(window.tbPrefs && window.tbPrefs.get("annotations") === "off") },
      enable: function () {
        if (window.tbPrefs) window.tbPrefs.set("annotations", "on")
        load()
      },
      disable: function () {
        if (window.tbPrefs) window.tbPrefs.set("annotations", "off")
        var t = toggle()
        if (t && t.getAttribute("aria-expanded") === "true") t.click()
        return { reload: loaded() }
      },
      open: function () {
        window.tbAnnotations.enable()
        return new Promise(function (resolve) {
          var start = Date.now(), clicks = 0, last = 0
          var step = function () {
            var t = toggle()
            if (t && t.getAttribute("aria-expanded") === "true") return resolve(true)
            if (Date.now() - start > 15000 || clicks >= 3) return resolve(false)
            // Hypothes.is closes its sidebar on a pointer press in the page, so an
            // open made in answer to a mouse click doesn't hold: when one hasn't,
            // ask again once the press is over. It only ever clicks a closed toggle.
            if (t && Date.now() - last > 400) {
              clicks++
              last = Date.now()
              t.click()
            }
            setTimeout(step, 150)
          }
          step()
        })
      },
    }
  } catch (e) { /* Annotate stays hidden */ }
})()
`;

/**
 * The tag helper (publish.js:181-550). While the Hypothes.is sidebar is open, a
 * small panel beside it teaches the tag convention with copy-to-clipboard
 * chips. The composer lives in a cross-origin iframe, so this can't fill in the
 * Tags field; it only reads the client's open/closed state from the open shadow
 * root of <hypothesis-sidebar>, and tears itself down on any error.
 *
 * It sits just left of the open sidebar by the sidebar's own width,
 * --tb-hypothesis-width (hypothesisConfig's onLayoutChange), and marks <html
 * class="tb-tag-helper-on"> while shown, so the page can make room for it too
 * (design.ts).
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
    var ON = "tb-tag-helper-on"

    var teardown = function () {
      if (arrivalObserver) { arrivalObserver.disconnect(); arrivalObserver = null }
      if (stateObserver) { stateObserver.disconnect(); stateObserver = null }
      attachedHost = null
      clearTimeout(flashTimer); clearTimeout(arrivalTimer); clearTimeout(probeTimer)
      document.documentElement.classList.remove(ON)
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
        // Clear of the open sidebar by its own width; 428px is the client's default width.
        "#" + PANEL_ID + " { position: fixed; top: 6rem; right: calc(var(--tb-hypothesis-width, 428px) + 16px); z-index: 9999;",
        "  box-sizing: border-box; width: 14rem; padding: 0.75rem 0.85rem; border: 1px solid var(--tb-border, #E6E6E6);",
        "  border-radius: 10px; background: var(--tb-bg, #FFFFFF); box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);",
        "  font-family: var(--tb-font-ui, sans-serif); font-size: var(--tb-size-controls, 0.85rem);",
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
        "@media (max-width: 768px) { #" + PANEL_ID + " { top: auto; bottom: 0.75rem; left: 0.75rem; right: 0.75rem; width: auto; } }",
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

    var showPanel = function () {
      if (dismissed) return
      injectStyle()
      if (!document.getElementById(PANEL_ID)) document.body.appendChild(buildPanel())
      document.documentElement.classList.add(ON)
    }
    var hidePanel = function () {
      document.documentElement.classList.remove(ON)
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
        showPanel()
      } else {
        hidePanel()
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
        "button." + BADGE_CLASS + " { font-family: var(--tb-font-ui, sans-serif);",
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
      // The header's Annotate button (edit-on-github) carries the count itself.
      var annotate = document.querySelector("[data-tb-annotate]")
      if (annotate) {
        var slot = annotate.querySelector(".tb-anno-count")
        if (slot) slot.textContent = count > 0 ? String(count) : ""
        annotate.setAttribute("aria-label", count === 0 ? "Annotate this page"
          : count === 1 ? "Annotate: 1 annotation" : "Annotate: " + count + " annotations")
        return
      }
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
      // Annotations turned off: no request to Hypothes.is at all.
      if (window.tbPrefs && window.tbPrefs.get("annotations") === "off") return Promise.resolve(null)
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
 * The phone menu starts closed. Quartz renders the explorer open and closes it
 * in script on phones, after checking its toggle is visible; in WebKit that
 * check can run too early, leaving the menu open over the page on load and
 * every later tap out of step. On a phone, until the reader first touches the
 * menu, close it the way Quartz would have.
 */
export const phoneMenuStartsClosed = (narrowWidth: string) => `
;(function () {
  try {
    var mq = window.matchMedia("(max-width: ${narrowWidth})")
    var touched = false
    document.addEventListener("click", function (e) {
      if (e.target && e.target.closest && e.target.closest(".explorer-toggle")) touched = true
    }, true)
    var close = function () {
      if (touched || !mq.matches) return
      var all = document.querySelectorAll(".explorer")
      for (var i = 0; i < all.length; i++) {
        var ex = all[i]
        if (!ex.querySelector(".mobile-explorer") || ex.classList.contains("collapsed")) continue
        ex.classList.add("collapsed")
        ex.setAttribute("aria-expanded", "false")
        document.documentElement.classList.remove("mobile-no-scroll")
      }
    }
    document.addEventListener("nav", function () { setTimeout(close, 0); setTimeout(close, 300) })
    window.addEventListener("load", function () { setTimeout(close, 0) })
  } catch (e) { /* the menu keeps Quartz's own behaviour */ }
})()
`;

/**
 * Paragraph numbers: the style that draws them, and click-to-link.
 *
 * The transform (transforms.ts, numberParagraphs) marks each body paragraph
 * `data-pnum="n"`; this draws the number in the left margin with ::before, so
 * it is never part of the page's text and Hypothes.is anchors don't move. On or
 * off is a reader setting ("tb-pnum"), applied by readerPrefs before the body
 * paints and changed in the header's Appearance panel.
 *
 * Clicking a number puts the paragraph's link in the address bar and copies it.
 */
export const paragraphNumbers = `
;(function () {
  try {
    var OFF = "tb-pnum-off"
    var root = document.documentElement

    var style = document.createElement("style")
    style.id = "tb-pnum-style"
    style.textContent = [
      "[data-pnum] { position: relative; }",
      "[data-pnum]::before { content: attr(data-pnum); position: absolute; left: -3.25rem; width: 2.5rem;",
      // line-height 1 and a top in the number's own ems put it on the first
      // line's baseline at the body and lead sizes alike.
      "  top: 1.15em; text-align: right; font-family: var(--tb-font-ui, sans-serif); font-size: 0.72rem;",
      "  font-weight: 500; line-height: 1; font-variant-numeric: tabular-nums; letter-spacing: 0.02em;",
      "  color: var(--tb-faint, #9B9BA1); cursor: pointer; user-select: none; -webkit-user-select: none; }",
      "[data-pnum]:hover::before, [data-pnum]:target::before { color: var(--tb-accent, #7C6CF0); }",
      "[data-pnum]:target { background: var(--tb-accent-wash, #EEEBFD); box-shadow: 0 0 0 0.35rem var(--tb-accent-wash, #EEEBFD); border-radius: 2px; }",
      "." + OFF + " [data-pnum]::before { content: none; }",
      "." + OFF + " [data-pnum]:target { background: none; box-shadow: none; }",
      // Other pages' paragraphs shown in a popover keep their own numbers to themselves.
      ".popover [data-pnum]::before { content: none; }",
      "@media (max-width: 800px) { [data-pnum]::before { left: -1.9rem; width: 1.6rem; font-size: 0.65rem; } }",
      ".tb-pnum-flash { position: fixed; bottom: 1.25rem; left: 50%; transform: translateX(-50%); z-index: 9999;",
      "  padding: 0.4rem 0.9rem; border-radius: 999px; background: var(--tb-ink, #2B2B2B); color: var(--tb-bg, #FFFFFF);",
      "  font-family: var(--tb-font-ui, sans-serif); font-size: 0.85rem; }",
      "@media print { .tb-pnum-flash { display: none !important; }",
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
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", arm)
    else arm()
  } catch (e) { /* numbers stay as the page drew them; nothing else affected */ }
})()
`;

/**
 * Opening a page leaves it at the top. Quartz's explorer brings the current
 * page's entry into view with `.active.scrollIntoView({ behavior: "smooth" })`
 * when it renders (it restores a saved position only after an SPA navigation,
 * and this site has none), and that scrolls the window too: a chapter opened
 * at 1280x800 loaded about 700px down. For an element inside the explorer's
 * list this scrolls only the list, centring the entry if it is out of view.
 * Everything else reaches the browser's own scrollIntoView. It must run
 * before the explorer's script, so it is an inline <head> script.
 */
export const explorerKeepsPageStill = `
;(function () {
  try {
    var orig = Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function () {
      var list = this.closest ? this.closest(".explorer-ul") : null
      if (!list) return orig.apply(this, arguments)
      var r = this.getBoundingClientRect(), box = list.getBoundingClientRect()
      if (r.top < box.top || r.bottom > box.bottom) list.scrollTop += r.top - box.top - (box.height - r.height) / 2
    }
  } catch (e) { /* the explorer keeps Quartz's own behaviour */ }
})()
`;

/**
 * The explorer follows the book's Contents. Quartz's explorer sorts
 * alphabetically, so Introduction lands after Chapter 11; the order the book
 * means is the list under "## Contents" in its index.md, which the builder
 * passes in as `order` (slugs, e.g. "chapters/introduction").
 *
 * The explorer reads div.explorer's data-data-fns on every "nav" event and
 * builds its sort from the sortFn string with new Function, so the sort below
 * is self-contained: the order is written into its source. This listener is
 * registered in the <head>, so it runs before the explorer's. A folder ranks
 * by its first listed page; anything unlisted keeps the explorer's default
 * order, after the listed pages.
 */
export const explorerFollowsContents = (order: string[]) => `
;(function () {
  try {
    var ORDER = ${JSON.stringify(order).replace(/</g, "\\u003c")}
    if (!ORDER.length) return
    var sort = function (a, b) {
      var O = __ORDER__
      var rank = function (n) {
        var s = n.slugSegments.join("/")
        for (var i = 0; i < O.length; i++) if (n.isFolder ? O[i].indexOf(s + "/") === 0 : O[i] === s) return i
        return O.length
      }
      var ra = rank(a), rb = rank(b)
      if (ra !== rb) return ra - rb
      if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1
      return a.displayName.localeCompare(b.displayName, undefined, { numeric: true, sensitivity: "base" })
    }
    var src = sort.toString().replace("__ORDER__", JSON.stringify(ORDER))
    document.addEventListener("nav", function () {
      var all = document.querySelectorAll("div.explorer")
      for (var i = 0; i < all.length; i++) {
        var fns = {}
        try { fns = JSON.parse(all[i].dataset.dataFns || "{}") } catch (e) {}
        fns.sortFn = src
        all[i].dataset.dataFns = JSON.stringify(fns)
      }
    })
  } catch (e) { /* the explorer keeps its own order */ }
})()
`;

/**
 * Following a link to a place on a page flashes that place, as Publish does.
 *
 * A citation (`[Bhaskar, 1979](#^ref-bhaskar-1979)`, fixed to `#ref-…` by
 * fixBlockRefLinks) jumps to its reference. On Publish the reference then
 * shows the highlighter colour for about three seconds (Obsidian's
 * `is-flashing`). Quartz only jumps, and the reference lands on the window's
 * top edge. This flashes the target in the `mark` colour for the same time, and
 * stops it a little below the top, where Publish stops it.
 *
 * The flash starts once the target has stopped moving: Quartz scrolls
 * smoothly, and a long jump would otherwise use up the flash before the reader
 * got there. It follows a same-page link, a second click on the same link
 * (which changes no hash), and a page opened at a #fragment (a cross-page
 * citation or a paragraph's link). In that last case the browser's smooth
 * scroll is cut short when the page grows as it loads, so once the page has
 * loaded the target is put in view, if it isn't already.
 */
export const targetFlash = `
;(function () {
  try {
    var CLASS = "tb-flash"
    var MS = 3000
    var style = document.createElement("style")
    style.id = "tb-flash-style"
    style.textContent = [
      "@keyframes tb-flash { 0%, 75% { background-color: var(--tb-mark, #FDF2B3);",
      "  box-shadow: 0 0 0 0.35rem var(--tb-mark, #FDF2B3); }",
      "  100% { background-color: transparent; box-shadow: 0 0 0 0.35rem transparent; } }",
      "." + CLASS + " { animation: tb-flash " + MS + "ms ease-out; border-radius: 2px; }",
      "@media (prefers-reduced-motion: reduce) { ." + CLASS + " { animation: none;",
      "  background-color: var(--tb-mark, #FDF2B3); box-shadow: 0 0 0 0.35rem var(--tb-mark, #FDF2B3); } }",
      "@media print { ." + CLASS + " { animation: none; background: none; box-shadow: none; } }",
    ].join("\\n")
    document.head.appendChild(style)

    var timer = null
    var current = null
    var waiting = 0
    var target = function (hash) {
      if (!hash || hash.length < 2) return null
      var id
      try { id = decodeURIComponent(hash.slice(1)) } catch (e) { id = hash.slice(1) }
      var el = document.getElementById(id)
      return el && el.closest && el.closest("article") && !el.closest(".popover") ? el : null
    }
    var flash = function (el) {
      if (current) current.classList.remove(CLASS)
      clearTimeout(timer)
      void el.offsetWidth // restart the animation on a second click
      el.classList.add(CLASS)
      current = el
      timer = setTimeout(function () { el.classList.remove(CLASS); if (current === el) current = null }, MS)
    }
    // Flash once the target has held still for a few frames, or after 2s.
    var whenStill = function (el, then) {
      var mine = ++waiting
      var last = null, still = 0, start = Date.now()
      var frame = window.requestAnimationFrame || function (f) { return setTimeout(f, 16) }
      var step = function () {
        if (mine !== waiting) return
        var top = el.getBoundingClientRect().top
        still = top === last ? still + 1 : 0
        last = top
        if (still >= 5 || Date.now() - start > 2000) then(el)
        else frame(step)
      }
      frame(step)
    }
    var follow = function () {
      var el = target(location.hash)
      if (el) whenStill(el, flash)
    }

    window.addEventListener("hashchange", follow)
    // The same link clicked again: the hash doesn't change, so no hashchange.
    document.addEventListener("click", function (ev) {
      try {
        var a = ev.target && ev.target.closest ? ev.target.closest("a[href^='#']") : null
        if (!a || a.closest(".popover") || ev.defaultPrevented) return
        if (a.getAttribute("href") === location.hash) follow()
      } catch (e) {}
    })
    var arrive = function () {
      var el = target(location.hash)
      if (!el) return
      var top = el.getBoundingClientRect().top
      if (top < 0 || top > window.innerHeight / 3) el.scrollIntoView({ block: "start", behavior: "instant" })
      whenStill(el, flash)
    }
    if (document.readyState === "complete") arrive()
    else window.addEventListener("load", arrive)
  } catch (e) { /* links still jump; nothing else affected */ }
})()
`;
