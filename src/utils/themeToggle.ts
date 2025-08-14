// utils/themeToggle.ts
import { easeOutQuad } from '@/utils/easings';

export interface themeToggleOptions {
  button: HTMLElement;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  shouldReduceMotion: boolean;
  cellSize?: number;
  durationMs?: number;
}

let activeCleanup: (() => void) | null = null;

export default function themeToggle({
  button,
  darkMode,
  setDarkMode,
  shouldReduceMotion,
  cellSize = 140,
  durationMs = 900,
}: themeToggleOptions) {
  /* cancel any running burst */
  if (activeCleanup) {
    activeCleanup();
    activeCleanup = null;
  }

  /* reduced-motion fallback */
  if (shouldReduceMotion) {
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      background: getComputedStyle(document.body).backgroundColor,
      pointerEvents: 'none',
      transition: 'opacity 200ms',
      zIndex: '9999',
    } as CSSStyleDeclaration);

    document.body.appendChild(overlay);
    /* theme swap (instant) */
    setDarkMode(!darkMode);

    requestAnimationFrame(() => (overlay.style.opacity = '0'));
    const id = setTimeout(() => overlay.remove(), 210);
    activeCleanup = () => {
      clearTimeout(id);
      overlay.remove();
    };
    return;
  }

  /* canvas setup */
  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth;
  const h = window.innerHeight;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    width: `${w}px`,
    height: `${h}px`,
    pointerEvents: 'none',
    zIndex: '9999',
  } as CSSStyleDeclaration);

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    setDarkMode(!darkMode);
    return;
  }
  ctx.scale(dpr, dpr);
  ctx.imageSmoothingEnabled = false;
  document.body.appendChild(canvas);

  /* grid + distances */
  const { left, top, width, height } = button.getBoundingClientRect();
  const cx = left + width / 2;
  const cy = top + height / 2;

  const cols = Math.ceil(w / cellSize);
  const rows = Math.ceil(h / cellSize);
  type Cell = { x: number; y: number; dist: number };
  const cells: Cell[] = [];
  let maxDist = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cellSize;
      const y = r * cellSize;
      const dist = Math.hypot(x + cellSize / 2 - cx, y + cellSize / 2 - cy);
      cells.push({ x, y, dist });
      if (dist > maxDist) maxDist = dist;
    }
  }
  cells.sort((a, b) => a.dist - b.dist); // ascending

  /* paint screen with OLD color */
  const oldColor = getComputedStyle(document.body).backgroundColor;
  ctx.fillStyle = oldColor;
  ctx.fillRect(0, 0, w, h);

  /* swap theme immediately so new colors are under the canvas */
  setDarkMode(!darkMode);

  /* animate: clear blocks inside radius */
  const start = performance.now();
  const frame = (now: number) => {
    const t = Math.min((now - start) / durationMs, 1);
    const radius = easeOutQuad(t) * maxDist;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = oldColor;
    for (const cell of cells) {
      if (cell.dist > radius) {
        ctx.fillRect(cell.x, cell.y, cellSize, cellSize);
      }
      /* removed break → loop over all cells */
    }

    if (t < 1) requestAnimationFrame(frame);
    else fadeOutCanvas();
  };

  const fadeOutCanvas = () => {
    canvas.style.transition = 'opacity 150ms ease-out';
    canvas.style.opacity = '0';
    const id = setTimeout(() => {
      canvas.remove();
      activeCleanup = null;
    }, 160);
    activeCleanup = () => {
      clearTimeout(id);
      canvas.remove();
      activeCleanup = null;
    };
  };

  activeCleanup = () => {
    canvas.remove();
    activeCleanup = null;
  };

  requestAnimationFrame(frame);
}
