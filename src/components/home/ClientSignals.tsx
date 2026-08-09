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
    <section id="client-signals" className="section-flow relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <BrandAtmosphere intensity="soft" tone="proof" focus="left" />
      <Container className="relative z-10">
        <Reveal className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint">
            Client signals
          </p>
          <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">
            What changes
          </span>
        </Reveal>

        <div className="signal-field mt-14 sm:mt-20">
          {signals.map((signal, index) => (
            <Reveal key={signal} delay={index * 0.04}>
              <div className="signal-row relative py-7 text-center sm:py-9">
                <span className="signal-index font-mono text-[10px] text-bone-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="signal-copy mt-3 text-3xl font-semibold leading-tight tracking-tight text-bone sm:text-4xl">
                  {signal}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
