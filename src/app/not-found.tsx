import type { Metadata } from 'next';
import { buildCanonical, defaultOpenGraph, defaultTwitter } from '@/config/metadata';
import MenuLinks from '@/components/layout/NavigationMenu/MenuLinks';

const title = '404 – Page not found';
const description = "The page you were trying to reach doesn't exist.";

const fallbackUrl = buildCanonical();

export const metadata: Metadata = {
  title,
  description,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    ...defaultOpenGraph,
    title,
    description,
    url: fallbackUrl,
  },
  twitter: {
    ...defaultTwitter,
    title,
    description,
  },
};

export default function NotFound() {
  return (
    <>
      <section id="404">
        <h1>Are you lost?</h1>
        <p className="mt-6 text-xl font-medium tracking-tight text-zinc-600 dark:text-zinc-400">
          The page you are looking for doesn&apos;t exist.
        </p>
        <h2 className="pb-6 text-lg">Here are some helpful links instead:</h2>
        <MenuLinks variant="notFound" />
        <p className="mt-6 text-lg font-extrabold">Error code: 404</p>
      </section>
    </>
  );
}
