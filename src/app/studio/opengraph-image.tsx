import { createOgImageResponse, ogImageSize } from '@/components/seo/OpengraphImage';

export const dynamic = 'force-static';
export const size = ogImageSize;
export const alt = 'Duonorth Studio';
export const runtime = 'nodejs';

export default async function Image() {
  return createOgImageResponse({
    title: 'Duonorth Studio',
    url: 'studio',
    description: 'World-class software, design and product partner for your business',
  });
}
