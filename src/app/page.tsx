import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, socialLinkUrls } from "@/configs";

import { Hero } from "./home/components/Hero";
import { Projects } from "./home/components/Projects";
import { ProudWork } from "./home/components/ProudWork";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

const SocialProfileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/images/Me.jpeg`,
    sameAs: socialLinkUrls,
  },
};

export default function Index() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is static and trusted.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SocialProfileJsonLd) }}
      />
      <Hero />
      <ProudWork />
      <Projects />
    </>
  );
}
