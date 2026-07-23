import { useEffect, useRef, useState } from "react";
import {
  Building2,
  CalendarDays,
  Clock,
  Hammer,
  Handshake,
  MapPin,
  Menu,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AmbientGlow from "@/components/incorporacao/AmbientGlow";
import Reveal from "@/components/incorporacao-presencial/Reveal";
import CheckoutLeadDialog from "@/components/incorporacao-presencial/CheckoutLeadDialog";
import youconLogo from "@/assets/youcon-logo.png";
import thiagoPhoto from "@/assets/thiago-cardim.png";
import samuelPhoto from "@/assets/samuel-mosca.jpg";
import heroImage from "@/assets/inc-hero-desktop.jpg";
import heroImageMobile from "@/assets/inc-hero-mobile.jpg";

// Cole aqui o link do checkout externo depois. O modal de conversão redireciona para esta URL.
const CHECKOUT_URL = "#";

const EVENTO = "incorporacao-presencial";

const PAGE_TITLE = "Imersão Presencial de Incorporação Imobiliária | YouCon + SMH";
const PAGE_DESCRIPTION =
  "Dois dias presenciais em Poços de Caldas com Thiago Cardim e Samuel Mosca para transformar o conteúdo de Incorporação Imobiliária em um plano real de ação. Apenas 10 vagas.";
const OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/Nw4i1Ut272fGcuAe5gSx9v8g1G42/social-images/social-1776173734241-open-graph-yc.webp";

/** Atualiza title, description e Open Graph para a rota enquanto a página está montada. */
function usePageMeta() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    const created: HTMLMetaElement[] = [];

    const setMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      const existed = Boolean(el);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      const previousContent = el.getAttribute("content");
      el.setAttribute("content", content);
      if (!existed) created.push(el);
      return { el, previousContent, existed };
    };

    const restorers = [
      setMeta('meta[name="description"]', "name", "description", PAGE_DESCRIPTION),
      setMeta('meta[property="og:title"]', "property", "og:title", PAGE_TITLE),
      setMeta('meta[property="og:description"]', "property", "og:description", PAGE_DESCRIPTION),
      setMeta('meta[property="og:image"]', "property", "og:image", OG_IMAGE),
      setMeta('meta[property="og:type"]', "property", "og:type", "website"),
    ];

    return () => {
      document.title = previousTitle;
      restorers.forEach(({ el, previousContent, existed }) => {
        if (existed && previousContent !== null) el.setAttribute("content", previousContent);
      });
      created.forEach((el) => el.remove());
    };
  }, []);
}

const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const navLinks = [
  { label: "Cronograma", target: "cronograma" },
  { label: "Conteúdo", target: "conteudo" },
  { label: "Quem conduz", target: "quem-conduz" },
  { label: "Estadia", target: "estadia" },
];

const chips = [
  { icon: CalendarDays, label: "18 e 19 de setembro" },
  { icon: MapPin, label: "Poços de Caldas, MG" },
  { icon: Users, label: "Apenas 10 vagas" },
];

// [PLACEHOLDER: trocar pela grade real depois]
const takeaways = [
  {
    title: "Como avaliar um terreno com olhar de incorporador",
    detail: "O que observar em localização, zoneamento e potencial construtivo antes de dar o primeiro passo.",
  },
  {
    title: "Estruturar um empreendimento do zero, do estudo à viabilidade",
    detail: "Do estudo de massa à definição do produto, o caminho de tirar o projeto do papel.",
  },
  {
    title: "Entender custos, margem e viabilidade sem achismo",
    detail: "Como montar a conta do empreendimento e enxergar a margem real antes de investir.",
  },
  {
    title: "Estratégias de captação e venda de unidades",
    detail: "Como estruturar a oferta e vender as unidades com previsibilidade.",
  },
  {
    title: "Networking com quem já está no jogo",
    detail: "Dois dias ao lado de pessoas que estão construindo de verdade.",
  },
];

const hosts = [
  {
    name: "THIAGO CARDIM",
    role: "Arquiteto e CEO da YouCon Arquitetura e Engenharia",
    photo: thiagoPhoto as string | null,
    // [PLACEHOLDER: trocar pela mini bio real]
    description:
      "À frente da YouCon Arquitetura e Engenharia, conduz projetos completos e estudos de viabilidade para empreendimentos imobiliários. No presencial, mostra na prática como as decisões de projeto definem aproveitamento, custos e potencial comercial.",
  },
  {
    name: "SAMUEL MOSCA",
    role: "Cofundador da SMH Patrimonial",
    photo: samuelPhoto as string | null,
    // [PLACEHOLDER: trocar pela mini bio real]
    description:
      "Cofundador da SMH Patrimonial, atua na estruturação estratégica de negócios e empreendimentos imobiliários. No presencial, orienta a modelagem da incorporação, os riscos e as decisões que viabilizam o negócio.",
  },
];

