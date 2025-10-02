import { ImageResponse } from 'next/og';

import OpengraphImage, { getFonts } from '@/components/seo/OpengraphImage';

const aboutDescription =
  'Get to know Andre Marinho, a front-end developer crafting digital products from Salvador, Brazil.';

export const dynamic = 'force-static';
export const alt = 'Andre Marinho';
export const size = {
  width: 1200,
  height: 630,
};
export default function Image() {
  const fonts = getFonts();

  return new ImageResponse(
    <OpengraphImage title="About me" url="about" description={aboutDescription} />,
    {
      fonts,
    },
  );
}
