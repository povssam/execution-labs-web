import type { Metadata } from "next";
import { Mail, Clock, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Execution Labs",
  description:
    "Start a project with Execution Labs. Tell us what you want to build and we will make the first version real.",
};

const points = [
  {
    icon: Mail,
    title: "Direct line",
    body: "hello@executionlabs.com",
  },
  {
    icon: Clock,
    title: "Fast replies",
    body: "We read every brief and reply within a day.",
  },
  {
    icon: MessageSquare,
    title: "Clear next step",
    body: "We map the system before we quote the work.",
  },
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
                up.
              </p>
            </Reveal>

            <div className="mt-12 flex flex-col gap-5">
              {points.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal key={p.title} delay={0.15 + i * 0.06}>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-charcoal text-bone">
                        <Icon size={18} strokeWidth={1.6} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-bone">{p.title}</p>
                        <p className="mt-1 text-sm text-bone-dim">{p.body}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
