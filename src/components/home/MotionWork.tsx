import Image from "next/image";
import { CheckCircle2, Play } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { GraceVideo } from "@/components/work/GraceVideo";

const notes = [
  "Brief captured",
  "System shaped",
  "Proof asset built",
  "Ready to launch",
];

function MotionPanel({ label }: { label: string }) {
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
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full border border-bone/15 bg-ink/50 px-3 py-1 text-xs text-bone-dim">
            <Play size={12} />
            {label}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
            Brief to build
          </span>
        </div>
        <div className="mt-24 grid gap-2">
          {notes.map((note, i) => (
            <span
              key={note}
              className="orbit-row flex items-center gap-2 rounded-lg border border-bone/10 bg-ink/55 px-3 py-2 text-sm text-bone"
              style={{ "--orbit-delay": `${i * 0.08}s` } as React.CSSProperties}
            >
              <CheckCircle2 size={14} className="text-bone-dim" />
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
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <SectionHeading
            label="Motion work"
            title="Motion as proof, not decoration"
            description="Grace shows identity, interface, and motion working as one system."
          />
          <Reveal className="grid gap-4 md:grid-cols-[1.35fr_0.65fr]">
            <div className="overflow-hidden rounded-2xl border border-line bg-charcoal/40">
              <div className="relative aspect-video bg-ink">
                <GraceVideo label="Grace Animation Final homepage proof" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                <div className="pointer-events-none absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-bone/15 bg-ink/70 px-3 py-1 text-xs text-bone-dim">
                    <Play size={12} />
                    Grace Animation Final
                  </span>
                </div>
              </div>
            </div>
            <MotionPanel label="Brand system" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
