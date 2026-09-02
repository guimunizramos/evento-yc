import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // MinIO da YouCon: toda a mídia dos eventos mora lá, fora do repositório
      { protocol: "https", hostname: "s3.lp-youconprojetos.com.br" },
    ],
  },
  async redirects() {
    return [
      // Eventos já encerrados: a URL antiga não pode virar 404 para quem chega de anúncio ou e-mail
      { source: "/steel-frame", destination: "/", permanent: false },
      { source: "/aniversario", destination: "/", permanent: false },
      { source: "/treinamento-imagens-ia", destination: "/", permanent: false },
      { source: "/projetos", destination: "/", permanent: false },
      { source: "/incorporacao-presencial", destination: "/incorp2026", permanent: false },
    ];
  },
};

export default nextConfig;
