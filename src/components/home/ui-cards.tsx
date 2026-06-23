import { cn } from "@/lib/utils";

function Shell({
  label,
  meta,
  children,
  className,
}: {
  label: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-charcoal/70 p-4 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
          {label}
        </span>
        {meta}
      </div>
      {children}
    </div>
  );
}

const dot = "h-1.5 w-1.5 shrink-0 rounded-full";

export function AgentRunCard() {
  const lines = [
    { t: "read", s: "ok", text: "inbox: 12 threads" },
    { t: "plan", s: "ok", text: "draft 3 replies" },
    { t: "act", s: "run", text: "sending update" },
    { t: "wait", s: "queue", text: "approval needed" },
  ];
  return (
    <Shell label="agent.run" meta={<span className="font-mono text-[10px] text-emerald-400">live</span>}>
      <ul className="flex flex-col gap-1.5 font-mono text-[11px]">
        {lines.map((l, i) => (
          <li key={i} className="flex items-center gap-2 rounded-md bg-ink/40 px-2 py-1.5">
            <span
              className={cn(
                dot,
                l.s === "ok" && "bg-emerald-400",
                l.s === "run" && "bg-amber-400/80",
                l.s === "queue" && "bg-bone-faint",
              )}
            />
            <span className="w-10 text-bone-faint">{l.t}</span>
            <span className="truncate text-bone-dim">{l.text}</span>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function WorkflowCard() {
  return (
    <Shell label="workflow" meta={<span className="font-mono text-[10px] text-bone-faint">v4</span>}>
      <svg viewBox="0 0 240 96" className="w-full" fill="none">
        <defs>
          <linearGradient id="uc-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e7e3da" stopOpacity="0" />
            <stop offset="50%" stopColor="#e7e3da" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e7e3da" stopOpacity="0" />
          </linearGradient>
        </defs>
        {["M24 48 H86", "M86 48 C108 48 108 26 132 26", "M86 48 C108 48 108 70 132 70", "M158 26 C182 26 182 48 208 48", "M158 70 C182 70 182 48 208 48"].map((d, i) => (
          <g key={i}>
            <path d={d} stroke="#232327" strokeWidth="1.5" />
            <path className="flow-line" d={d} stroke="url(#uc-flow)" strokeWidth="1.5" strokeDasharray="24 120" strokeDashoffset={160} style={{ animationDelay: `${i * 0.25}s` }} />
          </g>
        ))}
        {[[24, 48], [86, 48], [132, 26], [132, 70], [158, 26], [158, 70], [208, 48]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4.5" fill="#0d0d0f" stroke="#e7e3da" strokeWidth="1.5" />
        ))}
      </svg>
    </Shell>
  );
}

export function TaskBoardCard() {
  const cols = [
    { h: "todo", items: ["w-3/4", "w-1/2"] },
    { h: "doing", items: ["w-2/3"] },
    { h: "done", items: ["w-3/4", "w-2/5"] },
  ];
  return (
    <Shell label="board">
      <div className="grid grid-cols-3 gap-2">
        {cols.map((c) => (
          <div key={c.h} className="rounded-md bg-ink/40 p-2">
            <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.14em] text-bone-faint">{c.h}</div>
            <div className="flex flex-col gap-1.5">
              {c.items.map((w, i) => (
                <div key={i} className="rounded-sm border border-line bg-charcoal/60 p-1.5">
                  <span className={cn("block h-1.5 rounded-sm bg-bone/15", w)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function CodeCard() {
  return (
    <Shell label="agent.ts" meta={<span className="font-mono text-[10px] text-bone-faint">ts</span>}>
      <pre className="overflow-hidden font-mono text-[10.5px] leading-relaxed">
        <code>
          <div><span className="text-violet-300/80">const</span> <span className="text-bone">agent</span> = <span className="text-emerald-300/80">defineAgent</span>({"{"}</div>
          <div className="text-bone-dim">{"  "}tools: [crm, calendar],</div>
          <div className="text-bone-dim">{"  "}memory: <span className="text-amber-300/80">true</span>,</div>
          <div className="text-bone-dim">{"  "}onTask: <span className="text-emerald-300/80">handle</span>,</div>
          <div className="text-bone">{"}"})</div>
          <div className="mt-1 text-bone-faint">{"// runs on every new lead"}</div>
        </code>
      </pre>
    </Shell>
  );
}

export function PipelineCard() {
  const stages = [
    { n: "ingest", s: "ok" },
    { n: "enrich", s: "ok" },
    { n: "route", s: "run" },
    { n: "ship", s: "queue" },
  ];
  return (
    <Shell label="pipeline" meta={<span className="font-mono text-[10px] text-emerald-400">healthy</span>}>
      <div className="flex flex-col gap-2">
        {stages.map((s) => (
          <div key={s.n} className="flex items-center gap-2.5 rounded-md border border-line bg-ink/40 px-2.5 py-2 font-mono text-[11px]">
            <span className={cn(dot, s.s === "ok" && "bg-emerald-400", s.s === "run" && "bg-amber-400/80", s.s === "queue" && "bg-bone-faint")} />
            <span className="text-bone-dim">{s.n}</span>
            <span className="ml-auto text-bone-faint">{s.s}</span>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export function ChartCard() {
  const bars = [38, 52, 46, 66, 58, 78, 70, 88, 80, 94];
  return (
    <Shell label="throughput" meta={<span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">wk</span>}>
      <div className="flex h-20 items-end gap-1">
        {bars.map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} className="flex-1 rounded-sm bg-bone/25" />
        ))}
      </div>
    </Shell>
  );
}

export function StatusCard() {
  const items = ["Agents", "Pipelines", "API", "Webhooks", "Jobs", "Sync"];
  return (
    <Shell label="systems" meta={<span className="font-mono text-[10px] text-emerald-400">ok</span>}>
      <ul className="grid grid-cols-2 gap-1.5">
        {items.map((s) => (
          <li key={s} className="flex items-center gap-2 rounded-md border border-line bg-ink/40 px-2 py-1.5 text-[11px] text-bone-dim">
            <span className={cn(dot, "bg-emerald-400")} />
            {s}
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function InboxCard() {
  const rows = [
    { tag: "lead", w: "w-3/4" },
    { tag: "ops", w: "w-1/2" },
    { tag: "lead", w: "w-2/3" },
    { tag: "bug", w: "w-2/5" },
  ];
  return (
    <Shell label="triage">
      <ul className="flex flex-col gap-1.5">
        {rows.map((r, i) => (
          <li key={i} className="flex items-center gap-2 rounded-md bg-ink/40 px-2 py-1.5">
            <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-bone-faint">{r.tag}</span>
            <span className={cn("h-1.5 rounded-sm bg-bone/15", r.w)} />
          </li>
        ))}
      </ul>
    </Shell>
  );
}
