import { Helmet } from "react-helmet-async";
import { BASE_URL, pages } from "./pages";

const OG_IMAGE = `${BASE_URL}/opengraph.jpg`;
const SITE_NAME = "Т-СЕРВИС";

interface SeoProps {
  /** Путь страницы (как в манифесте pages.ts) — для canonical, og:url и мета-тегов */
  path: string;
  /** Переопределение title (для служебных страниц, которых нет в манифесте) */
  title?: string;
  /** Для служебных страниц (404) */
  noindex?: boolean;
  /** Дополнительные блоки schema.org (Service, FAQPage, BreadcrumbList...) */
  jsonLd?: object[];
}

/**
 * Мета-теги страницы. Значения берутся из единого манифеста src/seo/pages.ts,
 * поэтому title/description нельзя «разъехать» с sitemap и пререндером.
 * Пререндер запекает результат прямо в HTML каждого маршрута.
 */
export default function Seo({ path, title: titleOverride, noindex = false, jsonLd = [] }: SeoProps) {
  const meta = pages.find((p) => p.path === path);
  const title = titleOverride ?? meta?.title ?? `${SITE_NAME} — ремонт ворот и дверей`;
  const description =
    meta?.description ??
    "Ремонт автоматических ворот, дверей и доклевеллеров в Новосибирске и Сибири.";
  const url = `${BASE_URL}${path === "/" ? "/" : path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {meta?.keywords && <meta name="keywords" content={meta.keywords} />}
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
}
