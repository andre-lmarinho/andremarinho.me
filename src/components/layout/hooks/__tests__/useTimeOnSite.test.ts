import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useTimeOnSite from "../useTimeOnSite";

const TIME_KEY = "total-time-on-site";

const advance = (seconds: number) =>
  act(() => {
    vi.advanceTimersByTime(seconds * 1000);
  });

beforeEach(() => {
  vi.useFakeTimers();
  localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("useTimeOnSite", () => {
  it("starts at zero", () => {
    const { result } = renderHook(() => useTimeOnSite());

    expect(result.current).toBe("00:00");
  });

  it("counts seconds and minutes", () => {
    const { result } = renderHook(() => useTimeOnSite());

    advance(5);
    expect(result.current).toBe("00:05");

    advance(56);
    expect(result.current).toBe("01:01");
  });

  it("adds an hour segment only past the hour", () => {
    const { result } = renderHook(() => useTimeOnSite());

    advance(3599);
    expect(result.current).toBe("59:59");

    advance(1);
    expect(result.current).toBe("1:00:00");
  });

  it("resumes from the time already stored", () => {
    localStorage.setItem(TIME_KEY, "125");

    const { result } = renderHook(() => useTimeOnSite());

    expect(result.current).toBe("02:05");
    advance(10);
    expect(result.current).toBe("02:15");
  });

  it("survives a corrupted stored value", () => {
    localStorage.setItem(TIME_KEY, "not-a-number");

    const { result } = renderHook(() => useTimeOnSite());

    expect(result.current).toBe("00:00");
  });

  it("saves the elapsed total on unmount", () => {
    const { unmount } = renderHook(() => useTimeOnSite());

    advance(30);
    unmount();

    expect(localStorage.getItem(TIME_KEY)).toBe("30");
  });

  it("adds this visit to the stored total on unmount", () => {
    localStorage.setItem(TIME_KEY, "100");

    const { unmount } = renderHook(() => useTimeOnSite());

    advance(20);
    unmount();

    expect(localStorage.getItem(TIME_KEY)).toBe("120");
  });
});
