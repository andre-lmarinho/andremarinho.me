# Existing image variants

These AVIF and WebP files preserve the exact image bytes served by the previous
Vercel deployment at quality 75, using Next.js's original responsive widths.
Keeping them preserves the current images without a runtime image optimizer.

Filenames include a fingerprint of the original source path, bytes and encoding
settings. `scripts/generate-images.mjs` copies matching variants into the build;
new or changed sources are encoded automatically with Sharp. Builds use no network.
