"use client";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

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

  { c: "a", t: "Is it just me?", cap: "Hook · 00:00", dur: "5s" },
  { c: "b", t: "You're not alone.", cap: "Turn · 00:12", dur: "7s" },
  { c: "c", t: "Book today.", cap: "Action · 00:36", dur: "6s" },

];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const move = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current!, r = el.getBoundingClientRect();
    el.style.setProperty("--x", String((e.clientX - r.left) / r.width - 0.5));
    el.style.setProperty("--y", String((e.clientY - r.top) / r.height - 0.5));
    el.style.setProperty("--px", `${e.clientX - r.left}px`);
    el.style.setProperty("--py", `${e.clientY - r.top}px`);
    el.classList.add("live");
  };
  return (
    <section id="home" ref={ref} className="hx" onPointerMove={move} onPointerLeave={() => ref.current?.classList.remove("live")}>
      <div className="vf lbl" aria-hidden>
        <i /><i /><i /><i />
        <span className="rec fi" style={css({ "--dl": "2.2s" })}>REC <Timecode /></span>
        <span className="r fi" style={css({ "--dl": "2.4s" })}>24 fps · 9:16 · Reel 01</span>
        <span className="b cue fi" style={css({ "--dl": "2.8s" })}>Scroll to play</span>
        <span className="b2 fi" style={css({ "--dl": "2.8s" })}>Open to new projects and good stories</span>
      </div>
      <div className="focus" aria-hidden />

      <div className="copy">
        <p className="lbl o fi" style={css({ "--dl": "1.4s" })}>Creative Tech Studio · CreativeFlow Studio</p>
        <h1 className="d hl">
          <span className="ln"><i style={css({ "--i": 0 })}>We make content</i></span>
          <span className="ln"><i style={css({ "--i": 1 })}>people actually</i></span>
          <span className="ln"><i style={css({ "--i": 2 })}>
            <em>stop for.
              <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden><path pathLength={1} d="M4 14 C 50 3, 110 18, 170 8 S 260 14, 296 5" /></svg>
            </em>
          </i></span>
        </h1>
        <p className="note fi" style={css({ "--dl": "3s" })}>
          <svg viewBox="0 0 50 40" aria-hidden><path d="M44 36 C 28 38, 8 28, 6 6 M6 6 L1 17 M6 6 L17 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          made by humans,<br />no stock footage. ever.
        </p>
        <div className="cta fi" style={css({ "--dl": "2s" })}>
          <a className="btn" href="#services">Our services</a>
          <a className="btn" href="#contact">Contact us</a>
        </div>
      </div>

      <div className="reels" aria-hidden>
        {reels.map((r, k) => (
          <div key={r.c} className={`rc ${r.c}`} style={css({ "--k": k })}>
            <div className="rc-in">
              <small><b>● Reel</b><b>0{k + 1}</b></small>
              <p className="tx">{r.t}</p>
              <div><div className="bar" style={css({ "--t": r.dur })} /><small style={{ marginTop: 8 }}>{r.cap}</small></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
