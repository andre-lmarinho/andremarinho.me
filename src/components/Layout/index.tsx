import { NavigationMenu } from './NavigationMenu';
import { Footer } from './Footer';

type Props = { children: React.ReactNode };

export const Layout = (props: Props) => (
  <>
    <NavigationMenu />
    <main id="main" className="page-content">
      {props.children}
    </main>
    <Footer />
  </>
);
