// @vitest-environment node
import { readdirSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { expect, it } from "vitest";
import { createOpenGraphImage } from "../opengraph";

it("generates a complete PNG card with the vendored fonts", async () => {
  const response = await createOpenGraphImage({
    title: "Postgres cursors older than a second trip over timestamps and ids",
    description: "A realistic long headline, so the card renders at its worst.",
    path: "/posts/example",
  });
  const png = new Uint8Array(await response.arrayBuffer());
  const header = new DataView(png.buffer);

  expect(response.headers.get("content-type")).toBe("image/png");
  expect([...png.slice(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
  expect([header.getUint32(16), header.getUint32(20)]).toEqual([1200, 630]);
});

it("renders a card without an optional description", async () => {
  const response = await createOpenGraphImage({
    title: "Writing",
    path: "/posts",
  });
  const image = sharp(await response.arrayBuffer());
  const { width, height } = await image.metadata();
  expect([width, height]).toEqual([1200, 630]);
});

// JetBrains Mono advances 0.6em: a 22px footer must fit between the 72px gutters.
it("keeps every published post footer inside the card", () => {
  const posts = join(process.cwd(), "src/content/posts");
  const published = readdirSync(posts).filter((name) =>
    // date presence mirrors the isPublished rule; no YAML parse.
    /^---\r?\n[\s\S]*?\ndate:/.test(readFileSync(join(posts, name), "utf8")),
  );
  const widest = published
    .map((name) => `andremarinho.me/posts/${name.slice(0, -".md".length)}`)
    .sort((a, b) => b.length - a.length)[0];
  expect(widest.length * 13.2, `"${widest}" overflows`).toBeLessThan(1056);
});

// OG cards cannot import the stylesheet; check their rendered palette for drift.
it("uses the site color tokens in the rendered PNG", async () => {
  const css = await readFile(
    join(process.cwd(), "src/styles/global.css"),
    "utf8",
  );
  const declared = new Map(
    [...css.matchAll(/--color-([a-z0-9-]+):\s*([^;]+);/g)].map(
      ([, name, value]) => [name, value.trim().toLowerCase()],
    ),
  );
  const response = await createOpenGraphImage({
    title: "Title",
    description: "Description.",
  });
  const { data, info } = await sharp(await response.arrayBuffer())
    .raw()
    .toBuffer({ resolveWithObject: true });
  const colors = new Set<string>();
  for (let pixel = 0; pixel < data.length; pixel += info.channels) {
    colors.add(`#${data.subarray(pixel, pixel + 3).toString("hex")}`);
  }

  for (const token of ["bg", "foreground", "muted", "border", "accent"]) {
    const color = declared.get(token);
    expect(color, `global.css is missing --color-${token}`).toBeDefined();
    expect(
      colors.has(color as string),
      `the card no longer uses --color-${token}`,
    ).toBe(true);
  }
});
