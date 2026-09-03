import Image from "next/image";
import type { EventoConfig } from "@/eventos/tipos";
import { Titulo } from "./Titulo";

export function HostsSection({ hosts }: { hosts: EventoConfig["hosts"] }) {
  const um = hosts.itens.length === 1;
  return (
    <section className="relative py-10 md:py-16 lg:py-20">
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mb-4 text-center md:mb-8">
          <h2 className="text-base font-bold text-foreground sm:text-lg md:text-2xl lg:text-[1.75rem]"><Titulo t={hosts.titulo} /></h2>
          {hosts.subtitulo && <p className="mx-auto mt-3 max-w-2xl text-[13px] text-muted-foreground md:mt-5 md:text-[15px]">{hosts.subtitulo}</p>}
        </div>
        <div className={`mx-auto grid grid-cols-1 gap-5 md:gap-6 lg:gap-8 ${um ? "max-w-xl" : "max-w-4xl md:grid-cols-2"}`}>
          {hosts.itens.map((h) => (
            <div key={h.nome} className="rounded-xl border border-border bg-card p-4 pt-8 text-center md:rounded-2xl md:p-6 md:pt-10">
              <div className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-primary/30 md:mb-5 md:h-24 md:w-24">
                <Image src={h.foto} alt={h.nome} fill sizes="96px" className="object-cover" />
              </div>
              <h3 className="mb-2 text-[15px] font-bold uppercase text-primary md:text-base">{h.nome}</h3>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-foreground md:text-xs">{h.cargo}</p>
              {h.titulo && <p className="mb-3 text-[13px] font-semibold text-muted-foreground md:mb-4 md:text-sm">{h.titulo}</p>}
              <p className={`text-[13px] leading-relaxed text-muted-foreground md:text-sm ${h.titulo ? "" : "mt-3 md:mt-5"}`}>{h.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
