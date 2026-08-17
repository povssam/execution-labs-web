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
      <BrandAtmosphere intensity="soft" tone="system" focus="right" />
      <Container className="middle-container relative z-10">
        <div className="signals-manifesto">
          {signals.map((signal, index) => (
            <Reveal key={signal} delay={index * 0.04}>
              <p className="signal-line">
                <span className="signal-copy middle-step-title">
                  {signal}.
                </span>
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
