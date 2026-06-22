import { Check } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { reassurances } from "@/lib/data";

export function Reassurance() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="grid gap-3 rounded-2xl border border-line bg-charcoal/40 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
            {reassurances.map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-ink text-emerald-400">
                  <Check size={15} />
                </span>
                <span className="text-sm font-medium text-bone">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
