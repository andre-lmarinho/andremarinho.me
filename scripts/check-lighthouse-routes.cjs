const assert = require("node:assert/strict");
const { mkdtempSync, mkdirSync, writeFileSync, rmSync } = require("node:fs");
const { tmpdir } = require("node:os");
const path = require("node:path");
const { after, describe, it } = require("node:test");
const { getLighthouseUrls } = require("./lighthouse-routes.cjs");

const dist = mkdtempSync(path.join(tmpdir(), "lighthouse-routes-"));
for (const file of [
  "index.html",
  "about/index.html",
  "posts/new-post/index.html",
  "projects/new-project/index.html",
  "404.html",
  "sitemap.xml",
  "posts/new-post/index.md",
]) {
  const target = path.join(dist, file);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, "fixture");
}
after(() => rmSync(dist, { recursive: true, force: true }));

describe("Lighthouse route coverage", () => {
  it("includes every public HTML page and future content pages", () => {
    assert.deepEqual(getLighthouseUrls(dist, "https://preview.example"), [
      "https://preview.example/",
      "https://preview.example/about",
      "https://preview.example/posts/new-post",
      "https://preview.example/projects/new-project",
    ]);
  });

  it("partitions all pages into disjoint shards without losing coverage", () => {
    const all = getLighthouseUrls(dist, "http://localhost:3100");
    const sharded = Array.from({ length: 4 }, (_, index) =>
      getLighthouseUrls(dist, "http://localhost:3100", index, 4),
    ).flat();
    assert.deepEqual(sharded.sort(), all);
    assert.equal(new Set(sharded).size, all.length);
  });

  it("fails on empty coverage or invalid shards", () => {
    const empty = mkdtempSync(path.join(tmpdir(), "lighthouse-empty-"));
    try {
      assert.throws(() => getLighthouseUrls(empty, "https://example.com"));
      assert.throws(() => getLighthouseUrls(dist, "https://example.com", 4, 4));
      assert.throws(() => getLighthouseUrls(dist, "https://example.com", 0, 0));
    } finally {
      rmSync(empty, { recursive: true, force: true });
    }
  });
});
