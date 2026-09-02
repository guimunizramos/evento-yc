"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string; delay?: number; as?: "div" | "li" | "section" };

/**
 * Revelação suave no scroll: acende uma única vez quando o bloco entra na
 * tela. Quem pede menos movimento recebe o conteúdo já visível, sem transição.
 */
export function Reveal({ children, className = "", delay = 0, as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisivel(true); return; }
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setVisivel(true); obs.disconnect(); } }),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${visivel ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}
    >
      {children}
    </Tag>
  );
}
