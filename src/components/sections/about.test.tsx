import React from 'react';

interface About2Props {
  setShowCenterOrb?: (value: boolean) => void;
}

// Define icon map similar to techs array
const iconMap = [
  { name: 'developer', icon: 'code', color: '000' },
  { name: 'React', icon: 'react', color: '61DAFB' },
  { name: 'TypeScript', icon: 'typescript', color: '3178C6' },
  { name: 'analytics', icon: 'chart', color: '4A90E2' },
  { name: 'learning', icon: 'book', color: 'A569BD' },
  { name: 'communities', icon: 'globe', color: '27AE60' },
  { name: 'code', icon: 'code2', color: '34495E' },
  { name: 'innovation', icon: 'rocket', color: 'E67E22' },
  { name: 'experiences', icon: 'link', color: '2ECC71' },
  { name: 'impact', icon: 'target', color: 'C0392B' },
];

// Paragraph text array
const paragraphs = [
  "I'm André, a front-end developer who bridges the gap between marketing strategy and technical execution.",
  "Specializing in responsive and intuitive user interfaces built with React, TypeScript, and enhanced by analytics, I create digital experiences designed to not only engage but strategically drive results.",
  "A believer in continuous learning and active contributor in global tech communities, I've completed Harvard's CS50 and continually sharpen my skills by staying at the forefront of emerging technologies.",
  "Clean, maintainable code and performance-driven innovation form the core of my work—ensuring seamless experiences that look great and deliver measurable impact for your business.",
  "Let's build something remarkable together."
];

export default function About2({ setShowCenterOrb }: About2Props) {
  return (
    <section id="about2" className="py-20">
      <div className="mx-auto max-w-3xl px-6 text-gray-800 dark:text-gray-200">
        {paragraphs.map((text, index) => (
          <p
            key={index}
            className="mb-6 text-[1.25rem] md:text-[2rem] leading-relaxed"
          >
            {text.split(' ').map((word, wi) => {
              // Lookup icon entry by word (case-insensitive)
              const entry = iconMap.find(e => e.name.toLowerCase() === word.replace(/[^A-Za-z]/g, '').toLowerCase());
              return (
                <span key={wi} className="inline-flex items-center mr-1">
                  <span>{word}</span>
                  {entry && (
                    <span
                      className="ml-1"
                      style={{ color: `#${entry.color}` }}
                    >
                      {/* Render icon based on entry.icon */}
                      <i className={`icon-${entry.icon}`} />
                    </span>
                  )}
                </span>
              );
            })}
          </p>
        ))}
      </div>
    </section>
  );
}
