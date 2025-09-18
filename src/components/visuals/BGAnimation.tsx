'use client';
// src/components/visuals/BGAnimation.tsx

import React from 'react';

/**
 * Full-screen animated background with orbs, mesh lines, and floating particles.
 * Utilizes Tailwind CSS utility classes and custom animations defined in tailwind.config.js.
 */

export default function AnimationBG() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {/* Top-right orb */}
      <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-600 opacity-20 blur-3xl motion-safe:animate-float motion-reduce:animate-none" />

      {/* Bottom-left orb */}
      <div className="absolute -bottom-40 -left-60 h-96 w-96 rounded-full bg-gradient-to-tr from-zinc-400 to-zinc-700 opacity-10 blur-3xl motion-safe:animate-float motion-reduce:animate-none" />

      {/* Animated mesh lines */}
      <div className="absolute inset-0 opacity-10 dark:opacity-10">
        <div className="absolute inset-0 top-1/4 h-px animate-gradient-x bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
        <div
          className="absolute inset-0 top-2/4 h-px animate-gradient-x bg-gradient-to-r from-transparent via-zinc-500/30 to-transparent"
          style={{ animationDelay: '-3s' }}
        />
        <div
          className="absolute inset-0 top-3/4 h-px animate-gradient-x bg-gradient-to-r from-transparent via-zinc-400/40 to-transparent"
          style={{ animationDelay: '-4s' }}
        />

        <div className="absolute inset-0 left-1/4 w-px animate-gradient-y bg-gradient-to-b from-transparent via-zinc-600/40 to-transparent" />
        <div
          className="absolute inset-0 left-2/4 w-px animate-gradient-y bg-gradient-to-b from-transparent via-zinc-500/40 to-transparent"
          style={{ animationDelay: '-2s' }}
        />
        <div
          className="absolute inset-0 left-3/4 w-px animate-gradient-y bg-gradient-to-b from-transparent via-zinc-400/40 to-transparent"
          style={{ animationDelay: '-1s' }}
        />
      </div>

      {/* Floating particles */}
      <div className="particles absolute inset-0">
        <div
          className="particle absolute h-2 w-2 rounded-full bg-zinc-400 opacity-20 motion-safe:animate-float motion-reduce:animate-none"
          style={{ top: '20%', left: '10%', animationDelay: '-1s' }}
        />
        <div
          className="particle absolute h-1 w-1 rounded-full bg-zinc-500 opacity-30 motion-safe:animate-float motion-reduce:animate-none"
          style={{ top: '60%', left: '80%', animationDelay: '-2s' }}
        />
        <div
          className="particle absolute h-3 w-3 rounded-full bg-zinc-600 opacity-10 motion-safe:animate-float motion-reduce:animate-none"
          style={{ top: '80%', left: '20%', animationDelay: '-3s' }}
        />
        <div
          className="particle absolute h-1.5 w-1.5 rounded-full bg-zinc-300 opacity-40 motion-safe:animate-float motion-reduce:animate-none"
          style={{ top: '10%', left: '60%', animationDelay: '-5s' }}
        />
      </div>
    </div>
  );
}
