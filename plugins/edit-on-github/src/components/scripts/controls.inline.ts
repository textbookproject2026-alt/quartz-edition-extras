/**
 * The controls row's page script: the three control events, and book one's
 * suggest-an-edit modal, ported from publish.js:805-1450 (BOOK-ONE-TO-QUARTZ
 * §1b, §8 step 5) less the SPA handling and the placeholder-endpoint pane (the
 * button is only rendered when an endpoint is configured).
 *
 * Event names are Plausible's history for book one and must not change:
 * edit_on_github_clicked, suggest_edit_opened, suggest_edit_submitted {outcome}.
 * Added with the in-site editor (editor.ts): page_editor_opened {mode},
 * page_edit_submitted {outcome, mode}, github_signin {outcome}.
 *
 * The in-site editor: when the Edit link carries data-edit-endpoint, a plain
 * click opens editor.ts instead of GitHub (a modified click still goes to
 * GitHub, and without scripts the link is what it always was), and every
 * numbered paragraph gets a pencil that opens the editor on that paragraph.
 * The editor is a history entry (#edit, #edit-<¶>): a page loaded with one, or
 * reached again with Forward, opens it.
 * They go through window.tbTrack, which edition-integrations defines; without
 * it (book two, or an edition with that plugin off) they are dropped silently.
 *
 * The History panel: when the History link carries data-revision-endpoint, a
 * plain click opens history.ts (page_history_opened, page_revision_opened);
 * otherwise, and for a modified click, it is GitHub's history of the file.
 *
 * Failure-safe like publish.js: armed inside try/catch, and if arming fails the
 * Suggest button stays hidden rather than becoming a dead control.
 *
 * POST contract (the suggest-edit function; publish.js's header has the full
 * text): { name, email, suggestion, reasoning, path, website } -> 201
 * { issueUrl } | 4xx/5xx { error, userMessage? }. `error` is never shown.
 * `userMessage` is untrusted plain text: rendered with textContent, capped at
 * 200 characters. `website` is the honeypot, "" from every human.
 */

// The "nav" listener lives as long as the page, not a route, and every other
// listener sits on an element a route swap replaces, so none needs addCleanup.
/* eslint-disable no-restricted-syntax */
import { closeIfOpen as closeEditorIfOpen, EDIT_HASH, EDITOR_STATE, openEditor, PENCIL } from "./editor";
import { closeIfOpen as closeHistoryIfOpen, openHistory } from "./history";
import { apa, attribution, licenceName, plain } from "./cite";
import type { Run } from "./cite";

type Tracker = (name: string, props?: Record<string, string>) => void;

const track: Tracker = (name, props) => {
  try {
    const t = (window as unknown as { tbTrack?: Tracker }).tbTrack;
    if (typeof t === "function") props ? t(name, props) : t(name);
  } catch {
    /* analytics may never break a reader's path */
  }
};

type OpenModal = ((endpoint: string, repoPath: string, trigger: HTMLElement) => void) & {
  closeIfOpen: () => void;
};

