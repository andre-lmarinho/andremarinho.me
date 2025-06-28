import React, { useRef, useState, useEffect } from 'react';


export default function About() {
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
  const [scrollBottom, setScrollBottom] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollBottom(window.scrollY + window.innerHeight);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute section positions
  const sectionTop = sectionRef.current?.offsetTop ?? 0;
  const revealEnd = sectionTop + totalWords * REVEAL_SPACING;
  // Reveal in progress when scroll is within section reveal window
  const isRevealing = scrollBottom > sectionTop && scrollBottom < revealEnd;

  // Total height to allow full reveal
  const sectionHeight = window.innerHeight + totalWords * REVEAL_SPACING;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 transition-colors duration-500"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-20 mx-auto max-w-3xl px-6 text-gray-800 dark:text-gray-200">
        {paragraphs.map((para, pi) => (
          <p
            key={pi}
            className="mb-6 text-xl md:text-2xl leading-relaxed text-center text-gray-900 dark:text-gray-100"
          >
            {para.split(' ').map((word, wi) => {
              const idx = offsets[pi] + wi;
              // compute scroll progress for this word
              const wordStart = sectionTop + idx * REVEAL_SPACING;
              const delta = scrollBottom - wordStart;
              let stage = 0;
              if (delta >= REVEAL_SPACING) stage = 2;
              else if (delta > 0) stage = 1;
              // three opacity stages: low, mid, full
              const opacityClass =
                stage === 2 ? 'opacity-100' : stage === 1 ? 'opacity-50' : 'opacity-10';
              return (
                <span
                  key={wi}
                  className={`inline-block transition-opacity duration-200 ${opacityClass}`}
                  style={{ marginRight: '0.25rem' }}
                >
                  {word}
                </span>
              );
            })}
          </p>
        ))}
      </div>
    </section>
  );
}
