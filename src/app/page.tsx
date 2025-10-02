import type { Metadata } from 'next';
import Home from './home';

import { siteUrl } from '@/config/metadata';

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
};

export default function Index() {
  return <Home />;
}
