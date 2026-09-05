"use client";

import { useEffect, useRef } from "react";
import type { EventoConfig } from "@/eventos/tipos";
import { Titulo } from "../Titulo";
import dados from "./dados.json";

type Props = NonNullable<EventoConfig["estrutura"]>;
type Peca = { d: string; y: number; fill?: boolean };

/** Duração total da montagem, em ms. Curta de propósito: a rolagem segue livre. */
const DURACAO = 2600;

/** Janelas (0–1 do tempo) de cada ato: se sobrepõem um pouco para não dar "pausa". */
const ATO = {
  deitar: [0.0, 0.34],
  pilares: [0.26, 0.6],
  vigas: [0.5, 0.84],
  cobertura: [0.72, 1.0],
} as const;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const suave = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const janela = (p: number, [a, b]: readonly [number, number]) => clamp01((p - a) / (b - a));

/** Cada peça recebe um atraso proporcional à sua altura na tela: o que está embaixo entra primeiro. */
function comAtraso(pecas: Peca[]) {
  const ys = pecas.map((p) => p.y);
  const min = Math.min(...ys), max = Math.max(...ys);
  return pecas.map((p) => ({ ...p, atraso: max === min ? 0 : (max - p.y) / (max - min) }));
}

const camadas = {
  blocos: comAtraso(dados.camadas.blocos),
  pilares: comAtraso(dados.camadas.pilares),
  vigas: comAtraso(dados.camadas.vigas),
  cobertura: comAtraso(dados.camadas.cobertura),
};

/**
 * Do projeto à estrutura: a locação dos pilares (vista de cima) deita em
 * perspectiva e vira a base exata da isometria do projeto estrutural; daí
 * sobem pilares, vigas e cobertura. Toca uma vez, em ~2,6 s, quando a seção
 * entra na tela; não prende a rolagem. O SVG é montado uma só vez e, a cada
 * quadro, só mudam quatro variáveis CSS e a matriz do plano.
 */
export function EstruturaSection({ titulo, subtitulo, fonte }: Props) {
  const cenaRef = useRef<HTMLDivElement>(null);
  const planoRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const cena = cenaRef.current, plano = planoRef.current;
    if (!cena || !plano) return;
    const { P0, T } = dados;
    let quadro = 0;

    const aplicar = (p: number) => {
      const d = suave(janela(p, ATO.deitar));
      const m = P0.map((v, i) => v + (T[i] - v) * d);
      plano.setAttribute("transform", `matrix(${m.map((v) => v.toFixed(4)).join(" ")})`);
      cena.style.setProperty("--deitar", d.toFixed(3));
      cena.style.setProperty("--pilares", janela(p, ATO.pilares).toFixed(3));
      cena.style.setProperty("--vigas", janela(p, ATO.vigas).toFixed(3));
      cena.style.setProperty("--cobertura", janela(p, ATO.cobertura).toFixed(3));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { aplicar(1); return; }

    const tocar = () => {
      const inicio = performance.now();
      const passo = (agora: number) => {
        const p = clamp01((agora - inicio) / DURACAO);
        aplicar(p);
        if (p < 1) quadro = window.requestAnimationFrame(passo);
      };
      quadro = window.requestAnimationFrame(passo);
    };

    aplicar(0);
    // Dispara uma vez, quando um terço da cena está visível; não repete ao voltar
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { obs.disconnect(); tocar(); } }, { threshold: 0.35 });
    obs.observe(cena);
    return () => { obs.disconnect(); window.cancelAnimationFrame(quadro); };
  }, []);

  const [vx, vy, vw, vh] = dados.viewBox;
  const grade = dados.grade;

  return (
    <section className="relative py-10 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-6 max-w-3xl text-center md:mb-10">
          <h2 className="mb-2.5 text-base font-bold text-foreground sm:text-lg md:mb-5 md:text-2xl lg:text-[1.75rem]"><Titulo t={titulo} /></h2>
          <p className="text-[13px] leading-relaxed text-muted-foreground md:text-[15px] lg:text-base">{subtitulo}</p>
        </div>

        {/* Desenho inteiro em qualquer tela, com um respiro mínimo nas laterais no celular */}
        <div ref={cenaRef} className="estrutura-cena relative mx-auto flex w-full max-w-5xl items-center justify-center px-2 sm:px-0">
          <svg viewBox={`${vx} ${vy} ${vw} ${vh}`} className="h-auto w-full" role="img" aria-label="Animação: locação dos pilares virando a estrutura metálica de uma casa">
            {/* Locação dos pilares: eixos e pilares em vista de cima; deita até a base da isometria */}
            <g ref={planoRef} transform={`matrix(${dados.P0.join(" ")})`} className="plano">
              <g stroke="hsl(0 0% 40%)" strokeWidth="0.9" strokeDasharray="6 6">
                {grade.u.map((u) => <line key={`u${u}`} x1={u} y1={grade.v[0] - 70} x2={u} y2={grade.v[grade.v.length - 1] + 70} />)}
                {grade.v.map((v) => <line key={`v${v}`} x1={grade.u[0] - 70} y1={v} x2={grade.u[grade.u.length - 1] + 70} y2={v} />)}
              </g>
              {/* Eixos nomeados como na prancha: letras num sentido, números no outro */}
              <g fill="hsl(0 0% 55%)" fontSize="11" fontFamily="ui-monospace, monospace" textAnchor="middle">
                {grade.u.map((u, i) => <text key={`lu${u}`} x={u} y={grade.v[0] - 80}>{String.fromCharCode(65 + i)}</text>)}
                {grade.v.map((v, i) => <text key={`lv${v}`} x={grade.u[0] - 82} y={v + 4}>{i + 1}</text>)}
              </g>
              <g fill="hsl(var(--primary))">
                {dados.pilares.map(([u, v], i) => <rect key={i} x={u - 7} y={v - 7} width="14" height="14" />)}
              </g>
            </g>

            <g className="camada blocos" stroke="hsl(0 0% 38%)" fill="none" strokeWidth="1">
              {camadas.blocos.map((p, i) => <path key={i} d={p.d} style={{ "--a": p.atraso } as React.CSSProperties} />)}
            </g>
            <g className="camada pilares" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="round" fill="none">
              {camadas.pilares.map((p, i) => (
                <path key={i} d={p.d} pathLength={1} fill={p.fill ? "hsl(var(--primary))" : undefined} style={{ "--a": p.atraso } as React.CSSProperties} />
              ))}
            </g>
            <g className="camada vigas" stroke="hsl(0 0% 92%)" fill="none" strokeWidth="1.1" strokeLinecap="round">
              {camadas.vigas.map((p, i) => <path key={i} d={p.d} pathLength={1} style={{ "--a": p.atraso } as React.CSSProperties} />)}
            </g>
            <g className="camada cobertura" stroke="hsl(0 0% 62%)" fill="none" strokeWidth="0.9">
              {camadas.cobertura.map((p, i) => <path key={i} d={p.d} pathLength={1} style={{ "--a": p.atraso } as React.CSSProperties} />)}
            </g>
          </svg>
        </div>

        <p className="mt-4 text-center text-[11px] text-muted-foreground/70 md:mt-6 md:text-xs">{fonte}</p>
      </div>
    </section>
  );
}
