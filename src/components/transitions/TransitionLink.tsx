"use client";

import Link from "next/link";
import { startTransition } from "react";
import { settleScrollForTransition } from "./utils";

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
        // Outside startTransition this batches with the navigation and still
        // lands inside the snapshot window.
        startTransition(() => {
          settleScrollForTransition();
        });
      }}
    />
  );
}