const openSuggestModal: OpenModal | null = (() => {
  try {
    const OVERLAY_ID = "tb-suggest-overlay";
    const STYLE_ID = "tb-suggest-style";
    const TITLE_ID = "tb-suggest-title";
    const MAX_SUGGESTION = 5000;
    const FETCH_TIMEOUT = 10000; // ms, via AbortController

    // Deliberately loose: this catches typos, not invalid addresses.
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // Optional user-facing string from an error response. Untrusted TEXT:
    // type-checked, trimmed, capped, rendered via textContent, never innerHTML.
    const USER_MESSAGE_MAX = 200;
    const safeUserMessage = (data: unknown): string | null => {
      const raw = (data as { userMessage?: unknown } | null)?.userMessage;
      const m = typeof raw === "string" ? raw.trim() : "";
      return m ? m.slice(0, USER_MESSAGE_MAX) : null;
    };

    const injectStyle = () => {
      if (document.getElementById(STYLE_ID)) return;
      const style = document.createElement("style");
      style.id = STYLE_ID;
      // The --tb-* tokens with literal fallbacks, as the tag helper and badge
      // use them: the overlay is body-mounted and must render without them.
      style.textContent = `
#${OVERLAY_ID} { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: flex-start;
  justify-content: center; padding: 3rem 1rem; overflow-y: auto; background: rgba(0, 0, 0, 0.45);
  font-family: var(--tb-font-ui, sans-serif); font-size: var(--tb-size-controls, 0.85rem);
  line-height: 1.5; color: var(--tb-ink, #2B2B2B); }
#${OVERLAY_ID} [hidden] { display: none !important; }
#${OVERLAY_ID} .tb-sg-dialog { width: 100%; max-width: 34rem; padding: 1.5rem 1.5rem 1.25rem;
  border: 1px solid var(--tb-border, #E6E6E6); border-radius: 12px; background: var(--tb-bg, #FFFFFF);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18); }
#${OVERLAY_ID} .tb-sg-head { display: flex; align-items: baseline; justify-content: space-between;
  gap: 1rem; margin-bottom: 0.75rem; }
#${OVERLAY_ID} h2 { margin: 0; font-family: var(--tb-font-ui, sans-serif); font-size: 1.15rem;
  font-weight: 600; color: var(--tb-ink, #2B2B2B); }
#${OVERLAY_ID} .tb-sg-intro { margin: 0 0 1rem; color: var(--tb-muted, #6E6E73); }
#${OVERLAY_ID} .tb-sg-field { margin-bottom: 0.9rem; }
#${OVERLAY_ID} label { display: block; margin-bottom: 0.25rem; font-weight: 600; }
#${OVERLAY_ID} .tb-sg-opt { font-weight: 400; color: var(--tb-muted, #6E6E73); }
#${OVERLAY_ID} input, #${OVERLAY_ID} textarea { display: block; width: 100%; box-sizing: border-box;
  padding: 0.45rem 0.6rem; border: 1px solid var(--tb-border, #E6E6E6); border-radius: 8px;
  background: var(--tb-bg, #FFFFFF); color: var(--tb-ink, #2B2B2B); font-family: inherit;
  font-size: 1rem; /* >=16px equivalent: stops iOS zooming on focus */ line-height: 1.45; }
#${OVERLAY_ID} textarea { resize: vertical; min-height: 6rem; }
#${OVERLAY_ID} input:focus-visible, #${OVERLAY_ID} textarea:focus-visible,
#${OVERLAY_ID} button:focus-visible, #${OVERLAY_ID} a:focus-visible {
  outline: 2px solid var(--tb-accent, #7C6CF0); outline-offset: 2px; }
#${OVERLAY_ID} input[readonly] { background: var(--tb-bg-soft, #F7F7F5); color: var(--tb-muted, #6E6E73);
  font-family: var(--tb-font-mono, monospace); font-size: 0.9rem; }
#${OVERLAY_ID} [aria-invalid="true"] { border-color: #B3261E; }
#${OVERLAY_ID} .tb-sg-err { margin: 0.25rem 0 0; min-height: 0; color: #B3261E; }
#${OVERLAY_ID} .tb-sg-count { margin: 0.25rem 0 0; color: var(--tb-muted, #6E6E73); }
/* Honeypot: clipped the screen-reader-only way, NOT display:none. Bots skip
   display:none fields; this one only works if it looks fillable. */
#${OVERLAY_ID} .tb-sg-hp { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
#${OVERLAY_ID} .tb-sg-actions { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.1rem; }
#${OVERLAY_ID} button.tb-sg-btn { font: inherit; font-weight: 600; padding: 0.45rem 1.1rem;
  border: 1px solid var(--tb-accent, #7C6CF0); border-radius: 999px; background: var(--tb-accent, #7C6CF0);
  color: #FFFFFF; cursor: pointer; }
#${OVERLAY_ID} button.tb-sg-btn:hover:not(:disabled) { background: var(--tb-accent-hover, #6A57E0);
  border-color: var(--tb-accent-hover, #6A57E0); }
#${OVERLAY_ID} button.tb-sg-btn:disabled { opacity: 0.6; cursor: default; }
#${OVERLAY_ID} button.tb-sg-quiet { font: inherit; padding: 0.45rem 0.6rem; border: 0; background: none;
  color: var(--tb-muted, #6E6E73); cursor: pointer; }
#${OVERLAY_ID} button.tb-sg-quiet:hover { color: var(--tb-ink, #2B2B2B); }
#${OVERLAY_ID} button.tb-sg-close { font: inherit; font-size: 1.25rem; line-height: 1; padding: 0.15rem 0.35rem;
  border: 0; background: none; color: var(--tb-faint, #9B9BA1); cursor: pointer; }
#${OVERLAY_ID} button.tb-sg-close:hover { color: var(--tb-ink, #2B2B2B); }
#${OVERLAY_ID} .tb-sg-pane:focus { outline: none; }
#${OVERLAY_ID} .tb-sg-pane-title { margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 600; }
#${OVERLAY_ID} .tb-sg-pane p { margin: 0 0 0.75rem; }
#${OVERLAY_ID} .tb-sg-pane a { color: var(--tb-accent, #7C6CF0); }
@media (max-width: 768px) {
  #${OVERLAY_ID} { padding: 0; align-items: stretch; }
  #${OVERLAY_ID} .tb-sg-dialog { max-width: none; min-height: 100%; border: 0; border-radius: 0; }
}
@media print { #${OVERLAY_ID} { display: none !important; } }
`;
      document.head.appendChild(style);
    };

    type Field = {
      wrap: HTMLDivElement;
      control: HTMLInputElement | HTMLTextAreaElement;
      err: HTMLParagraphElement;
      hintId: string | null;
    };

    // One labelled field: <label for> + control + its error paragraph.
    const makeField = (
      id: string,
      labelText: string,
      control: HTMLInputElement | HTMLTextAreaElement,
      optional = false,
    ): Field => {
      const wrap = document.createElement("div");
      wrap.className = "tb-sg-field";
      const label = document.createElement("label");
      label.setAttribute("for", id);
      label.textContent = labelText;
      if (optional) {
        const opt = document.createElement("span");
        opt.className = "tb-sg-opt";
        opt.textContent = " (optional)";
        label.append(opt);
      }
      const err = document.createElement("p");
      err.className = "tb-sg-err";
      err.id = id + "-err";
      control.id = id;
      if (!optional && !control.readOnly) control.required = true;
      wrap.append(label, control, err);
      return { wrap, control, err, hintId: null };
    };

    // aria-describedby is recomputed, never blindly overwritten, so the
    // counter and an error message can both describe the textarea.
    const describe = (f: Field) => {
      const ids: string[] = [];
      if (f.err.textContent) ids.push(f.err.id);
      if (f.hintId) ids.push(f.hintId);
      if (ids.length) f.control.setAttribute("aria-describedby", ids.join(" "));
      else f.control.removeAttribute("aria-describedby");
    };
    const invalidate = (f: Field, msg: string) => {
      f.control.setAttribute("aria-invalid", "true");
      f.err.textContent = msg;
      describe(f);
    };
    const clearInvalid = (f: Field) => {
      if (!f.control.hasAttribute("aria-invalid")) return;
      f.control.removeAttribute("aria-invalid");
      f.err.textContent = "";
      describe(f);
    };

    // Only one modal at a time.
    let close: (() => void) | null = null;

    const open = (endpoint: string, repoPath: string, trigger: HTMLElement) => {
      if (close) return;
      injectStyle();

      const previouslyFocused = trigger;
      const bodyOverflow = document.body.style.overflow;
      let controller: AbortController | null = null; // in-flight submit
      let submitting = false;

      const overlay = document.createElement("div");
      overlay.id = OVERLAY_ID;

      const dialog = document.createElement("div");
      dialog.className = "tb-sg-dialog";
      dialog.tabIndex = -1; // fallback focus target for the trap
      dialog.setAttribute("role", "dialog");
      dialog.setAttribute("aria-modal", "true");
      dialog.setAttribute("aria-labelledby", TITLE_ID);

      const head = document.createElement("div");
      head.className = "tb-sg-head";
      const title = document.createElement("h2");
      title.id = TITLE_ID;
      title.textContent = "Suggest an edit";
      const closeBtn = document.createElement("button");
      closeBtn.type = "button";
      closeBtn.className = "tb-sg-close";
      closeBtn.textContent = "×";
      closeBtn.setAttribute("aria-label", "Close suggestion form");
      head.append(title, closeBtn);

      // A real <form>: Enter-to-submit comes free, and submit is the one entry point.
      const form = document.createElement("form");
      form.noValidate = true; // our messages, not the browser's bubbles

      const intro = document.createElement("p");
      intro.className = "tb-sg-intro";
      intro.textContent =
        "Spotted something to fix or improve? Describe the change and it goes to the maintainers as an issue.";

      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.name = "name";
      nameInput.autocomplete = "name";
      const nameField = makeField("tb-sg-name", "Your name", nameInput);

      const emailInput = document.createElement("input");
      emailInput.type = "email";
      emailInput.name = "email";
      emailInput.autocomplete = "email";
      const emailField = makeField("tb-sg-email", "Your email", emailInput);

      // Readonly, not disabled: focusable and copyable, so the reader sees
      // exactly which page they are editing.
      const pathInput = document.createElement("input");
      pathInput.type = "text";
      pathInput.name = "path";
      pathInput.readOnly = true;
      pathInput.value = repoPath;
      const pathField = makeField("tb-sg-path", "Page you are editing", pathInput);

      const suggestion = document.createElement("textarea");
      suggestion.name = "suggestion";
      suggestion.rows = 6;
      suggestion.maxLength = MAX_SUGGESTION;
      const suggestionField = makeField("tb-sg-suggestion", "Your suggested change", suggestion);
      const count = document.createElement("p");
      count.className = "tb-sg-count";
      count.id = "tb-sg-count";
      suggestionField.hintId = count.id;
      const renderCount = () => {
        const left = MAX_SUGGESTION - suggestion.value.length;
        count.textContent = left + " character" + (left === 1 ? "" : "s") + " remaining";
      };
      renderCount();
      describe(suggestionField);
      // No live region on the counter: announcing every keystroke makes the
      // field unusable with a screen reader. aria-describedby reads it on
      // focus, and maxlength is the real backstop.
      suggestion.addEventListener("input", () => {
        renderCount();
        clearInvalid(suggestionField);
      });
      suggestionField.wrap.append(count);

      const reasoning = document.createElement("textarea");
      reasoning.name = "reasoning";
      reasoning.rows = 3;
      const reasoningField = makeField("tb-sg-reasoning", "Why", reasoning, true);

      for (const f of [nameField, emailField]) {
        f.control.addEventListener("input", () => clearInvalid(f));
      }

      // Honeypot. The NAME is the bait ("website" is what naive form-fillers
      // look for), and clipping keeps it visually gone while a bot reading the
      // computed style still believes it is a live field.
      //
      // Hiding it from assistive tech is a correctness requirement: a
      // screen-reader user who filled it in honestly would have their
      // suggestion silently discarded. Four independent guards, because one
      // failing is invisible from outside:
      //   - aria-hidden on the WRAPPER  -> hides the whole subtree
      //   - aria-hidden on the INPUT    -> survives any restructuring of the
      //                                    wrapper (the input is what a probe checks)
      //   - tabindex=-1                 -> unreachable by keyboard, which is what
      //                                    makes aria-hidden on a control legitimate
      //   - label "Leave this field empty" -> plain-text last resort
      const hpWrap = document.createElement("div");
      hpWrap.className = "tb-sg-hp";
      hpWrap.setAttribute("aria-hidden", "true");
      const hpLabel = document.createElement("label");
      hpLabel.setAttribute("for", "tb-sg-website");
      hpLabel.textContent = "Leave this field empty";
      const hp = document.createElement("input");
      hp.type = "text";
      hp.name = "website";
      hp.id = "tb-sg-website";
      hp.tabIndex = -1;
      hp.autocomplete = "off";
      hp.setAttribute("aria-hidden", "true");
      hpWrap.append(hpLabel, hp);

      const actions = document.createElement("div");
      actions.className = "tb-sg-actions";
      const submitBtn = document.createElement("button");
      submitBtn.type = "submit";
      submitBtn.className = "tb-sg-btn";
      submitBtn.textContent = "Send suggestion";
      const cancelBtn = document.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.className = "tb-sg-quiet";
      cancelBtn.textContent = "Cancel";
      actions.append(submitBtn, cancelBtn);

      form.append(
        intro,
        nameField.wrap,
        emailField.wrap,
        pathField.wrap,
        suggestionField.wrap,
        reasoningField.wrap,
        hpWrap,
        actions,
      );

      // Result panes replace the form in place (hidden, not destroyed), so a
      // failed send can go back with every field intact.
      const pane = document.createElement("div");
      pane.className = "tb-sg-pane";
      pane.tabIndex = -1; // moving focus here is what announces it
      pane.hidden = true;

      dialog.append(head, form, pane);
      overlay.append(dialog);

      const backToForm = () => {
        pane.hidden = true;
        form.hidden = false;
        suggestion.focus();
      };

      const showPane = (
        paneTitle: string,
        message: string,
        link?: string | null,
        retry = false,
      ) => {
        if (!overlay.isConnected) return; // closed while a send was in flight
        pane.textContent = "";
        const t = document.createElement("p");
        t.className = "tb-sg-pane-title";
        t.textContent = paneTitle;
        const p = document.createElement("p");
        p.textContent = message;
        pane.append(t, p);
        if (link) {
          const a = document.createElement("a");
          a.href = link;
          a.target = "_blank";
          a.rel = "noopener";
          a.textContent = "View your suggestion on GitHub";
          const wrapA = document.createElement("p");
          wrapA.append(a);
          pane.append(wrapA);
        }
        const b = document.createElement("button");
        b.type = "button";
        b.className = retry ? "tb-sg-btn" : "tb-sg-quiet";
        b.textContent = retry ? "Back to my suggestion" : "Close";
        b.addEventListener("click", retry ? backToForm : () => close?.());
        pane.append(b);
        form.hidden = true;
        pane.hidden = false;
        pane.focus();
      };

      // --- focus trap ---------------------------------------------------
      // Recomputed per Tab: the dialog swaps between form and pane, so a
      // cached list would trap focus on detached nodes.
      const focusables = () =>
        Array.prototype.filter.call(
          dialog.querySelectorAll("a[href], button, input, textarea, select, [tabindex]"),
          (el: HTMLElement & { disabled?: boolean }) =>
            !el.disabled && el.tabIndex >= 0 && !el.closest("[hidden]"),
        ) as HTMLElement[];

      const onKeydown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          close?.();
          return;
        }
        if (e.key !== "Tab") return;
        const items = focusables();
        if (!items.length) {
          e.preventDefault();
          dialog.focus();
          return;
        }
        // idx === -1 covers focus on the pane (tabindex=-1) or outside the
        // dialog entirely: both are pulled back in.
        const idx = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey) {
          if (idx <= 0) {
            e.preventDefault();
            items[items.length - 1]!.focus();
          }
        } else if (idx === -1 || idx === items.length - 1) {
          e.preventDefault();
          items[0]!.focus();
        }
      };

      close = () => {
        close = null;
        if (controller) {
          try {
            controller.abort();
          } catch {
            /* already settled */
          }
        }
        document.removeEventListener("keydown", onKeydown, true);
        overlay.remove();
        document.body.style.overflow = bodyOverflow; // release the scroll lock
        if (previouslyFocused.isConnected) previouslyFocused.focus();
      };

      overlay.addEventListener("mousedown", (e) => {
        if (e.target === overlay) close?.();
      });
      closeBtn.addEventListener("click", () => close?.());
      cancelBtn.addEventListener("click", () => close?.());
      // Capture phase: the Hypothes.is client also listens for keys at the
      // document level, and Escape must belong to the modal while it is open.
      document.addEventListener("keydown", onKeydown, true);

      const validate = () => {
        let firstBad: HTMLElement | null = null;
        const fail = (f: Field, msg: string) => {
          invalidate(f, msg);
          if (!firstBad) firstBad = f.control;
        };
        for (const f of [nameField, emailField, suggestionField]) clearInvalid(f);
        if (!nameInput.value.trim()) fail(nameField, "Please add your name.");
        const email = emailInput.value.trim();
        if (!email) fail(emailField, "Please add your email.");
        else if (!EMAIL_RE.test(email))
          fail(emailField, "That does not look like an email address.");
        if (!suggestion.value.trim())
          fail(suggestionField, "Please describe the change you would like.");
        else if (suggestion.value.length > MAX_SUGGESTION) {
          fail(
            suggestionField,
            "Please keep the suggestion under " + MAX_SUGGESTION + " characters.",
          );
        }
        if (firstBad) (firstBad as HTMLElement).focus();
        return !firstBad;
      };

      const setBusy = (busy: boolean) => {
        submitting = busy;
        submitBtn.disabled = busy;
        submitBtn.textContent = busy ? "Sending…" : "Send suggestion";
      };

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (submitting || !validate()) return;

        const payload = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          suggestion: suggestion.value.trim(),
          reasoning: reasoning.value.trim(),
          path: repoPath,
          website: hp.value,
        };

        // Honeypot tripped: behave exactly like success, send nothing.
        if (payload.website) {
          showPane("Thank you", "Your suggestion has been received.");
          return;
        }

        setBusy(true);
        const c = (controller = new AbortController());
        const timer = setTimeout(() => c.abort(), FETCH_TIMEOUT);
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: c.signal,
        })
          .then(async (res) => {
            // The body may be empty or not JSON on an error path.
            let data: unknown = null;
            try {
              data = await res.json();
            } catch {
              data = null;
            }
            if (!res.ok) {
              // `error` is log material only; `userMessage` rides along.
              const failure = new Error(
                ((data as { error?: string } | null)?.error as string) || "HTTP " + res.status,
              ) as Error & { userMessage?: string | null };
              failure.userMessage = safeUserMessage(data);
              throw failure;
            }
            return data;
          })
          .then((data) => {
            track("suggest_edit_submitted", { outcome: "success" });
            const issueUrl = (data as { issueUrl?: unknown } | null)?.issueUrl;
            showPane(
              "Thank you — suggestion sent",
              "A maintainer will pick this up. You can follow it here:",
              typeof issueUrl === "string" ? issueUrl : null,
            );
          })
          .catch((err: { userMessage?: string | null } | null) => {
            track("suggest_edit_submitted", { outcome: "error" });
            // Network failures and the timeout have no userMessage.
            showPane(
              "That did not go through",
              (err && err.userMessage) ||
                "Something went wrong sending your suggestion — nothing was lost. " +
                  "Try again in a moment, or use the Edit link above.",
              null,
              true,
            );
          })
          .finally(() => {
            clearTimeout(timer);
            if (controller === c) controller = null;
            if (submitBtn.isConnected) setBusy(false);
            else submitting = false;
          });
      });

      document.body.style.overflow = "hidden"; // scroll lock while the modal is up
      document.body.appendChild(overlay);
      nameInput.focus();
      track("suggest_edit_opened"); // no path prop: Plausible records the page
    };

    // A throw anywhere in open() can't escape into the click handler: the
    // half-built overlay is reaped and the page carries on.
    const guarded = ((endpoint: string, repoPath: string, trigger: HTMLElement) => {
      try {
        open(endpoint, repoPath, trigger);
      } catch {
        close = null;
        document.getElementById(OVERLAY_ID)?.remove();
        document.body.style.overflow = "";
      }
    }) as OpenModal;
    guarded.closeIfOpen = () => close?.();
    return guarded;
  } catch {
    return null; // feature absent; the button stays hidden
  }
})();

