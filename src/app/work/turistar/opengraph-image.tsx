export const runtime = "nodejs";

import { ImageResponse } from "next/og";

import { buildOg } from "@/components/OpengraphImage";

import { heroMetadata } from "./components/data";

export default async function Image() {
  const [el, init] = await buildOg({
    title: heroMetadata.title,
    url: "work/turistar",
    description: heroMetadata.description,
  });
  return new ImageResponse(el, init);
}
