/**
 * Original schematic of the MAESTRO idea (not experimental data):
 * seen (frames) + said (speech, chunked) + heard (non-speech audio) -> unified representation -> agent loop -> verdict.
 * Pure SVG in the site's palette; hover animation is driven by CSS (.showcase:hover .ma-*).
 */
const N = 42;
const speech = Array.from({ length: N }, (_, i) => 8 + 40 * Math.abs(Math.sin(i * 0.63) * Math.cos(i * 0.21 + 0.4)) + (i % 5));
const sound = Array.from({ length: N }, (_, i) => (i >= 22 && i <= 29 ? 26 + 34 * Math.abs(Math.sin(i * 1.3)) : 3 + (i * 7) % 5));
const rows = [
  { tag: "V", w: 150, c: "#a5a7ff" },
  { tag: "S", w: 118, c: "#dcdcff" },
  { tag: "V", w: 168, c: "#a5a7ff" },
  { tag: "A", w: 96, c: "#7476e0" },
  { tag: "S", w: 140, c: "#dcdcff" },
  { tag: "V", w: 126, c: "#a5a7ff" },
];

export function MaestroArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1600 600" className={className} role="img" aria-label="Schematic of MAESTRO: video frames, speech and non-speech audio are merged into a unified representation, which an agent reasons over before giving a verdict with an explanation." preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="ma-dots" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#31354c" /></pattern>
        <marker id="ma-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#a5a7ff" /></marker>
      </defs>
      <rect width="1600" height="600" fill="#11121c" />
      <rect width="1600" height="600" fill="url(#ma-dots)" opacity=".7" />

      {/* seen */}
      <text x="60" y="62" className="font-mono" fontSize="13" fill="#aaaec8">seen · frames</text>
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 60 + i * 104, dx = (i % 3 - 1) * 8;
        return (
          <g key={i}>
            <rect x={x} y={78} width={88} height={104} rx={6} fill="#1d2032" stroke={i === 2 ? "#a5a7ff" : "#31354c"} strokeWidth={i === 2 ? 2 : 1.5} />
            <circle cx={x + 44 + dx} cy={126} r={15} fill="#4a4d7a" />
            <path d={`M${x + 16 + dx} 182 Q${x + 44 + dx} 142 ${x + 72 + dx} 182 Z`} fill="#4a4d7a" />
          </g>
        );
      })}

      {/* said */}
      <text x="60" y="222" className="font-mono" fontSize="13" fill="#aaaec8">said · speech → semantic chunks</text>
      {speech.map((h, i) => (
        <line key={i} className="ma-bar" style={{ animationDelay: `${(i % 9) * 90}ms` }} x1={66 + i * 12} x2={66 + i * 12} y1={282 - h / 2} y2={282 + h / 2} stroke="#a5a7ff" strokeWidth={4} strokeLinecap="round" />
      ))}
      {[198, 330, 438].map((x) => <line key={x} x1={x} x2={x} y1={236} y2={338} stroke="#aaaec8" strokeWidth={1.5} strokeDasharray="4 5" />)}
      {[[60, 132], [204, 120], [336, 96], [444, 120]].map(([x, w], i) => (
        <g key={i}>
          <rect x={x} y={346} width={w} height={22} rx={11} fill="#1d2032" stroke="#31354c" />
          <rect x={x + 12} y={354} width={w * 0.5} height={6} rx={3} fill="#aaaec8" opacity=".55" />
        </g>
      ))}

      {/* heard */}
      <text x="60" y="402" className="font-mono" fontSize="13" fill="#aaaec8">heard · non-speech audio</text>
      {sound.map((h, i) => (
        <line key={i} className="ma-bar" style={{ animationDelay: `${(i % 7) * 110}ms` }} x1={66 + i * 12} x2={66 + i * 12} y1={448 - h / 2} y2={448 + h / 2} stroke={i >= 22 && i <= 29 ? "#dcdcff" : "#5b5e9e"} strokeWidth={4} strokeLinecap="round" />
      ))}
      <rect x={398} y={410} width={166} height={24} rx={12} fill="#1d2032" stroke="#a5a7ff" />
      <text x={481} y={427} textAnchor="middle" className="font-mono" fontSize="12" fill="#f0f0ff">drum hit · punchline</text>

      {/* streams converge */}
      {[[130, 230], [282, 290], [448, 350]].map(([y, ty], i) => (
        <path key={i} className="ma-flow" d={`M574 ${y} C640 ${y}, 640 ${ty}, 700 ${ty}`} fill="none" stroke="#a5a7ff" strokeWidth={2} strokeDasharray="6 6" opacity=".85" />
      ))}

      {/* unified representation */}
      <rect x={700} y={130} width={240} height={330} rx={14} fill="#1d2032" stroke="#a5a7ff" strokeWidth={2} />
      <text x={722} y={160} className="font-mono" fontSize="13" fill="#f0f0ff">unified representation</text>
      {rows.map((r, i) => (
        <g key={i}>
          <rect x={724} y={186 + i * 43} width={26} height={18} rx={4} fill={r.c} />
          <text x={737} y={199} transform={`translate(0 ${i * 43})`} textAnchor="middle" className="font-mono" fontSize="11" fontWeight="700" fill="#11121c">{r.tag}</text>
          <rect x={760} y={190 + i * 43} width={r.w} height={10} rx={5} fill="#aaaec8" opacity=".5" />
        </g>
      ))}
      <rect className="ma-pulse" x={714} y={262} width={212} height={40} rx={8} fill="none" stroke="#a5a7ff" strokeWidth={2} />

      {/* agent loop */}
      <path d="M944 290 L1048 290" stroke="#a5a7ff" strokeWidth={2} fill="none" markerEnd="url(#ma-arr)" />
      <circle className="ma-spin" cx={1110} cy={290} r={78} fill="none" stroke="#a5a7ff" strokeWidth={2} strokeDasharray="110 380" strokeLinecap="round" opacity=".85" />
      <circle cx={1110} cy={290} r={56} fill="#1d2032" stroke="#a5a7ff" strokeWidth={2} />
      <text x={1110} y={296} textAnchor="middle" className="font-mono" fontSize="17" fill="#f0f0ff">agent</text>
      <path className="ma-flow" d="M1076 240 C1030 170 960 190 930 268" fill="none" stroke="#a5a7ff" strokeWidth={2} strokeDasharray="5 6" markerEnd="url(#ma-arr)" />
      <text x={1008} y={178} className="font-mono" fontSize="12" fill="#aaaec8">zoom in</text>
      {[1000, 1082, 1164].map((x, i) => (
        <g key={x}>
          <line x1={1110} y1={348} x2={x + 28} y2={420} stroke="#31354c" strokeWidth={1.5} strokeDasharray="4 5" />
          <rect x={x} y={420} width={56} height={56} rx={10} fill="#1d2032" stroke="#a5a7ff" strokeWidth={1.5} />
          {i === 0 && <rect x={x + 15} y={435} width={26} height={26} rx={3} fill="none" stroke="#a5a7ff" strokeWidth={2} />}
          {i === 1 && <path d={`M${x + 21} 434 L${x + 21} 462 L${x + 43} 448 Z`} fill="none" stroke="#a5a7ff" strokeWidth={2} strokeLinejoin="round" />}
          {i === 2 && <circle cx={x + 28} cy={448} r={13} fill="none" stroke="#a5a7ff" strokeWidth={2} />}
          <text x={x + 28} y={498} textAnchor="middle" className="font-mono" fontSize="11" fill="#aaaec8">{["objects", "actions", "faces"][i]}</text>
        </g>
      ))}

      {/* verdict */}
      <path d="M1172 290 L1282 290" stroke="#a5a7ff" strokeWidth={2} fill="none" markerEnd="url(#ma-arr)" />
      <rect x={1290} y={256} width={250} height={68} rx={12} fill="#a5a7ff" />
      <text x={1415} y={287} textAnchor="middle" className="font-mono" fontSize="18" fontWeight="700" fill="#11121c">verdict</text>
      <text x={1415} y={309} textAnchor="middle" className="font-mono" fontSize="13" fill="#11121c">+ explanation</text>

      <text x={1560} y={578} textAnchor="end" className="font-mono" fontSize="11" fill="#aaaec8" opacity=".8">schematic of the pipeline · not experimental data</text>
    </svg>
  );
}
