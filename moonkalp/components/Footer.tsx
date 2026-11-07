import type { CSSProperties } from "react";
import Logo from "@/components/Logo";
import { site, team } from "@/lib/site";

export default function Footer() {
  return (
    <footer id="team" className="ft">
      <div className="ft-top">
        <div>
          <p className="lbl acc">The team</p>
          <h2 className="h-xl" data-split>The people<br />behind the <em>reels</em></h2>
        </div>
        <p className="lead mut" data-reveal>{site.teamIntro}</p>
      </div>

      <div className="team">
        {team.map((m, i) => (
          <article key={m.name} className="tm" data-reveal style={{ "--i": i } as CSSProperties}>
            <div className="tm-p" style={m.photo ? { backgroundImage: `url(${m.photo})` } : undefined}>
              <span className="lbl">{String(i + 1).padStart(2, "0")}</span>
              {!m.photo && <b aria-hidden>{m.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}</b>}
              <p className="tm-fun">{m.fun}</p>
            </div>
            <div className="tm-i">
              <h3>{m.name}</h3>
              <p className="lbl mut">{m.role}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="ft-cols">
        <div><h4 className="lbl">Say hello</h4>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp us ↗</a>
        </div>
        {site.social.length > 0 && (
          <div><h4 className="lbl">Follow</h4>{site.social.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noopener noreferrer">{n} ↗</a>)}</div>
        )}
        <div><h4 className="lbl">Explore</h4>{[["Services", "#services"], ["Process", "#process"], ["Ways to work", "#ways"], ["Contact", "#contact"]].map(([n, h]) => <a key={n} href={h}>{n}</a>)}</div>
      </div>

      <div className="ft-logo"><Logo id="ft" /></div>
      <div className="ft-base"><p className="mut">© 2026 MoonKalp · CreativeFlow Studio</p><a className="lbl" href="#home">Back to top ↑</a></div>
    </footer>
  );
}
