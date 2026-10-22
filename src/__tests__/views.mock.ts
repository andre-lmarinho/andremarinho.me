import { vi } from "vitest";

export const viewCounts = { first: 12, second: 34 };

export const mockViews = (views: Record<string, number> = viewCounts) => {
  const fetch = vi
    .fn<typeof globalThis.fetch>()
    .mockImplementation(async () => Response.json({ views }));
  vi.stubGlobal("fetch", fetch);
  return fetch;
};
