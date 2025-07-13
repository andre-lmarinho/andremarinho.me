//src/components/visuals/BGAnimation

import React from 'react';

/**
 * Full-screen animated background with orbs, mesh lines, and floating particles.
 * Utilizes Tailwind CSS utility classes and custom animations defined in tailwind.config.js.
 */

export default function AnimationBG() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none " aria-hidden="true">
      {/* Top-right orb */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full opacity-20 blur-3xl motion-safe:animate-float motion-reduce:animate-none" />

      {/* Bottom-left orb */}
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-accent-400 to-primary-500 rounded-full opacity-15 blur-3xl motion-safe:animate-float motion-reduce:animate-none" />

      {/* Animated mesh lines */}
      <div className="absolute inset-0 opacity-10 dark:opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500 to-transparent h-px top-1/4 animate-gradient-x" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary-500 to-transparent h-px top-2/4 animate-gradient-x"
          style={{ animationDelay: '-3s' }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-500 to-transparent h-px top-3/4 animate-gradient-x"
          style={{ animationDelay: '-4s' }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500 to-transparent w-px left-1/4 animate-gradient-y" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-500 to-transparent w-px left-2/4 animate-gradient-y"
          style={{ animationDelay: '-2s' }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500 to-transparent w-px left-3/4 animate-gradient-y"
          style={{ animationDelay: '-1s' }}
        />
      </div>

      {/* Floating particles */}
      <div className="particles absolute inset-0">
        <div
          className="particle absolute w-2 h-2 bg-primary-400 rounded-full opacity-30 motion-safe:animate-float motion-reduce:animate-none"
          style={{ top: '20%', left: '10%', animationDelay: '-1s' }}
        />
        <div
          className="particle absolute w-1 h-1 bg-secondary-400 rounded-full opacity-40 motion-safe:animate-float motion-reduce:animate-none"
          style={{ top: '60%', left: '80%', animationDelay: '-2s' }}
        />
        <div
          className="particle absolute w-3 h-3 bg-accent-400 rounded-full opacity-20 motion-safe:animate-float motion-reduce:animate-none"
          style={{ top: '80%', left: '20%', animationDelay: '-3s' }}
        />
        <div
          className="particle absolute w-1.5 h-1.5 bg-primary-300 rounded-full opacity-50 motion-safe:animate-float motion-reduce:animate-none"
          style={{ top: '10%', left: '60%', animationDelay: '-5s' }}
        />
      </div>
    </div>
  );
}
