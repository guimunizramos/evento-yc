import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PixelInit } from "@/components/PixelInit";
import { SITE_URL } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: "YouCon Projetos" }],
  icons: { icon: "/favicon.ico" },
  alternates: { types: { "text/markdown": "/llms.txt" } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // A classe da fonte vai no <html>, senão o token --font-inter não chega ao body
    <html lang="pt-BR" className={`${inter.variable} dark`}>
      <body>
        <PixelInit />
        {children}
      </body>
    </html>
  );
}
