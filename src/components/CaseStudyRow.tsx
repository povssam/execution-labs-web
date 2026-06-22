import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/lib/data";
import { WorkCard } from "./WorkCard";

function Field({ label, body }: { label: string; body: string }) {
  return (
    <div className="border-t border-line pt-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint">
        {label}
      </span>
      <p className="mt-2 text-sm leading-relaxed text-bone-dim">{body}</p>
    </div>
  );
}

export function CaseStudyRow({
  study,
  reversed,
}: {
  study: CaseStudy;
  reversed?: boolean;
}) {
  return (
    <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
      <div className={cn(reversed && "lg:order-2")}>
        <WorkCard study={study} className="h-full" />
      </div>

      <div
        className={cn(
          "flex flex-col rounded-2xl border border-line bg-charcoal/40 p-6 sm:p-8",
          reversed && "lg:order-1",
        )}
      >
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-bone-dim">
            {study.category}
          </span>
          <span className="font-mono text-xs text-bone-faint">{study.year}</span>
        </div>

        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-bone sm:text-3xl">
          {study.client}
        </h3>
        <p className="mt-2 text-base text-bone-dim">{study.summary}</p>

        <div className="mt-7 flex flex-col gap-4">
          <Field label="Problem" body={study.problem} />
          <Field label="What we built" body={study.built} />
          <Field label="Result" body={study.result} />
        </div>
      </div>
    </div>
  );
}
