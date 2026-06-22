import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseStudy, PreviewKind } from "@/lib/data";

function CardPreview({ kind }: { kind: PreviewKind }) {
  if (kind === "queue") {
    const rows = [
      { w: "w-3/4", c: "bg-emerald-400" },
      { w: "w-1/2", c: "bg-emerald-400" },
      { w: "w-2/3", c: "bg-amber-400/80" },
      { w: "w-2/5", c: "bg-bone-faint" },
    ];
    return (
      <div className="flex flex-col gap-2">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", r.c)} />
            <span className={cn("h-2 rounded-sm bg-bone/15", r.w)} />
          </div>
        ))}
      </div>
    );
  }

  if (kind === "bars") {
    const bars = [42, 60, 50, 78, 64, 90, 72];
    return (
      <div className="flex h-full items-end gap-1.5">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-sm bg-bone/20"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    );
  }

  if (kind === "lines") {
    return (
      <svg viewBox="0 0 200 70" className="h-full w-full" fill="none">
        <defs>
          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e7e3da" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#e7e3da" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 58 L28 50 L56 54 L84 36 L112 40 L140 22 L168 26 L200 10 L200 70 L0 70 Z"
          fill="url(#area)"
        />
        <path
          d="M0 58 L28 50 L56 54 L84 36 L112 40 L140 22 L168 26 L200 10"
          stroke="#e7e3da"
          strokeOpacity="0.7"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  // status
  const cells = ["Agents", "API", "Jobs", "Sync"];
  return (
    <div className="grid grid-cols-2 gap-2">
      {cells.map((c) => (
        <div
          key={c}
          className="flex items-center gap-2 rounded-md border border-line px-2 py-1.5 text-[11px] text-bone-dim"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {c}
        </div>
      ))}
    </div>
  );
}

export function WorkCard({
  study,
  className,
}: {
  study: CaseStudy;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-charcoal/60 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-bone/25 hover:bg-charcoal-2/70 hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint">
          {study.category}
        </span>
        <span className="font-mono text-[10px] text-bone-faint">
          {study.year}
        </span>
      </div>

      {/* abstract product UI preview, no stock imagery */}
      <div className="relative mb-6 h-28 overflow-hidden rounded-xl border border-line bg-ink p-4">
        <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-50" />
        <div className="relative h-full">
          <CardPreview kind={study.preview} />
        </div>
      </div>

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-medium text-bone">{study.client}</h3>
        <ArrowUpRight
          size={18}
          className="mt-0.5 shrink-0 text-bone-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone"
        />
      </div>

      <p className="mt-2 text-sm leading-relaxed text-bone-dim">
        {study.summary}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-5">
        {study.metrics.map((m) => (
          <div key={m.label}>
            <div className="text-base font-semibold tracking-tight text-bone">
              {m.value}
            </div>
            <div className="mt-0.5 text-[11px] leading-snug text-bone-faint">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line px-3 py-1 text-[11px] text-bone-dim"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
