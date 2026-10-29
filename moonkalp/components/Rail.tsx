"use client";
import { useRef, type ReactNode } from "react";

export default function Rail({ children }: { children: ReactNode }) {
  const r = useRef<HTMLDivElement>(null);
  const go = (d: number) => r.current?.scrollBy({ left: d * 360, behavior: "smooth" });
  return (
    <>
      <div className="rail" ref={r}>{children}</div>
      <div className="rail-nav">
        <button onClick={() => go(-1)} aria-label="Previous">←</button>
        <button onClick={() => go(1)} aria-label="Next">→</button>
      </div>
    </>
  );
}
