import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  // Nothing fabricated ships: the section only appears with real, approved quotes.
  if (testimonials.length === 0) return null;

  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <SectionHeading label="In their words" title="What clients say" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.05} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-charcoal/40 p-7">
                <blockquote className="text-base leading-relaxed text-bone">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                  <span className="font-medium text-bone">{t.name}</span>
                  <span className="text-bone-faint"> · {t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
