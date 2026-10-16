import assert from "node:assert/strict";
import { once } from "node:events";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { request } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, before, describe, it } from "node:test";
import { gunzipSync } from "node:zlib";
import { createStaticServer } from "./serve-static.mjs";

const root = mkdtempSync(join(tmpdir(), "static-server-"));
const home = `<!doctype html><title>Home</title>${"content ".repeat(500)}`;
const missing = "<!doctype html><title>Not found</title>Missing page";
mkdirSync(join(root, "about"));
writeFileSync(join(root, "index.html"), home);
writeFileSync(join(root, "about", "index.html"), "<title>About</title>");
writeFileSync(join(root, "404.html"), missing);
writeFileSync(join(root, "asset.txt"), "static asset");
const server = createStaticServer({ root });
let port;

before(async () => {
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  port = server.address().port;
});
after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  rmSync(root, { recursive: true, force: true });
});

function get(path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = request(
      { hostname: "127.0.0.1", port, path, ...options },
      (response) => {
        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("error", reject);
        response.on("end", () => {
          resolve({
            status: response.statusCode,
            headers: response.headers,
            body: Buffer.concat(chunks),
          });
        });
      },
    );
    req.on("error", reject);
    req.end();
  });
}

describe("Static production server", () => {
  it("serves the built HTML and assets", async () => {
    const page = await get("/");
    assert.equal(page.status, 200);
    assert.match(page.headers["content-type"], /text\/html/);
    assert.equal(page.body.toString(), home);
    assert.equal((await get("/asset.txt")).body.toString(), "static asset");
  });

  it("compresses HTML when the client accepts gzip", async () => {
    const page = await get("/", { headers: { "Accept-Encoding": "gzip" } });
    assert.equal(page.status, 200);
    assert.equal(page.headers["content-encoding"], "gzip");
    assert.match(page.headers.vary, /Accept-Encoding/);
    assert.equal(gunzipSync(page.body).toString(), home);
  });

  it("preserves the query string when redirecting directories", async () => {
    const redirect = await get("/about?source=ci&value=a%20b");
    assert.equal(redirect.status, 301);
    assert.equal(redirect.headers.location, "/about/?source=ci&value=a%20b");
    const page = await get(redirect.headers.location);
    assert.equal(page.status, 200);
    assert.equal(page.body.toString(), "<title>About</title>");
  });

  it("returns the built 404 HTML with a real 404 status", async () => {
    const page = await get("/not-a-page");
    assert.equal(page.status, 404);
    assert.match(page.headers["content-type"], /text\/html/);
    assert.equal(page.body.toString(), missing);
    const head = await get("/not-a-page", { method: "HEAD" });
    assert.equal(head.status, 404);
    assert.equal(
      Number(head.headers["content-length"]),
      Buffer.byteLength(missing),
    );
    assert.equal(head.body.length, 0);
  });

  it("delegates both views URLs to the API handler", async () => {
    for (const path of ["/api/views", "/api/views/"]) {
      const response = await get(`${path}?slug=not-a-real-post`);
      assert.equal(response.status, 400);
      assert.match(response.headers["content-type"], /application\/json/);
      assert.equal(JSON.parse(response.body).value, null);
    }
    const unsupported = await get("/api/views", { method: "DELETE" });
    assert.equal(unsupported.status, 405);
    assert.equal(JSON.parse(unsupported.body).value, null);
  });

  it("does not route other API paths to the views handler", async () => {
    for (const path of [
      "/api/unknown",
      "/api/views/extra",
      "/api/views-extra",
    ]) {
      const response = await get(path);
      assert.equal(response.status, 404);
      assert.equal(response.body.toString(), missing);
    }
  });
});
