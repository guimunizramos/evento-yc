import type { Titulo as TituloT } from "@/eventos/tipos";

/** Título com o trecho de destaque em laranja (ou branco sobre fundo laranja). */
export function Titulo({ t, destaqueClasse = "text-primary" }: { t: TituloT; destaqueClasse?: string }) {
  return (
    <>
      {t.antes}
      {t.destaque && <span className={destaqueClasse}>{t.destaque}</span>}
      {t.depois}
    </>
  );
}
