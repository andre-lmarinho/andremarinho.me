import { buildPageMetadata } from '@/config/seo';

import Home from './home';

export const metadata = buildPageMetadata();

export default function Index() {
  return <Home />;
}
