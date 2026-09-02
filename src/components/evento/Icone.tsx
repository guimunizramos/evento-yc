import {
  Building2, CircleDollarSign, ClipboardCheck, FileSearch, HardHat, Landmark, LayoutGrid,
  Layers, Maximize, Rocket, Scale, Thermometer, Timer, TrendingUp, Wallet, type LucideProps,
} from "lucide-react";
import type { Icone as IconeNome } from "@/eventos/tipos";

const MAPA = {
  Building2, CircleDollarSign, ClipboardCheck, FileSearch, HardHat, Landmark, LayoutGrid,
  Layers, Maximize, Rocket, Scale, Thermometer, Timer, TrendingUp, Wallet,
};

/** Os dados do evento guardam só o nome do ícone, para ficarem serializáveis. */
export function Icone({ nome, ...props }: { nome: IconeNome } & LucideProps) {
  const C = MAPA[nome];
  return <C {...props} />;
}
