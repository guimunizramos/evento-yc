import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

/**
 * Vídeo vertical 9:16 hospedado no Vercel Blob. Enquanto for null,
 * renderiza o placeholder.
 */
const VIDEO_SRC: string | null =
  "https://527cfmgcrs4j7fu9.public.blob.vercel-storage.com/incorporacao/workshop-incorporacao.mp4";
const VIDEO_POSTER: string | null =
  "https://527cfmgcrs4j7fu9.public.blob.vercel-storage.com/incorporacao/workshop-incorporacao-poster.jpg";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // O atributo autoPlay já basta na maioria dos casos; este play() extra cobre
    // navegadores que ignoram autoplay até o elemento ter sido montado. Muted
    // garante que a política de autoplay permita, sem gesto do usuário.
    video.play().catch(() => {
      /* autoplay bloqueado: o poster aparece e os controles seguem disponíveis */
    });
  }, []);

  return (
    <div className="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:w-[315px] lg:max-w-none">
      {/* No desktop a altura é fixa (BOX_H) e a largura sai dela, mantendo o 9:16
          exato — assim o frame e o card do gráfico ficam do mesmo tamanho. */}
      <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border-2 border-primary/30 bg-card shadow-lg lg:aspect-auto lg:h-[560px]">
        {VIDEO_SRC ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            poster={VIDEO_POSTER ?? undefined}
            className="h-full w-full object-cover"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
            Seu navegador não suporta a reprodução de vídeo.
          </video>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-card to-background px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 md:h-16 md:w-16">
              <Play className="ml-0.5 h-6 w-6 text-primary md:h-7 md:w-7" fill="currentColor" />
            </div>
            <p className="text-sm font-semibold text-foreground">Vídeo em breve</p>
          </div>
        )}
      </div>
      <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground md:text-base">
        Assista ao vídeo e entenda o que você vai aprender neste Workshop.
      </p>
    </div>
  );
};

const stages = ["Concepção", "Viabilidade", "Projeto", "Desenvolvimento"];
const semEstruturacao = [32, 37, 41, 45];
const comEstruturacao = [32, 54, 90, 130];

// A área plotada preenche quase toda a largura do viewBox — margens grandes aqui
// virariam vazio proporcionalmente grande no desktop (o SVG escala com a largura).
// O respiro dos rótulos das pontas vem da fonte pequena, não de margens largas.
const CHART_W = 400;
const BASELINE = 150;
const X_START = 34;
const X_END = 362;

const pointsFor = (values: number[]) =>
  values.map((value, index) => ({
    x: X_START + (index * (X_END - X_START)) / (values.length - 1),
    y: BASELINE - value,
  }));

/** Catmull-Rom convertido em cúbicas de Bézier, para uma curva suave sem quinas. */
const smoothPath = (pts: Array<{ x: number; y: number }>) => {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
};

const semPoints = pointsFor(semEstruturacao);
const comPoints = pointsFor(comEstruturacao);
const semPath = smoothPath(semPoints);
const comPath = smoothPath(comPoints);
const comAreaPath = `${comPath} L ${X_END} ${BASELINE} L ${X_START} ${BASELINE} Z`;

const ComparisonChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = chartRef.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    // Rede de segurança: sem isso, um observer que não dispara deixaria as linhas
    // permanentemente invisíveis (dashoffset travado em 1).
    const fallback = window.setTimeout(() => setIsVisible(true), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={chartRef} className="flex flex-col rounded-xl border border-border bg-card/50 p-5 md:rounded-2xl md:p-8 lg:h-[560px]">
      {/* No mobile o título quebra em três linhas centralizadas; no desktop volta a uma linha à esquerda. */}
      <h3 className="text-center text-base font-bold text-foreground md:text-left md:text-xl">
        <span className="block md:inline">Decisões isoladas</span>{" "}
        <span className="block md:inline">x</span>{" "}
        <span className="block text-primary md:inline">empreendimento bem estruturado</span>
      </h3>
      <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground md:text-left md:text-base">
        Quando projeto, viabilidade e incorporação são desenvolvidos em conjunto, as decisões se
        tornam mais precisas e o empreendimento ganha mais potencial de resultado.
      </p>

      <div className="mt-5 flex flex-1 flex-col justify-center md:mt-7">
        <svg
          viewBox={`0 0 ${CHART_W} 190`}
          className="w-full"
          role="img"
          aria-label="Gráfico ilustrativo comparando a evolução de um empreendimento sem estruturação integrada e com estruturação integrada ao longo das etapas de concepção, viabilidade, projeto e desenvolvimento"
        >
          <defs>
            <linearGradient id="inc-area-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 40, 80, 120].map((offset) => (
            <line
              key={offset}
              x1={X_START - 20}
              x2={X_END + 8}
              y1={BASELINE - offset}
              y2={BASELINE - offset}
              className="stroke-border"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
          ))}

          <line
            x1={X_START - 20}
            x2={X_END + 8}
            y1={BASELINE}
            y2={BASELINE}
            className="stroke-border"
            strokeWidth="1.5"
          />

          {/* "valor" acima do gráfico (não à esquerda) para não exigir margem lateral */}
          <text x={X_START - 20} y={BASELINE - 130} textAnchor="start" className="fill-muted-foreground text-[8px]">
            valor
          </text>

          {/* Área sob a linha laranja, revelada junto com o traçado */}
          <path
            d={comAreaPath}
            fill="url(#inc-area-gradient)"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 900ms ease-out 600ms",
            }}
          />

          {/* Linhas: pathLength=1 normaliza o traçado, então o dashoffset vai de 1 a 0 */}
          <path
            d={semPath}
            fill="none"
            className="stroke-muted-foreground/60"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            style={{
              strokeDashoffset: isVisible ? 0 : 1,
              transition: "stroke-dashoffset 1400ms ease-in-out",
            }}
          />
          <path
            d={comPath}
            fill="none"
            className="stroke-primary"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            style={{
              strokeDashoffset: isVisible ? 0 : 1,
              transition: "stroke-dashoffset 1400ms ease-in-out 200ms",
            }}
          />

          {semPoints.map((point, index) => (
            <circle
              key={`sem-${stages[index]}`}
              cx={point.x}
              cy={point.y}
              r="3"
              className="fill-background stroke-muted-foreground/60"
              strokeWidth="2"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: `opacity 400ms ease-out ${600 + index * 160}ms`,
              }}
            />
          ))}
          {comPoints.map((point, index) => (
            <circle
              key={`com-${stages[index]}`}
              cx={point.x}
              cy={point.y}
              r="3.5"
              className="fill-background stroke-primary"
              strokeWidth="2.5"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: `opacity 400ms ease-out ${800 + index * 160}ms`,
              }}
            />
          ))}

          {comPoints.map((point, index) => (
            <text
              key={`label-${stages[index]}`}
              x={point.x}
              y={BASELINE + 18}
              textAnchor="middle"
              className="fill-muted-foreground text-[8px]"
            >
              {stages[index]}
            </text>
          ))}
        </svg>

        <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:gap-6">
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
            <span className="h-0.5 w-4 rounded-full bg-muted-foreground/60" />
            Sem estruturação integrada
          </span>
          <span className="inline-flex items-center gap-2 text-xs text-foreground md:text-sm">
            <span className="h-0.5 w-4 rounded-full bg-primary" />
            Com estruturação integrada
          </span>
        </div>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground md:text-left md:text-xs">
          Gráfico ilustrativo sobre a evolução de um empreendimento ao longo de sua estruturação.
        </p>
      </div>
    </div>
  );
};

const VideoChartSection = () => (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8 lg:items-start">
    <VideoPlayer />
    <ComparisonChart />
  </div>
);

export default VideoChartSection;
