// components/CodeText.tsx
import React, { useEffect, useState } from 'react';
import useMouseCoords from '../../hooks/useMouseCoords';

const baseCodeStyle = `
  text-sm font-mono p-4 leading-snug transition duration-200 pointer-events-none
`;

const blue = 'text-[#569cd6]';
const lightBlue = 'text-[#9cdcfe]';
const yellow = 'text-[#dcdcaa]';
const aqua = 'text-[#4ec9b0]';
const pink = 'text-[#c586c0]';

export default function CodeText() {
  const coords = useMouseCoords();
  const [, setTick] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;
    setEnabled(true);
    const interval = setInterval(() => setTick((t) => t + 1), 16);
    return () => clearInterval(interval);
  }, []);

  if (!enabled) return null;

  const x = coords.current.x + window.scrollX;
  const y = coords.current.y + window.scrollY;
  const mask = `radial-gradient(160px at ${x}px ${y}px, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 100%)`;

  return (
    <div
      className="absolute inset-0 opacity-20 pointer-events-none z-30"
      style={{
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
      }}
    >
      {/* Snippet 1 */}
      <div className={`${baseCodeStyle} fixed top-[20%] left-[20%]`}>
        <pre>
          <code>
            <span className={blue}>useEffect</span>(() =&gt; {'{'}
            {'\n'}
            &nbsp;&nbsp;<span className={blue}>const</span>{' '}
            <span className={yellow}>updateGradient</span> = () =&gt; {'{'}
            {'\n'}
            &nbsp;&nbsp;&nbsp;&nbsp;<span className={blue}>const</span>{' '}
            <span className={lightBlue}>x</span> = <span className={aqua}>coords</span>.current.x +{' '}
            <span className={aqua}>window</span>.scrollX;{'\n'}
            &nbsp;&nbsp;&nbsp;&nbsp;<span className={blue}>const</span>{' '}
            <span className={lightBlue}>y</span> = <span className={aqua}>coords</span>.current.y +{' '}
            <span className={aqua}>window</span>.scrollY;{'\n'}
            &nbsp;&nbsp;{'}'}
            {'\n'}
            {'}'}, []);
          </code>
        </pre>
      </div>

      {/* Snippet 2 */}
      <div className={`${baseCodeStyle} fixed top-1/2 left-20`}>
        <pre>
          <code>
            <span className={lightBlue}>ids</span>.forEach((<span className={lightBlue}>id</span>)
            =&gt; {'{'}
            {'\n'}
            &nbsp;&nbsp;<span className={blue}>const</span>{' '}
            <span className={lightBlue}>section</span> = <span className={aqua}>document</span>
            .getElementById(
            <span className={lightBlue}>id</span>);{'\n'}
            &nbsp;&nbsp;<span className={blue}>if</span> (!
            <span className={lightBlue}>section</span>) <span className={pink}>return</span>;{'\n'}
            {'}'});
          </code>
        </pre>
      </div>

      {/* Snippet 3 */}
      <div className={`${baseCodeStyle} fixed bottom-20 left-1/2 -translate-x-1/2`}>
        <pre>
          <code>
            <span className={blue}>useEffect</span>(() =&gt; {'{'}
            {'\n'}
            &nbsp;&nbsp;<span className={blue}>const</span> <span className={lightBlue}>html</span>{' '}
            = <span className={aqua}>document</span>.documentElement;{'\n'}
            {'}'}, []);
          </code>
        </pre>
      </div>
    </div>
  );
}
