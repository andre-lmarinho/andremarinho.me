import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { socials } from "@/lib/site";
import Footer from "../Footer";

const { useTimeOnSite, useViewsCount } = vi.hoisted(() => ({
  useTimeOnSite: vi.fn(),
  useViewsCount: vi.fn(),
}));

vi.mock("../hooks/useTimeOnSite", () => ({ default: useTimeOnSite }));
vi.mock("../hooks/useViewsCount", () => ({ default: useViewsCount }));

const renderFooter = ({ time = "00:00", views = 0 as number | null } = {}) => {
  useTimeOnSite.mockReturnValue(time);
  useViewsCount.mockReturnValue(views);
  return render(<Footer />);
};

const cellValue = (label: string) =>
  screen.getByText(label).closest("div")?.querySelector(".status-value");

afterEach(() => {
  vi.clearAllMocks();
});

describe("Footer", () => {
  it("shows the time spent on the site", () => {
    renderFooter({ time: "12:34" });

    expect(cellValue("time")?.textContent).toBe("12:34");
  });

  it("groups thousands in the view count", () => {
    renderFooter({ views: 12345 });

    expect(cellValue("visits")?.textContent).toBe("12,345");
  });

  it("marks the view count pending until it arrives", () => {
    renderFooter({ views: null });

    expect(cellValue("visits")?.getAttribute("data-state")).toBe("pending");
    expect(cellValue("visits")?.textContent).toBe("0");
  });

  it("marks the view count ready once it arrives", () => {
    renderFooter({ views: 7 });

    expect(cellValue("visits")?.getAttribute("data-state")).toBe("ready");
  });

  it("links every social account", () => {
    renderFooter();

    for (const { label, href } of socials) {
      expect(
        screen.getByRole("link", { name: label }).getAttribute("href"),
      ).toBe(href);
    }
  });

  it("guards the opener on links that open a new tab", () => {
    const { container } = renderFooter();

    for (const link of container.querySelectorAll('a[target="_blank"]')) {
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });

  it("falls back to a placeholder build when no commit is set", () => {
    renderFooter();

    expect(cellValue("build")?.textContent).toBe("0000000");
  });
});
