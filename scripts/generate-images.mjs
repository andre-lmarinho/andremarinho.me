import {
  copyFile,
  mkdir,
  readdir,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import {
  avifEffort,
  avifQuality,
  imageFingerprint,
  imageFormats,
  imageQuality,
  imageVariant,
  imageWidths,
} from "../src/lib/images.ts";

const publicDir = path.resolve("public");
const outputDir = path.join(publicDir, "_images");
const cacheDir = path.resolve("src/assets/image-cache");
await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const entries = await readdir(path.join(publicDir, "images"), {
  recursive: true,
  withFileTypes: true,
});
const sources = entries.filter(
  (entry) => entry.isFile() && /\.(avif|jpe?g|png|webp)$/i.test(entry.name),
);

// Bound native image work to keep build memory predictable in the CI runner.
for (const entry of sources) {
  const input = path.join(entry.parentPath, entry.name);
  const source = `/${path.relative(publicDir, input).split(path.sep).join("/")}`;
  const content = await readFile(input);
  const fingerprint = imageFingerprint(source, content);
  for (const width of imageWidths) {
    for (const format of imageFormats) {
      const variant = imageVariant(source, fingerprint, width, format);
      const destination = path.join(publicDir, variant);
      try {
        await copyFile(
          path.join(cacheDir, path.basename(variant)),
          destination,
        );
        continue;
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
      const image = sharp(content)
        .rotate()
        .resize(width, undefined, { withoutEnlargement: true });
      const output = await (format === "avif"
        ? image.avif({ quality: avifQuality, effort: avifEffort })
        : image.webp({ quality: imageQuality })
      ).toBuffer();
      await writeFile(destination, output);
    }
  }
}
console.log(
  `Generated ${sources.length * imageWidths.length * imageFormats.length} responsive AVIF/WebP images.`,
);
