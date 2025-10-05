import { siteName, siteUrl } from '@/config/metadata';

type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type Font = {
  name: string;
  data: ArrayBuffer;
  style: 'normal' | 'italic';
  weight: FontWeight;
};

type Props = {
  description: string;
  title: string;
  url?: string;
};

type FontDefinition = {
  name: Font['name'];
  path: string;
  style?: Font['style'];
  weight: Font['weight'];
};

const fontDefinitions: ReadonlyArray<FontDefinition> = [
  {
    name: 'Inter',
    path: '/fonts/opengraph/Inter-Medium.woff',
    weight: 500,
  },
  {
    name: 'Inter',
    path: '/fonts/opengraph/Inter-ExtraBold.woff',
    weight: 800,
  },
  {
    name: 'Roboto Mono',
    path: '/fonts/opengraph/RobotoMono-Regular.woff',
    weight: 400,
  },
];

const loadFont = async (path: string): Promise<ArrayBuffer> => {
  const url = new URL(`../../../public${path}`, import.meta.url);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to load font at ${path}`);
    }

    return response.arrayBuffer();
  } catch (error) {
    if (url.protocol !== 'file:') {
      throw error;
    }

    const { readFile } = await import('node:fs/promises');
    const buffer = await readFile(url);

    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    ) as ArrayBuffer;
  }
};

const loadFonts = () =>
  Promise.all(
    fontDefinitions.map(async ({ name, path, style, weight }) => ({
      data: await loadFont(path),
      name,
      style: style ?? 'normal',
      weight,
    }))
  );

let fontsPromise: Promise<Font[]> | undefined;

export const getFonts = async (): Promise<Font[]> => {
  if (!fontsPromise) {
    fontsPromise = loadFonts();
  }

  return fontsPromise;
};

export const ogImageSize = {
  width: 1200,
  height: 630,
} as const;

export const ogImageDynamic = 'force-static' as const;

type ImageResponseConstructor = (typeof import('next/og'))['ImageResponse'];

let imageResponseConstructor: ImageResponseConstructor | undefined;

const loadImageResponse = async (): Promise<ImageResponseConstructor> => {
  if (!imageResponseConstructor) {
    ({ ImageResponse: imageResponseConstructor } = await import('next/og'));
  }

  return imageResponseConstructor;
};

export const createOgImageResponse = async (props: Props) => {
  const ImageResponse = await loadImageResponse();

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
