"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const PIXEL_ID = "825619885244890";

/** Carrega o Meta Pixel uma única vez, no cliente. */
export function initPixel() {
  if (typeof window === "undefined" || window.fbq) return;

  type Fbq = ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[][];
    push: unknown;
    loaded: boolean;
    version: string;
  };

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;

  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  window._fbq = window._fbq ?? fbq;
  window.fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

export function trackLead() {
  if (typeof window !== "undefined" && window.fbq) window.fbq("track", "Lead");
}
