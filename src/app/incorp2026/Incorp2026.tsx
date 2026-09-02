"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Building2, CalendarDays, Check, Clock, Coffee, Flag, MapPin, Star, UtensilsCrossed, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AmbientGlow } from "@/components/evento/AmbientGlow";
import { Reveal } from "@/components/evento/Reveal";
import { LOGO_YOUCON, midia } from "@/lib/midia";

/**
 * Incorp Experience 2026: imersão presencial paga, 18 e 19/09 em Poços de
 * Caldas. Não segue o template dos eventos online porque vende ingresso
 * (Sympla) em vez de captar inscrição. Copy portada da versão em Vite.
 */

const CHECKOUT_URL = "https://www.sympla.com.br/evento/incorp-experience-2026/3514481";
const CHECKOUT_URL_BLACK = `${CHECKOUT_URL}?token=f6de96c61ea5a7e2df93a5aee00b4c16`;

export const EVENTO_NOME = "Incorp Experience 2026";
const EVENTO_DATAS = "18 e 19 de setembro";
const PARCELAMENTO = "em até 12x";
const TAXA_NOTA = "+ taxa";
const INCLUI_PADRAO = ["Acesso aos dois dias completos de imersão", "Coffee break e networking"];

const INGRESSOS = [
  { nome: "Condição Exclusiva", valor: "R$ 997", tag: "1º lote · vendas até 26/07", inclui: INCLUI_PADRAO, destaque: false, selo: null, checkout: CHECKOUT_URL },
  { nome: "Incorp Experience Pass", valor: "R$ 1.597", tag: "2º lote · vendas até 17/09", inclui: INCLUI_PADRAO, destaque: false, selo: null, checkout: CHECKOUT_URL },
  {
    nome: "Incorp Experience Black Pass",
    valor: "R$ 2.497",
    tag: null,
    inclui: ["Tudo do ingresso padrão", "Almoço exclusivo com Samuel Mosca e Thiago Cardim nos dois dias do evento", "Networking exclusivo", "Mentoria individual de 1 hora após o evento (online)"],
    destaque: true,
    selo: "Experiência completa",
    checkout: CHECKOUT_URL_BLACK,
  },
] as const;

const LINHA_CONFIANCA = "Parcele em até 12x · Pagamento 100% seguro via Sympla";
const LOCAL_NOME = "Centro Empresarial Manhattan";
const LOCAL_CIDADE = "Poços de Caldas, MG";

const navLinks = [
  { label: "Cronograma", target: "cronograma" },
  { label: "Conteúdo", target: "conteudo" },
  { label: "Quem conduz", target: "quem-conduz" },
  { label: "Estadia", target: "estadia" },
];

const chips = [
  { icon: CalendarDays, label: "18 e 19 de setembro" },
  { icon: MapPin, label: "Poços de Caldas, MG" },
  { icon: Users, label: "Vagas limitadas" },
];

const takeaways = [
  { title: "Prospecção e análise de terrenos", detail: "Como identificar, prospectar e avaliar terrenos com potencial real de incorporação." },
  { title: "Estudos de viabilidade", detail: "Como validar se o empreendimento fecha a conta antes de colocar dinheiro." },
  { title: "Produto imobiliário, projetos e aprovações", detail: "Da concepção do produto imobiliário ao desenvolvimento de projetos e às aprovações." },
  { title: "Planejamento e execução da obra", detail: "Métodos construtivos, planejamento executivo e gestão de prazos até a entrega." },
  { title: "Estruturação jurídica, societária e financeira", detail: "Contratos, sociedade, tributação, modelagem financeira e captação de capital." },
];

const hosts = [
  { name: "THIAGO CARDIM", role: "Arquiteto e CEO da YouCon Arquitetura e Engenharia", photo: midia("img/thiago-cardim.png"), description: "Traz a visão técnica da incorporação: concepção do produto imobiliário, viabilidade, projetos, aprovações, engenharia, planejamento executivo e gestão da execução da obra." },
  { name: "SAMUEL MOSCA", role: "Cofundador da SMH Patrimonial", photo: midia("img/samuel-mosca.jpg"), description: "Traz a experiência na estruturação de negócios imobiliários: estratégia, contratos, sociedade, tributação, modelagem financeira e captação de recursos." },
];

