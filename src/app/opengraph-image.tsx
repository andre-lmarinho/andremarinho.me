export const runtime = 'nodejs';
import { ImageResponse } from 'next/og';

import { buildOg } from '@/components/OpengraphImage';

export default async function Image() {
  const [el, init] = await buildOg({
    title: 'André Marinho',
    description: 'Front-End Engineer based in Salvador, that loves building things for the web',
  });
  return new ImageResponse(el, init);
}
