// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";
import image from "@/assets/images/projects/turistar.webp";
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
        featured: false,
      },
    };
  },
}));

afterEach(() => vi.unstubAllEnvs());

it("finds the project image by slug without an image field", async () => {
  expect((await getProject("turistar"))?.image).toEqual(image);
});

it("returns null for missing projects and unpublished drafts", async () => {
  vi.stubEnv("NODE_ENV", "production");
  expect(await getProject("missing")).toBeNull();
  expect(await getProject("draft")).toBeNull();
});

it("allows draft previews during development", async () => {
  vi.stubEnv("NODE_ENV", "development");
  expect((await getProject("draft"))?.date).toBe("");
});

it("leaves the image optional when no file matches the slug", async () => {
  expect((await getProject("without-image"))?.image).toBeUndefined();
});
