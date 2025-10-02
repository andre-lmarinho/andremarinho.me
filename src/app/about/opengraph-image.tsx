import { createOgImageResponse, ogImageSize } from '@/components/seo/OpengraphImage';

const aboutDescription =
  'Get to know Andre Marinho, a front-end developer crafting digital products from Salvador, Brazil.';

export const dynamic = 'force-static';
export const size = ogImageSize;
export const alt = 'Andre Marinho';
export const runtime = 'nodejs';
export default async function Image() {
  return createOgImageResponse({
    title: 'About me',
    url: 'about',
    description: aboutDescription,
  });
}
