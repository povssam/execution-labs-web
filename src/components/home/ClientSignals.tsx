import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

const signals = [
  "Faster decisions",
  "Clearer workflows",
  "Less manual follow-up",
  "Launch-ready systems",
];

export function ClientSignals() {
  return (
    <section id="client-signals" className="signals-editorial section-flow relative overflow-hidden">
      <BrandAtmosphere intensity="soft" tone="proof" focus="left" />
      <Container className="relative z-10">
        <Reveal className="signals-heading flex items-end justify-between gap-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint">
            Client signals
          </p>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
            What changes
          </span>
        </Reveal>

        <div className="signals-manifesto mt-16 sm:mt-20">
          {signals.map((signal, index) => (
            <Reveal key={signal} delay={index * 0.04}>
              <p className="signal-line">
                <span className="signal-index font-mono text-[10px] text-bone-faint" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="signal-copy text-4xl font-semibold leading-[0.98] tracking-tight text-bone sm:text-6xl lg:text-7xl">
                  {signal}
                </span>
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
