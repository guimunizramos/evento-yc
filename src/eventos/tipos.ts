/**
 * Um evento = um arquivo de dados. As páginas montam a mesma estrutura
 * (banner, hero, benefícios, vídeo, público, agenda, hosts, CTA com
 * formulário) a partir daqui, então criar um evento novo é preencher isto.
 */

/** Título com uma parte destacada em laranja. */
export type Titulo = { antes?: string; destaque?: string; depois?: string };

export type Icone =
  | "Landmark" | "LayoutGrid" | "TrendingUp" | "Building2" | "FileSearch" | "HardHat"
  | "ClipboardCheck" | "CircleDollarSign" | "Layers" | "Maximize" | "Rocket" | "Scale"
  | "Timer" | "Wallet" | "Thermometer";

export type Item = { icone: Icone; titulo: string; descricao: string };

export type Host = {
  nome: string;
  cargo: string;
  /** Linha extra abaixo do cargo, ex.: "CEO YouCon" */
  titulo?: string;
  foto: string;
  descricao: string;
};

export type EventoConfig = {
  slug: string;
  /** Identificador enviado ao webhook junto com a inscrição */
  webhookEvento: string;
  /** "laranja" = consultorias (CTA hero); "verde" = workshops (CTA verde) */
  tema: "laranja" | "verde";

  meta: { titulo: string; descricao: string; ogImage: string };

  banner: { antes: string; depois: string; dataIso: string; rotuloData: string };

  hero: {
    tag: string;
    titulo: Titulo;
    subtitulo: Array<{ texto: string; forte?: boolean; destaque?: boolean }>;
    imagemDesktop: string;
    imagemMobile: string;
    cta: string;
    rodape: string;
    provaSocial?: string;
  };

  beneficios: { titulo: Titulo; subtitulo?: string; itens: Item[] };

  /** Vídeo vertical 9:16; null mostra "Vídeo em breve" */
  video?: { src: string | null; poster: string | null; legenda: string };
  /** Gráfico comparativo do workshop de incorporação */
  grafico?: boolean;

  publico?: { titulo: Titulo; subtitulo: string; itens: Item[] };

  agenda: {
    titulo: Titulo;
    subtitulo: string;
    estilo: "timeline" | "lista";
    itens: Array<{ titulo: string; descricao?: string }>;
    cta: string;
  };

  hosts: { titulo: Titulo; subtitulo?: string; itens: Host[] };

  cta: { titulo: Titulo; descricao: string; data: string; horario: string; local: string };

  formulario: { titulo: string; redirect: string };
};
