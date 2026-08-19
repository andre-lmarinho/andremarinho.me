import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import Layout from "../index";

// <ViewTransition> only exists in the experimental build next.config swaps in at
// build time; here it would be undefined.
vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    ViewTransition: ({ children }: { children: ReactNode }) =>
      actual.createElement("view-transition", null, children),
  };
});

vi.mock("../Header", () => ({ default: () => <header>header</header> }));
vi.mock("../Footer", () => ({ default: () => <footer>footer</footer> }));

describe("Layout", () => {
  it("renders the children it is given", () => {
    render(
      <Layout>
        <p>content</p>
      </Layout>,
    );

    expect(screen.getByText("content")).toBeTruthy();
  });

  it("points the skip link at the main landmark", () => {
    render(
      <Layout>
        <p>content</p>
      </Layout>,
    );

    const skip = screen.getByRole("link", { name: "Skip to content" });
    const main = screen.getByRole("main");

    // Without this, dropping the id leaves both sides as "#" and this passes.
    expect(main.id).toBeTruthy();
    expect(skip.getAttribute("href")).toBe(`#${main.id}`);
  });

  it("keeps header and footer outside the transition boundary", () => {
    const { container } = render(
      <Layout>
        <p>content</p>
      </Layout>,
    );

    const boundary = container.querySelector("view-transition");

    expect(boundary?.textContent).toBe("content");
    expect(boundary?.querySelector("header")).toBeNull();
    expect(boundary?.querySelector("footer")).toBeNull();
  });
});
