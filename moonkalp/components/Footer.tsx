import Rail from "@/components/Rail";
import { site, team } from "@/lib/site";

export default function Footer() {
  return (
    <footer id="team" className="ft dk">
      <div className="ft-top">
        <div>
          <p className="lbl o">The team</p>
          <h2 className="d h2" style={{ marginTop: 16 }}>The people<br />behind the reels</h2>
        </div>
        <p className="lead mut" style={{ maxWidth: "36ch" }}>{site.teamIntro}</p>
      </div>

      <Rail>
        {team.map((m, i) => (
          <article key={i} className="tm">
            <div className="tm-p" style={m.photo ? { backgroundImage: `url(${m.photo})` } : undefined}>
              <span className="lbl">0{i + 1}</span>
              {!m.photo && <b>{m.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}</b>}
            </div>
            <div className="tm-i">
              <h3 className="d h3">{m.name}</h3>
              <p className="lbl mut" style={{ marginTop: 8 }}>{m.role}</p>
              <p className="fun">{m.fun}</p>
            </div>
          </article>
        ))}
      </Rail>

      <div className="ft-cols">
        <div><h4 className="lbl">Say hello</h4>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp us ↗</a>
        </div>
        {/*<div><h4 className="lbl">Follow</h4>{site.social.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noopener noreferrer">{n} ↗</a>)}</div>*/}
        <div><h4 className="lbl">Explore</h4>{[["Services", "#services"], ["Process", "#process"], ["Ways to work", "#ways"], ["Contact", "#contact"]].map(([n, h]) => <a key={n} href={h}>{n}</a>)}</div>
      </div>

      <p className="d wm">MOONKALP</p>
      <div className="ft-base"><p className="mut">© 2026 MoonKalp · CreativeFlow Studio</p><a className="lbl" href="#home">Back to top ↑</a></div>
    </footer>
  );
}
