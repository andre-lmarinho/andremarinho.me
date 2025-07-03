// src/components/ui/LetterScrollReveal.tsx

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export interface LetterScrollRevealProps {
  /** The full text to reveal letter-by-letter on scroll */
  text: string;
  /** Optional className (e.g. 'gradient-text') to style the revealed letters */
  className?: string;
}

export default function LetterScrollReveal({
  text,
  className = '',
}: LetterScrollRevealProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // When scrolled into view, start the staggered letter animation
  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  // Container just staggers its children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.03 },
    },
  };

  // Each letter slides up + fades in
  const letterVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' as const },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-flex overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {text.split('').map((char, idx) => (
        <motion.span
          key={`${char}-${idx}`}
          className="inline-block whitespace-pre"
          variants={letterVariants}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
