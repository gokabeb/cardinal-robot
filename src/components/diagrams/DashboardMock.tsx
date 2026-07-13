const FLEET_ROWS = [
  { name: "S50-PRO / FLOOR 2", status: "Cleaning", pct: 72 },
  { name: "TITAN-04 / DOCK B", status: "Delivering", pct: 45 },
  { name: "UVC-11 / ROOM 214", status: "Disinfecting", pct: 88 },
  { name: "V40-02 / LOBBY", status: "Charging", pct: 31 },
];

export function DashboardMock() {
  return (
    <figure>
      <div className="overflow-hidden rounded-lg border border-ink-800 bg-ink-900">
        <div className="flex items-center justify-between border-b border-ink-800 px-5 py-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-400">Cardinal Fleet Console</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-status" />
            <span className="font-mono text-xs text-status">LIVE</span>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-ink-800 border-b border-ink-800 text-center">
          {[["Units online", "24"], ["Coverage today", "148k sq ft"], ["Open tickets", "0"]].map(([k, v]) => (
            <div key={k} className="px-4 py-5">
              <p className="font-display text-2xl text-ink-50">{v}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-400">{k}</p>
            </div>
          ))}
        </div>
        <ul className="divide-y divide-ink-800">
          {FLEET_ROWS.map((r) => (
            <li key={r.name} className="flex items-center gap-4 px-5 py-3.5">
              <span className="h-1.5 w-1.5 rounded-full bg-status" />
              <span className="flex-1 font-mono text-xs text-ink-50">{r.name}</span>
              <span className="font-mono text-xs text-ink-400">{r.status}</span>
              <span className="hidden h-1 w-24 overflow-hidden rounded bg-ink-800 sm:block">
                <span className="block h-full bg-cardinal-500" style={{ width: `${r.pct}%` }} />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-3 text-center font-mono text-xs text-ink-400">
        Illustrative interface. Dashboards report KPIs, scheduling, ROI, and operational visibility.
      </figcaption>
    </figure>
  );
}
