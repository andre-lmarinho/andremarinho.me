import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiReact, SiTypescript } from 'react-icons/si';
import { FaChartBar, FaCode, FaBook, FaGlobe, FaRocket } from 'react-icons/fa';

interface About2Props {
  setShowCenterOrb?: (value: boolean) => void;
}

export const iconMap: Record<
  string, {icon: React.ElementType; color: string;
    hoverAnimation?: string; // Tailwind or custom animation class
    customMotionProps?: object; // Optional for unique motion properties
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

const paragraphs: string[] = [
  "Hi! I'm André, a front-end developer who bridges the gap between marketing strategy and technical execution.",
  "Specializing in responsive and intuitive user interfaces built with React, TypeScript, and enhanced by analytics, I create digital experiences designed to not only engage but strategically drive results.",
  "A believer in continuous learning and active contributor in global tech communities, I've completed Harvard's CS50 and continually sharpen my skills by staying at the forefront of emerging technologies.",
  "Clean, maintainable code and performance-driven innovation form the core of my work. Ensuring seamless experiences that look great and deliver measurable impact for your business.",
  "Let's build something remarkable together."
];
// Will aways be active (Use sanitazed words because of <clean> )
const alwaysActiveWords = ["hi", "im", "andre"];


const RevealWord: React.FC<{ word: string }> = ({ word }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  const handleScroll = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // How much of the element has already entered the screen
      const totalVisible = Math.min(1, Math.max(0, (viewportHeight - rect.top) / (viewportHeight + rect.height)));

      // Calculates an adaptive margin based on how much has already been entered
      const minMargin = 0.35; // 35% no início
      const maxMargin = 0.80; // 80% no final
      const dynamicMargin = minMargin + (maxMargin - minMargin) * totalVisible;

      if (rect.top < viewportHeight * dynamicMargin) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
  };

  useEffect(() => {
    handleScroll(); // fires on loading
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sanitazing input for comparissons
  const clean = word
  .normalize('NFD') // separates accents
  .replace(/[\u0300-\u036f]/g, '') // removes accents
  .replace(/[^A-Za-z]/g, '') // removes non-alphabetic
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
      animate={{  opacity: isAlwaysActive || active ? 1 : 0.2 }}
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
