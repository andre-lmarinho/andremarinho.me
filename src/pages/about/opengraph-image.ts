import { aboutMetadata } from "@/lib/metadata";
import { createOpenGraphImage } from "@/lib/opengraph";

export const GET = () =>
  createOpenGraphImage({
    title: "About",
    description: aboutMetadata.description,
    path: "/about",
  });
