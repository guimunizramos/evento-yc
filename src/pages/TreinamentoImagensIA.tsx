import { useEffect, type ReactNode } from "react";
import { Bot, MessageCircle, Sparkles, Wand2 } from "lucide-react";

const YOUTUBE_VIDEO_ID = "re83uLaUnYE";

const AGENT_URL =
  "https://chatgpt.com/g/g-6a44309a086081918febbdb06e2a0d02-yourender";
const WHATSAPP_URL =
  "https://wa.me/5535991551438?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20o%20treinamento%20de%20imagens%20com%20IA";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.464 3.484 1.345 4.997L2 22l5.144-1.334a9.96 9.96 0 0 0 4.86 1.237h.004c5.514 0 9.997-4.483 9.997-9.997 0-2.67-1.04-5.182-2.928-7.07a9.935 9.935 0 0 0-7.073-2.833zm0 18.163h-.003a8.28 8.28 0 0 1-4.223-1.156l-.303-.18-3.053.792.815-2.977-.198-.306a8.257 8.257 0 0 1-1.267-4.393c0-4.554 3.706-8.26 8.263-8.26 2.207 0 4.28.86 5.842 2.422a8.207 8.207 0 0 1 2.417 5.842c-.001 4.554-3.708 8.26-8.29 8.26z" />
    </svg>
  );
}

const LEARN_ITEMS: Array<{ icon: typeof Bot; text: string }> = [
  {
    icon: Bot,
    text: "Como usar o agente de IA da YouCon para otimizar imagens de projetos",
  },
  {
    icon: Wand2,
    text: "Ajustes e comandos para resultados mais realistas e cinematográficos",
  },
  {
    icon: Sparkles,
    text: "Boas práticas para manter consistência visual entre as imagens",
  },
  {
    icon: MessageCircle,
    text: "Como aplicar isso no dia a dia para impressionar clientes",
  },
];

const RESULT_IMAGES: Array<{ src: string; alt: string }> = [
  { src: "/resultado-1.jpg", alt: "Antes e depois: fachada residencial otimizada com IA" },
  { src: "/resultado-2.jpg", alt: "Antes e depois: sobrado moderno otimizado com IA" },
  { src: "/resultado-3.jpg", alt: "Antes e depois: casa térrea otimizada com IA" },
  { src: "/resultado-4.jpg", alt: "Antes e depois: fachada de prédio otimizada com IA" },
];

const STEPS: Array<{ title: string }> = [
  { title: "Assista ao vídeo acima" },
  { title: "Acesse o agente e aplique o passo a passo" },
  { title: "Ficou com dúvida? Chama no WhatsApp" },
];

function CtaLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "whatsapp";
}) {
  const base =
    "group relative inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm sm:text-base font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink sm:w-auto";
  const variants = {
    primary:
      "bg-gradient-brand text-white shadow-xl shadow-brand-red/30 hover:shadow-2xl hover:shadow-brand-red/40",
    secondary:
      "border border-brand-orange/40 bg-white/[0.03] text-white hover:border-brand-orange/70 hover:bg-white/[0.06]",
    whatsapp:
      "bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 hover:brightness-110 hover:shadow-2xl hover:shadow-[#25D366]/40",
  } as const;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${variants[variant]}`}>
      {children}
      <span aria-hidden className="ml-2 transition-transform group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

function VideoEmbed() {
  return (
    <div className="mt-10 aspect-video w-full overflow-hidden rounded-2xl border border-brand-orange/40 shadow-[0_0_30px_-4px_rgba(255,122,60,0.35)]">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
        title="Treinamento: Otimização de Imagens com IA"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function CtaGroup() {
  return (
    <div className="mt-10 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <CtaLink href={AGENT_URL} variant="primary">
        Acessar YouRender
      </CtaLink>
      <CtaLink href={WHATSAPP_URL} variant="whatsapp">
        <WhatsAppIcon className="h-5 w-5" />
        Dúvidas
      </CtaLink>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-red/20 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:py-28 text-center">
        <div className="mb-8 flex justify-center">
          <img
            src="/logo-youcon.svg"
            alt="YouCon — Arquitetura e Engenharia"
            className="h-9 sm:h-11 w-auto"
          />
        </div>
        <p className="mb-5">
          <span className="inline-flex items-center rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-1.5 text-xs sm:px-3.5 sm:py-1 font-semibold uppercase tracking-[0.25em] text-brand-orange">
            Treinamento
          </span>
        </p>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
          Como Usar IA para Criar{" "}
          <span className="text-gradient-brand">Imagens Mais Realistas e Impactantes</span>
        </h1>
        <VideoEmbed />
        <CtaGroup />
      </div>
    </section>
  );
}

function ResultImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group aspect-video w-full overflow-hidden rounded-2xl border border-brand-orange/40 transition duration-300 hover:border-brand-orange hover:shadow-[0_0_40px_-2px_rgba(255,122,60,0.65)]">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />
    </div>
  );
}

function LearnList() {
  return (
    <section className="border-b border-white/5 bg-brand-surface/40 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-center text-2xl sm:text-3xl font-bold leading-tight text-white">
          O que você vai <span className="text-gradient-brand">aprender</span>
        </h2>
        <ul className="mt-10 space-y-4">
          {LEARN_ITEMS.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-card p-5 transition hover:border-brand-orange/40 hover:shadow-[0_0_30px_-4px_rgba(255,122,60,0.35)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-brand shadow-lg shadow-brand-red/30">
                <Icon className="h-5 w-5 text-white" strokeWidth={2} />
              </span>
              <p className="pt-1.5 text-sm sm:text-base font-medium text-white/85">{text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {RESULT_IMAGES.map((img) => (
            <ResultImage key={img.src} {...img} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className="border-b border-white/5 bg-brand-surface/40 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="text-center text-2xl sm:text-3xl font-bold leading-tight text-white">
          Passo a <span className="text-gradient-brand">passo</span>
        </h2>
        <ol className="mt-10 space-y-5">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="flex items-center gap-5 rounded-2xl border border-white/10 bg-card p-5 transition hover:border-brand-orange/40 hover:shadow-[0_0_30px_-4px_rgba(255,122,60,0.35)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-lg font-black text-white shadow-lg shadow-brand-red/40">
                {i + 1}
              </span>
              <p className="text-sm sm:text-base font-medium text-white/85">{step.title}</p>
            </li>
          ))}
        </ol>
        <CtaGroup />
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
        <p className="mt-6 text-xs font-semibold text-white/40">
          © {new Date().getFullYear()} YouCon Arquitetura e Engenharia. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}

const TreinamentoImagensIA = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Treinamento — Otimização de Imagens com IA | YouCon";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="lp-aniversario min-h-screen bg-background text-foreground">
      <main>
        <Hero />
        <LearnList />
        <Steps />
      </main>
      <Footer />
    </div>
  );
};

export default TreinamentoImagensIA;
