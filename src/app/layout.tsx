import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import { profileJsonLd } from "@/lib/seo";
import { ViewTransitions } from "@/lib/view-transition";
import "./globals.css";

export const metadata: Metadata = {
  title: "André Marinho — Full-Stack Developer · React, Next.js, TypeScript",
  description:
    "Full-stack developer (React, Next.js, TypeScript). Shipped a multi-tenant SaaS to production after 8 years running a digital agency.",
  openGraph: {
    title: "André Marinho — Full-Stack Developer",
    description: "I spent eight years deciding what to build. Now I build it.",
    url: "https://andremarinho.me",
    siteName: "André Marinho",
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://andremarinho.me"),
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/ms-icon-144x144.png",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="flex min-h-dvh flex-col bg-bg text-foreground font-body">
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is static and trusted.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
        />
        <ViewTransitions />
        <Nav />
        <main className="grow">{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
