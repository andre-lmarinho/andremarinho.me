import { ImageResponse } from 'next/og';

import OpengraphImage, { getFonts } from '@/components/seo/OpengraphImage';

const studioDescription =
  'Discover Duonorth Studio, Andre Marinho\'s product partnership for ambitious teams and experiences.';

export const dynamic = 'force-static';
export const alt = 'Duonorth Studio';
export const size = {
  width: 1200,
  height: 630,
};
export default function Image() {
  const fonts = getFonts();

  return new ImageResponse(
    <OpengraphImage
      title="Duonorth Studio"
      url="studio"
      description={studioDescription}
    />,
    {
      fonts,
    },
  );
}
