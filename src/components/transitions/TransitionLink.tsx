"use client";

import Link from "next/link";
import { startTransition } from "react";
import { settleScrollForTransition } from "./utils";

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
        if (event.defaultPrevented) return;
        // Outside startTransition this would be batched with the navigation and
        // still land inside the snapshot window.
        startTransition(() => {
          settleScrollForTransition();
        });
      }}
    />
  );
}
