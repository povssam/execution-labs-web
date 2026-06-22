import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { CALENDAR_URL } from "@/lib/site";
import { reassurances } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact | Execution Labs",
  description:
    "Start a project with Execution Labs. Tell us what you want to build and we will make the first version real.",
};

const steps = [
  "We read your brief, every word.",
  "We reply within a day.",
  "We map the system with you before we quote a thing.",
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 sm:pt-48 sm:pb-32">
      <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone-faint">
                Contact
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-bone sm:text-5xl">
                Start a project
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-lg text-bone-dim">
                Tell us what you want to build. We move fast and the work holds
                up. No obligation, no hard sell.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-12">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
                  What happens next
                </span>
                <ol className="mt-5 flex flex-col gap-4">
                  {steps.map((step, i) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-charcoal font-mono text-xs text-bone">
                        {i + 1}
                      </span>
                      <p className="pt-0.5 text-sm leading-relaxed text-bone-dim">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 border-t border-line pt-6">
                <ul className="flex flex-col gap-2.5">
                  {reassurances.map((r) => (
                    <li
                      key={r.title}
                      className="flex items-center gap-2.5 text-sm text-bone-dim"
                    >
                      <Check size={15} className="shrink-0 text-emerald-400" />
                      {r.title}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-8 text-sm text-bone-faint">
                Prefer to talk first?{" "}
                <Link
                  href={CALENDAR_URL}
                  className="text-bone underline underline-offset-4 transition-colors hover:text-white"
                >
                  Book a 20-minute call
                </Link>
                .
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
