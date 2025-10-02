import { createOgImageResponse, ogImageSize } from '@/components/seo/OpengraphImage';

const studioDescription =
  "Discover Duonorth Studio, Andre Marinho's product partnership for ambitious teams and experiences.";

export const dynamic = 'force-static';
export const size = ogImageSize;
export const alt = 'Duonorth Studio';
export const runtime = 'nodejs';

export default async function Image() {
  return createOgImageResponse({
    title: 'Duonorth Studio',
    url: 'studio',
    description: studioDescription,
  });
}
