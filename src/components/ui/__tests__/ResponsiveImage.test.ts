// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { JSDOM } from "jsdom";
import { expect, it } from "vitest";
import portrait from "@/assets/images/me/andre-marinho.webp";
import ResponsiveImage from "../ResponsiveImage.astro";

const container = await AstroContainer.create();
const props = {
  src: portrait,
  alt: "André Marinho smiling",
  sizes: "128px",
  class: "rounded-xl",
  style: "view-transition-name:portrait",
};

it("uses the imported image dimensions and lazy-loads by default", async () => {
  const html = await container.renderToString(ResponsiveImage, { props });
  const document = new JSDOM(html).window.document;
  const image = document.querySelector("img");
  expect(document.querySelector("picture")?.style.display).toBe("contents");
  expect(document.querySelector('source[type="image/avif"]')).not.toBeNull();
  expect(image?.width).toBe(portrait.width);
  expect(image?.height).toBe(portrait.height);
  expect(image?.alt).toBe(props.alt);
  expect(image?.className).toBe(props.class);
  expect(image?.style.viewTransitionName).toBe("portrait");
  expect(image?.getAttribute("loading")).toBe("lazy");
  expect(image?.getAttribute("decoding")).toBe("async");
  expect(image?.hasAttribute("fetchpriority")).toBe(false);
  expect(image?.sizes).toBe(props.sizes);
  expect(image?.srcset).toContain("512w");
  expect(image?.srcset).not.toContain("1920w");
});

it("loads priority images eagerly with a high fetch priority", async () => {
  const html = await container.renderToString(ResponsiveImage, {
    props: { ...props, priority: true },
  });
  const image = new JSDOM(html).window.document.querySelector("img");

  expect(image?.getAttribute("loading")).toBe("eager");
  expect(image?.getAttribute("decoding")).toBe("sync");
  expect(image?.getAttribute("fetchpriority")).toBe("high");
});
