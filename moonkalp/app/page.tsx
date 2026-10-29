import type { CSSProperties } from "react";
import Reveal from "@/components/Reveal";
import Rail from "@/components/Rail";
import ContactForm from "@/components/ContactForm";

const v = (i: number) => ({ "--i": i } as CSSProperties);
const ticker = ["Scroll-stopping reels", "Honest storytelling", "Planned to the frame", "Ads that bring inquiries", "Reports you can read"];
const audience = [
  ["Clinics & healthcare", "sensitive topics, told with care"], ["Schools & coaching", "admissions, events, results"],
  ["Cafés & restaurants", "make them hungry in 3 seconds"], ["Real estate", "walkthroughs that sell the feeling"],
  ["Startups", "explain the product, fast"], ["Retail & local shops", "offers people actually notice"],
  ["Personal brands", "experts who should be famous"], ["Events & launches", "before, during and after"],
];
const services: [string, string, string, string[], string][] = [
  ["Motion Graphics Reels", "Under 60 seconds", "Illustrated, voice-over storytelling reels in your brand style. Nobody has to appear on camera.", ["Scripts", "Storyboards", "Animation", "Subtitles"], "You're not alone"],
  ["Video Production", "Shoots & edits", "Planned shoots, talking-head videos, events and edits, handled by our in-house video team.", ["Shoot planning", "Filming", "Editing", "Colour"], "REC 00:12:08"],
  ["Social Media", "Every month", "A monthly content calendar, reels and posts on fixed days, captions and publishing across your platforms.", ["Calendar", "Posts", "Captions", "Publishing"], "Mon Tue Wed Thu Fri"],
  ["Meta Ads", "Facebook + Instagram", "Campaigns that bring genuine inquiries, with lead forms, WhatsApp buttons and tracking you can trust.", ["Targeting", "Lead forms", "Tracking", "Optimising"], "+1 inquiry"],
  ["SEO", "Audits & reports", "Page-by-page website audits, keyword research, local SEO and clear monthly search reports.", ["Audits", "Keywords", "Local SEO", "Reports"], "your brand near me"],
  ["Websites", "Mobile first", "Fast, modern websites and landing pages, with booking flows, forms and the legal basics in place.", ["Design", "Development", "Landing pages", "Care"], "Mobile first"],
];
const usual = ["Posting whenever there's time", "Stock videos that look like everyone else", "One agency for ads, another for video", "Boosting posts and hoping", "Reports full of jargon, or no report", "Big promises about followers"];
const ours = ["A content calendar, posts on fixed days", "Illustrated reels made only for your brand", "Content, video, ads and SEO under one roof", "Ads planned, tracked and improved monthly", "A simple report you can read in 5 minutes", "Honest targets, measured every month"];
const formats = [["awareness", "Feeling stressed? let's talk."], ["explainer", "Plan · Create · Grow"], ["storytelling", "the turning point"], ["ad cut", "Book today. Message us."]];
const story = [
  ["Hook", "00:00", "Is it just me?", "a question the viewer already asks themselves."], ["Problem", "00:05", "Feel it", "show the feeling, not the facts."],
  ["Turn", "00:12", "You're not alone.", "the moment the story flips."], ["How", "00:20", "Three steps", "three simple steps, one per beat."],
  ["Journey", "00:28", "The path", "a path forward the viewer can picture."], ["Action", "00:36", "Book today", "always end with one clear next step."],
];
const steps = [
  ["Discover", "we study your brand, audience and accounts, and set clear goals together."], ["Script & storyboard", "every scene, line and timing mapped out before anything moves."],
  ["Create", "animation, shoots, editing and design, with two rounds of changes built in."], ["Grow & report", "we publish, run ads, measure what works and report every month."],
];
const plans: [string, string, string, string[]][] = [
  ["Most popular", "Monthly plan", "your full content team, every month.", ["Content calendar", "Reels & posts", "Shoot sessions", "Meta ads", "Monthly report"]],
  ["Short & sweet", "Reel series", "a set of motion graphics reels for a launch or campaign.", ["Scripts & storyboards", "Animation & voice-over", "Ad cuts"]],
  ["Build once", "Website project", "a fast, modern site that turns visitors into inquiries.", ["Design & build", "Booking & forms", "SEO basics"]],
  ["Start here", "Audit & plan", "a page-by-page look at where you stand, and what to fix first.", ["Social audit", "Website audit", "Growth plan"]],
];
const monthly = ["A content calendar, approved before anything goes live", "Reels and posts, published on fixed days", "Scripts and captions written for your audience", "Planned shoot sessions", "Meta ads set up, tracked and improved", "Two rounds of changes on every creative", "A shared workspace with your own login", "One clear report, every single month"];

