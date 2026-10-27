"use client";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [n, setN] = useState(0);
  const [out, setOut] = useState(false);
  useEffect(() => {
    let v = 0;
    const t = setInterval(() => {
      v += 4;
      setN(Math.min(v, 100));
      if (v >= 100) { clearInterval(t); setTimeout(() => setOut(true), 250); }
    }, 30);
    return () => clearInterval(t);
  }, []);
  return (
    <div className={`pre${out ? " out" : ""}`} aria-hidden>
      <span className="pre-w">MOONKALP</span>
      <span className="pre-n">{String(n).padStart(3, "0")}</span>
      <i style={{ transform: `scaleX(${n / 100})` }} />
    </div>
  );
}
