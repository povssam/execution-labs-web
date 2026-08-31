import { BrandAtmosphere } from "../BrandAtmosphere";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { CtaButtons } from "../ui/CtaButtons";

export function FinalCTA({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={`final-cta-section section-flow section-flow--fade relative overflow-hidden ${compact ? "py-12 sm:py-20" : "py-20 sm:py-28"}`}
    >
      <BrandAtmosphere intensity="soft" tone="fade" focus="bottom" />
      <Container className="relative z-10">
        <Reveal>
          <div
            className={`final-cta-content relative px-2 text-left ${compact ? "py-10 sm:py-16" : "py-16 sm:py-24"}`}
            style={compact ? { transform: "none" } : undefined}
          >
            <h2 className="text-wipe max-w-3xl text-left text-4xl font-semibold leading-[1.02] tracking-tight text-bone sm:text-5xl lg:text-6xl">
              <span className="block sm:inline">Make the</span>{" "}
              <span className="block sm:inline">work move.</span>
            </h2>
            <CtaButtons className={`${compact ? "mt-7" : "mt-9"} justify-start`} primaryLabel="Start a project" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
