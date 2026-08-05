import { US_DOT_GRID, HUBS } from "./us-dots";

export function USCoverageMap() {
  const rows = US_DOT_GRID.length;
  const cols = US_DOT_GRID[0].length;
  const cell = 20;
  const hubSet = new Set(HUBS.map(([c, r]) => `${c},${r}`));

  return (
    <svg viewBox={`0 0 ${cols * cell} ${rows * cell}`} className="w-full" role="img"
      aria-label="Stylized map of nationwide US service coverage">
      {/* Data artwork gets real ink weight (DESIGN.md §3). The landmass dots
          were cardinal-100 at r=2.5, which read as a rendering artifact rather
          than a map; hubs now carry a halo so coverage is legible at a glance. */}
      {US_DOT_GRID.flatMap((row, r) =>
        row.split("").map((ch, c) => {
          if (ch !== "#") return null;
          const isHub = hubSet.has(`${c},${r}`);
          const cx = c * cell + cell / 2;
          const cy = r * cell + cell / 2;
          if (!isHub) {
            return <circle key={`${c}-${r}`} cx={cx} cy={cy} r={3} fill="#c3cef6" />;
          }
          return (
            <g key={`${c}-${r}`}>
              <circle cx={cx} cy={cy} r={10} fill="#2136cc" opacity={0.14} />
              <circle cx={cx} cy={cy} r={5} fill="#2136cc" />
            </g>
          );
        }),
      )}
    </svg>
  );
}
