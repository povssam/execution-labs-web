import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { reasons } from "@/lib/data";

export function WhyUs() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-charcoal/40 py-16 sm:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(231,227,218,0.07),transparent_70%)] blur-2xl"
        aria-hidden
      />
      <Container className="relative">
        <SectionHeading label="Why us" title="We ship, we don't pitch" />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {reasons.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col bg-charcoal p-8 transition-colors duration-200 hover:bg-charcoal-2/70">
                <span className="font-mono text-xs text-bone-faint">
                  0{i + 1}
                </span>
                <h3 className="mt-6 text-xl font-medium text-bone">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
