import { afterEach, describe, expect, it, vi } from "vitest";
import { settleScrollForTransition } from "../utils";

describe("settleScrollForTransition", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const stubScroll = (scrollY: number) => {
    const scrollTo = vi.fn();
    vi.stubGlobal("window", { scrollY, scrollTo });
    return scrollTo;
  };

  it("scrolls to the top when the page is scrolled", () => {
    const scrollTo = stubScroll(500);

    expect(settleScrollForTransition()).toBe(true);
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
  });

  it("scrolls instantly, never smoothly", () => {
    const scrollTo = stubScroll(500);

    settleScrollForTransition();

    expect(scrollTo.mock.calls[0][0]).toHaveProperty("behavior", "instant");
  });

  it("does nothing when already at the top", () => {
    const scrollTo = stubScroll(0);

    expect(settleScrollForTransition()).toBe(false);
    expect(scrollTo).not.toHaveBeenCalled();
  });
});
