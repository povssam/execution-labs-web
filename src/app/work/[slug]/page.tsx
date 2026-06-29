import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Download, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { FinalCTA } from "@/components/home/FinalCTA";
import { GraceVideo } from "@/components/work/GraceVideo";
import { OrbitCaseReveal } from "@/components/work/OrbitCaseReveal";
import { caseStudies } from "@/lib/data";

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return { title: "Work | Execution Labs" };
  return {
    title: `${study.client} | Work | Execution Labs`,
    description: study.summary,
  };
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div className="border-t border-line pt-6">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
        {label}
      </span>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-bone-dim">
        {body}
      </p>
    </div>
  );
}

function GraceAssetBlock() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
      <div className="overflow-hidden rounded-2xl border border-line bg-charcoal/40">
        <div className="aspect-video bg-ink">
          <GraceVideo controls label="Grace animation final" />
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-2xl border border-line bg-charcoal/40 p-6">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
            Real project asset
          </span>
          <h2 className="mt-3 text-2xl font-medium text-bone">
            Grace Animation Final
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-bone-dim">
            The motion piece shows how the identity, interface direction, and
            social system move together. It is the proof asset for the Grace
            brand system.
          </p>
        </div>

        <div className="mt-8 grid gap-3">
          <a
            href="/brand/grace/grace-branding-concept.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm text-bone-dim transition-colors duration-150 hover:border-bone/30 hover:text-bone"
          >
            <span className="inline-flex items-center gap-2">
              <FileText size={16} />
              View brand concept PDF
            </span>
            <ArrowUpRight size={15} className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="/brand/grace/grace-branding-concept.pdf"
            download
            className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm text-bone-dim transition-colors duration-150 hover:border-bone/30 hover:text-bone"
          >
            <span className="inline-flex items-center gap-2">
              <Download size={16} />
              Download brand concept
            </span>
            <ArrowRight size={15} className="transition-transform duration-150 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const index = caseStudies.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();

  const study = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden />
        <Container className="relative">
          <Reveal>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-bone-dim transition-colors hover:text-bone"
            >
              <ArrowLeft size={16} />
              All work
            </Link>
          </Reveal>

          <div className="mt-8 max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-bone-dim">
                  {study.category}
                </span>
                <span className="font-mono text-xs text-bone-faint">
                  {study.year}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-bone sm:text-6xl">
                {study.client}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-lg text-bone-dim">
                {study.summary}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container>
          <Reveal className="flex flex-col gap-6">
            <Section label="Problem" body={study.problem} />
            <Section label="What we built" body={study.built} />
          </Reveal>

          {study.slug === "grace" && (
            <Reveal delay={0.08} className="mt-8">
              <GraceAssetBlock />
            </Reveal>
          )}

          {study.slug === "orbit-artist-group" && (
            <Reveal delay={0.08} className="mt-8">
              <OrbitCaseReveal />
            </Reveal>
          )}

          <Reveal className="mt-8">
            <figure className="rounded-2xl border border-line bg-charcoal/40 p-8 sm:p-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
                Result
              </span>
              <blockquote className="mt-4 max-w-2xl text-2xl font-medium leading-snug tracking-tight text-bone sm:text-3xl">
                {study.result}
              </blockquote>
            </figure>
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-3 py-1 text-[12px] text-bone-dim"
              >
                {tag}
              </span>
            ))}
          </Reveal>

          <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <ButtonLink href="/contact">
              Start a project like this
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </ButtonLink>
            <Link
              href={`/work/${next.slug}`}
              className="group inline-flex items-center gap-2 text-sm text-bone-dim transition-colors hover:text-bone"
            >
              Next: {next.client}
              <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
