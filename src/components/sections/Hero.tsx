// src/components/sections/Hero.tsx

import React, { useEffect, useState } from 'react';
import me from '@/assets/images/Me.webp';
import { heroTexts } from '@/data';

export default function Hero() {
  const [wave, setWave] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setWave(true), 220);
    return () => clearTimeout(id);
  }, []);

  return (
    <section id="hero" className="my-12">
      <div className="flex justify-between gap-8">
        <div>
          <h1 className="flex gap-2 pb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            <span>Hey! I'm André Marinho</span>
            <span
              aria-hidden="true"
              className={`inline-block origin-[70%_70%] ${wave ? 'animate-wave' : ''}`}
            >
              👋🏼
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
        <img
          alt="André Marinho"
          loading="lazy"
          width={176}
          height={176}
          decoding="async"
          className="hidden h-44 w-44 transform-gpu rounded-full sm:block"
          src={me}
        />
      </div>
    </section>
  );
}
