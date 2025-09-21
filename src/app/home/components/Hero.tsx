'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import cn from '@/utils';

const heroTexts = [
  'I am a Front-End Developer based in Salvador. I create digital experiences that connect design, strategy and business growth.',
  'I run Duonorth Studio, where I turn ideas into products that are fast, meaningful and focused on results.',
] as const;

const waveEmoji = String.fromCodePoint(0x1f44b);

export default function Hero() {
  const [wave, setWave] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setWave(true), 220);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section id="hero" className="mb-20">
      <div className="flex justify-between gap-8">
        <div>
          <h1 className="flex gap-2">
            <span>Hey! I&apos;m Andre Marinho</span>
            <span
              aria-hidden="true"
              className={cn('inline-block origin-[70%_70%]', wave && 'animate-wave')}
            >
              {waveEmoji}
            </span>
          </h1>
          {heroTexts.map((text) => (
            <p key={text} className="sm:max-w-md">
              {text}
            </p>
          ))}
        </div>
        <Image
          alt="Andre Marinho"
          width={176}
          height={176}
          className="hidden h-44 w-44 transform-gpu rounded-full sm:block"
          src="/images/Me.webp"
          sizes="176px"
          priority
        />
      </div>
    </section>
  );
}
