import { redirect } from "next/navigation";
import { EventoPage } from "@/components/evento/EventoPage";
import { consultoria } from "@/eventos/consultoria";
import { metadataDoEvento } from "@/lib/metadata";
import { proximoEventoAberto } from "@/lib/proximo-evento";

export const metadata = metadataDoEvento(consultoria);

// A decisão depende da hora da visita, então a raiz é resolvida a cada pedido
export const dynamic = "force-dynamic";

/** A raiz leva ao próximo evento aberto. Sem nenhum no calendário, mostra a consultoria genérica. */
export default function Home() {
  const proximo = proximoEventoAberto();
  if (proximo) redirect(`/${proximo.slug}`);
  return <EventoPage evento={consultoria} />;
}
