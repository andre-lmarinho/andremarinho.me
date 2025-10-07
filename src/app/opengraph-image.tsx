import { createOgImageResponse, ogImageSize } from '@/components/seo/OpengraphImage';

export const dynamic = 'force-static';
export const size = ogImageSize;
export const alt = 'Andre Marinho';
export const runtime = 'nodejs';

export default async function Image() {
  return createOgImageResponse({
    title: 'Andre Marinho',
    description: 'Front-End Engineer based in Salvador, that loves building things for the web',
  });
}
