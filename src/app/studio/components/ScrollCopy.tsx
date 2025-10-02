'use client';

import React, { CSSProperties, useCallback, useLayoutEffect, useMemo, useRef } from 'react';

import {
  calculateWordOpacities,
  createBridges,
  tokenize,
} from './scrollCopyUtils';

type Props = {
  className?: string; // container classes (e.g., space-y-8)
  baseOpacity?: number; // 0..1
  maxOpacity?: number; // 0..1
  thresholdRatioStart?: number; // 0..1 of viewport height (e.g., 0.55)
  thresholdRatioEnd?: number; // 0..1 of viewport height (e.g., 0.65)
  wordGap?: number; // px spacing between words
};

const CONTENT: string[] = [
  'Building digital products is hard.',
  'It involves many disciplines: design, engineering, marketing and more. Bringing everything together requires assembling a highly skilled team.',
  "It's time to change that.",
  'Duonorth is an independent studio focused on crafting world-class products for early-stage companies.',
  'We ship fast, while ensuring the highest level of quality, performance, accessibility and attention to detail.',
  "Together, we'll build something duonorth.",
];

const ScrollCopy: React.FC<Props> = ({
  className = '',
  baseOpacity = 0.35,
  maxOpacity = 1,
  thresholdRatioStart = 0.65,
  thresholdRatioEnd = 0.75,
  wordGap = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const wordsQuery = '.sc-word';

  const scheduleOpacityUpdate = useCallback(
    (callback: () => void) => {
      if (rafRef.current != null) {
        return;
      }

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        callback();
      });
    },
    []
  );

  const applyBridges = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const paragraphs = Array.from(el.querySelectorAll<HTMLParagraphElement>('p'));
    const spansByParagraph = paragraphs.map((paragraph) =>
      Array.from(paragraph.querySelectorAll<HTMLSpanElement>(wordsQuery))
    );

    const spans = spansByParagraph.flat();
    spans.forEach((span) => {
      delete span.dataset.scBridgeSource;
      delete span.dataset.scBridgeTarget;
    });

    const bridgeMap = createBridges(
      spansByParagraph.map((wordSpans) => wordSpans.map((span) => span.id))
    );

    const spanById = new Map(spans.map((span) => [span.id, span] as const));
    bridgeMap.forEach(({ fromId, toId }) => {
      const fromSpan = spanById.get(fromId);
      const toSpan = spanById.get(toId);

      if (!fromSpan || !toSpan) return;

      fromSpan.dataset.scBridgeTarget = toId;
      toSpan.dataset.scBridgeSource = fromId;
    });
  }, [wordsQuery]);

  const updateOpacity = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>(wordsQuery));
    if (spans.length === 0) return;

    const wordCenters = spans.map((span) => {
      const rect = span.getBoundingClientRect();
      return rect.top + rect.height / 2;
    });

    const opacities = calculateWordOpacities(wordCenters, window.innerHeight, {
      baseOpacity,
      maxOpacity,
      thresholdRatioStart,
      thresholdRatioEnd,
    });

    const spanById = new Map(spans.map((span) => [span.id, span] as const));
    spans.forEach((span, index) => {
      const opacity = opacities[index];
      span.dataset.scActive = opacity === maxOpacity ? 'true' : 'false';
    });

    spans.forEach((span) => {
      const targetId = span.dataset.scBridgeTarget;
      if (!targetId) return;

      const target = spanById.get(targetId);
      if (!target) return;

      target.dataset.scActive = span.dataset.scActive;
    });
  }, [baseOpacity, maxOpacity, thresholdRatioEnd, thresholdRatioStart, wordsQuery]);

  useLayoutEffect(() => {
    const runUpdate = () => updateOpacity();

    applyBridges();
    runUpdate();

    const onResize = () => {
      applyBridges();
      scheduleOpacityUpdate(runUpdate);
    };

    const onScroll = () => {
      scheduleOpacityUpdate(runUpdate);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [applyBridges, scheduleOpacityUpdate, updateOpacity]);

  const styleVariables = useMemo(
    () =>
      ({
        '--scroll-copy-base-opacity': baseOpacity,
        '--scroll-copy-max-opacity': maxOpacity,
        '--scroll-copy-word-gap': `${wordGap}px`,
      }) as CSSProperties,
    [baseOpacity, maxOpacity, wordGap]
  );

  return (
    <div
      ref={containerRef}
      className={['scroll-copy', className].filter(Boolean).join(' ')}
      style={styleVariables}
    >
      {CONTENT.map((text, paragraphIndex) => {
        const tokens = tokenize(text);
        return (
          <p key={paragraphIndex}>
            {tokens.map((token, wordIndex) => (
              <span
                id={`scw-${paragraphIndex}-${wordIndex}`}
                key={`${paragraphIndex}-${wordIndex}`}
                className="sc-word"
                data-sc-active="false"
              >
                {token}
                {wordIndex < tokens.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
};

export default ScrollCopy;
