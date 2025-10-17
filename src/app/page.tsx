import type { Metadata } from 'next';
import { siteUrl } from '@/config/metadata';

import { Home } from './home';

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
};

export default function Index() {
  return <Home />;
}
