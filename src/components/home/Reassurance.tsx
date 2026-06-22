import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { reassurances } from "@/lib/data";

export function Reassurance() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <p className="max-w-2xl text-lg text-bone-dim sm:text-xl">
            Working with us is built to be low risk. You know the scope, the
            price, and what you get before anything starts.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {reassurances.map((item, i) => (
            <Reveal key={item.title} delay={(i % 4) * 0.05} className="h-full">
              <div className="flex h-full flex-col bg-charcoal p-7">
                <h3 className="text-base font-medium text-bone">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
