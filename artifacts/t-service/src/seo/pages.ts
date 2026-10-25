// Единый манифест страниц сайта: источник правды для роутера, пререндера
// (vite.config.ts), генератора sitemap.xml (scripts/generate-sitemap.mjs)
// и мета-тегов (src/seo/Seo.tsx). Не дублировать список URL где-либо ещё.
//
// BASE_URL — punycode-форма домена: роботы и XML-парсеры понимают только ASCII.
export const BASE_URL = "https://xn--54-6kcaeeukq5au7alec7azq.xn--p1ai";

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  changefreq: "weekly" | "monthly";
  priority: number;
}

export const pages: PageMeta[] = [
  {
    path: "/",
    title: "Ремонт автоматических ворот и дверей | Т-СЕРВИС Новосибирск",
    description:
      "Ремонт ангарных ворот, автоматических дверей, доклевеллеров в Новосибирске и Сибири. Выезд в день обращения, бесплатная диагностика. Hörmann, DoorHan, ChampionDoor, Alutech. +7 (913) 917-87-34",
    keywords:
      "ремонт автоматических ворот Новосибирск, ремонт дверей Новосибирск, доклевеллеры ремонт, ангарные ворота ChampionDoor, Hörmann сервис Сибирь, DoorHan ремонт, скоростные ворота Dynaco Alutech, обслуживание промышленных ворот",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    path: "/uslugi/",
    title: "Услуги: ремонт ворот, дверей, доклевеллеров — Т-СЕРВИС",
    description:
      "Все услуги Т-СЕРВИС: ремонт автоматических и скоростных ворот, автоматических дверей, ангарных ПВХ-ворот, доклевеллеров, плановое ТО и диагностика. Новосибирск и вся Сибирь.",
    changefreq: "monthly",
    priority: 0.9,
  },
  {
    path: "/remont-avtomaticheskih-vorot/",
    title: "Ремонт автоматических ворот в Новосибирске — Т-СЕРВИС",
    description:
      "Ремонт секционных, распашных и откатных автоматических ворот: приводы, пружины, полотна, электроника. Выезд в день обращения, гарантия. Новосибирск и Сибирь.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/remont-skorostnyh-vorot/",
    title: "Ремонт скоростных ворот — Т-СЕРВИС Новосибирск",
    description:
      "Ремонт скоростных рулонных ворот Dynaco, Albany, Efaflex: полотно ПВХ, боковые стойки, привод, электроника. Быстрый выезд по Новосибирску и Сибири.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/remont-avtomaticheskih-dverey/",
    title: "Ремонт автоматических дверей в Новосибирске — Т-СЕРВИС",
    description:
      "Ремонт автоматических раздвижных и распашных дверей: датчики, приводы, ролики, направляющие, электроника. Сервисный ремонт дверей в Новосибирске и Сибири.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/remont-angarnyh-pvh-vorot/",
    title: "Ремонт ангарных ПВХ-ворот ChampionDoor — Т-СЕРВИС",
    description:
      "Ремонт ангарных ПВХ-ворот ChampionDoor и аналогов: полотно, створки, ветровые усиления, электропривод. Ремонт ворот для ангаров и складов по Сибири.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/remont-doklevellerov/",
    title: "Ремонт доклевеллеров — Т-СЕРВИС Новосибирск",
    description:
      "Ремонт и обслуживание доклевеллеров (уравнительных платформ): гидравлика, платформа, клапаны, шланги. Ремонт докового оборудования в Сибири.",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/to-i-diagnostika-vorot/",
    title: "ТО и диагностика ворот — Т-СЕРВИС Новосибирск",
    description:
      "Плановое техническое обслуживание и диагностика ворот, дверей и докового оборудования. Сервисные контракты для складов и производств в Сибири.",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/kontakty/",
    title: "Контакты Т-СЕРВИС — ремонт ворот в Новосибирске и Сибири",
    description:
      "Телефоны +7 (913) 917-87-34, Telegram @TechFixCrew, e-mail. Выезд по Новосибирску, Томску, Омску, Красноярску, Кемерово и всей Сибири. Заявка на сайте.",
    changefreq: "monthly",
    priority: 0.6,
  },
];
