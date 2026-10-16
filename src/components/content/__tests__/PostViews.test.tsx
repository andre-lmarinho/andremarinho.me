import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PostViews from "../PostViews";

describe("PostViews", () => {
  it("renders the counter key without fetching during the build", () => {
    render(<PostViews slug="first" />);
    const views = screen.getByText("… views");
    expect(views.dataset.postCounter).toBe("post-first");
    expect(views.dataset.increment).toBeUndefined();
    expect(views.style.minWidth).toBe("12ch");
  });

  it("marks post details for incrementing when visible", () => {
    render(<PostViews slug="first" increment />);
    expect(screen.getByText("… views").dataset.increment).toBe("true");
  });
});
