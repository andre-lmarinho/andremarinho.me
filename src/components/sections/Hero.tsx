// src/components/sections/Hero.tsx

import React from 'react';
import me from '@/assets/images/Me.jpg';

export default function Hero() {
  return (
    <>
      <section id="hero" className="my-12">
        <div className="flex justify-between gap-8">
          <div>
            <h1 className="flex gap-2 pb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="text-[var(--text-primary)]">Hey! I'm André Marinho</span>
              <span aria-hidden="true" className="animate-wave inline-block origin-[70%_70%]">
                👋🏼
              </span>
            </h1>
            <div className="grid gap-4 leading-normal">
              <p className="sm:max-w-md">
                I'm a Front End Developer based in Salvador. I create elegant, business-driven
                interfaces through clean, strategic code.
              </p>
              <p className="sm:max-w-md">
                Blending front-end expertise with a background in digital marketing, I build
                user-focused experiences using React, TypeScript, and Node.js.
              </p>
            </div>
          </div>
          <img
            alt="André Marinho"
            loading="lazy"
            width={176}
            height={176}
            decoding="async"
            className="hidden h-44 w-44 transform-gpu rounded-full sm:block"
            style={{ color: 'transparent' }}
            src={me}
          />
        </div>
      </section>
    </>
  );
}
