import { US_DOT_GRID, HUBS } from "./us-dots";

export function USCoverageMap() {
  const rows = US_DOT_GRID.length;
  const cols = US_DOT_GRID[0].length;
  const cell = 20;
  const hubSet = new Set(HUBS.map(([c, r]) => `${c},${r}`));

  return (
    <svg viewBox={`0 0 ${cols * cell} ${rows * cell}`} className="w-full" role="img"
      aria-label="Stylized map of nationwide US service coverage">
      {US_DOT_GRID.flatMap((row, r) =>
        row.split("").map((ch, c) => {
          if (ch !== "#") return null;
          const isHub = hubSet.has(`${c},${r}`);
          return (
            <circle
              key={`${c}-${r}`}
              cx={c * cell + cell / 2} cy={r * cell + cell / 2}
              r={isHub ? 5 : 2.5}
              fill={isHub ? "#3d52e8" : "#ccd4ef"}
            />
          );
        }),
      )}
    </svg>
  );
}
