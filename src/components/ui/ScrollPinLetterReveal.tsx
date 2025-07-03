// src/components/ui/ScrollPinLetterReveal.tsx

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollPinLetterRevealProps {
  /** Paragraph text to reveal letter-by-letter */
  text: string;
}

export default function ScrollPinLetterReveal({
  text,
}: ScrollPinLetterRevealProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0 });
  const [pinned, setPinned] = useState(false);

  // 1. Pin it when it first scrolls into view
  useEffect(() => {
    if (inView) {
      setPinned(true);
    }
  }, [inView]);

  // 2. Once pinned, start staggered letter reveal
  useEffect(() => {
    if (pinned) {
      controls.start('visible');
    }
  }, [pinned, controls]);

  // Variants for container (stagger children) and letters
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.03 },
    },
  };
  const letterVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' as const },
    },
  };

  return (
    <div
      ref={ref}
      className={`
        inline-block 
        ${pinned ? 'sticky bottom-4 left-4' : ''}
      `}
    >
      <motion.div
        className="inline-flex overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {text.split('').map((char, idx) => (
          <motion.span
            key={idx}
            className="inline-block whitespace-pre"
            variants={letterVariants}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
