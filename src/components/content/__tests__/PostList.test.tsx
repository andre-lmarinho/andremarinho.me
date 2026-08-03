import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Post } from "@/lib/posts";
import PostList from "../PostList";
import { duplicates, viewTransitionNames } from "./helpers";

vi.mock("../PostViews", () => ({
  default: ({ slug }: { slug: string }) => <>{slug} views</>,
}));

const post = (overrides: Partial<Post> = {}): Post => ({
  slug: "first",
  title: "First Post",
  description: "A description.",
  date: "2026-07-17",
  tags: ["one"],
  html: "",
  minutes: 2,
  ...overrides,
});

describe("PostList", () => {
  it("names the title after the post", () => {
    const { container } = render(<PostList posts={[post()]} />);

    expect(viewTransitionNames(container)).toEqual([
      "title-post-first-0",
      "title-post-first-1",
    ]);
  });

  it("emits no duplicate names across a full list", () => {
    const { container } = render(
      <PostList
        posts={[
          post(),
          post({ slug: "second", title: "Second Post" }),
          post({ slug: "third", title: "Third Post" }),
        ]}
      />,
    );

    expect(duplicates(viewTransitionNames(container))).toEqual([]);
  });

  it("shows the post view count", () => {
    const { getByText } = render(<PostList posts={[post()]} />);

    expect(getByText("first views")).toBeTruthy();
  });
});
