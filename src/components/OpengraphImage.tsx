import { readFile } from 'node:fs/promises';
import type { Font } from 'next/dist/compiled/@vercel/og/satori';

type OGProps = {
  description: string;
  title: string;
  url?: string;
};

const assetUrl = (path: string) => new URL(`../../public${path}`, import.meta.url);

const fontSpecs: Array<[Font['name'], NonNullable<Font['weight']>, string]> = [
  ['Inter', 500, '/fonts/opengraph/Inter-Medium.woff'],
  ['Inter', 800, '/fonts/opengraph/Inter-ExtraBold.woff'],
  ['Roboto Mono', 400, '/fonts/opengraph/RobotoMono-Regular.woff'],
];

const fontsPromise: Promise<Font[]> = Promise.all(
  fontSpecs.map(async ([name, weight, path]) => ({
    data: await readFile(assetUrl(path)),
    name,
    style: 'normal',
    weight,
  }))
);

const profileImageSrcPromise = readFile(assetUrl('/images/Me.jpeg')).then(
  (buffer) => `data:image/jpeg;base64,${buffer.toString('base64')}`
);

type OpengraphImageProps = OGProps & { profileImageSrc: string };

function OpengraphImage({ title, description, url, profileImageSrc }: OpengraphImageProps) {
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
        src={profileImageSrc}
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
        {url ? `andremarinho.me/${url}` : 'andremarinho.me'}
      </div>
    </div>
  );
}

export async function buildOg(props: OGProps) {
  const [fonts, profileImageSrc] = await Promise.all([fontsPromise, profileImageSrcPromise]);
  const el = <OpengraphImage {...props} profileImageSrc={profileImageSrc} />;
  return [el, { fonts }] as const;
}
