// @vitest-environment node
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { email, siteName, siteUrl } from "@/lib/site";
import { GET } from "@/pages/llms.txt";

const content = vi.hoisted(() => {
  const entry = (id: string, date: string) => ({
    id,
    body: "The content.",
    data: { title: id, description: `About ${id}.`, date, tags: [] },
  });
  return {
    posts: [entry("first-post", "2026-07-17"), entry("draft", "")],
    projects: [entry("first-project", "2026-07-17"), entry("draft", "")],
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

beforeEach(() => {
  vi.stubEnv("NODE_ENV", "production");
});

afterEach(() => vi.unstubAllEnvs());

it("serves a professional overview and links to published Markdown", async () => {
  const response = await GET();
  const body = await response.text();

  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toBe(
    "text/plain; charset=utf-8",
  );
  expect(body).toMatch(new RegExp(`^# ${siteName}\\n\\n> .+\\n`));
  expect(body).toContain("remote software engineering roles");
  expect(body).toContain(`[Résumé](${siteUrl}/resume.pdf)`);
  expect(body).toContain(`[Email](mailto:${email})`);
  expect(body).toContain(`${siteUrl}/llms-full.txt`);

  for (const [section, slug] of [
    ["projects", "first-project"],
    ["posts", "first-post"],
  ] as const) {
    expect(body).toContain(`[${slug}](${siteUrl}/${section}/${slug}/index.md)`);
  }
  expect(body).not.toContain("/draft/");

  // Every H2 section is a link list, as required by the llms.txt format.
  for (const section of body.split(/^## .+$/m).slice(1)) {
    for (const line of section.trim().split("\n")) {
      expect(line).toMatch(/^- \[.+\]\((https:\/\/|mailto:).+\): .+/);
    }
  }
});
