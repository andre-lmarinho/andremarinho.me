// src/components/visuals/CodeText.tsx

import React, { useEffect, useState } from 'react';
import { useMouseCoords } from '@/hooks';
import { isDesktop } from '@/utils';

const baseCodeStyle = `
  text-sm font-mono p-4 leading-snug transition duration-200 pointer-events-none
  text-[#d4d4d4]`;

const blue = 'text-[#569cd6]'; // keywords
const lightBlue = 'text-[#9cdcfe]'; // variables
const yellow = 'text-[#dcdcaa]'; // constants/numbers
const aqua = 'text-[#4ec9b0]'; // types/objects
const pink = 'text-[#c586c0]'; // control flow / returns

export default function CodeText() {
  const [enabled, setEnabled] = useState(false);
  useMouseCoords(enabled);

  useEffect(() => {
    if (!isDesktop()) return;
    const reduceMotion = window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
    if (reduceMotion) return;
    setEnabled(true);
  }, []);

  if (!enabled) return null;

  const mask =
    'radial-gradient(160px at var(--cursor-x) var(--cursor-y), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 60%)';

  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-20"
      aria-hidden="true"
      style={{
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
      }}
    >
      {/* Snippet 1 */}
      <div className={`${baseCodeStyle} fixed left-[20%] top-[20%]`}>
        <pre>
          <code>
            <span className={blue}>useEffect</span>
            <span>(</span>
            <span className={lightBlue}>&rarr;</span> {'{'}
            {'\n'}
            &nbsp;&nbsp;<span className={blue}>const</span>{' '}
            <span className={yellow}>updateGradient</span> <span>=</span>{' '}
            <span className={lightBlue}>&rarr;</span> {'{'}
            {'\n'}
            &nbsp;&nbsp;&nbsp;&nbsp;<span className={blue}>const</span>{' '}
            <span className={lightBlue}>x</span> <span>=</span> <span className={aqua}>coords</span>
            <span>.current.x</span>
            {' + '}
            <span className={aqua}>window.scrollX</span>;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className={blue}>const</span>{' '}
            <span className={lightBlue}>y</span> <span>=</span> <span className={aqua}>coords</span>
            <span>.current.y</span>
            {' + '}
            <span className={aqua}>window.scrollY</span>;<br />
            &nbsp;&nbsp;{'}'}
            {'\n'}
            {'}'}
            <span>,</span> <span>[]</span>
            <span>)</span>
            <span>;</span>
          </code>
        </pre>
      </div>

      {/* Snippet 2 */}
      <div className={`${baseCodeStyle} fixed left-20 top-1/2`}>
        <pre>
          <code>
            <span className={lightBlue}>ids</span>
            <span>.</span>
            <span className={blue}>forEach</span>
            <span>(</span>
            <span className={lightBlue}>id</span>
            <span>)</span>
            <span> =&gt; {'{'}</span>
            {'\n'}
            &nbsp;&nbsp;<span className={blue}>const</span>{' '}
            <span className={lightBlue}>section</span> <span>=</span>{' '}
            <span className={aqua}>document.getElementById</span>
            <span>(</span>
            <span className={lightBlue}>id</span>
            <span>)</span>;<br />
            &nbsp;&nbsp;<span className={blue}>if</span>
            <span> (!</span>
            <span className={lightBlue}>section</span>
            <span>)</span> <span className={pink}>return</span>
            <span>;</span>
            {'\n'}
            {'}'}
            <span>);</span>
          </code>
        </pre>
      </div>

      {/* Snippet 3 */}
      <div className={`${baseCodeStyle} fixed bottom-20 right-20`}>
        <pre>
          <code>
            <span className={blue}>useEffect</span>
            <span>(</span>
            <span className={lightBlue}>&rarr;</span> {'{'}
            {'\n'}
            &nbsp;&nbsp;<span className={blue}>const</span> <span className={lightBlue}>html</span>{' '}
            <span>=</span> <span className={aqua}>document.documentElement</span>;<br />
            {'}'}
            <span>,</span> <span>[]</span>
            <span>)</span>
            <span>;</span>
          </code>
        </pre>
      </div>
    </div>
  );
}
