import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockViews, viewCounts } from "@/__tests__/views.mock";
import { initNotFound } from "../browser";

let browser: typeof import("../browser");
let stopBrowser: (() => void) | undefined;
let stopNotFound: (() => void) | undefined;

const counter = (slug = "first") =>
  document.querySelector<HTMLElement>(`[data-post-counter="${slug}"]`);

const openPage = (slugs = ["first"], increment = false) => {
  const newDocument = document.implementation.createHTMLDocument();
  newDocument.body.innerHTML = slugs
    .map(
      (slug) =>
        `<span data-post-counter="${slug}"${increment ? ' data-increment="true"' : ""}></span>`,
    )
    .join("");
  document.dispatchEvent(
    Object.assign(new Event("astro:before-swap"), { newDocument }),
  );
  document.body.innerHTML = newDocument.body.innerHTML;
  document.dispatchEvent(new Event("astro:page-load"));
};

afterEach(() => {
  stopBrowser?.();
  stopBrowser = undefined;
  window.dispatchEvent(new Event("pagehide"));
  stopNotFound?.();
  stopNotFound = undefined;
  document.body.replaceChildren();
  localStorage.clear();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.clearAllMocks();
});

describe("post counters", () => {
  beforeEach(async () => {
    vi.resetModules();
    browser = await import("../browser");
    stopBrowser = browser.initBrowser();
  });

  it("updates all eight counters with one aggregate GET", async () => {
    const views = Object.fromEntries(
      Array.from({ length: 8 }, (_, i) => [`post-${i}`, 1000 + i]),
    );
    const fetch = mockViews(views);
    openPage(Object.keys(views));
    await vi.waitFor(() =>
      expect(counter("post-7")?.textContent).toBe("1,007 views"),
    );
    expect(fetch).toHaveBeenCalledExactlyOnceWith(
      "/api/views",
      expect.objectContaining({ method: "GET" }),
    );
    expect(
      [...document.querySelectorAll("span")].map(
        (element) => element.textContent,
      ),
    ).toEqual(
      Object.values(views).map(
        (count) => `${count.toLocaleString("en-US")} views`,
      ),
    );
  });

  it("shares a pending GET and reuses its counts during rapid navigation", async () => {
    const response = Promise.withResolvers<Response>();
    const fetch = mockViews().mockReturnValueOnce(response.promise);
    openPage();
    openPage(["first", "second"]);
    window.dispatchEvent(new Event("focus"));
    window.dispatchEvent(new Event("online"));
    expect(fetch).toHaveBeenCalledTimes(1);
    response.resolve(Response.json({ views: viewCounts }));
    await vi.waitFor(() =>
      expect(counter("second")?.textContent).toBe("34 views"),
    );
    openPage();
    expect(counter()?.textContent).toBe("12 views");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it.each(["navigation", "focus", "online", "visibilitychange"])(
    "refreshes on %s after the two-second deduplication window",
    async (event) => {
      const fetch = mockViews();
      openPage();
      await vi.waitFor(() => expect(counter()?.textContent).toBe("12 views"));
      vi.spyOn(Date, "now").mockReturnValue(Date.now() + 2001);
      fetch.mockImplementation(async () =>
        Response.json({ views: { first: 13 } }),
      );
      if (event === "navigation") openPage();
      else if (event === "visibilitychange") {
        vi.spyOn(document, "hidden", "get").mockReturnValue(false);
        document.dispatchEvent(new Event(event));
      } else window.dispatchEvent(new Event(event));
      await vi.waitFor(() => expect(counter()?.textContent).toBe("13 views"));
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenNthCalledWith(
        2,
        "/api/views",
        expect.objectContaining({ method: "GET" }),
      );
    },
  );

  it("does not refresh a hidden page or a page without counters", async () => {
    const fetch = mockViews();
    openPage();
    await vi.waitFor(() => expect(counter()?.textContent).toBe("12 views"));
    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 2001);
    vi.spyOn(document, "hidden", "get").mockReturnValue(true);
    document.dispatchEvent(new Event("visibilitychange"));
    openPage([]);
    window.dispatchEvent(new Event("online"));
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it.each([false, true])(
    "POSTs on every opening, including owner and automation (webdriver=%s)",
    async (webdriver) => {
      vi.stubGlobal("navigator", { userAgent: "Chrome", webdriver });
      localStorage.setItem("umami.disabled", "1");
      const fetch = mockViews()
        .mockImplementationOnce(async () =>
          Response.json({ views: { first: 13 } }),
        )
        .mockImplementationOnce(async () =>
          Response.json({ views: { first: 14 } }),
        );
      for (let opening = 0; opening < 2; opening++) {
        openPage(["first"], true);
        await vi.waitFor(() =>
          expect(counter()?.textContent).toBe(`${13 + opening} views`),
        );
      }
      expect(fetch).toHaveBeenCalledTimes(2);
      for (const call of [1, 2])
        expect(fetch).toHaveBeenNthCalledWith(
          call,
          "/api/views/first",
          expect.objectContaining({ method: "POST", keepalive: true }),
        );
    },
  );

  it("uses the POST response to update the shared cache without an extra GET", async () => {
    const fetch = mockViews();
    openPage();
    await vi.waitFor(() => expect(counter()?.textContent).toBe("12 views"));
    const response = Promise.withResolvers<Response>();
    fetch.mockReturnValueOnce(response.promise);
    openPage(["first"], true);
    expect(counter()?.textContent).toBe("12 views");
    response.resolve(Response.json({ views: { first: 13 } }));
    await vi.waitFor(() => expect(counter()?.textContent).toBe("13 views"));
    openPage();
    expect(counter()?.textContent).toBe("13 views");
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  const failures = [
    ["network", () => Promise.reject(new Error("offline"))],
    ["HTTP", () => Response.json({ error: "unavailable" }, { status: 503 })],
    ["JSON", () => new Response("invalid JSON")],
    ["counts", () => Response.json({ views: { first: "invalid" } })],
  ] satisfies [string, () => Response | Promise<Response>][];

  it.each(failures)(
    "leaves an unknown count blank on %s failure and waits for an approved event",
    async (_kind, fail) => {
      const fetch = mockViews().mockImplementationOnce(async () => fail());
      vi.useFakeTimers();
      openPage();
      await vi.runAllTimersAsync();
      await vi.advanceTimersByTimeAsync(10000);
      expect(counter()?.textContent).toBe("");
      expect(fetch).toHaveBeenCalledTimes(1);
      window.dispatchEvent(new Event("online"));
      await vi.runAllTimersAsync();
      expect(counter()?.textContent).toBe("12 views");
      expect(fetch).toHaveBeenCalledTimes(2);
    },
  );

  it.each(failures)(
    "preserves an existing count on %s failure",
    async (_kind, fail) => {
      const fetch = mockViews();
      openPage();
      await vi.waitFor(() => expect(counter()?.textContent).toBe("12 views"));
      vi.spyOn(Date, "now").mockReturnValue(Date.now() + 2001);
      fetch.mockImplementationOnce(async () => fail());
      await browser.initPostViews();
      expect(counter()?.textContent).toBe("12 views");
      expect(fetch).toHaveBeenCalledTimes(2);
    },
  );

  it("preserves the last value when an increment fails, without retrying", async () => {
    const fetch = mockViews();
    openPage();
    await vi.waitFor(() => expect(counter()?.textContent).toBe("12 views"));
    counter()?.setAttribute("data-increment", "true");
    fetch.mockRejectedValueOnce(new Error("connection lost"));
    await browser.initPostViews();
    expect(counter()?.textContent).toBe("12 views");
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenLastCalledWith(
      "/api/views/first",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("does not replace a newer POST count with a late GET response", async () => {
    const response = Promise.withResolvers<Response>();
    mockViews()
      .mockReturnValueOnce(response.promise)
      .mockImplementationOnce(async () =>
        Response.json({ views: { first: 13 } }),
      );
    document.body.innerHTML = '<span data-post-counter="first"></span>';
    const reading = browser.initPostViews();
    counter()?.setAttribute("data-increment", "true");
    await browser.initPostViews();
    response.resolve(Response.json({ views: { first: 12 } }));
    await reading;
    expect(counter()?.textContent).toBe("13 views");
  });

  it("does not replace a newer opening's count with a late POST response", async () => {
    const response = Promise.withResolvers<Response>();
    const fetch = mockViews()
      .mockReturnValueOnce(response.promise)
      .mockImplementationOnce(async () =>
        Response.json({ views: { first: 14 } }),
      );
    document.body.innerHTML =
      '<span data-post-counter="first" data-increment="true"></span>';
    const first = browser.initPostViews();
    await browser.initPostViews();
    response.resolve(Response.json({ views: { first: 13 } }));
    await first;
    expect(counter()?.textContent).toBe("14 views");
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("renders zero when the API returns zero and leaves an unknown field blank", async () => {
    mockViews({ first: 0 });
    openPage(["first", "unknown"]);
    await vi.waitFor(() => expect(counter()?.textContent).toBe("0 views"));
    expect(counter("unknown")?.textContent).toBe("");
  });

  it("restores cached numbers into the incoming document before Astro swaps it", async () => {
    const fetch = mockViews();
    openPage();
    await vi.waitFor(() => expect(counter()?.textContent).toBe("12 views"));
    const newDocument = document.implementation.createHTMLDocument();
    newDocument.body.innerHTML = '<span data-post-counter="first"></span>';
    document.dispatchEvent(
      Object.assign(new Event("astro:before-swap"), { newDocument }),
    );
    expect(newDocument.querySelector("span")?.textContent).toBe("12 views");
    expect(fetch).toHaveBeenCalledTimes(1);
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
