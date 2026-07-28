"use client";

import Link from "next/link";
import { startPageTransition } from "@/lib/view-transition";

// A wrapper rather than onNavigate at each call site: most of the pages that
// link are Server Components, which cannot pass a function prop.
export default function TransitionLink({
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      href={href}
      // Object hrefs skip the same-route guard inside startPageTransition.
      // Nothing in this repo passes one.
      onNavigate={() =>
        startPageTransition(typeof href === "string" ? href : "")
      }
    />
  );
}
