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

    const update = (e: MouseEvent | TouchEvent) => {
      let x: number;
      let y: number;

      if ('touches' in e) {
        const touch = e.touches[0];
        if (!touch) return;
        x = touch.clientX + window.scrollX;
        y = touch.clientY + window.scrollY;
      } else {
        const mouse = e as MouseEvent;
        x = mouse.clientX + window.scrollX;
        y = mouse.clientY + window.scrollY;
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

    window.addEventListener('touchmove', update as EventListener, options);
    window.addEventListener('mousemove', update as EventListener, options);

    return () => {
      window.removeEventListener('touchmove', update as EventListener, options);
      window.removeEventListener('mousemove', update as EventListener, options);
    };
  }, [active]);

  return coordsRef;
}