const PEDIT_STYLE_ID = "tb-pedit-style";

// The pencil sits in the paragraph's right margin and shows on hover. It is
// deliberately out of the tab order and hidden from assistive tech: a button
// after every paragraph would make the page tedious by keyboard and screen
// reader, and "Edit this page" covers the same ground for them. It holds no
// text (the icon's <svg> has no <title>), so Hypothes.is anchors don't move.
const pencilStyle = () => {
  if (document.getElementById(PEDIT_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = PEDIT_STYLE_ID;
  style.textContent = `
[data-pnum] { position: relative; }
[data-pnum] > button.tb-pedit { position: absolute; top: 0.2em; right: -2.5rem; display: inline-flex; align-items: center;
  justify-content: center; width: 1.75rem; height: 1.75rem; padding: 0; margin: 0; border: 1px solid transparent;
  border-radius: 6px; background: none; color: var(--tb-faint, #9B9BA1); opacity: 0; cursor: pointer;
  transition: opacity 0.12s; }
[data-pnum]:hover > button.tb-pedit { opacity: 1; color: var(--tb-muted, #6E6E73); }
[data-pnum] > button.tb-pedit:hover { color: var(--tb-accent, #7C6CF0); border-color: var(--tb-border, #E6E6E6);
  background: var(--tb-bg-soft, #F7F7F5); }
@media (hover: none) { [data-pnum] > button.tb-pedit { opacity: 0.5; } }
@media (max-width: 800px) { [data-pnum] > button.tb-pedit { top: -1.55rem; right: 0; width: 1.4rem; height: 1.4rem; } }
.popover button.tb-pedit { display: none; }
@media print { button.tb-pedit { display: none !important; } }
`;
  document.head.appendChild(style);
};

const pencil = () => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "tb-pedit";
  b.tabIndex = -1;
  b.setAttribute("aria-hidden", "true");
  b.title = "Edit this paragraph";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("width", "15");
  svg.setAttribute("height", "15");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", PENCIL);
  path.setAttribute("fill", "currentColor");
  svg.append(path);
  b.append(svg);
  return b;
};

// --- the header's menus and panels -------------------------------------------------

/**
 * A button that opens a menu or a panel under it: aria-expanded on the button,
 * one open at a time, a click elsewhere closes it. In a menu, the arrow keys,
 * Home and End move between items and Tab leaves (closing it); Escape closes
 * either and gives focus back to the button. `gate` runs before the first
 * open (the explainer, E).
 */
type Disclosure = { open: () => void; close: (focusButton?: boolean) => void };
const openNow = new Set<{ d: Disclosure; button: HTMLElement; panel: HTMLElement }>();
document.addEventListener("click", (e) => {
  const t = e.target as Element | null;
  // A click in a dialog (the explainer's Continue opens a menu) isn't "elsewhere".
  if (!t || !t.isConnected || t.closest?.("dialog")) return;
  for (const o of Array.from(openNow))
    if (t && !o.panel.contains(t) && !o.button.contains(t)) o.d.close(false);
});

const disclosure = (
  button: HTMLButtonElement,
  panel: HTMLElement,
  isMenu: boolean,
  gate?: (open: () => void) => void,
): Disclosure => {
  const items = () =>
    Array.from(
      panel.querySelectorAll<HTMLElement>(isMenu ? '[role="menuitem"]' : "input, button, a[href]"),
    ).filter((el) => !el.hidden && !el.closest("[hidden]"));
  const entry = { d: null as unknown as Disclosure, button, panel };
  const d: Disclosure = {
    open() {
      for (const o of Array.from(openNow)) if (o !== entry) o.d.close(false);
      panel.hidden = false;
      button.setAttribute("aria-expanded", "true");
      openNow.add(entry);
      const first = isMenu ? items()[0] : (panel.querySelector<HTMLElement>("input:checked") ?? items()[0]);
      first?.focus();
    },
    close(focusButton = true) {
      if (panel.hidden) return;
      panel.hidden = true;
      button.setAttribute("aria-expanded", "false");
      openNow.delete(entry);
      if (focusButton) button.focus();
    },
  };
  entry.d = d;
  button.addEventListener("click", () => {
    if (!panel.hidden) return d.close();
    if (gate) gate(d.open);
    else d.open();
  });
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && !panel.hidden) {
      e.preventDefault();
      e.stopPropagation();
      d.close(true);
      return;
    }
    if (!isMenu || panel.hidden || !panel.contains(e.target as Node)) return;
    const list = items();
    const i = list.indexOf(document.activeElement as HTMLElement);
    const go = (n: number) => {
      e.preventDefault();
      list[(n + list.length) % list.length]?.focus();
    };
    if (e.key === "ArrowDown") go(i + 1);
    else if (e.key === "ArrowUp") go(i - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(list.length - 1);
    else if (e.key === "Tab") d.close(false);
  };
  panel.addEventListener("keydown", onKey);
  button.addEventListener("keydown", onKey);
  // A chosen item closes the menu; the action it starts takes focus from there.
  if (isMenu)
    panel.addEventListener("click", (e) => {
      const it = (e.target as HTMLElement).closest<HTMLElement>('[role="menuitem"]');
      if (!it) return;
      if (it.getAttribute("aria-disabled") === "true") {
        e.preventDefault();
        return;
      }
      d.close(false);
    });
  return d;
};

