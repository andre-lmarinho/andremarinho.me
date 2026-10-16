import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://andremarinho.me",
  output: "static",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    define: {
      "import.meta.env.PUBLIC_COMMIT_SHA": JSON.stringify(
        process.env.VERCEL_GIT_COMMIT_SHA ?? "",
      ),
    },
  },
});
