import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone/40";

const variants: Record<Variant, string> = {
  primary:
    "bg-bone text-ink hover:bg-white hover:shadow-[0_0_30px_-8px_rgba(237,237,237,0.5)]",
  secondary:
    "border border-line bg-charcoal-2/40 text-bone hover:border-bone/40 hover:bg-charcoal-2",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  onClick,
}: CommonProps & { href: string; onClick?: () => void }) {
  const external = href.startsWith("http");
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, variants[variant], className)}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], className)}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
