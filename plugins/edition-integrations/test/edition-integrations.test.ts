import { describe, expect, it } from "vitest";
import type { VNode } from "preact";
import { EditionIntegrations } from "../src/index";
import { createCtx } from "./helpers";
import { embedScriptCount, runRuntime, simulateHypothesisBoot } from "./dom-stub";

type ScriptProps = {
  src?: string;
  dangerouslySetInnerHTML?: { __html: string };
};

const headOf = (userOpts: Parameters<typeof EditionIntegrations>[0] = {}): VNode[] => {
  const plugin = EditionIntegrations(userOpts);
  const resources = plugin.externalResources?.(createCtx());
  return (resources?.additionalHead ?? []) as VNode[];
};

const inlineScripts = (head: VNode[]): string[] =>
  head
    .filter((node) => node.type === "script")
    .map((node) => (node.props as ScriptProps).dangerouslySetInnerHTML?.__html)
    .filter((html): html is string => typeof html === "string");

const srcs = (head: VNode[]): string[] =>
  head
    .map((node) => (node.props as ScriptProps).src)
    .filter((src): src is string => typeof src === "string");

/** The one inline script carrying the SPA runtime. */
const spaRuntime = (head: VNode[]): string => {
  const found = inlineScripts(head).filter((html) => html.includes("__editionIntegrations"));
  expect(found).toHaveLength(1);
  return found[0]!;
};

