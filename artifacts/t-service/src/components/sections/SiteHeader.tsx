import React from "react";
import { Menu, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Шапка сайта для всех страниц. Навигация ведёт на реальные страницы
 * (/uslugi/, /kontakty/) и на анкоры главной (/#advantages, /#brands).
 */
export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const nav = [
    { href: "/uslugi/", label: "Услуги" },
    { href: "/#advantages", label: "Преимущества" },
    { href: "/#brands", label: "Бренды" },
    { href: "/kontakty/", label: "Контакты" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/" className="text-2xl font-black text-primary tracking-tight">Т-СЕРВИС</a>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex gap-6 text-sm font-medium">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-primary transition-colors">{item.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex flex-col text-right">
              <a href="tel:+79139178734" className="text-lg font-bold hover:text-primary transition-colors">
                +7 (913) 917-87-34
              </a>
              <span className="text-xs text-muted-foreground">Также доступен в MAX</span>
            </div>
            <Button onClick={() => window.open('https://t.me/TechFixCrew', '_blank')} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <Send className="w-4 h-4 mr-2" />
              Telegram
            </Button>
          </div>
        </div>

        <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Меню">
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 shadow-xl">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="font-medium p-2" onClick={() => setIsMenuOpen(false)}>{item.label}</a>
          ))}
          <div className="flex flex-col gap-2 pt-4 border-t border-border">
            <a href="tel:+79139178734" className="font-bold text-lg">+7 (913) 917-87-34</a>
            <Button onClick={() => window.open('https://t.me/TechFixCrew', '_blank')} className="w-full bg-primary text-white">
              Написать в Telegram
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
