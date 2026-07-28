"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// The browser only snapshots the new page once the promise given to
// startViewTransition settles, but Next's router commits asynchronously — hence
// the split: the promise is opened here and resolved by <ViewTransitions />
// once the route has actually changed. A module-level resolver rather than a
// context because only one navigation is ever in flight.
let commit: (() => void) | null = null;

export function startPageTransition(href: string) {
  if (
    commit ||
    href === location.pathname || // same route: no commit would ever close it
    typeof document.startViewTransition !== "function" ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  document.startViewTransition(
    () =>
      new Promise<void>((resolve) => {
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
  }, [pathname]);

  return null;
}
