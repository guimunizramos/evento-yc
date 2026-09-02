import { Calendar, Clock, MapPin } from "lucide-react";
import type { EventoConfig } from "@/eventos/tipos";
import { Titulo } from "./Titulo";
import { RegistrationForm } from "./RegistrationForm";

type Props = Pick<EventoConfig, "cta" | "formulario" | "webhookEvento" | "tema">;

export function CTASection({ cta, formulario, webhookEvento, tema }: Props) {
  const dados = [
    [Calendar, "DATA:", cta.data],
    [Clock, "HORÁRIO:", cta.horario],
    [MapPin, "", cta.local],
  ] as const;
  return (
    <section id="cta-section" className="relative py-10 md:py-20 lg:py-28">
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="glow-box rounded-xl border-2 border-primary/40 bg-card/50 p-6 md:rounded-3xl md:p-8 lg:p-12">
            <div className="text-center">
              <h2 className="mb-3 text-xl font-bold text-foreground sm:text-2xl md:mb-6 md:text-4xl lg:text-5xl"><Titulo t={cta.titulo} /></h2>
              <p className="mb-8 text-base leading-relaxed text-muted-foreground md:mb-10 md:text-lg lg:text-xl">{cta.descricao}</p>
              <div className="flex flex-col gap-4 md:flex-row md:justify-center md:gap-6">
                {dados.map(([I, rotulo, valor]) => (
                  <div key={valor} className="flex items-center justify-center gap-2 text-foreground">
                    <I className="h-4 w-4 text-primary md:h-6 md:w-6" />
                    <span className="text-base font-medium md:text-lg">{rotulo && <b>{rotulo} </b>}{valor}</span>
                  </div>
                ))}
              </div>
            </div>
            <div id="inscricao-form" className="mt-8 scroll-mt-24 border-t border-border pt-8 md:mt-10 md:pt-10">
              <RegistrationForm evento={webhookEvento} formulario={formulario} tema={tema} />
              <p className="mt-4 text-center text-xs text-muted-foreground md:mt-6">Link enviado após o cadastro</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
