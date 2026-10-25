// Пререндер SPA: поднимает статический сервер на dist/public, рендерит каждый
// маршрут из манифеста src/seo/pages.ts в chrome-headless-shell и сохраняет
// готовый HTML (с контентом и мета-тегами из Seo/helmet) в dist/public.
// Запускается после vite build (см. "build" в package.json).
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Prerenderer from "@prerenderer/prerenderer";
import { pages } from "../src/seo/pages.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticDir = resolve(__dirname, "..", "dist", "public");

const prerenderer = new Prerenderer({
  staticDir,
  renderer: "@prerenderer/renderer-puppeteer",
  rendererOptions: {
    renderAfterTime: 5000,
    // Полный Chrome из puppeteer падает на Windows этой машины (0xC0000005),
    // chrome-headless-shell работает — используем его.
    launchOptions: { headless: "shell" },
  },
});

const routes = pages.map((p) => p.path);

console.log(`prerender: ${routes.length} маршрутов из dist/public...`);
await prerenderer.initialize();
try {
  const rendered = await prerenderer.renderRoutes(routes);
  for (const r of rendered) {
    // "/": index.html; "/uslugi/": uslugi/index.html
    const rel =
      r.route === "/" || r.route === ""
        ? "index.html"
        : join(r.route.replace(/^\/|\/$/g, ""), "index.html");
    const outPath = join(staticDir, rel);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, r.html, "utf8");
    console.log(`prerender: ${r.route} -> ${rel} (${r.html.length} bytes)`);
  }
  console.log("prerender: готово");
} finally {
  // destroy() иногда не закрывает внутренний сервер, и процесс зависает —
  // выходим принудительно после попытки корректного завершения
  await Promise.race([
    prerenderer.destroy(),
    new Promise((res) => setTimeout(res, 10000)),
  ]);
  process.exit(0);
}
