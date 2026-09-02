import Image from "next/image";
import type { EventoConfig } from "@/eventos/tipos";
import { Titulo } from "./Titulo";

export function HostsSection({ hosts }: { hosts: EventoConfig["hosts"] }) {
  const um = hosts.itens.length === 1;
  return (
    <section className="relative py-10 md:py-20 lg:py-28">
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mb-4 text-center md:mb-8">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl md:text-4xl lg:text-5xl"><Titulo t={hosts.titulo} /></h2>
          {hosts.subtitulo && <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:mt-6 md:text-lg">{hosts.subtitulo}</p>}
        </div>
        <div className={`mx-auto grid grid-cols-1 gap-6 md:gap-8 lg:gap-12 ${um ? "max-w-xl" : "max-w-4xl md:grid-cols-2"}`}>
          {hosts.itens.map((h) => (
            <div key={h.nome} className="rounded-xl border border-border bg-card p-4 pt-10 text-center md:rounded-2xl md:p-8 md:pt-12">
              <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-primary/30 md:mb-6 md:h-32 md:w-32">
                <Image src={h.foto} alt={h.nome} fill sizes="128px" className="object-cover" />
              </div>
              <h3 className="mb-2 text-lg font-bold uppercase text-primary md:text-2xl">{h.nome}</h3>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-foreground md:text-sm">{h.cargo}</p>
              {h.titulo && <p className="mb-3 text-sm font-semibold text-muted-foreground md:mb-5 md:text-base">{h.titulo}</p>}
              <p className={`text-sm leading-relaxed text-muted-foreground md:text-base ${h.titulo ? "" : "mt-3 md:mt-5"}`}>{h.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
