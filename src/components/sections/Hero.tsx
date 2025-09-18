'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { heroTexts } from '@/data';
import cn from '@/utils/cn';

const waveEmoji = String.fromCodePoint(0x1f44b);

export default function Hero() {
  const [wave, setWave] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setWave(true), 220);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section id="hero" className="my-12">
      <div className="flex justify-between gap-8">
        <div>
          <h1 className="flex gap-2 pb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            <span>Hey! I&apos;m Andre Marinho</span>
            <span
              aria-hidden="true"
              className={cn('inline-block origin-[70%_70%]', wave && 'animate-wave')}
            >
              {waveEmoji}
            </span>
          </h1>
          <div className="grid gap-4 leading-normal">
            {heroTexts.map((text) => (
              <p key={text} className="sm:max-w-md">
                {text}
              </p>
            ))}
          </div>
        </div>
        <Image
          alt="Andre Marinho"
          loading="lazy"
          width={176}
          height={176}
          className="hidden h-44 w-44 transform-gpu rounded-full sm:block"
          src="/images/Me.webp"
          sizes="176px"
        />
      </div>
    </section>
  );
}
