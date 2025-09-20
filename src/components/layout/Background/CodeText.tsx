import { useEffect, useState } from 'react';
import { useMouseCoords } from '@/hooks';

const WRAPPER = 'pointer-events-none absolute inset-0 opacity-20';
const CODE_BASE =
  'text-sm font-mono p-4 leading-snug transition duration-200 pointer-events-none text-[#d4d4d4]';

const blue = 'text-[#569cd6]'; // keywords
const lightBlue = 'text-[#9cdcfe]'; // variables
const yellow = 'text-[#dcdcaa]'; // constants/numbers
const aqua = 'text-[#4ec9b0]'; // types/objects
const pink = 'text-[#c586c0]'; // control flow / returns

const MASK =
  'radial-gradient(160px at var(--cursor-x, -9999px) var(--cursor-y, -9999px), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 60%)';

const CodeText = () => {
  const [enabled, setEnabled] = useState(false);
  useMouseCoords(enabled);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined' || window.innerWidth < 768)
      return;

    const reduceMotion = window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
    if (reduceMotion) return;

    const root = document.documentElement;
    root.style.setProperty('--cursor-x', '-9999px');
    root.style.setProperty('--cursor-y', '-9999px');
    setEnabled(true);

    return () => {
      root.style.removeProperty('--cursor-x');
      root.style.removeProperty('--cursor-y');
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className={WRAPPER}
      aria-hidden="true"
      style={{
        WebkitMaskImage: MASK,
        maskImage: MASK,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
      }}
    >
      {/* Snippet 1 */}
      <div className={`${CODE_BASE} fixed top-[20%] left-[20%]`}>
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
      <div className={`${CODE_BASE} fixed top-1/2 left-20`}>
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
      <div className={`${CODE_BASE} fixed right-20 bottom-20`}>
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
};

export default CodeText;
