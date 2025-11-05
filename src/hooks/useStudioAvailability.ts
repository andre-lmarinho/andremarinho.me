'use client';

import { useEffect, useState } from 'react';

const toSlots = (value: unknown): number => {
  if (typeof value === 'number') return Number.isFinite(value) ? Math.max(0, Math.trunc(value)) : 0;
  if (typeof value === 'string') return toSlots(Number.parseInt(value, 10));
  return 0;
};

export const useStudioAvailability = () => {
  const [slots, setSlots] = useState(0);
  useEffect(() => {
    fetch('/api/availability')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data === 'object' && 'slots' in data)
          setSlots(toSlots((data as { slots?: unknown }).slots));
      })
      .catch(() => undefined);
  }, []);
  return slots;
};
