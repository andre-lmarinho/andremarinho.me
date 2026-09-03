import { describe, expect, it } from "vitest";
import { isAutomatedBrowser } from "../VercelInsights";

describe("isAutomatedBrowser", () => {
  it("keeps normal browser sessions", () => {
    expect(
      isAutomatedBrowser({
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36",
        webdriver: false,
      }),
    ).toBe(false);
  });

  it("rejects sessions controlled through browser automation", () => {
    expect(
      isAutomatedBrowser({ userAgent: "regular browser", webdriver: true }),
    ).toBe(true);
  });

  it.each(["Chrome-Lighthouse", "HeadlessChrome/140.0.0.0"])(
    "rejects the %s user agent",
    (userAgent) => {
      expect(isAutomatedBrowser({ userAgent, webdriver: false })).toBe(true);
    },
  );
});
