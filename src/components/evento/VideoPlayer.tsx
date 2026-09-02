"use client";

import { useEffect, useRef } from "react";
import { Play } from "lucide-react";

type Props = { src: string | null; poster: string | null; legenda: string };

/** Vídeo vertical 9:16. Sem src, mostra o placeholder "Vídeo em breve". */
export function VideoPlayer({ src, poster, legenda }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Muted garante que a política de autoplay permita sem gesto do usuário
    ref.current?.play().catch(() => {});
  }, []);

  return (
    <div className="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:w-[315px] lg:max-w-none">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border-2 border-primary/30 bg-card shadow-lg lg:aspect-auto lg:h-[560px]">
        {src ? (
          <video ref={ref} autoPlay muted loop playsInline controls preload="metadata" poster={poster ?? undefined} className="h-full w-full object-cover">
            <source src={src} type="video/mp4" />
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
      <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground md:text-base">{legenda}</p>
    </div>
  );
}
