const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const { getLighthouseUrls } = require("./lighthouse-routes.cjs");

const manifest = {
  routes: {
    "/": { routeType: "page" },
    "/about": { routeType: "page", initialStatus: 200 },
    "/posts/new-post": { routeType: "page" },
    "/projects/new-project": { routeType: "page" },
    "/_global-error": { routeType: "page" },
    "/_not-found": { routeType: "page", initialStatus: 404 },
    "/redirect": { routeType: "page", initialStatus: 308 },
    "/sitemap.xml": { routeType: "route" },
    "/posts/new-post/index.md": { routeType: "route" },
  },
};

describe("Lighthouse route coverage", () => {
  it("includes every successful public page and future content pages", () => {
    assert.deepEqual(getLighthouseUrls(manifest, "https://preview.example"), [
      "https://preview.example/",
      "https://preview.example/about",
      "https://preview.example/posts/new-post",
      "https://preview.example/projects/new-project",
    ]);
  });

  it("partitions all pages into disjoint shards without losing coverage", () => {
    const all = getLighthouseUrls(manifest, "http://localhost:3100");
    const sharded = Array.from({ length: 4 }, (_, index) =>
      getLighthouseUrls(manifest, "http://localhost:3100", index, 4),
    ).flat();
    assert.deepEqual(sharded.sort(), all);
    assert.equal(new Set(sharded).size, all.length);
  });

  it("fails on empty coverage or invalid shards", () => {
    assert.throws(() =>
      getLighthouseUrls({ routes: {} }, "https://example.com"),
    );
    assert.throws(() =>
      getLighthouseUrls(manifest, "https://example.com", 4, 4),
    );
    assert.throws(() =>
      getLighthouseUrls(manifest, "https://example.com", 0, 0),
    );
  });
});
