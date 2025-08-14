// src/hooks/useMouseCoords.ts

import { useEffect, useRef } from 'react';

export default function useMouseCoords() {
  const coords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const update = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e) {
        const touch = e.touches[0];
        if (touch) coords.current = { x: touch.clientX, y: touch.clientY };
      } else {
        coords.current = { x: e.clientX, y: e.clientY };
      }
    };

    const options: AddEventListenerOptions = { passive: true };

    window.addEventListener('touchmove', update as (e: TouchEvent) => void, options);
    window.addEventListener('mousemove', update as (e: MouseEvent) => void, options);

    return () => {
      window.removeEventListener('touchmove', update as (e: TouchEvent) => void, options);
      window.removeEventListener('mousemove', update as (e: MouseEvent) => void, options);
    };
  }, []);

  return coords;
}
