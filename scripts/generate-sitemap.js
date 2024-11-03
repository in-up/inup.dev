const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const BLOG_DIR = path.join(process.cwd(), "data", "blog");

async function addMdxPage(filePath) {
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(fileContents);

  const slug = path.basename(filePath, ".mdx");
  const route = `/blog/${slug}`;

  const publishedDate = new Date(data.publishedAt);
  const kstDate = new Date(publishedDate.getTime() - 9 * 60 * 60 * 1000);
  const lastmod = kstDate.toISOString();

  return `  <url>
    <loc>${`https://inupdev.vercel.app${route}`}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
  </url>`;
}

async function addPage(page) {
  const path = page
    .replace("src/pages", "")
    .replace(".js", "")
    .replace(".mdx", "")
    .replace(".tsx", "")
    .replace(/\[.*?\]/g, "");
  const route = path === "/index" ? "" : path;

  return `  <url>
    <loc>${`https://inupdev.vercel.app${route}`}</loc>
    <changefreq>hourly</changefreq>
  </url>`;
}

async function generateSitemap() {
  const { globby } = await import("globby");

  const mdxFiles = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"));

  const blogUrls = await Promise.all(
    mdxFiles.map((file) => addMdxPage(path.join(BLOG_DIR, file)))
  );

  const pages = await globby([
    "src/pages/**/*.{js,mdx,tsx}",
    "!src/pages/_*.tsx",
    "!src/pages/api/**",
  ]);

  const pageUrls = await Promise.all(pages.map(addPage));

  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...blogUrls, ...pageUrls].join("\n")}
</urlset>`;

  fs.writeFileSync("public/sitemap.xml", sitemap);
  console.log("Sitemap generated successfully.");
}

generateSitemap();
