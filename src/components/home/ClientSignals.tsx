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
    <section className="section-flow relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <BrandAtmosphere intensity="soft" tone="proof" focus="left" />
      <Container className="relative z-10">
        <Reveal className="flex items-end justify-between gap-8 border-b border-line pb-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint">
            Client signals
          </p>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint sm:block">
            What changes
          </span>
        </Reveal>

        <div>
          {signals.map((signal, index) => (
            <Reveal key={signal} delay={index * 0.04}>
              <div
                className={`signal-row grid grid-cols-[2.25rem_1fr] border-b border-line py-7 sm:grid-cols-[4rem_1fr] sm:py-9 ${
                  index === 1
                    ? "sm:pl-[10%]"
                    : index === 2
                      ? "sm:pl-[4%]"
                      : index === 3
                        ? "sm:pl-[16%]"
                        : ""
                }`}
              >
                <span className="pt-1 font-mono text-[10px] text-bone-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="signal-copy text-[clamp(1.85rem,5.5vw,5rem)] font-medium leading-[0.98] tracking-[-0.035em] text-bone">
                  {signal}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
