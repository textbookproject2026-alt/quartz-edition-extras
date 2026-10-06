import { describe, expect, it } from "vitest";
import Graph from "../src/components/Graph";

describe("Graph Component", () => {
  it("should create a Graph component with default options", () => {
    const component = Graph({});

    expect(component).toBeDefined();
    expect(typeof component).toBe("function");
  });

  it("should create a Graph component with custom options", () => {
    const component = Graph({
      localGraph: {
        depth: 2,
        drag: false,
        zoom: true,
      },
      globalGraph: {
        depth: -1,
        focusOnHover: true,
      },
    });

    expect(component).toBeDefined();
    expect(typeof component).toBe("function");
  });

  it("should export component with css property", () => {
    const component = Graph({});

    expect(component.css).toBeDefined();
    expect(typeof component.css).toBe("string");
  });

  it("should export component with afterDOMLoaded script", () => {
    const component = Graph({});

    expect(component.afterDOMLoaded).toBeDefined();
    expect(typeof component.afterDOMLoaded).toBe("string");
  });
});

describe("the graph in a narrowed window", () => {
  it("can shrink below its canvas, which its frame clips", async () => {
    const { readFileSync } = await import("node:fs");
    const scss = readFileSync(new URL("../src/components/styles/graph.scss", import.meta.url), "utf8");
    expect(scss).toMatch(/\.graph \{[^}]*?min-width: 0;/);
    expect(scss).toMatch(/& > \.graph-outer \{[^}]*overflow: hidden;/);
  });
});
