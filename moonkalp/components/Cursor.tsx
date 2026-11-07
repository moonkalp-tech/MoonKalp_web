"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// Custom cursor for mouse users: a dot plus a trailing ring that grows over
// links, and shows a label over anything with data-cursor="Label".
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const d = dot.current!, r = ring.current!, label = r.querySelector("span")!;
    document.documentElement.classList.add("has-cursor");
    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" }), dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.5, ease: "power3" }), ry = gsap.quickTo(r, "y", { duration: 0.5, ease: "power3" });

    const move = (e: PointerEvent) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      r.classList.add("on"); d.classList.add("on");
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const lab = t.closest<HTMLElement>("[data-cursor]");
      const link = t.closest("a, button, label, input, textarea, select");
      label.textContent = lab?.dataset.cursor ?? "";
      r.classList.toggle("lab", !!lab);
      r.classList.toggle("link", !lab && !!link);
    };
    const leave = () => { r.classList.remove("on"); d.classList.remove("on"); };
    const down = () => r.classList.add("down"), up = () => r.classList.remove("down");

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <>
      <div className="cur-ring" ref={ring} aria-hidden><span /></div>
      <div className="cur-dot" ref={dot} aria-hidden />
    </>
  );
}
