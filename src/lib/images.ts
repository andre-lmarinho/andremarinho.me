import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export const imageWidths = [
  32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840,
];
export const imageQuality = 75;
export const avifQuality = Math.max(Math.round(imageQuality * (50 / 80)), 1);
export const avifEffort = 3;
export const imageFormats = ["avif", "webp"] as const;

const fingerprints = new Map<string, string>();

export function imageFingerprint(source: string, content: Uint8Array): string {
  return createHash("sha256")
    .update(source)
    .update(content)
    .update(
      `rotate:resize-without-enlargement:avif:${avifQuality}:${avifEffort}:webp:${imageQuality}`,
    )
    .digest("hex")
    .slice(0, 12);
}

export function imageVariant(
  source: string,
  fingerprint: string,
  width: number,
  format: (typeof imageFormats)[number],
) {
  return `/_images/${path.parse(source).name}.${fingerprint}-${width}.${format}`;
}

export function responsiveImageProps(
  source: string,
  width: number,
): { src: string; srcset?: string; avifSrcset?: string } {
  if (!source.startsWith("/images/")) return { src: source };

  let fingerprint = fingerprints.get(source);
  if (!fingerprint) {
    const file = path.join(process.cwd(), "public", source);
    // Fixtures and remote content keep their original URL without generated variants.
    if (!existsSync(file)) return { src: source };
    fingerprint = imageFingerprint(source, readFileSync(file));
    fingerprints.set(source, fingerprint);
  }

  const widths =
    width >= 640 ? imageWidths.filter((w) => w >= 640) : imageWidths;
  const srcset = (format: (typeof imageFormats)[number]) =>
    widths
      .map((w) => `${imageVariant(source, fingerprint, w, format)} ${w}w`)
      .join(", ");

  return {
    src: imageVariant(source, fingerprint, widths[widths.length - 1], "webp"),
    srcset: srcset("webp"),
    avifSrcset: srcset("avif"),
  };
}
