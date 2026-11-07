import type { CSSProperties } from "react";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Motion from "@/components/Motion";
import { site } from "@/lib/site";

const ticker = ["Scroll-stopping reels", "Fast websites", "Custom software", "Ads that bring inquiries", "Honest storytelling", "Reports you can read"];

const audience = [
  ["Clinics & healthcare", "sensitive topics, told with care"], ["Schools & coaching", "admissions, events, results"],
  ["Cafés & restaurants", "make them hungry in 3 seconds"], ["Real estate", "walkthroughs that sell the feeling"],
  ["Startups", "from landing page to working MVP"], ["Retail & local shops", "online stores and offers people notice"],
  ["Personal brands", "experts who should be famous"], ["Growing businesses", "from spreadsheets to custom software"],
];
const services: [string, string, string, string[], string][] = [
  ["Motion Graphics Reels", "Under 60 seconds", "Illustrated, voice-over storytelling reels in your brand style. Nobody has to appear on camera.", ["Scripts", "Storyboards", "Animation", "Subtitles"], "You're not alone"],
  ["Video Production", "Shoots & edits", "Planned shoots, talking-head videos, events and edits, handled by our in-house video team.", ["Shoot planning", "Filming", "Editing", "Colour"], "REC 00:12:08"],
  ["Social Media", "Every month", "A monthly content calendar, reels and posts on fixed days, captions and publishing across your platforms.", ["Calendar", "Posts", "Captions", "Publishing"], "Mon Tue Wed Thu Fri"],
  ["Meta Ads", "Facebook + Instagram", "Campaigns that bring genuine inquiries, with lead forms, WhatsApp buttons and tracking you can trust.", ["Targeting", "Lead forms", "Tracking", "Optimising"], "+1 inquiry"],
  ["SEO", "Audits & reports", "Page-by-page website audits, keyword research, local SEO and clear monthly search reports.", ["Audits", "Keywords", "Local SEO", "Reports"], "your brand near me"],
  ["Websites & E-commerce", "Mobile first", "Fast, modern websites, online stores and landing pages, with booking flows, forms and the legal basics in place.", ["Design", "Development", "Online stores", "Care"], "Mobile first"],
  ["Web Apps & Software", "Built around you", "Custom web apps, dashboards, customer portals, booking systems and internal tools, built around how your business actually works.", ["Web apps", "Dashboards", "Portals", "Automation"], "npm run launch"],
  ["APIs & Integrations", "Everything connected", "Payments, WhatsApp, CRMs, email and third-party tools wired together, so your data flows without copy-pasting.", ["APIs", "Payments", "WhatsApp", "CRM sync"], "{ connected: true }"],
];
const usual = ["Posting whenever there's time", "Stock videos that look like everyone else", "One agency for ads, another for video, another for the site", "Boosting posts and hoping", "Reports full of jargon, or no report", "Big promises about followers"];
const ours = ["A content calendar, posts on fixed days", "Illustrated reels made only for your brand", "Content, video, ads, SEO and software under one roof", "Ads planned, tracked and improved monthly", "A simple report you can read in 5 minutes", "Honest targets, measured every month"];
const formats = [["awareness", "Feeling stressed? let's talk."], ["explainer", "Plan · Create · Grow"], ["storytelling", "the turning point"], ["ad cut", "Book today. Message us."]];
const story = [
  ["Hook", "00:00", "Is it just me?", "a question the viewer already asks themselves."], ["Problem", "00:05", "Feel it", "show the feeling, not the facts."],
  ["Turn", "00:12", "You're not alone.", "the moment the story flips."], ["How", "00:20", "Three steps", "three simple steps, one per beat."],
  ["Journey", "00:28", "The path", "a path forward the viewer can picture."], ["Action", "00:36", "Book today", "always end with one clear next step."],
];
const steps = [
  ["Discover", "we study your brand, audience and accounts, and set clear goals together."], ["Plan & design", "scripts, storyboards, wireframes and prototypes, mapped out before anything moves."],
  ["Build & create", "animation, shoots, editing, design and development, with two rounds of changes built in."], ["Launch & grow", "we go live, run ads, measure what works and report every month."],
];
const plans: [string, string, string, string[]][] = [
  ["Most popular", "Monthly plan", "your full content team, every month.", ["Content calendar", "Reels & posts", "Shoot sessions", "Meta ads", "Monthly report"]],
  ["Short & sweet", "Reel series", "a set of motion graphics reels for a launch or campaign.", ["Scripts & storyboards", "Animation & voice-over", "Ad cuts"]],
  ["Build once", "Website or web app", "a fast site or custom web app that turns visitors into customers.", ["Design & development", "Booking, forms & payments", "SEO basics"]],
  ["Start here", "Audit & plan", "a page-by-page look at where you stand, and what to fix first.", ["Social audit", "Website audit", "Growth plan"]],
];
const monthly = ["A content calendar, approved before anything goes live", "Reels and posts, published on fixed days", "Scripts and captions written for your audience", "Planned shoot sessions", "Meta ads set up, tracked and improved", "Two rounds of changes on every creative", "A shared workspace with your own login", "One clear report, every single month"];
const studioLine = "Motion Graphics · Video · Social Media · Meta Ads · SEO · Websites · Web Apps · Integrations";

