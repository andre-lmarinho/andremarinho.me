import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import IntentLink from "../IntentLink";

describe("IntentLink", () => {
  it("renders a native link with its attributes", () => {
    render(
      <IntentLink href="/posts" aria-current="page" className="posts">
        Posts
      </IntentLink>,
    );
    const link = screen.getByRole("link", { name: "Posts" });
    expect(link.getAttribute("href")).toBe("/posts");
    expect(link.getAttribute("aria-current")).toBe("page");
    expect(link.className).toBe("posts");
  });

  it("preserves an explicit prefetch opt-out", () => {
    render(
      <IntentLink href="/posts" prefetch={false}>
        Posts
      </IntentLink>,
    );
    expect(screen.getByRole("link").dataset.prefetch).toBe("false");
  });
});
