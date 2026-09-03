import { Play } from "lucide-react";

type Props = { src: string | null; poster: string | null; legenda: string };

/**
 * Vídeo vertical 9:16. Sem autoplay de propósito: o visitante dá play.
 * Com som desde o primeiro clique, sem susto de áudio ao abrir a página.
 * Sem src, mostra o placeholder "Vídeo em breve".
 */
export function VideoPlayer({ src, poster, legenda }: Props) {
  return (
    <div className="mx-auto w-full max-w-[240px] sm:max-w-[268px] lg:w-[280px] lg:max-w-none">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.75rem] border-2 border-primary/30 bg-card shadow-lg lg:aspect-auto lg:h-[500px]">
        {src ? (
          <video controls playsInline preload="metadata" poster={poster ?? undefined} className="h-full w-full object-cover">
            <source src={src} type="video/mp4" />
            Seu navegador não suporta a reprodução de vídeo.
          </video>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-card to-background px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 md:h-14 md:w-14">
              <Play className="ml-0.5 h-5 w-5 text-primary md:h-6 md:w-6" fill="currentColor" />
            </div>
            <p className="text-[13px] font-semibold text-foreground">Vídeo em breve</p>
          </div>
        )}
      </div>
      <p className="mt-4 text-center text-[13px] leading-relaxed text-muted-foreground md:text-sm">{legenda}</p>
    </div>
  );
}
