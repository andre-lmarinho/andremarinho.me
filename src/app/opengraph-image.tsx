import { createOgImageResponse, ogImageSize } from '@/components/seo/OpengraphImage';
import { defaultDescription, defaultTitle } from '@/config/metadata';

export const dynamic = 'force-static';
export const size = ogImageSize;
export const alt = 'Andre Marinho';
export const runtime = 'nodejs';
export default async function Image() {
  return createOgImageResponse({
    title: defaultTitle,
    description: defaultDescription,
  });
}
