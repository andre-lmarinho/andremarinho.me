import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, sharpImageService } from "astro/config";

export default defineConfig({
  site: "https://andremarinho.me",
  output: "static",
  adapter: vercel(),
  image: {
    service: sharpImageService({
      avif: { quality: 47, effort: 3 },
      webp: { quality: 75 },
    }),
  },
  vite: { plugins: [tailwindcss()] },
});
