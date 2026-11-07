"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// All scroll-driven motion for the page, wired by data attributes / class names
// so the sections themselves can stay server components.
//   [data-reveal]   fade + rise when scrolled into view
//   [data-split]    heading lines rise out of a mask
//   [data-words]    paragraph lights up word by word while scrolling
//   [data-speed]    parallax drift (positive = slower than scroll)
//   [data-magnetic] element leans toward the cursor
export default function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const splits: SplitText[] = [];
    const cleanups: (() => void)[] = [];

    if (!reduce) document.documentElement.classList.add("mo");

    const ctx = gsap.context(() => {
      if (reduce) return;

      // -- generic reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => gsap.set(el, { opacity: 0, y: 56 }));
      const show = (els: Element[]) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.09, overwrite: true });
      ScrollTrigger.batch("[data-reveal]", { start: "top 88%", end: "bottom top", once: true, onEnter: show, onLeave: show, onEnterBack: show });

      // -- masked heading lines
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const s = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "sl" });
        splits.push(s);
        gsap.from(s.lines, { yPercent: 115, rotate: 2.5, duration: 1.2, ease: "expo.out", stagger: 0.09, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });

      // -- word-by-word paragraph
      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((el) => {
        const s = SplitText.create(el, { type: "words" });
        splits.push(s);
        gsap.fromTo(s.words, { opacity: 0.14 }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } });
      });

      // -- parallax
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const sp = parseFloat(el.dataset.speed || "0.2");
        gsap.fromTo(el, { yPercent: -sp * 50 }, { yPercent: sp * 50, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // -- marquees: always moving, speed + direction follow the scroll
      gsap.utils.toArray<HTMLElement>(".mq").forEach((mq) => {
        const track = mq.querySelector<HTMLElement>(".mq-t")!;
        const dir = mq.dataset.dir === "r" ? 1 : -1;
        const base = 50 / parseFloat(mq.dataset.dur || "38");
        const wrap = gsap.utils.wrap(-50, 0);
        const setX = gsap.quickSetter(track, "xPercent");
        let pos = 0, vel = 0, sign = 1, ts = 1, vis = false;
        ScrollTrigger.create({
          trigger: mq, start: "top bottom", end: "bottom top",
          onToggle: (self) => { vis = self.isActive; },
          onUpdate: (self) => { vel = Math.min(Math.abs(self.getVelocity()) / 260, 5); sign = self.direction === 1 ? 1 : -1; },
        });
        const tick = (_t: number, dt: number) => {
          if (!vis) return;
          vel *= 0.92;
          ts += ((1 + vel) * sign - ts) * 0.12;
          pos += dir * base * ts * (dt / 1000);
          setX(wrap(pos));
        };
        gsap.ticker.add(tick);
        cleanups.push(() => gsap.ticker.remove(tick));
      });

      // -- services: cards stack, the ones underneath sink back
      const cards = gsap.utils.toArray<HTMLElement>(".svc");
      const mm = gsap.matchMedia();
      cleanups.push(() => mm.revert());
      mm.add("(min-width: 901px)", () => {
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.querySelector(".svc-in"), {
            scale: 0.9, opacity: 0.35, filter: "blur(2px)", ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 18%", scrub: true },
          });
        });

        // -- storyboard: vertical scroll drives a horizontal film strip
        const hs = document.querySelector<HTMLElement>(".hs");
        const track = hs?.querySelector<HTMLElement>(".hs-track");
        if (hs && track) {
          const head = hs.querySelector<HTMLElement>(".hs-bar b span")!;
          const dist = () => {
            const cs = getComputedStyle(hs);
            return Math.max(0, track.scrollWidth - window.innerWidth + parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight));
          };
          gsap.to(track, {
            x: () => -dist(), ease: "none",
            scrollTrigger: {
              trigger: hs, start: "top top", end: () => `+=${dist()}`, scrub: 0.6, pin: true, invalidateOnRefresh: true, anticipatePin: 1,
              onUpdate: (self) => {
                hs.style.setProperty("--p", self.progress.toFixed(4));
                head.textContent = `00:${p2(Math.round(self.progress * 42))}`;
              },
            },
          });
        }
      });

      // -- process: the timeline line fills as you read
      const pl = document.querySelector(".proc-line i");
      if (pl) gsap.fromTo(pl, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".proc-steps", start: "top 70%", end: "bottom 60%", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".step").forEach((s) =>
        ScrollTrigger.create({ trigger: s, start: "top 65%", end: "bottom 35%", toggleClass: "on" })
      );

      // -- "the usual way" gets crossed out line by line
      ScrollTrigger.batch(".vs-list li", { start: "top 85%", once: true, onEnter: (els) => els.forEach((el, i) => setTimeout(() => el.classList.add("in"), i * 110)) });

      // -- footer: the logo rises from its horizon, like the intro
      const fl = document.querySelector(".ft-logo");
      if (fl) {
        const tl = gsap.timeline({ scrollTrigger: { trigger: fl, start: "top 92%", once: true } });
        tl.from(fl.querySelectorAll(".lg-moon"), { y: 300, duration: 1.4, ease: "expo.out", stagger: 0.08 })
          .from(fl.querySelector(".lg-line"), { scaleX: 0, transformOrigin: "0% 50%", duration: 1.2, ease: "expo.inOut" }, 0)
          .from(fl.querySelector(".lg-kclip"), { attr: { width: 0 }, duration: 1, ease: "power2.inOut" }, 0.5)
          .from(fl.querySelector(".lg-arrow"), { x: -260, y: 160, opacity: 0, scale: 0.4, duration: 1.1, ease: "power3.out" }, 0.7);
      }
    });

    // -- magnetic buttons (mouse only)
    if (!reduce && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const m = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
        };
        const l = () => { xTo(0); yTo(0); };
        el.addEventListener("pointermove", m);
        el.addEventListener("pointerleave", l);
        cleanups.push(() => { el.removeEventListener("pointermove", m); el.removeEventListener("pointerleave", l); });
      });
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("mk:landed", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("mk:landed", refresh);
      cleanups.forEach((c) => c());
      ctx.revert();
      splits.forEach((s) => s.revert());
    };
  }, []);
  return null;
}

const p2 = (n: number) => String(n).padStart(2, "0");
