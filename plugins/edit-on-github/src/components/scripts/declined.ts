/**
 * A declined proposal, note or suggestion (batch 2c), drawn the same way in a
 * page's History panel and on the book's /history page: what was proposed and by
 * whom, who declined it and why ("No reason was recorded." for one declined before
 * reasons were asked for), Show changes for a proposed edit (its pull request's
 * change, from the function's /api/history&change=, even after the branch is
 * gone), and the book's people's comments in order. Readers read; only the book's
 * people comment, in the author site. Server text goes in with textContent only.
 */
import { el } from "./editor";
import { renderRichDiff } from "./rich-diff";
import { historyApi } from "./timeline";
import type { DeclinedItem } from "./timeline";

export const NO_REASON = "No reason was recorded.";

/** "Declined proposed edit", "Declined note on ¶4", "Declined suggestion". */
export const declinedKind = (d: DeclinedItem): string =>
  d.kind === "edit"
    ? "Declined proposed edit"
    : d.kind === "note"
      ? d.paragraph
        ? `Declined note on ¶${d.paragraph}`
        : "Declined note"
      : "Declined suggestion";

const dayOf = (iso: string): string => {
  const t = Date.parse(iso);
  return Number.isFinite(t)
    ? new Date(t).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })
    : iso;
};

const getJson = async (url: string, signal: AbortSignal) => {
  const res = await fetch(url, { signal, credentials: "omit" });
  const data = await res.json().catch(() => null);
  if (!res.ok)
    throw Object.assign(new Error(`HTTP ${res.status}`), {
      userMessage: (data as { userMessage?: string })?.userMessage,
    });
  return data;
};

/**
 * The details of one declined item: who, why, Show changes, the comments.
 * `endpoint` is the configured .../api/page-revision?book=<slug>.
 */
export const declinedDetails = (d: DeclinedItem, endpoint: string): HTMLElement => {
  const box = el("div", { class: "tb-dc" });
  box.append(
    el("p", {
      class: "tb-dc-who",
      text: `Proposed by ${d.who?.name ?? "a reader"} on ${dayOf(d.proposed)}. Declined${d.decliner ? ` by ${d.decliner}` : ""} on ${dayOf(d.date)}.`,
    }),
    el(
      "blockquote",
      { class: `tb-dc-reason${d.reason ? "" : " tb-dc-none"}` },
      el("span", { class: "tb-dc-label", text: "Why it was declined: " }),
      d.reason ?? NO_REASON,
    ),
  );
  const actions = el("div", { class: "tb-hi-actions tb-dc-actions" });
  const slot = el("div", { class: "tb-hi-diff tb-dc-diff", hidden: true });
  if (d.kind === "edit" && endpoint) {
    const show = el("button", { type: "button", "aria-pressed": "false", text: "Show changes" });
    show.addEventListener("click", () => {
      if (!slot.hidden) {
        slot.hidden = true;
        show.setAttribute("aria-pressed", "false");
        return;
      }
      show.setAttribute("aria-pressed", "true");
      slot.hidden = false;
      slot.textContent = "";
      slot.append(
        el("p", { class: "tb-ed-muted", role: "status", text: "Loading what was proposed…" }),
      );
      const c = new AbortController();
      const timer = setTimeout(() => c.abort(), 20000);
      getJson(historyApi(endpoint, "", { change: String(d.number) }), c.signal)
        .then((data) => {
          const files = ((data as { files?: unknown })?.files ?? []) as {
            path?: unknown;
            before?: unknown;
            after?: unknown;
          }[];
          slot.textContent = "";
          if (!files.length)
            slot.append(el("p", { class: "tb-ed-muted", text: "The proposal changed no page." }));
          for (const f of files)
            slot.append(
              renderRichDiff(
                typeof f.before === "string" ? f.before : "",
                typeof f.after === "string" ? f.after : "",
              ),
            );
        })
        .catch((err) => {
          slot.textContent = "";
          slot.append(
            el("p", {
              class: "tb-ed-note",
              role: "alert",
              text:
                (err as { userMessage?: string })?.userMessage ||
                "What was proposed couldn’t be loaded just now.",
            }),
          );
        })
        .finally(() => clearTimeout(timer));
    });
    actions.append(show);
  }
  actions.append(
    el("a", {
      href: d.url,
      target: "_blank",
      rel: "noopener noreferrer",
      text: `See #${d.number} on GitHub ↗`,
    }),
  );
  box.append(actions, slot);
  if (d.comments.length) {
    const list = el("ol", {
      class: "tb-dc-comments",
      "aria-label": "Comments from the book's people",
    });
    for (const c of d.comments)
      list.append(
        el(
          "li",
          { class: "tb-dc-comment" },
          el("p", { class: "tb-dc-cmeta", text: `${c.name} · ${dayOf(c.date)}` }),
          el("p", { class: "tb-dc-ctext", text: c.text }),
        ),
      );
    box.append(el("p", { class: "tb-dc-chead", text: "Comments from the book’s people" }), list);
  }
  return box;
};

/** The declined items' own CSS (both places), scoped by `scope`. */
export const declinedCss = (scope: string) => `
${scope} .tb-dc { margin-top: 0.4rem; }
${scope} .tb-dc p { margin: 0.15rem 0; overflow-wrap: anywhere; }
${scope} .tb-dc-who, ${scope} .tb-dc-cmeta, ${scope} .tb-dc-chead { font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; color: var(--tb-muted, #6E6E73); }
${scope} .tb-dc-chead { margin-top: 0.6rem !important; font-weight: 700; }
${scope} .tb-dc-reason { margin: 0.4rem 0; padding: 0.4rem 0.75rem; border-left: 3px solid var(--tb-border, #E6E6E6); white-space: pre-line; overflow-wrap: anywhere; }
${scope} .tb-dc-none { color: var(--tb-muted, #6E6E73); font-style: italic; }
${scope} .tb-dc-label { font-family: var(--tb-font-ui, sans-serif); font-size: 0.9rem; font-weight: 700; font-style: normal; color: var(--tb-muted, #6E6E73); }
${scope} .tb-dc-comments { list-style: none; margin: 0; padding: 0; }
${scope} .tb-dc-comment { margin: 0.35rem 0; padding: 0.35rem 0.75rem; border-radius: 6px; background: var(--tb-bg-soft, #F7F7F5); }
${scope} .tb-dc-ctext { white-space: pre-line; }
${scope} .tb-hi-state.tb-hi-declined, ${scope} .tb-bh-declined { border-style: dotted; text-decoration: line-through; text-decoration-thickness: 1px; }
`;