const diferenciais = [
  {
    icon: Handshake,
    title: "Networking real",
    description: "Um happy hour de sexta pensado para você trocar com quem já está no jogo, sem crachá e sem discurso pronto.",
  },
  {
    icon: Hammer,
    title: "Dinâmica prática",
    description: "Mão na massa: você caminha o percurso da incorporação com casos reais e sai com um plano de ação começado.",
  },
  {
    icon: Building2,
    title: "Visita técnica",
    description: "Uma obra de verdade para ver de perto o que na teoria fica abstrato, do canteiro às decisões que mudam o resultado.",
  },
];

const agenda = [
  {
    day: "Sexta, 18 de setembro",
    blocks: [
      { time: "09h às 17h", label: "Imersão", icon: Clock },
      { time: "19h", label: "Happy Hour de networking", icon: Handshake },
    ],
  },
  {
    day: "Sábado, 19 de setembro",
    blocks: [
      { time: "09h às 13h", label: "Imersão + dinâmica prática", icon: Hammer },
      { time: "Na sequência", label: "Visita técnica a uma obra real", icon: Building2 },
    ],
  },
];

const IncorporacaoPresencial = () => {
  usePageMeta();

  const [menuOpen, setMenuOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);

  // Parallax do fundo do hero, igual à /incorporacao e respeitando reduce-motion.
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateParallax = () => {
      if (!bgRef.current || reducedMotionQuery.matches) return;
      bgRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.3}px, 0)`;
    };
    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    return () => window.removeEventListener("scroll", updateParallax);
  }, []);

  const handleNav = (target: string) => {
    setMenuOpen(false);
    scrollToId(target);
  };

  const openCheckout = () => setCheckoutOpen(true);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <AmbientGlow />

      {/* Header com menu de navegação */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4">
          <button
            type="button"
            onClick={() => handleNav("hero")}
            className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Voltar ao topo"
          >
            <img src={youconLogo} alt="YouCon Arquitetura e Engenharia" className="h-7 md:h-10" />
          </button>

          {/* Navegação desktop */}
          <nav className="hidden items-center gap-6 md:flex" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <button
                key={link.target}
                type="button"
                onClick={() => handleNav(link.target)}
                className="rounded text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="cta-green"
              onClick={() => handleNav("investimento")}
              className="rounded-full h-10 px-5 text-sm"
            >
              Garantir vaga
            </Button>
          </nav>

          {/* Botão hambúrguer mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Menu mobile colapsável */}
        {menuOpen && (
          <nav
            className="border-t border-border/60 bg-background/95 px-4 py-3 md:hidden"
            aria-label="Navegação principal"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.target}>
                  <button
                    type="button"
                    onClick={() => handleNav(link.target)}
                    className="w-full rounded-md px-2 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="mt-2">
                <Button
                  variant="cta-green"
                  onClick={() => handleNav("investimento")}
                  className="w-full rounded-full h-11 text-sm"
                >
                  Garantir vaga
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="hero" className="relative flex min-h-[88vh] items-center overflow-hidden py-14 md:py-24">
        {/* Fundo com parallax (mesma imagem da /incorporacao) e camadas de luz por cima */}
        <div className="absolute inset-0 overflow-hidden">
          <div ref={bgRef} className="absolute inset-0 scale-110 will-change-transform">
            <img src={heroImage} alt="" className="hidden h-full w-full object-cover md:block" />
            <img src={heroImageMobile} alt="" className="block h-full w-full object-cover md:hidden" />
          </div>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <Reveal className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 md:px-4 md:py-2">
              <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-primary md:text-sm">
                Imersão presencial exclusiva
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-5 md:mt-8 text-[30px] sm:text-[2.25rem] md:text-[2.9rem] lg:text-[3.5rem] font-bold leading-[1.08] tracking-[-0.02em] text-foreground max-w-[22rem] sm:max-w-[40rem] md:max-w-[52rem]">
                Você entendeu o caminho. Agora vem <span className="text-primary">colocar em prática</span>.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-5 md:mt-6 max-w-2xl text-[15px] md:text-[18px] leading-relaxed text-[#cfcfcf]">
                Dois dias presenciais com <span className="font-semibold text-foreground">Thiago Cardim</span> e{" "}
                <span className="font-semibold text-foreground">Samuel Mosca</span> para transformar o conteúdo de
                Incorporação Imobiliária em um plano real de ação.
              </p>
            </Reveal>

            <Reveal delay={240} className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
              {chips.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground md:text-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-primary md:h-4 md:w-4" />
                  {label}
                </span>
              ))}
            </Reveal>

            <Reveal delay={320} className="mt-8 md:mt-10 w-full flex justify-center">
              <Button
                variant="cta-green"
                size="xl"
                onClick={openCheckout}
                className="w-full sm:w-auto rounded-full text-sm md:text-base h-12 md:h-14"
              >
                Garantir minha vaga
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Cronograma: ponte online -> presencial fundida com a agenda dos dias */}
      <section id="cronograma" className="relative scroll-mt-24 py-10 md:py-20 lg:py-28">
        <div className="relative container mx-auto px-4 md:px-6">
          <Reveal className="mx-auto mb-8 md:mb-14 max-w-3xl text-center">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-primary">
              Dois dias, um percurso
            </span>
            <h2 className="mt-3 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              O online abriu a porta. O presencial te leva <span className="text-primary">pra execução</span>.
            </h2>
            <p className="mt-4 md:mt-6 text-sm md:text-lg lg:text-xl leading-relaxed text-muted-foreground">
              No workshop você viu o mapa completo da incorporação. Aqui, numa sala com no máximo 10 pessoas, você
              caminha o percurso ao lado de quem já fez, com casos reais, dinâmica prática e uma obra pra visitar de
              perto.
            </p>
          </Reveal>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {agenda.map((dia, dayIndex) => (
              <Reveal
                key={dia.day}
                delay={dayIndex * 120}
                className="overflow-hidden rounded-xl md:rounded-2xl border-2 border-primary/40 bg-card glow-box"
              >
                <div className="bg-orange-gradient px-5 py-4 md:px-7 md:py-5">
                  <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-white/80">
                    Dia {dayIndex + 1}
                  </p>
                  <h3 className="text-lg md:text-2xl font-bold text-white">{dia.day}</h3>
                </div>
                <ul className="space-y-4 p-5 md:space-y-6 md:p-7">
                  {dia.blocks.map(({ time, label, icon: Icon }) => (
                    <li key={label} className="flex items-start gap-3 md:gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 md:h-11 md:w-11">
                        <Icon className="h-4 w-4 text-primary md:h-5 md:w-5" />
                      </span>
                      <div>
                        <p className="text-sm md:text-base font-bold text-primary">{time}</p>
                        <p className="text-sm md:text-base text-foreground">{label}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Conteúdo: O que você leva (accordion) */}
      <section id="conteudo" className="relative scroll-mt-24 py-10 md:py-20 lg:py-28">
        <div className="relative container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <Reveal className="mb-8 md:mb-12 text-center">
              <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
                O que você <span className="text-primary">leva</span>
              </h2>
            </Reveal>
            <Reveal>
              <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
                {takeaways.map((item, index) => (
                  <AccordionItem
                    key={item.title}
                    value={`item-${index}`}
                    className="overflow-hidden rounded-xl border border-border bg-card px-4 md:px-5"
                  >
                    <AccordionTrigger className="gap-3 py-4 text-left text-sm font-semibold text-foreground hover:no-underline md:text-lg">
                      <span className="flex items-center gap-3 md:gap-4">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground md:h-7 md:w-7">
                          {index + 1}
                        </span>
                        {item.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-9 text-sm leading-relaxed text-muted-foreground md:pl-11 md:text-base">
                      {item.detail}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quem conduz */}
      <section id="quem-conduz" className="relative scroll-mt-24 py-10 md:py-20 lg:py-28">
        <div className="relative container mx-auto px-4 md:px-6">
          <Reveal className="mb-6 md:mb-10 text-center">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Quem <span className="text-primary">conduz</span>
            </h2>
          </Reveal>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
            {hosts.map((host, index) => (
              <Reveal
                key={host.name}
                delay={index * 120}
                className="group rounded-xl md:rounded-2xl border border-border bg-card p-4 pt-10 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_0_35px_hsl(var(--primary)/0.28)] md:p-8 md:pt-12"
              >
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-primary/30 transition-colors duration-300 group-hover:border-primary md:mb-6 md:h-32 md:w-32">
                  {host.photo ? (
                    <img src={host.photo} alt={host.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/10">
                      <span className="text-2xl font-bold text-primary md:text-4xl">{host.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <h3 className="mb-2 text-lg font-bold text-primary md:text-2xl">{host.name}</h3>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground md:mb-5 md:text-sm">
                  {host.role}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{host.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais do presencial */}
      <section className="relative py-10 md:py-20 lg:py-28">
        <div className="relative container mx-auto px-4 md:px-6">
          <Reveal className="mx-auto mb-8 md:mb-14 max-w-3xl text-center">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
              O que só acontece <span className="text-primary">presencialmente</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-12">
            {diferenciais.map(({ icon: Icon, title, description }, index) => (
              <Reveal
                key={title}
                delay={index * 100}
                className="rounded-xl md:rounded-2xl border border-border bg-card p-5 md:p-8 text-center md:text-left"
              >
                <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 md:mx-0 md:h-14 md:w-14">
                  <Icon className="h-6 w-6 text-primary md:h-7 md:w-7" />
                </span>
                <h3 className="mb-2 text-lg md:text-xl font-bold text-foreground">{title}</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Estadia: seção de destaque laranja */}
      <section id="estadia" className="relative scroll-mt-24 py-10 md:py-20 lg:py-24">
        <div className="relative container mx-auto px-4 md:px-6">
          <Reveal className="mx-auto max-w-4xl overflow-hidden rounded-xl md:rounded-3xl bg-gradient-brand shadow-card">
            <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
              {/* Espaço para imagem de Poços de Caldas */}
              <div className="flex min-h-[200px] items-center justify-center border-b border-white/20 bg-black/10 p-6 md:min-h-full md:border-b-0 md:border-r">
                <span className="text-center text-xs font-semibold uppercase tracking-wider text-white/80">
                  [ASSET PENDENTE: foto de Poços de Caldas]
                </span>
              </div>

              <div className="p-6 md:p-10 lg:p-12">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold leading-tight text-white">
                  Vem de fora? A gente cuida da sua estadia.
                </h2>
                <p className="mt-4 text-sm md:text-lg leading-relaxed text-white/90">
                  Poços de Caldas é uma cidade turística e aconchegante da serra da Mantiqueira, com águas termais,
                  parques e boa gastronomia. Um ótimo motivo para estender o fim de semana e emendar a imersão com um
                  descanso de verdade.
                </p>
                <p className="mt-3 text-sm md:text-lg leading-relaxed text-white/90">
                  Temos uma parceria de hospedagem com valores especiais para os participantes. Vamos enviar todos os
                  detalhes por email depois da sua inscrição.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Investimento: CTA final */}
      <section id="investimento" className="relative scroll-mt-24 py-10 md:py-20 lg:py-28">
        <div className="relative container mx-auto px-4 md:px-6">
          <Reveal className="mx-auto max-w-3xl">
            <div className="rounded-xl md:rounded-3xl border-2 border-primary/40 bg-card/50 p-6 md:p-8 lg:p-12 glow-box">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
                  Uma imersão. Dez vagas.
                  <br />
                  Dois dias que mudam o seu <span className="text-primary">jogo</span>.
                </h2>

                <div className="mt-6 md:mt-8">
                  <p className="text-3xl md:text-5xl font-bold text-foreground">
                    12x de <span className="text-primary">R$ 99,70</span>
                  </p>
                  <p className="mt-1 text-sm md:text-base text-muted-foreground">ou R$ 997 à vista</p>
                </div>

                <p className="mt-5 md:mt-6 text-base md:text-lg font-semibold text-foreground">
                  18 e 19 de setembro
                </p>

                <div className="mt-3 flex items-start justify-center gap-2 text-center">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary md:h-5 md:w-5" />
                  <p className="text-sm md:text-base text-muted-foreground">
                    Escritório da SMH Patrimonial, Rua Prefeito Chagas, 305, Sala 701, Centro, Poços de Caldas, MG.
                  </p>
                </div>

                <div className="mt-8 md:mt-10 flex justify-center">
                  <Button
                    variant="cta-green"
                    size="xl"
                    onClick={openCheckout}
                    className="w-full sm:w-auto rounded-full text-sm md:text-base h-12 md:h-14"
                  >
                    Garantir minha vaga por R$ 997
                  </Button>
                </div>

                <p className="mt-4 text-xs md:text-sm text-muted-foreground">Vagas limitadas.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 md:py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-10">
            <img src={youconLogo} alt="YouCon Arquitetura e Engenharia" className="h-8 md:h-10" />
            <span className="hidden text-2xl font-light text-border md:inline">+</span>
            <span className="flex h-10 items-center rounded-md border border-dashed border-border px-4 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              [ASSET PENDENTE: logo da SMH Patrimonial]
            </span>
          </div>
          <p className="mt-6 text-center text-xs md:text-sm text-muted-foreground">
            Uma realização YouCon Arquitetura e Engenharia + SMH Patrimonial.
          </p>
          <p className="mt-1 text-center text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} YouCon Arquitetura e Engenharia. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      <CheckoutLeadDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        evento={EVENTO}
        checkoutUrl={CHECKOUT_URL}
      />
    </main>
  );
};

export default IncorporacaoPresencial;
