import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { afterEach, describe, expect, it, vi } from "vitest";
import { initBrowser, initNotFound, initPostViews } from "../browser";

vi.mock("@vercel/analytics", () => ({ inject: vi.fn() }));
vi.mock("@vercel/speed-insights", () => ({ injectSpeedInsights: vi.fn() }));

const { getAbacusCount } = vi.hoisted(() => ({ getAbacusCount: vi.fn() }));
vi.mock("@/lib/abacus", async () => ({
  ...(await vi.importActual<typeof import("@/lib/abacus")>("@/lib/abacus")),
  getAbacusCount,
}));

let stopNotFound: (() => void) | undefined;

const flush = () => new Promise<void>((resolve) => queueMicrotask(resolve));

afterEach(() => {
  window.dispatchEvent(new Event("pagehide"));
  stopNotFound?.();
  stopNotFound = undefined;
  document.body.replaceChildren();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.clearAllMocks();
});

describe("visible post counters", () => {
  it("waits for visibility before reading or incrementing counters", async () => {
    document.body.innerHTML =
      '<span data-post-counter="post-first" data-increment="true">… views</span>';
    let onIntersect: IntersectionObserverCallback = () => {};
    const observe = vi.fn();
    const unobserve = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: IntersectionObserverCallback) {
          onIntersect = callback;
        }
        observe = observe;
        unobserve = unobserve;
      },
    );
    const element = document.querySelector("span") as HTMLElement;
    getAbacusCount.mockResolvedValue(1234);
    const entry = (isIntersecting: boolean): IntersectionObserverEntry => ({
      target: element,
      isIntersecting,
      boundingClientRect: element.getBoundingClientRect(),
      intersectionRect: element.getBoundingClientRect(),
      rootBounds: null,
      intersectionRatio: isIntersecting ? 1 : 0,
      time: 0,
    });

    initPostViews();
    expect(observe).toHaveBeenCalledWith(element);
    expect(getAbacusCount).not.toHaveBeenCalled();
    onIntersect([entry(false)], {} as IntersectionObserver);
    expect(getAbacusCount).not.toHaveBeenCalled();
    onIntersect([entry(true)], {} as IntersectionObserver);
    await flush();

    expect(unobserve).toHaveBeenCalledWith(element);
    expect(getAbacusCount).toHaveBeenCalledWith("post-first", {
      increment: true,
    });
    expect(element.textContent).toBe("1,234 views");
  });

  it("reads the real count without recording automation as a visit", async () => {
    document.body.innerHTML =
      '<span data-post-counter="post-first" data-increment="true">… views</span>';
    Reflect.deleteProperty(window, "IntersectionObserver");
    vi.stubGlobal("navigator", {
      userAgent: "Chrome-Lighthouse",
      webdriver: true,
    });
    getAbacusCount.mockResolvedValue(42);

    initPostViews();
    await flush();

    expect(getAbacusCount).toHaveBeenCalledWith("post-first", {
      increment: false,
    });
    expect(document.querySelector("span")?.textContent).toBe("42 views");
  });

  it("shows the fallback on service failure without rejecting", async () => {
    document.body.innerHTML =
      '<span data-post-counter="post-first">… views</span>';
    // Older browsers can still read counters without IntersectionObserver.
    Reflect.deleteProperty(window, "IntersectionObserver");
    getAbacusCount.mockRejectedValue(new Error("offline"));

    initPostViews();
    await flush();

    expect(getAbacusCount).toHaveBeenCalledWith("post-first", {
      increment: false,
    });
    expect(document.querySelector("span")?.textContent).toBe("∞ views");
  });
});

