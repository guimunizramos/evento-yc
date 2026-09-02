import type { Metadata } from "next";
import { midia } from "@/lib/midia";
import { SITE_URL } from "@/lib/metadata";
import { Incorp2026 } from "./Incorp2026";

const TITULO = "Incorp Experience 2026 | Imersão presencial de Incorporação Imobiliária";
const DESCRICAO =
  "Dois dias sobre todas as etapas da incorporação, do terreno à entrega, com Thiago Cardim e Samuel Mosca. 18 e 19 de setembro, em Poços de Caldas. Vagas limitadas.";
const OG = midia("img/open-graph-presencial.jpg");
const URL = `${SITE_URL}/incorp2026`;

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: URL },
  openGraph: { type: "website", url: URL, title: TITULO, description: DESCRICAO, images: [{ url: OG }], locale: "pt_BR" },
  twitter: { card: "summary_large_image", title: TITULO, description: DESCRICAO, images: [OG] },
};

export default function Page() {
  return <Incorp2026 />;
}
