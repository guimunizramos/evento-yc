import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { EventoConfig } from "@/eventos/tipos";

export const OG_TAMANHO = { width: 1200, height: 630 };
export const OG_TIPO = "image/png";

const LARANJA = "#FF6B00";

const arquivo = (nome: string) => readFile(path.join(process.cwd(), "src/lib/og", nome));

/** Data curta a partir do rótulo "24/09/2026 às 20h" → "24/09". */
const diaMes = (rotulo: string) => rotulo.match(/(\d{2}\/\d{2})/)?.[1] ?? rotulo;

/** Foto do hero como data URI. Se o storage falhar no build, a arte sai só com o fundo escuro. */
async function fundo(url: string) {
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    const tipo = r.headers.get("content-type") ?? "image/jpeg";
    return `data:${tipo};base64,${Buffer.from(await r.arrayBuffer()).toString("base64")}`;
  } catch {
    return null;
  }
}

/**
 * Arte de Open Graph no padrão da casa: foto do evento escurecida, tag em
 * pílula laranja, nome do evento em caixa alta, data espaçada e logo.
 * Gerada no build por cada rota via opengraph-image.tsx.
 */
export async function imagemOg(evento: EventoConfig) {
  const [m800, m600, logo, foto] = await Promise.all([
    arquivo("montserrat-800.woff"),
    arquivo("montserrat-600.woff"),
    arquivo("logo-youcon.png"),
    fundo(evento.hero.imagemDesktop),
  ]);
  const titulo = (evento.meta.ogTitulo ?? evento.meta.titulo).toUpperCase();
  const tamanhoTitulo = titulo.length > 16 ? 92 : 118;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#050505", fontFamily: "Montserrat" }}>
        {foto && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={foto} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }} />
        )}
        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, background: "rgba(0,0,0,0.6)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, background: "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.45) 100%)" }} />

        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "58px 60px 50px" }}>
          <div style={{ display: "flex", border: `3px solid ${LARANJA}`, borderRadius: 999, padding: "14px 44px", color: LARANJA, fontSize: 26, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase" }}>
            {evento.hero.tag}
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", color: "#fff", fontSize: tamanhoTitulo, fontWeight: 800, lineHeight: 0.98, letterSpacing: -2, textAlign: "center", maxWidth: 1080 }}>
              {titulo}
            </div>
            <div style={{ display: "flex", marginTop: 26, color: LARANJA, fontSize: 38, fontWeight: 800, letterSpacing: 16, textTransform: "uppercase" }}>
              {`DIA ${diaMes(evento.banner.rotuloData)}`}
            </div>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${logo.toString("base64")}`} alt="YouCon" width={240} height={78} style={{ width: 240, height: 78 }} />
        </div>
      </div>
    ),
    {
      ...OG_TAMANHO,
      fonts: [
        { name: "Montserrat", data: m800, weight: 800, style: "normal" },
        { name: "Montserrat", data: m600, weight: 600, style: "normal" },
      ],
    },
  );
}
