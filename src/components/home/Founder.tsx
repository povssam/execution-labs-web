import Image from "next/image";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { founder } from "@/lib/data";

export function Founder() {
  if (!founder) return null;

  return (
    <section className="border-t border-line py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-charcoal/40 p-7 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-line sm:h-24 sm:w-24">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-base leading-relaxed text-bone sm:text-lg">
                &ldquo;{founder.note}&rdquo;
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-bone">
                  {founder.name}
                </span>
                <span className="text-sm text-bone-faint">{founder.role}</span>
                {founder.placeholder && (
                  <span className="rounded-full border border-amber-400/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-amber-400/90">
                    Mock
                  </span>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
