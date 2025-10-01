'use client';

import { DefaultSeo as DefaultSeoComponent } from 'next-seo';

import { defaultSeoConfig } from '@/config/seo';

export function DefaultSeoProvider() {
  return <DefaultSeoComponent {...defaultSeoConfig} />;
}
