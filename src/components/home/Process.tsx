import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { process } from "@/lib/data";

export function Process() {
  return (
    <section id="process" className="process-editorial section-flow relative overflow-hidden">
      <BrandAtmosphere intensity="soft" tone="system" focus="right" />
      <Container className="relative z-10">
        <Reveal className="editorial-heading grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint lg:pb-2">
            Our process
          </p>
          <h2 className="text-4xl font-semibold leading-[1.02] text-bone sm:text-5xl lg:text-6xl">
            Brief to proof.
          </h2>
        </Reveal>

        <div className="process-route mt-16 lg:mt-24">
          <div className="process-route-line" aria-hidden="true" />
          <div className="process-route-grid">
            {process.map((step, index) => (
              <Reveal key={step.index} delay={index * 0.07} className="process-route-step">
                <article>
                  <div className="process-route-marker">
                    <span className="process-route-dot" />
                    <span className="font-mono text-[10px] tracking-[0.16em] text-bone-faint">
                      {step.index}
                    </span>
                  </div>
                  <h3 className="mt-10 text-3xl font-semibold leading-tight text-bone sm:text-4xl lg:mt-16">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[12rem] text-base text-bone-dim">{step.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
