import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const agendaItems = [
  { title: "Leitura do terreno", description: "Como topografia, orientação solar, vizinhança e dimensões definem o que é possível construir." },
  { title: "Estudos de caso reais", description: "Projetos desenvolvidos pela YouCon abertos por dentro: o terreno que chegou e a casa que saiu." },
  { title: "Soluções de implantação", description: "Como posicionar a casa para aproveitar melhor a área externa, a luz e a privacidade." },
  { title: "Plantas bem resolvidas", description: "Integração, circulação e setorização: as decisões que fazem a casa funcionar no dia a dia." },
  { title: "Terrenos difíceis", description: "Declive, formato irregular, testada estreita: soluções aplicadas a casos complexos." },
  { title: "Arquitetura e interiores integrados", description: "Por que projetar os dois juntos gera uma casa melhor e uma obra mais previsível." },
  { title: "Suas dúvidas ao vivo", description: "Espaço aberto para perguntas de quem já tem terreno e está planejando construir." },
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

    // A timeline inteira cabe em um viewport de altura normal, então observar a
    // interseção de cada item acenderia os sete de uma vez. O progresso é medido
    // pela posição de cada marco em relação a uma linha de referência na tela.
    let ticking = false;

    const update = () => {
      ticking = false;
      const referenceLine = window.innerHeight * 0.65;
      let last = -1;
      elements.forEach((el, index) => {
        if (el.getBoundingClientRect().top <= referenceLine) last = index;
      });
      setReachedIndex(last);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="relative py-10 md:py-20 lg:py-28">
        <div className="relative container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-6">
              O que vamos abordar <span className="text-primary">nesta consultoria</span>:
            </h2>
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground">
              Um encontro direto e prático, com projetos reais abertos por dentro e as decisões que fizeram cada um funcionar.
            </p>
          </div>

          <ol className="mb-8 md:mb-12 space-y-6 md:space-y-8">
            {agendaItems.map((item, index) => {
              const isReached = index <= reachedIndex;
              const isLast = index === agendaItems.length - 1;
              return (
                <li
                  key={item.title}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  data-index={index}
                  className="relative pl-10 md:pl-14"
                >
                  {/* Conector até o próximo marco. O último item não tem linha, então a
                      timeline termina exatamente no sétimo ponto. */}
                  {!isLast && (
                    <span
                      className="absolute left-[11px] md:left-[15px] top-[30px] bottom-[-30px] md:top-[38px] md:bottom-[-38px] w-0.5 bg-border"
                      aria-hidden="true"
                    >
                      <span
                        className="block w-full bg-primary transition-[height] duration-700 ease-out"
                        style={{ height: index < reachedIndex ? "100%" : "0%" }}
                      />
                    </span>
                  )}
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

          <div className="text-center">
            <Button variant="cta-green" size="xl" onClick={scrollToForm} className="w-full sm:w-auto rounded-full text-sm md:text-base h-12 md:h-14">
              QUERO PARTICIPAR DESSA CONSULTORIA
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
