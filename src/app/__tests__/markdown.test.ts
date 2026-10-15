import { afterEach, beforeEach, expect, it, vi } from "vitest";
import {
  GET as postMarkdown,
  generateStaticParams as postParams,
} from "@/app/posts/[slug]/index.md/route";
import { generateMetadata as postMetadata } from "@/app/posts/[slug]/page";
import {
  GET as projectMarkdown,
  generateStaticParams as projectParams,
} from "@/app/projects/[slug]/index.md/route";
import { generateMetadata as projectMetadata } from "@/app/projects/[slug]/page";
import { siteName, siteUrl } from "@/lib/seo";

const fs = vi.hoisted(() => ({ readdirSync: vi.fn(), readFileSync: vi.fn() }));
vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs")>();
  return { ...actual, ...fs, default: { ...actual, ...fs } };
});

const body =
  "## Decision\n\nA [reference](/about).\n\n```ts\nconst value = 1;\n```";

beforeEach(() => {
  vi.stubEnv("NODE_ENV", "production");
  fs.readdirSync.mockReturnValue(["published.md", "draft.md"]);
  fs.readFileSync.mockImplementation((path: string) => {
    const date = path.endsWith("published.md") ? "date: 2026-07-17\n" : "";
    return `---\ntitle: Example\ndescription: A technical decision.\n${date}---\n\n${body}\n`;
  });
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
    expect(params()).toEqual([{ slug: "published" }]);
    const context = { params: Promise.resolve({ slug: "published" }) };
    const response = await get(
      new Request(`${siteUrl}/${section}/published/index.md`),
      context,
    );
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
    expect(text).toContain(body);
    expect(text).not.toContain("date:");

    const page = await metadata(context);
    expect(page.alternates?.canonical).toBe(`/${section}/published`);
    expect(page.alternates?.types).toEqual({
      "text/markdown": `/${section}/published/index.md`,
    });

    for (const slug of ["draft", "missing", "../../llms"]) {
      const result = await get(new Request(siteUrl), {
        params: Promise.resolve({ slug }),
      });
      expect(result.status, slug).toBe(404);
    }
  },
);