const pad = (n: number) => String(n).padStart(2, "0");
const Check = () => <svg viewBox="0 0 20 20" aria-hidden><path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Cross = () => <svg viewBox="0 0 20 20" aria-hidden><path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;

function Head({ n, label }: { n: number; label?: string }) {
  return (
    <div className="sec-head lbl">
      <span>({pad(n)})</span>
      {label && <span>{label}</span>}
      <i />
    </div>
  );
}

// A small, different visual per service, built from each service's own tagline.
function Art({ n, art }: { n: number; art: string }) {
  switch (n) {
    case 0:
      return <div className="va va-phone"><span className="va-chip">● Reel</span><p>{art}</p><div className="va-sub"><i /><i /></div><div className="va-prog"><i /></div></div>;
    case 1:
      return <div className="va va-rec"><i /><i /><i /><i /><p><b />{art}</p><span className="va-cross" /></div>;
    case 2:
      return <div className="va va-week">{art.split(" ").map((d, i) => <div key={d} className={i % 2 === 0 ? "on" : ""}><span>{d}</span><i /><i /></div>)}</div>;
    case 3:
      return <div className="va va-ads">{[0, 1, 2].map((i) => <div key={i} className="va-toast" style={{ "--i": i } as CSSProperties}><b /><span>{art}</span></div>)}</div>;
    case 4:
      return <div className="va va-seo"><div className="va-search"><span>{art}</span><i /></div>{[0, 1, 2].map((i) => <div key={i} className="va-res"><i /><i /></div>)}</div>;
    case 5:
      return <div className="va va-web"><div className="va-bar"><i /><i /><i /></div><p>{art}</p><div className="va-mob" /></div>;
    case 6:
      return <div className="va va-term"><div className="va-bar"><i /><i /><i /></div><p><span>$</span> {art}<b /></p>{[0, 1, 2, 3].map((i) => <i key={i} className="va-ln" style={{ "--i": i } as CSSProperties} />)}</div>;
    default:
      return <div className="va va-api">{[0, 1, 2, 3, 4, 5].map((i) => <i key={i} className="va-node" style={{ "--i": i } as CSSProperties} />)}<p>{art}</p></div>;
  }
}

