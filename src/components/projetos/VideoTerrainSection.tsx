import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

/**
 * Vídeo vertical 9:16 hospedado no Vercel Blob. Enquanto for null,
 * renderiza o placeholder. (Gui substitui o src quando o vídeo estiver pronto.)
 */
const VIDEO_SRC: string | null = null;
const VIDEO_POSTER: string | null = null;

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
      {/* No desktop a altura é fixa e a largura sai dela, mantendo o 9:16 exato —
          assim o frame do vídeo e o card ao lado ficam do mesmo tamanho. */}
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
        Assista ao vídeo e entenda o que você vai ver nesta consultoria.
      </p>
    </div>
  );
};

/** Um sol com raios, para indicar a orientação solar em cada implantação. */
const SunMark = ({ x, y }: { x: number; y: number }) => (
  <g className="text-primary" transform={`translate(${x} ${y})`}>
    <circle r="5" className="fill-primary/80" />
    {Array.from({ length: 8 }).map((_, index) => {
      const angle = (index * Math.PI) / 4;
      const inner = 7;
      const outer = 10.5;
      return (
        <line
          key={index}
          x1={Math.cos(angle) * inner}
          y1={Math.sin(angle) * inner}
          x2={Math.cos(angle) * outer}
          y2={Math.sin(angle) * outer}
          className="stroke-primary/70"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      );
    })}
  </g>
);

interface PlanProps {
  label: string;
  caption: string;
  /** Casa (footprint) dentro do lote. */
  house: { x: number; y: number; w: number; h: number };
  /** Áreas de convívio aproveitadas — destacadas quando `highlight`. */
  outdoor: Array<{ x: number; y: number; w: number; h: number }>;
  highlight: boolean;
  isVisible: boolean;
  delay: number;
}

const PLOT = { x: 8, y: 8, w: 284, h: 118 };

const TerrainPlan = ({ label, caption, house, outdoor, highlight, isVisible, delay }: PlanProps) => (
  <div className="flex flex-col">
    <div className="mb-2 flex items-center justify-between gap-2">
      <span
        className={`inline-flex items-center gap-1.5 text-[11px] font-semibold md:text-xs ${
          highlight ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${highlight ? "bg-primary" : "bg-muted-foreground/60"}`} />
        {label}
      </span>
      <span className="text-[10px] text-muted-foreground md:text-[11px]">{caption}</span>
    </div>

    <svg viewBox="0 0 300 134" className="w-full" role="img" aria-label={`${label}. ${caption}`}>
      {/* Lote (divisa do terreno) */}
      <rect
        x={PLOT.x}
        y={PLOT.y}
        width={PLOT.w}
        height={PLOT.h}
        rx="6"
        className="fill-background stroke-border"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {/* Áreas de convívio aproveitadas no terreno */}
      {outdoor.map((area, index) => (
        <rect
          key={index}
          x={area.x}
          y={area.y}
          width={area.w}
          height={area.h}
          rx="4"
          className={highlight ? "fill-primary/25 stroke-primary/50" : "fill-muted-foreground/10 stroke-border"}
          strokeWidth="1"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity 700ms ease-out ${delay}ms`,
          }}
        />
      ))}

      {/* Casa (área construída) */}
      <rect
        x={house.x}
        y={house.y}
        width={house.w}
        height={house.h}
        rx="4"
        className="fill-foreground/85 stroke-foreground"
        strokeWidth="1"
      />
      {/* Telhado / linha central da casa, só para dar leitura de edificação */}
      <line
        x1={house.x + 6}
        y1={house.y + house.h / 2}
        x2={house.x + house.w - 6}
        y2={house.y + house.h / 2}
        className="stroke-background/40"
        strokeWidth="1"
      />

      <SunMark x={PLOT.x + PLOT.w - 16} y={PLOT.y + 16} />
    </svg>
  </div>
);

const TerrainComparison = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
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

    // Rede de segurança: sem isso, um observer que não dispara deixaria as áreas
    // destacadas permanentemente invisíveis.
    const fallback = window.setTimeout(() => setIsVisible(true), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={ref} className="flex flex-col rounded-xl border border-border bg-card/50 p-5 md:rounded-2xl md:p-8 lg:h-[560px]">
      <h3 className="text-center text-base font-bold text-foreground md:text-left md:text-xl">
        Mesmo terreno, <span className="text-primary">duas implantações</span>
      </h3>
      <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground md:text-left md:text-base">
        A forma como a casa ocupa o terreno muda tudo: insolação, ventilação, privacidade e a área
        que sobra para viver. A implantação certa faz o mesmo lote render muito mais.
      </p>

      <div className="mt-5 flex flex-1 flex-col justify-center gap-6 md:mt-7 md:gap-8">
        {/* Implantação comum: casa no centro, área externa espremida e fragmentada. */}
        <TerrainPlan
          label="Implantação comum"
          caption="Área externa fragmentada"
          house={{ x: 96, y: 34, w: 108, h: 66 }}
          outdoor={[
            { x: 16, y: 16, w: 72, h: 102 },
            { x: 212, y: 16, w: 72, h: 102 },
          ]}
          highlight={false}
          isVisible={isVisible}
          delay={200}
        />

        {/* Implantação inteligente: casa recuada para um lado, gerando um grande
            quintal contínuo, bem orientado e com privacidade. */}
        <TerrainPlan
          label="Implantação inteligente"
          caption="Área de convívio ampla e contínua"
          house={{ x: 150, y: 20, w: 134, h: 52 }}
          outdoor={[
            { x: 16, y: 20, w: 126, h: 98 },
            { x: 150, y: 80, w: 134, h: 38 },
          ]}
          highlight
          isVisible={isVisible}
          delay={400}
        />
      </div>

      <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6">
        <span className="inline-flex items-center gap-2 text-xs text-foreground md:text-sm">
          <span className="h-2.5 w-2.5 rounded-sm bg-foreground/85" />
          Casa
        </span>
        <span className="inline-flex items-center gap-2 text-xs text-foreground md:text-sm">
          <span className="h-2.5 w-2.5 rounded-sm bg-primary/40 ring-1 ring-primary/50" />
          Área de convívio
        </span>
      </div>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground md:text-left md:text-xs">
        Ilustração comparativa de como a implantação influencia o aproveitamento do terreno.
      </p>
    </div>
  );
};

const VideoTerrainSection = () => (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8 lg:items-start">
    <VideoPlayer />
    <TerrainComparison />
  </div>
);

export default VideoTerrainSection;
