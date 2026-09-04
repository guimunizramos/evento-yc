import { eventos, type EventoConfig } from "@/eventos";

/** Janela em que um evento ainda conta como "aberto" depois de começar: a live dura umas horas. */
const TOLERANCIA_MS = 3 * 60 * 60 * 1000;

/**
 * O próximo evento com página própria que ainda não aconteceu (ou está
 * acontecendo agora). A raiz do domínio manda para ele; sem candidato,
 * devolve null e a raiz mostra a página genérica.
 */
export function proximoEventoAberto(agora = Date.now()): EventoConfig | null {
  return (
    Object.values(eventos)
      .filter((e) => e.slug !== "" && new Date(e.banner.dataIso).getTime() + TOLERANCIA_MS > agora)
      .sort((a, b) => new Date(a.banner.dataIso).getTime() - new Date(b.banner.dataIso).getTime())[0] ?? null
  );
}