const diferenciais = [
  { icon: Users, title: "Sala fechada", description: "Turma exclusiva, para você perguntar o que precisa e ser ouvido de verdade nos dois dias." },
  { icon: Building2, title: "Dois dias completos", description: "Das 09h às 18h, o percurso inteiro da incorporação: terreno, viabilidade, projeto, obra e estruturação." },
  { icon: Coffee, title: "Coffee break e networking", description: "Das 18h às 19h30, nos dois dias, para trocar com quem já está no jogo sem crachá e sem discurso pronto." },
];

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

const irPara = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export function Incorp2026() {
  const [rolou, setRolou] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);

  // Header ganha o vidro fosco só depois que a pessoa rola
  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)");
    const parallax = () => {
      if (!bgRef.current || reduz.matches) return;
      bgRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.3}px, 0)`;
    };
    parallax();
    window.addEventListener("scroll", parallax, { passive: true });
    return () => window.removeEventListener("scroll", parallax);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <AmbientGlow />

      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${rolou ? "border-b border-border/40 bg-background/70 backdrop-blur-md" : "border-b border-transparent bg-transparent"}`}>
        <div className="container mx-auto flex items-center gap-4 px-4 py-3 md:px-6 md:py-4">
          <button type="button" onClick={() => irPara("hero")} className="mx-auto rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:mx-0" aria-label="Voltar ao topo">
            <span className="text-gradient whitespace-nowrap text-base font-bold tracking-tight md:text-xl">{EVENTO_NOME}</span>
          </button>
          <nav className="hidden flex-1 items-center justify-center gap-8 md:flex" aria-label="Navegação principal">
            {navLinks.map((l) => (
              <button key={l.target} type="button" onClick={() => irPara(l.target)} className="rounded text-sm font-bold text-foreground/90 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">{l.label}</button>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button variant="cta-green" onClick={() => irPara("investimento")} className="h-10 rounded-full px-5 text-sm">Garantir vaga</Button>
          </div>
        </div>
      </header>

      <section id="hero" className="relative flex min-h-[88vh] items-center overflow-hidden py-14 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div ref={bgRef} className="absolute inset-0 scale-110 will-change-transform">
            <Image src={midia("img/inc-hero-desktop.jpg")} alt="" fill priority sizes="100vw" className="hidden object-cover md:block" />
            <Image src={midia("img/inc-hero-mobile.jpg")} alt="" fill priority sizes="100vw" className="block object-cover md:hidden" />
          </div>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <Reveal className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 md:px-4 md:py-2">
              <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-primary md:text-sm">Imersão presencial exclusiva</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 max-w-[22rem] text-[30px] font-bold leading-[1.08] tracking-[-0.02em] text-foreground sm:max-w-[40rem] sm:text-[2.25rem] md:mt-8 md:max-w-[52rem] md:text-[2.9rem] lg:text-[3.5rem]">
                Você entendeu o caminho. Agora vem <span className="text-primary">colocar em prática</span>.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#cfcfcf] md:mt-6 md:text-[18px]">
                Dois dias presenciais com <span className="font-semibold text-foreground">Thiago Cardim</span> e <span className="font-semibold text-foreground">Samuel Mosca</span> para transformar o conteúdo de Incorporação Imobiliária em um plano real de ação.
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-6 flex flex-wrap items-center justify-center gap-2.5 md:mt-8 md:gap-3">
              {chips.map(({ icon: I, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground md:text-sm"><I className="h-3.5 w-3.5 text-primary md:h-4 md:w-4" />{label}</span>
              ))}
            </Reveal>
            <Reveal delay={320} className="mt-8 flex w-full justify-center md:mt-10">
              <Button variant="cta-green" size="xl" onClick={() => irPara("investimento")} className="h-12 w-full rounded-full text-sm sm:w-auto md:h-14 md:text-base">Garantir minha vaga</Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="cronograma" className="relative scroll-mt-24 py-10 md:py-20 lg:py-28">
        <div className="container relative mx-auto px-4 md:px-6">
          <Reveal className="mx-auto mb-8 max-w-3xl text-center md:mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary md:text-sm">Dois dias, um percurso</span>
            <h2 className="mt-3 text-xl font-bold leading-tight text-foreground sm:text-2xl md:text-4xl lg:text-5xl">O online abriu a porta. O presencial te leva <span className="text-primary">pra execução</span>.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:mt-6 md:text-lg lg:text-xl">No workshop você viu o mapa completo da incorporação. Aqui, numa sala fechada e com turma exclusiva, você caminha o percurso ao lado de quem já fez, com casos reais e dois dias inteiros de conteúdo.</p>
            <p className="mt-4 text-sm font-semibold text-foreground md:text-base">Feito para arquitetos, engenheiros, construtores, investidores e profissionais do mercado imobiliário.</p>
          </Reveal>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {agenda.map((dia, i) => (
              <Reveal key={dia.day} delay={i * 120} className="glow-box overflow-hidden rounded-xl border-2 border-primary/40 bg-card md:rounded-2xl">
                <div className="bg-orange-gradient px-5 py-4 md:px-7 md:py-5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/80 md:text-xs">Dia {i + 1}</p>
                  <h3 className="text-lg font-bold text-white md:text-2xl">{dia.day}</h3>
                </div>
                <ul className="space-y-4 p-5 md:space-y-6 md:p-7">
                  {dia.blocks.map(({ time, label, icon: I }) => (
                    <li key={label} className="flex items-start gap-3 md:gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 md:h-11 md:w-11"><I className="h-4 w-4 text-primary md:h-5 md:w-5" /></span>
                      <div><p className="text-sm font-bold text-primary md:text-base">{time}</p><p className="text-sm text-foreground md:text-base">{label}</p></div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="conteudo" className="relative scroll-mt-24 py-10 md:py-20 lg:py-28">
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <Reveal className="mb-8 text-center md:mb-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary md:text-sm">Do terreno à entrega</span>
              <h2 className="mt-3 text-xl font-bold text-foreground sm:text-2xl md:text-4xl lg:text-5xl">O que você vai <span className="text-primary">dominar</span> em dois dias</h2>
            </Reveal>
            <Reveal>
              <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
                {takeaways.map((t, i) => (
                  <AccordionItem key={t.title} value={`item-${i}`} className="overflow-hidden rounded-xl border border-border bg-card px-4 md:px-5">
                    <AccordionTrigger className="gap-3 py-4 text-left text-sm font-semibold text-foreground hover:no-underline md:text-lg">
                      <span className="flex items-center gap-3 md:gap-4">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground md:h-7 md:w-7">{i + 1}</span>
                        {t.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-9 text-sm leading-relaxed text-muted-foreground md:pl-11 md:text-base">{t.detail}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="quem-conduz" className="relative scroll-mt-24 py-10 md:py-20 lg:py-28">
        <div className="container relative mx-auto px-4 md:px-6">
          <Reveal className="mx-auto mb-6 max-w-3xl text-center md:mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary md:text-sm">Quem conduz</span>
            <h2 className="mt-3 text-xl font-bold text-foreground sm:text-2xl md:text-4xl lg:text-5xl">Duas visões que se <span className="text-primary">completam</span></h2>
            <p className="mt-3 text-sm text-muted-foreground md:mt-4 md:text-lg">A engenharia da obra e a estratégia do negócio, no mesmo lugar.</p>
          </Reveal>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
            {hosts.map((h, i) => (
              <Reveal key={h.name} delay={i * 120} className="group rounded-xl border border-border bg-card p-4 pt-10 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_0_35px_hsl(var(--primary)/0.28)] md:rounded-2xl md:p-8 md:pt-12">
                <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-primary/30 transition-colors duration-300 group-hover:border-primary md:mb-6 md:h-32 md:w-32">
                  <Image src={h.photo} alt={h.name} fill sizes="128px" className="object-cover" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-primary md:text-2xl">{h.name}</h3>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground md:mb-5 md:text-sm">{h.role}</p>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{h.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-10 md:py-20 lg:py-28">
        <div className="container relative mx-auto px-4 md:px-6">
          <Reveal className="mx-auto mb-8 max-w-3xl text-center md:mb-14">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl md:text-4xl lg:text-5xl">O que só acontece <span className="text-primary">presencialmente</span></h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-12">
            {diferenciais.map(({ icon: I, title, description }, i) => (
              <Reveal key={title} delay={i * 100} className="rounded-xl border border-border bg-card p-5 text-center md:rounded-2xl md:p-8 md:text-left">
                <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 md:mx-0 md:h-14 md:w-14"><I className="h-6 w-6 text-primary md:h-7 md:w-7" /></span>
                <h3 className="mb-2 text-lg font-bold text-foreground md:text-xl">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="estadia" className="relative scroll-mt-24 py-10 md:py-20 lg:py-24">
        <div className="container relative mx-auto px-4 md:px-6">
          <Reveal className="shadow-card overflow-hidden rounded-xl bg-gradient-brand md:rounded-3xl">
            <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
              <div className="relative min-h-[240px] border-b border-white/20 md:min-h-[420px] md:border-b-0 md:border-r">
                <Image src={midia("img/pocos-evento.webp")} alt="Vista aérea de Poços de Caldas, com o Palace Hotel e a serra da Mantiqueira ao fundo" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-12 lg:p-16">
                <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl md:text-4xl">Vem de fora? A gente cuida da sua estadia.</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/90 md:text-lg">Poços de Caldas é uma cidade turística e aconchegante da serra da Mantiqueira, com águas termais, parques e boa gastronomia. Um ótimo motivo para estender o fim de semana e emendar a imersão com um descanso de verdade.</p>
                <p className="mt-3 text-sm leading-relaxed text-white/90 md:text-lg">Temos uma parceria de hospedagem com valores especiais para os participantes. Vamos enviar todos os detalhes por email depois da sua inscrição.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="investimento" className="relative scroll-mt-24 py-10 md:py-20 lg:py-28">
        <div className="container relative mx-auto px-4 md:px-6">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-xl font-bold leading-tight text-foreground sm:text-2xl md:text-4xl lg:text-5xl">Uma imersão. Vagas limitadas.<br />Dois dias que mudam o seu <span className="text-primary">jogo</span>.</h2>
            <div className="mt-5 flex flex-col items-center gap-2 md:mt-6 md:gap-2.5">
              <p className="flex items-center gap-2 text-base font-semibold text-foreground md:text-lg"><CalendarDays className="h-4 w-4 shrink-0 text-primary md:h-5 md:w-5" />{EVENTO_DATAS}</p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground md:text-base"><Building2 className="h-4 w-4 shrink-0 text-primary md:h-5 md:w-5" />{LOCAL_NOME}</p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground md:text-base"><MapPin className="h-4 w-4 shrink-0 text-primary md:h-5 md:w-5" />{LOCAL_CIDADE}</p>
            </div>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 items-stretch gap-6 md:mt-16 md:grid-cols-3 md:gap-6 lg:gap-8">
            {INGRESSOS.map((ing, i) => (
              <Reveal key={ing.nome} delay={i * 110} className={`relative flex flex-col rounded-xl p-6 md:rounded-2xl md:p-7 ${ing.destaque ? "glow-box border-2 border-primary bg-card md:-translate-y-4" : "border border-border bg-card"}`}>
                {ing.selo && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-orange-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white md:text-xs"><Star className="h-3 w-3 fill-current" />{ing.selo}</span>
                )}
                <h3 className={`mt-2 text-lg font-bold md:text-xl ${ing.destaque ? "text-primary" : "text-foreground"}`}>{ing.nome}</h3>
                {ing.tag && <span className="mt-3 inline-flex w-fit items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary md:text-xs">{ing.tag}</span>}
                <div className="mt-5">
                  <p className="text-3xl font-bold text-foreground md:text-4xl">{ing.valor}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{PARCELAMENTO}</p>
                  <p className="text-xs text-muted-foreground/70">{TAXA_NOTA}</p>
                </div>
                <ul className="mt-5 flex-1 space-y-2.5 border-t border-border pt-5">
                  {ing.inclui.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-left"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span className="text-sm leading-relaxed text-muted-foreground">{item}</span></li>
                  ))}
                </ul>
                <Button asChild variant={ing.destaque ? "cta-green" : "cta-green-soft"} className="mt-6 h-12 w-full rounded-full text-sm md:text-base">
                  <a href={ing.checkout} target="_blank" rel="noopener noreferrer">Garantir minha vaga</a>
                </Button>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-muted-foreground md:mt-10 md:text-sm">{LINHA_CONFIANCA}</p>
          <p className="mt-2 text-center text-xs text-muted-foreground md:text-sm">Vagas limitadas.</p>
        </div>
      </section>

      <footer className="border-t border-border bg-card py-8 md:py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-10">
            <Image src={LOGO_YOUCON} alt="YouCon Arquitetura e Engenharia" width={160} height={40} className="h-8 w-auto md:h-10" />
            <span className="hidden text-2xl font-light text-border md:inline">+</span>
            <Image src={midia("img/logo-smh.webp")} alt="SMH Patrimonial" width={120} height={24} className="h-5 w-auto md:h-6" />
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground md:text-sm">Uma realização YouCon Arquitetura e Engenharia + SMH Patrimonial.</p>
          <p className="mt-1 text-center text-xs text-muted-foreground/70">© {new Date().getFullYear()} YouCon Arquitetura e Engenharia. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
