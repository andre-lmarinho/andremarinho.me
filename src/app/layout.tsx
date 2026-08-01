import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import JsonLd from "@/components/JsonLd";
import Layout from "@/components/layout";
import { profileJsonLd } from "@/lib/seo";
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
    "msapplication-TileColor": "#070a11",
    "msapplication-TileImage": "/ms-icon-144x144.png",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#070a11",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className="h-full scroll-smooth antialiased">
    <body className="flex min-h-dvh flex-col bg-bg font-body text-foreground">
      <JsonLd data={profileJsonLd} />
      <Layout>{children}</Layout>
      <SpeedInsights />
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
