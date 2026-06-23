import Image from "next/image";
import { cn } from "@/lib/utils";

/** The actual Execution Labs mark (public/brand/logo.png). */
export function Logo({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/brand/logo.png"
      alt="Execution Labs"
      width={size}
      height={size}
      priority
      className={cn("rounded-[5px]", className)}
    />
  );
}
