import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  Building2,
  Calculator,
  Compass,
  Droplets,
  Play,
  Sofa,
  Zap,
  type LucideIcon,
} from "lucide-react";
import RegistrationDialog from "@/components/aniversario/RegistrationDialog";

// Campaign deadline: 2026-07-31 23:59 America/Sao_Paulo (UTC-3)
const DEADLINE_MS = Date.UTC(2026, 6, 31, 23 + 3, 59, 0);

function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, ended: diff === 0 };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function mulberry32(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => {
        const rand = mulberry32(i + 1);
        const duration = 6 + rand() * 8;
        return {
          id: i,
          left: rand() * 100,
          duration,
          delay: -rand() * duration,
          drift: (rand() - 0.5) * 120,
          spin: 360 + rand() * 360,
          width: 6 + rand() * 6,
          color:
            i % 3 === 0
              ? "#FF7A3C"
              : i % 3 === 1
                ? "#E8431C"
                : "rgba(255,255,255,0.5)",
        };
      }),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="animate-confetti-fall absolute inline-block top-[-5%]"
          style={
            {
              left: `${p.left}%`,
              width: p.width,
              height: p.width * 0.35,
              background: p.color,
              borderRadius: 1,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--confetti-drift": `${p.drift}px`,
              "--confetti-spin": `${p.spin}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-0.5">
      <span className="rounded bg-white/10 px-1.5 py-0.5 text-sm sm:text-base font-bold leading-none">
        {value}
      </span>
      <span className="text-[10px] uppercase text-white/60">{label}</span>
    </span>
  );
}

function Sep() {
  return <span className="text-white/30">:</span>;
}

function UrgencyBar({
  onCta,
  ended,
  days,
  hours,
  minutes,
  seconds,
}: {
  onCta: () => void;
  ended: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) {
  if (ended) {
    return (
      <div className="sticky top-0 z-50 w-full bg-gradient-brand text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-2 text-center text-xs sm:text-sm font-semibold tracking-wide uppercase">
          Campanha de Aniversário YouCon encerrada — obrigado a todos!
        </div>
      </div>
    );
  }
  return (
    <div className="sticky top-0 z-50 w-full border-b border-brand-orange/25 bg-brand-ink/95 backdrop-blur shadow-[0_4px_24px_-2px_rgba(255,122,60,0.35)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2">
        <p className="text-[11px] sm:text-xs md:text-sm font-medium tracking-wide text-white/90">
          <span className="hidden sm:inline">Condições de </span>
          <span className="font-semibold text-white">Aniversário YouCon</span>
          <span className="hidden sm:inline"> válidas</span> até{" "}
          <span className="text-brand-orange font-semibold">31/07</span>
        </p>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 text-white tabular-nums">
            <TimeBlock label="d" value={pad(days)} />
            <Sep />
            <TimeBlock label="h" value={pad(hours)} />
            <Sep />
            <TimeBlock label="m" value={pad(minutes)} />
            <span className="hidden sm:inline"><Sep /></span>
            <span className="hidden sm:inline"><TimeBlock label="s" value={pad(seconds)} /></span>
          </div>
          <button
            onClick={onCta}
            className="hidden md:inline-flex items-center rounded-full bg-gradient-brand px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand-red/30 transition hover:brightness-110"
          >
            Quero minha proposta
          </button>
        </div>
      </div>
    </div>
  );
}

function CtaButton({
  onClick,
  children,
  size = "lg",
}: {
  onClick: () => void;
  children: ReactNode;
  size?: "md" | "lg" | "xl";
}) {
  const sizes = {
    md: "px-5 py-2.5 text-xs sm:px-6 sm:py-3 sm:text-sm",
    lg: "px-6 py-3 text-sm sm:px-8 sm:py-4 sm:text-base",
    xl: "px-8 py-4 text-base sm:px-10 sm:py-5 sm:text-lg",
  } as const;
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center rounded-full bg-gradient-brand font-semibold uppercase tracking-wider text-white shadow-xl shadow-brand-red/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-brand-red/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink ${sizes[size]}`}
    >
      {children}
      <span aria-hidden className="ml-2 transition-transform group-hover:translate-x-1">→</span>
    </button>
  );
}