export default function Home() {
  return (
    <>
      <section id="home" className="hero dk">
        <p className="lbl o" style={v(0)}>Creative Tech Studio · CreativeFlow Studio</p>
        <h1 className="d h1" style={v(1)}>We make content that people actually stop for.</h1>
        <div className="cta" style={v(2)}>
          <a className="btn" href="#services">Our services</a>
          <a className="btn" href="#contact">Contact us</a>
        </div>
        <p className="lbl mut" style={{ ...v(3), marginTop: 40 }}>Open to new projects and good stories ↓</p>
      </section>

      <div className="mq"><div>{[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => <span key={i}>{t} ✦</span>)}</div></div>

      <section id="about" className="lt">
        <Reveal><p className="lbl">The studio · 00:00 → 00:42</p></Reveal>
        <Reveal><h2 className="d h2" style={{ margin: "24px 0 40px", maxWidth: "16ch" }}>Every frame, planned.</h2></Reveal>
        <Reveal className="two">
          <p className="lead">We're a small creative team that gets a little too excited about turning big ideas into tiny, scroll-stopping stories. We care about the script, the timing, the last frame, and work that genuinely helps a brand get seen and trusted.</p>
          <p className="lead mut">Motion Graphics · Video Production · Social Media · Meta Ads · SEO · Websites</p>
        </Reveal>
      </section>

      <section id="for" className="dk">
        <Reveal><h2 className="d h2">Built for</h2><p className="lead mut" style={{ margin: "16px 0 56px", maxWidth: "36ch" }}>brands with something real to say, and not enough time to say it well.</p></Reveal>
        <div className="grid">
          {audience.map(([t, s], i) => (
            <Reveal key={t} className="cell" delay={(i % 4) * 80}><h3 className="d h3">{t}</h3><p className="mut">{s}</p></Reveal>
          ))}
        </div>
      </section>

      <section id="services" className="dk2">
        <Reveal><h2 className="d h2" style={{ marginBottom: 56 }}>Services</h2></Reveal>
        <div className="stack">
          {services.map(([t, tag, desc, items, art], n) => (
            <article key={t} className="svc" style={{ "--n": n } as CSSProperties}>
              <div>
                <p className="lbl o">Service 0{n + 1} · {tag}</p>
                <h3 className="d h3 big" style={{ margin: "20px 0" }}>{t}</h3>
                <p className="lead mut" style={{ maxWidth: "42ch" }}>{desc}</p>
                <ul className="tags">{items.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div className="art d">{art}</div>
            </article>
          ))}
        </div>
      </section>

      <section id="why" className="lt">
        <Reveal><h2 className="d h2" style={{ marginBottom: 56 }}>The difference</h2></Reveal>
        <div className="two">
          <Reveal><h3 className="lbl">The usual way</h3><ul className="list x">{usual.map((s) => <li key={s}>{s}</li>)}</ul></Reveal>
          <Reveal delay={120}><h3 className="lbl o">The MoonKalp way</h3><ul className="list y">{ours.map((s) => <li key={s}>{s}</li>)}</ul></Reveal>
        </div>
      </section>

      <section id="playground" className="dk">
        <Reveal><h2 className="d h2">How a reel is born</h2><p className="lead mut" style={{ margin: "16px 0 48px", maxWidth: "40ch" }}>every reel starts on paper. here's what a 40-second storyboard looks like before a single frame moves.</p></Reveal>
        <Rail>
          {story.map(([k, time, big, d]) => (
            <div key={k} className="card"><p className="lbl o">{k} · {time}</p><h3 className="d h3" style={{ margin: "48px 0 16px" }}>{big}</h3><p className="mut">{d}</p></div>
          ))}
        </Rail>
        <div className="grid">
          {formats.map(([f, t]) => <div key={f} className="cell"><p className="lbl o">{f}</p><h3 className="d h3" style={{ marginTop: 40 }}>{t}</h3></div>)}
        </div>
      </section>

      <section id="process" className="dk2">
        <Reveal><h2 className="d h2" style={{ marginBottom: 56 }}>The process</h2></Reveal>
        <div className="grid g4">
          {steps.map(([t, d], i) => (
            <Reveal key={t} className="cell" delay={i * 100}><span className="num d">0{i + 1}</span><h3 className="d h3" style={{ margin: "24px 0 12px" }}>{t}</h3><p className="mut">{d}</p></Reveal>
          ))}
        </div>
      </section>

      <section id="ways" className="lt">
        <Reveal><h2 className="d h2" style={{ marginBottom: 56 }}>Ways to work</h2></Reveal>
        <div className="plans">
          {plans.map(([badge, t, d, items], i) => (
            <Reveal key={t} className={`plan${i === 0 ? " hot" : ""}`} delay={i * 80}>
              <p className="lbl">{badge}</p><h3 className="d h3" style={{ margin: "24px 0 12px" }}>{t}</h3><p>{d}</p>
              <ul className="list y sm">{items.map((x) => <li key={x}>{x}</li>)}</ul>
            </Reveal>
          ))}
        </div>
        <Reveal><h3 className="d h3" style={{ margin: "88px 0 24px" }}>Every month, you get</h3><ul className="list y cols">{monthly.map((m) => <li key={m}>{m}</li>)}</ul></Reveal>
      </section>

      <div className="mq"><div>{Array.from({ length: 8 }, (_, i) => <span key={i}>Let's make it move ✦</span>)}</div></div>

      <section id="contact" className="dk">
        <Reveal><h2 className="d h1">Let's talk</h2><p className="lead mut" style={{ margin: "16px 0 56px", maxWidth: "40ch" }}>Got a project, a hard problem, or just want to say hi? Send it. We read every single message.</p></Reveal>
        <ContactForm />
      </section>

      <footer className="ft dk">
        <p className="d wm">MOONKALP</p>
        <div><p className="mut">© 2026 MoonKalp · CreativeFlow Studio</p><a className="lbl" href="#home">Back to top ↑</a></div>
      </footer>
    </>
  );
}
