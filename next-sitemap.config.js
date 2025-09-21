/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://andremarinho.me',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'Twitterbot', allow: '/' },
      { userAgent: 'facebookexternalhit', allow: '/' },
      { userAgent: '*', allow: '/' },
    ],
  },
};

module.exports = config;
