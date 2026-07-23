import { useEffect, useRef, useState } from "react";
import {
  Building2,
  CalendarDays,
  Check,
  Clock,
  Coffee,
  Flag,
  MapPin,
  Star,
  UtensilsCrossed,
  Users,
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
import youconLogo from "@/assets/youcon-logo.png";
import thiagoPhoto from "@/assets/thiago-cardim.png";
import samuelPhoto from "@/assets/samuel-mosca.jpg";
import heroImage from "@/assets/inc-hero-desktop.jpg";
import heroImageMobile from "@/assets/inc-hero-mobile.jpg";
import smhLogo from "@/assets/logo-smh.webp";
import pocosFoto from "@/assets/pocos-evento.webp";

// Link do checkout externo. O modal de conversão redireciona para esta URL após capturar o lead.
const CHECKOUT_URL = "https://www.sympla.com.br/evento/incorp-experience-2026/3514481";

const EVENTO_NOME = "Incorp Experience 2026";
const EVENTO_DATAS = "18 e 19 de setembro";

// Ingressos. Edite nomes, valores, datas e benefícios aqui.
const PARCELAMENTO = "em até 12x";
const TAXA_NOTA = "+ taxa";
const INCLUI_PADRAO = ["Acesso aos dois dias completos de imersão", "Coffee break e networking"];

const INGRESSOS = [
  {
    nome: "Condição Exclusiva",
    valor: "R$ 997",
    tag: "1º lote · vendas até 26/07",
    inclui: INCLUI_PADRAO,
    destaque: false,
    selo: null as string | null,
  },
  {
    nome: "Incorp Experience Pass",
    valor: "R$ 1.597",
    tag: "2º lote · vendas até 17/09",
    inclui: INCLUI_PADRAO,
    destaque: false,
    selo: null as string | null,
  },
  {
    nome: "Incorp Experience Black Pass",
    valor: "R$ 2.497",
    tag: "vendas até 26/07",
    inclui: [
      "Tudo do ingresso padrão",
      "Almoço exclusivo com Samuel Mosca e Thiago Cardim nos dois dias do evento",
      "Networking exclusivo",
      "Mentoria individual de 1 hora após o evento (online)",
    ],
    destaque: true,
    selo: "Experiência completa" as string | null,
  },
];

const LINHA_CONFIANCA = "Parcele em até 12x · Pagamento 100% seguro via Sympla";

// Local do evento (endereço completo fica para depois).
const LOCAL_NOME = "Centro Empresarial Manhattan";
const LOCAL_CIDADE = "Poços de Caldas, MG";

// Espelham as meta tags estáticas de incorp2026.html, que é o que os crawlers de
// prévia leem. Mantenha os dois lados iguais ao editar.
const PAGE_TITLE = "Incorp Experience 2026 | Imersão presencial de Incorporação Imobiliária";
const PAGE_DESCRIPTION =
  "Dois dias sobre todas as etapas da incorporação, do terreno à entrega, com Thiago Cardim e Samuel Mosca. 18 e 19 de setembro, em Poços de Caldas. Vagas limitadas.";
const OG_IMAGE = "https://evento.youconprojetos.com.br/open-graph-presencial.jpg";

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

const takeaways = [
  {
    title: "Prospecção e análise de terrenos",
    detail: "Como identificar, prospectar e avaliar terrenos com potencial real de incorporação.",
  },
  {
    title: "Estudos de viabilidade",
    detail: "Como validar se o empreendimento fecha a conta antes de colocar dinheiro.",
  },
  {
    title: "Produto imobiliário, projetos e aprovações",
    detail: "Da concepção do produto imobiliário ao desenvolvimento de projetos e às aprovações.",
  },
  {
    title: "Planejamento e execução da obra",
    detail: "Métodos construtivos, planejamento executivo e gestão de prazos até a entrega.",
  },
  {
    title: "Estruturação jurídica, societária e financeira",
    detail: "Contratos, sociedade, tributação, modelagem financeira e captação de capital.",
  },
];

const hosts = [
  {
    name: "THIAGO CARDIM",
    role: "Arquiteto e CEO da YouCon Arquitetura e Engenharia",
    photo: thiagoPhoto as string | null,
    description:
      "Traz a visão técnica da incorporação: concepção do produto imobiliário, viabilidade, projetos, aprovações, engenharia, planejamento executivo e gestão da execução da obra.",
  },
  {
    name: "SAMUEL MOSCA",
    role: "Cofundador da SMH Patrimonial",
    photo: samuelPhoto as string | null,
    description:
      "Traz a experiência na estruturação de negócios imobiliários: estratégia, contratos, sociedade, tributação, modelagem financeira e captação de recursos.",
  },
];

const diferenciais = [
  {
    icon: Users,
    title: "Sala fechada",
    description: "No máximo 10 pessoas na sala, para você perguntar o que precisa e ser ouvido de verdade nos dois dias.",
  },
  {
    icon: Building2,
    title: "Dois dias completos",
    description: "Das 09h às 18h, o percurso inteiro da incorporação: terreno, viabilidade, projeto, obra e estruturação.",
  },
  {
    icon: Coffee,
    title: "Coffee break e networking",
    description: "Das 18h às 19h30, nos dois dias, para trocar com quem já está no jogo sem crachá e sem discurso pronto.",
  },
];

// Os dois dias seguem a mesma estrutura de horários.
const CRONOGRAMA_DIA = [
  { time: "09h00", label: "Início das atividades", icon: Clock },
  { time: "12h00", label: "Intervalo para almoço", icon: UtensilsCrossed },
  { time: "14h00", label: "Retorno das atividades", icon: Clock },
  { time: "18h00", label: "Encerramento do conteúdo", icon: Flag },
  { time: "18h às 19h30", label: "Coffee break e networking", icon: Coffee },
];

const agenda = [
  { day: "Sexta, 18 de setembro", blocks: CRONOGRAMA_DIA },
  { day: "Sábado, 19 de setembro", blocks: CRONOGRAMA_DIA },
];

const IncorporacaoPresencial = () => {
  usePageMeta();

  const [scrolled, setScrolled] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);

  // Header ganha o vidro fosco (blur + escurecido) só depois que a pessoa rola.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const handleNav = (target: string) => scrollToId(target);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <AmbientGlow />

      {/* Header fixo: transparente no topo, vidro fosco ao rolar */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-border/40 bg-background/70 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center gap-4 px-4 py-3 md:px-6 md:py-4">
          {/* No mobile o cabeçalho fica só com o nome do evento, centralizado. */}
          <button
            type="button"
            onClick={() => handleNav("hero")}
            className="mx-auto rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:mx-0"
            aria-label="Voltar ao topo"
          >
            <span className="text-gradient whitespace-nowrap text-base font-bold tracking-tight md:text-xl">
              {EVENTO_NOME}
            </span>
          </button>

          {/* Navegação desktop, em negrito e centralizada */}
          <nav className="hidden flex-1 items-center justify-center gap-8 md:flex" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <button
                key={link.target}
                type="button"
                onClick={() => handleNav(link.target)}
                className="rounded text-sm font-bold text-foreground/90 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA desktop à direita */}
          <div className="hidden md:block">
            <Button
              variant="cta-green"
              onClick={() => handleNav("investimento")}
              className="rounded-full h-10 px-5 text-sm"
            >
              Garantir vaga
            </Button>
          </div>

        </div>
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
                asChild
                variant="cta-green"
                size="xl"
                className="w-full sm:w-auto rounded-full text-sm md:text-base h-12 md:h-14"
              >
                <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                  Garantir minha vaga
                </a>
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
              caminha o percurso ao lado de quem já fez, com casos reais e dois dias inteiros de conteúdo.
            </p>
            <p className="mt-4 text-sm md:text-base font-semibold text-foreground">
              Feito para arquitetos, engenheiros, construtores, investidores e profissionais do mercado imobiliário.
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
              <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-primary">
                Do terreno à entrega
              </span>
              <h2 className="mt-3 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
                O que você vai <span className="text-primary">dominar</span> em dois dias
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
          <Reveal className="mx-auto mb-6 md:mb-10 max-w-3xl text-center">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-primary">
              Quem conduz
            </span>
            <h2 className="mt-3 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Duas visões que se <span className="text-primary">completam</span>
            </h2>
            <p className="mt-3 md:mt-4 text-sm md:text-lg text-muted-foreground">
              A engenharia da obra e a estratégia do negócio, no mesmo lugar.
            </p>
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
          <Reveal className="overflow-hidden rounded-xl md:rounded-3xl bg-gradient-brand shadow-card">
            <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
              {/* Foto de Poços de Caldas. O slot muda de proporção conforme a tela,
                  então a imagem é quadrada e entra com object-cover. */}
              <div className="relative min-h-[240px] border-b border-white/20 md:min-h-[420px] md:border-b-0 md:border-r">
                <img
                  src={pocosFoto}
                  alt="Vista aérea de Poços de Caldas, com o Palace Hotel e a serra da Mantiqueira ao fundo"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col justify-center p-6 md:p-12 lg:p-16">
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
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              Uma imersão. Dez vagas.
              <br />
              Dois dias que mudam o seu <span className="text-primary">jogo</span>.
            </h2>

            <div className="mt-5 md:mt-6 flex flex-col items-center gap-2 md:gap-2.5">
              <p className="flex items-center gap-2 text-base md:text-lg font-semibold text-foreground">
                <CalendarDays className="h-4 w-4 shrink-0 text-primary md:h-5 md:w-5" />
                {EVENTO_DATAS}
              </p>
              <p className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <Building2 className="h-4 w-4 shrink-0 text-primary md:h-5 md:w-5" />
                {LOCAL_NOME}
              </p>
              <p className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-primary md:h-5 md:w-5" />
                {LOCAL_CIDADE}
              </p>
            </div>
          </Reveal>

          {/* Três opções de ingresso. O Black Pass é o box em destaque. */}
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 items-stretch gap-6 md:mt-16 md:grid-cols-3 md:gap-6 lg:gap-8">
            {INGRESSOS.map((ingresso, index) => (
              <Reveal
                key={ingresso.nome}
                delay={index * 110}
                className={`relative flex flex-col rounded-xl md:rounded-2xl p-6 md:p-7 ${
                  ingresso.destaque
                    ? "border-2 border-primary bg-card glow-box md:-translate-y-4"
                    : "border border-border bg-card"
                }`}
              >
                {ingresso.selo && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-orange-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white md:text-xs">
                    <Star className="h-3 w-3 fill-current" />
                    {ingresso.selo}
                  </span>
                )}

                <h3
                  className={`mt-2 text-lg md:text-xl font-bold ${
                    ingresso.destaque ? "text-primary" : "text-foreground"
                  }`}
                >
                  {ingresso.nome}
                </h3>

                <span className="mt-3 inline-flex w-fit items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary md:text-xs">
                  {ingresso.tag}
                </span>

                <div className="mt-5">
                  <p className="text-3xl md:text-4xl font-bold text-foreground">{ingresso.valor}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{PARCELAMENTO}</p>
                  <p className="text-xs text-muted-foreground/70">{TAXA_NOTA}</p>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5 border-t border-border pt-5">
                  {ingresso.inclui.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-left">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={ingresso.destaque ? "cta-green" : "cta-green-soft"}
                  className="mt-6 w-full rounded-full h-12 text-sm md:text-base"
                >
                  <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                    Garantir minha vaga
                  </a>
                </Button>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 md:mt-10 text-center text-xs md:text-sm text-muted-foreground">{LINHA_CONFIANCA}</p>
          <p className="mt-2 text-center text-xs md:text-sm text-muted-foreground">Vagas limitadas.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 md:py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-10">
            <img src={youconLogo} alt="YouCon Arquitetura e Engenharia" className="h-8 md:h-10" />
            <span className="hidden text-2xl font-light text-border md:inline">+</span>
            <img src={smhLogo} alt="SMH Patrimonial" className="h-5 md:h-6" />
          </div>
          <p className="mt-6 text-center text-xs md:text-sm text-muted-foreground">
            Uma realização YouCon Arquitetura e Engenharia + SMH Patrimonial.
          </p>
          <p className="mt-1 text-center text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} YouCon Arquitetura e Engenharia. Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </main>
  );
};

export default IncorporacaoPresencial;
