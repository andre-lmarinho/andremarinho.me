//src/components/visuals/CenterOrb

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface CenterOrbProps {
  aboutRef: React.RefObject<HTMLElement>;
}

export default function CenterOrb({ aboutRef }: CenterOrbProps) {
  // Track scroll progress when the About section enters the viewport
  const { scrollYProgress: aboutProgressIn } = useScroll({
    target: aboutRef,
    offset: ['start end', 'center end'],
  });

  // Track scroll progress when the About section leaves the viewport
  const { scrollYProgress: aboutProgressOut } = useScroll({
    target: aboutRef,
    offset: ['center start', 'end start'],
  });

  // Entry movement: from center to top right
  const xIn = useTransform(aboutProgressIn, [0, 1], ['-50%', '100%']);
  const yIn = useTransform(
    aboutProgressIn,
    [0, 0.4, 0.5, 1],
    ['-50%', '-60%', '-80%', '-200%'],
  );

  // Return movement: from top right back to center
  const xOut = useTransform(aboutProgressOut, [0, 1], ['100%', '-50%']);
  const yOut = useTransform(
    aboutProgressOut,
    [0, 0.4, 0.5, 1],
    ['-200%', '-180%', '-160%', '-50%'],
  );

  // Combine both scroll progressions to determine current position
  const x = useTransform(
    [aboutProgressIn, aboutProgressOut],
    ([, outProgress]: number[]) => {
      return outProgress > 0 ? xOut.get() : xIn.get();
    },
  );

  const y = useTransform(
    [aboutProgressIn, aboutProgressOut],
    ([, outProgress]: number[]) => {
      return outProgress > 0 ? yOut.get() : yIn.get();
    },
  );

  // Smooth pulsing animation
  const pulse = {
    scale: [1, 1.1, 1],
    opacity: [0.15, 0.35, 0.15],
  };

  return (
    <motion.div
      className="pointer-events-none absolute w-64 h-64 rounded-full blur-3xl"
      style={{
        top: '50%',
        left: '50%',
        translateX: x,
        translateY: y,
        background:
          'linear-gradient(to right, var(--highlight-color-1), var(--highlight-color-night-1))',
      }}
      animate={pulse}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
