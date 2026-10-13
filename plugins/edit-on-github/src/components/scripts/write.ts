/**
 * A write to the suggest-edit API (a note, a suggestion, a proposal), with its key and
 * its fallback (suggest-edit-function worker/writes.mjs).
 *
 * The key comes from this page load and the body, so the same thing sent twice is one
 * write: the API answers the repeat with the first one's answer. If the API can't
 * finish the write itself (its CPU limit, Cloudflare's 1102, which the page sees as a
 * network error, or any 5xx), the same request and key go again with &fallback=, a
 * GitHub Actions job does the write, and this asks /api/write-status until it is done.
 * `onWait` is called once that starts: say "Saving… this can take up to a minute".
 */
export const WAIT_MESSAGE = "Saving… this can take up to a minute.";
// How often to ask, for how long, and when to ask again about a first try the page
// only timed out on (it may still be going). The tests shorten them.
export const timing = { pollMs: 3000, waitMs: 3 * 60_000, runningMs: 35_000 };

const PAGE = Math.random().toString(36).slice(2) + Date.now().toString(36);

async function keyOf(endpoint: string, body: string): Promise<string> {
  const bytes = new TextEncoder().encode(`${PAGE}\n${endpoint}\n${body}`);
  const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
  return Array.from(hash.slice(0, 16), (b) => b.toString(16).padStart(2, "0")).join("");
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function sendWrite(
  endpoint: string,
  body: string,
  { signal, onWait }: { signal?: AbortSignal; onWait?: () => void } = {},
): Promise<Response> {
  const key = await keyOf(endpoint, body);
  const url = new URL(endpoint);
  url.searchParams.set("write_key", key);
  const post = (extra: Record<string, string> = {}, s?: AbortSignal) => {
    const u = new URL(url);
    for (const [k, v] of Object.entries(extra)) u.searchParams.set(k, v);
    return fetch(u, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      signal: s,
    });
  };

  let res: Response | null = null;
  let seen = "network";
  try {
    res = await post({}, signal);
  } catch {
    if (signal?.aborted) seen = "timeout";
  }
  if (res && res.status < 500 && res.status !== 202) return res;
  onWait?.();
  if (res && res.status >= 500) seen = String(res.status);
  if (!res || res.status >= 500) {
    const queued = await post({ fallback: seen }).catch(() => null);
    if (!queued) throw new Error("network");
    if (queued.status !== 202) return queued;
  }

  const status = new URL("write-status", url);
  status.searchParams.set("write_key", key);
  const start = Date.now();
  let askedAgain = false;
  while (Date.now() - start < timing.waitMs) {
    await sleep(timing.pollMs);
    const r = await fetch(status).catch(() => null);
    if (!r) continue;
    if (r.status !== 202) return r;
    const state = ((await r.json().catch(() => null)) as { state?: string } | null)?.state;
    if (state === "running" && !askedAgain && Date.now() - start > timing.runningMs) {
      askedAgain = true;
      await post({ fallback: "timeout" }).catch(() => null);
    }
  }
  return new Response(
    JSON.stringify({
      error: "timeout",
      userMessage:
        "This is taking longer than it should. Nothing you wrote is lost: try again in a few minutes.",
    }),
    { status: 504, headers: { "Content-Type": "application/json" } },
  );
}
