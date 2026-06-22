import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { reasons } from "@/lib/data";

export function WhyUs() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-charcoal/40 py-20 sm:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(231,227,218,0.07),transparent_70%)] blur-2xl"
        aria-hidden
      />
      <Container className="relative">
        <SectionHeading label="Why us" title="A team that ships, not pitches" />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {reasons.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.08} className="h-full">
                <div className="group relative flex h-full flex-col bg-charcoal p-8 transition-colors duration-200 hover:bg-charcoal-2/70">
                  <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-bone/40 transition-transform duration-300 group-hover:scale-x-100" />
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink text-bone">
                      <Icon size={20} strokeWidth={1.6} />
                    </div>
                    <span className="font-mono text-xs text-bone-faint">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-bone">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
