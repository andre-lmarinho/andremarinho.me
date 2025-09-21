'use client';

import { useEffect, useState } from 'react';

import { NextSeo, type NextSeoProps } from 'next-seo';

export type SeoProps = NextSeoProps;

export function Seo(props: SeoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <NextSeo {...props} />;
}

export default Seo;