const el = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Record<string, string> = {},
  ...children: (Node | string | null)[]
): HTMLElementTagNameMap[K] => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "text") n.textContent = v;
    else if (k === "class") n.className = v;
    else n.setAttribute(k, v);
  }
  for (const c of children) if (c !== null) n.append(c);
  return n;
};

/** A modal <dialog>: Escape and Close shut it, and focus goes back to `trigger`. */
const dialog = (label: string, trigger: HTMLElement, ...body: Node[]) => {
  const d = el("dialog", { class: "tb-dialog", "aria-label": label });
  const x = el("button", { type: "button", class: "tb-dialog-x", "aria-label": "Close", text: "×" });
  x.addEventListener("click", () => d.close());
  d.append(x, ...body);
  let after: (() => void) | null = null;
  d.addEventListener("close", () => {
    d.remove();
    if (after) after();
    else if (trigger.isConnected) trigger.focus();
  });
  document.body.append(d);
  if (typeof d.showModal === "function") d.showModal();
  else d.setAttribute("open", "");
  return { d, closeThen: (fn: () => void) => ((after = fn), d.close()) };
};

const status = (text: string) => {
  const s = document.querySelector<HTMLElement>(".tb-hdr-status");
  if (!s) return;
  s.textContent = text;
  setTimeout(() => {
    if (s.textContent === text) s.textContent = "";
  }, 4000);
};

