import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "./Button";
import { cn } from "@/lib/utils";

/** The standard single primary CTA. */
export function CtaButtons({
  className,
  style,
  primaryLabel = "Start a project",
}: {
  className?: string;
  style?: CSSProperties;
  primaryLabel?: string;
}) {
  return (
    <div className={cn("flex", className)} style={style}>
      <ButtonLink href="/contact">
        {primaryLabel}
        <ArrowRight
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </ButtonLink>
    </div>
  );
}
