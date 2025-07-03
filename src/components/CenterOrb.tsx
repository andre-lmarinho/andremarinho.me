import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface CenterOrbProps {
  aboutRef: React.RefObject<HTMLElement>;
  ctaRef: React.RefObject<HTMLElement>;
}

export default function CenterOrb({ aboutRef, ctaRef }: CenterOrbProps) {
  // Scroll tracking da entrada da seção About
  const { scrollYProgress: aboutProgressIn } = useScroll({
    target: aboutRef,
    offset: ["start end", "center end"],
  });

  // Scroll tracking da saída da seção About
  const { scrollYProgress: aboutProgressOut } = useScroll({
    target: aboutRef,
    offset: ["center start", "end start"],
  });

  // Movimento de entrada
  const xIn = useTransform(aboutProgressIn, [0, 1], ['-50%', '100%']);
  const yIn = useTransform(aboutProgressIn, [0, 0.4, 0.5, 1], ['-50%', '-60%', '-80%', '-200%']);

  // Movimento de retorno
  const xOut = useTransform(aboutProgressOut, [0, 1], ['100%', '-50%']);
  const yOut = useTransform(aboutProgressOut, [0, 0.4, 0.5, 1], ['-200%', '-180%', '-160%', '-50%']);

  // Combina as duas progressões
  const x = useTransform([aboutProgressIn, aboutProgressOut], ([, outProgress]: number[]) => {
    return outProgress > 0 ? xOut.get() : xIn.get();
  });

  const y = useTransform([aboutProgressIn, aboutProgressOut], ([, outProgress]: number[]) => {
    return outProgress > 0 ? yOut.get() : yIn.get();
  });

  // Pulso suave
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
        background: 'linear-gradient(to right, var(--highlight-color-1), var(--highlight-color-night-1))',
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
