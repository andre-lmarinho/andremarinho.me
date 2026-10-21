// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { JSDOM } from "jsdom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getPost, getPosts } from "@/lib/posts";
import PostPage from "@/pages/posts/[slug]/index.astro";
import ProjectPage from "@/pages/projects/[slug]/index.astro";

// Vitest loads server factories; Astro check types page imports as components.
type ContainerComponent = Parameters<AstroContainer["renderToString"]>[0];
const postPage = PostPage as unknown as ContainerComponent;
const projectPage = ProjectPage as unknown as ContainerComponent;

const content = vi.hoisted(() => {
  const entry = (id: string, data: Record<string, unknown>) => ({
    id,
    body: "The content.",
    data: {
      title: id,
      description: `About ${id}.`,
      tags: [],
      ...data,
    },
  });
  const published = "2026-07-17";
  return {
    posts: [
      entry("related", { date: published, project: "tool" }),
      entry("general", { date: published }),
      entry("missing", { date: published, project: "missing" }),
      entry("draft-project", { date: published, project: "draft" }),
      entry("draft", { project: "tool" }),
      entry("other", { date: published, project: "other" }),
    ],
    projects: [
      entry("tool", { date: published }),
      entry("other", { date: published }),
      entry("empty", { date: published }),
      entry("draft", {}),
    ],
  };
});

vi.mock("astro:content", () => ({
  getEntry: async (name: string, id: string) => {
    const entries = name === "posts" ? content.posts : content.projects;
    return entries.find((entry) => entry.id === id);
  },
  getCollection: async (
    name: string,
    filter?: (entry: { id: string }) => boolean,
  ) => {
    const entries = name === "posts" ? content.posts : content.projects;
    return filter ? entries.filter(filter) : entries;
  },
}));

describe("project links", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "production");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("reads the optional project field without requiring it on general posts", async () => {
    expect((await getPost("related"))?.project).toBe("tool");
    expect((await getPost("general"))?.project).toBeUndefined();
    expect((await getPosts()).some((post) => post.slug === "draft")).toBe(
      false,
    );
  });

  it("links an article to its published project", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(postPage, {
      params: { slug: "related" },
    });
    const page = new JSDOM(html).window.document;
    const section = page.querySelector(
      'aside[aria-labelledby="related-project"]',
    );
    expect(section?.querySelector("a")?.getAttribute("href")).toBe(
      "/projects/tool",
    );
  });

  it.each(["general", "missing", "draft-project"])(
    "omits the project block for %s instead of generating a broken link",
    async (slug) => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(postPage, {
        params: { slug },
      });
      const page = new JSDOM(html).window.document;
      expect(page.querySelector("#related-project")).toBeNull();
    },
  );

  it("lists only published notes assigned to the current project", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(projectPage, {
      params: { slug: "tool" },
    });
    const page = new JSDOM(html).window.document;
    const links = page.querySelectorAll(
      'aside[aria-labelledby="related-notes"] li a',
    );
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute("href")).toBe("/posts/related");
  });

  it("omits an empty related-notes section", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(projectPage, {
      params: { slug: "empty" },
    });
    const page = new JSDOM(html).window.document;
    expect(page.querySelector("#related-notes")).toBeNull();
  });
});
