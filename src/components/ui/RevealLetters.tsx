// src/components/ui/RevealLetters.tsx

import React from 'react';

interface RevealLettersProps {
  text: string;
  revealStep: number;
}

/**
 * Splits `text` into characters and
 * shows letters up to `revealStep` at full opacity,
 * fading out the rest.
 */
export default function RevealLetters({
  text,
  revealStep,
}: RevealLettersProps) {
  return (
    <span className="inline-flex flex-wrap">
      {text.split('').map((char, idx) => (
        <span
          key={idx}
          className={`
            inline-block transition-opacity duration-200
            ${idx < revealStep ? 'opacity-100' : 'opacity-10'}
          `}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
