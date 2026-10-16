import { inject as injectAnalytics } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import {
  ABACUS_FALLBACK,
  formatAbacusCount,
  getAbacusCount,
} from "@/lib/abacus";

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
        increment: element.dataset.increment === "true",
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
}

export function initIntentPrefetch() {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (
    connection?.saveData ||
    /(^|-)2g$/.test(connection?.effectiveType ?? "")
  ) {
    return;
  }

  const prefetched = new Set<string>();
  const onIntent = (event: Event) => {
    if (event.defaultPrevented || !(event.target instanceof Element)) return;
    const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
    if (
      !anchor ||
      anchor.hasAttribute("download") ||
      anchor.dataset.prefetch === "false" ||
      (anchor.target && anchor.target !== "_self") ||
      anchor.relList.contains("external")
    ) {
      return;
    }
    const url = URL.parse(anchor.href, location.href);
    if (
      !url ||
      !/^https?:$/.test(url.protocol) ||
      url.origin !== location.origin ||
      url.hash ||
      url.href === location.href ||
      prefetched.has(url.href) ||
      prefetched.size >= 8
    ) {
      return;
    }

    prefetched.add(url.href);
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.setAttribute("as", "document");
    link.href = url.href;
    document.head.append(link);
  };

  document.addEventListener("pointerover", onIntent, { passive: true });
  document.addEventListener("focusin", onIntent);
  document.addEventListener("touchstart", onIntent, { passive: true });
  return () => {
    document.removeEventListener("pointerover", onIntent);
    document.removeEventListener("focusin", onIntent);
    document.removeEventListener("touchstart", onIntent);
  };
}

export function initNotFound() {
  const element = document.querySelector<HTMLElement>("[data-not-found]");
  if (
    !element ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }
  const glow = element.querySelector<HTMLElement>("[data-not-found-glow]");
  const digits = element.querySelectorAll<HTMLElement>(".nf-digit");
  if (!glow || digits.length !== 3) return;

  const springs = [
    { damping: 28, stiffness: 180 },
    { damping: 22, stiffness: 140 },
    { damping: 28, stiffness: 180 },
  ];
  const states = springs.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }));
  let px = 0;
  let py = 0;
  let width = 0;
  let height = 0;
  let previousTime = 0;
  let frame = 0;

  const rubberband = (offset: number, distance: number) =>
    (offset * distance * 0.55) / (distance + 0.55 * Math.abs(offset));

  const tick = (time: number) => {
    const dt = Math.min(time - previousTime, 32) / 1000;
    previousTime = time;
    let moving = false;

    for (let i = 0; i < digits.length; i++) {
      const state = states[i];
      const spring = springs[i];
      let tx = px - width / 2;
      let ty = py - height / 2;
      if (px < 0) tx += rubberband(px, width / 2);
      else if (px > width) tx += rubberband(px - width, width / 2);
      if (py < 0) ty += rubberband(py, height / 2);
      else if (py > height) ty += rubberband(py - height, height / 2);

      state.vx +=
        (-spring.damping * state.vx + spring.stiffness * (tx - state.x)) * dt;
      state.vy +=
        (-spring.damping * state.vy + spring.stiffness * (ty - state.y)) * dt;
      state.x += state.vx * dt;
      state.y += state.vy * dt;
      digits[i].style.transform =
        `translate3d(${state.x.toFixed(1)}px, ${state.y.toFixed(1)}px, 0)`;
      const speed = Math.hypot(state.vx, state.vy);
      digits[i].style.setProperty(
        "--glow",
        (Math.min(speed / 300, 1) * 0.6).toFixed(2),
      );
      if (speed > 0.05 || Math.hypot(tx - state.x, ty - state.y) > 0.05)
        moving = true;
    }

    glow.style.transform = `translate3d(${px.toFixed(0)}px, ${py.toFixed(0)}px, 0) translate(-50%, -50%)`;
    frame = moving ? requestAnimationFrame(tick) : 0;
  };

  element.addEventListener(
    "pointermove",
    (event) => {
      const rect = element.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      px = event.clientX - rect.left;
      py = event.clientY - rect.top;
      if (!frame) {
        previousTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
    },
    { passive: true },
  );
  element.addEventListener("pointerleave", () => {
    for (const state of states) {
      state.vx *= 0.3;
      state.vy *= 0.3;
    }
  });
  window.addEventListener("pagehide", () => {
    cancelAnimationFrame(frame);
    frame = 0;
  });
}

export function initBrowser() {
  // Automation still downloads and executes the same scripts; only telemetry is discarded.
  injectAnalytics({
    framework: "astro",
    beforeSend: (event) => (isAutomatedBrowser(navigator) ? null : event),
  });
  injectSpeedInsights({
    framework: "astro",
    beforeSend: (event) => (isAutomatedBrowser(navigator) ? null : event),
  });
  initIntentPrefetch();
  initNotFound();
  if (document.readyState === "complete") initPostViews();
  else window.addEventListener("load", initPostViews, { once: true });
}
