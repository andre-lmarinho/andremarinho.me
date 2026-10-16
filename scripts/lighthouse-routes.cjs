const assert = require("node:assert/strict");
const { readdirSync } = require("node:fs");
const path = require("node:path");

function getLighthouseUrls(distDir, baseUrl, shardIndex = 0, shardCount = 1) {
  assert(Number.isInteger(shardCount) && shardCount > 0, "Invalid shard count");
  assert(
    Number.isInteger(shardIndex) && shardIndex >= 0 && shardIndex < shardCount,
    "Invalid shard index",
  );

  const routes = readdirSync(distDir, { recursive: true, withFileTypes: true })
    .filter((file) => file.isFile() && file.name.endsWith(".html"))
    .map((file) =>
      path.relative(distDir, path.join(file.parentPath, file.name)),
    )
    .filter((file) => file !== "404.html")
    .map((file) => `/${file.split(path.sep).join("/")}`)
    .map((file) => file.replace(/\/index\.html$/, "/").replace(/\.html$/, ""))
    .map((route) => (route === "/" ? route : route.replace(/\/$/, "")))
    .sort();

  assert(routes.length > 0, "No public pages found; run pnpm build first");
  const urls = routes
    .filter((_, index) => index % shardCount === shardIndex)
    .map((route) => new URL(route, baseUrl).href);
  assert(urls.length > 0, "No pages in this Lighthouse shard");
  return urls;
}

module.exports = { getLighthouseUrls };
