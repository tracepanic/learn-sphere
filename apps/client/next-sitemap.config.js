/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL,
  changefreq: "weekly",
  priority: "0.5",
  generateIndexSitemap: false,
};
