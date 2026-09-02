import { EventoPage } from "@/components/evento/EventoPage";
import { incorporacao } from "@/eventos/incorporacao";
import { metadataDoEvento } from "@/lib/metadata";

export const metadata = metadataDoEvento(incorporacao);

export default function Incorporacao() {
  return <EventoPage evento={incorporacao} />;
}
