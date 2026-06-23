import { Hero } from "@/components/home/Hero";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { UIShowcase } from "@/components/home/UIShowcase";
import { WorkCarousel } from "@/components/home/WorkCarousel";
import { Process } from "@/components/home/Process";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeBuild />
      <UIShowcase />
      <WorkCarousel />
      <Process />
      <FinalCTA />
    </>
  );
}