const copy = (text: string, done: () => void, failed: () => void) => {
  const legacy = () => {
    const ta = el("textarea", { readonly: "" });
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.append(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    ta.remove();
    return ok;
  };
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, () => (legacy() ? done() : failed()));
  else if (legacy()) done();
  else failed();
};

// --- E: how contributing works -----------------------------------------------------

const EXPLAINED = "tb-contribute-explained";
let explainedHere = false;
const explained = () => {
  if (explainedHere) return true;
  try {
    return localStorage.getItem(EXPLAINED) === "1";
  } catch {
    return false;
  }
};

/**
 * The explainer: the three ways to contribute, who sees each and which account
 * it needs. With `then`, it ends with a button that carries on to what the
 * reader clicked.
 */
const explain = (trigger: HTMLElement, howTo: string, then?: { label: string; run: () => void }) => {
  explainedHere = true;
  try {
    localStorage.setItem(EXPLAINED, "1");
  } catch {
    /* shown again on another page, then: harmless */
  }
  const route = (title: string, what: string, who: string, account: string, link?: [string, string]) =>
    el(
      "section",
      { class: "tb-route" },
      el("h3", { text: title }),
      el("p", { text: what }),
      el("p", {}, el("strong", { text: "Who sees it: " }), who),
      el(
        "p",
        {},
        el("strong", { text: "Account: " }),
        account,
        link ? " " : null,
        link ? el("a", { href: link[1], target: "_blank", rel: "noopener noreferrer", text: link[0] }) : null,
      ),
    );
  const actions = el("div", { class: "tb-dialog-row" });
  const box = dialog(
    "How contributing works",
    trigger,
    el("h2", { text: "How contributing works" }),
    el("p", {
      text: "There are three ways to help with this book. They differ in who sees what you write, and in which account you need.",
    }),
    route(
      "Edit this page",
      "Change the wording yourself. Your change goes to the authors as a proposal, and nothing in the book changes until they accept it.",
      "The authors review it. The proposal is public on the book's GitHub repository, and once it's accepted your GitHub name appears in the page's history.",
      "A free GitHub account.",
      ["Create a GitHub account ↗", "https://github.com/signup"],
    ),
    route(
      "Note to the authors",
      "Tell the authors about a mistake or an idea, in a short form.",
      "The authors. It becomes an issue on the book's GitHub repository: anyone can read it there, but it doesn't appear on this page.",
      "None. You give a name and an email address; the email is never published.",
    ),
    route(
      "Public comment",
      "Write in the margin with Hypothes.is: highlight a passage and comment on it, or reply to someone else's comment.",
      "Everyone reading the book, with your Hypothes.is username.",
      "A free Hypothes.is account.",
      ["Create a Hypothes.is account ↗", "https://hypothes.is/signup"],
    ),
    el("p", {}, el("a", { href: howTo, text: "More about commenting and contributing" })),
    actions,
  );
  const close = el("button", { type: "button", class: "tb-btn", text: "Close" });
  close.addEventListener("click", () => box.d.close());
  if (then) {
    const go = el("button", { type: "button", class: "tb-btn tb-btn-primary", text: then.label });
    go.addEventListener("click", () => box.closeThen(then.run));
    actions.append(close, go);
    go.focus();
  } else {
    actions.append(close);
    close.focus();
  }
};

