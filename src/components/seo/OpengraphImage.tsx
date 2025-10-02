import { readFile } from 'node:fs/promises';

import type { Font } from 'satori';

import { siteName, siteUrl } from '@/config/metadata';

type FontCacheKey = 'inter-medium' | 'inter-extrabold' | 'roboto-mono';

type Props = {
  description: string;
  title: string;
  url?: string;
};

const buildFontUrl = (path: string) => new URL(`../../../public${path}`, import.meta.url);

type FontConfig = {
  cacheKey: FontCacheKey;
  name: string;
  style: 'normal' | 'italic';
  weight: NonNullable<Font['weight']>;
  url: URL;
};

const fontConfigs: FontConfig[] = [
  {
    cacheKey: 'inter-medium',
    name: 'Inter',
    style: 'normal',
    weight: 500,
    url: buildFontUrl('/fonts/opengraph/Inter-Medium.woff'),
  },
  {
    cacheKey: 'inter-extrabold',
    name: 'Inter',
    style: 'normal',
    weight: 800,
    url: buildFontUrl('/fonts/opengraph/Inter-ExtraBold.woff'),
  },
  {
    cacheKey: 'roboto-mono',
    name: 'Roboto Mono',
    style: 'normal',
    weight: 400,
    url: buildFontUrl('/fonts/opengraph/RobotoMono-Regular.woff'),
  },
];

const fontDataPromises = new Map<FontCacheKey, Promise<ArrayBuffer>>();

const bufferToArrayBuffer = (buffer: Buffer): ArrayBuffer => Uint8Array.from(buffer).buffer;

const fetchFont = async ({ cacheKey, url }: FontConfig): Promise<ArrayBuffer> => {
  const cached = fontDataPromises.get(cacheKey);

  if (cached) {
    return cached;
  }

  const promise = (async () => {
    const buffer = await readFile(url);

    return bufferToArrayBuffer(buffer);
  })();

  fontDataPromises.set(cacheKey, promise);

  return promise;
};

export const getFonts = async (): Promise<Font[]> => {
  const entries = await Promise.all(
    fontConfigs.map(async (config) => ({
      config,
      data: await fetchFont(config),
    }))
  );

  return entries.map(({ config, data }) => ({
    data,
    name: config.name,
    style: config.style,
    weight: config.weight,
  }));
};

export const ogImageSize = {
  width: 1200,
  height: 630,
} as const;

export const ogImageDynamic = 'force-static' as const;

export const createOgImageResponse = async (props: Props) => {
  const { ImageResponse: NextImageResponse } = await import('next/og');
  const fonts = await getFonts();

  return new NextImageResponse(<OpengraphImage {...props} />, {
    fonts,
  });
};

const domain = new URL(siteUrl).host;

const OpengraphImage = ({ description, title, url }: Props) => {
  const displayUrl = url ? `${domain}${url.startsWith('/') ? url : `/${url}`}` : domain;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#0b1120',
        backgroundImage:
          'radial-gradient(circle at 20% 20%, rgba(56,189,248,0.15), transparent 55%), radial-gradient(circle at 80% 0%, rgba(129,140,248,0.15), transparent 40%)',
        padding: '72px',
        color: '#e2e8f0',
        fontFamily: 'Inter',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <div
          style={{
            width: 128,
            height: 128,
            borderRadius: '50%',
            border: '6px solid rgba(148,163,184,0.25)',
            boxShadow: '0 24px 60px rgba(15,23,42,0.45)',
            background: 'linear-gradient(135deg, rgba(56,189,248,0.8), rgba(129,140,248,0.8))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0b1120',
            fontWeight: 800,
            fontSize: '2rem',
          }}
        >
          AM
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <span
            style={{
              fontSize: '3rem',
              fontWeight: 800,
              letterSpacing: '-1px',
            }}
          >
            {siteName}
          </span>
          <span
            style={{
              fontSize: '1.75rem',
              color: 'rgba(148,163,184,0.9)',
              fontFamily: 'Inter',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            Front-End Developer
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          maxWidth: '720px',
        }}
      >
        <span
          style={{
            fontSize: '5.5rem',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-3px',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: '2.4rem',
            color: 'rgba(226,232,240,0.95)',
            lineHeight: 1.3,
            fontWeight: 500,
          }}
        >
          {description}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '1.8rem',
          fontFamily: 'Inter',
          fontWeight: 500,
          color: 'rgba(148,163,184,0.9)',
        }}
      >
        <span>{displayUrl}</span>
        <span
          style={{
            padding: '8px 20px',
            borderRadius: 999,
            border: '1px solid rgba(148,163,184,0.35)',
            fontSize: '1.5rem',
            letterSpacing: '0.08em',
            fontFamily: 'Roboto Mono',
            fontWeight: 400,
          }}
        >
          andremarinho.me
        </span>
      </div>
    </div>
  );
};

export default OpengraphImage;
