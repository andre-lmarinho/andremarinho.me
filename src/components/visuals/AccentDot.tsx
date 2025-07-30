// src/components/visuals/AccentDot.tsx

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useMotion } from '@/context';
import { animations } from '@/utils';

function randomOffset() {
  const sign = Math.random() > 0.5 ? 1 : -1;
  return sign * (1 + Math.random());
}

export default function AccentDot() {
  const controls = useAnimation();
  const { shouldReduceMotion } = useMotion();

  useEffect(() => {
    controls.start({
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.15 : 0.12 },
    });
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      controls.start({
        x: randomOffset(),
        y: randomOffset(),
        transition: { duration: 5, ease: 'linear' },
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [controls, shouldReduceMotion]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-4 top-4 z-20 h-2 w-2 rounded-full bg-accent-500"
      {...animations.AccentDot()}
      animate={controls}
    />
  );
}
