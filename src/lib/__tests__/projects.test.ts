// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";
import cover from "@/content/projects/turistar/cover.webp";
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
        alt: "Cover",
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

it("loads the project's cover image and description", async () => {
  expect((await getProject("turistar"))?.image).toEqual({
    src: cover,
    alt: "Cover",
  });
});

it("loads a single cover for each project", async () => {
  const project = await getProject("skills");
  expect(project?.image.alt).toBe("Cover");
});
