import { EventoPage } from "@/components/evento/EventoPage";
import { metalica } from "@/eventos/metalica";
import { metadataDoEvento } from "@/lib/metadata";

export const metadata = metadataDoEvento(metalica);

export default function Metalica() {
  return <EventoPage evento={metalica} />;
}
