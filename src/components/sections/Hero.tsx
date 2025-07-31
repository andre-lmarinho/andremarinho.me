// src/components/sections/Hero.tsx

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import me from '@/assets/images/Me.jpg';
import { useMotion as useMotionContext } from '@/context';
import { animations } from '@/utils';

export default function Hero() {
  const { shouldReduceMotion } = useMotionContext();
  const [wave, setWave] = useState(false);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  useEffect(() => {
    const id = setTimeout(() => setWave(true), 220);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX - innerWidth / 2) / innerWidth) * 10;
      const y = ((e.clientY - innerHeight / 2) / innerHeight) * 10;
      tiltX.set(x);
      tiltY.set(y);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [shouldReduceMotion, tiltX, tiltY]);

  return (
    <section id="hero" className="my-12">
      <div className="flex justify-between gap-8">
        <div>
          <motion.h1
            className="flex gap-2 pb-4 text-3xl font-bold tracking-tight sm:text-4xl"
            {...animations.H1(shouldReduceMotion)}
          >
            <span>Hey! I'm André Marinho</span>
            <span
              aria-hidden="true"
              className={`inline-block origin-[70%_70%] ${wave ? 'animate-wave' : ''}`}
            >
              👋🏼
            </span>
          </motion.h1>
          <motion.div
            className="grid gap-4 leading-normal"
            {...animations.HeroParagraphContainer(shouldReduceMotion)}
          >
            {[
              "I'm a Front End Developer based in Salvador. I create elegant, business-driven interfaces through clean, strategic code.",
              'Blending front-end expertise with a background in digital marketing, I build user-focused experiences using React, TypeScript, and Node.js.',
            ].map((text) => (
              <motion.p
                key={text}
                className="sm:max-w-md"
                {...animations.HeroParagraph(shouldReduceMotion)}
              >
                {text}
              </motion.p>
            ))}
          </motion.div>
        </div>
        <motion.img
          alt="André Marinho"
          data-nimg="1"
          loading="lazy"
          width={176}
          height={176}
          decoding="async"
          className="hidden h-44 w-44 transform-gpu rounded-full sm:block"
          src={me}
          {...animations.HeroImage(shouldReduceMotion)}
        />
      </div>
    </section>
  );
}
