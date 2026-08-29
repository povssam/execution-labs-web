"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./ui/Button";
import { Logo } from "./brand/Logo";

type NavLink = { href: string; label: string; section?: string };

const links: NavLink[] = [
  { href: "/#selected-work", label: "Project portfolio", section: "selected-work" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/#process", label: "Process", section: "process" },
  { href: "/contact", label: "Contact" },
];

const scrollSpyIds = ["selected-work", "process"];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const scrollFrame = useRef<number | null>(null);
  const open = openPathname === pathname;

  useEffect(() => {
    const getActiveSection = () => {
      const marker = window.innerHeight * 0.38;
      const sections = scrollSpyIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);
      const active = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= marker && bounds.bottom > marker;
      });

      if (active) return active.id;

      const passed = sections.filter((section) => section.getBoundingClientRect().bottom <= marker);
      return passed.at(-1)?.id ?? null;
    };

    const updateScrollState = () => {
      const scrollY = window.scrollY;

      setScrolled(scrollY > 12);
      setActiveSection(getActiveSection());
      scrollFrame.current = null;
    };

    const onScroll = () => {
      if (scrollFrame.current !== null) return;
      scrollFrame.current = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scrollFrame.current !== null) window.cancelAnimationFrame(scrollFrame.current);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = root.style.overflow;
    document.body.style.overflow = "hidden";
    root.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      root.style.overflow = previousRootOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpenPathname(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPathname(null);
    };

    desktop.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  // Scrollspy: highlight the homepage section currently in view.
  // Off the homepage, isActive() ignores activeSection, so a stale value is harmless.
  const isActive = (link: NavLink) => {
    if (link.section) return pathname === "/" && activeSection === link.section;
    if (link.href === "/") return pathname === "/";
    return pathname.startsWith(link.href);
  };

  const handleLinkClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    link: NavLink,
  ) => {
    setOpenPathname(null);
    if (pathname !== "/" || !link.section) return;

    event.preventDefault();
    window.setTimeout(() => {
      const target = document.getElementById(link.section!);
      if (!target) return;
      window.history.pushState(null, "", `#${link.section}`);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <>
      <header
        className="site-header fixed inset-x-0 top-0 z-50 transition-all duration-300"
        data-scrolled={scrolled}
        data-menu-open={open}
      >
        <nav className="site-container site-nav flex h-[var(--nav-height)] items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-bone">
            <Logo size={20} />
            Execution Labs
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => handleLinkClick(event, link)}
                aria-current={isActive(link) ? "page" : undefined}
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
            aria-controls="mobile-navigation"
            onClick={() => setOpenPathname(open ? null : pathname)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-charcoal/70 text-bone transition-colors duration-150 hover:border-bone/40 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

      </header>

      {open && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-x-0 bottom-0 top-[var(--nav-height)] z-40 overscroll-contain overflow-y-auto border-t border-line bg-ink/98 backdrop-blur-xl lg:hidden"
        >
          <div className="site-container flex min-h-full flex-col gap-1 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => handleLinkClick(event, link)}
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
              <ButtonLink href="/contact" onClick={() => setOpenPathname(null)} className="w-full">
                Start a project
                <ArrowRight size={15} />
              </ButtonLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
