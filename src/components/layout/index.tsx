import type { ReactNode } from 'react';

import { Background } from './Background';
import { Footer } from './Footer';
import { NavigationMenu } from './NavigationMenu';

type Props = { children: ReactNode };

export const Layout = (props: Props) => (
  <>
    <NavigationMenu />
    <main id="main" className="page-content">
      {props.children}
    </main>
    <Footer />
    <Background />
  </>
);
