import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Font } from "next/dist/compiled/@vercel/og/satori";

import { SITE_URL } from "@/configs";

type OGProps = {
  description: string;
  title: string;
  url?: string;
};

const buildFontPath = (path: string) => join(process.cwd(), "public", path.replace(/^\/+/, ""));

type FontConfig = {
  name: Font["name"];
  style: NonNullable<Font["style"]>;
  weight: NonNullable<Font["weight"]>;
  path: string;
};

const fontConfigs: FontConfig[] = [
  {
    name: "Inter",
    style: "normal",
    weight: 500,
    path: buildFontPath("/fonts/opengraph/Inter-Medium.woff"),
  },
  {
    name: "Inter",
    style: "normal",
    weight: 800,
    path: buildFontPath("/fonts/opengraph/Inter-ExtraBold.woff"),
  },
  {
    name: "Roboto Mono",
    style: "normal",
    weight: 400,
    path: buildFontPath("/fonts/opengraph/RobotoMono-Regular.woff"),
  },
];

const fontsPromise: Promise<Font[]> = Promise.all(
  fontConfigs.map(async ({ name, style, weight, path }) => ({
    data: await readFile(path),
    name,
    style,
    weight,
  }))
);

const getFonts = (): Promise<Font[]> => fontsPromise;

function OpengraphImage({ title, description, url }: OGProps) {
  const siteHost = SITE_URL.replace(/^https?:\/\//, "");
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        fontFamily: "Inter",
        backgroundImage: "radial-gradient(at 10px 10px, #d4d4d4, #d4d4d4 5%, white 5%)",
        backgroundSize: "20px 20px",
      }}>
      {/* biome-ignore lint/performance/noImgElement: OG image render needs raw img. */}
      <img
        src={`${SITE_URL}/images/Me.jpeg`}
        alt="Andre Marinho portrait"
        width="115"
        height="115"
        style={{
          borderRadius: "100%",
          position: "absolute",
          left: 60,
          top: 60,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          position: "absolute",
          bottom: 140,
          left: 60,
          width: "65%",
        }}>
        <span
          style={{
            fontSize: "5.25rem",
            fontWeight: 700,
            letterSpacing: "-2px",
            lineHeight: "1",
          }}>
          {title}
        </span>
        <span
          style={{
            fontSize: "2.5rem",
            fontWeight: 400,
          }}>
          {description}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 60,
          borderRadius: 100,
          fontFamily: "Roboto Mono",
          fontSize: "1.75rem",
          lineHeight: 1,
          fontWeight: 400,
        }}>
        {url ? `${siteHost}/${url}` : siteHost}
      </div>
    </div>
  );
}

export async function buildOg(props: OGProps) {
  const fonts = await getFonts();
  const el = <OpengraphImage {...props} />;
  return [el, { fonts }] as const;
}
