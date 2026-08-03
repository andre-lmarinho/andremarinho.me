import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PostViews from "../PostViews";

const { useAbacusCount } = vi.hoisted(() => ({
  useAbacusCount: vi.fn(),
}));

vi.mock("@/hooks/useAbacusCount", () => ({ default: useAbacusCount }));

afterEach(() => {
  vi.clearAllMocks();
});

describe("PostViews", () => {
  it("shows a pending label while loading", () => {
    useAbacusCount.mockReturnValue(null);

    render(<PostViews slug="first" />);

    expect(screen.getByText("… views")).toBeTruthy();
  });

  it("reads and formats the post counter", () => {
    useAbacusCount.mockReturnValue(1234);

    render(<PostViews slug="first" />);

    expect(screen.getByText("1,234 views")).toBeTruthy();
    expect(useAbacusCount).toHaveBeenCalledWith("post-first", {
      increment: false,
    });
  });

  it("increments the counter on a post detail", () => {
    useAbacusCount.mockReturnValue(8);

    render(<PostViews slug="first" increment />);

    expect(screen.getByText("8 views")).toBeTruthy();
    expect(useAbacusCount).toHaveBeenCalledWith("post-first", {
      increment: true,
    });
  });

  it("uses the fallback when Abacus is unavailable", () => {
    useAbacusCount.mockReturnValue("∞");

    render(<PostViews slug="first" />);

    expect(screen.getByText("∞ views")).toBeTruthy();
  });
});
