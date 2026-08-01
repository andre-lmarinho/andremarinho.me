import { describe, expect, it } from "vitest";
import { getPosts } from "./posts";
import { getProjects } from "./projects";

// These read the real content/ directory rather than fixtures: the failure they
// guard against arrives by publishing, not by editing code.
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

  // A title is what MorphTitle splits into named words. An empty one emits no
  // names, so the pair silently disappears and the item stops morphing.
  it.each([
    ["posts", posts],
    ["projects", projects],
  ])("gives every %s entry a title", (_, entries) => {
    for (const entry of entries) {
      expect(entry.title.trim(), `${entry.slug} has no title`).not.toBe("");
    }
  });

  // The home renders both lists in one document, and the transition names are
  // built from the slug. A slug used by both a post and a project would emit the
  // same name twice, and the browser drops the whole transition when it sees a
  // duplicate — no error anywhere, the animation just stops happening.
  it("shares no slug between posts and projects", () => {
    const postSlugs = new Set(posts.map((post) => post.slug));
    const shared = projects
      .map((project) => project.slug)
      .filter((slug) => postSlugs.has(slug));

    expect(shared).toEqual([]);
  });
});
