// A lightweight, theme-matched anatomical figure for the Soma hero. Pure SVG
// (no client JS): an anterior human silhouette with a faint spine and three
// pulsing organ-system nodes — nervous (brain), cardiovascular (heart), and
// digestive (gut) — echoing the module's three-lens framing.

export function SomaBodyFigure({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 540"
      role="img"
      aria-label="Anatomical figure of a human body with highlighted nervous, cardiovascular, and digestive landmarks"
      className={className}
    >
      <defs>
        <radialGradient id="soma-glow" cx="50%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#fb7185" stopOpacity="0.18" />
          <stop offset="55%" stopColor="#fb7185" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="soma-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fb7185" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#fb7185" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* ambient glow */}
      <rect x="0" y="0" width="240" height="540" fill="url(#soma-glow)" />

      <g
        fill="url(#soma-body)"
        stroke="#fda4af"
        strokeWidth="1.4"
        strokeLinejoin="round"
      >
        {/* head */}
        <ellipse cx="120" cy="46" rx="24" ry="30" />

        {/* torso + legs silhouette */}
        <path d="M 112 70 L 128 70 C 130 84 138 88 152 96 C 158 110 150 150 146 200 C 144 214 142 226 146 242 C 150 258 156 264 154 288 C 153 350 150 420 148 472 C 147 488 146 498 140 503 L 130 503 C 128 470 127 400 122 322 L 118 322 C 113 400 112 470 110 503 L 100 503 C 94 498 93 488 92 472 C 90 420 87 350 86 288 C 84 264 90 258 94 242 C 98 226 96 214 94 200 C 90 150 82 110 88 96 C 102 88 110 84 112 70 Z" />

        {/* arms */}
        <path d="M 152 100 C 168 104 176 120 178 150 C 180 184 178 210 174 250 C 172 272 170 286 167 298 C 166 303 161 303 160 298 C 158 286 158 268 158 244 C 158 210 156 170 150 132 C 148 118 146 106 152 100 Z" />
        <path d="M 88 100 C 72 104 64 120 62 150 C 60 184 62 210 66 250 C 68 272 70 286 73 298 C 74 303 79 303 80 298 C 82 286 82 268 82 244 C 82 210 84 170 90 132 C 92 118 94 106 88 100 Z" />
      </g>

      {/* spine */}
      <line
        x1="120"
        y1="92"
        x2="120"
        y2="300"
        stroke="#fda4af"
        strokeWidth="1"
        strokeDasharray="3 5"
        strokeOpacity="0.5"
      />

      {/* organ-system landmark nodes */}
      <g>
        {/* nervous — brain */}
        <circle cx="120" cy="44" r="13" fill="none" stroke="#fb7185" strokeOpacity="0.35" />
        <circle cx="120" cy="44" r="4" fill="#fda4af" className="animate-pulse" />
        {/* cardiovascular — heart */}
        <circle cx="112" cy="150" r="11" fill="none" stroke="#fb7185" strokeOpacity="0.35" />
        <circle cx="112" cy="150" r="4" fill="#fda4af" className="animate-pulse" />
        {/* digestive — gut */}
        <circle cx="120" cy="214" r="11" fill="none" stroke="#fb7185" strokeOpacity="0.35" />
        <circle cx="120" cy="214" r="4" fill="#fda4af" className="animate-pulse" />
      </g>
    </svg>
  );
}
