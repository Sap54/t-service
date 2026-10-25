import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";


// Шрифты локально (@fontsource) вместо Google Fonts CDN — быстрее для посетителей из РФ
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";

createRoot(document.getElementById("root")!).render(<App />);

// Цели Яндекс.Метрики без правки каждой ссылки: клики по tel: и t.me
// отслеживаются глобально (счётчик может быть ещё не загружен — потому optional).
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement | null;
  const link = target?.closest("a[href]");
  if (!link) return;
  const href = link.getAttribute("href") ?? "";
  if (href.startsWith("tel:")) {
    window.ym?.(10000000, "reachGoal", "CALL_CLICK");
  } else if (href.includes("t.me/")) {
    window.ym?.(10000000, "reachGoal", "TELEGRAM_CLICK");
  }
});

declare global {
  interface Window {
    ym?: (id: number, action: string, goal?: string) => void;
  }
}
