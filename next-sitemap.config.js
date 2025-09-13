/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://pncsquare.in", // replace with your domain
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: ["https://pncsquare.in/sitemap.xml"],
  },
};
