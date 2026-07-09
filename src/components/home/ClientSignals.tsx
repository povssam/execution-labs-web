import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

/**
 * What clients notice. Proof-style cards, not testimonials. No invented people,
 * companies, quotes, or metrics. Each card names an outcome the work produces.
 */
const signals: { title: string; body: string }[] = [
  {
    title: "Faster decisions",
    body: "The information a call needs sits in one place, so choices happen in the meeting instead of after it.",
  },
  {
    title: "Clearer workflows",
    body: "Work that lived in sheets, chat, and memory becomes one visible path a team can follow.",
  },
  {
    title: "Less manual follow-up",
    body: "The chasing, the status pings, the copy-paste updates get handled by the system.",
  },
  {
    title: "Launch-ready systems",
    body: "What ships is a real product that can take usage on day one, not a demo to rebuild later.",
  },
];

export function ClientSignals() {
  return (
    <section className="section-flow relative overflow-hidden py-20 sm:py-28">
      <BrandAtmosphere intensity="soft" tone="calm" focus="right" />
      <Container className="relative z-10">
        <SectionHeading
          className="mx-auto max-w-2xl text-center"
          title="What clients notice"
          description="The change shows up in how the work runs, not in a slide."
        />

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2">
          {signals.map((signal, i) => (
            <Reveal key={signal.title} delay={i * 0.05}>
              <div className="proof-card h-full p-6 sm:p-8">
                <h3 className="text-xl font-medium text-bone sm:text-2xl">
                  {signal.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-dim sm:text-base">
                  {signal.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
