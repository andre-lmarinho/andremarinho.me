import type { MetadataRoute } from 'next';

const BASE_URL = 'https://andremarinho.me';
const lastModified = new Date();

const ROUTES = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/studio', changeFrequency: 'weekly', priority: 0.9 },
] as const satisfies ReadonlyArray<{
  path: `/${string}`;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: number;
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
