/**
 * Original schematic of the SINDEX pipeline (not experimental data):
 * claim + image -> evidence retrieval (keywords -> news search -> top sentences) -> three checks
 * (truthfulness, satire, out-of-context image) -> verdict + explanation.
 * Pure SVG in the site's palette; hover animation reuses the .ma-* CSS hooks.
 */
const checks = [
  { y: 96, name: "truthfulness", sub: "claim + image + evidence" },
  { y: 236, name: "satire", sub: "is it exaggerated for effect?" },
  { y: 376, name: "out of context", sub: "does the image belong here?" },
];

export function SindexArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1600 600" className={className} role="img" aria-label="Schematic of SINDEX: a claim and its image trigger a live news evidence search; the evidence feeds checks for truthfulness, satire and out-of-context images, ending in a verdict with an explanation." preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="sx-dots" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#31354c" /></pattern>
        <marker id="sx-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#a5a7ff" /></marker>
      </defs>
      <rect width="1600" height="600" fill="#11121c" />
      <rect width="1600" height="600" fill="url(#sx-dots)" opacity=".7" />

      {/* input */}
      <text x="60" y="62" className="font-mono" fontSize="13" fill="#aaaec8">input · claim + image</text>
      <rect x="60" y="80" width="230" height="130" rx="10" fill="#1d2032" stroke="#31354c" strokeWidth="1.5" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x="80" y={102 + i * 24} width={[170, 190, 150, 110][i]} height="9" rx="4.5" fill="#aaaec8" opacity=".5" />)}
      <rect x="60" y="232" width="230" height="170" rx="10" fill="#1d2032" stroke="#31354c" strokeWidth="1.5" />
      <circle cx="110" cy="276" r="16" fill="#4a4d7a" />
      <path d="M60 402 L60 350 L140 306 L200 340 L250 316 L290 342 L290 402 Z" fill="#4a4d7a" opacity=".85" />
      <text x="175" y="424" textAnchor="middle" className="font-mono" fontSize="12" fill="#aaaec8">photo shared with the claim</text>

      {/* retrieval */}
      <text x="350" y="62" className="font-mono" fontSize="13" fill="#aaaec8">evidence · retrieved live</text>
      <path className="ma-flow" d="M290 145 C320 145, 320 128, 356 128" fill="none" stroke="#a5a7ff" strokeWidth="2" strokeDasharray="6 6" />
      <rect x="356" y="96" width="150" height="64" rx="10" fill="#1d2032" stroke="#a5a7ff" strokeWidth="2" />
      <text x="431" y="124" textAnchor="middle" className="font-mono" fontSize="13" fill="#f0f0ff">keywords</text>
      {[0, 1, 2].map((i) => <rect key={i} x={374 + i * 40} y="136" width="32" height="10" rx="5" fill={["#ffd166", "#ef6f6c", "#7bd88f"][i]} opacity=".85" />)}
      <path d="M506 128 L552 128" stroke="#a5a7ff" strokeWidth="2" fill="none" markerEnd="url(#sx-arr)" />
      <rect x="560" y="96" width="150" height="64" rx="10" fill="#1d2032" stroke="#a5a7ff" strokeWidth="2" />
      <text x="635" y="124" textAnchor="middle" className="font-mono" fontSize="13" fill="#f0f0ff">news search</text>
      <text x="635" y="144" textAnchor="middle" className="font-mono" fontSize="11" fill="#aaaec8">25 closest articles</text>
      <path d="M635 160 L635 214" stroke="#a5a7ff" strokeWidth="2" fill="none" markerEnd="url(#sx-arr)" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={560 + i * 6} y={222 + i * 6} width="150" height="120" rx="8" fill="#1d2032" stroke={i === 2 ? "#a5a7ff" : "#31354c"} strokeWidth="1.5" />
        </g>
      ))}
      {[0, 1].map((i) => <rect key={i} className="ma-pulse" x="582" y={252 + i * 36} width="106" height="22" rx="6" fill="#a5a7ff" opacity=".28" style={{ animationDelay: `${i * 300}ms` }} />)}
      <rect x="582" y="324" width="80" height="6" rx="3" fill="#aaaec8" opacity=".5" />
      <text x="635" y="372" textAnchor="middle" className="font-mono" fontSize="12" fill="#aaaec8">top 3 articles · 2 sentences each</text>

      {/* fan out to checks */}
      {checks.map((c, i) => (
        <path key={c.name} className="ma-flow" d={`M722 282 C770 282, 770 ${c.y + 36}, 820 ${c.y + 36}`} fill="none" stroke="#a5a7ff" strokeWidth="2" strokeDasharray="6 6" opacity={i === 0 ? 0.95 : 0.7} />
      ))}
      <path className="ma-flow" d="M290 100 C340 76, 770 76, 820 122" fill="none" stroke="#31354c" strokeWidth="2" strokeDasharray="4 6" />

      {/* checks */}
      <text x="820" y="62" className="font-mono" fontSize="13" fill="#aaaec8">three checks</text>
      {checks.map((c, i) => (
        <g key={c.name}>
          <rect x="820" y={c.y + 4} width="280" height="64" rx="10" fill="#1d2032" stroke={i === 0 ? "#a5a7ff" : "#31354c"} strokeWidth={i === 0 ? 2 : 1.5} />
          <text x="840" y={c.y + 32} className="font-mono" fontSize="15" fill="#f0f0ff">{c.name}</text>
          <text x="840" y={c.y + 54} className="font-mono" fontSize="11" fill="#aaaec8">{c.sub}</text>
          <circle className={i === 0 ? "ma-pulse" : undefined} cx="1070" cy={c.y + 36} r="9" fill="none" stroke="#a5a7ff" strokeWidth="2" />
        </g>
      ))}
      <text x="960" y="470" textAnchor="middle" className="font-mono" fontSize="12" fill="#aaaec8">misinformation · satire · out-of-context</text>

      {/* converge to verdict */}
      {checks.map((c) => <path key={c.name} className="ma-flow" d={`M1100 ${c.y + 36} C1160 ${c.y + 36}, 1180 282, 1240 282`} fill="none" stroke="#a5a7ff" strokeWidth="2" strokeDasharray="6 6" opacity=".8" />)}
      <path d="M1236 282 L1272 282" stroke="#a5a7ff" strokeWidth="2" fill="none" markerEnd="url(#sx-arr)" />
      <rect x="1280" y="220" width="260" height="124" rx="12" fill="#a5a7ff" />
      <text x="1410" y="262" textAnchor="middle" className="font-mono" fontSize="18" fontWeight="700" fill="#11121c">verdict</text>
      <text x="1410" y="286" textAnchor="middle" className="font-mono" fontSize="13" fill="#11121c">+ explanation citing</text>
      <text x="1410" y="306" textAnchor="middle" className="font-mono" fontSize="13" fill="#11121c">the evidence it found</text>

      <text x="1560" y="578" textAnchor="end" className="font-mono" fontSize="11" fill="#aaaec8" opacity=".8">schematic of the pipeline · not experimental data</text>
    </svg>
  );
}
