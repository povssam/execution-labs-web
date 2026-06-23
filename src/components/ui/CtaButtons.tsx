import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "./Button";
import { CALENDAR_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

/** The standard "Start a project" + "Book a call" pair. */
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
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)} style={style}>
      <ButtonLink href="/contact">
        {primaryLabel}
        <ArrowRight
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </ButtonLink>
      <ButtonLink href={CALENDAR_URL} variant="secondary">
        Book a call
      </ButtonLink>
    </div>
  );
}
