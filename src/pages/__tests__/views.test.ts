import type { APIContext } from "astro";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { viewCounts } from "@/__tests__/views.mock";
import { POST } from "../api/views/[slug]";
import { GET } from "../api/views/index";

const { hgetall, hincrby, getPost, configuration } = vi.hoisted(() => ({
  hgetall: vi.fn(),
  hincrby: vi.fn(),
  getPost: vi.fn(),
  configuration: vi.fn(),
}));

vi.mock("@upstash/redis", () => ({
  Redis: class {
    constructor(config: unknown) {
      configuration(config);
    }
    hgetall = hgetall;
    hincrby = hincrby;
  },
}));
vi.mock("@/lib/posts", () => ({ getPost }));

const context = (
  hostname = "andremarinho.me",
  origin = "https://andremarinho.me",
) =>
  ({
    url: new URL(`https://${hostname}/api/views/first`),
    params: { slug: "first" },
    request: new Request(`https://${hostname}/api/views/first`, {
      method: "POST",
      headers: { Origin: origin },
    }),
  }) as unknown as APIContext;

beforeEach(() => {
  vi.stubEnv("VERCEL_ENV", "production");
  vi.stubEnv("KV_REST_API_URL", "https://redis.example");
  vi.stubEnv("KV_REST_API_TOKEN", "test-write-token");
  vi.stubEnv("KV_REST_API_READ_ONLY_TOKEN", "test-read-token");
  getPost.mockResolvedValue({ slug: "first" });
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  vi.clearAllMocks();
});

describe("post views API", () => {
  it("reads all counters with one Redis operation using the read-only token", async () => {
    hgetall.mockResolvedValue(viewCounts);
    const response = await GET(context());
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ views: viewCounts });
    expect(hgetall).toHaveBeenCalledExactlyOnceWith("views");
    expect(configuration).toHaveBeenCalledWith(
      expect.objectContaining({ token: "test-read-token" }),
    );
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });

  it("increments atomically on every request and returns the updated count", async () => {
    hincrby.mockResolvedValueOnce(13).mockResolvedValueOnce(14);
    expect(await (await POST(context())).json()).toEqual({
      views: { first: 13 },
    });
    expect(await (await POST(context())).json()).toEqual({
      views: { first: 14 },
    });
    expect(hincrby).toHaveBeenCalledTimes(2);
    expect(hincrby).toHaveBeenCalledWith("views", "first", 1);
    expect(configuration).toHaveBeenCalledWith(
      expect.objectContaining({ token: "test-write-token", retry: false }),
    );
  });

  it.each([undefined, "development", "preview"])(
    "allows reads but blocks increments in %s",
    async (environment) => {
      vi.stubEnv("VERCEL_ENV", environment);
      hgetall.mockResolvedValue({ first: 12 });
      expect((await GET(context())).status).toBe(200);
      const response = await POST(context());
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({ views: { first: 12 } });
      expect(hgetall).toHaveBeenCalledTimes(2);
      expect(configuration).toHaveBeenCalledWith(
        expect.objectContaining({ token: "test-read-token" }),
      );
      expect(hincrby).not.toHaveBeenCalled();
    },
  );

  it.each(["localhost", "preview.vercel.app"])(
    "allows reads but blocks increments on %s, even from a production build",
    async (hostname) => {
      hgetall.mockResolvedValue({ first: 12 });
      expect((await GET(context(hostname))).status).toBe(200);
      const response = await POST(context(hostname));
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({ views: { first: 12 } });
      expect(hgetall).toHaveBeenCalledTimes(2);
      expect(hincrby).not.toHaveBeenCalled();
    },
  );

  it("rejects unknown posts and cross-origin writes without touching Redis", async () => {
    expect(
      (await POST(context("andremarinho.me", "https://other.example"))).status,
    ).toBe(403);
    getPost.mockResolvedValue(null);
    expect((await POST(context())).status).toBe(404);
    expect(configuration).not.toHaveBeenCalled();
  });

  it("returns 503 without a fabricated count or automatic increment retry", async () => {
    hincrby.mockRejectedValue(new Error("connection lost"));
    const response = await POST(context());
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: "Views unavailable" });
    expect(hincrby).toHaveBeenCalledTimes(1);
  });

  it("returns JSON without writing when a preview post has no counter yet", async () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    hgetall.mockResolvedValue({});
    const response = await POST(context());
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ views: { first: 0 } });
    expect(hincrby).not.toHaveBeenCalled();
  });

  it("rejects unknown preview posts before reading Redis", async () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    getPost.mockResolvedValue(null);
    expect((await POST(context())).status).toBe(404);
    expect(configuration).not.toHaveBeenCalled();
  });

  it("returns a service error if a read-only POST cannot load the current count", async () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    hgetall.mockRejectedValueOnce(new Error("offline"));
    const response = await POST(context());
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: "Views unavailable" });
    expect(hincrby).not.toHaveBeenCalled();
  });
});
