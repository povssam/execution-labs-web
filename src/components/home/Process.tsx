import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { process } from "@/lib/data";

const offsets = ["lg:pt-0", "lg:pt-12", "lg:pt-24", "lg:pt-36"];

export function Process() {
  return (
    <section id="process" className="section-flow section-space-compact relative overflow-hidden">
      <BrandAtmosphere intensity="soft" tone="system" focus="right" />
      <Container className="relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint">
            Our process
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.02] text-bone sm:text-5xl lg:text-6xl">
            Brief to proof.
          </h2>
        </Reveal>

        <div className="process-journey relative mt-12 sm:mt-16 lg:mt-24 lg:pb-36">
          <svg
            className="pointer-events-none absolute inset-x-0 top-2 hidden h-48 w-full lg:block"
            viewBox="0 0 1000 190"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="process-light" x1="0" x2="1">
                <stop offset="0" stopColor="rgba(237,237,237,0.08)" />
                <stop offset="0.55" stopColor="rgba(150,145,255,0.42)" />
                <stop offset="1" stopColor="rgba(237,237,237,0.12)" />
              </linearGradient>
            </defs>
            <path d="M20 16 C250 18 290 58 500 83 S760 145 980 174" fill="none" stroke="url(#process-light)" strokeWidth="1.5" />
          </svg>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-8">
            {process.map((step, index) => (
              <Reveal key={step.index} delay={index * 0.07} className={offsets[index]}>
                <article className="process-station relative px-4 pt-3 text-center sm:pt-4 lg:min-h-48 lg:pt-5">
                  <span className="process-station-dot mx-auto mb-3 block h-2 w-2 rounded-full border border-bone/40 bg-ink sm:mb-4 lg:mb-5" />
                  <span className="font-mono text-[10px] tracking-[0.16em] text-bone-faint">
                    {step.index}
                  </span>
                  <h3 className="mt-3 text-3xl font-semibold leading-tight text-bone sm:mt-4 sm:text-4xl lg:mt-5">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base text-bone-dim sm:mt-3">{step.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