describe("404 motion", () => {
  const setup = ({ reduced = false, fine = true } = {}) => {
    document.body.innerHTML = "<div data-not-found><h1>404</h1></div>";
    vi.stubGlobal(
      "matchMedia",
      vi.fn((query: string) => ({
        matches: query.includes("reduced-motion") ? reduced : fine,
      })),
    );
    const element = document.querySelector("[data-not-found]") as HTMLElement;
    vi.spyOn(element, "getBoundingClientRect").mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 100,
    } as DOMRect);
    stopNotFound = initNotFound();
    const move = (pointerType = "mouse") => {
      const event = Object.assign(
        new MouseEvent("pointermove", {
          clientX: 200,
          clientY: 0,
          cancelable: true,
        }),
        { pointerType },
      );
      element.dispatchEvent(event);
      return event;
    };
    return { element, move };
  };

  it("moves at most 12px and resets on pointer leave", () => {
    const { element, move } = setup();
    move();
    expect(element.style.getPropertyValue("--nf-x")).toBe("12px");
    expect(element.style.getPropertyValue("--nf-y")).toBe("-12px");
    element.dispatchEvent(new Event("pointerleave"));
    expect(element.style.cssText).toBe("");
    stopNotFound?.();
    move();
    expect(element.style.cssText).toBe("");
  });

  it("resumes after a document returns from the back-forward cache", () => {
    const { element, move } = setup();
    move();
    window.dispatchEvent(new Event("pagehide"));
    expect(element.style.cssText).toBe("");
    window.dispatchEvent(new Event("pageshow"));
    move();
    expect(element.style.getPropertyValue("--nf-x")).toBe("12px");
  });

  it.each(["touch", "pen"])(
    "ignores %s input without preventing native gestures",
    (pointerType) => {
      const { element, move } = setup();
      expect(move(pointerType).defaultPrevented).toBe(false);
      expect(element.style.cssText).toBe("");
    },
  );

  it.each([{ reduced: true }, { fine: false }])(
    "disables motion for %o",
    (preferences) => {
      const { element, move } = setup(preferences);
      move();
      expect(element.style.cssText).toBe("");
    },
  );
});

it("initializes each swapped page without duplicating SDKs or retaining old observers", async () => {
  vi.spyOn(document, "readyState", "get").mockReturnValue("complete");
  const disconnect = vi.fn();
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(private callback: IntersectionObserverCallback) {}
      observe(element: Element) {
        this.callback(
          [
            {
              target: element,
              isIntersecting: true,
            } as IntersectionObserverEntry,
          ],
          this as unknown as IntersectionObserver,
        );
      }
      unobserve() {}
      disconnect = disconnect;
    },
  );
  getAbacusCount.mockResolvedValue(42);
  document.body.innerHTML = '<span data-post-counter="first">… views</span>';
  initBrowser();
  document.dispatchEvent(new Event("astro:page-load"));
  await flush();
  expect(document.body.textContent).toBe("42 views");

  const sdk = document.createElement("script");
  sdk.dataset.sdkn = "@vercel/analytics";
  sdk.src = "/_vercel/insights/script.js";
  document.head.append(sdk);
  const newDocument = document.implementation.createHTMLDocument();
  document.dispatchEvent(
    Object.assign(new Event("astro:before-swap"), { newDocument }),
  );
  expect(disconnect).toHaveBeenCalledTimes(1);
  expect(
    newDocument.head.querySelector("script")?.dataset.astroTransitionPersist,
  ).toBe("@vercel/analytics");
  expect(newDocument.head.querySelector("script")?.dataset.astroExec).toBe("");
  sdk.remove();

  document.body.innerHTML = '<span data-post-counter="second">… views</span>';
  document.dispatchEvent(new Event("astro:page-load"));
  await flush();
  expect(document.body.textContent).toBe("42 views");
  expect(getAbacusCount.mock.calls.map(([key]) => key)).toEqual([
    "first",
    "second",
  ]);
  expect(disconnect).toHaveBeenCalledTimes(1);
  expect(inject).toHaveBeenCalledTimes(1);
  expect(injectSpeedInsights).toHaveBeenCalledTimes(1);
  document.dispatchEvent(
    Object.assign(new Event("astro:before-swap"), { newDocument }),
  );
  expect(disconnect).toHaveBeenCalledTimes(2);
});
