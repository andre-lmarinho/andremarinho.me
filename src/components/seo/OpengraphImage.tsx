import { readFile } from 'node:fs/promises';
import type { Font } from 'next/dist/compiled/@vercel/og/satori';
import { siteUrl } from '@/config/metadata';

type Props = {
  description: string;
  title: string;
  url?: string;
};

const buildFontUrl = (path: string) => new URL(`../../../public${path}`, import.meta.url);

type FontConfig = {
  name: Font['name'];
  style: NonNullable<Font['style']>;
  weight: NonNullable<Font['weight']>;
  url: URL;
};

const fontConfigs: FontConfig[] = [
  {
    name: 'Inter',
    style: 'normal',
    weight: 600,
    url: buildFontUrl('/fonts/opengraph/Inter-Medium.woff'),
  },
  {
    name: 'Inter',
    style: 'normal',
    weight: 700,
    url: buildFontUrl('/fonts/opengraph/Inter-ExtraBold.woff'),
  },
  {
    name: 'Roboto Mono',
    style: 'normal',
    weight: 300,
    url: buildFontUrl('/fonts/opengraph/RobotoMono-Regular.woff'),
  },
];

const fontsPromise: Promise<Font[]> = Promise.all(
  fontConfigs.map(async ({ name, style, weight, url }) => ({
    data: await readFile(url),
    name,
    style,
    weight,
  }))
);

export const getFonts = (): Promise<Font[]> => fontsPromise;

export const ogImageSize = {
  width: 1200,
  height: 630,
} as const;

export const ogImageDynamic = 'force-static' as const;

export const createOgImageResponse = async (props: Props) => {
  const { ImageResponse } = await import('next/og');

  return new ImageResponse(<OpengraphImage {...props} />, {
    fonts: await getFonts(),
  });
};

const domain = new URL(siteUrl).host;

const OpengraphImage = ({ description, title, url }: Props) => {
  const displayUrl = url ? `${domain}${url.startsWith('/') ? url : `/${url}`}` : domain;

  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        fontFamily: 'Inter',
        backgroundImage: 'radial-gradient(at 10px 10px, #d4d4d4, #d4d4d4 5%, white 5%)',
        backgroundSize: '20px 20px',
      }}
    >
      <img
        src="https://andremarinho.me/images/Me.jpeg"
        width="115"
        height="115"
        style={{
          borderRadius: '100%',
          position: 'absolute',
          left: 60,
          top: 60,
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          position: 'absolute',
          bottom: 140,
          left: 60,
          width: '65%',
        }}
      >
        <span
          style={{
            fontSize: '5.25rem',
            fontWeight: 700,
            letterSpacing: '-2px',
            lineHeight: '1',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: '2.5rem',
            fontWeight: 400,
          }}
        >
          {description}
        </span>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 60,
          borderRadius: 100,
          fontFamily: 'RobotoMono',
          fontSize: '1.75rem',
          lineHeight: 1,
          fontWeight: 600,
        }}
      >
        {displayUrl}
      </div>
    </div>
  );
};

export default OpengraphImage;
