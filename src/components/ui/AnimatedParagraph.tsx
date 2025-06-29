import React from 'react';

interface AnimatedParagraphProps {
  text: string;
  offset: number;
  scrollBottom: number;
  sectionTop: number;
  revealSpacing: number;
}

export default function AnimatedParagraph({
  text,
  offset,
  scrollBottom,
  sectionTop,
  revealSpacing,
}: AnimatedParagraphProps) {
  return (
    <p className="mb-6 text-xl md:text-2xl leading-relaxed text-center text-gray-900 dark:text-gray-100">
      {text.split(' ').map((word, wi) => {
        const idx = offset + wi;
        const wordStart = sectionTop + idx * revealSpacing;
        const delta = scrollBottom - wordStart;
        let stage = 0;
        if (delta >= revealSpacing) stage = 2;
        else if (delta > 0) stage = 1;
        const opacityClass = stage === 2 ? 'opacity-100' : stage === 1 ? 'opacity-50' : 'opacity-10';
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
  );
}