function VideoPlaceholder({ label }: { label: string }) {
  return (
    <div className="relative flex aspect-[9/16] w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/20 bg-white/[0.03]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,122,60,0.06)_0%,transparent_50%,rgba(232,67,28,0.06)_100%)]" />
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
          <Play className="h-4 w-4 text-white/70" fill="currentColor" strokeWidth={0} />
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-orange">
          Vídeo pendente
        </p>
        <p className="mt-1 text-xs text-white/60 px-4">{label}</p>
      </div>
    </div>
  );
}

function Hero({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <Confetti />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-red/20 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28 text-center">
        <div className="mb-8 flex justify-center">
          <img
            src="/logo-youcon.svg"
            alt="YouCon — Arquitetura e Engenharia"
            className="h-9 sm:h-11 w-auto"
          />
        </div>
        <p className="mb-5">
          <span className="inline-flex items-center rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-1.5 text-xs sm:px-3.5 sm:py-1 font-semibold uppercase tracking-[0.25em] text-brand-orange">
            Condição Exclusiva
          </span>
        </p>
        <h1 className="sr-only">Aniversário YouCon — Since 2020</h1>
        <img
          src="/hero-aniversario.svg"
          alt=""
          aria-hidden
          className="mx-auto w-full max-w-[288px] sm:max-w-md md:max-w-lg"
        />
        <div className="mt-10">
          <CtaButton onClick={onCta} size="lg">
            Quero minha proposta
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

function BrandStatement() {
  return (
    <section className="border-b border-white/5 bg-gradient-brand py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
          São <span className="font-black">06 anos</span> criando projetos completos,
          planejados e pensados para sair do papel com mais segurança.
        </p>
      </div>
    </section>
  );
}

function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(target * eased));
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return { value, ref };
}

function Counter({
  target,
  suffix = "",
  label,
}: {
  target: number;
  suffix?: string;
  label: string;
}) {
  const { value, ref } = useCountUp(target);
  return (
    <div ref={ref} className="min-w-0 text-center">
      <p className="py-1 text-4xl sm:text-5xl font-black leading-tight">
        <span className="inline-block whitespace-nowrap text-gradient-brand">
          +{value.toLocaleString("pt-BR")}
          {suffix}
        </span>
      </p>
      <p className="mt-3 text-xs sm:text-sm uppercase tracking-widest text-white/60">{label}</p>
    </div>
  );
}

function History() {
  return (
    <section className="border-b border-white/5 bg-brand-surface/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange">
          06 anos de história
        </p>
        <h2 className="mx-auto max-w-3xl text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
          Ao longo desses anos, ajudamos famílias a transformarem sonhos em projetos completos.
        </h2>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          <VideoPlaceholder label="Depoimento de cliente" />
          <VideoPlaceholder label="Obra em execução" />
          <VideoPlaceholder label="Fachada finalizada" />
          <VideoPlaceholder label="Bastidores do projeto" />
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3">
          <Counter target={400} label="Projetos Elaborados" />
          <Counter target={60} label="Cidades pelo Brasil" />
          <Counter target={15000} suffix="m²" label="Projetados" />
        </div>
      </div>
    </section>
  );
}

const SERVICES: Array<{ name: string; icon: LucideIcon }> = [
  { name: "Arquiteto", icon: Compass },
  { name: "Designer de Interiores", icon: Sofa },
  { name: "Orçamentista", icon: Calculator },
  { name: "Engenheiro Estrutural", icon: Building2 },
  { name: "Engenheiro Elétrico", icon: Zap },
  { name: "Engenheiro Hidráulico", icon: Droplets },
];

