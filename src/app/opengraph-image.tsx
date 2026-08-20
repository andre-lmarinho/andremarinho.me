import { ImageResponse } from "next/og";
import OpengraphImage, {
  contentType,
  getFonts,
  size,
} from "@/components/OpengraphImage";
import { jobTitle, siteDescription, siteName } from "@/lib/seo";

export { size, contentType };
export const alt = `${siteName} - ${jobTitle}`;

export default async function Image() {
  return new ImageResponse(
    <OpengraphImage title={siteName} description={siteDescription} />,
    { ...size, fonts: await getFonts() },
  );
}
