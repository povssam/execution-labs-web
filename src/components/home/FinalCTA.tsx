import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { CtaButtons } from "../ui/CtaButtons";

export function FinalCTA() {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-charcoal px-6 py-14 text-center sm:px-16 sm:py-20">
            <div
              className="pointer-events-none absolute inset-0 grid-backdrop opacity-70"
              aria-hidden
            />
            <div className="relative">
              <h2 className="text-wipe mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-bone sm:text-5xl">
                Have a system worth building?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-bone-dim">
                Send the problem. We will map the first useful build.
              </p>
              <CtaButtons className="mt-10 justify-center" primaryLabel="Start a project" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
