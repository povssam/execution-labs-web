import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  label,
  title,
  description,
  className,
}: {
  label?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {label && (
        <Reveal>
          <span className="flex items-center gap-3">
            <span className="flow-line" aria-hidden />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone-faint">
              {label}
            </span>
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-bone-dim sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
