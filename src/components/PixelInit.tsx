"use client";

import { useEffect } from "react";
import { initPixel } from "@/lib/pixel";

/** Dispara o Meta Pixel uma vez, no cliente. */
export function PixelInit() {
  useEffect(() => { initPixel(); }, []);
  return null;
}
