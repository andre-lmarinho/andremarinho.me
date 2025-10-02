import { siteName, siteUrl } from '@/config/metadata';
import {
  interExtraBoldFontBase64,
  interMediumFontBase64,
  interRegularFontBase64,
} from '@/components/seo/ogFonts';

type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type FontSource = {
  name: string;
  data: ArrayBuffer;
  style?: 'normal' | 'italic';
  weight?: FontWeight;
};

type Props = {
  description: string;
  title: string;
  url?: string;
};

const decodeFont = (base64: string): ArrayBuffer => {
  if (typeof Buffer !== 'undefined') {
    const buffer = Buffer.from(base64, 'base64');
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  }

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes.buffer;
};

export const getFonts = (): FontSource[] => {
  return [
    {
      name: 'Inter',
      data: decodeFont(interRegularFontBase64),
      style: 'normal',
      weight: 400,
    },
    {
      name: 'Inter',
      data: decodeFont(interMediumFontBase64),
      style: 'normal',
      weight: 600,
    },
    {
      name: 'Inter',
      data: decodeFont(interExtraBoldFontBase64),
      style: 'normal',
      weight: 700,
    },
  ];
};

const domain = new URL(siteUrl).host;

const OpengraphImage = ({ description, title, url }: Props) => {
  const displayUrl = url
    ? `${domain}${url.startsWith('/') ? url : `/${url}`}`
    : domain;

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
            background:
              'linear-gradient(135deg, rgba(56,189,248,0.8), rgba(129,140,248,0.8))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0b1120',
            fontWeight: 700,
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
              fontWeight: 700,
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
            fontWeight: 700,
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
            fontWeight: 400,
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
          fontWeight: 400,
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
          }}
        >
          andremarinho.me
        </span>
      </div>
    </div>
  );
};

export default OpengraphImage;
