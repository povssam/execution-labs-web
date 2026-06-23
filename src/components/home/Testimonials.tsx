import Image from "next/image";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-t border-line py-16 sm:py-24">
      <Container>
        <SectionHeading label="In their words" title="What clients say" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.05} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-charcoal/40 p-7">
                <blockquote className="text-base leading-relaxed text-bone">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  {t.image && (
                    <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-line">
                      <Image src={t.image} alt={t.name} fill sizes="40px" className="object-cover" />
                    </span>
                  )}
                  <span className="flex flex-wrap items-center gap-x-2 text-sm">
                    <span className="font-medium text-bone">{t.name}</span>
                    <span className="text-bone-faint">{t.role}</span>
                    {t.placeholder && (
                      <span className="rounded-full border border-amber-400/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-amber-400/90">
                        Mock
                      </span>
                    )}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
