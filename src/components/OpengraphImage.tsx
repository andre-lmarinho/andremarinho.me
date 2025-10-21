import { readFile } from 'node:fs/promises';
import type { Font } from 'next/dist/compiled/@vercel/og/satori';

type Props = {
  description: string;
  title: string;
  url?: string;
  avatarSrc?: string;
};

const defaultAvatarSrc = 'https://andremarinho.me/images/Me.jpeg';

const buildPublicUrl = (path: string) => new URL(`../../public${path}`, import.meta.url);

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
    url: buildPublicUrl('/fonts/opengraph/Inter-Medium.woff'),
  },
  {
    name: 'Inter',
    style: 'normal',
    weight: 700,
    url: buildPublicUrl('/fonts/opengraph/Inter-ExtraBold.woff'),
  },
  {
    name: 'Roboto Mono',
    style: 'normal',
    weight: 300,
    url: buildPublicUrl('/fonts/opengraph/RobotoMono-Regular.woff'),
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

const avatarImagePromise: Promise<string> = readFile(buildPublicUrl('/images/Me.jpeg')).then(
  (file) => `data:image/jpeg;base64,${file.toString('base64')}`
);

export const getAvatarImageSrc = (): Promise<string> => avatarImagePromise;

export const ogImageSize = {
  width: 1200,
  height: 630,
} as const;

export const ogImageDynamic = 'force-static' as const;

export const createOgImageResponse = async ({ avatarSrc, ...props }: Props) => {
  const { ImageResponse } = await import('next/og');

  const [fonts, resolvedAvatarSrc] = await Promise.all([
    getFonts(),
    avatarSrc ? Promise.resolve(avatarSrc) : getAvatarImageSrc(),
  ]);

  return new ImageResponse(<OpengraphImage {...props} avatarSrc={resolvedAvatarSrc} />, {
    fonts,
  });
};

const domain = new URL('https://andremarinho.me').host;

export const OpengraphImage = ({ description, title, url, avatarSrc }: Props) => {
  const displayUrl = url ? `${domain}${url.startsWith('/') ? url : `/${url}`}` : domain;
  const imageSource = avatarSrc ?? defaultAvatarSrc;

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
        src={imageSource}
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
