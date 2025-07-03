// src/components/ui/FixedRevealContainer.tsx

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FixedRevealContainerProps {
  totalWords: number;
  initialRevealIndex: number;
  children: (revealIndex: number) => React.ReactNode;
}

export default function FixedRevealContainer({
  totalWords,
  initialRevealIndex,
  children,
}: FixedRevealContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealIndex, setRevealIndex] = useState(initialRevealIndex);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top center',
        end: () => `+=${totalWords * 50}`, // adjust scroll length
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentIndex = Math.floor(progress * (totalWords - initialRevealIndex)) + initialRevealIndex;
          setRevealIndex(currentIndex);
        }
      });

      return () => {
        trigger.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [totalWords, initialRevealIndex]);

  return (
    <div ref={containerRef} className="relative">
      {children(revealIndex)}
    </div>
  );
}
