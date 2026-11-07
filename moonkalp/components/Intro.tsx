"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Logo from "@/components/Logo";

gsap.registerPlugin(MotionPathPlugin);

const TRAIL = "M120 760 C 380 700, 640 560, 958 318";

// Opening sequence: the swoosh draws a horizon, "Moon" rises from behind it,
// the Devanagari wordmark writes itself, the arrow flies in on a trail, then
// the whole mark glides into the header while the curtain lifts.
export default function Intro() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const html = document.documentElement;
    const q = gsap.utils.selector(el);
    const stage = q(".intro-stage")[0] as HTMLElement;
    const num = q(".intro-n")[0] as HTMLElement;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const land = () => {
      html.classList.add("landed");
      window.dispatchEvent(new Event("mk:landed"));
      el.style.display = "none";
    };
    const ready = () => {
      html.classList.add("ready");
      window.dispatchEvent(new Event("mk:ready"));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ready();
      const t = gsap.to(el, { autoAlpha: 0, duration: 0.5, delay: 0.3, onComplete: land });
      return () => { t.kill(); };
    }

    const ctx = gsap.context(() => {
      const letters = q(".lg-moon");
      gsap.set(letters, { y: 300 });
      gsap.set(q(".lg-line"), { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set(q(".lg-kclip"), { attr: { width: 0 } });
      gsap.set(q(".lg-arrow"), { opacity: 0, transformOrigin: "50% 50%" });
      gsap.set(q(".intro-trail path"), { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(stage, { visibility: "visible" });

      const counter = { v: 0 };
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(counter, { v: 100, duration: 2.9, ease: "power2.inOut", onUpdate: () => { num.textContent = String(Math.round(counter.v)).padStart(3, "0"); } }, 0)
        .to(q(".intro-bar i"), { scaleX: 1, duration: 2.9, ease: "power2.inOut" }, 0)
        .from(q(".intro-meta > *"), { y: 20, opacity: 0, stagger: 0.08, duration: 0.8 }, 0.1)
        .to(q(".lg-line"), { scaleX: 1, duration: 1.1, ease: "expo.inOut" }, 0.15)
        .fromTo(q(".intro-glow"), { opacity: 0, yPercent: 40, scale: 0.6 }, { opacity: 1, yPercent: 0, scale: 1, duration: 2.4, ease: "power3.out" }, 0.4)
        .to(letters, { y: 0, duration: 1.3, stagger: 0.1 }, 0.7)
        .to(q(".lg-kclip"), { attr: { width: 440 }, duration: 1, ease: "power2.inOut" }, 1.25)
        .to(q(".intro-trail path"), { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, 1.55)
        .fromTo(q(".lg-arrow"),
          { opacity: 0, scale: 0.35, rotation: -18 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.95, ease: "power2.inOut",
            motionPath: { path: [{ x: -840, y: 440 }, { x: -470, y: 330 }, { x: -170, y: 110 }, { x: 0, y: 0 }], curviness: 1.1 } }, 1.55)
        .to(q(".intro-trail path"), { strokeDashoffset: -1, duration: 0.8, ease: "power2.in" }, 2.35)
        .fromTo(q(".lg-arrow"), { scale: 1.18 }, { scale: 1, duration: 0.7, ease: "elastic.out(1, 0.45)" }, 2.5)
        .fromTo(q(".intro-flash"), { opacity: 0.9, scale: 0.2 }, { opacity: 0, scale: 2.4, duration: 0.9, ease: "power2.out" }, 2.5)
        .addLabel("exit", 3.25)
        .add(() => {
          ready();
          const target = document.querySelector(".hd-logo .logo-svg");
          const from = stage.getBoundingClientRect();
          if (!target) return;
          const to = target.getBoundingClientRect();
          gsap.to(stage, { x: to.left - from.left, y: to.top - from.top, scale: to.width / from.width, transformOrigin: "0 0", duration: 1.15, ease: "expo.inOut" });
        }, "exit")
        .to(q(".intro-meta, .intro-bar"), { opacity: 0, duration: 0.4, ease: "power1.out" }, "exit")
        .to(q(".intro-glow"), { opacity: 0, duration: 0.8 }, "exit")
        .to(q(".intro-bg"), { yPercent: -100, duration: 1.15, ease: "expo.inOut" }, "exit+=0.1")
        .add(land, "exit+=1.2");
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="intro" ref={root} aria-hidden>
      <div className="intro-bg" />
      <div className="intro-glow" />
      <div className="intro-stage">
        <svg className="intro-trail" viewBox="215 245 850 401" overflow="visible">
          <defs>
            <linearGradient id="intro-tr" gradientUnits="userSpaceOnUse" x1="120" y1="760" x2="958" y2="318">
              <stop offset="0" stopColor="#136af7" stopOpacity="0" />
              <stop offset="1" stopColor="#6d7bff" />
            </linearGradient>
          </defs>
          <path d={TRAIL} pathLength={1} fill="none" stroke="url(#intro-tr)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <Logo id="intro" />
        <i className="intro-flash" />
      </div>
      <div className="intro-meta">
        <span>CreativeFlow Studio</span>
        <span className="intro-n">000</span>
      </div>
      <div className="intro-bar"><i /></div>
    </div>
  );
}
