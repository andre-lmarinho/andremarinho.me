// src/hooks/useMouseCoords.ts

import { useEffect, useRef } from 'react';

export default function useMouseCoords() {
  const coords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const update = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e) {
        const touch = e.touches[0];
        if (touch) coords.current = { x: touch.clientX, y: touch.clientY };
      } else {
        coords.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener('mousemove', update);
    window.addEventListener('touchmove', update);

    return () => {
      window.removeEventListener('mousemove', update);
      window.removeEventListener('touchmove', update);
    };
  }, []);

  return coords;
}
