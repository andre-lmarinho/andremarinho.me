import React, { useRef, useEffect } from 'react';
import useScrollPosition from '../../hooks/useScrollPosition';
import AnimatedParagraph from '../ui/AnimatedParagraph';

interface AboutProps {
  /**
   * Callback to control visibility of the center orb in the background.
   */
  setShowCenterOrb?: (value: boolean) => void;
}

export default function About({ setShowCenterOrb }: AboutProps) {
  const fullText = `I'm André, a front-end developer who bridges the gap between marketing strategy and technical execution. My journey from digital marketing to development has shaped my approach: every line of code is crafted with clear business outcomes in mind.

Specializing in responsive and intuitive user interfaces built with React, TypeScript, and enhanced by analytics, I create digital experiences designed to not only engage but strategically drive results.

A believer in continuous learning and active contributor in global tech communities, I've completed Harvard's CS50 and continually sharpen my skills by staying at the forefront of emerging technologies.

Clean, maintainable code and performance-driven innovation form the core of my work—ensuring seamless experiences that look great and deliver measurable impact for your business.

Let's build something remarkable together.`;

  const paragraphs = fullText.split('\n\n');
  const offsets: number[] = [];
  let cumulative = 0;
  paragraphs.forEach((p, i) => {
    offsets[i] = cumulative;
    cumulative += p.split(' ').length;
  });
  const totalWords = cumulative;

  const REVEAL_SPACING = 40; // px per word
  const sectionRef = useRef<HTMLDivElement>(null);
  const { y: scrollY } = useScrollPosition();
  const scrollBottom = scrollY + window.innerHeight;

  // Compute section positions
  const sectionTop = sectionRef.current?.offsetTop ?? 0;
  const revealEnd = sectionTop + totalWords * REVEAL_SPACING;
  // Reveal in progress when scroll is within section reveal window
  const isRevealing = scrollBottom > sectionTop && scrollBottom < revealEnd;

   // Fade the center orb out during reveal and back in afterwards
  useEffect(() => {
    if (!setShowCenterOrb) return;
    if (isRevealing) {
      // start fading out immediately
      setShowCenterOrb(false);
    } else {
      // wait a moment before bringing it back
      const id = setTimeout(() => setShowCenterOrb(true), 800);
      return () => clearTimeout(id);
    }
  }, [isRevealing, setShowCenterOrb]);

  // Total height to allow full reveal
  const sectionHeight = window.innerHeight + totalWords * REVEAL_SPACING;

  return (
    <section id="about" 
      ref={sectionRef}
      className="relative py-20 transition-colors duration-500"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-20 mx-auto max-w-3xl px-6 text-gray-800 dark:text-gray-200">
        {paragraphs.map((para, pi) => (
          <AnimatedParagraph
            key={pi}
            text={para}
            offset={offsets[pi]}
            scrollBottom={scrollBottom}
            sectionTop={sectionTop}
            revealSpacing={REVEAL_SPACING}
          />
        ))}
      </div>
    </section>
  );
}
