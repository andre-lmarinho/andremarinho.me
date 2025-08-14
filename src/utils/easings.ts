// src/utils/easings.ts
// Common easing helpers for motion utilities.

/**
 * Quadratic ease-out: starts fast and slows smoothly.
 * t must vary from 0 to 1.
 */
export function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

/**
 * Quadratic ease-in-out: speeds up, stays steady, then slows down.
 * Useful for longer animations.
 */
export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * Cubic ease-out: smoother exit than quadratic.
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Clamp helper – keeps value between 0 and 1,
 * avoiding artifacts in animation loops.
 */
export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}
