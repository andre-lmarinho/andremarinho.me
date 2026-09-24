import { describe, expect, it } from "vitest";
import { getPosts } from "./posts";
import { getProjects } from "./projects";

// Real content/, not fixtures: this failure arrives by publishing.
const posts = getPosts();
const projects = getProjects();

describe("content", () => {
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
