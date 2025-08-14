// src/hooks/useMouseCoords.ts

import { useEffect, useState } from 'react';

export default function useMouseCoords(active = true) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!active || typeof window === 'undefined') return;

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

      setCoords({ x, y });

      // Update CSS variables so components can react to cursor position
      const root = document.documentElement;
      root.style.setProperty('--cursor-x', `${x}px`);
      root.style.setProperty('--cursor-y', `${y}px`);
    };

    const options: AddEventListenerOptions = { passive: true };

    window.addEventListener('touchmove', update as EventListener, options);
    window.addEventListener('mousemove', update as EventListener, options);

    return () => {
      window.removeEventListener('touchmove', update as EventListener, options);
      window.removeEventListener('mousemove', update as EventListener, options);
    };
  }, [active]);

  return coords;
}
