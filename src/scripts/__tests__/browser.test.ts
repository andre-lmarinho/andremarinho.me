import { afterEach, describe, expect, it, vi } from "vitest";
import { initIntentPrefetch, initNotFound, initPostViews } from "../browser";

const { getAbacusCount } = vi.hoisted(() => ({ getAbacusCount: vi.fn() }));
vi.mock("@/lib/abacus", async () => ({
  ...(await vi.importActual<typeof import("@/lib/abacus")>("@/lib/abacus")),
  getAbacusCount,
}));

let stopPrefetch: (() => void) | undefined;

const flush = () => new Promise<void>((resolve) => queueMicrotask(resolve));

afterEach(() => {
  window.dispatchEvent(new Event("pagehide"));
  stopPrefetch?.();
  stopPrefetch = undefined;
  document.head.querySelectorAll('link[rel="prefetch"]').forEach((link) => {
    link.remove();
  });
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

    initPostViews();
    expect(observe).toHaveBeenCalledWith(element);
    expect(getAbacusCount).not.toHaveBeenCalled();
    onIntersect(
      [{ isIntersecting: false, target: element } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    expect(getAbacusCount).not.toHaveBeenCalled();
    onIntersect(
      [{ isIntersecting: true, target: element } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    await flush();

    expect(unobserve).toHaveBeenCalledWith(element);
    expect(getAbacusCount).toHaveBeenCalledWith("post-first", {
      increment: true,
    });
    expect(element.textContent).toBe("1,234 views");
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

describe("native prefetch", () => {
  const prefetches = () =>
    document.head.querySelectorAll('link[rel="prefetch"]');
  const focus = (href: string, attributes = "") => {
    document.body.innerHTML = `<a href="${href}" ${attributes}><span>Open</span></a>`;
    document
      .querySelector("span")
      ?.dispatchEvent(new Event("focusin", { bubbles: true }));
  };

  it("prefetches same-origin HTML once after intent, with a bounded budget", () => {
    stopPrefetch = initIntentPrefetch();
    expect(prefetches()).toHaveLength(0);
    focus("/posts");
    focus("/posts");
    expect(prefetches()).toHaveLength(1);
    expect(prefetches()[0].getAttribute("as")).toBe("document");
    for (let i = 0; i < 12; i++) focus(`/posts/${i}`);
    expect(prefetches()).toHaveLength(8);
  });

  it.each([
    ["https://external.example/posts", ""],
    ["/posts#section", ""],
    ["/download.pdf", "download"],
    ["/posts", 'target="_blank"'],
    ["/posts", 'data-prefetch="false"'],
    ["mailto:hello@example.com", ""],
  ])("skips ineligible destination %s %s", (href, attributes) => {
    stopPrefetch = initIntentPrefetch();
    focus(href, attributes);
    expect(prefetches()).toHaveLength(0);
  });

  it("keeps intent handling when a document returns from the back-forward cache", () => {
    stopPrefetch = initIntentPrefetch();
    window.dispatchEvent(new Event("pagehide"));
    window.dispatchEvent(new Event("pageshow"));
    focus("/posts");
    expect(prefetches()).toHaveLength(1);
  });

  it("respects a data-saving connection", () => {
    vi.stubGlobal("navigator", { connection: { saveData: true } });
    stopPrefetch = initIntentPrefetch();
    focus("/posts");
    expect(prefetches()).toHaveLength(0);
  });
});

describe("404 motion", () => {
  it("resumes pointer animation after a document returns from the back-forward cache", () => {
    document.body.innerHTML =
      '<div data-not-found><div data-not-found-glow></div><span class="nf-digit">4</span><span class="nf-digit">0</span><span class="nf-digit">4</span></div>';
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: false }));
    const frame = vi.spyOn(window, "requestAnimationFrame").mockReturnValue(1);
    const cancelFrame = vi.spyOn(window, "cancelAnimationFrame");
    const pointer = () =>
      document
        .querySelector("[data-not-found]")
        ?.dispatchEvent(
          new MouseEvent("pointermove", { clientX: 50, clientY: 50 }),
        );
    initNotFound();
    pointer();
    expect(frame).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new Event("pagehide"));
    expect(cancelFrame).toHaveBeenCalledWith(1);
    window.dispatchEvent(new Event("pageshow"));
    pointer();

    expect(frame).toHaveBeenCalledTimes(2);
  });

  it("respects reduced motion before scheduling animation", () => {
    document.body.innerHTML =
      '<div data-not-found><div data-not-found-glow></div><span class="nf-digit">4</span><span class="nf-digit">0</span><span class="nf-digit">4</span></div>';
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: true }));
    const frame = vi.spyOn(window, "requestAnimationFrame");

    initNotFound();
    document
      .querySelector("[data-not-found]")
      ?.dispatchEvent(new Event("pointermove", { bubbles: true }));

    expect(frame).not.toHaveBeenCalled();
  });
});
