// @vitest-environment node
import { join } from "node:path";
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

const fs = vi.hoisted(() => ({ readdirSync: vi.fn(), readFileSync: vi.fn() }));
vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs")>();
  return { ...actual, ...fs, default: { ...actual, ...fs } };
});

const markdown = (title: string, fields = "date: 2026-07-17") =>
  `---\ntitle: ${title}\ndescription: About ${title}.\n${fields}\n---\n\nThe content.`;

const files = {
  "projects/tool.md": markdown("Tool"),
  "projects/other.md": markdown("Other project"),
  "projects/empty.md": markdown("Project without notes"),
  "projects/draft.md": markdown("Draft project", ""),
  "posts/related.md": markdown(
    "Related note",
    "date: 2026-07-17\nproject: tool",
  ),
  "posts/general.md": markdown("General note"),
  "posts/missing.md": markdown(
    "Missing project",
    "date: 2026-07-17\nproject: missing",
  ),
  "posts/draft-project.md": markdown(
    "Unpublished project",
    "date: 2026-07-17\nproject: draft",
  ),
  "posts/draft.md": markdown("Draft note", "project: tool"),
  "posts/other.md": markdown("Other note", "date: 2026-07-17\nproject: other"),
};

describe("project links", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "production");
    fs.readdirSync.mockImplementation((dir: string) =>
      Object.keys(files)
        .filter((file) =>
          join(process.cwd(), "content", file).startsWith(`${dir}/`),
        )
        .map((file) => file.split("/").at(-1)),
    );
    fs.readFileSync.mockImplementation((path: string) => {
      const file = Object.keys(files).find(
        (file) => join(process.cwd(), "content", file) === path,
      );
      if (!file) throw new Error(`Unexpected content path: ${path}`);
      return files[file as keyof typeof files];
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("reads the optional project field without requiring it on general posts", () => {
    expect(getPost("related")?.project).toBe("tool");
    expect(getPost("general")?.project).toBeUndefined();
    expect(getPosts().some((post) => post.slug === "draft")).toBe(false);
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
