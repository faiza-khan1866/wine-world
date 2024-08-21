// generate-sitemap.js
const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const { resolve } = require("path");
const axios = require("axios");
const routes = require("./sitemap-routes"); // Assuming you have a file with your routes

const generateSitemap = async () => {
  const sitemap = new SitemapStream({
    hostname: "https://royalspirit.ae",
  });

  routes.forEach((route) => {
    sitemap.write({ url: route.path, changefreq: "daily", priority: 0.7 });
  });

  try {
    // Fetch dynamic data for routes
    const [categories, products, blogs, news] = await Promise.all([
      axios.get("https://api.royalspirit.ae/public/v1/api/categories"),
      axios.get("https://api.royalspirit.ae/public/v1/api/products"),
      axios.get("https://api.royalspirit.ae/public/v1/api/blog-list"),
      axios.get("https://api.royalspirit.ae/public/v1/api/news-list"),
    ]);

    // Ensure data is properly fetched and exists
    if (categories.data && Array.isArray(categories.data)) {
      categories.data.forEach((cat) => {
        if (cat.route) {
          sitemap.write({
            url: `/shop/${cat.route}`,
            changefreq: "daily",
            priority: 0.7,
          });
          if (cat.sub_category && Array.isArray(cat.sub_category)) {
            cat.sub_category.forEach((subcat) => {
              if (subcat.route) {
                sitemap.write({
                  url: `/shop/${cat.route}/${subcat.route}`,
                  changefreq: "daily",
                  priority: 0.7,
                });
              }
            });
          }
        }
      });
    }

    if (products.data && Array.isArray(products.data)) {
      products.data.forEach((product) => {
        if (product.route) {
          sitemap.write({
            url: `/product/${product.route}`,
            changefreq: "daily",
            priority: 0.7,
          });
        }
      });
    }

    if (blogs.data && Array.isArray(blogs.data)) {
      blogs.data.forEach((blog) => {
        if (blog.category && blog.route) {
          sitemap.write({
            url: `/blog/${blog.category.route}`,
            changefreq: "daily",
            priority: 0.7,
          });
          sitemap.write({
            url: `/blog/${blog.category.route}/${blog.route}`,
            changefreq: "daily",
            priority: 0.7,
          });
        }
      });
    }

    if (news.data && Array.isArray(news.data)) {
      news.data.forEach((newsItem) => {
        if (newsItem.route) {
          sitemap.write({
            url: `/news/${newsItem.route}`,
            changefreq: "daily",
            priority: 0.7,
          });
        }
      });
    }
  } catch (error) {
    console.error("Error fetching data for sitemap:", error);
  }

  sitemap.end();

  const sitemapOutput = await streamToPromise(sitemap);
  const writeStream = createWriteStream(
    resolve(__dirname, "public", "sitemap.xml")
  );
  writeStream.write(sitemapOutput);
  writeStream.end();
};

generateSitemap()
  .then(() => console.log("Sitemap generated!"))
  .catch(console.error);
