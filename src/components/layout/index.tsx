import type { ReactNode } from "react";
import { ViewTransitions } from "@/components/transitions/view-transition";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ViewTransitions />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="grow">
        {children}
      </main>
      <Footer />
    </>
  );
}
