import type { Metadata } from 'next';
import { Home } from './home';

export const metadata: Metadata = {
  alternates: { canonical: 'https://andremarinho.me' },
};

export default function Index() {
  return <Home />;
}