export default function Home() {
  const band = [...ticker, ...ticker, ...ticker, ...ticker];
  return (
    <>
      <Hero />

      <div className="bands">
        <div className="mq mq-a" data-dir="l" data-dur="46"><div className="mq-t">{band.map((t, i) => <span key={i} aria-hidden={i >= ticker.length || undefined}>{t}<i>✦</i></span>)}</div></div>
        <div className="mq mq-b" data-dir="r" data-dur="52" aria-hidden><div className="mq-t">{band.map((t, i) => <span key={i}>{t}<i>✦</i></span>)}</div></div>
      </div>

      <section id="about" className="sec paper about">
        <Head n={1} label="The studio · 00:00 → 00:42" />
        <h2 className="h-xl" data-split>Every detail, <em>planned.</em></h2>
        <div className="about-grid">
          <div className="badge" aria-hidden>
            <svg viewBox="0 0 200 200">
              <defs><path id="badge-c" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
              <text><textPath href="#badge-c" textLength="486" lengthAdjust="spacing">MoonKalp · CreativeFlow Studio · MoonKalp · CreativeFlow Studio ·</textPath></text>
            </svg>
            <span>✦</span>
          </div>
          <div>
            <p className="about-lead" data-words>We&apos;re a small creative and engineering team that gets a little too excited about turning big ideas into scroll-stopping stories, fast websites and software that just works. We care about the script, the timing, the last line of code, and work that genuinely helps a brand get seen and trusted.</p>
            <p className="about-tags" data-reveal aria-label={studioLine}>
              {studioLine.split(" · ").map((s) => <span key={s} aria-hidden>{s}</span>)}
            </p>
          </div>
        </div>
      </section>

      <section id="for" className="sec ink">
        <Head n={2} />
        <div className="split-head">
          <h2 className="h-xl" data-split>Built for</h2>
          <p className="lead mut" data-reveal>brands with something real to say, and not enough time to say it well.</p>
        </div>
        <ul className="for-list">
          {audience.map(([t, s], i) => (
            <li key={t} data-reveal>
              <span className="fl-n lbl">{pad(i + 1)}</span>
              <h3 className="fl-t">{t}</h3>
              <p className="fl-s">{s}</p>
              <span className="fl-a" aria-hidden>↗</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="services" className="sec ink2 svcs">
        <Head n={3} />
        <div className="split-head">
          <h2 className="h-xl" data-split>Services</h2>
        </div>
        <div className="stack">
          {services.map(([t, tag, desc, items, art], n) => (
            <article key={t} className="svc" style={{ "--n": n } as CSSProperties}>
              <div className={`svc-in t${n % 3}`}>
                <div className="svc-copy">
                  <p className="lbl svc-tag"><span>Service {pad(n + 1)}</span><span>{tag}</span></p>
                  <h3 className="svc-t">{t.split(" ").map((w, i) => <span key={i} className={w.includes("-") ? "nw" : undefined}>{i > 0 && " "}{w}</span>)}</h3>
                  <p className="svc-d">{desc}</p>
                  <ul className="tags">{items.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
                <div className="svc-vis" aria-hidden><Art n={n} art={art} /></div>
                <span className="svc-num" aria-hidden>{pad(n + 1)}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="why" className="sec paper">
        <Head n={4} />
        <h2 className="h-xl" data-split>The <em>difference</em></h2>
        <div className="vs">
          <div className="vs-col old" data-reveal>
            <h3 className="lbl">The usual way</h3>
            <ul className="vs-list x">{usual.map((s) => <li key={s}><Cross /><span>{s}</span></li>)}</ul>
          </div>
          <div className="vs-mid" aria-hidden><span>vs</span></div>
          <div className="vs-col new" data-reveal>
            <h3 className="lbl">The MoonKalp way</h3>
            <ul className="vs-list y">{ours.map((s) => <li key={s}><Check /><span>{s}</span></li>)}</ul>
          </div>
        </div>
      </section>

      <section id="playground" className="sec ink hs">
        <div className="hs-track">
          <div className="hs-intro">
            <Head n={5} />
            <h2 className="h-xl" data-split>How a reel is <em>born</em></h2>
            <p className="lead mut">every reel starts on paper. here&apos;s what a 40-second storyboard looks like before a single frame moves.</p>
          </div>
          {story.map(([k, time, big, d], i) => (
            <article key={k} className="frame" style={{ "--i": i } as CSSProperties}>
              <div className="frame-top lbl"><span>{k}</span><span>{time}</span></div>
              <div className="frame-scr"><span className="frame-n">{pad(i + 1)}</span><h3>{big}</h3></div>
              <p className="mut">{d}</p>
            </article>
          ))}
        </div>
        <div className="hs-time lbl" aria-hidden>
          <span>00:00</span>
          <div className="hs-bar"><i /><b><span>00:00</span></b></div>
          <span>00:42</span>
        </div>
      </section>

      <div className="sec ink formats">
        {formats.map(([f, t], i) => (
          <div key={f} className="fmt" data-reveal>
            <p className="lbl"><span>{pad(i + 1)}</span>{f}</p>
            <h3>{t}</h3>
          </div>
        ))}
      </div>

      <section id="process" className="sec ink2 proc">
        <div className="proc-l">
          <Head n={6} />
          <h2 className="h-xl" data-split>The <em>process</em></h2>
        </div>
        <div className="proc-steps">
          <div className="proc-line" aria-hidden><i /></div>
          {steps.map(([t, d], i) => (
            <div key={t} className="step">
              <span className="step-n">{pad(i + 1)}</span>
              <div><h3>{t}</h3><p>{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="ways" className="sec paper">
        <Head n={7} />
        <h2 className="h-xl" data-split>Ways to <em>work</em></h2>
        <div className="plans">
          {plans.map(([badge, t, d, items], i) => (
            <article key={t} className={`plan${i === 0 ? " hot" : ""}`} data-reveal>
              <div className="plan-top"><p className="lbl plan-b">{badge}</p><span className="lbl">{pad(i + 1)}</span></div>
              <h3>{t}</h3>
              <p className="plan-d">{d}</p>
              <ul className="checks">{items.map((x) => <li key={x}><Check />{x}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="monthly">
          <h3 className="h-l" data-split>Every month, you get</h3>
          <ul className="checks cols" data-reveal>{monthly.map((m) => <li key={m}><Check />{m}</li>)}</ul>
        </div>
      </section>

      <a href="#contact" className="mq mq-cta" data-dir="l" data-dur="34" data-cursor="Let's talk">
        <div className="mq-t">{Array.from({ length: 8 }, (_, i) => <span key={i} aria-hidden={i > 0 || undefined}>Let&apos;s build something<i>✦</i></span>)}</div>
      </a>

      <section id="contact" className="sec ink contact">
        <div className="contact-l">
          <Head n={8} />
          <h2 className="h-mega" data-split>Let&apos;s <em>talk</em></h2>
          <p className="lead mut" data-reveal>Got a project, a hard problem, or just want to say hi? Send it. We read every single message.</p>
          <div className="direct" data-reveal>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp us ↗</a>
          </div>
        </div>
        <div className="contact-r" data-reveal><ContactForm /></div>
      </section>

      <Footer />
      {/* must live inside the page (not the layout) so it runs after this segment hydrates */}
      <Motion />
    </>
  );
}