describe("EditionIntegrations head injection", () => {
  it("does not emit a static embed.js tag — the SPA runtime owns injection", () => {
    // A static head tag loads once and is never revived by Quartz's router,
    // which is the bug this plugin works around.
    expect(srcs(headOf())).not.toContain("https://hypothes.is/embed.js");
    expect(spaRuntime(headOf())).toContain("https://hypothes.is/embed.js");
  });

  it("re-injects Hypothes.is on Quartz's nav event", () => {
    const runtime = spaRuntime(headOf());
    expect(runtime).toContain('document.addEventListener("nav"');
    expect(runtime).toContain("ensureHypothesis()");
  });

  it("treats a live sidebar as authoritative, never requiring the head marker too", () => {
    const runtime = spaRuntime(headOf());
    // Requiring BOTH is the bug: Quartz's head wipe takes the marker while the
    // sidebar survives in <body>, so a healthy client reads as half-dead.
    expect(runtime).toContain("if (hasSidebar) {");
    expect(runtime).not.toContain("hasBootMarker && hasSidebar");
    // ...and only sweeps when the sidebar is genuinely gone.
    expect(runtime).toContain("stale[i].remove()");
  });

  it("tags the client's head state with data-persist on prenav", () => {
    const runtime = spaRuntime(headOf());
    expect(runtime).toContain('document.addEventListener("prenav"');
    expect(runtime).toContain('setAttribute("data-persist", "")');
  });

  it("registers its nav listener exactly once", () => {
    const runtime = spaRuntime(headOf());
    expect(runtime).toContain("if (window.__editionIntegrations) return");
    expect(runtime.match(/addEventListener\("nav"/g)).toHaveLength(1);
  });

  it("preserves the first-party Hypothes.is flow", () => {
    const config = inlineScripts(headOf()).find((html) => html.includes("hypothesisConfig"));
    expect(config).toContain("openSidebar: false");
    expect(config).toContain("showHighlights: 'always'");
    // Publisher-tier seam stays commented out.
    expect(config).toContain("// services: [{");
  });
});

describe("Hypothes.is group locking", () => {
  const groupsLine = (hypothesisGroupId: string): string => {
    const config = inlineScripts(headOf({ hypothesisGroupId })).find((html) =>
      html.includes("hypothesisConfig"),
    );
    return config!.match(/groups: \["(.*)"\]/)![1]!;
  };

  it("locks to a real group id", () => {
    expect(groupsLine("  abc123  ")).toBe("abc123");
  });

  it("falls through quietly on an empty or placeholder group", () => {
    expect(groupsLine("")).toBe("GROUP_ID");
    expect(groupsLine("   ")).toBe("GROUP_ID");
    expect(groupsLine("__GROUP_ID__")).toBe("GROUP_ID");
  });
});

describe("Plausible", () => {
  it("is omitted entirely when unconfigured", () => {
    const head = headOf();
    expect(srcs(head).some((src) => src.includes("plausible"))).toBe(false);
    // The SPA runtime still ships, and no-ops on the pageview half.
    expect(spaRuntime(head)).toContain('if (typeof window.plausible !== "function") return');
  });

  it("disables autocapture and fires one deduped pageview per navigation", () => {
    const head = headOf({ plausibleScriptSrc: "https://plausible.io/js/pa-test.js" });
    const init = inlineScripts(head).find((html) => html.includes("plausible.init("));

    expect(srcs(head)).toContain("https://plausible.io/js/pa-test.js");
    expect(init).toContain("autoCapturePageviews: false");
    // The pageview fires from the nav handler, not from the init snippet.
    expect(init).not.toContain("addEventListener");

    const runtime = spaRuntime(head);
    expect(runtime).toContain("if (window.location.pathname === lastPath) return");
    expect(runtime.match(/window\.plausible\("pageview"\)/g)).toHaveLength(1);
  });
});

/**
 * These execute the emitted runtime against a stub DOM and drive Quartz's real
 * navigation sequence (prenav -> head wipe of :not([data-persist]) -> nav).
 * They reproduce the live failure directly: on the deployed edition the client
 * survived navigation intact, but the head wipe took its boot marker, so the old
 * both-must-be-present health check re-injected embed.js and the second client's
 * connection was refused ("Ignoring second request from Hypothesis sidebar to
 * connect to host frame"), leaving a present-but-dead sidebar.
 */
describe("EditionIntegrations SPA runtime behaviour", () => {
  const boot = () => {
    const h = runRuntime(spaRuntime(headOf()));
    h.doc.dispatch("nav"); // Quartz's initial-load nav
    simulateHypothesisBoot(h);
    return h;
  };

  it("injects embed.js exactly once on initial load", () => {
    const h = boot();
    expect(embedScriptCount(h)).toBe(1);
    expect(h.doc.querySelector("hypothesis-sidebar")).not.toBeNull();
  });

  it("never re-injects embed.js across navigations", () => {
    const h = boot();
    h.navigate("/chapter-1");
    h.navigate("/chapter-2");
    h.navigate("/chapter-3");

    expect(embedScriptCount(h)).toBe(1);
    expect(h.logs.filter((l) => l.includes("embed.js script appended"))).toHaveLength(1);
    expect(h.logs.filter((l) => l.includes("decision: SWEEP+INJECT"))).toHaveLength(1);
  });

  it("survives the head wipe via data-persist, without needing the fallback", () => {
    const h = boot();
    h.navigate("/chapter-1");

    expect(h.doc.querySelector('link[type="application/annotator+html"]')).not.toBeNull();
    expect(h.logs.some((l) => l.includes("PERSIST tagged"))).toBe(true);
    // Pins the PRIMARY fix specifically: the marker was carried through the wipe
    // by [data-persist], not put back afterwards by the fallback. Without this
    // assertion the test passes even with all data-persist tagging removed,
    // because restoreBootMarker() quietly covers for it.
    expect(h.logs.some((l) => l.includes("boot marker restored"))).toBe(false);
    // And it is the same element throughout — never re-created.
    expect(
      h.doc.querySelector('link[type="application/annotator+html"]')!.getAttribute("rel"),
    ).toBe("hypothesis-client");
  });

  it("bails, not re-injects, when the marker is lost but the sidebar is alive", () => {
    // The exact live failure mode: force the marker out despite a healthy client.
    const h = boot();
    h.doc.querySelector('link[type="application/annotator+html"]')!.remove();
    h.doc.dispatch("nav");

    expect(embedScriptCount(h)).toBe(1);
    expect(h.logs.some((l) => l.includes("decision: BAIL"))).toBe(true);
    // ...and the client's single-instance guard is put back without a re-load.
    expect(h.doc.querySelector('link[type="application/annotator+html"]')).not.toBeNull();
    expect(h.logs.some((l) => l.includes("boot marker restored"))).toBe(true);
  });

  it("does re-inject when the sidebar is genuinely gone", () => {
    const h = boot();
    h.doc.querySelector("hypothesis-sidebar")!.remove();
    h.doc.dispatch("nav");

    expect(embedScriptCount(h)).toBe(1); // old tag swept, fresh one appended
    expect(h.logs.filter((l) => l.includes("decision: SWEEP+INJECT"))).toHaveLength(2);
  });
});
