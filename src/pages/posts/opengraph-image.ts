import { postsMetadata } from "@/lib/metadata";
import { createOpenGraphImage } from "@/lib/opengraph";

export const GET = () =>
  createOpenGraphImage({
    title: "Posts",
    description: postsMetadata.description,
    path: "/posts",
  });
