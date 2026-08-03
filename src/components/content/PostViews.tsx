"use client";

import useAbacusCount from "@/hooks/useAbacusCount";
import { formatAbacusCount, postCounter } from "@/lib/abacus";

export default function PostViews({
  slug,
  increment = false,
}: {
  slug: string;
  increment?: boolean;
}) {
  const views = useAbacusCount(postCounter(slug), { increment });

  return <>{formatAbacusCount(views)} views</>;
}
