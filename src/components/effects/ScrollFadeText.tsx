'use client';

import React, { CSSProperties, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { tokenize, createBridges } from '../../utils/tokenize';

type Props = {
  content: string[];
  className?: string;
  baseOpacity?: number;
  maxOpacity?: number;
  thresholdRatioStart?: number;
  thresholdRatioEnd?: number;
  wordGap?: number;
};

export const ScrollFadeText: React.FC<Props> = ({
  content,
  className = '',
  baseOpacity = 0.35,
  maxOpacity = 1,
  thresholdRatioStart = 0.65,
  thresholdRatioEnd = 0.75,
  wordGap = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Caches for fast reads/writes at scroll time
  const spansRef = useRef<HTMLSpanElement[]>([]);
  const centersRef = useRef<number[]>([]);
  const prevActiveRef = useRef<number>(-1);
  const bridgeTargetElRef = useRef<Map<string, HTMLSpanElement>>(new Map());

  const schedule = useCallback((cb: () => void) => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      cb();
    });
  }, []);

  const buildDomCaches = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>('.sc-word'));
    spansRef.current = spans;
  }, []);

  const recalcCenters = useCallback(() => {
    centersRef.current = spansRef.current.map((s) => {
      const r = s.getBoundingClientRect();
      return r.top + window.scrollY + r.height / 2;
    });
  }, []);

  const applyBridges = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const paragraphs = Array.from(el.querySelectorAll<HTMLParagraphElement>('p'));
    const spansByParagraph = paragraphs.map((p) =>
      Array.from(p.querySelectorAll<HTMLSpanElement>('.sc-word'))
    );

    const flatSpans = spansByParagraph.flat();
    const byId = new Map(flatSpans.map((s) => [s.id, s]));
    const bridges = createBridges(spansByParagraph.map((ws) => ws.map((s) => s.id)));
    const bridgeElMap = new Map<string, HTMLSpanElement>();
    for (const { fromId, toId } of bridges) {
      const target = byId.get(toId);
      if (target) bridgeElMap.set(fromId, target);
    }
    bridgeTargetElRef.current = bridgeElMap;
  }, []);

  const ratioForIndex = useCallback(
    (index: number, lastIndex: number) => {
      const t = lastIndex > 0 ? index / lastIndex : 0;
      return thresholdRatioStart + t * (thresholdRatioEnd - thresholdRatioStart);
    },
    [thresholdRatioStart, thresholdRatioEnd]
  );

  const computeActiveIndex = useCallback(() => {
    const centers = centersRef.current;
    const last = Math.max(0, centers.length - 1);
    if (centers.length === 0) return -1;

    let i = Math.min(Math.max(prevActiveRef.current, -1), last);

    const isActive = (idx: number) => {
      if (idx < 0) return true;
      const cutoff = window.scrollY + window.innerHeight * ratioForIndex(idx, last);
      return centers[idx] <= cutoff;
    };

    while (i + 1 <= last && isActive(i + 1)) i++;
    while (i >= 0 && !isActive(i)) i--;

    return i;
  }, [ratioForIndex]);

  const setRangeActive = useCallback((from: number, to: number, active: boolean) => {
    const spans = spansRef.current;
    const start = Math.max(0, Math.min(from, to));
    const end = Math.min(spans.length - 1, Math.max(from, to));
    if (start > end || !spans.length) return;

    const val = active ? 'true' : 'false';

    for (let k = start; k <= end; k++) {
      const span = spans[k];
      if (span.dataset.scActive !== val) {
        span.dataset.scActive = val;

        const target = bridgeTargetElRef.current.get(span.id);
        if (target) target.dataset.scActive = val;
      }
    }
  }, []);

  const updateOpacity = useCallback(() => {
    if (!spansRef.current.length) return;
    const nextActive = computeActiveIndex();
    const prevActive = prevActiveRef.current;
    if (nextActive === prevActive) return;

    if (nextActive > prevActive) {
      setRangeActive(prevActive + 1, nextActive, true);
    } else {
      setRangeActive(nextActive + 1, prevActive, false);
    }
    prevActiveRef.current = nextActive;
  }, [computeActiveIndex, setRangeActive]);

  useLayoutEffect(() => {
    const run = () => updateOpacity();

    buildDomCaches();
    applyBridges();
    recalcCenters();
    run();

    const onScroll = () => schedule(run);
    const onResize = () => {
      applyBridges();
      recalcCenters();
      schedule(run);
    };

    const ro = new ResizeObserver(() => {
      applyBridges();
      recalcCenters();
      schedule(run);
    });
    if (containerRef.current) ro.observe(containerRef.current);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const documentFonts = document?.fonts;
    if (documentFonts && 'ready' in documentFonts) {
      // @ts-expect-error -- Safari does not type document.fonts.ready as a Promise yet.
      const ready = documentFonts.ready as Promise<void>;
      void ready.then(() => {
        recalcCenters();
        schedule(run);
      });
    }

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [content, applyBridges, buildDomCaches, recalcCenters, schedule, updateOpacity]);

  const styleVariables = useMemo(
    () =>
      ({
        '--scroll-copy-base-opacity': baseOpacity.toString(),
        '--scroll-copy-max-opacity': maxOpacity.toString(),
        '--scroll-copy-word-gap': `${wordGap}px`,
      }) as CSSProperties,
    [baseOpacity, maxOpacity, wordGap]
  );

  return (
    <div
      ref={containerRef}
      className={['scroll-copy space-y-8', className].filter(Boolean).join(' ')}
      style={styleVariables}
    >
      {content.map((text, paragraphIndex) => {
        const tokens = tokenize(text);
        return (
          <p
            key={paragraphIndex}
            className="[contain-intrinsic-size:1px_500px] [content-visibility:auto]"
          >
            {tokens.map((token, wordIndex) => (
              <span
                id={`scw-${paragraphIndex}-${wordIndex}`}
                key={`${paragraphIndex}-${wordIndex}`}
                className={[
                  'sc-word',
                  '[margin-right:var(--scroll-copy-word-gap)]',
                  'transition-opacity',
                  '[will-change:opacity]',
                  'opacity-[var(--scroll-copy-base-opacity)]',
                  'data-[sc-active=true]:opacity-[var(--scroll-copy-max-opacity)]',
                  'duration-[120ms]',
                  'ease-linear',
                ].join(' ')}
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
