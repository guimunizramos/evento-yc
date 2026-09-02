import { midia } from "@/lib/midia";
import type { EventoConfig } from "./tipos";

/** Página raiz: consultoria "Antes de Construir". Evento de 01/07/2026, já realizado. */
export const consultoria: EventoConfig = {
  slug: "",
  webhookEvento: "evento",
  tema: "laranja",
  meta: {
    titulo: "Consultoria Gratuita | YouCon",
    descricao:
      "Participe de uma consultoria gratuita com o arquiteto Thiago Cardim e descubra os principais erros que você precisa evitar antes de construir sua casa.",
    ogImage: midia("img/open-graph-incorporacao.png"),
  },
  banner: {
    antes: "Consultoria gratuita ao vivo em:",
    depois: "A consultoria já começou!",
    dataIso: "2026-07-01T20:00:00-03:00",
    rotuloData: "01/07/2026 às 20h",
  },
  hero: {
    tag: "Consultoria exclusiva YouCon",
    titulo: { destaque: "Antes de Construir:", depois: "Descubra os Erros que Podem Encarecer a Sua Obra" },
    subtitulo: [
      { texto: "Participe de uma consultoria gratuita com o arquiteto " },
      { texto: "Thiago Cardim", forte: true },
      { texto: " e entenda como evitar decisões que geram desperdícios, retrabalhos e custos inesperados na construção da sua casa." },
    ],
    imagemDesktop: midia("img/bg-desktop.jpg"),
    imagemMobile: midia("img/bg-mobile.jpg"),
    cta: "Garantir meu acesso gratuito",
    rodape: "Consultoria ao vivo | Vagas limitadas",
  },
  beneficios: {
    titulo: { antes: "Por que os maiores erros de uma obra começam antes da construção?" },
    itens: [
      { icone: "ClipboardCheck", titulo: "Decisões sem Planejamento", descricao: "Quando terreno, projeto e orçamento não são analisados em conjunto, os problemas aparecem durante a execução." },
      { icone: "CircleDollarSign", titulo: "Gastos e Retrabalhos", descricao: "Mudanças realizadas durante a obra costumam gerar desperdícios, atrasos e custos que poderiam ter sido evitados." },
      { icone: "Layers", titulo: "Projetos Desconectados", descricao: "A falta de integração entre arquitetura, estrutura e instalações aumenta o risco de conflitos no canteiro." },
    ],
  },
  agenda: {
    titulo: { antes: "O que vamos apresentar nesta ", destaque: "Consultoria", depois: ":" },
    subtitulo: "O arquiteto Thiago Cardim vai mostrar os principais erros cometidos por quem pretende construir e como tomar decisões mais seguras antes da obra.",
    estilo: "lista",
    itens: [
      { titulo: "Terreno: O que precisa ser analisado antes de começar o projeto da sua casa." },
      { titulo: "Projeto e Orçamento: Como alinhar o que você deseja construir ao valor disponível." },
      { titulo: "Decisões Antecipadas: O que precisa ser definido no projeto e não deve ser deixado para a obra." },
      { titulo: "Consultoria ao Vivo: Envie suas dúvidas sobre terreno, projeto, orçamento e construção." },
    ],
    cta: "Garantir meu acesso gratuito",
  },
  hosts: {
    titulo: { antes: "Planejamento, Arquitetura e Decisões Mais Seguras" },
    itens: [
      {
        nome: "Thiago Cardim",
        cargo: "Arquiteto",
        titulo: "CEO YouCon",
        foto: midia("img/thiago-cardim.png"),
        descricao: "Arquiteto especialista em projetos residenciais de alto padrão, com mais de 400 projetos desenvolvidos em 60 cidades pelo Brasil. À frente da YouCon, lidera uma equipe integrada de arquitetura, engenharia, interiores e orçamento, ajudando famílias a tomarem decisões mais seguras antes da construção.",
      },
    ],
  },
  cta: {
    titulo: { antes: "As decisões que evitam erros na obra começam no projeto. ", destaque: "Inscreva-se agora." },
    descricao: "Participe de uma consultoria gratuita com um arquiteto e entenda como planejar melhor a construção da sua casa, evitando desperdícios, retrabalhos e custos futuros.",
    data: "01/07",
    horario: "20:00",
    local: "Call fechada ao vivo (Meet)",
  },
  formulario: { titulo: "Garanta seu acesso gratuito", redirect: "https://chat.whatsapp.com/BxXxLl9oORFDK16nmeBaX7" },
};
