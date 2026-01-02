import { Footer } from "./Footer";
import { NavigationMenu } from "./NavigationMenu";

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
