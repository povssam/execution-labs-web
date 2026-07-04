import { cn } from "@/lib/utils";

export type BrandAtmosphereIntensity = "hero" | "section" | "soft" | "none";
export type BrandAtmosphereTone = "neutral" | "calm" | "proof" | "media" | "system" | "fade";
export type BrandAtmosphereFocus = "center" | "left" | "right" | "top" | "bottom";

export function BrandAtmosphere({
  intensity = "section",
  tone = "neutral",
  focus = "center",
  fixed = false,
  className,
}: {
  intensity?: BrandAtmosphereIntensity;
  tone?: BrandAtmosphereTone;
  focus?: BrandAtmosphereFocus;
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
        tone !== "neutral" && `brand-atmosphere--tone-${tone}`,
        focus !== "center" && `brand-atmosphere--focus-${focus}`,
        fixed && "brand-atmosphere--fixed",
        className,
      )}
    />
  );
}
