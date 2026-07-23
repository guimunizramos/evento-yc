import { useEffect } from "react";
import {
  Building2,
  CalendarDays,
  Check,
  Clock,
  Hammer,
  Handshake,
  Hotel,
  MapPin,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AmbientGlow from "@/components/incorporacao/AmbientGlow";
import Reveal from "@/components/incorporacao-presencial/Reveal";
import youconLogo from "@/assets/youcon-logo.png";
import thiagoPhoto from "@/assets/thiago-cardim.png";
import samuelPhoto from "@/assets/samuel-mosca.jpg";

// Cole aqui o link do checkout externo depois. Todos os CTAs abrem esta URL em nova aba.
const CHECKOUT_URL = "#";

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

const chips = [
  { icon: CalendarDays, label: "18 e 19 de setembro" },
  { icon: MapPin, label: "Poços de Caldas, MG" },
  { icon: Users, label: "Apenas 10 vagas" },
];

// [PLACEHOLDER: trocar pela grade real depois]
const takeaways = [
  "Como avaliar um terreno com olhar de incorporador",
  "Estruturar um empreendimento do zero, do estudo à viabilidade",
  "Entender custos, margem e viabilidade sem achismo",
  "Estratégias de captação e venda de unidades",
  "Networking com quem já está no jogo",
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

/** CTA de checkout reutilizável, sempre em nova aba. */
const CheckoutButton = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <Button
    asChild
    variant="cta-green"
    size="xl"
    className={`w-full sm:w-auto rounded-full text-sm md:text-base h-12 md:h-14 ${className}`}
  >
    <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  </Button>
);

const scrollToCta = () => document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" });

const IncorporacaoPresencial = () => {
  usePageMeta();

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <AmbientGlow />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4">
          <img src={youconLogo} alt="YouCon Arquitetura e Engenharia" className="h-7 md:h-10" />
          <Button
            variant="cta-green"
            onClick={scrollToCta}
            className="rounded-full h-9 px-4 text-xs md:h-11 md:px-6 md:text-sm"
          >
            Garantir vaga
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-14 md:py-24 lg:py-28">
        <div className="relative container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <Reveal className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 md:px-4 md:py-2">
              <MapPin className="h-3.5 w-3.5 text-primary md:h-4 md:w-4" />
              <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-primary md:text-sm">
                Imersão presencial · Poços de Caldas · 18 e 19 de setembro
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
              <CheckoutButton>Garantir minha vaga</CheckoutButton>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ponte online -> presencial */}
      <section className="relative py-10 md:py-20 lg:py-24">
        <div className="relative container mx-auto px-4 md:px-6">
          <Reveal className="mx-auto max-w-3xl rounded-xl md:rounded-3xl border border-border bg-card/50 p-6 md:p-10 lg:p-12 text-center">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight text-foreground">
              O online abriu a porta. O presencial te leva <span className="text-primary">pra dentro</span>.
            </h2>
            <p className="mt-4 md:mt-6 text-sm md:text-lg lg:text-xl leading-relaxed text-muted-foreground">
              No workshop você viu o mapa completo da incorporação. Aqui, numa sala com no máximo 10 pessoas, você
              caminha o percurso ao lado de quem já fez, com casos reais, dinâmica prática e uma obra pra visitar de
              perto.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Agenda dos 2 dias (seção principal) */}
      <section className="relative py-10 md:py-20 lg:py-28">
        <div className="relative container mx-auto px-4 md:px-6">
          <Reveal className="mx-auto mb-8 md:mb-14 max-w-3xl text-center">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-primary">
              Dois dias, um percurso
            </span>
            <h2 className="mt-3 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
              A agenda da <span className="text-primary">imersão</span>
            </h2>
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

      {/* O que você leva */}
      <section className="relative py-10 md:py-20 lg:py-28">
        <div className="relative container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <Reveal className="mb-8 md:mb-12 text-center">
              <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
                O que você <span className="text-primary">leva</span>
              </h2>
            </Reveal>
            <ul className="space-y-3 md:space-y-4">
              {takeaways.map((item, index) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={index * 70}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 md:gap-4 md:p-5"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground md:h-7 md:w-7">
                    <Check className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </span>
                  <span className="text-sm md:text-lg leading-relaxed text-foreground">{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quem conduz */}
      <section className="relative py-10 md:py-20 lg:py-28">
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
                className="rounded-xl md:rounded-2xl border border-border bg-card p-4 pt-10 text-center md:p-8 md:pt-12"
              >
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-primary/30 md:mb-6 md:h-32 md:w-32">
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

      {/* Poços de Caldas + hotel parceiro */}
      <section className="relative py-10 md:py-20 lg:py-24">
        <div className="relative container mx-auto px-4 md:px-6">
          <Reveal className="mx-auto max-w-3xl rounded-xl md:rounded-3xl border border-border bg-card/50 p-6 md:p-10 lg:p-12">
            <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-start md:gap-6 md:text-left">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 md:h-14 md:w-14">
                <Hotel className="h-6 w-6 text-primary md:h-7 md:w-7" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground">
                  Vem de fora? A gente cuida da sua <span className="text-primary">estadia</span>.
                </h2>
                <p className="mt-4 text-sm md:text-lg leading-relaxed text-muted-foreground">
                  Poços de Caldas é uma cidade turística e aconchegante da serra da Mantiqueira, com águas termais,
                  parques e boa gastronomia. Um ótimo motivo para estender o fim de semana e emendar a imersão com um
                  descanso de verdade.
                </p>
                <p className="mt-3 text-sm md:text-lg leading-relaxed text-muted-foreground">
                  Temos um hotel parceiro com valores especiais de hospedagem para os participantes.{" "}
                  <span className="text-foreground">
                    [PLACEHOLDER: nome do hotel, valores e como acionar a condição especial]
                  </span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA final */}
      <section id="cta-final" className="relative scroll-mt-24 py-10 md:py-20 lg:py-28">
        <div className="relative container mx-auto px-4 md:px-6">
          <Reveal className="mx-auto max-w-3xl">
            <div className="rounded-xl md:rounded-3xl border-2 border-primary/40 bg-card/50 p-6 md:p-8 lg:p-12 glow-box">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  10 vagas. Uma sala. Dois dias que <span className="text-primary">mudam seu jogo</span>.
                </h2>

                <div className="mt-6 md:mt-8 inline-flex flex-col items-center rounded-2xl border border-primary/30 bg-primary/5 px-6 py-4 md:px-10 md:py-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Investimento
                  </span>
                  <span className="text-3xl md:text-5xl font-bold text-foreground">R$ 997</span>
                </div>

                <div className="mt-6 md:mt-8 flex items-start justify-center gap-2 text-left">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary md:h-5 md:w-5" />
                  <p className="text-sm md:text-base text-muted-foreground">
                    <span className="font-semibold text-foreground">Local:</span> Escritório da SMH Patrimonial, Rua
                    Prefeito Chagas, 305, Sala 701, Centro, Poços de Caldas, MG.
                  </p>
                </div>

                <div className="mt-8 md:mt-10 flex justify-center">
                  <CheckoutButton>Garantir minha vaga por R$ 997</CheckoutButton>
                </div>

                <p className="mt-4 text-xs md:text-sm text-muted-foreground">
                  Vagas limitadas pelo tamanho da sala. São só 10.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-xs md:text-sm text-muted-foreground">
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
