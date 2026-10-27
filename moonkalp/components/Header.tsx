"use client";
import { useEffect, useState } from "react";

const cols: [string, [string, string][]][] = [
  ["Studio", [["About", "#about"], ["Built for", "#for"], ["The difference", "#why"]]],
  ["Services", ["Motion Graphics", "Video Production", "Social Media", "Meta Ads", "SEO", "Websites"].map((s) => [s, "#services"] as [string, string])],
  ["Work", [["Playground", "#playground"], ["Process", "#process"], ["Ways to work", "#ways"]]],
  ["Say hello", [["Contact", "#contact"]]],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  return (
    <>
      <header className="hd">
        <button className={`burger${open ? " x" : ""}`} onClick={() => setOpen(!open)} aria-expanded={open}>
          <b /> {open ? "Close" : "Menu"}
        </button>
        <a href="#home" className="logo" onClick={() => setOpen(false)}>MOONKALP</a>
        <a href="#contact" className="hide" onClick={() => setOpen(false)}>Contact</a>
      </header>
      <nav className={`menu${open ? " open" : ""}`}>
        {cols.map(([h, links]) => (
          <div key={h}>
            <h4 className="lbl">{h}</h4>
            {links.map(([t, href], i) => (
              <a key={t} href={href} style={{ "--i": i } as React.CSSProperties} onClick={() => setOpen(false)}>{t}</a>
            ))}
          </div>
        ))}
      </nav>
    </>
  );
}
