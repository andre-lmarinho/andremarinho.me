import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiReact, SiTypescript } from 'react-icons/si';

export const iconMap: Record<
  string,
  {
    icon: React.ElementType;
    color: string;
    hoverAnimation?: string;
    customMotionProps?: object;
  }
> = {
  react: {
    icon: SiReact,
    color: '#61DAFB',
    hoverAnimation: 'hover:scale-110 hover:rotate-[180deg] transition-all duration-300',
  },
  typescript: {
    icon: SiTypescript,
    color: '#3178C6',
    hoverAnimation: 'hover:scale-110 transition-all duration-300',
  },
};

const alwaysActiveWords = ['hi', 'im', 'andre'];

export default function RevealWord({ word }: { word: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  const handleScroll = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalVisible = Math.min(1, Math.max(0, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
      const minMargin = 0.35;
      const maxMargin = 0.8;
      const dynamicMargin = minMargin + (maxMargin - minMargin) * totalVisible;
      if (rect.top < viewportHeight * dynamicMargin) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const clean = word
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z]/g, '')
    .toLowerCase();

  const isAlwaysActive = alwaysActiveWords.includes(clean);
  const isHighlight = clean === 'remarkable';

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
        {Icon && active && (
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
      {isHighlight ? <span className="gradient-text">{word}</span> : word}
      &nbsp;
    </motion.span>
  );
}
