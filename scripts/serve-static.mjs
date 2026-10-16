import { readFileSync } from "node:fs";
import { createServer, STATUS_CODES } from "node:http";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import compression from "compression";
import serveStatic from "serve-static";
import views from "../api/views.ts";

export function createStaticServer({ root = "dist" } = {}) {
  const directory = resolve(root);
  const notFound = readFileSync(join(directory, "404.html"));
  const compress = compression();
  const serve = serveStatic(directory);

  return createServer((request, response) => {
    const fail = (error) => {
      if (response.headersSent) {
        response.destroy(error);
        return;
      }
      response.statusCode = error.statusCode || 500;
      response.setHeader("Content-Type", "text/plain; charset=utf-8");
      response.end(
        STATUS_CODES[response.statusCode] || "Internal Server Error",
      );
    };

    compress(request, response, () => {
      const pathname = request.url?.split("?", 1)[0];
      if (pathname === "/api/views" || pathname === "/api/views/") {
        void views(request, response).catch(fail);
        return;
      }

      serve(request, response, (error) => {
        if (error) {
          fail(error);
          return;
        }
        response.statusCode = 404;
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.setHeader("Content-Length", notFound.length);
        response.end(request.method === "HEAD" ? undefined : notFound);
      });
    });
  });
}

if (
  process.argv[1] &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url
) {
  const port = Number(process.env.PORT || 3100);
  createStaticServer().listen(port, () => {
    console.log(`Static server ready on http://localhost:${port}`);
  });
}
