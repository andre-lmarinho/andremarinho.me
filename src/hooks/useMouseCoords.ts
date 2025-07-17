// src/hooks/useMouseCoords

import { useEffect, useRef } from 'react';

export default function useMouseCoords() {
  const coords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const update = (e: MouseEvent) => {
      coords.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', update);
    return () => window.removeEventListener('mousemove', update);
  }, []);

  return coords;
}
