/**
 * Toda a mídia dos eventos mora no MinIO da YouCon, fora do repositório:
 * vídeo e imagem pesada no Git incham o histórico para sempre.
 */
const BASE = "https://s3.lp-youconprojetos.com.br/evento-yc";

export const midia = (caminho: string) => `${BASE}/${caminho.replace(/^\/+/, "")}`;

export const LOGO_YOUCON = midia("img/youcon-logo.png");
