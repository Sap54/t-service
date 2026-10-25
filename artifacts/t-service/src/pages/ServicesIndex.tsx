import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SiteHeader from "@/components/sections/SiteHeader";
import ContactSection from "@/components/sections/ContactSection";
import Seo from "@/seo/Seo";
import { BASE_URL } from "@/seo/pages";
import { services } from "@/data/services";

export default function ServicesIndex() {
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
        { "@type": "ListItem", position: 2, name: "Услуги", item: `${BASE_URL}/uslugi/` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.h1,
        url: `${BASE_URL}/${s.slug}/`,
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
      <Seo path="/uslugi/" jsonLd={jsonLd} />
      <SiteHeader />

      <main className="pt-32 lg:pt-40 pb-20">
        <section className="py-12 bg-secondary/50 border-b border-border">
          <div className="container mx-auto px-4">
            <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-6 flex items-center gap-1">
              <a href="/" className="hover:text-primary transition-colors">Главная</a>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">Услуги</span>
            </nav>
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[1.1] mb-6">
                Услуги <span className="text-primary">Т-СЕРВИС</span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium">
                Ремонт, обслуживание и модернизация промышленных ворот, автоматических дверей и докового оборудования. Выезд в день обращения, бесплатная диагностика, гарантия на работы.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <motion.div key={s.slug} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                  <Card className="bg-card border-border/50 hover:border-primary/50 transition-colors h-full flex flex-col">
                    <CardContent className="p-8 flex flex-col flex-grow gap-4">
                      <h2 className="text-2xl font-black uppercase leading-tight">{s.h1}</h2>
                      <p className="text-muted-foreground flex-grow">{s.lead}</p>
                      <a href={`/${s.slug}/`}>
                        <Button variant="outline" className="w-full border-primary/50 hover:bg-primary hover:text-white">
                          Подробнее <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-16 text-center">
              <p className="text-lg text-muted-foreground mb-6">
                Не нашли нужную услугу? Звоните — берёмся за сложное и нестандартное оборудование.
              </p>
              <a href="tel:+79139178734">
                <Button size="lg" className="text-lg h-14 px-8 bg-primary hover:bg-primary/90 text-white font-bold">
                  <Phone className="w-5 h-5 mr-2" /> +7 (913) 917-87-34
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <ContactSection />
    </div>
  );
}
