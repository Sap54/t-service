import React from "react";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import {
  ChevronRight, AlertCircle, Wrench, HelpCircle, Phone, ShieldCheck, Clock, Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import SiteHeader from "@/components/sections/SiteHeader";
import ContactSection from "@/components/sections/ContactSection";
import Seo from "@/seo/Seo";
import { BASE_URL } from "@/seo/pages";
import { services } from "@/data/services";
import NotFound from "@/pages/not-found";

const CITIES = ["Новосибирск", "Томск", "Омск", "Красноярск", "Кемерово", "Иркутск", "Барнаул", "Сургут"];

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const s = services.find((x) => x.slug === slug);

  if (!s) return <NotFound />;

  const url = `/${s.slug}/`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.h1,
      serviceType: s.name,
      description: s.lead,
      url: `${BASE_URL}${url}`,
      provider: {
        "@id": `${BASE_URL}/#localbusiness`,
        "@type": "LocalBusiness",
        name: "Т-СЕРВИС",
        telephone: "+7-913-917-87-34",
      },
      areaServed: CITIES.map((c) => ({ "@type": "City", name: c })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Услуги", item: `${BASE_URL}/uslugi/` },
        { "@type": "ListItem", position: 3, name: s.h1, item: `${BASE_URL}${url}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
      <Seo path={url} jsonLd={jsonLd} />
      <SiteHeader />

      <main className="pt-32 lg:pt-40">
        {/* Заголовок */}
        <section className="py-12 bg-secondary/50 border-b border-border">
          <div className="container mx-auto px-4">
            <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-6 flex items-center gap-1 flex-wrap">
              <a href="/" className="hover:text-primary transition-colors">Главная</a>
              <ChevronRight className="w-3 h-3" />
              <a href="/uslugi/" className="hover:text-primary transition-colors">Услуги</a>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">{s.name}</span>
            </nav>
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[1.1] mb-6">
                {s.h1} <span className="text-primary">в Новосибирске и Сибири</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-8">{s.lead}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+79139178734" className="sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-primary hover:bg-primary/90 text-white font-bold">
                    <Phone className="w-5 h-5 mr-2" /> +7 (913) 917-87-34
                  </Button>
                </a>
                <a href="#contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-primary/50 hover:bg-primary hover:text-white font-bold">
                    Оставить заявку
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Вводный текст */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed text-foreground/90">
              {s.intro.map((p, i) => (
                <motion.p key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        {/* Признаки неисправностей + работы */}
        <section className="py-16 bg-secondary/30 border-y border-border">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Card className="bg-card border-border/50 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-black uppercase">С какими неисправностями обращаются</h2>
                  </div>
                  <ul className="space-y-3">
                    {s.symptoms.map((sym, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/90">
                        <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        {sym}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Card className="bg-card border-border/50 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Wrench className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-black uppercase">Что мы делаем</h2>
                  </div>
                  <ul className="space-y-3">
                    {s.works.map((w, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/90">
                        <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Условия работы */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
              <Card className="bg-card border-border/50">
                <CardContent className="p-6 flex flex-col items-center gap-3">
                  <Truck className="w-10 h-10 text-primary" />
                  <h3 className="font-black uppercase">Выезд в день обращения</h3>
                  <p className="text-muted-foreground text-sm">По Новосибирску — сразу, по Сибири — по согласованной дате</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border/50">
                <CardContent className="p-6 flex flex-col items-center gap-3">
                  <Clock className="w-10 h-10 text-primary" />
                  <h3 className="font-black uppercase">Бесплатная диагностика</h3>
                  <p className="text-muted-foreground text-sm">Определяем причину и точную стоимость до начала работ</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border/50">
                <CardContent className="p-6 flex flex-col items-center gap-3">
                  <ShieldCheck className="w-10 h-10 text-primary" />
                  <h3 className="font-black uppercase">Гарантия на работы</h3>
                  <p className="text-muted-foreground text-sm">Условия фиксируем в акте выполненных работ</p>
                </CardContent>
              </Card>
            </div>

            {/* Бренды услуги */}
            <div className="max-w-4xl mx-auto mt-12 text-center">
              <h2 className="text-lg font-bold uppercase tracking-wide text-muted-foreground mb-6">Бренды, с которыми работаем по этой услуге</h2>
              <div className="flex flex-wrap justify-center gap-3 opacity-70">
                {s.brands.map((b) => (
                  <div key={b} className="text-lg font-black uppercase tracking-tighter px-4 py-2 border-2 border-border/50 rounded-md">
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 bg-secondary/30 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <HelpCircle className="w-10 h-10 text-primary mx-auto mb-3" />
              <h2 className="text-3xl font-black uppercase">Частые вопросы</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {s.faq.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-lg font-bold">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <ContactSection />
    </div>
  );
}
