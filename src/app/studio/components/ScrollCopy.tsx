'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import cn from '@/utils/cn';

type ScrollCopyProps = {
  className?: string; // container classes (e.g., space-y-8)
  baseOpacity?: number; // 0..1
  maxOpacity?: number; // 0..1
  thresholdRatioStart?: number; // 0..1 of viewport height (e.g., 0.55)
  thresholdRatioEnd?: number; // 0..1 of viewport height (e.g., 0.65)
  wordGap?: number; // px spacing between words
};

function tokenize(text: string): string[] {
  // Split on whitespace, keep punctuation attached to words.
  // Preserve spaces by appending a space to every token except last in paragraph when rendering.
  return text.trim().split(/\s+/).filter(Boolean);
}

const CONTENT: string[] = [
  'Building digital products is hard.',
  'It involves many disciplines: design, engineering, marketing and more. Bringing everything together requires assembling a highly skilled team.',
  "It's time to change that.",
  'Duonorth is an independent studio focused on crafting world-class products for early-stage companies.',
  'We ship fast, while ensuring the highest level of quality, performance, accessibility and attention to detail.',
  "Together, we'll build something duonorth.",
];

const TOKENIZED_CONTENT = CONTENT.map((paragraph) => tokenize(paragraph));

const ScrollCopy: React.FC<ScrollCopyProps> = ({
  className = '',
  baseOpacity = 0.35,
  maxOpacity = 1,
  thresholdRatioStart = 0.65,
  thresholdRatioEnd = 0.75,
  wordGap = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const activeParagraphRef = useRef(-1);
  const [activeParagraph, setActiveParagraph] = useState(-1);

  const normalizedThresholds = useMemo(() => {
    const start = Math.min(Math.max(thresholdRatioStart, 0), 1);
    const end = Math.min(Math.max(thresholdRatioEnd, 0), 1);
    return start <= end ? { start, end } : { start: end, end: start };
  }, [thresholdRatioEnd, thresholdRatioStart]);

  const containerStyle = useMemo(
    () =>
      ({
        '--sc-base-opacity': baseOpacity.toString(),
        '--sc-active-opacity': maxOpacity.toString(),
      }) as React.CSSProperties,
    [baseOpacity, maxOpacity]
  );

  const updateParagraphOpacity = useCallback(() => {
    rafRef.current = null;
    const el = containerRef.current;
    if (!el) return;

    const paragraphs = Array.from(
      el.querySelectorAll<HTMLParagraphElement>('[data-sc-paragraph="true"]')
    );

    if (paragraphs.length === 0) {
      if (activeParagraphRef.current !== -1) {
        activeParagraphRef.current = -1;
        setActiveParagraph(-1);
      }
      return;
    }

    const viewportHeight = window.innerHeight;
    const denominator = Math.max(1, paragraphs.length - 1);
    let nextActive = -1;

    paragraphs.forEach((paragraph, index) => {
      const rect = paragraph.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const progress = paragraphs.length === 1 ? 1 : index / denominator;
      const ratio =
        normalizedThresholds.start +
        progress * (normalizedThresholds.end - normalizedThresholds.start);
      const cutoff = viewportHeight * ratio;

      if (center <= cutoff) {
        nextActive = index;
      }
    });

    if (nextActive !== activeParagraphRef.current) {
      activeParagraphRef.current = nextActive;
      setActiveParagraph(nextActive);
    }
  }, [normalizedThresholds.end, normalizedThresholds.start]);

  useEffect(() => {
    updateParagraphOpacity();

    const handleScroll = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(updateParagraphOpacity);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);

      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateParagraphOpacity]);

  return (
    <div ref={containerRef} className={className} style={containerStyle}>
      {TOKENIZED_CONTENT.map((tokens, index) => (
        <p
          key={index}
          data-sc-paragraph="true"
          className={cn(
            'will-change-opacity transition-opacity duration-500',
            index <= activeParagraph
              ? 'opacity-[var(--sc-active-opacity)]'
              : 'opacity-[var(--sc-base-opacity)]'
          )}
          style={{ wordSpacing: wordGap }}
        >
          {tokens.map((token, tokenIndex) => (
            <span key={`${index}-${tokenIndex}`} className="sc-word inline-block">
              {token}
              {tokenIndex < tokens.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
};

export default ScrollCopy;
