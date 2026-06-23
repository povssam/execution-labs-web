import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseStudy, PreviewKind } from "@/lib/data";
import { accent as accentColor, gradient } from "@/lib/brand";

// Abstract product-UI preview per case study. Static, always visible.
export function CardPreview({ kind, accent }: { kind: PreviewKind; accent: string }) {
  const uid = accent.replace("#", "");

  if (kind === "queue") {
    const rows = ["w-3/4", "w-1/2", "w-2/3", "w-2/5"];
    return (
      <div className="flex h-full flex-col justify-center gap-2">
        {rows.map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent, opacity: 1 - i * 0.18 }} />
            <span className={cn("h-2 rounded-sm bg-bone/15", w)} />
          </div>
        ))}
      </div>
    );
  }

  if (kind === "bars") {
    const bars = [42, 60, 50, 78, 64, 90, 72, 84];
    return (
      <div className="flex h-full items-end gap-1.5">
        {bars.map((h, i) => (
          <span key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: accent, opacity: 0.35 + i * 0.07 }} />
        ))}
      </div>
    );
  }

  if (kind === "lines") {
    return (
      <svg viewBox="0 0 200 70" className="h-full w-full" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`area-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 58 L28 50 L56 54 L84 36 L112 40 L140 22 L168 26 L200 10 L200 70 L0 70 Z" fill={`url(#area-${uid})`} />
        <path d="M0 58 L28 50 L56 54 L84 36 L112 40 L140 22 L168 26 L200 10" stroke={accent} strokeOpacity="0.9" strokeWidth="1.5" />
      </svg>
    );
  }

  if (kind === "rings") {
    return (
      <div className="flex h-full items-center gap-4">
        <svg viewBox="0 0 80 80" className="h-full max-h-16" fill="none">
          <circle cx="40" cy="40" r="30" stroke="#232327" strokeWidth="8" />
          <circle cx="40" cy="40" r="30" stroke={accent} strokeWidth="8" strokeLinecap="round" strokeDasharray="132 188" transform="rotate(-90 40 40)" />
        </svg>
        <div className="flex flex-col gap-1.5">
          {["Dividends", "Reinvest", "Total return"].map((l, i) => (
            <span key={l} className="flex items-center gap-2 text-[11px] text-bone-dim">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: i === 0 ? accent : "#3f3f46" }} />
              {l}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // status grid
  const cells = ["Agents", "API", "Jobs", "Sync"];
  return (
    <div className="grid h-full grid-cols-2 content-center gap-2">
      {cells.map((c) => (
        <div key={c} className="flex items-center gap-2 rounded-md border border-line px-2 py-1.5 text-[11px] text-bone-dim">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          {c}
        </div>
      ))}
    </div>
  );
}

export function WorkCard({
  study,
  className,
  index = 0,
}: {
  study: CaseStudy;
  className?: string;
  index?: number;
}) {
  const accent = accentColor(index);
  return (
    <Link
      href={`/work/${study.slug}`}
      aria-label={`Read the ${study.client} case study`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-charcoal/60 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-bone/25 hover:bg-charcoal-2/70 hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone/40",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
          {study.category}
        </span>
        <span className="font-mono text-[10px] text-bone-faint">{study.year}</span>
      </div>

      {/* preview */}
      <div className="relative mb-4 h-24 overflow-hidden rounded-xl border border-line bg-ink p-3.5">
        <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-50" />
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-40 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
          style={{ background: gradient(index) }}
          aria-hidden
        />
        <div className="relative h-full">
          <CardPreview kind={study.preview} accent={accent} />
        </div>
      </div>

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-medium text-bone">{study.client}</h3>
        <ArrowUpRight
          size={18}
          className="mt-0.5 shrink-0 text-bone-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone"
        />
      </div>

      <p className="mt-2 text-sm leading-relaxed text-bone-dim">{study.summary}</p>

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {study.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-line px-2.5 py-1 text-[11px] text-bone-dim">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
