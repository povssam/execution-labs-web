import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  label,
  title,
  description,
  className,
  align = "left",
  scale = "default",
}: {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  scale?: "default" | "display";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {label && (
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone-faint">
            {label}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "mt-3 font-semibold leading-[1.02] tracking-tight text-bone",
            scale === "display"
              ? "text-4xl sm:text-5xl lg:text-6xl"
              : "text-3xl sm:text-4xl",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-4 text-base leading-relaxed text-bone-dim sm:text-lg",
              align === "center" && "mx-auto max-w-xl",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
