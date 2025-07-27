// src/components/sections/About.tsx

import React from 'react';

export default function About() {
  return (
    <section id="about" aria-label="About me">
      <div className="main-section-h2">
        <h2 className="main-h2">About</h2>
      </div>
      <div className="text-color-02">
        <p className="mb-4">
          I’m a developer with a background that blends business, marketing, design, data, and code.
        </p>
        <p className="mb-4">
          Before tech, I worked in logistics and finance. Those fields taught me how to think in
          systems, optimize processes, and never underestimate the power of clean data. Later, I
          transitioned into B2B marketing and web consulting, where I found my passion: creating
          digital products that not only look great, but actually move the needle.
        </p>
        <p className="mb-4">
          Today, I focus on building fast, accessible, and business-driven user interfaces using
          Next.js, React, TypeScript, and modern tooling. My projects often start with data, evolve
          through design, and are shaped by collaboration.
        </p>
        <p className="mb-4">
          I’ve helped clients increase conversions, automate operations, and launch web experiences
          that perform technically and strategically.
        </p>
        <p className="mb-4">
          Learning is a constant. I’ve completed Harvard’s CS50 and CS50w, and I’m currently diving
          deeper into computer science through OSSU.
        </p>
        <p className="mb-4">
          What drives me? Clean code, clear UX, and the belief that good development connects people
          to value.
        </p>
        <p className="mb-4">Let’s build something that works beautifully.</p>
      </div>
    </section>
  );
}
