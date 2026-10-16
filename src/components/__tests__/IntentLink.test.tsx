import { fireEvent, render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import IntentLink from "../IntentLink";

vi.mock("next/link", () => ({
  default: ({
    prefetch,
    ...props
  }: ComponentProps<"a"> & { prefetch?: boolean | "auto" | null }) => (
    <a {...props} data-prefetch={String(prefetch)} />
  ),
}));

describe("IntentLink", () => {
  it.each(["mouseEnter", "focus", "touchStart"] as const)(
    "prefetches only after %s indicates navigation intent",
    (event) => {
      render(<IntentLink href="/posts">Posts</IntentLink>);
      const link = screen.getByRole("link");

      expect(link.getAttribute("data-prefetch")).toBe("false");

      fireEvent[event](link);

      expect(link.getAttribute("data-prefetch")).toBe("null");
    },
  );

  it("preserves an explicit prefetch choice", () => {
    render(
      <IntentLink href="/posts" prefetch={false}>
        Posts
      </IntentLink>,
    );
    const link = screen.getByRole("link");

    fireEvent.mouseEnter(link);

    expect(link.getAttribute("data-prefetch")).toBe("false");
  });

  it("preserves the consumer handler and cancellation", () => {
    const onFocus = vi.fn((event: React.FocusEvent) => event.preventDefault());
    render(
      <IntentLink href="/posts" onFocus={onFocus}>
        Posts
      </IntentLink>,
    );
    const link = screen.getByRole("link");

    fireEvent.focus(link);

    expect(onFocus).toHaveBeenCalledOnce();
    expect(link.getAttribute("data-prefetch")).toBe("false");
  });
});
