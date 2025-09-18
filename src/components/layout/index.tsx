'use client';

import dynamic from 'next/dynamic';
import React from 'react';

import Footer from './Footer';
import Header from './NavigationMenu';

const AnimationBG = dynamic(() => import('@/components/visuals/BGAnimation'), { ssr: false });
const CodeText = dynamic(() => import('@/components/visuals/CodeText'), { ssr: false });

type SiteLayoutProps = {
  children: React.ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <div className="pointer-events-none" aria-hidden>
        <AnimationBG />
        <CodeText />
      </div>
    </>
  );
}

export { Footer, Header };
