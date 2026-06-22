import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "./ui/Container";

const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-bone" />
              Execution Labs
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-bone-dim">
              We build agents and software that save companies time and money.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone-faint">
                Pages
              </span>
              {nav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-bone-dim transition-colors hover:text-bone"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone-faint">
                Connect
              </span>
              <a
                href="https://x.com/execution_labs?s=21"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-bone-dim transition-colors hover:text-bone"
              >
                X / Twitter
                <ArrowUpRight size={14} />
              </a>
              <a
                href="mailto:hello@executionlabs.com"
                className="text-sm text-bone-dim transition-colors hover:text-bone"
              >
                hello@executionlabs.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-bone-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Execution Labs. All rights reserved.</span>
          <span className="font-mono">Built to ship.</span>
        </div>
      </Container>
    </footer>
  );
}
