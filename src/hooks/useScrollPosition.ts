import { useEffect, useState } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

/**
 * Track the window scroll position.
 */
export default function useScrollPosition(): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const update = () => {
      setPosition({ x: window.scrollX, y: window.scrollY });
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return position;
}
