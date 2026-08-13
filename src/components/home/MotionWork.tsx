import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { GraceVideo } from "@/components/work/GraceVideo";

export function MotionWork() {
  return (
    <section id="motion-work" className="motion-editorial section-flow relative overflow-hidden">
      <Container className="relative z-10">
        <Reveal className="motion-editorial-heading editorial-heading max-w-3xl">
          <h2 className="text-4xl font-semibold leading-[1.02] text-bone sm:text-5xl lg:text-6xl">
            Motion Work
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-bone-dim sm:text-lg">
            Grace shows identity, interface, and motion working as one calm product.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="motion-media-wrap mt-10 sm:mt-12 lg:mt-16">
          <div className="motion-media relative overflow-hidden bg-ink">
            <GraceVideo label="Grace Animation Final homepage proof" className="motion-video" />
            <div className="motion-media-shade pointer-events-none absolute inset-0" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
