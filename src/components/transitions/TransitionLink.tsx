"use client";

import Link from "next/link";
import { startTransition } from "react";

// View transition groups are positioned relative to the viewport, so the scroll
// has to settle before the browser takes its snapshots. Left alone, arriving at
// a page shorter than the current offset makes the browser clamp the scroll
// mid-animation — /posts only scrolls 123px, so a click from 900px down slid
// every title by that difference on top of its own movement.
//
// A wrapper rather than onNavigate at each call site: most pages that link are
// Server Components, which cannot pass a function prop.
export default function TransitionLink({
  href,
  onClick,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || window.scrollY === 0) return;
        // Outside startTransition this would be batched with the navigation and
        // still land inside the snapshot window.
        startTransition(() => {
          window.scrollTo({ top: 0, behavior: "instant" });
        });
      }}
    />
  );
}
