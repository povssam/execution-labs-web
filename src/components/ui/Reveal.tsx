import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Render a specific element. Defaults to div. */
  as?: "div" | "section" | "li" | "span";
};

/**
 * Reveal animates content up on load using CSS only.
 * The resting state is fully visible, so content always renders even if
 * the animation never runs (no JS, reduced motion, old browsers).
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  return (
    <Tag
      className={cn("reveal", className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
