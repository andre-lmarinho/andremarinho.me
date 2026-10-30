// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";
import cover from "@/content/projects/turistar/01-cover.webp";
import application from "@/content/projects/turistar/02-application.webp";
import website from "@/content/projects/turistar/03-website.webp";
import { getProject } from "../projects";

vi.mock("astro:content", () => ({
  getEntry: async (_name: string, id: string) => {
    if (id === "missing") return undefined;
    return {
      id,
      data: {
        title: id,
        description: "Example project.",
        date: id === "draft" ? undefined : "2026-07-17",
        tags: [],
        images: {
          "03-website.webp": { alt: "Website" },
          "02-application.webp": { alt: "Application", caption: "Detail" },
          "01-cover.webp": { alt: "Cover" },
        },
      },
    };
  },
}));

afterEach(() => vi.unstubAllEnvs());

it("returns null for missing projects and unpublished drafts", async () => {
  vi.stubEnv("NODE_ENV", "production");
  expect(await getProject("missing")).toBeNull();
  expect(await getProject("draft")).toBeNull();
});

it("allows draft previews during development", async () => {
  vi.stubEnv("NODE_ENV", "development");
  expect((await getProject("draft"))?.date).toBe("");
});

it("discovers the slug's images in file-name order regardless of description order", async () => {
  expect((await getProject("turistar"))?.images).toEqual([
    { src: cover, alt: "Cover" },
    { src: application, alt: "Application", caption: "Detail" },
    { src: website, alt: "Website" },
  ]);
});

it("discovers a single cover without adding images from other projects", async () => {
  const project = await getProject("skills");
  expect(project?.images).toHaveLength(1);
  expect(project?.images[0].alt).toBe("Cover");
});
