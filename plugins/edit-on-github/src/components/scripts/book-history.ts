/**
 * The book's /history page (quartz-book writes it): the builder's static
 * swimlane and plain list work without scripts; this adds what changes between
 * builds and what needs a script. It draws what is proposed into the swimlane's
 * empty first lane (from the function's /api/history), shows a dot's summary
 * under the swimlane on tap or focus (a phone has no hover), and replaces the
 * plain list with the whole book's timeline, filterable by chapter, person and
 * state. Declined (batch 2c): the build drew what was declined then, as crossed
 * rings in the fourth lane; this adds any declined since, and lists each with who
 * declined it, why, Show changes and the book's people's comments.
 * Server text goes in with textContent only.
 */
import { el } from "./editor";
import { declinedCss, declinedDetails, declinedKind } from "./declined";
import { diffCss, getJson, when } from "./history";
import { roleBadge } from "./roles";
import {
  bookRows,
  historyApi,
  matchesFilter,
  openKind,
  readBookHistory,
  readDeclined,
} from "./timeline";
import type { DeclinedItem, Filter, OpenItem } from "./timeline";

const SVG_NS = "http://www.w3.org/2000/svg";
const STATE_LABELS = {
  proposed: "Proposed",
  drafts: "Being edited",
  published: "Published",
  declined: "Declined",
} as const;
const STYLE_ID = "tb-bh-style";

interface Row {
  date: string;
  who: string;
  role: string | null;
  summary: string;
  state: keyof typeof STATE_LABELS;
  page: string;
  pageTitle: string;
  href: string;
  ref: string;
  declined?: DeclinedItem;
}

/** A dot's summary in the caption under the swimlane: tap, click or focus. */
const armDots = (svg: SVGSVGElement, caption: HTMLElement) => {
  const show = (dot: Element | null) => {
    const title = dot?.querySelector("title")?.textContent;
    if (!title) return;
    for (const d of Array.from(svg.querySelectorAll(".tb-swim-dot[aria-current]")))
      d.removeAttribute("aria-current");
    dot!.setAttribute("aria-current", "true");
    caption.textContent = title;
  };
  svg.addEventListener("click", (e) => show((e.target as Element).closest(".tb-swim-dot")));
  svg.addEventListener("focusin", (e) => show((e.target as Element).closest(".tb-swim-dot")));
};

/**
 * Proposed dots in lane 0, on the static swimlane's own time axis (its first and
 * last dates, and the x of each). A proposal after the axis ends sits at its end.
 */
const addProposed = (svg: SVGSVGElement, items: OpenItem[]) => {
  const axis = Array.from(svg.querySelectorAll<SVGTextElement>(".tb-swim-axis"));
  const lane = svg.querySelector<SVGRectElement>('.tb-swim-lane[data-lane="0"]');
  if (axis.length < 2 || !lane) return;
  const [a, b] = axis.map((t) => ({
    t: Date.parse(t.textContent ?? ""),
    x: Number(t.getAttribute("x")),
  }));
  if (!Number.isFinite(a!.t) || !Number.isFinite(b!.t) || b!.t <= a!.t) return;
  const y = Number(lane.getAttribute("y")) + Number(lane.getAttribute("height")) / 2;
  for (const it of items) {
    const t = Math.min(Math.max(Date.parse(it.date), a!.t), b!.t);
    const dot = document.createElementNS(SVG_NS, "circle");
    dot.setAttribute("class", "tb-swim-dot");
    dot.setAttribute("data-lane", "0");
    dot.setAttribute("cx", (a!.x + ((t - a!.t) / (b!.t - a!.t)) * (b!.x - a!.x)).toFixed(1));
    dot.setAttribute("cy", String(y));
    dot.setAttribute("r", "5");
    dot.setAttribute("tabindex", "0");
    const title = document.createElementNS(SVG_NS, "title");
    title.textContent = `${it.date} · ${openKind(it)}: ${it.summary} (${it.who?.name ?? "a reader"})`;
    dot.append(title);
    svg.append(dot);
  }
};