function Solution() {
  return (
    <section className="border-b border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mx-auto max-w-4xl text-center text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
          <span className="text-gradient-brand">Solução Completa YouCon</span>: todos os
          profissionais que você precisa em um só lugar.
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {SERVICES.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="group relative rounded-xl border border-white/10 bg-card p-6 pl-8 transition hover:border-brand-orange/50 hover:bg-white/[0.04] hover:shadow-[0_0_30px_-4px_rgba(255,122,60,0.35)]"
            >
              <span
                aria-hidden
                className="absolute left-0 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-brand text-lg font-black text-white shadow-lg shadow-brand-red/40"
              >
                +
              </span>
              <Icon
                className="mb-4 h-8 w-8 text-brand-orange transition group-hover:scale-110"
                strokeWidth={1.75}
              />
              <p className="text-xl font-semibold text-white">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OfferTransition({
  onCta,
  revealed,
  onReveal,
}: {
  onCta: () => void;
  revealed: boolean;
  onReveal: () => void;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/5 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,67,28,0.15)_0%,transparent_60%)]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase leading-[0.95] text-white">
          O presente é <span className="text-gradient-brand">pra você!</span>
        </h2>
        <p className="mt-8 text-lg sm:text-xl text-white/80 leading-relaxed">
          E para celebrar essa data, preparamos uma{" "}
          <span className="font-semibold text-white">Condição Especial</span> para quem também
          quer dar o próximo passo.
        </p>
        {revealed ? (
          <div className="mt-10 animate-rise-in">
            <CtaButton onClick={onCta}>Quero minha proposta</CtaButton>
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center gap-6">
            <button
              onClick={onReveal}
              className="group flex flex-col items-center gap-6 focus-visible:outline-none"
              aria-label="Abrir presente e ver a oferta"
            >
              <span
                aria-hidden
                className="animate-gift-wiggle inline-block text-7xl sm:text-8xl drop-shadow-[0_0_30px_rgba(255,122,60,0.35)] transition group-hover:scale-110"
              >
                🎁
              </span>
              <span className="inline-flex items-center rounded-full bg-gradient-brand px-6 py-3 text-sm sm:px-8 sm:py-4 sm:text-base font-semibold uppercase tracking-wider text-white shadow-xl shadow-brand-red/30 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-brand-red/40 group-focus-visible:ring-2 group-focus-visible:ring-brand-orange group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-brand-ink">
                Clique para abrir seu presente
                <span aria-hidden className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Sua oferta de aniversário te espera
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function NoLand({ onCta }: { onCta: () => void }) {
  return (
    <section className="border-b border-white/5 bg-brand-surface/40 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2">
        <div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
            Ainda não tem <span className="text-gradient-brand">terreno?</span>
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Te ajudamos a escolher o melhor e com mais segurança.
          </p>
          <div className="mt-8">
            <CtaButton onClick={onCta} size="md">
              Falar com a YouCon
            </CtaButton>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white/[0.03]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,122,60,0.06)_0%,transparent_50%,rgba(232,67,28,0.06)_100%)]" />
          <img
            src="/terreno-lote.jpg"
            alt="Casal observando terrenos em condomínio"
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>
    </section>
  );
}

const BONUSES: Array<{
  title: string;
  subtitle?: string;
  was: string | null;
  now: string;
  image?: string;
}> = [
  {
    title: "Estimativa Completa de Custo da Obra",
    was: "R$ 1.200,00",
    now: "Incluso",
    image: "/bonus/estimativa-custo.png",
  },
  {
    title: "Consultoria para Definição do Método Construtivo",
    was: "R$ 350,00",
    now: "Incluso",
    image: "/bonus/consultoria-metodo.png",
  },
  {
    title: "Assessoria de Interiores",
    was: "R$ 2.500,00",
    now: "GRATUITA",
    image: "/bonus/assessoria-interiores.png",
  },
  {
    title: "Crédito de 5% para Contratação do Projeto de Interiores",
    was: null,
    now: "Incluso",
    image: "/bonus/credito-5-interiores.png",
  },
  {
    title: "Simulação de Financiamento da Obra",
    was: null,
    now: "Incluso",
    image: "/bonus/simulacao-financiamento.png",
  },
];

// Soma dos valores "de" listados acima — ajuste os itens sem preço se quiser refletir no total.
const BONUS_TOTAL = BONUSES.reduce((sum, b) => {
  if (!b.was) return sum;
  return sum + Number(b.was.replace(/[^\d,]/g, "").replace(",", "."));
}, 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function Bonuses() {
  return (
    <section className="border-b border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange">
          Bônus Exclusivos
        </p>
        <h2 className="mx-auto max-w-3xl text-center text-3xl sm:text-5xl font-bold leading-tight text-white">
          Tudo isso <span className="text-gradient-brand">somado</span> pra você.
        </h2>

        <div className="mx-auto mt-14 max-w-2xl">
          {BONUSES.map((b, i) => (
            <div key={b.title}>
              <div className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:border-brand-orange/40 hover:shadow-[0_0_30px_-4px_rgba(255,122,60,0.35)]">
                <div className="relative aspect-video w-full overflow-hidden bg-white/[0.03]">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,122,60,0.06)_0%,transparent_50%,rgba(232,67,28,0.06)_100%)]" />
                  {b.image && (
                    <img
                      src={b.image}
                      alt={b.title}
                      className="absolute inset-0 h-full w-full object-contain p-3"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                </div>
                <div className="flex flex-col items-center gap-3 p-5 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6 sm:text-left">
                  <div className="flex-1">
                    <p className="text-lg sm:text-xl font-semibold text-white">
                      {b.title}
                    </p>
                    {b.subtitle && (
                      <p className="mt-1 text-sm text-white/60">({b.subtitle})</p>
                    )}
                  </div>
                  <div className="flex shrink-0 flex-col items-center gap-1 sm:items-end sm:gap-2">
                    {b.was && (
                      <span className="text-lg sm:text-xl font-semibold text-white/50 line-through decoration-brand-red/70 decoration-2">
                        {b.was}
                      </span>
                    )}
                    <span className="rounded-full bg-gradient-brand px-5 py-2 text-sm sm:text-base font-black uppercase tracking-wider text-white shadow-lg shadow-brand-red/40">
                      {b.now}
                    </span>
                  </div>
                </div>
              </div>
              {i < BONUSES.length - 1 && (
                <div className="flex w-full items-center justify-center py-3" aria-hidden>
                  <span className="flex h-12 w-12 items-center justify-center text-5xl font-black leading-none text-brand-orange/70">
                    +
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-2xl text-center">
          <p className="text-lg text-white/70">
            Tudo isso custaria mais de{" "}
            <span className="font-bold text-white line-through decoration-brand-red/70">
              {BONUS_TOTAL}
            </span>
          </p>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-gradient-brand">
            E está saindo de graça no Aniversário YouCon.
          </p>
        </div>
      </div>
    </section>
  );
}

function PaymentCondition() {
  return (
    <section className="relative overflow-hidden border-b border-white/5 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,60,0.15)_0%,transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl px-4">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange">
          Condição Especial de Pagamento
        </p>
        <h2 className="mx-auto max-w-3xl text-center text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
          Mais fácil de começar. Mais fácil de fechar.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-card p-8 transition hover:border-brand-orange/40 hover:shadow-[0_0_30px_-4px_rgba(255,122,60,0.35)]">
            <p className="text-xs uppercase tracking-widest text-white/50">Entrada</p>
            <p className="mt-4 text-2xl text-white/40 line-through">
              40% de entrada
            </p>
            <p className="mt-2 text-4xl sm:text-5xl font-black leading-tight text-gradient-brand">
              30% de entrada
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-card p-8 transition hover:border-brand-orange/40 hover:shadow-[0_0_30px_-4px_rgba(255,122,60,0.35)]">
            <p className="text-xs uppercase tracking-widest text-white/50">Parcelamento</p>
            <p className="mt-4 text-2xl text-white/40 line-through">3x no boleto</p>
            <p className="mt-2 text-4xl sm:text-5xl font-black leading-tight text-gradient-brand">
              6x no cartão sem juros
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Confetti />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-orange/20 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-[0.95] text-white">
          Uma campanha para <span className="text-gradient-brand">celebrar o nosso caminho</span>{" "}
          e começar o seu.
        </h2>
        <div className="mt-12">
          <CtaButton onClick={onCta} size="xl">
            Quero receber minha proposta
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-ink py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center">
        <img
          src="/logo-youcon.svg"
          alt="YouCon — Arquitetura e Engenharia"
          className="h-14 sm:h-16 w-auto"
        />
        <p className="mt-6 text-xs text-white/40">
          © {new Date().getFullYear()} YouCon. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

const Aniversario = () => {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const revealRef = useRef<HTMLDivElement>(null);
  const { days, hours, minutes, seconds, ended } = useCountdown(DEADLINE_MS);
  const openForm = () => setOpen(true);

  useEffect(() => {
    if (revealed) {
      revealRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [revealed]);

  return (
    <div className="lp-aniversario min-h-screen bg-background text-foreground">
      <UrgencyBar
        onCta={openForm}
        ended={ended}
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
      <main>
        <Hero onCta={openForm} />
        <BrandStatement />
        <History />
        <Solution />
        <OfferTransition
          onCta={openForm}
          revealed={revealed}
          onReveal={() => setRevealed(true)}
        />
        {revealed && (
          <div ref={revealRef} className="animate-rise-in">
            <NoLand onCta={openForm} />
            <Bonuses />
            <PaymentCondition />
            <FinalCta onCta={openForm} />
          </div>
        )}
      </main>
      <Footer />
      <RegistrationDialog open={open} onOpenChange={setOpen} evento="aniversario" />
    </div>
  );
};

export default Aniversario;
