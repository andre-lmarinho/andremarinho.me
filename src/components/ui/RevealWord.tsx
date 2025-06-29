import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { highlightConfig, iconMap } from '../../data/about';

export default function RevealWord({
  word,
  index,
  paragraph
}: { word: string, index: number, paragraph: number }) {

  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px 0px -20% 0px',
        threshold: 0,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const clean = word
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z]/g, '')
    .toLowerCase();

  // Check if the current word index is always active in this paragraph
  const isAlwaysActive = highlightConfig[paragraph]?.alwaysActiveIndexes?.includes(index);

  // Check if the current word matches the gradient highlight
  const isGradient = highlightConfig[paragraph]?.highlightWord?.toLowerCase() === clean;

  const iconEntry = iconMap[clean];
  const Icon = iconEntry?.icon;
  const IconColor = iconEntry?.color || '#000000';
  const IconHover = iconEntry?.hoverAnimation || '';

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0.2 }}
      animate={{ opacity: isAlwaysActive || active ? 1 : 0.2 }}
      transition={{ type: 'tween', ease: 'linear', duration: 0.2 }}
      className="inline-block transition-opacity duration-300"
    >
      <AnimatePresence mode="wait">
        {Icon && (isAlwaysActive || active) && (
          <motion.span
            layout
            key={clean}
            initial={{ width: 0, height: 0, padding: 0, borderWidth: 0 }}
            animate={{ width: 42, height: 42, padding: 6, borderWidth: 1 }}
            exit={{ width: 0, height: 0, padding: 0, borderWidth: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
            className={`inline-flex items-center justify-center mr-1
            glass border backdrop-blur-sm rounded-lg
            bg-gray-50 dark:bg-gray-800 border-gray-400/40 dark:border-gray-600/30 hover:border-blue-500/60 dark:hover:border-blue-400/50
            hover:scale-110 transition-all duration-500
            `}
          >
            {React.createElement(Icon, { size: '100%', color: IconColor, className: IconHover })}
          </motion.span>
        )}
      </AnimatePresence>
      {isGradient ? <span className="gradient-text">{word}</span> : word}
      &nbsp;
    </motion.span>
  );
}
