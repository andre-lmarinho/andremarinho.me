"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent } from "react";
import { useRef } from "react";

type CarouselImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type ImageCarouselProps = {
  images: CarouselImage[];
  className?: string;
  ariaLabel?: string;
  priorityFirst?: boolean;
};

const BLEED_VAR = "max(32px, calc((100vw - 100%) / 2))";
// Bleed var widens the scroll track past the viewport while its padding keeps the first card aligned to the left margin.
const trackStyles: CSSProperties & { "--carousel-bleed": string } = {
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "--carousel-bleed": BLEED_VAR,
  paddingLeft: "var(--carousel-bleed)",
  paddingRight: "var(--carousel-bleed)",
  marginLeft: "calc(var(--carousel-bleed) * -1)",
  marginRight: "calc(var(--carousel-bleed) * -1)",
  width: "calc(100% + (var(--carousel-bleed) * 2))",
  willChange: "transform",
};

export const ImageCarousel = ({
  images,
  className,
  ariaLabel,
  priorityFirst = false,
}: ImageCarouselProps) => {
  const drag = useRef({
    startX: 0,
    scrollStart: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    frame: null as number | null,
    active: false,
    overscroll: 0,
  });

  const validImages = (images ?? []).filter(
    (image) => image?.src && image?.alt && Boolean(image.alt.trim()) && Boolean(image.src.trim())
  );

  if (!validImages.length) {
    return null;
  }

  const handlePointerDown = (event: PointerEvent<HTMLUListElement>) => {
    const state = drag.current;
    if (state.frame) {
      cancelAnimationFrame(state.frame);
      state.frame = null;
    }
    const target = event.currentTarget;
    target.setPointerCapture(event.pointerId);
    state.startX = event.clientX;
    state.scrollStart = target.scrollLeft;
    state.lastX = event.clientX;
    state.lastTime = event.timeStamp || performance.now();
    state.velocity = 0;
    state.active = true;
    state.overscroll = 0;
    event.currentTarget.style.transform = "";
    event.preventDefault();
  };

  const handlePointerMove = (event: PointerEvent<HTMLUListElement>) => {
    const state = drag.current;
    if (!state.active) {
      return;
    }
    event.preventDefault();
    const track = event.currentTarget;
    const now = event.timeStamp || performance.now();
    const dt = Math.max(now - state.lastTime, 1);
    const dx = event.clientX - state.lastX;
    state.velocity = dx / dt;
    state.lastX = event.clientX;
    state.lastTime = now;
    const tentative = state.scrollStart - (event.clientX - state.startX);
    const maxScroll = track.scrollWidth - track.clientWidth;
    const clamped = Math.min(maxScroll, Math.max(0, tentative));
    const rawOver = tentative - clamped;
    const limit = Math.min(track.clientWidth * 0.18, 220);
    const resistance = 1 - Math.exp(-Math.abs(rawOver) / limit);
    const limitedOver = Math.sign(rawOver) * limit * resistance;
    state.overscroll = limitedOver;
    track.style.transform = limitedOver ? `translateX(${-limitedOver}px)` : "";
    track.scrollLeft = clamped;
  };

  const handlePointerEnd = (event: PointerEvent<HTMLUListElement>) => {
    const state = drag.current;
    if (!state.active) {
      return;
    }
    state.active = false;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // ignore if already released
    }
    const track = event.currentTarget;
    if (Math.abs(state.overscroll) > 0.05) {
      state.overscroll = 0;
      track.style.transform = "";
      return;
    }
    const maxScroll = track.scrollWidth - track.clientWidth;
    let lastTimestamp = performance.now();
    const animateMomentum = (timestamp: number) => {
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      const nextTarget = track.scrollLeft - state.velocity * elapsed;
      track.scrollLeft = Math.min(maxScroll, Math.max(0, nextTarget));
      state.velocity *= 0.93;
      if (Math.abs(state.velocity) > 0.02) {
        state.frame = requestAnimationFrame(animateMomentum);
        return;
      }
      state.frame = null;
    };

    if (Math.abs(state.velocity) > 0.01) {
      state.frame = requestAnimationFrame(animateMomentum);
    }
  };

  return (
    <section
      aria-label={ariaLabel?.trim() ? ariaLabel : "Image carousel"}
      className={`relative w-full ${className ?? ""}`}>
      <div className="w-full">
        {/* Negative margins with bleed padding keep the carousel full-width while the first card stays at the layout margin. */}
        <ul
          className="flex cursor-grab gap-4 overflow-x-auto pr-2 pb-4 transition-[transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] select-none active:cursor-grabbing active:transition-none [&::-webkit-scrollbar]:hidden"
          style={trackStyles}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onPointerLeave={handlePointerEnd}>
          {validImages.map((image, index) => (
            <li
              key={`${image.src}-${index}`}
              className="flex flex-none"
              style={{
                minWidth: "276px",
                maxWidth: "580px",
                width: "clamp(276px, 47vw, 580px)",
              }}>
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width ?? 580}
                  height={image.height ?? 387}
                  sizes="(max-width: 640px) 276px, (max-width: 1280px) 45vw, 580px"
                  priority={priorityFirst && index === 0}
                  className="h-full w-full object-cover"
                  draggable={false}
                  onDragStart={(event) => event.preventDefault()}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
