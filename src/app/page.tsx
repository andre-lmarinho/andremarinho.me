'use client';

import { Seo } from '@/components/seo/Seo';
import { buildCanonical } from '@/config/seo';

import Home from './home';

export default function Index() {
  const canonicalUrl = buildCanonical();

  return (
    <>
      <Seo canonical={canonicalUrl} openGraph={{ url: canonicalUrl }} />
      <Home />
    </>
  );
}
