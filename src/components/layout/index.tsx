import type { ReactNode } from 'react';

import Background from './Background';
import Footer from './Footer';
import Header from './NavigationMenu';

type Props = { children: ReactNode };

const Layout = (props: Props) => (
  <>
    <Header />
    <main id="main" className="page-content">
      {props.children}
    </main>
    <Footer />
    <Background />
  </>
);

export default Layout;
