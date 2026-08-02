import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Header from "../Header";

const { usePathname } = vi.hoisted(() => ({ usePathname: vi.fn() }));

vi.mock("next/navigation", () => ({ usePathname }));

const atRoute = (pathname: string) => {
  usePathname.mockReturnValue(pathname);
  return render(<Header />);
};

const siteNav = () => screen.getByRole("navigation", { name: "Site" });
const breadcrumb = () => screen.getByRole("navigation", { name: "Breadcrumb" });

beforeEach(() => {
  // jsdom has no IntersectionObserver, and the home branch builds one on mount.
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
});

describe("Header", () => {
  describe("site nav", () => {
    it("links to every route", () => {
      atRoute("/");

      const hrefs = within(siteNav())
        .getAllByRole("link")
        .map((link) => link.getAttribute("href"));

      expect(hrefs).toEqual(["/about", "/projects", "/posts"]);
    });

    it.each([
      ["/posts", "posts"],
      ["/posts/some-slug", "posts"],
      ["/projects/some-slug", "projects"],
    ])("marks the active route on %s", (pathname, expected) => {
      atRoute(pathname);

      expect(
        within(siteNav()).getByRole("link", { current: "page" }).textContent,
      ).toBe(expected);
    });

    it("marks nothing active on the home", () => {
      atRoute("/");

      expect(
        within(siteNav()).queryByRole("link", { current: "page" }),
      ).toBeNull();
    });
  });

  describe("breadcrumb", () => {
    it("points at in-page sections on the home", () => {
      atRoute("/");

      expect(
        within(breadcrumb())
          .getByRole("link", { name: "Back to the top" })
          .getAttribute("href"),
      ).toBe("#intro");
    });

    it("links back home from anywhere else", () => {
      atRoute("/posts/some-slug");

      expect(
        within(breadcrumb())
          .getByRole("link", { name: "Home" })
          .getAttribute("href"),
      ).toBe("/");
    });

    it("renders the current section as plain text on its own listing", () => {
      atRoute("/posts");

      expect(
        within(breadcrumb()).queryByRole("link", { name: "posts" }),
      ).toBeNull();
      expect(within(breadcrumb()).getByText("posts")).toBeTruthy();
    });

    it("links up to the listing from a detail page", () => {
      atRoute("/posts/some-slug");

      expect(
        within(breadcrumb())
          .getByRole("link", { name: "posts" })
          .getAttribute("href"),
      ).toBe("/posts");
    });

    it("shows only the home crumb before a section is in view", () => {
      atRoute("/");

      expect(within(breadcrumb()).getAllByRole("link")).toHaveLength(1);
    });
  });
});
