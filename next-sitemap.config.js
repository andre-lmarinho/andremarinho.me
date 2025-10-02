const siteConfig = require('./site.config.json');

const { siteUrl } = siteConfig;

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '*/opengraph-image'],
};

module.exports = config;
