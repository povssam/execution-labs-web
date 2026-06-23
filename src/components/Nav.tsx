"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./ui/Button";
import { Logo } from "./brand/Logo";
import { CALENDAR_URL } from "@/lib/site";

type NavLink = { href: string; label: string; section?: string };

const links: NavLink[] = [
  { href: "/#what-we-build", label: "What we build", section: "what-we-build" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/#process", label: "Process", section: "process" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight the homepage section currently in view.
  // Off the homepage, isActive() ignores activeSection, so a stale value is harmless.
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = links.filter((l) => l.section).map((l) => l.section!);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (link: NavLink) => {
    if (link.section) return pathname === "/" && activeSection === link.section;
    if (link.href === "/") return pathname === "/";
    return pathname.startsWith(link.href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-line glass" : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-bone">
          <Logo size={20} />
          Execution Labs
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm transition-colors duration-200",
                isActive(link) ? "text-bone" : "text-bone-dim hover:text-bone",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href={CALENDAR_URL} variant="secondary" className="px-4 py-2">
            Book a call
          </ButtonLink>
          <ButtonLink href="/contact" className="px-5 py-2">
            Start a project
          </ButtonLink>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-bone lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line glass lg:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-bone-dim hover:bg-charcoal-2 hover:text-bone"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <ButtonLink
                href={CALENDAR_URL}
                variant="secondary"
                className="w-full"
              >
                Book a call
              </ButtonLink>
              <ButtonLink href="/contact" className="w-full">
                Start a project
              </ButtonLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
