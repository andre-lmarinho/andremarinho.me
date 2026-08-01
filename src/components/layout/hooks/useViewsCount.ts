"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function useViewsCount() {
  const pathname = usePathname();
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    if (!pathname) return;

    fetch("/api/views", {
      method: "POST",
      keepalive: true,
    })
      .then((response) => response.json() as Promise<number | null>)
      .then(setViews)
      .catch(() => {});
  }, [pathname]);

  return views;
}
