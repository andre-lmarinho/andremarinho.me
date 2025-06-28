import React from 'react';

/**
 * Full-screen animated background with orbs, mesh lines, and floating particles.
 * Utilizes Tailwind CSS utility classes and custom animations defined in tailwind.config.js.
 */
interface AnimationBGProps {
  /**
   * Whether the central pulsating orb should be visible.
   * Defaults to true when the prop is not provided.
   */
  showCenterOrb?: boolean;
}

export default function AnimationBG({ showCenterOrb = true }: AnimationBGProps) {
  return (
    <div className="fixed z-10 inset-0 overflow-hidden pointer-events-none">
      {/* Top-right orb */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full opacity-20 blur-3xl animate-float" />

      {/* Bottom-left orb */}
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-accent-400 to-primary-500 rounded-full opacity-15 blur-3xl animate-float" />

      {/* Center orb */}
      {showCenterOrb && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full opacity-10 blur-3xl animate-pulse-slow" />
      )}

      {/* Animated mesh lines */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500 to-transparent h-px top-1/4 animate-gradient-x" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary-500 to-transparent h-px top-2/4 animate-gradient-x" style={{ animationDelay: '-3s' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-500 to-transparent h-px top-3/4 animate-gradient-x" style={{ animationDelay: '-4s' }} />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500 to-transparent w-px left-1/4 animate-gradient-y" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-500 to-transparent w-px left-2/4 animate-gradient-y" style={{ animationDelay: '-2s' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500 to-transparent w-px left-3/4 animate-gradient-y" style={{ animationDelay: '-1s' }} />
      </div>

      {/* Floating particles */}
      <div className="particles absolute inset-0">
        <div className="particle absolute w-2 h-2 bg-primary-400 rounded-full opacity-30 animate-float" style={{ top: '20%', left: '10%', animationDelay: '-1s' }} />
        <div className="particle absolute w-1 h-1 bg-secondary-400 rounded-full opacity-40 animate-float" style={{ top: '60%', left: '80%', animationDelay: '-2s' }} />
        <div className="particle absolute w-3 h-3 bg-accent-400 rounded-full opacity-20 animate-float" style={{ top: '80%', left: '20%', animationDelay: '-3s' }} />
        <div className="particle absolute w-1.5 h-1.5 bg-primary-300 rounded-full opacity-50 animate-float" style={{ top: '10%', left: '60%', animationDelay: '-5s' }} />
      </div>
    </div>
  );
};
