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
        <line key={i} x1={n.x + 40} y1="60" x2={NODES[i + 1].x - 40} y2="60" stroke="#1a1a1f" strokeWidth="2" />
      ))}
      {NODES.slice(0, -1).map((n, i) => (
        <circle key={`p${i}`} r="3" fill="#d6453d" className="motion-pulse">
          <animateMotion
            dur="2.4s" repeatCount="indefinite" begin={`${i * 0.8}s`}
            path={`M ${n.x + 40} 60 L ${NODES[i + 1].x - 40} 60`}
          />
        </circle>
      ))}
      {NODES.map((n) => (
        <g key={n.label}>
          <rect x={n.x - 40} y="35" width="80" height="50" rx="6" fill="#111114" stroke="#1a1a1f" />
          <circle cx={n.x - 28} cy="47" r="2.5" fill="#3ecf8e" />
          <text x={n.x} y="66" textAnchor="middle" fill="#f5f5f4" fontSize="10" fontFamily="var(--font-mono)">
            {n.label}
          </text>
          <text x={n.x} y="105" textAnchor="middle" fill="#63636b" fontSize="9" fontFamily="var(--font-mono)">
            {n.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}
