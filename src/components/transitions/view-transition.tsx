"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// The browser holds the old snapshot until the promise given to
// startViewTransition settles, so it is opened here and resolved once the route
// has actually changed. Module-level: only one navigation is ever in flight.
let commit: (() => void) | null = null;
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
        // A production build commits before running this callback, so the
        // effect below already fired against a null `commit` and nothing else
        // would ever resolve. Dev commits after, hence the two paths.
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

  // Clearing unconditionally self-heals an abandoned transition: worst case is
  // one un-animated navigation, never a frozen page.
  // biome-ignore lint/correctness/useExhaustiveDependencies: closes the transition on route change
  useEffect(() => {
    commit?.();
    commit = null;
    openedAt = null;
  }, [pathname]);

  return null;
}
