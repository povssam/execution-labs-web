import Image from "next/image";

/**
 * Global atmosphere. A dark base with a soft prismatic glow derived from the
 * real brand asset (IMG_7673 / hero-glass.png), heavily blurred and low opacity.
 * Fixed behind everything, ambient only, content never depends on it.
 */
export function GlassBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
      aria-hidden
    >
      {/* top lens glow from the real glass asset */}
      <Image
        src="/brand/hero-glass.png"
        alt=""
        width={1500}
        height={500}
        priority
        className="glass-breathe absolute left-1/2 top-[-16%] w-[150%] max-w-none -translate-x-1/2 opacity-[0.18] blur-[70px]"
      />
      {/* faint lower glow so lower sections never read as flat black */}
      <div
        className="absolute bottom-[-12%] left-[55%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-[0.08] blur-[130px]"
        style={{ background: "radial-gradient(circle, #9333ea, transparent 62%)" }}
      />
    </div>
  );
}
