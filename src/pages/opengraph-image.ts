import { createOpenGraphImage } from "@/lib/opengraph";
import { siteDescription, siteName } from "@/lib/site";

export const GET = () =>
  createOpenGraphImage({ title: siteName, description: siteDescription });
