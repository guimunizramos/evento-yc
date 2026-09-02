"use client";

/**
 * Envio da inscrição ao webhook (n8n) que repassa ao CRM.
 *
 * Os valores padrão são os que as LPs em Vite usavam. As variáveis
 * NEXT_PUBLIC_* permitem trocar sem redeploy de código, mas continuam
 * visíveis no bundle: isso é limitação do webhook, que só aceita Basic
 * auth no navegador, não deste código.
 */
const URL =
  process.env.NEXT_PUBLIC_INSCRICAO_WEBHOOK ??
  "https://webhook.lp-youconprojetos.com.br/webhook/eventos-youcon";
const AUTH = process.env.NEXT_PUBLIC_INSCRICAO_AUTH ?? "admin:123456";

export async function enviarInscricao(dados: Record<string, unknown>) {
  const resp = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(AUTH)}`,
    },
    body: JSON.stringify(dados),
  });
  if (!resp.ok) throw new Error(`Webhook ${resp.status}`);
}
