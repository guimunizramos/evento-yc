"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOGO_YOUCON } from "@/lib/midia";
import type { EventoConfig } from "@/eventos/tipos";
import { Titulo } from "./Titulo";

const irAoFormulario = () => document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" });

export function HeroSection({ hero, tema }: { hero: EventoConfig["hero"]; tema: EventoConfig["tema"] }) {
  const bgRef = useRef<HTMLDivElement>(null);

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
    <section className="relative flex min-h-screen flex-col overflow-hidden py-8 md:py-[95px]">
      <header className="relative z-20 py-3 md:py-6">
        <div className="container mx-auto flex items-center justify-center px-4 md:px-6">
          <Image src={LOGO_YOUCON} alt="YouCon Arquitetura" width={192} height={48} priority className="h-7 w-auto md:h-10" />
        </div>
      </header>

      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 scale-110 will-change-transform">
          <Image src={hero.imagemDesktop} alt="" fill priority sizes="100vw" className="hidden object-cover md:block" />
          <Image src={hero.imagemMobile} alt="" fill priority sizes="100vw" className="block object-cover md:hidden" />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      <div className="container relative z-10 mx-auto flex flex-1 items-start justify-center px-6 pt-[60px] md:items-center md:px-6 md:pt-0">
        <div className="flex max-w-4xl flex-col items-center justify-center text-center">
          <div className="-mt-1.5 mb-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2 py-1 md:mt-0 md:mb-8 md:px-4 md:py-2">
            <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-primary md:text-sm">{hero.tag}</span>
          </div>

          <h1 className="mb-4 max-w-[20rem] text-[24px] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:max-w-[36rem] sm:text-[1.7rem] md:mb-6 md:max-w-[44rem] md:text-[2rem] lg:max-w-[52rem] lg:text-[2.25rem] xl:max-w-[58rem] xl:text-[2.45rem]">
            <Titulo t={hero.titulo} />
          </h1>

          <p className="mb-8 max-w-xl text-[13px] leading-relaxed text-[#cfcfcf] md:mb-9 md:text-[15px]">
            {hero.subtitulo.map((p, i) => (
              <span key={i} className={p.forte ? "font-semibold text-foreground" : p.destaque ? "font-semibold text-primary" : undefined}>
                {p.texto}
              </span>
            ))}
          </p>

          <Button
            variant={tema === "verde" ? "cta-green" : "hero"}
            size="xl"
            onClick={irAoFormulario}
            className="h-10 w-full rounded-full text-[13px] sm:w-auto md:h-11 md:text-sm"
          >
            {hero.cta.toUpperCase()}
          </Button>

          <div className="mt-3 flex flex-col items-center gap-1.5 md:mt-4 md:flex-row md:gap-3">
            {hero.provaSocial && (
              <>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary md:text-sm">
                  <Users className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  {hero.provaSocial}
                </span>
                <span className="hidden text-muted-foreground md:inline">|</span>
              </>
            )}
            <p className="text-xs text-muted-foreground md:text-sm">{hero.rodape}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
