/**
 * A deliberately tiny DOM stub, just large enough to *execute* the SPA runtime in
 * the existing "node" vitest environment (no jsdom dependency).
 *
 * This exists because the Hypothes.is sidebar bug was a pure logic error in the
 * runtime's health check — the kind of thing string assertions against the emitted
 * source cannot catch. It supports only the handful of DOM features the runtime
 * actually uses, and only the selector forms it actually writes:
 *
 *   tag, tag[attr], tag[attr="value"], tag[attr*="value"], and comma-separated lists
 */

interface StubAttrs {
  [key: string]: string;
}

export class StubElement {
  tagName: string;
  attrs: StubAttrs = {};
  parent: StubElement[] | null = null;
  listeners: Record<string, Array<() => void>> = {};

  constructor(tagName: string) {
    this.tagName = tagName.toLowerCase();
  }

  setAttribute(name: string, value: string): void {
    this.attrs[name] = value;
  }

  getAttribute(name: string): string | null {
    return this.attrs[name] ?? null;
  }

  hasAttribute(name: string): boolean {
    return name in this.attrs;
  }

  addEventListener(type: string, fn: () => void): void {
    (this.listeners[type] ??= []).push(fn);
  }

  /** Test-side helper: simulate the browser firing load/error on a script tag. */
  fire(type: string): void {
    for (const fn of this.listeners[type] ?? []) fn();
  }

  remove(): void {
    if (!this.parent) return;
    const i = this.parent.indexOf(this);
    if (i >= 0) this.parent.splice(i, 1);
    this.parent = null;
  }

  matches(selector: string): boolean {
    return parseSelector(selector).some((s) => matchOne(this, s));
  }

  // `async`/`src` are set as properties by the runtime, not via setAttribute, so
  // mirror them into attrs to keep selector matching honest.
  set src(value: string) {
    this.attrs.src = value;
  }
  get src(): string {
    return this.attrs.src ?? "";
  }
  set async(value: boolean) {
    this.attrs.async = String(value);
  }
}

interface ParsedSelector {
  tag: string | null;
  attr: string | null;
  op: "=" | "*=" | "has" | null;
  value: string | null;
}

const parseSelector = (selector: string): ParsedSelector[] =>
  selector.split(",").map((raw) => {
    const part = raw.trim();
    const m = /^([a-zA-Z0-9-]*)(?:\[([a-zA-Z0-9-]+)(?:(\*?=)"([^"]*)")?\])?$/.exec(part);
    if (!m) throw new Error(`dom-stub: unsupported selector "${part}"`);
    const [, tag, attr, op, value] = m;
    return {
      tag: tag ? tag.toLowerCase() : null,
      attr: attr ?? null,
      op: attr ? ((op as "=" | "*=" | undefined) ?? "has") : null,
      value: value ?? null,
    };
  });

const matchOne = (el: StubElement, s: ParsedSelector): boolean => {
  if (s.tag && el.tagName !== s.tag) return false;
  if (!s.attr) return true;
  if (!el.hasAttribute(s.attr)) return false;
  const actual = el.getAttribute(s.attr) ?? "";
  if (s.op === "has") return true;
  if (s.op === "=") return actual === s.value;
  return actual.includes(s.value!);
};

export class StubDocument {
  head: StubElement[] = [];
  body: StubElement[] = [];
  listeners: Record<string, Array<() => void>> = {};
  readyState = "loading";

  private all(): StubElement[] {
    return [...this.head, ...this.body];
  }

  private query(pool: StubElement[], selector: string): StubElement[] {
    const parsed = parseSelector(selector);
    return pool.filter((el) => parsed.some((s) => matchOne(el, s)));
  }

  querySelector(selector: string): StubElement | null {
    return this.query(this.all(), selector)[0] ?? null;
  }

  querySelectorAll(selector: string): StubElement[] {
    return this.query(this.all(), selector);
  }

  createElement(tag: string): StubElement {
    return new StubElement(tag);
  }

  addEventListener(type: string, fn: () => void): void {
    (this.listeners[type] ??= []).push(fn);
  }

  dispatch(type: string): void {
    for (const fn of this.listeners[type] ?? []) fn();
  }

  /** Mirrors document.head as a live-ish object exposing querySelectorAll + append. */
  get headEl() {
    return {
      querySelectorAll: (selector: string) => this.query(this.head, selector),
      appendChild: (el: StubElement) => this.appendToHead(el),
    };
  }

  appendToHead(el: StubElement): StubElement {
    el.parent = this.head;
    this.head.push(el);
    return el;
  }

  appendToBody(el: StubElement): StubElement {
    el.parent = this.body;
    this.body.push(el);
    return el;
  }
}

export interface RuntimeHarness {
  doc: StubDocument;
  win: Record<string, unknown>;
  logs: string[];
  /** Simulate Quartz's router: dispatch prenav, wipe head of :not([data-persist]), dispatch nav. */
  navigate: (pathname: string) => void;
  headTags: () => string[];
}

/**
 * Executes the emitted runtime source against the stub, returning a harness that
 * can drive Quartz's navigation sequence against it.
 */
export const runRuntime = (source: string, pathname = "/intro"): RuntimeHarness => {
  const doc = new StubDocument();
  const logs: string[] = [];
  const win: Record<string, unknown> = {
    location: { pathname },
  };

  const documentProxy = new Proxy(doc, {
    get(target, prop) {
      if (prop === "head") return target.headEl;
      const value = Reflect.get(target, prop);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });

  const console = {
    log: (...args: unknown[]) => logs.push(args.map((a) => String(a)).join(" ")),
  };

  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  new Function("window", "document", "console", source)(win, documentProxy, console);

  const navigate = (to: string) => {
    (win.location as { pathname: string }).pathname = to;
    doc.dispatch("prenav");
    // The head wipe: quartz/components/scripts/spa.inline.ts line 124.
    doc.head = doc.head.filter((el) => el.hasAttribute("data-persist"));
    doc.dispatch("nav");
  };

  return {
    doc,
    win,
    logs,
    navigate,
    headTags: () =>
      doc.head.map((el) => `${el.tagName}${el.hasAttribute("data-persist") ? "[persist]" : ""}`),
  };
};

/** The boot marker + sidebar that a real Hypothes.is boot would create. */
export const simulateHypothesisBoot = (h: RuntimeHarness): void => {
  const marker = h.doc.createElement("link");
  marker.setAttribute("type", "application/annotator+html");
  marker.setAttribute("rel", "hypothesis-client");
  marker.setAttribute("href", "https://hypothes.is/embed.js");
  h.doc.appendToHead(marker);

  h.doc.appendToBody(h.doc.createElement("hypothesis-sidebar"));

  // Fire load on our injected tag so the runtime's post-boot tagging runs.
  const injected = h.doc.querySelectorAll("script[data-edition-hypothesis]");
  for (const s of injected) s.fire("load");
};

export const embedScriptCount = (h: RuntimeHarness): number =>
  h.doc.querySelectorAll("script[data-edition-hypothesis]").length;
