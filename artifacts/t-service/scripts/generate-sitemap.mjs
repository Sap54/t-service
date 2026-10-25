// Генерация sitemap.xml из манифеста страниц src/seo/pages.mjs.
// Запускается после vite build (см. "build" в package.json), пишет в dist/public/sitemap.xml.
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { BASE_URL, pages } from "../src/seo/pages.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, "..", "dist", "public", "sitemap.xml");

const today = new Date().toISOString().slice(0, 10);

const urls = pages
  .map(
    (p) => `  <url>
    <loc>${BASE_URL}${p.path === "/" ? "/" : p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, xml, "utf8");
console.log(`sitemap.xml: ${pages.length} URL -> ${outPath}`);
