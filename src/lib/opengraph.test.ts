// @vitest-environment node
import { expect, it } from "vitest";
import { createOpenGraphImage } from "./opengraph";
import { getPosts } from "./posts";

it("generates a complete PNG card using the published content and vendored fonts", async () => {
  const post = getPosts().reduce((longest, entry) =>
    entry.title.length > longest.title.length ? entry : longest,
  );
  const response = await createOpenGraphImage({
    title: post.title,
    description: post.description,
    path: `/posts/${post.slug}`,
  });
  const png = new Uint8Array(await response.arrayBuffer());
  const header = new DataView(png.buffer);

  expect(response.headers.get("content-type")).toBe("image/png");
  expect([...png.slice(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
  expect([header.getUint32(16), header.getUint32(20)]).toEqual([1200, 630]);
});
