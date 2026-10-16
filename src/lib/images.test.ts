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
    expect(imageVariant("/images/a.webp", hash, 640)).toBe(
      `/_images/a.${hash}-640.webp`,
    );
  });

  it("uses the portrait, hover and hero width sets", () => {
    const source = "/images/me/andre-marinho.webp";
    expect(responsiveImageProps(source, 128).srcSet).toMatch(/-640.webp 640w$/);
    expect(responsiveImageProps(source, 432).srcSet).toMatch(
      /-216.webp 216w, /,
    );
    expect(responsiveImageProps(source, 1600).srcSet).toMatch(
      /-1600.webp 1600w$/,
    );
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
