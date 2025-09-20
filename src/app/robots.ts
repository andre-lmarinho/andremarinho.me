import type { MetadataRoute } from 'next';

const BASE_URL = 'https://andremarinho.me';

const USER_AGENT_RULES: MetadataRoute.Robots['rules'] = [
  { userAgent: 'Googlebot', allow: '/' },
  { userAgent: 'Bingbot', allow: '/' },
  { userAgent: 'Twitterbot', allow: '/' },
  { userAgent: 'facebookexternalhit', allow: '/' },
  { userAgent: '*', allow: '/' },
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: USER_AGENT_RULES,
    host: BASE_URL,
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
