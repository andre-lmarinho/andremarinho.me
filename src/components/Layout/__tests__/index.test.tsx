import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Layout from "../index";

vi.mock("../Header", () => ({ default: () => <header>header</header> }));
vi.mock("../Footer", () => ({ default: () => <footer>footer</footer> }));

describe("Layout", () => {
  it("renders the children it is given", () => {
    render(
      <Layout pathname="/">
        <p>content</p>
      </Layout>,
    );

    expect(screen.getByText("content")).toBeTruthy();
  });

  it("points the skip link at the main landmark", () => {
    render(
      <Layout pathname="/">
        <p>content</p>
      </Layout>,
    );

    const skip = screen.getByRole("link", { name: "Skip to content" });
    const main = screen.getByRole("main");

    // Without this, dropping the id leaves both sides as "#" and this passes.
    expect(main.id).toBeTruthy();
    expect(skip.getAttribute("href")).toBe(`#${main.id}`);
  });

  it("keeps header and footer outside the main landmark", () => {
    const { container } = render(
      <Layout pathname="/">
        <p>content</p>
      </Layout>,
    );

    const boundary = container.querySelector("main");

    expect(boundary?.textContent).toBe("content");
    expect(boundary?.querySelector("header")).toBeNull();
    expect(boundary?.querySelector("footer")).toBeNull();
  });
});
