import { cn } from "@/lib/utils";

/**
 * Subtle prismatic glass glow behind a section. Single soft hue, low opacity,
 * heavily blurred. Position with className (e.g. "left-1/4 top-0").
 */
export function SectionGlow({
  className,
  color = "#9333ea",
  opacity = 0.1,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute h-[34rem] w-[34rem] rounded-full blur-[120px]",
        className,
      )}
      style={{
        background: `radial-gradient(circle, ${color}, transparent 62%)`,
        opacity,
      }}
    />
  );
}
