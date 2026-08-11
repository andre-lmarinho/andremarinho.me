import { ImageResponse } from "next/og";
import OpengraphImage, {
  contentType,
  getFonts,
  size,
} from "@/components/OpengraphImage";
import { description } from "./page";

export { size, contentType };
export const alt = "Posts by André Marinho";

export default async function Image() {
  return new ImageResponse(
    <OpengraphImage title="Posts" description={description} path="/posts" />,
    { ...size, fonts: await getFonts() },
  );
}
