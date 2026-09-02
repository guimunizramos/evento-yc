"use client";

import { useEffect, useState } from "react";

type Props = { antes: string; depois: string; dataIso: string; rotuloData: string };

const dois = (n: number) => String(n).padStart(2, "0");

/**
 * Contagem regressiva fixa no topo. Começa nula e só calcula depois de
 * montar: no servidor não há "agora" confiável, e um valor diferente no
 * cliente daria erro de hidratação.
 */
export function CountdownBanner({ antes, depois, dataIso, rotuloData }: Props) {
  const alvo = new Date(dataIso).getTime();
  const [restante, setRestante] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRestante(Math.max(alvo - Date.now(), 0));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [alvo]);

  const s = Math.floor((restante ?? 0) / 1000);
  const partes = [
    [Math.floor(s / 86400), "Dias"],
    [Math.floor((s % 86400) / 3600), "Horas"],
    [Math.floor((s % 3600) / 60), "Min"],
    [s % 60, "Seg"],
  ] as const;
  const comecou = restante !== null && restante <= 0;

  return (
    <div className="fixed left-0 right-0 top-0 z-50 bg-orange-gradient text-white shadow-md backdrop-blur-sm">
      <div className="container mx-auto flex min-h-[64px] flex-row flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-3 py-2 text-center md:min-h-[56px] md:flex-nowrap md:gap-4">
        <p className="text-[10px] font-semibold uppercase tracking-wide sm:text-xs md:text-sm">
          {comecou ? depois : antes}
        </p>
        {!comecou && (
          <div className="grid grid-cols-4 gap-1 sm:gap-1.5" aria-label={`Contagem regressiva para ${rotuloData}`}>
            {partes.map(([v, rotulo]) => (
              <div key={rotulo} className="min-w-[42px] rounded bg-black/15 px-1.5 py-1 leading-none md:min-w-[52px] md:px-2">
                <span className="block text-sm font-extrabold sm:text-base md:text-xl">{restante === null ? "--" : dois(v)}</span>
                <span className="block text-[8px] font-semibold uppercase md:text-[10px]">{rotulo}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
