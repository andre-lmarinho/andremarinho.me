import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { siteUrl } from "@/lib/site";
import { GET } from "@/pages/rss.xml";

const content = vi.hoisted(() => ({
  posts: [
    {
      id: "newer",
      body: "## Decision\n\nRead the [profile](/about).\n\n```ts\nconst value = 1;\n```",
      data: {
        title: "Newer & safer",
        description: "A <complete> article.",
        date: "2026-10-16",
        tags: [
          "AI Agents",
          "GitHub Actions",
          "Testing",
          "Developer Tooling",
          "Ignored",
        ],
      },
    },
    {
      id: "older",
      body: "Older body.",
      data: {
        title: "Older",
        description: "An older article.",
        date: "2026-07-17",
        tags: ["Meta"],
      },
    },
    {
      id: "draft",
      body: "Private draft.",
      data: {
        title: "Draft",
        description: "Not published.",
        tags: ["Draft"],
      },
    },
  ],
}));

vi.mock("astro:content", () => ({
  getCollection: async () => content.posts,
}));

beforeEach(() => {
  vi.stubEnv("NODE_ENV", "production");
});

afterEach(() => {
  vi.unstubAllEnvs();
});

it("serves complete published posts as a canonical full-content RSS feed", async () => {
  const response = await GET({ site: new URL(siteUrl) } as never);
  const xml = await response.text();

  expect(response.headers.get("content-type")).toBe("application/xml");
  expect(xml).toContain("<language>en-us</language>");
  expect(xml).toContain("<title>Newer &amp; safer</title>");
  expect(xml).toContain(
    "<description>A &lt;complete&gt; article.</description>",
  );
  expect(xml).toContain(`<link>${siteUrl}/posts/newer</link>`);
  expect(xml).toContain(
    `<guid isPermaLink="true">${siteUrl}/posts/newer</guid>`,
  );
  expect(xml).toContain("<pubDate>Fri, 16 Oct 2026 00:00:00 GMT</pubDate>");
  expect(xml).toContain("<category>AI Agents</category>");
  expect(xml).toContain("<category>Developer Tooling</category>");
  expect(xml).toContain("<category>Ignored</category>");
  expect(xml).toContain(`href=&quot;${siteUrl}/about&quot;`);
  expect(xml).toContain("const value = 1;");
  expect(xml.indexOf("/posts/newer")).toBeLessThan(xml.indexOf("/posts/older"));
  expect(xml).not.toContain("Private draft");
  expect(xml).not.toContain("/posts/draft");
});
