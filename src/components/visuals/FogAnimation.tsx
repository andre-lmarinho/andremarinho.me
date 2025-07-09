// components/FogAnimation.tsx
import { useEffect, useRef, useState } from 'react';
import { useMouseCoords } from '../../hooks';

export default function FogAnimation() {
  const [enabled, setEnabled] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const coords = useMouseCoords();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

    setEnabled(true);

    const updateGradient = () => {
      const x = coords.current.x + window.scrollX;
      const y = coords.current.y + window.scrollY;

      if (backgroundRef.current) {
        backgroundRef.current.style.background = `radial-gradient(450px at ${x}px ${y}px, var(--spotter), transparent 80%)`;
      }
    };

    const handleScroll = () => updateGradient();
    window.addEventListener('scroll', handleScroll);
    const interval = setInterval(updateGradient, 16);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [coords]);

  if (!enabled) return null;

  return (
    <div
      ref={backgroundRef}
      className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
    />
  );
}
