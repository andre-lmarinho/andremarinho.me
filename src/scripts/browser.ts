const postViews: Record<string, number> = Object.create(null);
let readingViews: Promise<void> | undefined;
let readAgainAt = 0;

const renderPostViews = (root: ParentNode) => {
  for (const element of root.querySelectorAll<HTMLElement>(
    "[data-post-counter]",
  )) {
    const count = postViews[element.dataset.postCounter ?? ""];
    if (!Number.isSafeInteger(count) || count < 0) continue;
    element.textContent = `${count.toLocaleString("en-US")} views`;
  }
};

async function loadPostViews(slug?: string) {
  const response = await fetch(
    slug ? `/api/views/${encodeURIComponent(slug)}` : "/api/views",
    { method: slug ? "POST" : "GET", cache: "no-store", keepalive: !!slug },
  );
  if (!response.ok) throw new Error("Views unavailable");
  const { views } = await response.json();
  if (
    !views ||
    typeof views !== "object" ||
    Array.isArray(views) ||
    Object.values(views).some(
      (count) =>
        typeof count !== "number" || !Number.isSafeInteger(count) || count < 0,
    )
  )
    throw new Error("Invalid view counts");
  for (const [key, count] of Object.entries<number>(views)) {
    // A response can arrive after a newer increment.
    postViews[key] = Math.max(postViews[key] ?? 0, count);
  }
  renderPostViews(document);
}

const refreshPostViews = () => {
  if (!document.querySelector("[data-post-counter]")) return;
  if (!readingViews && Date.now() >= readAgainAt)
    readingViews = loadPostViews()
      .then(() => {
        readAgainAt = Date.now() + 2000;
      })
      .catch(() => {})
      .finally(() => {
        readingViews = undefined;
      });
  return readingViews;
};

export function initPostViews() {
  renderPostViews(document);
  const post = document.querySelector<HTMLElement>(
    "[data-post-counter][data-increment='true']",
  );
  return post
    ? loadPostViews(post.dataset.postCounter).catch(() => {})
    : refreshPostViews();
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
  const controller = new AbortController();
  const options = { signal: controller.signal };
  let stopNotFound: (() => void) | undefined;
  const cleanup = () => {
    stopNotFound?.();
    stopNotFound = undefined;
  };
  const initPage = () => {
    cleanup();
    stopNotFound = initNotFound();
    initPostViews();
  };
  document.addEventListener("astro:page-load", initPage, options);
  document.addEventListener(
    "astro:before-preparation",
    (event) => {
      if (
        event.navigationType !== "traverse" &&
        event.from.pathname !== event.to.pathname
      )
        window.scrollTo({ top: 0, behavior: "instant" });
    },
    options,
  );
  document.addEventListener(
    "astro:before-swap",
    (event) => {
      cleanup();
      if (event.newDocument) renderPostViews(event.newDocument);
    },
    options,
  );
  window.addEventListener(
    "pageshow",
    (event) => {
      if (event.persisted) initPage();
    },
    options,
  );
  window.addEventListener("focus", refreshPostViews, options);
  window.addEventListener("online", refreshPostViews, options);
  document.addEventListener(
    "visibilitychange",
    () => {
      if (!document.hidden) void refreshPostViews();
    },
    options,
  );
  return () => {
    controller.abort();
    cleanup();
  };
}
