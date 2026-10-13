import { afterEach, describe, expect, it, vi } from "vitest";
import { sendWrite, timing, WAIT_MESSAGE } from "../src/components/scripts/write";

timing.pollMs = 5;

const API = "https://api.confused4now.org/api/suggest-edit";
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("sendWrite", () => {
  it("sends the write with a key; the same body twice has the same key", async () => {
    const urls: URL[] = [];
    vi.stubGlobal("fetch", async (u: URL) => (urls.push(new URL(u)), json(201, { issueUrl: "x" })));
    const res = await sendWrite(API, '{"a":1}');
    await sendWrite(API, '{"a":1}');
    await sendWrite(API, '{"a":2}');
    expect(res.status).toBe(201);
    const keys = urls.map((u) => u.searchParams.get("write_key"));
    expect(keys[0]).toMatch(/^[0-9a-f]{32}$/);
    expect(keys[1]).toBe(keys[0]);
    expect(keys[2]).not.toBe(keys[0]);
  });

  it("a failed write (1102: no answer it can read) is queued and its answer waited for", async () => {
    const calls: string[] = [];
    let polls = 0;
    vi.stubGlobal("fetch", async (u: URL, init?: RequestInit) => {
      const url = new URL(u);
      calls.push(
        `${init?.method ?? "GET"} ${url.pathname} ${url.searchParams.get("fallback") ?? ""}`,
      );
      if (url.pathname.endsWith("/write-status"))
        return ++polls < 2 ? json(202, { state: "fallback" }) : json(201, { issueUrl: "y" });
      if (url.searchParams.has("fallback")) return json(202, { state: "queued" });
      throw new TypeError("Failed to fetch");
    });
    const onWait = vi.fn();
    const res = await sendWrite(API, "{}", { onWait });
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ issueUrl: "y" });
    expect(onWait).toHaveBeenCalledTimes(1);
    expect(calls).toEqual([
      "POST /api/suggest-edit ",
      "POST /api/suggest-edit network",
      "GET /api/write-status ",
      "GET /api/write-status ",
    ]);
    expect(WAIT_MESSAGE).toBe("Saving… this can take up to a minute.");
  });

  it("a 5xx is queued with what was seen; a refusal is returned as it is", async () => {
    const seen: string[] = [];
    vi.stubGlobal("fetch", async (u: URL) => {
      const f = new URL(u).searchParams.get("fallback");
      seen.push(f ?? "");
      return f ? json(201, { issueUrl: "z" }) : json(503, {});
    });
    expect((await sendWrite(API, "{}")).status).toBe(201);
    expect(seen).toEqual(["", "503"]);
    vi.stubGlobal("fetch", async () => json(400, { userMessage: "no" }));
    expect((await sendWrite(API, "{}")).status).toBe(400);
  });
});
