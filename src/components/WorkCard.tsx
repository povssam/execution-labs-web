import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/lib/data";

export function WorkCard({
  study,
  className,
}: {
  study: CaseStudy;
  className?: string;
}) {
  return (
    <Link
      href={`/work/${study.slug}`}
      aria-label={`Read the ${study.client} case study`}
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-line bg-charcoal/60 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-bone/25 hover:bg-charcoal-2/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone/40",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
          {study.category}
        </span>
        <span className="font-mono text-[11px] text-bone-faint">
          {study.year}
        </span>
      </div>

      <div className="mt-10 flex items-start justify-between gap-3">
        <h3 className="text-2xl font-medium tracking-tight text-bone">
          {study.client}
        </h3>
        <ArrowUpRight
          size={18}
          className="mt-1 shrink-0 text-bone-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone"
        />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-bone-dim">
        {study.summary}
      </p>

      <div className="mt-auto flex flex-wrap gap-2 pt-8">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line px-3 py-1 text-[11px] text-bone-dim"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
