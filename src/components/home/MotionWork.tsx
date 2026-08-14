import { Container } from "../ui/Container";
import { BrandAtmosphere } from "../BrandAtmosphere";
import { Reveal } from "../ui/Reveal";
import { GraceVideo } from "@/components/work/GraceVideo";

export function MotionWork() {
  return (
    <section id="motion-work" className="motion-editorial section-flow relative overflow-hidden">
      <BrandAtmosphere intensity="soft" tone="system" focus="right" />
      <Container className="middle-container relative z-10">
        <Reveal className="motion-editorial-heading">
          <h2 className="middle-section-heading">
            Motion Work
          </h2>
          <p className="motion-editorial-copy middle-body">
            Grace shows identity, interface, and motion as one product.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="motion-media-wrap mt-8 sm:mt-10 lg:mt-12">
          <div className="motion-media relative overflow-hidden bg-ink">
            <GraceVideo label="Grace Animation Final homepage proof" className="motion-video" />
            <div className="motion-media-shade pointer-events-none absolute inset-0" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
