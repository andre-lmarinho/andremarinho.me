import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import useAbacusCount from "../useAbacusCount";

const { getAbacusCount } = vi.hoisted(() => ({
  getAbacusCount: vi.fn(),
}));

vi.mock("@/lib/abacus", () => ({
  ABACUS_FALLBACK: "∞",
  getAbacusCount,
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe("useAbacusCount", () => {
  it("starts pending and returns the reported count", async () => {
    getAbacusCount.mockResolvedValue(42);

    const { result } = renderHook(() => useAbacusCount("portfolio"));

    expect(result.current).toBeNull();
    await waitFor(() => expect(result.current).toBe(42));
  });

  it("forwards increment and deduplication options", async () => {
    getAbacusCount.mockResolvedValue(1);

    renderHook(() =>
      useAbacusCount("portfolio", {
        increment: true,
        dedupeKey: "/posts",
      }),
    );

    await waitFor(() =>
      expect(getAbacusCount).toHaveBeenCalledWith("portfolio", {
        increment: true,
        dedupeKey: "/posts",
      }),
    );
  });

  it("uses the historical fallback when the request fails", async () => {
    getAbacusCount.mockRejectedValue(new Error("offline"));

    const { result } = renderHook(() => useAbacusCount("portfolio"));

    await waitFor(() => expect(result.current).toBe("∞"));
  });

  it("loads again when a primitive option changes", async () => {
    getAbacusCount.mockResolvedValue(1);

    const { rerender } = renderHook(
      ({ dedupeKey }) =>
        useAbacusCount("portfolio", { increment: true, dedupeKey }),
      { initialProps: { dedupeKey: "/posts" } },
    );
    await waitFor(() => expect(getAbacusCount).toHaveBeenCalledTimes(1));

    rerender({ dedupeKey: "/projects" });

    await waitFor(() => expect(getAbacusCount).toHaveBeenCalledTimes(2));
  });
});
