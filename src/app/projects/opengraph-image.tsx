import { ImageResponse } from "next/og";
import OpengraphImage, {
  contentType,
  getFonts,
  size,
} from "@/components/OpengraphImage";
import { description } from "./page";

export { size, contentType };
export const alt = "Projects by André Marinho";

export default async function Image() {
  return new ImageResponse(
    <OpengraphImage
      title="Projects"
      description={description}
      path="/projects"
    />,
    { ...size, fonts: await getFonts() },
  );
}
