export const runtime = 'nodejs';
import { ImageResponse } from 'next/og';

import { buildOg } from '@/components/OpengraphImage';

export default async function Image() {
  const [el, init] = await buildOg({
    title: 'Duonorth Studio',
    url: 'studio',
    description: 'World-class software, design and product partner for your business',
  });
  return new ImageResponse(el, init);
}