/** The first Contribute, pencil or Annotate on this site shows the explainer first. */
const firstTime = (trigger: HTMLElement, howTo: string, label: string, run: () => void) =>
  explained() ? run() : explain(trigger, howTo, { label, run });

// --- F: cite --------------------------------------------------------------------

const pageUrl = () => {
  let path = location.pathname.replace(/\.html$/, "");
  if (path === "/index" || /\/index$/.test(path)) path = path.slice(0, -"index".length);
  return location.origin + path;
};

const cite = (header: HTMLElement, trigger: HTMLElement) => {
  const input = {
    authors: header.dataset.authors ?? "",
    bookTitle: header.dataset.bookTitle ?? "",
    pageTitle: header.dataset.pageTitle ?? "",
    licence: header.dataset.licence ?? "",
    url: pageUrl(),
    accessed: new Date(),
  };
  const runs = (rs: Run[]) => {
    const p = el("p", { class: "tb-cite-text" });
    for (const r of rs) p.append(r.italic ? el("i", { text: r.text }) : r.text);
    return p;
  };
  const block = (title: string, rs: Run[]) => {
    const said = el("span", { class: "tb-cite-said", role: "status" });
    const b = el("button", { type: "button", class: "tb-btn", text: "Copy" });
    b.addEventListener("click", () =>
      copy(plain(rs), () => (said.textContent = "Copied"), () => (said.textContent = "Couldn't copy: select the text instead")),
    );
    return el("section", {}, el("h3", { text: title }), runs(rs), el("div", { class: "tb-dialog-row" }, said, b));
  };
  const lic = licenceName(input.licence);
  dialog(
    "Cite this page",
    trigger,
    el("h2", { text: "Cite this page" }),
    block("APA 7", apa(input)),
    block(lic ? `Attribution (${lic})` : "Attribution", attribution(input)),
  );
};

