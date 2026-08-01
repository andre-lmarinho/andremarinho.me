import { type ReactNode, ViewTransition } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="grow">
        <ViewTransition>{children}</ViewTransition>
      </main>
      <Footer />
    </>
  );
}
