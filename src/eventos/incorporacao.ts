import { midia } from "@/lib/midia";
import type { EventoConfig } from "./tipos";

/** Workshop de Incorporação Imobiliária, 23/07/2026. A estrutura padrão dos eventos veio daqui. */
export const incorporacao: EventoConfig = {
  slug: "incorporacao",
  webhookEvento: "incorporacao",
  tema: "verde",
  meta: {
    titulo: "Workshop Incorporação | YouCon + SMH",
    descricao:
      "Workshop gratuito com Thiago Cardim (YouCon) e Samuel Mosca (SMH) sobre como transformar terrenos em empreendimentos que constroem patrimônio.",
    ogImage: midia("img/open-graph-incorporacao.png"),
  },
  banner: {
    antes: "Workshop gratuito e ao vivo em:",
    depois: "O Workshop já começou!",
    dataIso: "2026-07-23T20:00:00-03:00",
    rotuloData: "23/07/2026 às 20h",
  },
  hero: {
    tag: "Workshop exclusivo: Incorporação Imobiliária",
    titulo: { antes: "Como estruturar empreendimentos imobiliários ", destaque: "viáveis e rentáveis", depois: "." },
    subtitulo: [
      { texto: "Thiago Cardim", forte: true },
      { texto: " e " },
      { texto: "Samuel Mosca", forte: true },
      { texto: " mostram como projeto, viabilidade e estratégia de incorporação precisam trabalhar juntos para reduzir erros e aumentar o potencial do empreendimento." },
    ],
    imagemDesktop: midia("img/inc-hero-desktop.jpg"),
    imagemMobile: midia("img/inc-hero-mobile.jpg"),
    cta: "Quero garantir minha vaga",
    rodape: "Evento online e gratuito",
    provaSocial: "+50 pessoas já confirmaram presença",
  },
  beneficios: {
    titulo: { antes: "O que transforma um projeto em um ", destaque: "empreendimento viável", depois: "?" },
    subtitulo: "Um empreendimento rentável não depende apenas de uma boa ideia. Ele exige decisões técnicas e estratégicas que conectem produto, projeto, mercado e incorporação desde o início.",
    itens: [
      { icone: "Landmark", titulo: "Produto imobiliário", descricao: "Definir público, posicionamento, tipologias e diferenciais é fundamental para criar um produto alinhado à demanda do mercado." },
      { icone: "LayoutGrid", titulo: "Projeto e viabilidade", descricao: "O projeto precisa equilibrar legislação, aproveitamento, custos, funcionalidade e potencial comercial." },
      { icone: "TrendingUp", titulo: "Estratégia de incorporação", descricao: "A modelagem do negócio deve conectar parceiros, investimentos, etapas e decisões para reduzir riscos e preservar a rentabilidade." },
    ],
  },
  video: {
    src: midia("incorporacao/workshop-incorporacao.mp4"),
    poster: midia("incorporacao/workshop-incorporacao-poster.jpg"),
    legenda: "Assista ao vídeo e entenda o que você vai aprender neste Workshop.",
  },
  grafico: true,
  publico: {
    titulo: { antes: "Para quem é ", destaque: "este Workshop" },
    subtitulo: "Um encontro para quem deseja estruturar novos empreendimentos, aprimorar projetos em desenvolvimento ou tomar decisões mais seguras na incorporação imobiliária.",
    itens: [
      { icone: "Building2", titulo: "Já atua com incorporação", descricao: "Para incorporadores que desejam aprimorar seus processos, reduzir erros e estruturar empreendimentos com mais segurança." },
      { icone: "FileSearch", titulo: "Tem um projeto em estudo", descricao: "Para quem está avaliando um novo empreendimento e precisa conectar produto, projeto e viabilidade antes de avançar." },
      { icone: "TrendingUp", titulo: "Quer entrar no mercado", descricao: "Para investidores e profissionais que desejam entender como funciona a estruturação de uma incorporação imobiliária." },
      { icone: "HardHat", titulo: "Atua no setor imobiliário", descricao: "Para arquitetos, engenheiros, corretores, construtores e profissionais que participam do desenvolvimento de empreendimentos." },
    ],
  },
  agenda: {
    titulo: { antes: "O que vamos abordar ", destaque: "neste Workshop", depois: ":" },
    subtitulo: "Um encontro direto e prático sobre as decisões que determinam a viabilidade, a estruturação e o potencial de um empreendimento imobiliário.",
    estilo: "timeline",
    itens: [
      { titulo: "Como funciona uma incorporação imobiliária", descricao: "Entenda as principais etapas, decisões e agentes envolvidos na estruturação de um empreendimento." },
      { titulo: "Definição do produto imobiliário", descricao: "Veja como público, localização, demanda, posicionamento e estratégia comercial influenciam o produto que será desenvolvido." },
      { titulo: "Estudo de viabilidade", descricao: "Entenda como legislação, área construída, custos, preço de venda e mercado precisam ser analisados antes de avançar." },
      { titulo: "Projeto arquitetônico estratégico", descricao: "Descubra como as decisões de projeto impactam aproveitamento, custos, funcionalidade e potencial comercial." },
      { titulo: "Estruturação da incorporação", descricao: "Veja como projeto, planejamento, parceiros, investimentos e execução precisam trabalhar de forma integrada." },
      { titulo: "Modelos de parceria e participação", descricao: "Conheça possibilidades de negociação entre incorporadores, investidores, proprietários e parceiros estratégicos." },
      { titulo: "Erros que comprometem o empreendimento", descricao: "Identifique falhas de projeto, planejamento e estruturação que podem gerar atrasos, custos extras e perda de rentabilidade." },
    ],
    cta: "Quero participar dessa aula",
  },
  hosts: {
    titulo: { antes: "Duas visões estratégicas sobre ", destaque: "projeto e incorporação" },
    subtitulo: "Arquitetura e incorporação reunidas para mostrar como decisões técnicas e estratégicas precisam caminhar juntas na estruturação de um empreendimento.",
    itens: [
      {
        nome: "Thiago Cardim",
        cargo: "Arquiteto e CEO da YouCon Arquitetura",
        foto: midia("img/thiago-cardim.png"),
        descricao: "À frente da YouCon Arquitetura, Thiago Cardim atua no desenvolvimento de projetos completos e estudos de viabilidade para empreendimentos imobiliários. Durante o Workshop, vai mostrar como decisões arquitetônicas influenciam o aproveitamento, os custos, a funcionalidade e o potencial comercial do empreendimento.",
      },
      {
        nome: "Samuel Mosca",
        cargo: "Especialista em Incorporação Imobiliária e sócio-fundador da SMH Patrimonial",
        foto: midia("img/samuel-mosca.jpg"),
        descricao: "Formado em Direito e sócio-fundador da SMH Patrimonial, Samuel Mosca atua na estruturação estratégica de negócios e empreendimentos imobiliários. Durante o Workshop, vai abordar a modelagem da incorporação, os principais riscos, as possibilidades de parceria e as decisões necessárias para viabilizar o negócio.",
      },
    ],
  },
  cta: {
    titulo: { antes: "Um empreendimento rentável começa com ", destaque: "decisões bem estruturadas", depois: "." },
    descricao: "Participe deste Workshop gratuito com Thiago Cardim e Samuel Mosca e entenda como integrar projeto, viabilidade e incorporação para desenvolver empreendimentos mais seguros e preparados para o mercado.",
    data: "23/07",
    horario: "20h",
    local: "Sala fechada no Google Meet",
  },
  formulario: { titulo: "Garanta seu acesso gratuito", redirect: "https://chat.whatsapp.com/BxXxLl9oORFDK16nmeBaX7" },
};
