import dynamic from 'next/dynamic';
import React from 'react';

import { Footer, Header } from '@/components/layout';
import { Hero, Projects, Work } from '@/components/sections';

const AnimationBG = dynamic(() => import('@/components/visuals/BGAnimation'), { ssr: false });
const CodeText = dynamic(() => import('@/components/visuals/CodeText'), { ssr: false });

export default function HomePage() {
  return (
    <>
      <a href="#main" className="sr-only focus:block">
        Skip to main content
      </a>
      <Header />
      <main id="main" className="mx-auto max-w-4xl px-6 sm:px-4">
        <Hero />
        <Projects />
        <Work />
      </main>
      <Footer />
      <div className="pointer-events-none" aria-hidden>
        <AnimationBG />
        <CodeText />
      </div>
    </>
  );
}
