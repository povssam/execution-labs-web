import { cn } from "@/lib/utils";

// Dense, premium product-UI mockup for the hero. All content is static and
// visible by default. Animation (CSS only) enhances; it never gates visibility.

function Panel({
  title,
  meta,
  className,
  children,
}: {
  title: string;
  meta?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-line bg-charcoal/70 p-3.5",
        className,
      )}
    >
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
          {title}
        </span>
        {meta}
      </div>
      {children}
    </div>
  );
}

const queue = [
  { label: "Sync release calendar", state: "run" },
  { label: "Draft client update", state: "run" },
  { label: "Reconcile ad spend", state: "queue" },
  { label: "Flag overdue tasks", state: "done" },
];

const systems = ["Agents", "Pipelines", "API", "Webhooks"];
const builds = [
  { label: "Data model", pct: 100 },
  { label: "Agent layer", pct: 92 },
  { label: "Dashboard", pct: 74 },
];
const bars = [38, 52, 46, 68, 60, 82, 74, 92];

export function ExecutionOS() {
  return (
    <div className="relative rounded-2xl border border-line bg-ink/80 p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] glass">
      {/* window chrome */}
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full border border-line" />
        <span className="h-2.5 w-2.5 rounded-full border border-line" />
        <span className="h-2.5 w-2.5 rounded-full border border-line" />
        <span className="ml-2 font-mono text-[10px] text-bone-faint">execution-os</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-bone-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 p-1">
        {/* Agent queue */}
        <Panel
          title="Agent queue"
          className="col-span-2"
          meta={
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-bone-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              running
            </span>
          }
        >
          <ul className="flex flex-col gap-1">
            {queue.map((it, i) => (
              <li
                key={it.label}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-xs",
                  i === 0 ? "bg-charcoal-2 text-bone" : "text-bone-dim",
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full",
                    it.state === "run" && "bg-emerald-400",
                    it.state === "queue" && "bg-amber-400/80",
                    it.state === "done" && "bg-bone-faint",
                  )}
                />
                <span className="truncate">{it.label}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Workflow map */}
        <Panel title="Workflow" className="col-span-2">
          <svg viewBox="0 0 240 80" className="h-[72px] w-full" fill="none">
            <defs>
              <linearGradient id="os-flow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#e7e3da" stopOpacity="0" />
                <stop offset="50%" stopColor="#e7e3da" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#e7e3da" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[
              "M24 40 H86",
              "M86 40 C108 40 108 20 132 20",
              "M86 40 C108 40 108 60 132 60",
              "M158 20 C182 20 182 40 208 40",
              "M158 60 C182 60 182 40 208 40",
            ].map((d, i) => (
              <g key={i}>
                <path d={d} stroke="#232327" strokeWidth="1.5" />
                <path
                  className="flow-line"
                  d={d}
                  stroke="url(#os-flow)"
                  strokeWidth="1.5"
                  strokeDasharray="26 120"
                  strokeDashoffset={160}
                  style={{ animationDelay: `${i * 0.25}s` }}
                />
              </g>
            ))}
            {[
              [24, 40],
              [86, 40],
              [132, 20],
              [132, 60],
              [158, 20],
              [158, 60],
              [208, 40],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="4.5" fill="#0d0d0f" stroke="#e7e3da" strokeWidth="1.5" />
            ))}
          </svg>
        </Panel>

        {/* Throughput */}
        <Panel
          title="Throughput"
          meta={<span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">wk</span>}
        >
          <div className="flex h-full items-end">
            <div className="flex h-14 w-full items-end gap-1">
              {bars.map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} className="flex-1 rounded-sm bg-bone/25" />
              ))}
            </div>
          </div>
        </Panel>

        {/* Systems */}
        <Panel
          title="Systems"
          meta={<span className="font-mono text-[10px] text-emerald-400">ok</span>}
        >
          <ul className="grid grid-cols-2 gap-1.5">
            {systems.map((s) => (
              <li
                key={s}
                className="flex items-center gap-1.5 rounded-md border border-line bg-ink/40 px-2 py-1.5 text-[11px] text-bone-dim"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {s}
              </li>
            ))}
          </ul>
        </Panel>

        {/* Build progress */}
        <Panel title="Build" className="col-span-2">
          <ul className="flex flex-col gap-2">
            {builds.map((b) => (
              <li key={b.label}>
                <div className="mb-1 text-[11px] text-bone-dim">{b.label}</div>
                <div className="h-1 overflow-hidden rounded-full bg-charcoal-2">
                  <div className="h-full rounded-full bg-bone/70" style={{ width: `${b.pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
