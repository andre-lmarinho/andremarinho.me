import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import TransitionLink from "../TransitionLink";

// Spies rather than assignment: restoreAllMocks puts the originals back, where a
// direct `window.scrollTo = fn` would leak into every later test in this worker.
const atScroll = (scrollY: number) => {
  vi.spyOn(window, "scrollY", "get").mockReturnValue(scrollY);
  return vi.spyOn(window, "scrollTo").mockImplementation(() => {});
};

// jsdom cannot navigate and logs "Not implemented" at every anchor click.
// Cancelling on the document rather than on the link matters: React delegates to
// the root, so a listener on the element itself would run first and hand the
// component a click that was already defaultPrevented — masking the very thing
// one of these tests asserts. The listener is torn down after each test so it
// cannot leak.
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
