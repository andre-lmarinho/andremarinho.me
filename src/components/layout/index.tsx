'use client';
import React from 'react';

import Background from './Background';
import Footer from './Footer';
import Header from './NavigationMenu';

type Props = { children: React.ReactNode };

const Layout = (props: Props) => (
  <>
    <a className="skip-link" href="#main">
      Skip to main content
    </a>
    <Header />
    <main id="main" tabIndex={-1}>
      {props.children}
    </main>
    <Footer />
    <Background />
  </>
);

export default Layout;
