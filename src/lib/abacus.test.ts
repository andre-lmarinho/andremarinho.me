import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ABACUS_TIMEOUT_MS,
  formatAbacusCount,
  getAbacusCount,
  postCounter,
} from "./abacus";

const response = (
  value: number | string,
  { ok = true, status = 200 }: { ok?: boolean; status?: number } = {},
) => ({
  ok,
  status,
  json: vi.fn().mockResolvedValue({ value }),
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("Abacus", () => {
  it("uses the historical site counter with the Nyx timeout", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const signal = new AbortController().signal;
    const timeout = vi.spyOn(AbortSignal, "timeout").mockReturnValue(signal);
    const fetch = vi.fn().mockResolvedValue(response("906"));
    vi.stubGlobal("fetch", fetch);

    await expect(
      getAbacusCount("portfolio", { increment: true, dedupeKey: "/posts" }),
    ).resolves.toBe(906);

    expect(ABACUS_TIMEOUT_MS).toBe(600);
    expect(timeout).toHaveBeenCalledWith(ABACUS_TIMEOUT_MS);
    expect(fetch).toHaveBeenCalledWith(
      "https://abacus.jasoncameron.dev/hit/andremarinho/portfolio",
      {
        cache: "no-store",
        keepalive: true,
        signal,
      },
    );
  });

  it("only reads counters outside production", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.spyOn(AbortSignal, "timeout").mockReturnValue(
      new AbortController().signal,
    );
    const fetch = vi.fn().mockResolvedValue(response(12));
    vi.stubGlobal("fetch", fetch);

    await getAbacusCount("post-first", { increment: true });

    expect(fetch).toHaveBeenCalledWith(
      "https://abacus.jasoncameron.dev/get/andremarinho/post-first",
      expect.objectContaining({ keepalive: false }),
    );
  });

  it("treats a missing post counter as zero", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.spyOn(AbortSignal, "timeout").mockReturnValue(
      new AbortController().signal,
    );
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(response(0, { ok: false, status: 404 })),
    );

    await expect(getAbacusCount("post-new")).resolves.toBe(0);
  });

  it("deduplicates matching in-flight requests", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.spyOn(AbortSignal, "timeout").mockReturnValue(
      new AbortController().signal,
    );
    let resolveResponse: (value: ReturnType<typeof response>) => void =
      () => {};
    const pending = new Promise<ReturnType<typeof response>>((resolve) => {
      resolveResponse = resolve;
    });
    const fetch = vi.fn().mockReturnValue(pending);
    vi.stubGlobal("fetch", fetch);

    const first = getAbacusCount("portfolio", {
      increment: true,
      dedupeKey: "/",
    });
    const second = getAbacusCount("portfolio", {
      increment: true,
      dedupeKey: "/",
    });

    expect(first).toBe(second);
    expect(fetch).toHaveBeenCalledTimes(1);

    resolveResponse(response(13));
    await expect(first).resolves.toBe(13);
  });

  it("formats counters and creates stable post keys", () => {
    expect(formatAbacusCount(1234)).toBe("1,234");
    expect(formatAbacusCount(null)).toBe("…");
    expect(formatAbacusCount("∞")).toBe("∞");
    expect(postCounter("first-post")).toBe("post-first-post");
  });
});
