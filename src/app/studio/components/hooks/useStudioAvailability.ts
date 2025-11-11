'use client';

import { useEffect, useState } from 'react';

import { toSlots } from '@/app/studio/components/utils/availability';

export const useStudioAvailability = (initialSlots = 0) => {
  const [slots, setSlots] = useState(initialSlots);
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
