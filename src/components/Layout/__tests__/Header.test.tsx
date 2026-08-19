import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Header from "../Header";

const { usePathname } = vi.hoisted(() => ({ usePathname: vi.fn() }));

vi.mock("next/navigation", () => ({ usePathname }));

const atRoute = (pathname: string) => {
  usePathname.mockReturnValue(pathname);
  return render(<Header />);
};

const siteNav = () => screen.getByRole("navigation", { name: "Site" });

describe("Header", () => {
  it("links to every route", () => {
    atRoute("/");

    const hrefs = within(siteNav())
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));

    expect(hrefs).toEqual(["/", "/about", "/projects", "/posts"]);
  });

  it.each([
    ["/", "home"],
    ["/posts", "posts"],
    ["/posts/some-slug", "posts"],
    ["/projects/some-slug", "projects"],
  ])("marks %s as active", (pathname, expected) => {
    atRoute(pathname);

    expect(
      within(siteNav()).getByRole("link", { current: "page" }).textContent,
    ).toBe(expected);
  });
});
