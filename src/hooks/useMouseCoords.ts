'use client';

import { useEffect, useRef } from 'react';

type MouseCoords = {
  x: number;
  y: number;
};

export default function useMouseCoords(active = true, onChange?: (coords: MouseCoords) => void) {
  const coordsRef = useRef<MouseCoords>({ x: 0, y: 0 });
  const callbackRef = useRef(onChange);

  useEffect(() => {
    callbackRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!active || typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;

    const update: EventListener = (event) => {
      let x = 0;
      let y = 0;

      if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent) {
        const touch = event.touches[0];
        if (!touch) return;
        x = touch.clientX + window.scrollX;
        y = touch.clientY + window.scrollY;
      } else if (event instanceof MouseEvent) {
        x = event.clientX + window.scrollX;
        y = event.clientY + window.scrollY;
      } else {
        return;
      }

      coordsRef.current.x = x;
      coordsRef.current.y = y;

      root.style.setProperty('--cursor-x', `${x}px`);
      root.style.setProperty('--cursor-y', `${y}px`);

      if (callbackRef.current) {
        callbackRef.current({ x, y });
      }
    };

    const options: AddEventListenerOptions = { passive: true };

    window.addEventListener('touchmove', update, options);
    window.addEventListener('mousemove', update, options);

    return () => {
      window.removeEventListener('touchmove', update, options);
      window.removeEventListener('mousemove', update, options);
    };
  }, [active]);

  return coordsRef;
}
