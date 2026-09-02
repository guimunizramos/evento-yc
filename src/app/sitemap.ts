import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";
import { eventos } from "@/eventos";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(eventos).map((e) => ({ url: `${SITE_URL}/${e.slug}`, changeFrequency: "weekly", priority: e.slug ? 0.8 : 1 }));
}
