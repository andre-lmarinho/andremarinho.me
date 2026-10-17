import type { ImageMetadata } from "astro";

const images = import.meta.glob<ImageMetadata>(
  "/src/assets/images/**/*.{avif,jpeg,jpg,png,webp}",
  { eager: true, import: "default" },
);

export function imageFor(src: string): ImageMetadata {
  const image = images[`/src/assets${src}`];
  if (!image) throw new Error(`Image not found: ${src}`);
  return image;
}
