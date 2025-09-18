'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

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

  const wordsQuery = '.sc-word';

  const clearOverlays = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    el.querySelectorAll<HTMLSpanElement>('.sc-next').forEach((n) => n.remove());
    el.querySelectorAll<HTMLSpanElement>(wordsQuery).forEach((w) => {
      w.style.position = '';
      (w as HTMLElement).style.visibility = '';
      (w as HTMLElement).style.display = '';
      (w as HTMLElement).style.width = '';
      (w as HTMLElement).style.overflow = '';
      w.classList.remove('sc-hide');
      (w as HTMLElement).removeAttribute('data-sc-bridge-target');
      (w as HTMLElement).removeAttribute('data-sc-bridge-source');
    });
  }, []);

  const buildParagraphBridges = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    clearOverlays();

    const paras = Array.from(el.querySelectorAll<HTMLParagraphElement>('p'));
    paras.forEach((p, pIdx) => {
      const spans = Array.from(p.querySelectorAll<HTMLSpanElement>(wordsQuery));
      if (spans.length === 0) return;

      // Bridge paragraph boundary: logically link last word of current paragraph to first word of next paragraph
      const nextPara = paras[pIdx + 1];
      if (nextPara) {
        const nextFirst = nextPara.querySelector<HTMLSpanElement>(wordsQuery);
        const lastSpan = spans[spans.length - 1];
        if (nextFirst && lastSpan) {
          // Ensure both have ids
          if (!lastSpan.id) lastSpan.id = `scw-last-${pIdx}`;
          if (!nextFirst.id) nextFirst.id = `scw-first-${pIdx + 1}`;
          // Store a logical bridge between them for opacity control
          (lastSpan as HTMLElement).setAttribute('data-sc-bridge-target', nextFirst.id);
          (nextFirst as HTMLElement).setAttribute('data-sc-bridge-source', lastSpan.id);
        }
      }
    });
  }, [clearOverlays]);

  const updateOpacity = useCallback(() => {
    rafRef.current = null;
    const el = containerRef.current;
    if (!el) return;

    const winH = window.innerHeight;
    const base = baseOpacity;
    const max = maxOpacity;

    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>(wordsQuery));
    const opMap = new Map<Element, number>();
    const lastIndex = Math.max(1, spans.length - 1);
    let activeIdx = -1;
    spans.forEach((span, idx) => {
      const r = span.getBoundingClientRect();
      const c = r.top + r.height / 2;
      const t = idx / lastIndex; // 0 for first, 1 for last
      const ratio = thresholdRatioStart + t * (thresholdRatioEnd - thresholdRatioStart);
      const cut = winH * ratio;
      if (c <= cut) activeIdx = idx;
    });

    spans.forEach((span, idx) => {
      const opacity = idx <= activeIdx ? max : base;
      opMap.set(span, opacity);
    });

    const bridges: Array<{ from: HTMLSpanElement; to: HTMLSpanElement }> = [];
    spans.forEach((span) => {
      const opacity = opMap.get(span) ?? base;
      span.style.opacity = String(opacity);
      // If this span bridges to next paragraph, force the next paragraph's first word
      // to share the same opacity for a cohesive transition.
      const targetId = (span as HTMLElement).dataset.scBridgeTarget;
      if (targetId) {
        const target = document.getElementById(targetId) as HTMLSpanElement | null;
        if (target) bridges.push({ from: span, to: target });
      }
    });

    bridges.forEach(({ from, to }) => {
      const opacity = opMap.get(from) ?? base;
      to.style.opacity = String(opacity);
    });
  }, [baseOpacity, maxOpacity, thresholdRatioStart, thresholdRatioEnd]);

  useLayoutEffect(() => {
    // Build paragraph bridges after initial paint for accurate layout
    buildParagraphBridges();
    updateOpacity();
    // Rebuild overlays on resize (line breaks change)
    const onResize = () => {
      buildParagraphBridges();
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(updateOpacity);
      }
    };
    window.addEventListener('resize', onResize);

    // Update opacity on scroll
    const onScroll = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(updateOpacity);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [buildParagraphBridges, updateOpacity]);

  // Rebuild when mounted (content is internal)
  useEffect(() => {
    buildParagraphBridges();
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(updateOpacity);
  }, [buildParagraphBridges, updateOpacity]);

  return (
    <div ref={containerRef} className={className}>
      {CONTENT.map((text, i) => {
        const tokens = tokenize(text);
        return (
          <p key={i} style={{ wordSpacing: wordGap }}>
            {tokens.map((tok, j) => (
              <span id={`scw-${i}-${j}`} key={`${i}-${j}`} className="sc-word">
                {tok}
                {j < tokens.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
};

export default ScrollCopy;

