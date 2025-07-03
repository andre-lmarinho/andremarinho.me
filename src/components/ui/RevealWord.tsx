// src/components/ui/RevealWord.tsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { highlightConfig, iconMap } from '../../data/about';

interface RevealWordProps {
  word: string;
  paragraph: number;
  index: number;
  globalIndex: number;
  revealIndex: number;
}

export default function RevealWord({
  word,
  paragraph,
  index,
  globalIndex,
  revealIndex,
}: RevealWordProps) {
  // Clean the word for lookups
  const clean = word
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z]/g, '')
    .toLowerCase();

  // Always-on highlights from config
  const alwaysOn =
    highlightConfig[paragraph]?.alwaysActiveIndexes?.includes(index) ?? false;
  // Determine visibility based on revealIndex
  const visible = alwaysOn || globalIndex <= revealIndex;
  // Gradient word?
  const isGradient =
    highlightConfig[paragraph]?.highlightWord?.toLowerCase() === clean;

  // Icon config lookup
  const iconEntry = iconMap[clean];
  const Icon = iconEntry?.icon;
  const IconColor = iconEntry?.color || '#000';
  const IconHover = iconEntry?.hoverAnimation || '';

  return (
    <motion.span
      initial={{ opacity: 0.2 }}
      animate={{ opacity: visible ? 1 : 0.2 }}
      transition={{ duration: 0.2, ease: 'linear' }}
      className="inline-block transition-opacity duration-300 break-words leading-relaxed"
    >
      <AnimatePresence>
        {Icon && globalIndex <= revealIndex + 1 && (
          <motion.span
            layout
            key={clean}
            initial={{ width: 0, height: 0, padding: 0, borderWidth: 0 }}
            animate={{
              width: '1.5em',
              height: '1.5em',
              padding: '0.25em',
              borderWidth: 1,
            }}
            exit={{ width: 0, height: 0, padding: 0, borderWidth: 0 }}
            transition={{
              type: 'spring',
              stiffness: 2000,
              damping: 16,
              velocity: 4,
            }}
            className={`group inline-flex items-center justify-center mr-1
              glass border backdrop-blur-sm rounded-lg
              bg-gray-50 dark:bg-gray-800
              border-gray-400/40 dark:border-gray-600/30
              hover:border-blue-500/60 dark:hover:border-blue-400/50
              hover:scale-110 transition-all duration-100`}
          >
            <Icon size="100%" color={IconColor} className={IconHover} />
          </motion.span>
        )}
      </AnimatePresence>
      {isGradient && visible ? (
        <motion.span
          initial={{ backgroundPosition: '0% 50%' }}
          animate={{ backgroundPosition: '100% 50%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' as const }}
          className="inline-block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          {word}
        </motion.span>
      ) : (
        word
      )}
      &nbsp;
    </motion.span>
  );
}
