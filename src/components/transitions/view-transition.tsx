"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// The browser only snapshots the new page once the promise given to
// startViewTransition settles, but Next's router commits asynchronously — hence
// the split: the promise is opened here and resolved by <ViewTransitions />
// once the route has actually changed. A module-level resolver rather than a
// context because only one navigation is ever in flight.
let commit: (() => void) | null = null;

// The route the transition was opened from. The callback compares against it
// rather than against the href, so a commit that already happened is detected
// no matter which route the router landed on.
let openedAt: string | null = null;

export function startPageTransition(href: string) {
  if (
    commit ||
    href === location.pathname || // same route: no commit would ever close it
    typeof document.startViewTransition !== "function" ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  openedAt = location.pathname;

  document.startViewTransition(
    () =>
      new Promise<void>((resolve) => {
        // In a production build the router commits synchronously, so the URL
        // has already changed by the time this callback runs and the pathname
        // effect below has fired against a still-null `commit`. Nothing would
        // ever resolve this promise, and the page stays frozen on the old
        // snapshot until the browser times the transition out. Dev builds
        // commit asynchronously and run this callback first, which is why the
        // race only ever showed up in production.
        if (location.pathname !== openedAt) {
          resolve();
          return;
        }
        commit = resolve;
      }),
  );
}

export function ViewTransitions() {
  const pathname = usePathname();

  // Clearing unconditionally also self-heals a transition the browser
  // abandoned: worst case is one un-animated navigation, never a frozen page.
  // biome-ignore lint/correctness/useExhaustiveDependencies: closes the transition on route change
  useEffect(() => {
    commit?.();
    commit = null;
    openedAt = null;
  }, [pathname]);

  return null;
}
