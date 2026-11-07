import { LOGO_VIEWBOX, logoPaths as p } from "@/lib/logo-paths";

// The real MoonKalp mark as layered vectors. Ink parts use currentColor, so the
// logo works on dark (white ink) and light (black ink) surfaces.
// Each part has its own class so the intro and footer can animate it.
export default function Logo({ id, className = "", title = "MoonKalp" }: { id: string; className?: string; title?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={`logo-svg ${className}`} role="img" aria-label={title} overflow="visible">
      <defs>
        <linearGradient id={`${id}-a`} gradientUnits="userSpaceOnUse" x1="1048" y1="249" x2="958" y2="365">
          <stop offset="0" stopColor="#4c3aff" />
          <stop offset=".55" stopColor="#2f55ff" />
          <stop offset="1" stopColor="#136af7" />
        </linearGradient>
        <linearGradient id={`${id}-l`} gradientUnits="userSpaceOnUse" x1="220" y1="0" x2="667" y2="0">
          <stop offset="0" stopColor="#8793ff" stopOpacity="0" />
          <stop offset=".45" stopColor="#8793ff" stopOpacity=".75" />
          <stop offset=".8" stopColor="#3a2ddd" />
          <stop offset="1" stopColor="#321cd7" />
        </linearGradient>
        {/* the "horizon": Moon letters can rise from behind the swoosh line */}
        <clipPath id={`${id}-h`}>
          <rect x="150" y="150" width="1000" height="326" />
        </clipPath>
        {/* lets the Devanagari wordmark "write itself" left to right */}
        <clipPath id={`${id}-k`}>
          <rect className="lg-kclip" x="640" y="470" width="440" height="190" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-h)`} fill="currentColor">
        <path className="lg-moon lg-m" d={p.m} />
        <path className="lg-moon lg-o1" d={p.o1} />
        <path className="lg-moon lg-o2" d={p.o2} />
        <path className="lg-moon lg-n" d={p.n} />
      </g>
      <path className="lg-line" d={p.line} fill={`url(#${id}-l)`} />
      <path className="lg-kalp" d={p.kalp} fill="currentColor" clipPath={`url(#${id}-k)`} />
      <path className="lg-arrow" d={p.arrow} fill={`url(#${id}-a)`} />
    </svg>
  );
}
