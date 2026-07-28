"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import styles from "./reveal.module.css";

/* useLayoutEffect so the segment dims in the same frame it is painted.
   With useEffect the first paint lands fully lit and the dimming shows up a
   frame later, which reads as a flash. */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** How far past the last node the front must travel for the tail of a segment
    to finish. Has to clear the widest ramp in reveal.module.css. */
const OVERSHOOT = 5;

type Anchor = "head" | "tail";

/** The scroll span a segment reveals across.

    Not a fixed band in the viewport: each segment owns a stretch of the page
    and stretches its curve over it. The opening segment runs from the top of
    the document to the cards, the closing one from the cards to the end of
    the page. Both are measured live, so the curve follows the layout instead
    of assuming it. */
function spanOf(anchor: Anchor, rail: Element | null) {
  const vh = window.innerHeight;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);

  if (!rail) return { start: 0, end: maxScroll };

  const box = rail.getBoundingClientRect();
  const top = box.top + window.scrollY;
  const bottom = box.bottom + window.scrollY;

  if (anchor === "head") {
    // Finished by the time the cards are arriving.
    return { start: 0, end: Math.max(1, top - vh * 0.4) };
  }

  // Picks up once the cards have been seen, finishes with the page. The slack
  // at the end matters: opening tiles make the document taller, so the true
  // bottom drifts while you scroll toward it and an exact maxScroll target is
  // never quite reached.
  return {
    start: Math.max(0, bottom - vh),
    end: Math.max(1, maxScroll - vh * 0.15),
  };
}

export default function RevealSegment({
  anchor,
  total,
  pinned,
  className,
  children,
}: {
  anchor: Anchor;
  total: number;
  /** Nodes outside the reveal, always lit. The front starts here so the first
      scrolled node sits right at the switch instead of behind dead travel. */
  pinned: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rail = document.querySelector("[data-rail]");
    let frame = 0;

    const update = () => {
      frame = 0;
      const { start, end } = spanOf(anchor, rail);
      const progress = clamp01((window.scrollY - start) / (end - start));
      // The front tracks the scroll in both directions, so going back up
      // un-reveals. That costs nothing in resting state: --on stays binary, so
      // a node the front retreats over simply flips back to 0 and the
      // transition carries it there. An interrupted transition retargets and
      // still finishes; it never parks anywhere in between.
      //
      // The pinned nodes are already lit, so the scroll carries only the rest.
      // OVERSHOOT lets the last node clear the switch rather than sit on it.
      const front = pinned + progress * (total + OVERSHOOT - pinned);
      el.style.setProperty("--front", String(front));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    // Armed a frame later so the initial drop from the lit default down to the
    // opening front does not animate.
    const arm = requestAnimationFrame(() => {
      el.dataset.armed = "";
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      cancelAnimationFrame(arm);
      delete el.dataset.armed;
      el.style.removeProperty("--front");
    };
  }, [anchor, total, pinned]);

  return (
    <div
      ref={ref}
      data-reveal={anchor}
      className={`${styles.segment} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
