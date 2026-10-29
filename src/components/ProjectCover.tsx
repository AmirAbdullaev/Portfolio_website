type Variant = 'dashboard' | 'charging' | 'warehouse' | 'mobile'

export default function ProjectCover({ variant }: { variant: Variant }) {
  return (
    <svg viewBox="0 0 640 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`g-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#151517" />
          <stop offset="100%" stopColor="#050506" />
        </linearGradient>
        <pattern id={`grid-${variant}`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="#ffffff" strokeOpacity="0.05" />
        </pattern>
      </defs>
      <rect width="640" height="400" fill={`url(#g-${variant})`} />
      <rect width="640" height="400" fill={`url(#grid-${variant})`} />

      {variant === 'dashboard' && (
        <g>
          <rect x="60" y="70" width="230" height="90" rx="10" fill="#ffffff" fillOpacity="0.04" stroke="#ffffff" strokeOpacity="0.08" />
          <rect x="310" y="70" width="270" height="90" rx="10" fill="#ffffff" fillOpacity="0.04" stroke="#ffffff" strokeOpacity="0.08" />
          <rect x="60" y="180" width="520" height="150" rx="10" fill="#ffffff" fillOpacity="0.03" stroke="#ffffff" strokeOpacity="0.08" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={90 + i * 58} y={300 - (i % 5) * 22 - 20} width="26" height={(i % 5) * 22 + 20} rx="4" fill="#ffffff" fillOpacity="0.55" />
          ))}
        </g>
      )}

      {variant === 'charging' && (
        <g>
          <rect x="230" y="60" width="180" height="280" rx="24" fill="#ffffff" fillOpacity="0.04" stroke="#ffffff" strokeOpacity="0.1" />
          <circle cx="320" cy="150" r="46" fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" />
          <path d="M320 120v25l-16 16" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" />
          <rect x="270" y="230" width="100" height="14" rx="7" fill="#ffffff" fillOpacity="0.08" />
          <rect x="270" y="256" width="70" height="14" rx="7" fill="#ffffff" fillOpacity="0.08" />
          <path d="M60 340c60-40 120-40 180 0" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="2" fill="none" />
          <path d="M400 340c60-40 120-40 180 0" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="2" fill="none" />
        </g>
      )}

      {variant === 'warehouse' && (
        <g>
          <rect x="60" y="90" width="230" height="220" rx="14" fill="#ffffff" fillOpacity="0.04" stroke="#ffffff" strokeOpacity="0.1" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={90 + i * 12} y={140} width={i % 3 === 0 ? 6 : 3} height="60" fill="#ffffff" fillOpacity="0.5" />
          ))}
          <rect x="90" y="220" width="170" height="16" rx="4" fill="#ffffff" fillOpacity="0.45" />
          <rect x="90" y="248" width="120" height="16" rx="4" fill="#ffffff" fillOpacity="0.08" />
          <rect x="340" y="90" width="240" height="60" rx="10" fill="#ffffff" fillOpacity="0.03" stroke="#ffffff" strokeOpacity="0.08" />
          <rect x="340" y="164" width="240" height="60" rx="10" fill="#ffffff" fillOpacity="0.03" stroke="#ffffff" strokeOpacity="0.08" />
          <rect x="340" y="238" width="240" height="60" rx="10" fill="#ffffff" fillOpacity="0.03" stroke="#ffffff" strokeOpacity="0.08" />
        </g>
      )}

      {variant === 'mobile' && (
        <g>
          <rect x="255" y="45" width="130" height="310" rx="26" fill="#ffffff" fillOpacity="0.04" stroke="#ffffff" strokeOpacity="0.12" />
          <rect x="273" y="75" width="94" height="14" rx="7" fill="#ffffff" fillOpacity="0.1" />
          <rect x="273" y="105" width="94" height="70" rx="10" fill="#ffffff" fillOpacity="0.35" />
          <rect x="273" y="187" width="94" height="16" rx="6" fill="#ffffff" fillOpacity="0.08" />
          <rect x="273" y="211" width="60" height="16" rx="6" fill="#ffffff" fillOpacity="0.08" />
          <rect x="273" y="300" width="94" height="34" rx="17" fill="#ffffff" fillOpacity="0.12" />
        </g>
      )}
    </svg>
  )
}
