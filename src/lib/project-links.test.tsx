import { join } from "node:path";
import { cleanup, render, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PostPage from "@/components/pages/Post";
import ProjectPage from "@/components/pages/Project";
import { getPost, getPosts } from "./posts";

const fs = vi.hoisted(() => ({ readdirSync: vi.fn(), readFileSync: vi.fn() }));
vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs")>();
  return { ...actual, ...fs, default: { ...actual, ...fs } };
});
vi.mock("@/components/content/PostViews", () => ({ default: () => null }));

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
    cleanup();
    vi.unstubAllEnvs();
  });

  it("reads the optional project field without requiring it on general posts", () => {
    expect(getPost("related")?.project).toBe("tool");
    expect(getPost("general")?.project).toBeUndefined();
    expect(getPosts().some((post) => post.slug === "draft")).toBe(false);
  });

  it("links an article to its published project", async () => {
    const page = render(PostPage({ slug: "related" }));
    expect(page.getByRole("link", { name: /Tool/ }).getAttribute("href")).toBe(
      "/projects/tool",
    );
  });

  it.each(["general", "missing", "draft-project"])(
    "omits the project block for %s instead of generating a broken link",
    async (slug) => {
      const page = render(PostPage({ slug }));
      expect(
        page.queryByRole("heading", { name: "Related project" }),
      ).toBeNull();
    },
  );

  it("lists only published notes assigned to the current project", async () => {
    const page = render(ProjectPage({ slug: "tool" }));
    const section = within(
      page.getByRole("complementary", { name: "Related notes" }),
    );
    const notes = within(section.getByRole("list"));
    expect(notes.getAllByRole("link")).toHaveLength(1);
    expect(notes.getByRole("link").getAttribute("href")).toBe("/posts/related");
  });

  it("omits an empty related-notes section", async () => {
    const page = render(ProjectPage({ slug: "empty" }));
    expect(page.queryByRole("heading", { name: "Related notes" })).toBeNull();
  });
});
