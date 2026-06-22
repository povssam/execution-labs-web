"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { ButtonLink } from "../ui/Button";
import { WorkCard } from "../WorkCard";
import { caseStudies } from "@/lib/data";

export function WorkCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 420);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            label="Selected work"
            title="Systems we put into the world"
          />
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollBy(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-bone-dim transition-colors duration-200 hover:border-bone/40 hover:text-bone"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollBy(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-bone-dim transition-colors duration-200 hover:border-bone/40 hover:text-bone"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </Container>

      <Reveal className="relative mt-12">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-ink to-transparent sm:block"
          aria-hidden
        />
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pb-2 sm:scroll-px-8 sm:px-8"
        >
          {caseStudies.map((study) => (
            <div
              key={study.slug}
              className="w-[300px] shrink-0 snap-start sm:w-[360px]"
            >
              <WorkCard study={study} className="h-full" />
            </div>
          ))}
          <div className="w-1 shrink-0" aria-hidden />
        </div>
      </Reveal>

      <Container className="mt-12">
        <ButtonLink href="/work" variant="secondary">
          View all work
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </ButtonLink>
      </Container>
    </section>
  );
}
