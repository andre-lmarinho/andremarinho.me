// @vitest-environment node
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import {
  imageFingerprint,
  imageVariant,
  responsiveImageProps,
} from "@/lib/images";

describe("static responsive images", () => {
  it("fingerprints both the image bytes and source path for immutable URLs", () => {
    const hash = imageFingerprint("/images/a.webp", new Uint8Array([1]));
    expect(imageFingerprint("/images/a.webp", new Uint8Array([1]))).toBe(hash);
    expect(imageFingerprint("/images/a.webp", new Uint8Array([2]))).not.toBe(
      hash,
    );
    expect(imageFingerprint("/images/b.webp", new Uint8Array([1]))).not.toBe(
      hash,
    );
    expect(imageVariant("/images/a.webp", hash, 640, "webp")).toBe(
      `/_images/a.${hash}-640.webp`,
    );
  });

  it("preserves browser candidates for portraits, hover previews and heroes", () => {
    const source = "/images/me/andre-marinho.webp";
    const portrait = responsiveImageProps(source, 128);
    expect(portrait.srcset).toContain("-96.webp 96w");
    expect(portrait.avifSrcset).toContain("-96.avif 96w");
    expect(responsiveImageProps(source, 432).srcset).toContain(
      "-256.webp 256w",
    );
    const hero = responsiveImageProps(source, 1600);
    expect(hero.srcset).toMatch(/-640.webp 640w, /);
    expect(hero.srcset).not.toContain(" 384w");
    expect(hero.avifSrcset).toMatch(/-3840.avif 3840w$/);
  });

  it("keeps external URLs and absent test fixtures usable before a build", () => {
    expect(responsiveImageProps("https://example.com/a.webp", 640)).toEqual({
      src: "https://example.com/a.webp",
    });
    expect(responsiveImageProps("/images/virtual-fixture.webp", 640)).toEqual({
      src: "/images/virtual-fixture.webp",
    });
  });
});

it("copies cached bytes and invalidates them when the original image changes", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "static-images-"));
  try {
    const images = path.join(directory, "public/images");
    const cache = path.join(directory, "src/assets/image-cache");
    await mkdir(images, { recursive: true });
    await mkdir(cache, { recursive: true });
    const source = "/images/example.png";
    const original = await sharp(
      Buffer.from(Array.from({ length: 192 }, (_, i) => i)),
      { raw: { width: 8, height: 8, channels: 3 } },
    )
      .png()
      .toBuffer();
    await writeFile(path.join(images, "example.png"), original);
    const fingerprint = imageFingerprint(source, original);
    const variant = imageVariant(source, fingerprint, 96, "avif");
    const cached = await sharp(original).avif({ quality: 90 }).toBuffer();
    await writeFile(path.join(cache, path.basename(variant)), cached);
    const generate = () =>
      execFileSync(
        process.execPath,
        [path.resolve("scripts/generate-images.mjs")],
        { cwd: directory },
      );
    generate();
    expect(await readFile(path.join(directory, "public", variant))).toEqual(
      cached,
    );

    const changed = await sharp(original).negate().png().toBuffer();
    await writeFile(path.join(images, "example.png"), changed);
    generate();
    const next = imageVariant(
      source,
      imageFingerprint(source, changed),
      96,
      "avif",
    );
    const regenerated = await readFile(path.join(directory, "public", next));
    expect(next).not.toBe(variant);
    expect(regenerated).not.toEqual(cached);
    expect((await sharp(regenerated).metadata()).width).toBe(8);
    await expect(
      readFile(path.join(directory, "public", variant)),
    ).rejects.toMatchObject({ code: "ENOENT" });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
