// src/utils/easings.ts
// Common easing helpers for motion utilities.

/**
 * Ease-out quadrático: acelera rápido e desacelera suavemente.
 * t deve variar de 0 a 1.
 */
export function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

/**
 * Ease-in-out quadrático: acelera, mantém velocidade, depois desacelera.
 * Útil para animações mais longas.
 */
export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * Ease-out cubic: saída mais suave que o quadrático.
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Clamp helper – garante que o valor fique dentro de 0 – 1,
 * evitando artefatos em loops de animação.
 */
export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}
