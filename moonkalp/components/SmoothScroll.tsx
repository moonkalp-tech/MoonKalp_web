"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window { __lenis?: Lenis }
}

// Inertia scrolling (Lenis) driven by GSAP's ticker so ScrollTrigger stays in sync.
// Scrolling is paused while the intro plays and resumes when the logo lands.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, anchors: true,prevent: (n) => !!n.closest?.(".menu") });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const html = document.documentElement;
    if (!html.classList.contains("landed")) lenis.stop();
    const start = () => { lenis.start(); ScrollTrigger.refresh(); };
    window.addEventListener("mk:landed", start);

    return () => {
      window.removeEventListener("mk:landed", start);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
  return null;
}
