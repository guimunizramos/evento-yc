"use client";

import { useEffect, useRef, useState } from "react";

const etapas = ["Concepção", "Viabilidade", "Projeto", "Desenvolvimento"];
const sem = [32, 37, 41, 45];
const com = [32, 54, 90, 130];
const W = 400, BASE = 150, X0 = 22, X1 = 378;

const pontos = (v: number[]) => v.map((y, i) => ({ x: X0 + (i * (X1 - X0)) / (v.length - 1), y: BASE - y }));

/** Catmull-Rom em Bézier cúbica: curva suave, sem quinas. */
const suave = (p: { x: number; y: number }[]) => {
  let d = `M ${p[0].x} ${p[0].y}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] ?? p2;
    d += ` C ${(p1.x + (p2.x - p0.x) / 6).toFixed(2)} ${(p1.y + (p2.y - p0.y) / 6).toFixed(2)}, ${(p2.x - (p3.x - p1.x) / 6).toFixed(2)} ${(p2.y - (p3.y - p1.y) / 6).toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
};

const pSem = pontos(sem), pCom = pontos(com);
const dSem = suave(pSem), dCom = suave(pCom);
const dArea = `${dCom} L ${X1} ${BASE} L ${X0} ${BASE} Z`;

/** Gráfico ilustrativo "decisões isoladas x empreendimento bem estruturado". */
export function ComparisonChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
      setVisivel(true);
      return;
    }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisivel(true); obs.disconnect(); } }, { threshold: 0.35 });
    obs.observe(el);
    // Rede de segurança: observer que não dispara deixaria as linhas invisíveis
    const t = window.setTimeout(() => setVisivel(true), 2500);
    return () => { obs.disconnect(); window.clearTimeout(t); };
  }, []);

  const traco = (delay = "0ms") => ({ strokeDashoffset: visivel ? 0 : 1, transition: `stroke-dashoffset 1400ms ease-in-out ${delay}` });
  const fade = (ms: number) => ({ opacity: visivel ? 1 : 0, transition: `opacity 400ms ease-out ${ms}ms` });

  return (
    <div ref={ref} className="flex flex-col rounded-xl border border-border bg-card/50 p-4 md:rounded-2xl md:p-6 lg:h-[500px]">
      <h3 className="text-center text-[15px] font-bold text-foreground md:text-left md:text-lg">
        <span className="block md:inline">Decisões isoladas</span> <span className="block md:inline">x</span>{" "}
        <span className="block text-primary md:inline">empreendimento bem estruturado</span>
      </h3>
      <p className="mt-2 text-center text-[13px] leading-relaxed text-muted-foreground md:text-left md:text-sm">
        Quando projeto, viabilidade e incorporação são desenvolvidos em conjunto, as decisões se tornam mais precisas e o empreendimento ganha mais potencial de resultado.
      </p>
      <div className="mt-5 flex flex-1 flex-col justify-center md:mt-7">
        <svg viewBox={`0 0 ${W} 190`} className="w-full" role="img" aria-label="Gráfico ilustrativo comparando a evolução de um empreendimento sem e com estruturação integrada">
          <defs>
            <linearGradient id="inc-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 40, 80, 120].map((o) => (
            <line key={o} x1={X0 - 20} x2={X1 + 8} y1={BASE - o} y2={BASE - o} className="stroke-border" strokeWidth="1" strokeDasharray="3 5" />
          ))}
          <line x1={X0 - 20} x2={X1 + 8} y1={BASE} y2={BASE} className="stroke-border" strokeWidth="1.5" />
          <text x={X0 - 20} y={BASE - 130} className="fill-muted-foreground text-[8px]">valor</text>
          <path d={dArea} fill="url(#inc-area)" style={{ opacity: visivel ? 1 : 0, transition: "opacity 900ms ease-out 600ms" }} />
          <path d={dSem} fill="none" className="stroke-muted-foreground/60" strokeWidth="2.5" strokeLinecap="round" pathLength={1} strokeDasharray={1} style={traco()} />
          <path d={dCom} fill="none" className="stroke-primary" strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray={1} style={traco("200ms")} />
          {pSem.map((p, i) => <circle key={`s${i}`} cx={p.x} cy={p.y} r="3" className="fill-background stroke-muted-foreground/60" strokeWidth="2" style={fade(600 + i * 160)} />)}
          {pCom.map((p, i) => <circle key={`c${i}`} cx={p.x} cy={p.y} r="3.5" className="fill-background stroke-primary" strokeWidth="2.5" style={fade(800 + i * 160)} />)}
          {pCom.map((p, i) => (
            <text key={`l${i}`} x={p.x} y={BASE + 18} textAnchor={i === 0 ? "start" : i === pCom.length - 1 ? "end" : "middle"} className="fill-muted-foreground text-[8px]">{etapas[i]}</text>
          ))}
        </svg>
        <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:gap-6">
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground md:text-sm"><span className="h-0.5 w-4 rounded-full bg-muted-foreground/60" />Sem estruturação integrada</span>
          <span className="inline-flex items-center gap-2 text-xs text-foreground md:text-sm"><span className="h-0.5 w-4 rounded-full bg-primary" />Com estruturação integrada</span>
        </div>
        <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground md:text-left md:text-xs">Gráfico ilustrativo sobre a evolução de um empreendimento ao longo de sua estruturação.</p>
      </div>
    </div>
  );
}
