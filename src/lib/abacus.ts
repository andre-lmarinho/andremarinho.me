export const ABACUS_BASE_URL = "https://abacus.jasoncameron.dev";
export const ABACUS_NAMESPACE = "andremarinho";
export const ABACUS_SITE_COUNTER = "portfolio";
export const ABACUS_TIMEOUT_MS = 600;
export const ABACUS_FALLBACK = "∞" as const;

export type AbacusCount = number | typeof ABACUS_FALLBACK | null;

type CounterAction = "get" | "hit";
type CounterOptions = {
  increment?: boolean;
  dedupeKey?: string;
};

const inFlight = new Map<string, Promise<number>>();

const counterUrl = (action: CounterAction, counter: string) =>
  `${ABACUS_BASE_URL}/${action}/${encodeURIComponent(ABACUS_NAMESPACE)}/${encodeURIComponent(counter)}`;

async function requestCounter(action: CounterAction, counter: string) {
  const response = await fetch(counterUrl(action, counter), {
    cache: "no-store",
    keepalive: action === "hit",
    signal: AbortSignal.timeout(ABACUS_TIMEOUT_MS),
  });

  if (action === "get" && response.status === 404) return 0;
  if (!response.ok) throw new Error("Counter unavailable");

  const payload = (await response.json()) as { value?: number | string };
  const value = Number(payload.value);

  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error("Invalid counter response");
  }

  return value;
}

export function getAbacusCount(
  counter: string,
  { increment = false, dedupeKey = counter }: CounterOptions = {},
) {
  const action =
    increment && process.env.NODE_ENV === "production" ? "hit" : "get";
  const requestKey = `${action}:${counter}:${dedupeKey}`;
  const existing = inFlight.get(requestKey);
  if (existing) return existing;

  const request = requestCounter(action, counter);
  inFlight.set(requestKey, request);

  void request.then(
    () => {
      if (inFlight.get(requestKey) === request) inFlight.delete(requestKey);
    },
    () => {
      if (inFlight.get(requestKey) === request) inFlight.delete(requestKey);
    },
  );

  return request;
}

export const postCounter = (slug: string) => `post-${slug}`;

export function formatAbacusCount(value: AbacusCount) {
  if (typeof value === "number") return value.toLocaleString("en-US");
  return value ?? "…";
}
