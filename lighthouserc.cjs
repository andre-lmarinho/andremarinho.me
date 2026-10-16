const { readFileSync } = require("node:fs");
const { getLighthouseUrls } = require("./scripts/lighthouse-routes.cjs");

const baseUrl = process.env.LHCI_BASE_URL || "http://localhost:3100";
const remote = Boolean(process.env.LHCI_BASE_URL);
const manifest = JSON.parse(
  readFileSync(".next/prerender-manifest.json", "utf8"),
);

module.exports = {
  ci: {
    collect: {
      ...(!remote && {
        startServerCommand: "node_modules/.bin/next start -p 3100",
        startServerReadyPattern: "Ready in",
      }),
      url: getLighthouseUrls(
        manifest,
        baseUrl,
        Number(process.env.LHCI_SHARD_INDEX || 0),
        Number(process.env.LHCI_SHARD_COUNT || 1),
      ),
      numberOfRuns: 3,
      settings: {
        chromeFlags: "--no-sandbox",
        formFactor: "mobile",
        throttlingMethod: "simulate",
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          requestLatencyMs: 562.5,
          downloadThroughputKbps: 1474.56,
          uploadThroughputKbps: 675,
          cpuSlowdownMultiplier: 4,
        },
        screenEmulation: {
          mobile: true,
          width: 412,
          height: 823,
          deviceScaleFactor: 1.75,
          disabled: false,
        },
        disableStorageReset: false,
        saveAssets: true,
        // These endpoints exist only on Vercel; previews measure their real cost.
        ...(!remote && {
          blockedUrlPatterns: [
            "*/_vercel/insights/*",
            "*/_vercel/speed-insights/*",
          ],
        }),
      },
    },
    assert: {
      aggregationMethod: "pessimistic",
      assertions: {
        "categories:performance": ["error", { minScore: remote ? 0.97 : 0.99 }],
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:best-practices": ["error", { minScore: 1 }],
        "categories:seo": ["error", { minScore: 1 }],
      },
    },
  },
};
