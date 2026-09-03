import type { EventoConfig } from "@/eventos/tipos";
import { Icone } from "./Icone";
import { Titulo } from "./Titulo";

export function AudienceSection({ publico }: { publico: NonNullable<EventoConfig["publico"]> }) {
  return (
    <section className="relative overflow-hidden bg-orange-gradient py-10 md:py-16 lg:py-20">
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto mb-6 max-w-3xl text-center md:mb-16">
          {/* Sobre o laranja o destaque vai em branco: laranja sobre laranja não teria contraste */}
          <h2 className="mb-2.5 text-base font-bold text-primary-foreground sm:text-lg md:mb-5 md:text-2xl lg:text-[1.75rem]"><Titulo t={publico.titulo} destaqueClasse="text-white" /></h2>
          <p className="text-[13px] leading-relaxed text-primary-foreground/80 md:text-[15px] lg:text-base">{publico.subtitulo}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-6">
          {publico.itens.map((p) => (
            <div key={p.titulo} className="group rounded-xl border border-white/10 bg-card p-4 shadow-md transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-[hsl(0_0%_11%)] hover:shadow-xl hover:shadow-black/30 md:rounded-2xl md:p-5 lg:p-6">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20 md:mb-4 md:h-11 md:w-11 md:rounded-xl">
                <Icone nome={p.icone} className="h-4 w-4 text-primary md:h-5 md:w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 text-[15px] font-bold text-foreground md:mb-2.5 md:text-base">{p.titulo}</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground md:text-sm">{p.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
