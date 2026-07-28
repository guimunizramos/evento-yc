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

/**
 * Mesma fachada desenhada em dois registros: "projeto" (linha/render, só traços)
 * e "obra executada" (preenchida, com vidros iluminados e vegetação). A geometria
 * é idêntica nos dois para que a leitura seja de comparação 1:1 — o que o cliente
 * imaginou no render x o que foi entregue na obra.
 */
const HouseFacade = ({ mode, reveal }: { mode: "render" | "built"; reveal: boolean }) => {
  const isBuilt = mode === "built";
  return (
    <svg viewBox="0 0 300 150" className="w-full" role="img" aria-label={isBuilt ? "Ilustração da obra executada" : "Ilustração do projeto em render"}>
      {mode === "render" && (
        <g className="stroke-primary/15" strokeWidth="0.75">
          {[30, 60, 90, 120].map((y) => (
            <line key={`h${y}`} x1="12" y1={y} x2="288" y2={y} />
          ))}
          {[60, 120, 180, 240].map((x) => (
            <line key={`v${x}`} x1={x} y1="18" x2={x} y2="132" />
          ))}
        </g>
      )}

      {/* Lajes / coberturas planas */}
      <rect x="30" y="60" width="116" height="8" rx="1" className={isBuilt ? "fill-[#26241f]" : "fill-none stroke-primary/60"} strokeWidth="1.5" />
      <rect x="134" y="38" width="124" height="8" rx="1" className={isBuilt ? "fill-[#26241f]" : "fill-none stroke-primary/60"} strokeWidth="1.5" />

      {/* Volume esquerdo (térreo) */}
      <rect
        x="36" y="68" width="104" height="64" rx="1"
        className={isBuilt ? "fill-[#dcd5c8]" : "fill-none stroke-primary/60"}
        strokeWidth="1.5"
        style={isBuilt ? { opacity: reveal ? 1 : 0, transition: "opacity 800ms ease-out 150ms" } : undefined}
      />
      {/* Volume direito (dois pavimentos) */}
      <rect
        x="140" y="46" width="112" height="86" rx="1"
        className={isBuilt ? "fill-[#cfc7b7]" : "fill-none stroke-primary/60"}
        strokeWidth="1.5"
        style={isBuilt ? { opacity: reveal ? 1 : 0, transition: "opacity 800ms ease-out 250ms" } : undefined}
      />

      {/* Painel de madeira ao lado da porta */}
      <rect x="120" y="92" width="10" height="40" className={isBuilt ? "fill-[#a9713f]" : "fill-none stroke-primary/50"} strokeWidth="1" />

      {/* Vidros do volume direito (grande envidraçamento) */}
      {[0, 1, 2].map((col) =>
        [0, 1].map((row) => (
          <rect
            key={`g${col}-${row}`}
            x={150 + col * 33}
            y={54 + row * 40}
            width="27"
            height="34"
            rx="1"
            className={isBuilt ? "fill-[#f4c266]" : "fill-none stroke-primary/45"}
            strokeWidth="1"
            style={isBuilt ? { opacity: reveal ? 1 : 0, transition: `opacity 600ms ease-out ${400 + (col * 2 + row) * 90}ms` } : undefined}
          />
        )),
      )}

      {/* Janela do volume esquerdo */}
      <rect
        x="50" y="80" width="34" height="24" rx="1"
        className={isBuilt ? "fill-[#f4c266]" : "fill-none stroke-primary/45"}
        strokeWidth="1"
        style={isBuilt ? { opacity: reveal ? 1 : 0, transition: "opacity 600ms ease-out 500ms" } : undefined}
      />

      {/* Porta */}
      <rect x="98" y="96" width="22" height="36" className={isBuilt ? "fill-[#8a5a30]" : "fill-none stroke-primary/50"} strokeWidth="1" />

      {/* Vegetação / paisagismo (só na obra) */}
      {isBuilt && (
        <g style={{ opacity: reveal ? 1 : 0, transition: "opacity 700ms ease-out 650ms" }}>
          <circle cx="150" cy="126" r="7" className="fill-[#5c8a4a]" />
          <circle cx="160" cy="128" r="5" className="fill-[#6b9c56]" />
          <circle cx="30" cy="127" r="6" className="fill-[#5c8a4a]" />
        </g>
      )}

      {/* Chão */}
      <line x1="12" y1="132" x2="288" y2="132" className={isBuilt ? "stroke-[#3a352d]" : "stroke-primary/60"} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

const ProjetoObraPanel = ({ mode, badge, caption, reveal }: { mode: "render" | "built"; badge: string; caption: string; reveal: boolean }) => {
  const isBuilt = mode === "built";
  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold md:text-xs ${isBuilt ? "text-primary" : "text-muted-foreground"}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${isBuilt ? "bg-primary" : "bg-muted-foreground/60"}`} />
          {badge}
        </span>
        <span className="text-[10px] text-muted-foreground md:text-[11px]">{caption}</span>
      </div>
      <div className={`overflow-hidden rounded-lg border p-3 ${isBuilt ? "border-primary/30 bg-background/60" : "border-border bg-background/30"}`}>
        <HouseFacade mode={mode} reveal={reveal} />
      </div>
    </div>
  );
};

const ProjetoObraComparison = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReveal(true);
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setReveal(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setReveal(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(element);

    // Rede de segurança: sem isso, um observer que não dispara deixaria a obra
    // permanentemente invisível.
    const fallback = window.setTimeout(() => setReveal(true), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={ref} className="flex flex-col rounded-xl border border-border bg-card/50 p-5 md:rounded-2xl md:p-8 lg:h-[560px]">
      <h3 className="text-center text-base font-bold text-foreground md:text-left md:text-xl">
        Do <span className="text-primary">render</span> à obra entregue
      </h3>
      <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground md:text-left md:text-base">
        O que se imagina no projeto e o que se vive na casa pronta. Entre os dois estão as decisões
        técnicas, os acabamentos e os custos que abrimos nesta consultoria.
      </p>

      <div className="mt-5 flex flex-1 flex-col justify-center gap-6 md:mt-7 md:gap-8">
        <ProjetoObraPanel mode="render" badge="Projeto" caption="O que se planeja" reveal={reveal} />
        <ProjetoObraPanel mode="built" badge="Obra executada" caption="O que se entrega" reveal={reveal} />
      </div>

      <p className="mt-5 text-center text-[11px] leading-relaxed text-muted-foreground md:text-left md:text-xs">
        Ilustração comparativa entre projeto e obra executada.
      </p>
    </div>
  );
};

const VideoShowcaseSection = () => (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8 lg:items-start">
    <VideoPlayer />
    <ProjetoObraComparison />
  </div>
);

export default VideoShowcaseSection;
