import { Play } from "lucide-react";

/**
 * Quando o vídeo vertical (9:16) estiver disponível, basta apontar VIDEO_SRC
 * para o arquivo (ex: "/videos/incorporacao-vertical.mp4") e, opcionalmente,
 * VIDEO_POSTER para a imagem de capa. Enquanto for null, renderiza o placeholder.
 */
const VIDEO_SRC: string | null = null;
const VIDEO_POSTER: string | null = null;

const VideoPlayer = () => (
  <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px]">
    <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border-2 border-primary/30 bg-card shadow-lg">
      {VIDEO_SRC ? (
        <video
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
          <p className="text-xs leading-relaxed text-muted-foreground">
            Thiago e Samuel explicam o que será abordado no Workshop.
          </p>
        </div>
      )}
    </div>
  </div>
);

const bars = [
  { label: "Hoje", parado: 34, estruturado: 34 },
  { label: "Etapa 1", parado: 36, estruturado: 58 },
  { label: "Etapa 2", parado: 38, estruturado: 84 },
  { label: "Etapa 3", parado: 40, estruturado: 118 },
];

const CHART_BASELINE = 150;
const BAR_WIDTH = 22;
const GROUP_WIDTH = 78;
const GROUP_OFFSET = 44;

const ComparisonChart = () => (
  <div className="rounded-xl border border-border bg-card/50 p-5 md:rounded-2xl md:p-8">
    <h3 className="text-base font-bold text-foreground md:text-xl">
      Terreno parado x terreno estruturado como empreendimento
    </h3>
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
      A diferença entre manter uma área ociosa e conduzi-la por um processo estruturado de
      viabilidade, projeto e incorporação.
    </p>

    <div className="mt-5 md:mt-7">
      <svg viewBox="0 0 380 190" className="w-full" role="img" aria-label="Gráfico conceitual comparando a evolução de um terreno parado e de um terreno estruturado como empreendimento ao longo das etapas do processo">
        {[0, 40, 80, 120].map((offset) => (
          <line
            key={offset}
            x1="28"
            x2="368"
            y1={CHART_BASELINE - offset}
            y2={CHART_BASELINE - offset}
            className="stroke-border"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
        ))}

        <line x1="28" x2="368" y1={CHART_BASELINE} y2={CHART_BASELINE} className="stroke-border" strokeWidth="1.5" />

        <text x="20" y={CHART_BASELINE - 116} textAnchor="end" className="fill-muted-foreground text-[9px]">
          valor
        </text>

        {bars.map((bar, index) => {
          const groupX = GROUP_OFFSET + index * GROUP_WIDTH;
          return (
            <g key={bar.label}>
              <rect
                x={groupX}
                y={CHART_BASELINE - bar.parado}
                width={BAR_WIDTH}
                height={bar.parado}
                rx="3"
                className="fill-muted-foreground/60"
              />
              <rect
                x={groupX + BAR_WIDTH + 6}
                y={CHART_BASELINE - bar.estruturado}
                width={BAR_WIDTH}
                height={bar.estruturado}
                rx="3"
                className="fill-primary"
              />
              <text
                x={groupX + BAR_WIDTH + 3}
                y={CHART_BASELINE + 16}
                textAnchor="middle"
                className="fill-muted-foreground text-[10px]"
              >
                {bar.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-6">
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
          <span className="h-2.5 w-2.5 rounded-sm bg-muted-foreground/60" />
          Terreno parado
        </span>
        <span className="inline-flex items-center gap-2 text-xs text-foreground md:text-sm">
          <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
          Terreno estruturado como empreendimento
        </span>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground md:text-xs">
        Ilustração conceitual, sem dados reais. Não representa projeção, garantia ou promessa de retorno.
      </p>
    </div>
  </div>
);

const VideoChartSection = () => (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8 lg:items-center">
    <VideoPlayer />
    <ComparisonChart />
  </div>
);

export default VideoChartSection;