/** Declined since the build: crossed rings in lane 3, beside the build's own. */
const addDeclined = (svg: SVGSVGElement, items: DeclinedItem[]) => {
  const axis = Array.from(svg.querySelectorAll<SVGTextElement>(".tb-swim-axis"));
  const lane = svg.querySelector<SVGRectElement>('.tb-swim-lane[data-lane="3"]');
  if (axis.length < 2 || !lane) return;
  const [a, b] = axis.map((t) => ({
    t: Date.parse(t.textContent ?? ""),
    x: Number(t.getAttribute("x")),
  }));
  if (!Number.isFinite(a!.t) || !Number.isFinite(b!.t) || b!.t <= a!.t) return;
  const y = Number(lane.getAttribute("y")) + Number(lane.getAttribute("height")) / 2;
  const drawn = new Set(
    Array.from(svg.querySelectorAll(".tb-swim-declined")).map((g) => g.getAttribute("data-number")),
  );
  for (const d of items) {
    if (drawn.has(String(d.number))) continue;
    const cx =
      a!.x +
      ((Math.min(Math.max(Date.parse(d.date), a!.t), b!.t) - a!.t) / (b!.t - a!.t)) * (b!.x - a!.x);
    const g = document.createElementNS(SVG_NS, "g");
    for (const [k, v] of Object.entries({
      class: "tb-swim-dot tb-swim-declined",
      "data-lane": "3",
      "data-number": String(d.number),
      tabindex: "0",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.5",
    }))
      g.setAttribute(k, v);
    const title = document.createElementNS(SVG_NS, "title");
    title.textContent = `${d.date} · declined: ${d.summary} (${d.who?.name ?? "a reader"})`;
    const ring = document.createElementNS(SVG_NS, "circle");
    ring.setAttribute("cx", cx.toFixed(1));
    ring.setAttribute("cy", String(y));
    ring.setAttribute("r", "5");
    const cross = document.createElementNS(SVG_NS, "path");
    cross.setAttribute(
      "d",
      `M${(cx - 3).toFixed(1)} ${y - 3}L${(cx + 3).toFixed(1)} ${y + 3}M${(cx + 3).toFixed(1)} ${y - 3}L${(cx - 3).toFixed(1)} ${y + 3}`,
    );
    g.append(title, ring, cross);
    svg.append(g);
  }
};

const select = (
  label: string,
  key: keyof Filter,
  options: [string, string][],
  onChange: (k: keyof Filter, v: string) => void,
) => {
  const s = el("select", { class: "tb-bh-select" });
  s.append(el("option", { value: "", text: "Any" }));
  for (const [value, text] of options) s.append(el("option", { value, text }));
  s.addEventListener("change", () => onChange(key, s.value));
  return el("label", { class: "tb-bh-filter" }, el("span", { text: label }), s);
};

