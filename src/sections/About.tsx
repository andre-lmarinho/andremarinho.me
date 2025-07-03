// src/sections/About.tsx

import React, { useRef, useEffect, useMemo } from 'react';
import FixedRevealContainer from '../components/ui/FixedRevealContainer';
import RevealWord from '../components/ui/RevealWord';
import { aboutParagraphs as paragraphs, highlightConfig } from '../data/about';

interface AboutProps {
  setShowCenterOrb?: (visible: boolean) => void;
}

export default function About({ setShowCenterOrb }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // toggle orb visibility
  useEffect(() => {
    if (!setShowCenterOrb) return;
    const handler = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      const inView =
        rect &&
        rect.top < window.innerHeight * 0.6 &&
        rect.bottom > window.innerHeight * 0.4;
      setShowCenterOrb(!inView);
    };
    window.addEventListener('scroll', handler);
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [setShowCenterOrb]);

  // compute offsets and initialRevealIndex
  const { offsets, totalWords, initialRevealIndex } = useMemo(() => {
    let sum = 0;
    const offs: number[] = [];
    paragraphs.forEach((p, idx) => {
      offs[idx] = sum;
      sum += p.split(' ').length;
    });
    // initial: last alwaysActive of first paragraph
    const always = highlightConfig[0]?.alwaysActiveIndexes || [];
    const init = always.length ? always[always.length - 1] : -1;
    return { offsets: offs, totalWords: sum, initialRevealIndex: init };
  }, []);

  return (
    <section id="about" className="py-20" ref={sectionRef}>
      <FixedRevealContainer
        totalWords={totalWords}
        initialRevealIndex={initialRevealIndex}
      >
        {(revealIndex) => (
          <div className="container-ultra-narrow space-y-6">
            {paragraphs.map((text, pi) => (
              <p key={pi} className="clamptext break-words leading-relaxed">
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
