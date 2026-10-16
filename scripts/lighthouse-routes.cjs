const assert = require("node:assert/strict");

function getLighthouseUrls(manifest, baseUrl, shardIndex = 0, shardCount = 1) {
  assert(Number.isInteger(shardCount) && shardCount > 0, "Invalid shard count");
  assert(
    Number.isInteger(shardIndex) && shardIndex >= 0 && shardIndex < shardCount,
    "Invalid shard index",
  );

  const routes = Object.entries(manifest.routes)
    .filter(
      ([path, route]) =>
        route.routeType === "page" &&
        !path.startsWith("/_") &&
        (route.initialStatus === undefined || route.initialStatus === 200),
    )
    .map(([path]) => path)
    .sort();

  assert(routes.length > 0, "No public pages found; run pnpm build first");
  const urls = routes
    .filter((_, index) => index % shardCount === shardIndex)
    .map((path) => new URL(path, baseUrl).href);
  assert(urls.length > 0, "No pages in this Lighthouse shard");
  return urls;
}

module.exports = { getLighthouseUrls };
