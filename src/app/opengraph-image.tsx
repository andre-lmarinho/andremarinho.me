import { ImageResponse } from 'next/og';

import OpengraphImage, { getFonts } from '@/components/seo/OpengraphImage';
import { defaultDescription, defaultTitle } from '@/config/metadata';

export const dynamic = 'force-static';
export const alt = 'Andre Marinho';
export const size = {
  width: 1200,
  height: 630,
};
export default function Image() {
  const fonts = getFonts();

  return new ImageResponse(
    <OpengraphImage title={defaultTitle} description={defaultDescription} />,
    {
      fonts,
    },
  );
}
