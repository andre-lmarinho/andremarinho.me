import { afterEach, beforeEach, expect, it, vi } from "vitest";
import {
  getPostMetadata as postMetadata,
  getProjectMetadata as projectMetadata,
} from "@/lib/metadata";
import { siteName, siteUrl } from "@/lib/site";
import { GET as fullContext } from "@/pages/llms-full.txt";
import {
  GET as postMarkdown,
  getStaticPaths as postParams,
} from "@/pages/posts/[slug]/index.md";
import {
  GET as projectMarkdown,
  getStaticPaths as projectParams,
} from "@/pages/projects/[slug]/index.md";

const content = vi.hoisted(() => {
  const body =
    "## Decision\n\nA [reference](/about).\n\n```ts\nconst value = 1;\n```";
  const entry = (date: string) => ({
    id: "published",
    body,
    data: {
      title: "Example",
      description: "A technical decision.",
      date,
      tags: [],
    },
  });
  return {
    body,
    posts: [entry("2026-07-17"), { ...entry(""), id: "draft" }],
    projects: [entry("2026-07-17"), { ...entry(""), id: "draft" }],
  };
});

vi.mock("astro:content", () => ({
  getCollection: async (
    name: string,
    filter?: (entry: { id: string }) => boolean,
  ) => {
    const entries = name === "posts" ? content.posts : content.projects;
    return filter ? entries.filter(filter) : entries;
  },
}));

const fs = vi.hoisted(() => ({ readFileSync: vi.fn() }));
vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs")>();
  return { ...actual, ...fs, default: { ...actual, ...fs } };
});

beforeEach(() => {
  vi.stubEnv("NODE_ENV", "production");
  fs.readFileSync.mockReturnValue("Public professional overview.");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});

it.each([
  ["posts", postMarkdown, postParams, postMetadata],
  ["projects", projectMarkdown, projectParams, projectMetadata],
] as const)(
  "serves published %s as discoverable Markdown and excludes drafts",
  async (section, get, params, metadata) => {
    expect(await params()).toEqual([{ params: { slug: "published" } }]);
    const context = { params: { slug: "published" } };
    const response = await get(context);
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe(
      "text/markdown; charset=utf-8",
    );
    expect(response.headers.get("link")).toContain(
      `<${siteUrl}/${section}/published>; rel="canonical"`,
    );
    expect(response.headers.get("link")).toContain(
      `<${siteUrl}/llms.txt>; rel="describedby"`,
    );
    const text = await response.text();
    expect(text).toMatch(/^# Example\n\n> A technical decision\./);
    expect(text).toContain(`[${siteName}](${siteUrl}/about)`);
    expect(text).toContain("Published: 2026-07-17");
    expect(text).toContain(content.body);
    expect(text).not.toContain("date:");

    const page = await metadata("published");
    expect(page?.canonical).toBe(`/${section}/published`);
    expect(page?.markdown).toBe(`/${section}/published/index.md`);

    for (const slug of ["draft", "missing", "../../llms"]) {
      const result = await get({ params: { slug } });
      expect(result.status, slug).toBe(404);
    }

    vi.stubEnv("NODE_ENV", "development");
    const draft = await (await get({ params: { slug: "draft" } })).text();
    expect(draft).toContain(content.body);
    expect(draft).not.toContain("Published:");
  },
);

it("exports the public overview and complete published bodies without drafts", async () => {
  const response = await fullContext();
  const text = await response.text();

  expect(response.headers.get("content-type")).toBe(
    "text/plain; charset=utf-8",
  );
  expect(text).toContain("Public professional overview.");
  expect(text).toContain(`By [${siteName}](${siteUrl}/about)`);
  expect(text).toContain("Published: 2026-07-17");
  expect(text).not.toContain("Draft");
  for (const section of ["projects", "posts"]) {
    expect(text).toContain(`Source: ${siteUrl}/${section}/published`);
  }
  expect(text.split(content.body)).toHaveLength(3);
});
