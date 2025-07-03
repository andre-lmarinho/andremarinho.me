// src/components/ui/FixedRevealContainer.tsx

import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface FixedRevealContainerProps {
  /** Total number of words across all paragraphs */
  totalWords: number;
  /** Number of words lit before entering reveal mode */
  initialRevealIndex: number;
  /**
   * Render-prop:
   *   revealIndex – the current word index to show
   */
  children: (revealIndex: number) => React.ReactNode;
}

export default function FixedRevealContainer({
  totalWords,
  initialRevealIndex,
  children,
}: FixedRevealContainerProps) {
  // ref to detect when element is fully visible
  const [ref, fullyInView] = useInView({ threshold: 1 });
  // are we in “reveal mode”?
  const [revealMode, setRevealMode] = useState(false);
  // which word is currently revealed up to (global index)
  const [revealIndex, setRevealIndex] = useState(initialRevealIndex);

  // 1) enter reveal mode when element fully in view
  useEffect(() => {
    if (fullyInView && !revealMode) {
      setRevealMode(true);
      document.body.style.overflowY = 'hidden';  // freeze page scroll
    }
  }, [fullyInView, revealMode]);

  // 2) while in reveal mode, intercept wheel to advance/retreat revealIndex
  useEffect(() => {
    if (!revealMode) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        // scroll down: reveal next word
        setRevealIndex(i => Math.min(i + 1, totalWords - 1));
      } else {
        // scroll up: hide previous word
        setRevealIndex(i => Math.max(i - 1, initialRevealIndex));
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [revealMode, totalWords, initialRevealIndex]);

  // 3) exit reveal mode when user scrolls past bounds
  useEffect(() => {
    if (!revealMode) return;
    // only unpin when we've revealed everything
    if (revealIndex >= totalWords - 1) {
      setRevealMode(false);
      document.body.style.overflowY = '';
    }
    // if user scrolls back to initial, also exit
    if (revealIndex <= initialRevealIndex) {
      setRevealMode(false);
      document.body.style.overflowY = '';
    }
  }, [revealIndex, revealMode, totalWords, initialRevealIndex]);

  return (
    <div ref={ref} className="relative">
      {/*
        While NOT in revealMode, render normally (no snap).
        When in revealMode, we simply freeze scroll—the element stays
        exactly where it was rendered, no fixed or sticky.
      */}
      {children(revealIndex)}
    </div>
  );
}
