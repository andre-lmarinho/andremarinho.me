import { createOpenGraphImage } from "@/lib/opengraph";
import { siteDescription, siteName } from "@/lib/seo";

export const GET = () =>
  createOpenGraphImage({ title: siteName, description: siteDescription });
