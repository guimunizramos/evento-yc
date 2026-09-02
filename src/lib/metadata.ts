import type { Metadata } from "next";
import type { EventoConfig } from "@/eventos/tipos";

export const SITE_URL = "https://evento.youconprojetos.com.br";

/** Metadata da página a partir dos dados do evento, com Open Graph e Twitter. */
export function metadataDoEvento(e: EventoConfig): Metadata {
  const url = `${SITE_URL}/${e.slug}`;
  return {
    title: e.meta.titulo,
    description: e.meta.descricao,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: e.meta.titulo,
      description: e.meta.descricao,
      images: [{ url: e.meta.ogImage }],
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: e.meta.titulo,
      description: e.meta.descricao,
      images: [e.meta.ogImage],
    },
  };
}
