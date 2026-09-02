import type { EventoConfig } from "@/eventos/tipos";
import { Icone } from "./Icone";
import { Titulo } from "./Titulo";

export function AudienceSection({ publico }: { publico: NonNullable<EventoConfig["publico"]> }) {
  return (
    <section className="relative overflow-hidden bg-orange-gradient py-10 md:py-16 lg:py-20">
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto mb-6 max-w-3xl text-center md:mb-16">
          {/* Sobre o laranja o destaque vai em branco: laranja sobre laranja não teria contraste */}
          <h2 className="mb-3 text-lg font-bold text-primary-foreground sm:text-xl md:mb-6 md:text-3xl lg:text-[2.25rem]"><Titulo t={publico.titulo} destaqueClasse="text-white" /></h2>
          <p className="text-sm leading-relaxed text-primary-foreground/80 md:text-base lg:text-[17px]">{publico.subtitulo}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {publico.itens.map((p) => (
            <div key={p.titulo} className="group rounded-xl border border-white/10 bg-card p-5 shadow-md transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-[hsl(0_0%_11%)] hover:shadow-xl hover:shadow-black/30 md:rounded-2xl md:p-6 lg:p-8">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20 md:mb-5 md:h-12 md:w-12 md:rounded-xl">
                <Icone nome={p.icone} className="h-5 w-5 text-primary md:h-7 md:w-7" strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 text-base font-bold text-foreground md:mb-3 md:text-lg">{p.titulo}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{p.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
