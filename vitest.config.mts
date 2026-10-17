import { resolve } from "node:path";
import { getViteConfig } from "astro/config";
import { defineConfig } from "vitest/config";

export default getViteConfig(
  defineConfig({
    test: {
      environment: "jsdom",
      globals: true,
      unstubGlobals: true,
    },
    resolve: {
      alias: { "@": resolve(import.meta.dirname, "./src") },
    },
  }),
);
