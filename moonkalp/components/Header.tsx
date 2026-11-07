"use client";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Logo from "@/components/Logo";
import { nav, site } from "@/lib/site";

gsap.registerPlugin(ScrambleTextPlugin);

const quick: [string, string][] = [["About", "#about"], ["Services", "#services"], ["Playground", "#playground"], ["Process", "#process"], ["Ways to work", "#ways"]];

const scramble = (e: MouseEvent<HTMLElement>) => {
  const el = e.currentTarget.querySelector<HTMLElement>("[data-t]");
  if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.to(el, { duration: 0.6, scrambleText: { text: el.dataset.t!, chars: "MOONKALP01", speed: 0.6, revealDelay: 0.1 }, overwrite: true });
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 160 && y > last.current + 2 ? true : y < last.current - 2 ? false : (h) => h);
      last.current = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const l = window.__lenis;
    if (open) l?.stop(); else if (document.documentElement.classList.contains("landed")) l?.start();
    document.documentElement.classList.toggle("menu-open", open);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`hd${hidden && !open ? " is-hidden" : ""}${scrolled ? " is-scrolled" : ""}`}>
        <a href="#home" className="hd-logo pill" onClick={close} aria-label="MoonKalp, back to top">
          <Logo id="hd" />
        </a>
        <nav className="hd-nav pill" aria-label="Sections">
          {quick.map(([t, h]) => (
            <a key={t} href={h} onMouseEnter={scramble}><span data-t={t}>{t}</span></a>
          ))}
        </nav>
        <div className="hd-r">
          <a href="#contact" className="hd-cta" onClick={close} onMouseEnter={scramble}><i /><span data-t="Contact">Contact</span></a>
          <button className={`burger pill${open ? " x" : ""}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="menu">
            <span className="burger-l">{open ? "Close" : "Menu"}</span>
            <b><i /><i /></b>
          </button>
        </div>
      </header>

      <nav id="menu" className={`menu${open ? " open" : ""}`} aria-hidden={!open} inert={!open}>
        <div className="menu-cols">
          {nav.map(([h, links], c) => (
            <div key={h} className="menu-col" style={{ "--c": c } as CSSProperties}>
              <h4 className="lbl">{String(c + 1).padStart(2, "0")} / {h}</h4>
              {links.map(([t, href], i) => (
                <a key={t} href={href} style={{ "--i": i } as CSSProperties} onClick={close}><span>{t}</span></a>
              ))}
            </div>
          ))}
        </div>
        <div className="menu-foot">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
        </div>
        <div className="menu-mark" aria-hidden><Logo id="menu" /></div>
      </nav>
    </>
  );
}
