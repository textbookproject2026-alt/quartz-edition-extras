import { describe, expect, it } from "vitest";
import type { VNode } from "preact";
import { EditionIntegrations } from "../src/index";
import { createCtx } from "./helpers";

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

  it("guards against a second client: bails when marker and sidebar are both live", () => {
    const runtime = spaRuntime(headOf());
    expect(runtime).toContain("var hasBootMarker = !!document.querySelector(BOOT_MARKER)");
    expect(runtime).toContain("var hasSidebar = !!document.querySelector(SIDEBAR)");
    expect(runtime).toContain("if (hasBootMarker && hasSidebar) {");
    // ...and sweeps half-dead leftovers before booting a replacement.
    expect(runtime).toContain("stale[i].remove()");
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
