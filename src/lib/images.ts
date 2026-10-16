import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export const imageWidths = [80, 128, 160, 216, 256, 432, 640, 960, 1440, 1600];
export const imageQuality = 75;

const fingerprints = new Map<string, string>();

export function imageFingerprint(source: string, content: Uint8Array): string {
  return createHash("sha256")
    .update(source)
    .update(content)
    .update(`webp:${imageQuality}`)
    .digest("hex")
    .slice(0, 12);
}

export function imageVariant(
  source: string,
  fingerprint: string,
  width: number,
) {
  return `/_images/${path.parse(source).name}.${fingerprint}-${width}.webp`;
}

export function responsiveImageProps(source: string, width: number) {
  if (!source.startsWith("/images/")) return { src: source };

  let fingerprint = fingerprints.get(source);
  if (!fingerprint) {
    const file = path.join(process.cwd(), "public", source);
    // Fixtures and remote content keep their original URL without a build manifest.
    if (!existsSync(file)) return { src: source };
    fingerprint = imageFingerprint(source, readFileSync(file));
    fingerprints.set(source, fingerprint);
  }

  const widths =
    width <= 256
      ? [80, 128, 160, 256]
      : width <= 432
        ? [216, 432]
        : [640, 960, 1440, 1600];

  return {
    src: imageVariant(
      source,
      fingerprint,
      widths.find((w) => w >= width) ?? 1600,
    ),
    srcSet: widths
      .map((w) => `${imageVariant(source, fingerprint, w)} ${w}w`)
      .join(", "),
  };
}
