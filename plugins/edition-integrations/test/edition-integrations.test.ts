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

/** The one inline script that boots the Hypothes.is client. */
const loader = (head: VNode[]): string => {
  const found = inlineScripts(head).filter((html) => html.includes("__editionIntegrations"));
  expect(found).toHaveLength(1);
  return found[0]!;
};

describe("EditionIntegrations head injection", () => {
  it("boots Hypothes.is exactly once per page load, from the loader alone", () => {
    const head = headOf();
    // A static tag alongside the loader's would be a second client, whose
    // connection the host frame refuses — leaving a present-but-dead sidebar.
    expect(srcs(head)).not.toContain("https://hypothes.is/embed.js");

    const runtime = loader(head);
    expect(runtime.match(/hypothes\.is\/embed\.js/g)).toHaveLength(1);
    expect(runtime).toContain("if (window.__editionIntegrations) return");
  });

  it("keeps no SPA-navigation machinery — editions run with enableSPA: false", () => {
    const runtime = loader(headOf());
    // Full page loads re-run this script from scratch, so there is nothing to
    // re-inject, persist across a route swap, or health-check.
    expect(runtime).not.toContain("addEventListener");
    expect(runtime).not.toContain("data-persist");
    expect(runtime).not.toContain("hypothesis-sidebar");
    expect(runtime).not.toContain("annotator+html");
  });

  it("ships no [edition-hyp] tracing", () => {
    for (const script of inlineScripts(headOf({ plausibleScriptSrc: "https://x/pa-t.js" }))) {
      expect(script).not.toContain("[edition-hyp]");
      expect(script).not.toContain("console.log");
    }
  });

  it("sets window.hypothesisConfig before loading the client", () => {
    // The loader runs during parse, so config must already be on window by then.
    const scripts = inlineScripts(headOf());
    const configAt = scripts.findIndex((html) => html.includes("window.hypothesisConfig"));
    const loaderAt = scripts.findIndex((html) => html.includes("__editionIntegrations"));
    expect(configAt).toBeGreaterThanOrEqual(0);
    expect(loaderAt).toBeGreaterThan(configAt);
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
    expect(inlineScripts(head).some((html) => html.includes("plausible"))).toBe(false);
  });

  it("records one pageview per full page load via the script's own autocapture", () => {
    const head = headOf({ plausibleScriptSrc: "https://plausible.io/js/pa-test.js" });
    const init = inlineScripts(head).find((html) => html.includes("plausible.init("));

    expect(srcs(head)).toContain("https://plausible.io/js/pa-test.js");
    // Stock init: autoCapturePageviews defaults to true, and pa-*.js fires a
    // pageview when it loads. With enableSPA: false that is exactly one per
    // navigation, so nothing fires pageviews by hand any more.
    expect(init).toContain("window.plausible.init()");
    expect(init).not.toContain("autoCapturePageviews");
    for (const script of inlineScripts(head)) {
      expect(script).not.toContain('plausible("pageview")');
    }
  });

  it("queues calls made before pa-*.js lands", () => {
    const head = headOf({ plausibleScriptSrc: "https://plausible.io/js/pa-test.js" });
    const init = inlineScripts(head).find((html) => html.includes("plausible.init("));
    expect(init).toContain("window.plausible.q = window.plausible.q || []");
  });
});
