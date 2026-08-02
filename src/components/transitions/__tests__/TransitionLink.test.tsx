import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import TransitionLink from "../TransitionLink";

const atScroll = (scrollY: number) => {
  vi.spyOn(window, "scrollY", "get").mockReturnValue(scrollY);
  return vi.spyOn(window, "scrollTo").mockImplementation(() => {});
};

// Suppresses jsdom's "Not implemented: navigation". Must be on the document, not
// the link: React delegates to the root, so an element listener would run first
// and hand the component an already-defaultPrevented click.
const suppressNavigation = () => {
  const cancel = (event: Event) => event.preventDefault();
  document.addEventListener("click", cancel);
  return () => document.removeEventListener("click", cancel);
};

const clickLink = () => {
  const stop = suppressNavigation();
  fireEvent.click(screen.getByRole("link"));
  stop();
};

describe("TransitionLink", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("settles the scroll before navigating", () => {
    const scrollTo = atScroll(500);
    render(<TransitionLink href="/posts">posts</TransitionLink>);

    clickLink();

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
  });

  it("leaves the scroll alone when already at the top", () => {
    const scrollTo = atScroll(0);
    render(<TransitionLink href="/posts">posts</TransitionLink>);

    clickLink();

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("stays out of the way when the consumer cancels the click", () => {
    const scrollTo = atScroll(500);
    render(
      <TransitionLink href="/posts" onClick={(event) => event.preventDefault()}>
        posts
      </TransitionLink>,
    );

    clickLink();

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("still calls the handler it was given", () => {
    atScroll(500);
    const onClick = vi.fn();
    render(
      <TransitionLink href="/posts" onClick={onClick}>
        posts
      </TransitionLink>,
    );

    clickLink();

    expect(onClick).toHaveBeenCalledOnce();
  });
});
