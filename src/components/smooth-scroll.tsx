"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis: Lenis | undefined;
    let frame = 0;

    try {
      lenis = new Lenis({ duration: 1.08, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true, syncTouch: false, wheelMultiplier: .88, touchMultiplier: 1.15 });
      const raf = (time: number) => { lenis?.raf(time); frame = requestAnimationFrame(raf); };
      frame = requestAnimationFrame(raf);
    } catch {
      // Native scroll remains fully usable if motion initialization fails.
    }

    return () => { cancelAnimationFrame(frame); lenis?.destroy(); };
  }, []);
  return null;
}
