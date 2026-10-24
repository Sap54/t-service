// Единый манифест страниц сайта: источник правды для генератора sitemap.xml (scripts/generate-sitemap.mjs),
// а с этапа 2 — также для роутера (wouter) и пререндера. Не дублировать список URL где-либо ещё.
//
// BASE_URL — punycode-форма домена: роботы и XML-парсеры понимают только ASCII.
export const BASE_URL = "https://xn--54-6kcaeeukq5au7alec7azq.xn--p1ai";

export const pages = [
  {
    path: "/",
    changefreq: "weekly",
    priority: 1.0,
  },
];