// --- C: the Appearance panel ------------------------------------------------------

type Prefs = { get: (n: string) => string; set: (n: string, v: string) => void };
type Annotations = { open: () => Promise<boolean>; enable: () => void; disable: () => { reload: boolean } };

const appearance = (panel: HTMLElement, prefs: Prefs, annotations: Annotations | undefined) => {
  const groups: [string, string, [string, string][]][] = [
    ["text", "Text size", [["small", "Small"], ["standard", "Standard"], ["large", "Large"]]],
    ["width", "Width", [["standard", "Standard"], ["wide", "Wide"]]],
    ["theme", "Theme", [["auto", "Auto"], ["light", "Light"], ["dark", "Dark"]]],
    ["numbers", "Paragraph numbers", [["on", "On"], ["off", "Off"]]],
  ];
  if (annotations) groups.push(["annotations", "Public annotations", [["on", "On"], ["off", "Off"]]]);
  const note = el("p", { class: "tb-panel-note", role: "status" });
  for (const [name, legend, options] of groups) {
    const seg = el("div", { class: "tb-seg" });
    for (const [value, label] of options) {
      const input = el("input", { type: "radio", name: `tb-pref-${name}`, value });
      input.checked = prefs.get(name) === value;
      input.addEventListener("change", () => {
        if (name === "annotations" && annotations) {
          note.textContent = "";
          if (value === "on") annotations.enable();
          else if (annotations.disable().reload) {
            const reload = el("button", { type: "button", class: "tb-btn", text: "Reload" });
            reload.addEventListener("click", () => location.reload());
            note.append("Highlights hidden. The annotation tab goes away when the page reloads.", reload);
          }
          return;
        }
        prefs.set(name, value);
        if (name === "numbers") track("paragraph_numbers_toggled", { to: value });
      });
      seg.append(el("label", {}, input, label));
    }
    const fs = el("fieldset", {}, el("legend", { text: legend }), seg);
    if (name === "annotations") fs.append(note);
    panel.append(fs);
  }
};

// --- wiring --------------------------------------------------------------------------

/** Opens the editor the given #edit names; set by armEditor for this page. */
let openFromHash: ((hash: string, push: boolean) => void) | null = null;
// Forward onto an #edit entry, or #edit typed into the address bar.
window.addEventListener("popstate", () => openFromHash?.(location.hash, false));

/**
 * The editor on the Edit item and, where there are numbered paragraphs, on each.
 * `back` is where focus returns when the editor closes: the Contribute button,
 * since the item itself is in a closed menu by then.
 */
const armEditor = (
  edit: HTMLAnchorElement,
  endpoint: string,
  back: HTMLElement,
  howTo: string,
  suggest?: () => void,
) => {
  const base = {
    endpoint,
    path: edit.dataset.path ?? "",
    repo: edit.dataset.repo ?? "",
    githubHref: edit.href,
    builtBlob: edit.closest<HTMLElement>(".tb-page-controls")?.dataset.sourceBlob,
    suggest,
    track,
  };
  edit.addEventListener("click", (e) => {
    // Cmd/Ctrl/Shift/middle click: the reader asked for GitHub in a new tab.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      track("edit_on_github_clicked");
      return;
    }
    e.preventDefault();
    openEditor({ ...base, mode: "page", trigger: back });
  });
  const pencils = new Map<string, { p: HTMLElement; b: HTMLButtonElement }>();
  const paras = Array.from(document.querySelectorAll<HTMLElement>("[data-pnum]")).filter(
    (p) => !p.closest(".popover") && !p.querySelector(":scope > button.tb-pedit"),
  );
  if (paras.length) pencilStyle();
  for (const p of paras) {
    const b = pencil();
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      firstTime(b, howTo, `Continue: edit ¶${p.dataset.pnum}`, () =>
        openEditor({ ...base, mode: "paragraph", para: p, trigger: b }),
      );
    });
    p.append(b);
    pencils.set(p.dataset.pnum ?? "", { p, b });
  }
  openFromHash = (hash, push) => {
    const m = EDIT_HASH.exec(hash);
    if (!m) return;
    const at = m[1] ? pencils.get(m[1]) : undefined;
    openEditor(
      at
        ? { ...base, mode: "paragraph", para: at.p, trigger: at.b, push }
        : { ...base, mode: "page", trigger: back, push },
    );
  };
};

/** The History panel on the Page history item, when the builder gave it an endpoint. */
const armHistory = (link: HTMLAnchorElement, endpoint: string, back: HTMLElement) => {
  link.addEventListener("click", (e) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    openHistory({
      endpoint,
      listUrl: link.dataset.history ?? "",
      path: link.dataset.path ?? "",
      repo: link.dataset.repo ?? "",
      branch: link.dataset.branch ?? "",
      githubHref: link.href,
      trigger: back,
      track,
    });
  });
};

/**
 * Header items never clip: when the header's contents are wider than the header
 * (labels, a long title, an annotation count, a larger font), it goes to icons.
 * Measured with the labels shown, on every change of the header's or its
 * controls' size.
 */
const fitHeader = (header: HTMLElement) => {
  const fit = () => {
    header.classList.remove("tb-hdr-icons");
    if (header.scrollWidth > header.clientWidth + 1) header.classList.add("tb-hdr-icons");
  };
  fit();
  // The window (and zoom); the header's own width (the page padded for the open
  // annotation sidebar); the controls' size (an annotation count arriving). A fit
  // ends at the size it started from, so it doesn't feed back into itself.
  window.addEventListener("resize", fit);
  if (typeof ResizeObserver === "function") {
    const ro = new ResizeObserver(() => requestAnimationFrame(fit));
    ro.observe(header);
    const actions = header.querySelector(".tb-hdr-actions");
    if (actions) ro.observe(actions);
  }
  return fit;
};

