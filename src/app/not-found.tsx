import { ArrowRight } from "lucide-react";
import { BrandAtmosphere } from "@/components/BrandAtmosphere";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-32 pb-24">
      <BrandAtmosphere intensity="section" />
      <Container className="relative z-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-bone-faint">
          404
        </p>
        <h1 className="mx-auto mt-4 max-w-xl text-4xl font-semibold tracking-tight text-bone sm:text-5xl">
          That page does not exist.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-bone-dim">
          The link may be old or the page may have moved. Head back and pick up
          from there.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">
            Back home
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </ButtonLink>
          <ButtonLink href="/work" variant="secondary">
            See the work
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
