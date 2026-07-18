"use client";

import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Nav from "@/components/ui/Nav";
import { content, type Locale } from "@/lib/content";
import type { LatestCommit } from "@/lib/github";

export default function HomePage({
  lang,
  commit,
}: {
  lang: Locale;
  commit: LatestCommit;
}) {
  const c = content[lang];

  return (
    <>
      <Nav href={c.footer.langHref} label={c.footer.langToggle} lang={lang} />
      <main>
        <Hero content={c.hero} />
        <Work content={c.work} />
      </main>
      <Footer content={c.footer} commit={commit} />
    </>
  );
}
