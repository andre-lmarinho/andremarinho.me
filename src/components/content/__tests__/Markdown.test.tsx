import { cleanup, render } from "@testing-library/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Markdown from "../Markdown";

vi.mock("next/link", () => ({
  default: vi.fn(({ children, ...props }: ComponentProps<"a">) => (
    <a {...props}>{children}</a>
  )),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Markdown", () => {
  it("uses Next Link for internal links and native anchors for external URLs", () => {
    const links = [
      ["Source", "https://github.com/example/repo?a=1&b=2", true],
      ["HTTP", "http://example.com", true],
      ["Protocol relative", "//example.com", true],
      ["Project", "/projects/turistar", false],
      ["Same origin", "https://andremarinho.me/about", false],
      ["Anchor", "#context", false],
    ] as const;
    const page = render(
      <Markdown>
        {links
          .map(([label, href]) => `[**${label}**](${href} "Evidence")`)
          .join("\n\n")}
      </Markdown>,
    );

    expect(vi.mocked(Link).mock.calls.map(([props]) => props.href)).toEqual([
      "/projects/turistar",
      "https://andremarinho.me/about",
      "#context",
    ]);
    for (const [label, href, external] of links) {
      const link = page.getByRole("link", { name: label });
      expect(link.getAttribute("href")).toBe(href);
      expect(link.querySelector("strong")).not.toBeNull();
      expect(link.getAttribute("title")).toBe("Evidence");
      expect(link.getAttribute("target")).toBe(external ? "_blank" : null);
      expect(link.getAttribute("rel")).toBe(
        external ? "noopener noreferrer" : null,
      );
    }
  });

  it("preserves headings, lists, tables, and fenced code as content", () => {
    const page = render(
      <Markdown>
        {
          '## Context\n\n- One item\n\n| Name | Value |\n| --- | --- |\n| Example | 1 |\n\n```html\n<a href="/about">Example</a>\n```'
        }
      </Markdown>,
    );
    expect(page.getByRole("heading", { level: 2 }).textContent).toBe("Context");
    expect(page.getByRole("listitem").textContent).toBe("One item");
    expect(page.getByRole("table")).toBeTruthy();
    expect(page.container.querySelector("pre code")?.textContent).toContain(
      '<a href="/about">Example</a>',
    );
    expect(Link).not.toHaveBeenCalled();
  });
});
