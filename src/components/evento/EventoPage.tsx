import type { EventoConfig } from "@/eventos/tipos";
import { AmbientGlow } from "./AmbientGlow";
import { CountdownBanner } from "./CountdownBanner";
import { HeroSection } from "./HeroSection";
import { BenefitsSection } from "./BenefitsSection";
import { AudienceSection } from "./AudienceSection";
import { AgendaSection } from "./AgendaSection";
import { HostsSection } from "./HostsSection";
import { CTASection } from "./CTASection";
import { Footer } from "./Footer";

/**
 * A página de evento: mesma sequência de seções para todos, alimentada por um
 * arquivo de dados em src/eventos. Criar um evento novo é escrever o arquivo.
 */
export function EventoPage({ evento }: { evento: EventoConfig }) {
  return (
    <main className="relative min-h-screen bg-background pt-16 md:pt-14">
      <AmbientGlow />
      <CountdownBanner {...evento.banner} />
      <HeroSection hero={evento.hero} tema={evento.tema} />
      <BenefitsSection beneficios={evento.beneficios} video={evento.video} grafico={evento.grafico} />
      {evento.publico && <AudienceSection publico={evento.publico} />}
      <AgendaSection agenda={evento.agenda} tema={evento.tema} />
      <HostsSection hosts={evento.hosts} />
      <CTASection cta={evento.cta} formulario={evento.formulario} webhookEvento={evento.webhookEvento} tema={evento.tema} />
      <Footer />
    </main>
  );
}
