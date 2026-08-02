import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Project } from "@/lib/projects";
import ProjectList from "../ProjectList";
import { duplicates, viewTransitionNames } from "./helpers";

const project = (overrides: Partial<Project> = {}): Project => ({
  slug: "first",
  title: "First",
  description: "A description.",
  date: "2026-03-01",
  tags: ["one", "two"],
  image: "/image.png",
  link: "https://example.com",
  featured: true,
  kind: "kind",
  html: "",
  ...overrides,
});

describe("ProjectList", () => {
  it("names the title and the image after the same project", () => {
    const { container } = render(<ProjectList projects={[project()]} />);

    expect(viewTransitionNames(container)).toEqual([
      "title-project-first-0",
      "project-image-first",
    ]);
  });

  it("omits the image name when there is no image", () => {
    const { container } = render(
      <ProjectList projects={[project({ image: "" })]} />,
    );

    expect(viewTransitionNames(container)).not.toContain("project-image-first");
  });

  it("emits no duplicate names across a full list", () => {
    const { container } = render(
      <ProjectList
        projects={[
          project(),
          project({ slug: "second", title: "Second" }),
          project({ slug: "third", title: "Third" }),
        ]}
      />,
    );

    expect(duplicates(viewTransitionNames(container))).toEqual([]);
  });
});
