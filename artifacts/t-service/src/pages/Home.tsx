import React from "react";
import { motion } from "framer-motion";
import heroBg from "@assets/скоростные_ворота_1776186260416.jpg";
import dockImg from "@assets/cq5dam.L.1600.0_1776186865508.jpeg";
import pressImg from "@assets/europress_1776186938063.png";
import hangarImg from "@assets/hangar_door_(ангарные_ворота)_1_1776186989307.JPG";
import visitImg from "@assets/ремонт_двери_3_1776187212168.jpeg";
import toImg1 from "@assets/photo_5418119815802590206_y_1776687282457.jpg";
import toImg2 from "@assets/ремонт_дверей_1_1776187150290.jpg";
import toImg3 from "@assets/ремонт_дока_1_1776187150290.jpg";
import gateRepairImg from "@assets/автоматические_ворота_1776238923234.png";
import autoDoorImg from "@assets/4_1776240464563.jpg";
import logoKruger from "@assets/крюгер_лого_1776239863517.png";
import logoOzon from "@assets/озон_лого_1776267759881.png";
import logoMetro from "@assets/метро_1776239863517.jpg";
import logoLenta from "@assets/lenta_1776239863517.jpg";
import { 
  Phone, MapPin, Wrench, Settings, 
  ShieldCheck, Clock, Zap, Truck,
  CheckCircle2, Menu, X, Send,
  ChevronRight, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
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
    if (digits.length >= 8) result += "-";
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

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    const text = [
      "📋 <b>Новая заявка с сайта Т-СЕРВИС</b>",
      "",
      `👤 <b>Имя:</b> ${formName || "не указано"}`,
      `📞 <b>Телефон:</b> ${phoneValue}`,
      `📍 <b>Город:</b> ${formCity || "не указан"}`,
      `🔧 <b>Описание:</b> ${formDesc || "не указано"}`,
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
      const body = encodeURIComponent(text.replace(/<[^>]+>/g, ""));
      setMailtoFallback(`mailto:0001827@gmail.com?subject=${subject}&body=${body}`);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-primary tracking-tight">Т-СЕРВИС</span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex gap-6 text-sm font-medium">
              <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
              <a href="#advantages" className="hover:text-primary transition-colors">Преимущества</a>
              <a href="#brands" className="hover:text-primary transition-colors">Бренды</a>
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

          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 shadow-xl">
            <a href="#services" className="font-medium p-2" onClick={() => setIsMenuOpen(false)}>Услуги</a>
            <a href="#advantages" className="font-medium p-2" onClick={() => setIsMenuOpen(false)}>Преимущества</a>
            <a href="#contact" className="font-medium p-2" onClick={() => setIsMenuOpen(false)}>Контакты</a>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <a href="tel:+79139178734" className="font-bold text-lg">+7 (913) 917-87-34</a>
              <Button onClick={() => window.open('https://t.me/TechFixCrew', '_blank')} className="w-full bg-primary text-white">
                Написать в Telegram
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden clip-diagonal">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40 z-10" />
          <img 
            src={heroBg} 
            alt="ремонт автоматических ворот Новосибирск Hörmann" 
            className="w-full h-full object-cover object-center opacity-50"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeIn}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.1] mb-6">
              Ремонт Автоматических <br/>
              <span className="text-primary">Ворот и Дверей</span> <br/>
              в Сибири
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
              Оперативный выезд по Сибири · Сертифицированные мастера · Оригинальные запчасти
            </p>
            <ul className="flex flex-col gap-3 mb-10 text-lg">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                <span>Выезжаем в день обращения</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                <span>Бесплатная диагностика при ремонте</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                <span>Гарантия на все выполненные работы</span>
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-primary hover:bg-primary/90 text-white font-bold" onClick={scrollToContact}>
                Вызвать мастера
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Почему выбирают <span className="text-primary whitespace-nowrap">Т-СЕРВИС</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Надежность, скорость и профессионализм в каждой детали.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: ShieldCheck, title: "Сертифицированные мастера", desc: "По Hörmann, Alutech, DoorHan и другим ведущим брендам." },
              { icon: Wrench, title: "Оригинальные запчасти", desc: "А также надежные альтернативы для ушедших из РФ производителей." },
              { icon: Truck, title: "Выезд в день обращения", desc: "По Новосибирску, Томску, Омску, Красноярску, Кемерово и СФО." },
              { icon: Clock, title: "Поддержка 24/7", desc: "И бесплатная диагностика при проведении ремонтных работ." },
              { icon: Settings, title: "Гарантия на работы", desc: "Плановое ТО снижает риск внезапных поломок на 70%." },
              { icon: Star, title: "Более 10 лет опыта", desc: "Успешно обслужили более 500 промышленных и коммерческих объектов." }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Card className="bg-card border-border/50 hover:border-primary/50 transition-colors h-full">
                  <CardContent className="p-6 flex flex-col items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 clip-diagonal-bottom bg-background relative z-10 pb-32">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 border-l-4 border-primary pl-4">Наши услуги</h2>
            <h3 className="text-xl text-muted-foreground">Поставка, монтаж, ремонт, обслуживание и модернизация ворот, доклевеллеров, автоматических дверей различных производителей</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { title: "Автоматические ворота", desc: "Всех производителей. Быстро и с гарантией.", img: gateRepairImg },
              { title: "Скоростные ворота", desc: "Dynaco, Hörmann, Alutech, DoorHan.", img: "/images/service-speed-doors.png" },
              { title: "Автоматические двери", desc: "Dorma, Tormax, Geze, DoorHan, Gilgen.", img: autoDoorImg },
              { title: "Ангарные ПВХ-ворота", desc: "ChampionDoor и другие крупногабаритные системы.", img: hangarImg },
              { title: "Доклевеллеры", desc: "Ремонт и обслуживание перегрузочного оборудования.", img: dockImg },
              { title: "Промышленные прессы", desc: "Обслуживание прессов Europress и аналогов.", img: pressImg },
              { title: "Выезд специалиста", desc: "Быстрый выезд и оценка состояния на месте.", img: visitImg },
              { title: "Плановое ТО", desc: "Диагностика и профилактика оборудования.", img: null, collage: [toImg1, toImg2, toImg3] }
            ].map((service, i) => (
              <Card key={i} className="bg-card border-border overflow-hidden flex flex-col group">
                {'collage' in service && service.collage ? (
                  <div className="h-48 grid grid-cols-2 grid-rows-2 gap-0.5 overflow-hidden">
                    <div className="row-span-2 overflow-hidden">
                      <img src={service.collage[0]} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="overflow-hidden">
                      <img src={service.collage[1]} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="overflow-hidden">
                      <img src={service.collage[2]} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                ) : service.img ? (
                  <div className="h-48 overflow-hidden">
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : null}
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h4 className="text-xl font-bold mb-2">{service.title}</h4>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">{service.desc}</p>
                  <Button variant="outline" className="w-full mt-auto border-primary/50 hover:bg-primary hover:text-white" onClick={scrollToContact}>
                    Заказать <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            
            {/* Fun Card */}
            <Card className="bg-primary text-white border-none md:col-span-2 lg:col-span-3 xl:col-span-4 mt-4">
              <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <Zap className="w-16 h-16 flex-shrink-0" />
                <div>
                  <h4 className="text-2xl font-bold mb-2">Роботы Boston Dynamics? Шутка!</h4>
                  <p className="text-primary-foreground/90 text-lg">
                    Но если есть документация и запчасти — разберёмся с любым промышленным оборудованием. Мы не боимся сложных задач.
                  </p>
                </div>
                <Button variant="secondary" className="md:ml-auto whitespace-nowrap font-bold" onClick={scrollToContact}>
                  Бросить вызов
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section id="brands" className="py-20 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold mb-12 uppercase tracking-wide text-muted-foreground">Мы работаем с брендами</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {["Hörmann", "Alutech", "DoorHan", "Dorma", "Tormax", "Geze", "ChampionDoor", "Besam", "Came", "Dynaco", "Europress", "Loading Systems"].map((brand) => (
              <div key={brand} className="text-xl md:text-3xl font-black uppercase tracking-tighter px-4 py-2 border-2 border-border/50 rounded-md">
                {brand}
              </div>
            ))}
            <div className="text-xl font-medium px-4 py-2 flex items-center">
              и другие...
            </div>
          </div>
        </div>
      </section>

      {/* GEOGRAPHY */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M45.7,-76.3C58.9,-69.3,69.1,-55.3,77.3,-40.8C85.5,-26.3,91.8,-11.3,90.2,2.8C88.6,16.8,79.2,29.9,69.5,41.4C59.8,52.9,49.8,62.8,37.3,70.1C24.8,77.4,9.8,82.1,-4.9,84.9C-19.6,87.7,-33.9,88.6,-46.5,82.2C-59.1,75.8,-70.1,62,-78.3,47C-86.5,32,-91.9,16,-92,-0.1C-92.1,-16.2,-86.9,-32.3,-78.1,-46.3C-69.3,-60.3,-57.1,-72.2,-43.1,-78.7C-29.1,-85.2,-14.5,-86.3,1.1,-88.3C16.8,-90.3,32.5,-83.3,45.7,-76.3Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <MapPin className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 leading-tight">
              Работаем от Сургута до Иркутска, <br className="hidden md:block"/>
              <span className="text-primary">а по ангарным воротам — по всей России</span>
            </h2>
            
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center">
            <div>
              <div className="text-5xl font-black text-primary mb-2">500+</div>
              <div className="text-muted-foreground font-medium uppercase text-sm tracking-wider">Объектов</div>
            </div>
            <div>
              <div className="text-5xl font-black text-primary mb-2">10+</div>
              <div className="text-muted-foreground font-medium uppercase text-sm tracking-wider">Лет опыта</div>
            </div>
            <div>
              <div className="text-5xl font-black text-primary mb-2">24/7</div>
              <div className="text-muted-foreground font-medium uppercase text-sm tracking-wider">Поддержка</div>
            </div>
            <div>
              <div className="text-5xl font-black text-primary mb-2">-70%</div>
              <div className="text-muted-foreground font-medium uppercase text-sm tracking-wider">Поломок при ТО</div>
            </div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-3">Наши <span className="text-primary">клиенты</span></h2>
            <p className="text-muted-foreground">Нам доверяют крупнейшие сети и предприятия Сибири</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { src: logoKruger, alt: "ООО ТД Крюгер", bg: "bg-[#2a2a1e]" },
              { src: logoOzon, alt: "OZON", bg: "bg-white" },
              { src: logoMetro, alt: "METRO", bg: "bg-[#1b2f6e]" },
              { src: logoLenta, alt: "Лента", bg: "bg-[#003087]" },
            ].map((logo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${logo.bg} rounded-xl flex items-center justify-center p-6 h-28`}
              >
                <img src={logo.src} alt={logo.alt} className="max-h-16 max-w-full object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & FOOTER */}
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
              <span>Ремонт ворот</span>
              <span>•</span>
              <span>Автоматические двери</span>
              <span>•</span>
              <span>Доклевеллеры</span>
            </div>
            <div className="flex gap-4">
              <a href="mailto:0001827@gmail.com" className="hover:text-primary">0001827@gmail.com</a>
              <a href="mailto:0001823@gmail.com" className="hover:text-primary">0001823@gmail.com</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
