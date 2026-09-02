import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";
import { eventos } from "@/eventos";

export default function sitemap(): MetadataRoute.Sitemap {
  const online = Object.values(eventos).map((e) => ({ url: `${SITE_URL}/${e.slug}`, changeFrequency: "weekly" as const, priority: e.slug ? 0.8 : 1 }));
  // A imersão presencial tem página própria, fora do template dos eventos online
  return [...online, { url: `${SITE_URL}/incorp2026`, changeFrequency: "weekly", priority: 0.9 }];
}
