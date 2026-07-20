import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const agendaItems = [
  { title: "O que é incorporação imobiliária", description: "Entenda, de forma simples, como um terreno pode dar origem a um empreendimento imobiliário." },
  { title: "Potencial construtivo do terreno", description: "Conheça os principais fatores que determinam o que pode ser construído e desenvolvido em uma área." },
  { title: "Estudo de viabilidade", description: "Entenda como arquitetura, legislação, custos, produto imobiliário e mercado são analisados antes de uma decisão." },
  { title: "Estruturação do empreendimento", description: "Veja como as diferentes etapas e profissionais precisam estar conectados para transformar o potencial do terreno em um projeto estruturado." },
  { title: "Modelos de parceria", description: "Conheça possibilidades de participação entre proprietários de terrenos, investidores, incorporadores e parceiros estratégicos." },
  { title: "Estratégia patrimonial", description: "Entenda como decisões imobiliárias bem estruturadas podem contribuir para a construção, consolidação e continuidade do patrimônio." },
  { title: "Arquitetura de Capital e Segurança", description: "Veja como a forma de estruturar um empreendimento pode influenciar a proteção patrimonial e a segurança jurídica de cada etapa do projeto." },
];

const AgendaSection = () => {
  const scrollToForm = () => document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" });

  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [reachedIndex, setReachedIndex] = useState(-1);

  useEffect(() => {
    const elements = itemRefs.current.filter((el): el is HTMLLIElement => el !== null);
    if (elements.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReachedIndex(agendaItems.length - 1);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index);
          // A linha só avança: uma vez aceso, o marco permanece aceso.
          setReachedIndex((current) => (index > current ? index : current));
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px -15% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const progress = reachedIndex < 0 ? 0 : ((reachedIndex + 1) / agendaItems.length) * 100;

  return (
    <section className="py-10 md:py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-6">
              O que vamos abordar neste Workshop:
            </h2>
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground">
              Um encontro direto e prático para quem possui um terreno, avalia oportunidades imobiliárias ou deseja entender os caminhos para desenvolver um empreendimento.
            </p>
          </div>

          <div className="relative mb-8 md:mb-12">
            {/* Trilho da timeline + progresso que acompanha o scroll */}
            <div
              className="absolute left-[11px] md:left-[15px] top-3 bottom-3 w-0.5 bg-border"
              aria-hidden="true"
            >
              <div
                className="w-full bg-primary transition-[height] duration-700 ease-out"
                style={{ height: `${progress}%` }}
              />
            </div>

            <ol className="space-y-6 md:space-y-8">
              {agendaItems.map((item, index) => {
                const isReached = index <= reachedIndex;
                return (
                  <li
                    key={item.title}
                    ref={(el) => { itemRefs.current[index] = el; }}
                    data-index={index}
                    className="relative pl-10 md:pl-14"
                  >
                    <span
                      className={`absolute left-0 top-1.5 flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full border-2 text-[10px] md:text-xs font-bold transition-all duration-500 ${
                        isReached
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-muted-foreground"
                      }`}
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <div
                      className={`transition-all duration-500 ${
                        isReached ? "opacity-100 translate-y-0" : "opacity-80 translate-y-1"
                      }`}
                    >
                      <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="text-center">
            <Button variant="hero-outline" size="xl" onClick={scrollToForm} className="w-full sm:w-auto text-sm md:text-base h-12 md:h-14">
              QUERO PARTICIPAR DESSA AULA
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
