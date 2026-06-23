import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { SectionGlow } from "../ui/SectionGlow";
import { cn } from "@/lib/utils";

const g = {
  a: "linear-gradient(135deg,#e83ede,#9333ea)",
  b: "linear-gradient(135deg,#14c8aa,#2563551a)",
  c: "linear-gradient(135deg,#fb8c28,#fb566e)",
  d: "linear-gradient(135deg,#9333ea,#14c8aa)",
  e: "linear-gradient(135deg,#fb566e,#fb8c28)",
  f: "linear-gradient(135deg,#2dd4bf,#9333ea)",
};

function Bars({ n = 3, className }: { n?: number; className?: string }) {
  const w = ["w-3/4", "w-1/2", "w-2/3", "w-2/5"];
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className={cn("h-1.5 rounded-full bg-bone/15", w[i % w.length])} />
      ))}
    </div>
  );
}

function MusicScreen() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-bone">Soniq</span>
        <span className="h-6 w-6 rounded-full" style={{ background: g.d }} />
      </div>
      <div className="rounded-xl p-3" style={{ background: g.a }}>
        <div className="h-20 rounded-lg bg-black/25" />
        <div className="mt-3 h-2 w-2/3 rounded-full bg-white/70" />
        <div className="mt-2 h-1.5 w-1/3 rounded-full bg-white/40" />
        <div className="mt-3 h-1 rounded-full bg-white/30">
          <div className="h-1 w-2/5 rounded-full bg-white" />
        </div>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">Made for you</span>
      <div className="grid grid-cols-3 gap-2">
        {[g.c, g.f, g.e].map((bg, i) => (
          <div key={i} className="aspect-square rounded-lg" style={{ background: bg }} />
        ))}
      </div>
      <div className="flex flex-col gap-2.5">
        {[g.b, g.a, g.c, g.f].map((bg, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="h-9 w-9 shrink-0 rounded-md" style={{ background: bg }} />
            <Bars n={2} className="flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialScreen() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        <span className="h-12 w-12 rounded-full" style={{ background: g.d }} />
        <div className="flex-1">
          <div className="text-sm font-semibold text-bone">Grace</div>
          <div className="text-[11px] text-bone-faint">@grace</div>
        </div>
        <span className="rounded-full bg-bone px-3 py-1 text-[11px] font-medium text-ink">Follow</span>
      </div>
      {[g.a, g.f].map((bg, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-line">
          <div className="h-32" style={{ background: bg }} />
          <div className="flex flex-col gap-2 p-3">
            <Bars n={2} />
            <div className="mt-1 flex gap-3">
              <span className="h-3 w-8 rounded-full bg-bone/15" />
              <span className="h-3 w-8 rounded-full bg-bone/15" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function OpsScreen() {
  const bars = [40, 60, 48, 72, 64, 88];
  return (
    <div className="flex flex-col gap-4 p-4">
      <span className="text-sm font-semibold text-bone">Overview</span>
      <div className="grid grid-cols-2 gap-2.5">
        {[g.f, g.c].map((bg, i) => (
          <div key={i} className="rounded-xl border border-line bg-charcoal/60 p-3">
            <span className="block h-6 w-6 rounded-md" style={{ background: bg }} />
            <div className="mt-3"><Bars n={2} /></div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-line bg-charcoal/60 p-3">
        <div className="flex h-16 items-end gap-1">
          {bars.map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} className="flex-1 rounded-sm bg-bone/25" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {["bg-emerald-400", "bg-amber-400/80", "bg-emerald-400", "bg-bone-faint"].map((d, i) => (
          <div key={i} className="flex items-center gap-2.5 rounded-lg border border-line bg-ink/40 px-3 py-2">
            <span className={cn("h-1.5 w-1.5 rounded-full", d)} />
            <Bars n={1} className="flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Phone({
  screen: Screen,
  duration,
  className,
}: {
  screen: React.ComponentType;
  duration: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[244px] rounded-[2.2rem] border border-line bg-charcoal/40 p-2 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.95)]",
        className,
      )}
    >
      <div className="relative h-[480px] overflow-hidden rounded-[1.7rem] bg-ink">
        <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-charcoal" />
        <div className="marquee-mask h-full overflow-hidden">
          <div
            className="marquee-col flex flex-col"
            style={{ ["--mq-dur" as string]: duration }}
          >
            <Screen />
            <Screen />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PhoneShowcase() {
  return (
    <section className="showcase relative overflow-hidden border-t border-line py-16 sm:py-24">
      <SectionGlow className="left-1/2 top-1/3 -translate-x-1/2" color="#14c8aa" opacity={0.08} />
      <Container className="relative">
        <SectionHeading
          label="Live product"
          title="Real interfaces, brought to life"
          description="Working product, not slideware. Brand, social, and software UI we put in front of real users."
        />
      </Container>

      <Reveal className="relative mt-12">
        <Container className="relative">
          <div className="flex justify-center gap-5 sm:gap-6">
            <Phone screen={MusicScreen} duration="58s" />
            <Phone screen={SocialScreen} duration="46s" className="hidden sm:block" />
            <Phone screen={OpsScreen} duration="64s" className="hidden lg:block" />
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
