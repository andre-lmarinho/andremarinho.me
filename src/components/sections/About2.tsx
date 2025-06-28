import React, { useRef, useState, useEffect } from 'react';
import { Code, ChartBar2, BookOpen, Globe, Code2, Rocket, Link2, Target } from 'lucide-react';
import { SiReact, SiTypescript } from 'react-icons/si';
import { motion, useInView } from 'framer-motion';

interface About2Props {
  setShowCenterOrb?: (value: boolean) => void;
}


// Paragraph text array
const paragraphs: string[] = [
  "I'm André, a front-end developer who bridges the gap between marketing strategy and technical execution.",
  "Specializing in responsive and intuitive user interfaces built with React, TypeScript, and enhanced by analytics, I create digital experiences designed to not only engage but strategically drive results.",
  "A believer in continuous learning and active contributor in global tech communities, I've completed Harvard's CS50 and continually sharpen my skills by staying at the forefront of emerging technologies.",
  "Clean, maintainable code and performance-driven innovation form the core of my work. Ensuring seamless experiences that look great and deliver measurable impact for your business.",
  "Let's build something remarkable together."
];

/**
 * RevealWord wraps each word and toggles opacity based on its position
 * relative to the midpoint of the viewport (50% threshold).
 */
const RevealWord: React.FC<{ word: string }> = ({ word }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: '0px 0px -50% 0px', amount: 0, once: false });
  const clean = word.replace(/[^A-Za-z]/g, '').toLowerCase();
  const isHighlight = clean === 'remarkable';

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0.15 }}
      animate={{ opacity: inView ? 1 : 0.15 }}
      transition={{ duration: 0.3 }}
      className="inline-block transition-opacity duration-300"
    >
      {isHighlight ? (
        <span className="gradient-text">{word}</span>
      ) : (
        word
      )}&nbsp;

    </motion.span>
  );
};

export default function About2({ setShowCenterOrb }: About2Props): JSX.Element {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-3xl px-6 clamptext">
        {paragraphs.map((text, pi) => (
          <p
            key={pi}
            className="mb-6"
          >
            {text.split(' ').map((w, wi) => (
              <RevealWord key={`${pi}-${wi}`} word={w} />
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}
