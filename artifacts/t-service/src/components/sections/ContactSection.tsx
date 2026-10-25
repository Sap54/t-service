import React from "react";
import { Phone, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * Контактная секция с формой заявки и подвалом. Общая для всех страниц.
 * Если /api/notify недоступен (статический хостинг), предлагаем письмо
 * с уже заполненным текстом заявки.
 */
export default function ContactSection() {
  const [phoneValue, setPhoneValue] = React.useState("+7 (");
  const [formName, setFormName] = React.useState("");
  const [formCity, setFormCity] = React.useState("");
  const [formDesc, setFormDesc] = React.useState("");
  const [formStatus, setFormStatus] = React.useState<"idle" | "sending" | "ok" | "error">("idle");
  const [mailtoFallback, setMailtoFallback] = React.useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, "").slice(1); // убираем ведущую "7"
    let result = "+7 (";
    if (digits.length > 0) result += digits.slice(0, 3);
    if (digits.length >= 3) result += ") ";
    if (digits.length > 3) result += digits.slice(3, 6);
    if (digits.length >= 6) result += "-";
    if (digits.length > 6) result += digits.slice(6, 8);
    if (digits.length > 8) result += "-";
    if (digits.length > 8) result += digits.slice(8, 10);
    setPhoneValue(result);
  };

  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value || e.target.value === "+7 (") {
      setPhoneValue("+7 (");
      setTimeout(() => {
        e.target.setSelectionRange(4, 4);
      }, 0);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    const text = [
      "Новая заявка с сайта Т-СЕРВИС",
      "",
      `Имя: ${formName || "не указано"}`,
      `Телефон: ${phoneValue}`,
      `Город: ${formCity || "не указан"}`,
      `Описание: ${formDesc || "не указано"}`,
    ].join("\n");

    try {
      window.ym?.(10000000, "reachGoal", "FORM_SUBMIT");
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setFormStatus("ok");
      setFormName("");
      setPhoneValue("+7 (");
      setFormCity("");
      setFormDesc("");
    } catch {
      // Статический хостинг без /api — предлагаем письмо с уже заполненным текстом заявки
      setFormStatus("error");
      const subject = encodeURIComponent("Заявка с сайта Т-СЕРВИС");
      const body = encodeURIComponent(text);
      setMailtoFallback(`mailto:0001827@gmail.com?subject=${subject}&body=${body}`);
    }
  };

  return (
    <footer id="contact" className="bg-background pt-24 pb-12 border-t-4 border-primary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-6">Свяжитесь <span className="text-primary">с нами</span></h2>
            <p className="text-xl text-muted-foreground mb-10">Оставьте заявку, и мы перезвоним для уточнения деталей.</p>

            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1 uppercase font-bold tracking-wider">Главный телефон</div>
                  <a href="tel:+79139178734" className="text-3xl font-black hover:text-primary transition-colors block mb-2">+7 (913) 917-87-34</a>
                  <div className="flex flex-col gap-1 text-muted-foreground">
                    <a href="tel:+79130001823" className="hover:text-white">+7 (913) 000-18-23</a>
                    <a href="tel:+79130001827" className="hover:text-white">+7 (913) 000-18-27</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1 uppercase font-bold tracking-wider">Telegram</div>
                  <a href="https://t.me/TechFixCrew" target="_blank" rel="noreferrer" className="text-xl font-bold hover:text-primary transition-colors">@TechFixCrew</a>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-secondary/30 border-border/50">
            <CardContent className="p-8">
              {formStatus === "ok" ? (
                <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-black">Заявка отправлена!</h3>
                  <p className="text-muted-foreground">Мы получили вашу заявку и скоро перезвоним.</p>
                  <Button variant="outline" className="mt-4" onClick={() => setFormStatus("idle")}>Отправить ещё</Button>
                </div>
              ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="text-sm font-bold uppercase tracking-wider mb-2 block">Имя</label>
                  <Input value={formName} onChange={e => setFormName(e.target.value)} placeholder="Как к вам обращаться?" className="bg-background border-border h-12" required />
                </div>
                <div>
                  <label className="text-sm font-bold uppercase tracking-wider mb-2 block">Телефон *</label>
                  <Input
                    type="tel"
                    value={phoneValue}
                    onChange={handlePhoneChange}
                    onFocus={handlePhoneFocus}
                    placeholder="+7 (___) ___-__-__"
                    className="bg-background border-border h-12"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-bold uppercase tracking-wider mb-2 block">Город</label>
                  <Input value={formCity} onChange={e => setFormCity(e.target.value)} placeholder="Ваш город" className="bg-background border-border h-12" />
                </div>
                <div>
                  <label className="text-sm font-bold uppercase tracking-wider mb-2 block">Бренд / Описание проблемы</label>
                  <Textarea value={formDesc} onChange={e => setFormDesc(e.target.value)} placeholder="Что сломалось?" className="bg-background border-border min-h-[120px]" />
                </div>
                <Button type="submit" disabled={formStatus === "sending"} size="lg" className="w-full h-16 text-lg font-bold bg-primary hover:bg-primary/90 text-white">
                  {formStatus === "sending" ? "Отправляем..." : "Отправить заявку"}
                </Button>
                {formStatus === "error" && (
                  <p className="text-sm text-center text-red-400">
                    Не удалось отправить через сайт. Позвоните: <a href="tel:+79139178734" className="underline">+7 (913) 917-87-34</a>
                    {mailtoFallback && (<> или <a href={mailtoFallback} className="underline">отправьте заявку письмом</a> (текст уже заполнен)</>)}
                  </p>
                )}
                <p className="text-xs text-center text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.<br/>
                  Также доступны в <span className="text-primary font-bold">MAX</span> — лучшем мессенджере в мире.
                </p>
              </form>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>&copy; {new Date().getFullYear()} Т-СЕРВИС. Все права защищены.</div>
          <div className="flex gap-4">
            <a href="/uslugi/" className="hover:text-primary">Ремонт ворот</a>
            <span>•</span>
            <a href="/uslugi/" className="hover:text-primary">Автоматические двери</a>
            <span>•</span>
            <a href="/uslugi/" className="hover:text-primary">Доклевеллеры</a>
          </div>
          <div className="flex gap-4">
            <a href="mailto:0001827@gmail.com" className="hover:text-primary">0001827@gmail.com</a>
            <a href="mailto:0001823@gmail.com" className="hover:text-primary">0001823@gmail.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
