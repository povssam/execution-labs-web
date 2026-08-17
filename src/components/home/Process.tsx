import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { process } from "@/lib/data";

export function Process() {
  return (
    <section id="process" className="process-editorial section-flow relative overflow-hidden">
      <BrandAtmosphere intensity="soft" tone="system" focus="right" />
      <Container className="middle-container relative z-10">
        <div className="process-route">
          <div className="process-route-grid">
            {process.map((step, index) => (
              <Reveal key={step.index} delay={index * 0.07} className="process-route-step">
                <article>
                  <h3 className="process-route-title middle-step-title">
                    {step.title}
                  </h3>
                  <p className="process-route-copy middle-body">{step.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
