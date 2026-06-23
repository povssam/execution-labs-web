import { cn } from "@/lib/utils";

/**
 * Execution Labs mark: three ascending columns (momentum + the product's
 * three-column build motif). Uses currentColor so it inherits text color.
 * Stand-in for the official uploaded mark; swap the paths to match the real one.
 */
export function Logo({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn(className)}
    >
      <rect x="6" y="19" width="4" height="7" rx="2" fill="currentColor" />
      <rect x="14" y="13" width="4" height="13" rx="2" fill="currentColor" />
      <rect x="22" y="6" width="4" height="20" rx="2" fill="currentColor" />
    </svg>
  );
}
