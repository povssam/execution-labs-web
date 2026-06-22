import { cn } from "@/lib/utils";

// A calm, honest visual: an abstract system diagram. No live data, no counters,
// no fabricated metrics. Just the shape of how the pieces connect.
export function SystemMap({ className }: { className?: string }) {
  const left = [
    [56, 56],
    [56, 110],
    [56, 164],
  ] as const;
  const right = [
    [264, 84],
    [264, 136],
  ] as const;
  const core: readonly [number, number] = [160, 110];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-ink/60 p-7 sm:p-9",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 grid-backdrop opacity-40"
        aria-hidden
      />
      <div className="relative">
        <div className="mb-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
          <span>your stack</span>
          <span>the system</span>
          <span>real work</span>
        </div>

        <svg viewBox="0 0 320 220" className="w-full" fill="none">
          {/* edges */}
          {left.map(([x, y], i) => (
            <path
              key={`l${i}`}
              d={`M${x + 8} ${y} C 110 ${y}, 110 ${core[1]}, ${core[0] - 14} ${core[1]}`}
              stroke="#232327"
              strokeWidth="1.5"
            />
          ))}
          {right.map(([x, y], i) => (
            <path
              key={`r${i}`}
              d={`M${core[0] + 14} ${core[1]} C 210 ${core[1]}, 210 ${y}, ${x - 8} ${y}`}
              stroke="#232327"
              strokeWidth="1.5"
            />
          ))}

          {/* left nodes */}
          {left.map(([x, y], i) => (
            <circle key={`ln${i}`} cx={x} cy={y} r="7" fill="#0d0d0f" stroke="#3f3f46" strokeWidth="1.5" />
          ))}
          {/* right nodes */}
          {right.map(([x, y], i) => (
            <circle key={`rn${i}`} cx={x} cy={y} r="7" fill="#0d0d0f" stroke="#3f3f46" strokeWidth="1.5" />
          ))}

          {/* core */}
          <circle cx={core[0]} cy={core[1]} r="22" fill="#141417" stroke="#e7e3da" strokeWidth="1.5" />
          <circle cx={core[0]} cy={core[1]} r="6" fill="#e7e3da" />
        </svg>

        <p className="mt-6 max-w-sm text-sm leading-relaxed text-bone-dim">
          We connect the tools you already use to one system that does the
          work, then keep sharpening it.
        </p>
      </div>
    </div>
  );
}
