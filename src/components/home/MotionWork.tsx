import Image from "next/image";
import { Play, Sparkles } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const notes = [
  "Brief to motion",
  "Interface rhythm",
  "Brand lens",
  "Launch polish",
];

function MotionPanel({ label, reverse = false }: { label: string; reverse?: boolean }) {
  return (
    <div className="relative min-h-[17rem] overflow-hidden rounded-2xl border border-line bg-charcoal/40 p-5 sm:min-h-[20rem]">
      <Image
        src="/brand/hero-glass.png"
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover opacity-75"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
      <div
        className={[
          "absolute top-1/2 h-px w-1/2 bg-bone/80 orbit-scan",
          reverse ? "right-0 rotate-180" : "left-0",
        ].join(" ")}
      />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full border border-bone/15 bg-ink/50 px-3 py-1 text-xs text-bone-dim">
            <Play size={12} />
            {label}
          </span>
          <Sparkles size={16} className="text-bone-dim" />
        </div>
        <div className="mt-24 grid gap-2">
          {notes.map((note, i) => (
            <span
              key={note}
              className="orbit-row rounded-lg border border-bone/10 bg-ink/55 px-3 py-2 text-sm text-bone"
              style={{ "--orbit-delay": `${i * 0.08}s` } as React.CSSProperties}
            >
              {note}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MotionWork() {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <SectionHeading
            label="Motion work"
            title="Movement that makes the brand feel built"
            description="Small product moments, identity motion, and loading states that make the work feel custom without slowing people down."
          />
          <Reveal className="grid gap-4 sm:grid-cols-2">
            <MotionPanel label="Identity motion" />
            <MotionPanel label="Product motion" reverse />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
