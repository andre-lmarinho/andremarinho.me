// @vitest-environment node

import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";
import Markdown from "../Markdown.astro";

const container = await AstroContainer.create();

async function render(content: string) {
  const html = await container.renderToString(Markdown, {
    props: { content },
  });
  return new JSDOM(html).window.document;
}

describe("Markdown", () => {
  it("renders native anchors and opens external destinations in another tab", async () => {
    const links = [
      ["Source", "https://github.com/example/repo?a=1&b=2", true],
      ["HTTP", "http://example.com", true],
      ["Protocol relative", "//example.com", true],
      ["Project", "/projects/turistar", false],
      ["Same origin", "https://andremarinho.me/about", false],
      ["Anchor", "#context", false],
    ] as const;
    const page = await render(
      links
        .map(([label, href]) => `[**${label}**](${href} "Evidence")`)
        .join("\n\n"),
    );

    for (const [label, href, external] of links) {
      const link = [...page.querySelectorAll("a")].find(
        (candidate) => candidate.textContent === label,
      );
      expect(link?.getAttribute("href")).toBe(href);
      expect(link?.querySelector("strong")).not.toBeNull();
      expect(link?.getAttribute("title")).toBe("Evidence");
      expect(link?.getAttribute("target")).toBe(external ? "_blank" : null);
      expect(link?.getAttribute("rel")).toBe(
        external ? "noopener noreferrer" : null,
      );
    }
  });

  it("preserves prose, punctuation, lists, tables, and unhighlighted code", async () => {
    const page = await render(
      '## Context\n\n"Quotes" -- no substitutions...\n\n- One item\n\n| Name | Value |\n| --- | --- |\n| Example | 1 |\n\n```html\n<a href="/about">Example</a>\n```',
    );
    expect(page.querySelector(".prose h2")?.textContent).toBe("Context");
    expect(page.querySelector(".prose h2")?.id).toBe("context");
    expect(page.querySelector(".prose p")?.textContent).toBe(
      '"Quotes" -- no substitutions...',
    );
    expect(page.querySelector("li")?.textContent).toBe("One item");
    expect(page.querySelector("table")).not.toBeNull();
    expect(page.querySelector("pre code")?.textContent).toBe(
      '<a href="/about">Example</a>',
    );
    expect(page.querySelector("pre code")?.className).toBe(
      "language-html lang-html",
    );
    expect(page.querySelector("pre span")).toBeNull();
  });
});
