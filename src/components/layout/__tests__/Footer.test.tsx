import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AbacusCount } from "@/lib/abacus";
import { socials } from "@/lib/site";
import Footer from "../Footer";

const { useAbacusCount, usePathname, useTimeOnSite } = vi.hoisted(() => ({
  useAbacusCount: vi.fn(),
  usePathname: vi.fn(),
  useTimeOnSite: vi.fn(),
}));

vi.mock("next/navigation", () => ({ usePathname }));
vi.mock("@/hooks/useAbacusCount", () => ({ default: useAbacusCount }));
vi.mock("../hooks/useTimeOnSite", () => ({ default: useTimeOnSite }));

const renderFooter = ({ time = "00:00", views = 0 as AbacusCount } = {}) => {
  usePathname.mockReturnValue("/posts");
  useTimeOnSite.mockReturnValue(time);
  useAbacusCount.mockReturnValue(views);
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

  it("counts the current pathname in the historical site counter", () => {
    renderFooter();

    expect(useAbacusCount).toHaveBeenCalledWith("portfolio", {
      increment: true,
      dedupeKey: "/posts",
    });
  });

  it("groups thousands in the view count", () => {
    renderFooter({ views: 12345 });

    expect(cellValue("visits")?.textContent).toBe("12,345");
  });

  it("marks the view count pending until it arrives", () => {
    renderFooter({ views: null });

    expect(cellValue("visits")?.getAttribute("data-state")).toBe("pending");
    expect(cellValue("visits")?.textContent).toBe("…");
  });

  it("marks the view count ready once it arrives", () => {
    renderFooter({ views: 7 });

    expect(cellValue("visits")?.getAttribute("data-state")).toBe("ready");
  });

  it("shows the fallback when Abacus is unavailable", () => {
    renderFooter({ views: "∞" });

    expect(cellValue("visits")?.textContent).toBe("∞");
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
