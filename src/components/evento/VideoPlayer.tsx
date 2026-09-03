"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

type Props = { src: string | null; poster: string | null; legenda: string };

/**
 * Vídeo vertical 9:16. Sem autoplay de propósito: o visitante dá play,
 * e por isso o convite precisa ser visível — daí o botão grande sobre o
 * pôster, no lugar do play discreto do navegador. Sem src, mostra o
 * placeholder "Vídeo em breve".
 */
export function VideoPlayer({ src, poster, legenda }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocou, setTocou] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[240px] sm:max-w-[268px] lg:w-[280px] lg:max-w-none">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.75rem] border-2 border-primary/30 bg-card shadow-lg lg:aspect-auto lg:h-[500px]">
        {src ? (
          <>
            <video
              ref={ref}
              controls
              playsInline
              preload="metadata"
              poster={poster ?? undefined}
              onPlay={() => setTocou(true)}
              className="h-full w-full object-cover"
            >
              <source src={src} type="video/mp4" />
              Seu navegador não suporta a reprodução de vídeo.
            </video>

            {/* Some no primeiro play e não volta: dali em diante quem manda são os controles nativos */}
            {!tocou && (
              <button
                type="button"
                aria-label="Reproduzir vídeo"
                onClick={() => ref.current?.play()}
                className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-black/70 via-black/20 to-black/40 transition-colors duration-300 hover:from-black/60"
              >
                <span className="relative flex h-16 w-16 items-center justify-center md:h-[72px] md:w-[72px]">
                  <span className="absolute inset-0 rounded-full bg-primary/40 motion-safe:animate-ping" aria-hidden="true" />
                  <span className="bg-orange-gradient glow-box relative flex h-full w-full items-center justify-center rounded-full ring-2 ring-white/25 transition-transform duration-300 group-hover:scale-105">
                    <Play className="ml-1 h-7 w-7 text-white md:h-8 md:w-8" fill="currentColor" strokeWidth={0} />
                  </span>
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-white drop-shadow md:text-[13px]">
                  Assistir agora
                </span>
              </button>
            )}
          </>
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
