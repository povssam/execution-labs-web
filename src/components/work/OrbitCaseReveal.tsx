const rows = [
  ["Release task", "Assigned"],
  ["Asset follow up", "Drafted"],
  ["Deadline risk", "Escalated"],
  ["Manager update", "Sent"],
];

export function OrbitCaseReveal() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-charcoal/50 p-5 sm:p-6">
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-50" />
      <div className="pointer-events-none absolute left-0 top-12 h-px w-1/3 bg-bone/80 orbit-scan" />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
              Orbit agent
            </span>
            <h2 className="mt-2 text-2xl font-medium text-bone">
              Work moves before someone has to chase it.
            </h2>
          </div>
          <span className="hidden rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200 sm:inline-flex">
            Live queue
          </span>
        </div>
        <div className="mt-8 grid gap-3">
          {rows.map(([task, state], i) => (
            <div
              key={task}
              className="orbit-row flex items-center justify-between gap-4 rounded-xl border border-line bg-ink/60 px-4 py-3"
              style={{ "--orbit-delay": `${i * 0.08}s` } as React.CSSProperties}
            >
              <span className="text-sm text-bone">{task}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">
                {state}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
