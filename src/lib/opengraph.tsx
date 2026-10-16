import { ImageResponse } from "@vercel/og";
import OpengraphImage, { getFonts, size } from "@/components/OpengraphImage";

export async function createOpenGraphImage(props: {
  title: string;
  description?: string;
  path?: string;
}) {
  return new ImageResponse(<OpengraphImage {...props} />, {
    ...size,
    fonts: await getFonts(),
  });
}
