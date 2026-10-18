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
  width: 128,
  height: 128,
  sizes: "128px",
  class: "rounded-xl",
  style: "view-transition-name:portrait",
  loading: "eager" as const,
};

it("resolves imported images through Astro while preserving layout and attributes", async () => {
  const html = await container.renderToString(ResponsiveImage, { props });
  const document = new JSDOM(html).window.document;
  const image = document.querySelector("img");
  expect(document.querySelector("picture")?.style.display).toBe("contents");
  expect(document.querySelector('source[type="image/avif"]')).not.toBeNull();
  expect(image?.width).toBe(props.width);
  expect(image?.height).toBe(props.height);
  expect(image?.alt).toBe(props.alt);
  expect(image?.className).toBe(props.class);
  expect(image?.style.viewTransitionName).toBe("portrait");
  expect(image?.getAttribute("loading")).toBe("eager");
  expect(image?.sizes).toBe(props.sizes);
  expect(image?.srcset).toContain("512w");
  expect(image?.srcset).not.toContain("1920w");
});
