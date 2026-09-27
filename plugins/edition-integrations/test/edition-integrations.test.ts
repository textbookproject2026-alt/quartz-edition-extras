import { afterEach, describe, expect, it } from "vitest";
import { Window } from "happy-dom";
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
    // Collapsed, unless a phone reader asked for the client (then it opens).
    expect(config).toContain("openSidebar: !!window.__tbHypothesisOpenOnLoad");
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

  it("puts design.yaml's fonts and stylesheet first in the head", () => {
    const head = headOf();
    expect(head[0]?.type).toBe("link");
    expect((head[0]?.props as { href?: string }).href).toMatch(
      /^https:\/\/fonts\.googleapis\.com\//,
    );
    expect(head[1]?.type).toBe("style");
    const css = (head[1]?.props as ScriptProps).dangerouslySetInnerHTML?.__html ?? "";
    expect(css).toContain("--secondary: #7C6CF0;");
    expect(css).toContain("@media print");
  });
});

describe("Hypothes.is on phones: loaded only when the reader asks", () => {
  type Win = Window & { eval: (code: string) => unknown; [k: string]: unknown };
  const wins: Win[] = [];
  afterEach(async () => {
    while (wins.length) await wins.pop()!.happyDOM.close();
  });
  /** Runs the head's config and loader in a page whose width matches `narrow`. */
  const boot = (narrow: boolean): Win => {
    const w = new Window({
      url: "https://book.example.org/x",
      settings: { disableJavaScriptFileLoading: true, disableIframePageLoading: true },
    }) as unknown as Win;
    wins.push(w);
    w.document.write("<html><head></head><body></body></html>");
    const queries: string[] = [];
    w.matchMedia = ((q: string) => {
      queries.push(q);
      return { matches: narrow, media: q };
    }) as unknown as typeof w.matchMedia;
    w.__queries = queries;
    const scripts = inlineScripts(headOf());
    w.eval(scripts.find((html) => html.includes("window.hypothesisConfig"))!);
    w.eval(loader(headOf()));
    return w;
  };
  const clients = (w: Win) => w.document.querySelectorAll("script[data-edition-hypothesis]").length;
  const config = (w: Win) => (w.hypothesisConfig as () => { openSidebar: boolean })();

  it("asks at Quartz's phone breakpoint, from design.yaml", () => {
    expect(boot(true).__queries).toEqual(["(max-width: 800px)"]);
  });

  it("on a wide screen loads the client at once, collapsed, as before", () => {
    const w = boot(false);
    expect(clients(w)).toBe(1);
    expect(config(w).openSidebar).toBe(false);
    expect(w.document.documentElement.classList.contains("tb-hypothesis-on")).toBe(true);
  });

  it("on a phone loads nothing until asked, then loads once and opens", () => {
    const w = boot(true);
    expect(clients(w)).toBe(0);
    expect(w.document.documentElement.classList.contains("tb-hypothesis-on")).toBe(false);
    const load = w.__tbLoadHypothesis as () => boolean;
    expect(load()).toBe(true);
    expect(clients(w)).toBe(1);
    expect(config(w).openSidebar).toBe(true);
    expect(w.document.documentElement.classList.contains("tb-hypothesis-on")).toBe(true);
    expect(load()).toBe(false); // never a second client
    expect(clients(w)).toBe(1);
  });
});
