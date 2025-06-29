import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { SiReact, SiTypescript } from 'react-icons/si';
import { FaChartBar, FaCode, FaBook, FaGlobe, FaRocket } from 'react-icons/fa';

interface About2Props {
  setShowCenterOrb?: (value: boolean) => void;
}

export const iconMap: Record<string, React.ElementType> = {
  react: SiReact,
  typescript: SiTypescript,
  analytics: FaChartBar,
  code: FaCode,
  learning: FaBook,
  communities: FaGlobe,
  innovation: FaRocket,
};


const paragraphs: string[] = [
  "Hi! I'm André, a front-end developer who bridges the gap between marketing strategy and technical execution.",
  "Specializing in responsive and intuitive user interfaces built with React, TypeScript, and enhanced by analytics, I create digital experiences designed to not only engage but strategically drive results.",
  "A believer in continuous learning and active contributor in global tech communities, I've completed Harvard's CS50 and continually sharpen my skills by staying at the forefront of emerging technologies.",
  "Clean, maintainable code and performance-driven innovation form the core of my work. Ensuring seamless experiences that look great and deliver measurable impact for your business.",
  "Let's build something remarkable together."
];

const RevealWord: React.FC<{ word: string }> = ({ word }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {
    margin: '0% 0% -50% 0%',
    amount: 0,
    once: false,
  });

  const clean = word.replace(/[^A-Za-z]/g, '').toLowerCase();
  const isHighlight = clean === 'remarkable';
  const Icon = iconMap[clean];

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0.2 }}
      animate={{ opacity: inView ? 1 : 0.2 }}
      transition={{ type: 'tween', ease: 'linear', duration: 0.2, }}
      className="inline-block transition-opacity duration-300"
    >
      <AnimatePresence mode="wait">
        {Icon && inView && (
          <motion.span
            layout
            key={clean}
            initial={{ width: 0, height: 0, padding: 0, borderWidth: 0 }}
            animate={{ width: 36, height: 36, padding: 6, borderWidth: 1 }}
            exit={{ width: 0, height: 0, padding: 0, borderWidth: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
            className={`inline-flex items-center justify-center mr-1 -mb-[10px]
            glass border backdrop-blur-sm rounded-lg origin-left
            bg-gray-50 dark:bg-gray-800 border-gray-400/40 dark:border-gray-600/30 hover:border-blue-500/60 dark:hover:border-blue-400/50 transition-all duration-500
            `}
          >
            {React.createElement(Icon, { size: '100%' })}
          </motion.span>
        )}
      </AnimatePresence>

      {isHighlight ? (
        <span className="gradient-text">{word}</span>
      ) : (
        word
      )}

      &nbsp;
    </motion.span>
  );
};

export default function About2({ setShowCenterOrb }: About2Props): JSX.Element {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-3xl px-6 clamptext">
        {paragraphs.map((text, pi) => (
          <p key={pi} className="mb-6">
            {text.split(' ').map((w, wi) => (
              <RevealWord key={`${pi}-${wi}`} word={w} />
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}
