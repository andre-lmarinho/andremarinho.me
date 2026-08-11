import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ImageResponse } from "next/og";

// satori ships inside next/og rather than as a resolvable package, so the font
// type is taken from the constructor that consumes it.
type Font = NonNullable<
  NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"]
>[number];

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#070a11";
const FOREGROUND = "#e2e8f0";
const MUTED = "#94a3b8";
const BORDER = "#1e293b";
const ACCENT = "#22c55e";

const FONT_DIR = join(process.cwd(), "src/components/OpengraphImage/fonts");

// Satori reads TTF, not the woff2 next/font emits, so the two families the site
// already uses are vendored beside this file and read at build time. Every OG
// route is prerendered, so this never runs on a request.
export const getFonts = async (): Promise<Font[]> => {
  const [archivo, archivoSemiBold, jetBrainsMono] = await Promise.all([
    readFile(join(FONT_DIR, "Archivo-Regular.ttf")),
    readFile(join(FONT_DIR, "Archivo-SemiBold.ttf")),
    readFile(join(FONT_DIR, "JetBrainsMono-Regular.ttf")),
  ]);

  return [
    { name: "Archivo", data: archivo, style: "normal", weight: 400 },
    { name: "Archivo", data: archivoSemiBold, style: "normal", weight: 600 },
    {
      name: "JetBrains Mono",
      data: jetBrainsMono,
      style: "normal",
      weight: 400,
    },
  ];
};

type Props = {
  title: string;
  description?: string;
  /** Appended to the domain, e.g. "/projects". Omit on the site root. */
  path?: string;
};

// Everything sits in one block at the bottom: the title and its description
// stack above a hairline, with the domain as the last line. The empty upper
// two thirds are what make it read as deliberate rather than sparse.
const OpengraphImage = ({ title, description, path = "" }: Props) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      backgroundColor: BG,
      fontFamily: "Archivo",
      padding: 72,
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div
        style={{
          display: "flex",
          color: FOREGROUND,
          fontWeight: 600,
          // Long headlines drop a step so a two-line title never crowds the
          // description below it.
          fontSize: title.length > 44 ? 68 : 84,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </div>

      {description ? (
        <div
          style={{
            display: "flex",
            color: MUTED,
            fontSize: 30,
            lineHeight: 1.4,
            maxWidth: 900,
          }}
        >
          {description}
        </div>
      ) : null}
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <span
        style={{
          display: "flex",
          height: 1,
          backgroundColor: BORDER,
          marginTop: 44,
        }}
      />
      <span
        style={{ fontFamily: "JetBrains Mono", fontSize: 22, color: ACCENT }}
      >
        {`andremarinho.me${path}`}
      </span>
    </div>
  </div>
);

export default OpengraphImage;
