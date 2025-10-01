'use client';

import { NextSeo } from 'next-seo';

import { buildPageSeo, type PageSeoOverrides } from '@/config/seo';

type PageSeoProps = PageSeoOverrides;

export function PageSeo(props: PageSeoProps = {}) {
  const seoConfig = buildPageSeo(props);

  return <NextSeo {...seoConfig} />;
}
