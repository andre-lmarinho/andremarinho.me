import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import {
  imageFingerprint,
  imageQuality,
  imageVariant,
  imageWidths,
} from "../src/lib/images.ts";

const publicDir = path.resolve("public");
const outputDir = path.join(publicDir, "_images");
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
    const output = await sharp(content)
      .resize({ width })
      .webp({ quality: imageQuality })
      .toBuffer();
    await writeFile(
      path.join(publicDir, imageVariant(source, fingerprint, width)),
      output,
    );
  }
}
console.log(
  `Generated ${sources.length * imageWidths.length} responsive WebP images.`,
);
