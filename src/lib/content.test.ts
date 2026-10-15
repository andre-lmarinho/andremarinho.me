import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { readMarkdown } from "./content";
import { getPosts } from "./posts";
import { getProjects } from "./projects";

// Real content/, not fixtures: this failure arrives by publishing.
const posts = getPosts();
const projects = getProjects();

describe("content", () => {
  it("opens external Markdown links in a new tab and preserves internal navigation", () => {
    const links = [
      ["Source", "https://github.com/example/repo?a=1&b=2", true],
      ["HTTP", "http://example.com", true],
      ["Protocol relative", "//example.com", true],
      ["Project", "/projects/turistar", false],
      ["Same origin", "https://andremarinho.me/about", false],
      ["Anchor", "#context", false],
      ["Email", "mailto:hey@andremarinho.me", false],
    ] as const;
    const dir = mkdtempSync(join(tmpdir(), "portfolio-links-"));
    try {
      writeFileSync(
        join(dir, "links.md"),
        `---\ntitle: Links\ndescription: Link behavior\n---\n\n${links
          .map(([label, href]) => `[**${label}**](${href} "Evidence")`)
          .join("\n\n")}`,
      );
      const { html } = readMarkdown(dir, "links");
      const document = new DOMParser().parseFromString(html, "text/html");
      for (const [index, [label, href, external]] of links.entries()) {
        const link = document.querySelectorAll("a")[index];
        expect(link.textContent).toBe(label);
        expect(link.querySelector("strong")).not.toBeNull();
        expect(link.getAttribute("href")).toBe(href);
        expect(link.getAttribute("title")).toBe("Evidence");
        expect(link.getAttribute("target")).toBe(external ? "_blank" : null);
        expect(link.getAttribute("rel")).toBe(
          external ? "noopener noreferrer" : null,
        );
      }
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("finds posts and projects to check", () => {
    expect(posts.length).toBeGreaterThan(0);
    expect(projects.length).toBeGreaterThan(0);
  });

  it.each([
    ["posts", posts],
    ["projects", projects],
  ])("gives every %s entry a unique slug", (_, entries) => {
    const slugs = entries.map((entry) => entry.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each([
    ["posts", posts],
    ["projects", projects],
  ])("gives every %s entry a title", (_, entries) => {
    for (const entry of entries) {
      expect(entry.title.trim(), `${entry.slug} has no title`).not.toBe("");
    }
  });

  it("shares no slug between posts and projects", () => {
    const postSlugs = new Set(posts.map((post) => post.slug));
    const shared = projects
      .map((project) => project.slug)
      .filter((slug) => postSlugs.has(slug));

    expect(shared).toEqual([]);
  });

  it("explains each project's context, ownership, scope, and decisions", () => {
    for (const project of projects) {
      const headings = [...project.html.matchAll(/<h2>(.*?)<\/h2>/g)].map(
        ([, heading]) => heading,
      );
      expect(headings, `${project.slug} is missing essential context`).toEqual(
        expect.arrayContaining(["Context", "My role", "Scope", "Decisions"]),
      );
    }
  });
});
