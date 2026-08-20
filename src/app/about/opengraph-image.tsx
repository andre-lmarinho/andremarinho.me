import { ImageResponse } from "next/og";
import OpengraphImage, {
  contentType,
  getFonts,
  size,
} from "@/components/OpengraphImage";
import { description } from "./page";

export { contentType, size };
export const alt = "About André Marinho";

export default async function Image() {
  return new ImageResponse(
    <OpengraphImage title="About" description={description} path="/about" />,
    { ...size, fonts: await getFonts() },
  );
}
