import React from 'react';
import { motion } from 'framer-motion';

interface LetterSwapProps {
  word: string;
  className?: string;
}

export default function LetterSwap({ word, className }: LetterSwapProps) {
  const letters = word.split('');
  
  const staggerChildren = 0.01;
  
  const container = {
    hover: {
      transition: {
        staggerChildren: staggerChildren,
        staggerDirection: 1,
      },
    },
    initial: {
      transition: {
        staggerChildren: staggerChildren,
        staggerDirection: 1,
      },
    },
  };

  const letter = {
    initial: { y: 0 },
    hover: { y: '-100%', transition: { duration: 0.3, ease: 'easeInOut' as const } },
  };

  return (
    <motion.div
      className={`inline-flex ${className}`}
      variants={container}
      initial="initial"
      whileHover="hover"
      animate="initial"
    >
      {letters.map((letterChar, index) => (
        <span key={index} className="relative inline-block overflow-hidden">
          <motion.span
            className="block"
            variants={letter}
          >
            {letterChar}
          </motion.span>
          <motion.span
            className="block absolute left-0 top-full"
            variants={letter}
          >
            {letterChar}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
