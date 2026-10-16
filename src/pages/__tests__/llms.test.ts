import { afterEach, expect, it, vi } from "vitest";
import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";
import { siteName, siteUrl } from "@/lib/seo";
import { email } from "@/lib/site";
import { GET } from "@/pages/llms.txt";

afterEach(() => vi.unstubAllEnvs());

it("serves a professional overview and links to published Markdown", async () => {
  vi.stubEnv("NODE_ENV", "production");
  const response = GET();
  const body = await response.text();

  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toBe(
    "text/plain; charset=utf-8",
  );
  expect(body).toMatch(new RegExp(`^# ${siteName}\\n\\n> .+\\n`));
  expect(body).toContain("remote software engineering roles");
  expect(body).toContain("fluent in English");
  expect(body).toContain("reconstructed visuals");
  expect(body).toContain(`[Résumé](${siteUrl}/resume.pdf)`);
  expect(body).toContain(`[Email](mailto:${email})`);
  expect(body).toContain(`${siteUrl}/llms-full.txt`);

  for (const [section, entries] of [
    ["projects", getProjects()],
    ["posts", getPosts()],
  ] as const) {
    for (const entry of entries) {
      expect(body).toContain(
        `[${entry.title}](${siteUrl}/${section}/${entry.slug}/index.md)`,
      );
    }
  }

  // Every H2 section is a link list, as required by the llms.txt format.
  for (const section of body.split(/^## .+$/m).slice(1)) {
    for (const line of section.trim().split("\n")) {
      expect(line).toMatch(/^- \[.+\]\((https:\/\/|mailto:).+\): .+/);
    }
  }
});
