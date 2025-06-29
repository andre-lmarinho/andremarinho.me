import React, { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import RevealWord from '../ui/RevealWord';

interface About2Props {
  setShowCenterOrb?: (value: boolean) => void;
}

const paragraphs: string[] = [
  "Hi! I'm André, a front-end developer who bridges the gap between marketing strategy and technical execution.",
  "Specializing in responsive and intuitive user interfaces built with React, TypeScript, and enhanced by analytics, I create digital experiences designed to not only engage but strategically drive results.",
  "A believer in continuous learning and active contributor in global tech communities, I've completed Harvard's CS50 and continually sharpen my skills by staying at the forefront of emerging technologies.",
  "Clean, maintainable code and performance-driven innovation form the core of my work. Ensuring seamless experiences that look great and deliver measurable impact for your business.",
  "Let's build something remarkable together."
];

export default function About2({ setShowCenterOrb }: About2Props): JSX.Element {
  
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-40% 0% -40% 0%', amount: 0.1 });

  useEffect(() => {
    if (setShowCenterOrb) {
      setShowCenterOrb(!inView); // Hide orb when inside About section
    }
  }, [inView, setShowCenterOrb]);

  return (
    <section id="about" className="py-20" ref={ref}>
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
