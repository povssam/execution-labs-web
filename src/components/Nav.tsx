"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./ui/Button";
import { Logo } from "./brand/Logo";

type NavLink = { href: string; label: string; section?: string };

const links: NavLink[] = [
  { href: "/#services", label: "Services", section: "services" },
  { href: "/#work", label: "Work", section: "work" },
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

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Close the menu on any route change so the scroll lock is always released.
  // Client-side navigation does not unmount Nav, so without this the lock can
  // outlive the menu and trap page scroll. Reconciled during render (React's
  // recommended pattern) rather than in an effect, so no cascading render.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

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
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
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

        <div className="hidden items-center lg:flex">
          <ButtonLink href="/contact" className="px-5 py-2">
            Start a project
            <ArrowRight size={15} />
          </ButtonLink>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-charcoal/70 text-bone transition-colors duration-150 hover:border-bone/40 lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-line bg-ink/98 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col gap-1 px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-lg border border-transparent px-3 py-3 text-base transition-colors duration-150",
                  isActive(link)
                    ? "border-line bg-charcoal text-bone"
                    : "text-bone-dim hover:bg-charcoal-2 hover:text-bone",
                )}
              >
                <span>{link.label}</span>
                <ArrowRight size={14} className="text-bone-faint" />
              </Link>
            ))}
            <div className="mt-3">
              <ButtonLink
                href="/contact"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Start a project
                <ArrowRight size={15} />
              </ButtonLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
