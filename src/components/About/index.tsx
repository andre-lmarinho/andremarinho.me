import React, { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import RevealWord from '../ui/RevealWord';
import { aboutParagraphs as paragraphs } from '../../data/about';

interface AboutProps {
  setShowCenterOrb?: (value: boolean) => void;
}

export default function About({ setShowCenterOrb }: AboutProps): JSX.Element {
  
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-40% 0% -40% 0%', amount: 0.1 });

  useEffect(() => {
    if (setShowCenterOrb) {
      setShowCenterOrb(!inView); // Hide orb when inside About section
    }
  }, [inView, setShowCenterOrb]);

  return (
    <section id="about" className="py-20" ref={ref}>
      <div className="container-ultra-narrow">
        {paragraphs.map((text, pi) => (
          <p key={pi} className="clamptext mb-6">
            {text.split(' ').map((w, wi) => (
              <RevealWord key={`${pi}-${wi}`} word={w} index={wi} paragraph={pi} />
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}
