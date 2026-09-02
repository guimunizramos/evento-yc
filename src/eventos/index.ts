import { consultoria } from "./consultoria";
import { incorporacao } from "./incorporacao";
import { metalica } from "./metalica";

export const eventos = { consultoria, incorporacao, metalica } as const;
export type { EventoConfig } from "./tipos";
