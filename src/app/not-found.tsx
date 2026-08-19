"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

const SPRINGS = [
  { damping: 28, stiffness: 180 },
  { damping: 22, stiffness: 140 },
  { damping: 28, stiffness: 180 },
];

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef(0);

  const init = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = containerRef.current;
    const digits = digitsRef.current;
    const glow = glowRef.current;
    if (!el || digits.length !== 3 || !glow) return;

    const state = SPRINGS.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }));

    let px: number;
    let py: number;
    let ptime = 0;
    let hasPointer = false;
    let running = true;

    const rubberband = (o: number, d: number) => {
      const c = 0.55;
      return (o * d * c) / (d + c * Math.abs(o));
    };

    const tick = () => {
      if (!running) return;

      const now = performance.now();
      const rawDt = now - (ptime || now);
      ptime = now;

      if (!hasPointer) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min(rawDt, 32) / 1000;
      const rect = el.getBoundingClientRect();
      const hw = rect.width / 2;
      const hh = rect.height / 2;

      for (let i = 0; i < 3; i++) {
        const s = state[i];
        const cfg = SPRINGS[i];

        let tx = px - hw;
        let ty = py - hh;

        if (px < 0) tx += rubberband(px, hw);
        else if (px > rect.width) tx += rubberband(px - rect.width, hw);
        if (py < 0) ty += rubberband(py, hh);
        else if (py > rect.height) ty += rubberband(py - rect.height, hh);

        const ax = -cfg.damping * s.vx + cfg.stiffness * (tx - s.x);
        const ay = -cfg.damping * s.vy + cfg.stiffness * (ty - s.y);

        s.vx += ax * dt;
        s.vy += ay * dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;

        const d = digits[i];
        if (!d) continue;
        d.style.transform = `translate3d(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px, 0)`;

        const spd = Math.hypot(s.vx, s.vy);
        d.style.setProperty(
          "--glow",
          (Math.min(spd / 300, 1) * 0.6).toFixed(2),
        );
      }

      glow.style.transform = `translate3d(${px.toFixed(0)}px, ${py.toFixed(0)}px, 0) translate(-50%, -50%)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      px = e.clientX - rect.left;
      py = e.clientY - rect.top;

      if (!hasPointer) {
        hasPointer = true;
        ptime = performance.now();
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const onLeave = () => {
      for (let i = 0; i < 3; i++) {
        state[i].vx *= 0.3;
        state[i].vy *= 0.3;
      }
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useEffect(() => init(), [init]);

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-6">
      <div
        ref={containerRef}
        className="pointer-events-auto relative flex select-none items-center justify-center"
        style={{ isolation: "isolate" }}
      >
        <div
          ref={glowRef}
          className="nf-glow-dot"
          aria-hidden="true"
          style={{
            left: 0,
            top: 0,
            transform: "translate3d(50%, 50%, 0) translate(-50%, -50%)",
          }}
        />

        <h1 className="nf-digits flex items-baseline gap-3 font-display text-[clamp(6rem,20vw,14rem)] font-semibold leading-none tracking-tighter">
          {["4", "0", "4"].map((d, i) => (
            <span
              key={i === 1 ? "zero" : `four-${i}`}
              ref={(el) => {
                digitsRef.current[i] = el;
              }}
              className="nf-digit relative z-10"
              style={{ willChange: "transform" }}
            >
              {d}
            </span>
          ))}
        </h1>
      </div>

      <p className="nf-message mt-10 max-w-md text-center font-body text-lg text-muted">
        This page doesn&apos;t exist — but the homepage does.
      </p>

      <Link
        href="/"
        className="nf-button mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 font-body text-sm text-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
      >
        <span className="nf-arrow" aria-hidden="true">
          ←
        </span>
        Back to home
      </Link>
    </div>
  );
}
