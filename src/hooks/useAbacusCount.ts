"use client";

import { useEffect, useState } from "react";
import {
  ABACUS_FALLBACK,
  type AbacusCount,
  getAbacusCount,
} from "@/lib/abacus";

type Options = {
  increment?: boolean;
  dedupeKey?: string;
};

export default function useAbacusCount(
  counter: string,
  { increment = false, dedupeKey = counter }: Options = {},
) {
  const [value, setValue] = useState<AbacusCount>(null);

  useEffect(() => {
    let active = true;

    getAbacusCount(counter, { increment, dedupeKey })
      .then((count) => {
        if (active) setValue(count);
      })
      .catch(() => {
        if (active) setValue(ABACUS_FALLBACK);
      });

    return () => {
      active = false;
    };
  }, [counter, dedupeKey, increment]);

  return value;
}
