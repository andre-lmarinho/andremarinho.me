import { projectsMetadata } from "@/lib/metadata";
import { createOpenGraphImage } from "@/lib/opengraph";

export const GET = () =>
  createOpenGraphImage({
    title: "Projects",
    description: projectsMetadata.description,
    path: "/projects",
  });
