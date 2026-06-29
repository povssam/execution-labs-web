import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Execution Labs",
  description:
    "Start a project with Execution Labs. Tell us what you want to build and we will make the first version real.",
};

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
                Tell us what needs to exist, what it should save, and what is
                slowing the team down now.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-col gap-3 text-sm text-bone-dim">
                <p>
                  Email us at{" "}
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-bone underline underline-offset-4 transition-colors hover:text-white"
                  >
                    {EMAIL}
                  </a>
                </p>
                <p>
                  <Link
                    href="/work"
                    className="text-bone underline underline-offset-4 transition-colors hover:text-white"
                  >
                    See the work
                  </Link>{" "}
                  if you want to compare the kind of systems we build.
                </p>
              </div>
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
