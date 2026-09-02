import { EventoPage } from "@/components/evento/EventoPage";
import { consultoria } from "@/eventos/consultoria";
import { metadataDoEvento } from "@/lib/metadata";

export const metadata = metadataDoEvento(consultoria);

export default function Home() {
  return <EventoPage evento={consultoria} />;
}
