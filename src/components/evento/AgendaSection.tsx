"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EventoConfig } from "@/eventos/tipos";
import { Titulo } from "./Titulo";

const irAoFormulario = () => document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" });

type Props = { agenda: EventoConfig["agenda"]; tema: EventoConfig["tema"] };

/** Timeline que acende conforme o scroll passa por cada marco (estilo "timeline") ou lista com check (estilo "lista"). */
export function AgendaSection({ agenda, tema }: Props) {
  const refs = useRef<Array<HTMLLIElement | null>>([]);
  const [alcancado, setAlcancado] = useState(-1);
  const timeline = agenda.estilo === "timeline";

  useEffect(() => {
    if (!timeline) return;
    const els = refs.current.filter((el): el is HTMLLIElement => el !== null);
    if (!els.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setAlcancado(agenda.itens.length - 1); return; }

    // A timeline inteira cabe num viewport normal: observar interseção acenderia
    // tudo de uma vez. O progresso segue uma linha de referência na tela.
    let agendado = false;
    const medir = () => {
      agendado = false;
      const linha = window.innerHeight * 0.65;
      let ultimo = -1;
      els.forEach((el, i) => { if (el.getBoundingClientRect().top <= linha) ultimo = i; });
      setAlcancado(ultimo);
    };
    const onScroll = () => { if (agendado) return; agendado = true; window.requestAnimationFrame(medir); };
    medir();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [timeline, agenda.itens.length]);

  return (
    <section className={`relative py-10 md:py-16 lg:py-20 ${timeline ? "" : "bg-section-alt"}`}>
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center md:mb-14">
            <h2 className="mb-3 text-lg font-bold text-foreground sm:text-xl md:mb-6 md:text-3xl lg:text-[2.25rem]"><Titulo t={agenda.titulo} /></h2>
            <p className="text-sm text-muted-foreground md:text-base lg:text-[17px]">{agenda.subtitulo}</p>
          </div>

          {timeline ? (
            <ol className="mb-8 space-y-6 md:mb-12 md:space-y-8">
              {agenda.itens.map((item, i) => {
                const ok = i <= alcancado;
                const ultimo = i === agenda.itens.length - 1;
                return (
                  <li key={item.titulo} ref={(el) => { refs.current[i] = el; }} className="relative pl-10 md:pl-14">
                    {!ultimo && (
                      <span className="absolute bottom-[-30px] left-[11px] top-[30px] w-0.5 bg-border md:bottom-[-38px] md:left-[15px] md:top-[38px]" aria-hidden="true">
                        <span className="block w-full bg-primary transition-[height] duration-700 ease-out" style={{ height: i < alcancado ? "100%" : "0%" }} />
                      </span>
                    )}
                    <span className={`absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-all duration-500 md:h-8 md:w-8 md:text-xs ${ok ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`} aria-hidden="true">{i + 1}</span>
                    <div className={`transition-all duration-500 ${ok ? "translate-y-0 opacity-100" : "translate-y-1 opacity-80"}`}>
                      <h3 className="mb-1 text-base font-semibold text-foreground md:mb-2 md:text-lg">{item.titulo}</h3>
                      {item.descricao && <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{item.descricao}</p>}
                    </div>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="mb-8 space-y-4 md:mb-12 md:space-y-5">
              {agenda.itens.map((item) => (
                <div key={item.titulo} className="flex items-start gap-4 rounded-lg border border-border bg-card/50 p-4 transition-all duration-300 hover:border-primary/30 md:rounded-xl md:p-5">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 md:h-8 md:w-8"><Check className="h-3 w-3 text-primary md:h-5 md:w-5" /></div>
                  <p className="text-sm leading-relaxed text-foreground md:text-base">{item.titulo}</p>
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Button variant={tema === "verde" ? "cta-green" : "hero-outline"} size="xl" onClick={irAoFormulario} className="h-11 w-full rounded-full text-sm sm:w-auto md:h-12 md:text-[15px]">
              {agenda.cta.toUpperCase()}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
