import dynamic from 'next/dynamic';
import React from 'react';

import Footer from './Footer';
import Header from './NavigationMenu';

const ClientVisuals = dynamic(() => import('./ClientVisuals'), { ssr: false });

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
        <ClientVisuals />
      </div>
    </>
  );
}

export { Footer, Header };
