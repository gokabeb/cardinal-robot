const NODES = [
  { x: 40, label: "Robot fleet", sub: "SDK on device" },
  { x: 220, label: "Mutual TLS", sub: "2-way auth + encryption" },
  { x: 400, label: "Cardinal cloud", sub: "or on-premises" },
  { x: 580, label: "Operator dashboard", sub: "RBAC + SSO" },
];

export function SecurityFlowDiagram() {
  return (
    <svg viewBox="0 0 660 140" className="w-full" role="img"
      aria-label="Data flow: robot fleet, over mutual TLS, to Cardinal cloud, to operator dashboard">
      {NODES.slice(0, -1).map((n, i) => (
        <line key={i} x1={n.x + 40} y1="60" x2={NODES[i + 1].x - 40} y2="60" stroke="#e3e8f5" strokeWidth="2" />
      ))}
      {NODES.slice(0, -1).map((n, i) => (
        <circle key={`p${i}`} r="3" fill="#3d52e8" className="motion-pulse">
          <animateMotion
            dur="2.4s" repeatCount="indefinite" begin={`${i * 0.8}s`}
            path={`M ${n.x + 40} 60 L ${NODES[i + 1].x - 40} 60`}
          />
        </circle>
      ))}
      {NODES.map((n) => (
        <g key={n.label}>
          <rect x={n.x - 40} y="35" width="80" height="50" rx="6" fill="#f6f8fd" stroke="#e3e8f5" />
          <circle cx={n.x - 28} cy="47" r="2.5" fill="#0e9f6e" />
          <text x={n.x} y="66" textAnchor="middle" fill="#0c1033" fontSize="10" fontFamily="var(--font-inter)">
            {n.label}
          </text>
          <text x={n.x} y="105" textAnchor="middle" fill="#6a7194" fontSize="9" fontFamily="var(--font-inter)">
            {n.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}
