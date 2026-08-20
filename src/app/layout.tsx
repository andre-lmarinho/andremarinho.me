import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import Layout from "@/components/Layout";
import {
  jobTitle,
  profileJsonLd,
  siteDescription,
  siteName,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const siteTitle = `${siteName} - ${jobTitle}`;
const socialDescription =
  "Frontend engineer building web products with React, Next.js, and TypeScript. Recent work includes a production CRM, an open-source planner, and a published npm CLI.";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-archivo",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: socialDescription,
    url: "https://andremarinho.me",
    siteName: "André Marinho",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: socialDescription,
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
  <html
    lang="en"
    className={`${archivo.variable} ${jetBrainsMono.variable} h-full scroll-smooth antialiased`}
  >
    <body className="flex min-h-dvh flex-col bg-bg font-body text-foreground">
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={profileJsonLd} />
      <Layout>{children}</Layout>
      <SpeedInsights />
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
