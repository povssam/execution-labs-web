import { cn } from "@/lib/utils";

export type BrandAtmosphereIntensity = "hero" | "section" | "soft" | "none";

export function BrandAtmosphere({
  intensity = "section",
  fixed = false,
  className,
}: {
  intensity?: BrandAtmosphereIntensity;
  fixed?: boolean;
  className?: string;
}) {
  if (intensity === "none") return null;

  return (
    <div
      aria-hidden
      className={cn(
        "brand-atmosphere",
        `brand-atmosphere--${intensity}`,
        fixed && "brand-atmosphere--fixed",
        className,
      )}
    />
  );
}
