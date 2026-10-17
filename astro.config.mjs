import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://andremarinho.me",
  output: "static",
  vite: { plugins: [tailwindcss()] },
});