export const mountBookHistory = async (
  mount: HTMLElement,
  historyUrl: string,
  revisionEndpoint: string,
) => {
  if (mount.dataset.tbWired) return;
  mount.dataset.tbWired = "1";
  const svg = document.querySelector<SVGSVGElement>("svg.tb-swimlane");
  if (svg) {
    const caption = el("p", {
      class: "tb-swim-caption",
      role: "status",
      text: "Tap a dot for what changed.",
    });
    svg.closest("figure")?.append(caption);
    armDots(svg, caption);
  }
  const c = new AbortController();
  setTimeout(() => c.abort(), 20000);
  const h = readBookHistory(await getJson(historyUrl, c.signal).catch(() => null));
  if (!h) return;
  const api = revisionEndpoint ? historyApi(revisionEndpoint) : "";
  if (!document.getElementById(STYLE_ID))
    document.head.append(
      el("style", { id: STYLE_ID, text: diffCss(".tb-bh-list") + declinedCss(".tb-bh-list") }),
    );
  // What the build knew was declined, until the function says what is declined now.
  let declined = readDeclined(h.declined);
  const proposed: OpenItem[] = api
    ? await getJson(historyApi(revisionEndpoint, "", { declined: "1" }), c.signal)
        .then((d) => {
          const now = (d as { declined?: unknown })?.declined;
          if (Array.isArray(now)) declined = readDeclined(now);
          return ((d as { items?: OpenItem[] })?.items ?? []).filter(
            (i) => i && typeof i.url === "string",
          );
        })
        .catch(() => [])
    : [];
  if (svg) {
    addProposed(svg, proposed);
    addDeclined(svg, declined);
  }

  const byPath = new Map(h.pages.map((p) => [p.source, p]));
  const rows: Row[] = [
    ...proposed.map((it) => {
      const page = it.files?.map((f) => byPath.get(f)).find(Boolean);
      return {
        date: it.date,
        who: it.who?.name ?? "A reader",
        role: "contributor",
        summary: it.summary || openKind(it),
        state: "proposed" as const,
        page: page?.source ?? "",
        pageTitle: page?.title ?? "",
        href: it.url,
        ref: `#${it.number}`,
      };
    }),
    ...declined.map((d) => {
      const page = d.files?.map((f) => byPath.get(f)).find(Boolean);
      return {
        date: d.date,
        who: d.who?.name ?? "A reader",
        role: "contributor",
        summary: d.summary || declinedKind(d),
        state: "declined" as const,
        page: page?.source ?? "",
        pageTitle: page?.title ?? "",
        href: d.url,
        ref: `#${d.number}`,
        declined: d,
      };
    }),
    ...bookRows(h).map((r) => ({
      date: r.date,
      who: r.who,
      role: r.role,
      summary: r.summary,
      state: r.state,
      page: r.page.source,
      pageTitle: r.page.title,
      href: r.page.path,
      ref: r.pr ? `#${r.pr}` : "",
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const filter: Filter = { page: "", person: "", state: "" };
  const list = el("ol", { class: "tb-bh-list" });
  const count = el("p", { class: "tb-bh-count", role: "status" });
  const draw = () => {
    list.textContent = "";
    const shown = rows.filter((r) => matchesFilter(filter, r));
    count.textContent = `${shown.length} change${shown.length === 1 ? "" : "s"}`;
    for (const r of shown) {
      const meta = el(
        "p",
        { class: "tb-bh-meta" },
        el("span", { class: `tb-bh-state tb-bh-${r.state}`, text: STATE_LABELS[r.state] }),
        ` ${when(r.date)} · ${r.who}`,
      );
      const badge = roleBadge(r.role);
      if (badge) meta.append(" ", badge);
      if (r.state === "proposed")
        meta.append(
          " · ",
          el("a", {
            href: r.href,
            target: "_blank",
            rel: "noopener noreferrer",
            text: `${r.ref} on GitHub ↗`,
          }),
        );
      list.append(
        el(
          "li",
          { class: "tb-bh-item" },
          el("p", { class: "tb-bh-summary", text: r.summary }),
          r.pageTitle
            ? el(
                "p",
                { class: "tb-bh-page" },
                r.state === "proposed" || r.state === "declined"
                  ? r.pageTitle
                  : el("a", { href: r.href, text: r.pageTitle }),
              )
            : null,
          meta,
          r.declined ? declinedDetails(r.declined, revisionEndpoint) : null,
        ),
      );
    }
  };
  const change = (k: keyof Filter, v: string) => {
    Object.assign(filter, { [k]: v });
    draw();
  };
  const people = [...new Set(rows.map((r) => r.who))].sort((a, b) => a.localeCompare(b));
  const pages = h.pages
    .filter((p) => p.published.length || p.drafts.length)
    .map((p) => [p.source, p.title] as [string, string]);
  mount.append(
    el("h2", { text: "All changes" }),
    el(
      "div",
      { class: "tb-bh-filters" },
      select("Chapter", "page", pages, change),
      select(
        "Person",
        "person",
        people.map((p) => [p, p]),
        change,
      ),
      select("State", "state", Object.entries(STATE_LABELS) as [string, string][], change),
    ),
    count,
    list,
  );
  document.querySelector(".tb-history-static")?.setAttribute("hidden", "");
  draw();
};
