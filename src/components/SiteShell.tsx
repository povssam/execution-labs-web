"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BrandAtmosphere } from "@/components/BrandAtmosphere";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Preloader } from "@/components/Preloader";
import { SmoothScroll } from "@/components/SmoothScroll";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isolated = pathname === "/orbit-preview" || pathname.startsWith("/orbit-preview/");

  if (isolated) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <BrandAtmosphere intensity="soft" fixed />
      <Preloader />
      <SmoothScroll />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
