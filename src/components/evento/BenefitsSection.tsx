import type { EventoConfig } from "@/eventos/tipos";
import { Icone } from "./Icone";
import { Titulo } from "./Titulo";
import { VideoPlayer } from "./VideoPlayer";
import { ComparisonChart } from "./ComparisonChart";

type Props = { beneficios: EventoConfig["beneficios"]; video?: EventoConfig["video"]; grafico?: boolean };

export function BenefitsSection({ beneficios, video, grafico }: Props) {
  return (
    <section className="relative py-10 md:py-16 lg:py-20">
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto mb-6 max-w-3xl text-center md:mb-16">
          <h2 className="mb-3 text-lg font-bold text-foreground sm:text-xl md:mb-6 md:text-3xl lg:text-[2.25rem]"><Titulo t={beneficios.titulo} /></h2>
          {beneficios.subtitulo && <p className="text-sm leading-relaxed text-muted-foreground md:text-base lg:text-[17px]">{beneficios.subtitulo}</p>}
        </div>

        {video && (
          <div className={`mb-10 md:mb-16 ${grafico ? "grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start lg:gap-8" : ""}`}>
            <VideoPlayer {...video} />
            {grafico && <ComparisonChart />}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-12">
          {beneficios.itens.map((b) => (
            <div key={b.titulo} className="group rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:border-primary/50 md:rounded-2xl md:p-8">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20 md:mb-6 md:h-16 md:w-16 md:rounded-xl">
                <Icone nome={b.icone} className="h-5 w-5 text-primary md:h-8 md:w-8" strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 text-base font-bold text-foreground md:mb-3 md:text-lg">{b.titulo}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{b.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
