import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Phone, Send, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SiteHeader from "@/components/sections/SiteHeader";
import ContactSection from "@/components/sections/ContactSection";
import Seo from "@/seo/Seo";
import { BASE_URL } from "@/seo/pages";

export default function Contacts() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Контакты", item: `${BASE_URL}/kontakty/` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
      <Seo path="/kontakty/" jsonLd={jsonLd} />
      <SiteHeader />

      <main className="pt-32 lg:pt-40 pb-20">
        <section className="py-12 bg-secondary/50 border-b border-border">
          <div className="container mx-auto px-4">
            <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-6 flex items-center gap-1">
              <a href="/" className="hover:text-primary transition-colors">Главная</a>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">Контакты</span>
            </nav>
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[1.1] mb-4">
                Контакты <span className="text-primary">Т-СЕРВИС</span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium">Ответим на вопросы, назовём сроки и стоимость работ.</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card className="bg-card border-border/50">
                <CardContent className="p-8 flex flex-col gap-4">
                  <Phone className="w-10 h-10 text-primary" />
                  <div>
                    <h2 className="text-sm text-muted-foreground uppercase font-bold tracking-wider mb-3">Телефоны</h2>
                    <div className="flex flex-col gap-2 text-lg font-bold">
                      <a href="tel:+79139178734" className="hover:text-primary transition-colors">+7 (913) 917-87-34</a>
                      <a href="tel:+79130001823" className="hover:text-primary transition-colors font-medium">+7 (913) 000-18-23</a>
                      <a href="tel:+79130001827" className="hover:text-primary transition-colors font-medium">+7 (913) 000-18-27</a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardContent className="p-8 flex flex-col gap-4">
                  <Send className="w-10 h-10 text-primary" />
                  <div>
                    <h2 className="text-sm text-muted-foreground uppercase font-bold tracking-wider mb-3">Telegram</h2>
                    <a href="https://t.me/TechFixCrew" target="_blank" rel="noreferrer" className="text-lg font-bold hover:text-primary transition-colors">@TechFixCrew</a>
                    <p className="text-muted-foreground text-sm mt-2">Отвечаем быстро, можно прислать фото оборудования</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardContent className="p-8 flex flex-col gap-4">
                  <Mail className="w-10 h-10 text-primary" />
                  <div>
                    <h2 className="text-sm text-muted-foreground uppercase font-bold tracking-wider mb-3">E-mail</h2>
                    <div className="flex flex-col gap-2">
                      <a href="mailto:0001827@gmail.com" className="hover:text-primary transition-colors">0001827@gmail.com</a>
                      <a href="mailto:0001823@gmail.com" className="hover:text-primary transition-colors">0001823@gmail.com</a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardContent className="p-8 flex flex-col gap-4">
                  <MapPin className="w-10 h-10 text-primary" />
                  <div>
                    <h2 className="text-sm text-muted-foreground uppercase font-bold tracking-wider mb-3">География</h2>
                    <p className="text-sm leading-relaxed">База — Новосибирск. Работаем по всей Сибири: Томск, Омск, Красноярск, Кемерово, Иркутск, Барнаул, Сургут.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="max-w-3xl mx-auto flex items-start gap-4 bg-primary/5 border border-primary/20 rounded-xl p-6">
              <Clock className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="font-black uppercase mb-2">Режим работы</h2>
                <p className="text-muted-foreground">
                  Принимаем заявки круглосуточно, без выходных. По Новосибирску мастер выезжает обычно в день обращения; по другим городам согласовываем дату.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ContactSection />
    </div>
  );
}
