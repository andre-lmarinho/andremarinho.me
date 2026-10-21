// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { JSDOM } from "jsdom";
import { afterEach, expect, it, vi } from "vitest";
import Analytics from "../Analytics.astro";

const container = await AstroContainer.create();

afterEach(() => vi.unstubAllEnvs());

it.each([undefined, "development", "preview"])(
  "omits the tracker in %s",
  async (environment) => {
    vi.stubEnv("VERCEL_ENV", environment);
    const html = await container.renderToString(Analytics);
    expect(new JSDOM(html).window.document.querySelector("script")).toBeNull();
  },
);

it("renders only the native tracker in production with domain and performance settings", async () => {
  vi.stubEnv("VERCEL_ENV", "production");
  const html = await container.renderToString(Analytics);
  const scripts = new JSDOM(html).window.document.querySelectorAll("script");
  expect(scripts).toHaveLength(1);
  const script = scripts[0];
  expect(script?.src).toBe("https://cloud.umami.is/script.js");
  expect(script?.defer).toBe(true);
  expect(script?.dataset.domains).toBe("andremarinho.me");
  expect(script?.dataset.performance).toBe("true");
  expect(script?.hasAttribute("data-before-send")).toBe(false);
});
