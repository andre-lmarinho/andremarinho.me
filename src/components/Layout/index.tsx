import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({
  children,
  pathname,
}: {
  children: ReactNode;
  pathname: string;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header pathname={pathname} />
      <main id="main-content" tabIndex={-1} className="grow flex flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}
