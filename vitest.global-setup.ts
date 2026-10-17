import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

// Vite's SSR pipeline resolves the bare "astro" specifier oddly here; load it natively.
const { dev } = createRequire(import.meta.url)(
  "astro",
) as typeof import("astro");

// The content data store is only written by the dev server, and getCollection
// reads it at test time. Start it once, wait for the store, then shut it down.
export default async function setup() {
  const store = join(process.cwd(), ".astro/data-store.json");
  const server = await dev({
    root: process.cwd(),
    logLevel: "silent",
    server: { port: 0 },
  });
  const deadline = Date.now() + 30_000;
  while (!existsSync(store) && Date.now() < deadline) {
    await new Promise((done) => setTimeout(done, 100));
  }
  await server.stop();
}