const armHeader = (header: HTMLElement) => {
  const $ = <T extends HTMLElement = HTMLElement>(sel: string) => header.querySelector<T>(sel);
  const howTo = header.dataset.howTo ?? "/how-to-comment";
  const w = window as unknown as { tbPrefs?: Prefs; tbAnnotations?: Annotations };
  const contribute = $<HTMLButtonElement>("[data-tb-contribute]");
  const more = $<HTMLButtonElement>("[data-tb-more]");
  const each = (fn: () => void) => {
    try {
      fn();
    } catch {
      /* that control stays hidden; the rest of the header works */
    }
  };

  // A: Search opens Quartz's own search (Cmd/Ctrl-K is its own binding).
  each(() => {
    const search = $<HTMLButtonElement>("[data-tb-search]");
    const quartz = document.querySelector<HTMLButtonElement>(".search .search-button");
    if (!search || !quartz) return;
    search.addEventListener("click", () => quartz.click());
    search.hidden = false;
  });

  // A, D: Annotate, and Public comment in the Contribute menu.
  const openAnnotations = () => {
    track("annotation_badge_clicked");
    void w.tbAnnotations!.open().then((ok) => {
      if (!ok) status("Hypothes.is didn't load. A browser extension or the network may be blocking it.");
    });
  };
  each(() => {
    if (!w.tbAnnotations) return;
    const annotate = $<HTMLButtonElement>("[data-tb-annotate]");
    if (annotate) {
      annotate.addEventListener("click", () =>
        firstTime(annotate, howTo, "Continue: open annotations", openAnnotations),
      );
      if (!annotate.querySelector(".tb-anno-count")) annotate.append(el("span", { class: "tb-anno-count" }));
      annotate.hidden = false;
    }
    const comment = $<HTMLButtonElement>("[data-tb-comment]");
    if (comment) {
      comment.addEventListener("click", openAnnotations);
      comment.hidden = false;
    }
  });

  // D: Contribute.
  each(() => {
    const menu = $("#tb-contribute-menu");
    if (!contribute || !menu) return;
    disclosure(contribute, menu, true, (open) =>
      firstTime(contribute, howTo, "Continue to Contribute", open),
    );
    $("[data-tb-explain]")?.addEventListener("click", () => explain(contribute, howTo));
    const suggestBtn = $<HTMLButtonElement>("button.tb-suggest-btn");
    const endpoint = suggestBtn?.dataset.endpoint;
    const suggest =
      suggestBtn && endpoint && openSuggestModal
        ? () => openSuggestModal(endpoint, suggestBtn.dataset.path ?? "", contribute)
        : undefined;
    const edit = $<HTMLAnchorElement>("a.edit-on-github");
    const editEndpoint = edit?.dataset.editEndpoint;
    if (edit && editEndpoint) {
      armEditor(edit, editEndpoint, contribute, howTo, suggest);
      // Loaded with #edit. A reload of the editor's own entry (its state
      // survives) opens in place: the page's entry is under it. A link or a
      // typed #edit has none, so the entry becomes the page and the editor
      // pushes its own on top: Back always lands on the page.
      if (EDIT_HASH.test(location.hash)) {
        const hash = location.hash;
        const ours = (window.history.state as typeof EDITOR_STATE | null)?.tbEditor === true;
        if (!ours) window.history.replaceState(window.history.state, "", location.pathname + location.search);
        openFromHash?.(hash, !ours);
      }
    } else edit?.addEventListener("click", () => track("edit_on_github_clicked"));
    if (suggestBtn && suggest) {
      suggestBtn.addEventListener("click", suggest);
      suggestBtn.hidden = false;
    }
    contribute.hidden = false;
  });

  // C: Appearance.
  each(() => {
    const aa = $<HTMLButtonElement>("[data-tb-appearance]");
    const panel = $("#tb-appearance");
    if (!aa || !panel || !w.tbPrefs) return;
    appearance(panel, w.tbPrefs, w.tbAnnotations);
    disclosure(aa, panel, false);
    aa.hidden = false;
  });

  // F: ⋯
  each(() => {
    const menu = $("#tb-more-menu");
    if (!more || !menu) return;
    disclosure(more, menu, true);
    $("[data-tb-cite]")?.addEventListener("click", () => cite(header, more));
    $("[data-tb-print]")?.addEventListener("click", () => window.print());
    const history = $<HTMLAnchorElement>("a.tb-history-link");
    if (history?.dataset.revisionEndpoint) armHistory(history, history.dataset.revisionEndpoint, more);
    const backlinks = $<HTMLButtonElement>("[data-tb-backlinks]");
    const box = document.querySelector<HTMLElement>(".backlinks");
    if (backlinks) {
      if (!box || !box.querySelector("a.internal")) {
        backlinks.setAttribute("aria-disabled", "true");
        backlinks.append(el("span", { class: "tb-mi-s", text: "No other page links here" }));
      } else
        backlinks.addEventListener("click", () => {
          const h = box.querySelector<HTMLElement>("h3") ?? box;
          h.tabIndex = -1;
          box.scrollIntoView({ block: "start" });
          h.focus({ preventScroll: true });
        });
    }
    const download = $<HTMLButtonElement>("[data-tb-download]");
    download?.addEventListener("click", () => {
      fetch(download.dataset.tbDownload!)
        .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const a = el("a", { href: url, download: download.dataset.file ?? "page.md" });
          document.body.append(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        })
        .catch(() => status("That didn't download just now. View source has the same file."));
    });
    more.hidden = false;
  });

  // Last: the armed controls are all shown now, so the fit is measured on them.
  each(() => void fitHeader(header));
};

// Wires the header once per page. "nav" fires after each full load, and after
// each route swap on a site with SPA on.
const wire = () => {
  try {
    openSuggestModal?.closeIfOpen();
    closeEditorIfOpen();
    closeHistoryIfOpen();
    for (const header of Array.from(document.querySelectorAll<HTMLElement>(".tb-page-controls"))) {
      if (header.dataset.tbWired) continue;
      header.dataset.tbWired = "1";
      armHeader(header);
    }
  } catch {
    /* the header stays as rendered: its links still go to GitHub */
  }
};
document.addEventListener("nav", wire);
export {};
