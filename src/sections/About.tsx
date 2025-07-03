// src/sections/About.tsx

import React, { useMemo } from 'react';
import FixedRevealContainer from '../components/ui/FixedRevealContainer';
import RevealWord from '../components/ui/RevealWord';
import { aboutParagraphs as paragraphs, highlightConfig } from '../data/about';

export default function About({ onFixedChange }: { onFixedChange?: (isFixed: boolean) => void }) {

  // Calculate per-paragraph offsets, total number of words, and initial reveal index
  const { offsets, totalWords, initialRevealIndex } = useMemo(() => {
    let sum = 0;
    const offs: number[] = [];
    paragraphs.forEach((p, idx) => {
      offs[idx] = sum;
      sum += p.split(' ').length;
    });
    const always = highlightConfig[0]?.alwaysActiveIndexes || [];
    const init = always.length ? always[always.length - 1] : -1;
    return { offsets: offs, totalWords: sum, initialRevealIndex: init };
  }, []);

  return (
    <section id="about" className="py-20">
      <FixedRevealContainer
        totalWords={totalWords}
        initialRevealIndex={initialRevealIndex}
      >
        {(revealIndex) => (
          <div className="container-ultra-narrow space-y-6">
            {paragraphs.map((text, pi) => (
              <p key={pi} className="clamptext break-words">
                {text.split(' ').map((w, wi) => (
                  <RevealWord
                    key={`${pi}-${wi}`}
                    word={w}
                    paragraph={pi}
                    index={wi}
                    globalIndex={offsets[pi] + wi}
                    revealIndex={revealIndex}
                  />
                ))}
              </p>
            ))}
          </div>
        )}
      </FixedRevealContainer>
    </section>
  );
}
