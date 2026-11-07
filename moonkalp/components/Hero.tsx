"use client";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import gsap from "gsap";
import { logoPaths } from "@/lib/logo-paths";

const css = (o: Record<string, string | number>) => o as CSSProperties;
const p2 = (n: number) => String(n).padStart(2, "0");

function Timecode() {
  const [t, setT] = useState("00:00:00:00");
  useEffect(() => {
    const t0 = Date.now();
    const id = setInterval(() => {
      const ms = Date.now() - t0, s = Math.floor(ms / 1000);
      setT(`00:${p2(Math.floor(s / 60) % 60)}:${p2(s % 60)}:${p2(Math.floor((ms % 1000) / 41.67))}`);
    }, 42);
    return () => clearInterval(id);
  }, []);
  return <span>{t}</span>;
}

const reels = [
  { c: "a", l: "Reel", t: "Is it just me?", cap: "Hook · 00:00", dur: "5s" },
  { c: "b", l: "Website", t: "Mobile first.", cap: "yourbrand.com", dur: "7s" },
  { c: "c", l: "Software", t: "Built around you.", cap: "Custom app · v1.0", dur: "6s" },
];

const lines = [["We", "make,", "build"], ["and", "grow", "things"]];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const arrow = useRef<HTMLDivElement>(null);
  const ecl = useRef<HTMLDivElement>(null);

  // The logo's arrow orbits the "moon", passing behind it on the far side.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = arrow.current!, box = ecl.current!;
    const tilt = (-16 * Math.PI) / 180, nose = 46.5;
    let th = 0.6, vis = true;
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; });
    io.observe(box);
    const tick = (_t: number, dt: number) => {
      if (!vis) return;
      th += dt * 0.00042;
      const w = box.clientWidth, rx = w * 0.47, ry = w * 0.14;
      const ox = rx * Math.cos(th), oy = ry * Math.sin(th);
      const x = ox * Math.cos(tilt) - oy * Math.sin(tilt), y = ox * Math.sin(tilt) + oy * Math.cos(tilt);
      const tx = -rx * Math.sin(th), ty = ry * Math.cos(th);
      const ang = (Math.atan2(tx * Math.sin(tilt) + ty * Math.cos(tilt), tx * Math.cos(tilt) - ty * Math.sin(tilt)) * 180) / Math.PI;
      const front = Math.sin(th) > 0;
      const depth = 0.72 + 0.28 * Math.sin(th);
      a.style.transform = `translate(${x}px, ${y}px) rotate(${ang + nose}deg) scale(${depth})`;
      a.style.zIndex = front ? "4" : "1";
      a.style.opacity = String(front ? 1 : 0.55);
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); io.disconnect(); };
  }, []);

  const move = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current!, r = el.getBoundingClientRect();
    el.style.setProperty("--x", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--y", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    const m = ecl.current!.getBoundingClientRect();
    const ang = (Math.atan2(e.clientY - (m.top + m.height / 2), e.clientX - (m.left + m.width / 2)) * 180) / Math.PI + 90;
    el.style.setProperty("--ang", `${ang.toFixed(1)}deg`);
  };

  let wi = 0;
  return (
    <section id="home" ref={ref} className="hero" onPointerMove={move}>
      <div className="hero-grid" aria-hidden />

      <div className="hero-top lbl">
        <span className="rise" style={css({ "--d": 0.5 })}>Creative Tech Studio · CreativeFlow Studio</span>
        <span className="rise rec" style={css({ "--d": 0.6 })} aria-hidden>REC <Timecode /></span>
        <span className="rise hide-sm" style={css({ "--d": 0.7 })}>Reels · Websites · Software</span>
      </div>

      <div className="ecl" ref={ecl} aria-hidden>
        <div className="ecl-in">
          <svg className="ecl-orbit" viewBox="-100 -100 200 200">
            <ellipse cx="0" cy="0" rx="94" ry="28" />
            <ellipse cx="0" cy="0" rx="112" ry="36" className="dash" />
          </svg>
          <div className="ecl-moon"><i /></div>
          {/* near half of the rings, drawn over the moon */}
          <svg className="ecl-orbit ecl-front" viewBox="-100 -100 200 200">
            <defs><clipPath id="hero-front"><rect x="-200" y="0" width="400" height="200" /></clipPath></defs>
            <g clipPath="url(#hero-front)">
              <ellipse cx="0" cy="0" rx="94" ry="28" />
              <ellipse cx="0" cy="0" rx="112" ry="36" className="dash" />
            </g>
          </svg>
          <div className="ecl-arrow" ref={arrow}>
            <svg viewBox="926 244 128 130">
              <defs>
                <linearGradient id="hero-a" gradientUnits="userSpaceOnUse" x1="1048" y1="249" x2="958" y2="365">
                  <stop offset="0" stopColor="#7d6bff" /><stop offset="1" stopColor="#1f79ff" />
                </linearGradient>
              </defs>
              <path d={logoPaths.arrow} fill="url(#hero-a)" />
            </svg>
          </div>
        </div>

        <div className="reels">
          {reels.map((r, k) => (
            <div key={r.c} className={`rc ${r.c}`} style={css({ "--k": k })}>
              <div className="rc-in">
                <small><b>● {r.l}</b><b>0{k + 1}</b></small>
                <p className="tx">{r.t}</p>
                <div><div className="bar" style={css({ "--t": r.dur })} /><small style={{ marginTop: 8 }}>{r.cap}</small></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h1 className="hero-h" aria-label="We make, build and grow things people stop for.">
        {lines.map((ln, li) => (
          <span key={li} className="hl-line">
            {ln.map((w) => <span key={w} className="hw"><span style={css({ "--i": wi++ })}>{w}</span></span>)}
          </span>
        ))}
        <span className="hl-line">
          <span className="hw"><span style={css({ "--i": wi++ })}>people</span></span>
          <span className="hw"><span style={css({ "--i": wi++ })}>
            <em className="hl-em">stop for.
              <svg viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden>
                <defs>
                  <linearGradient id="hero-sw" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#8793ff" stopOpacity="0" /><stop offset=".6" stopColor="#6d7bff" /><stop offset="1" stopColor="#3a2ddd" />
                  </linearGradient>
                </defs>
                <path d="M0 9 L284 9 L288 2 L300 2 L295 9.5 L283 17 L0 17 Z" fill="url(#hero-sw)" />
              </svg>
            </em>
          </span></span>
        </span>
      </h1>

      <div className="hero-foot">
        <p className="note rise" style={css({ "--d": 1.3 })}>
          <svg viewBox="0 0 50 40" aria-hidden><path d="M44 36 C 28 38, 8 28, 6 6 M6 6 L1 17 M6 6 L17 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          made by humans,<br />no templates. ever.
        </p>
        <div className="cta rise" style={css({ "--d": 1.15 })}>
          <a className="btn btn-a" href="#services" data-magnetic><span>Our services</span><i>↗</i></a>
          <a className="btn btn-g" href="#contact" data-magnetic><span>Contact us</span><i>↗</i></a>
        </div>
        <div className="hero-meta lbl rise" style={css({ "--d": 1.4 })}>
          <span className="status"><i />Open to new projects and good stories</span>
          <span className="cue">Scroll to play</span>
        </div>
      </div>
    </section>
  );
}
