import {
  ABACUS_FALLBACK,
  formatAbacusCount,
  getAbacusCount,
} from "@/lib/abacus";

declare global {
  interface Window {
    umamiBeforeSend: (type: string, payload: unknown) => unknown;
  }
}

export const isAutomatedBrowser = ({
  userAgent,
  webdriver,
}: Pick<Navigator, "userAgent" | "webdriver">) =>
  webdriver || /(?:Chrome-Lighthouse|HeadlessChrome)/i.test(userAgent);

export function initPostViews() {
  const counters = document.querySelectorAll<HTMLElement>(
    "[data-post-counter]",
  );
  if (!counters.length) return;

  const update = async (element: HTMLElement) => {
    try {
      const count = await getAbacusCount(element.dataset.postCounter ?? "", {
        increment:
          element.dataset.increment === "true" &&
          !isAutomatedBrowser(navigator),
      });
      element.textContent = `${formatAbacusCount(count)} views`;
    } catch {
      element.textContent = `${ABACUS_FALLBACK} views`;
    }
  };

  if (!("IntersectionObserver" in window)) {
    for (const element of counters) void update(element);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      void update(entry.target as HTMLElement);
    }
  });
  for (const element of counters) observer.observe(element);
  return () => observer.disconnect();
}

export function initNotFound() {
  const element = document.querySelector<HTMLElement>("[data-not-found]");
  if (
    !element ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    return;
  }
  const controller = new AbortController();
  const reset = () => {
    element.style.removeProperty("--nf-x");
    element.style.removeProperty("--nf-y");
  };
  element.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType !== "mouse") return;
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      element.style.setProperty(
        "--nf-x",
        `${Math.max(-12, Math.min(12, ((event.clientX - rect.left) / rect.width - 0.5) * 24))}px`,
      );
      element.style.setProperty(
        "--nf-y",
        `${Math.max(-12, Math.min(12, ((event.clientY - rect.top) / rect.height - 0.5) * 24))}px`,
      );
    },
    { passive: true, signal: controller.signal },
  );
  element.addEventListener("pointerleave", reset, {
    signal: controller.signal,
  });
  window.addEventListener("pagehide", reset, { signal: controller.signal });
  return () => {
    reset();
    controller.abort();
  };
}

export function initBrowser() {
  window.umamiBeforeSend = (_type, payload) => {
    // Telemetry hook read by the Umami tracker (data-before-send).
    return isAutomatedBrowser(navigator) ? undefined : payload;
  };
  let stopCounters: (() => void) | undefined;
  let stopNotFound: (() => void) | undefined;
  const startCounters = () => {
    stopCounters = initPostViews();
  };
  const cleanup = () => {
    window.removeEventListener("load", startCounters);
    stopCounters?.();
    stopNotFound?.();
    stopCounters = undefined;
    stopNotFound = undefined;
  };
  const initPage = () => {
    cleanup();
    stopNotFound = initNotFound();
    if (document.readyState === "complete") startCounters();
    else window.addEventListener("load", startCounters, { once: true });
  };
  document.addEventListener("astro:page-load", initPage);
  document.addEventListener("astro:before-preparation", (event) => {
    if (
      event.navigationType !== "traverse" &&
      event.from.pathname !== event.to.pathname
    )
      window.scrollTo({ top: 0, behavior: "instant" });
  });
  document.addEventListener("astro:before-swap", () => cleanup());
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) initPage();
  });
}
