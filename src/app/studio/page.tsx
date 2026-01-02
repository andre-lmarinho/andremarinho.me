import type { Metadata } from "next";
import { SITE_URL } from "@/configs/site";
import { socialLinkUrls } from "@/configs/social-links";
import { Copy } from "./components/Copy";
import { getStudioSlots } from "./components/configs/availability";
import { buildProfessionalServiceJsonLd } from "./components/configs/offers";
import { FinalCTA } from "./components/FinalCTA";
import { Hero } from "./components/Hero";
import { Pricing } from "./components/Pricing";
import { Work } from "./components/Work";

const title = "Duonorth Studio";
const description =
  "Product strategy, design and engineering support to launch, scale and iterate outstanding digital experiences.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Duonorth Studio",
    "product strategy",
    "product design",
    "front-end development",
    "design systems",
    "product partner",
  ],
  alternates: {
    canonical: "/studio",
  },
  openGraph: {
    title: `${title} | Product Design & Engineering Partner`,
    description,
    url: "/studio",
    type: "website",
    images: [
      {
        url: "/studio/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Duonorth Studio – Product design and engineering services",
      },
    ],
  },
  twitter: {
    title: `${title} | Product Design & Engineering Partner`,
    description,
    images: ["/studio/opengraph-image"],
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "technology",
};

const structuredData = buildProfessionalServiceJsonLd({
  baseUrl: SITE_URL,
  name: "Duonorth Studio",
  description:
    "Product strategy, design and engineering support to launch, scale and iterate outstanding digital experiences.",
  path: "/studio",
  imagePath: "/studio/opengraph-image",
  provider: {
    name: "André Marinho",
    jobTitle: "Front-End Engineer",
    sameAs: socialLinkUrls,
  },
});

export default async function Studio() {
  const slots = await getStudioSlots();

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is static and trusted.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <Work />
      <Copy />
      <Pricing initialSlots={slots} />
      <FinalCTA />
    </>
  );
}
