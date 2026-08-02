import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import useViewsCount from "../useViewsCount";

const { usePathname } = vi.hoisted(() => ({ usePathname: vi.fn() }));

vi.mock("next/navigation", () => ({ usePathname }));

const respondWith = (value: unknown) => {
  const fetch = vi.fn().mockResolvedValue({ json: async () => value });
  vi.stubGlobal("fetch", fetch);
  return fetch;
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("useViewsCount", () => {
  it("starts null so the footer can show a pending state", () => {
    usePathname.mockReturnValue("/posts");
    respondWith(42);

    const { result } = renderHook(() => useViewsCount());

    expect(result.current).toBeNull();
  });

  it("returns the count the endpoint reports", async () => {
    usePathname.mockReturnValue("/posts");
    respondWith(42);

    const { result } = renderHook(() => useViewsCount());

    await waitFor(() => expect(result.current).toBe(42));
  });

  it("posts to the views endpoint with keepalive", async () => {
    usePathname.mockReturnValue("/posts");
    const fetch = respondWith(1);

    renderHook(() => useViewsCount());

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith("/api/views", {
        method: "POST",
        keepalive: true,
      }),
    );
  });

  it("stays null when the request fails", async () => {
    usePathname.mockReturnValue("/posts");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    const { result } = renderHook(() => useViewsCount());

    await vi.waitFor(() => expect(result.current).toBeNull());
  });

  it("counts a view again when the route changes", async () => {
    usePathname.mockReturnValue("/posts");
    const fetch = respondWith(1);

    const { rerender } = renderHook(() => useViewsCount());
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    usePathname.mockReturnValue("/projects");
    rerender();

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
  });
});
