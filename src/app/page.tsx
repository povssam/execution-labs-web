import { Hero } from "@/components/home/Hero";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { WhyUs } from "@/components/home/WhyUs";
import { WorkCarousel } from "@/components/home/WorkCarousel";
import { Process } from "@/components/home/Process";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeBuild />
      <WhyUs />
      <WorkCarousel />
      <Process />
      <FinalCTA />
    </>
  );
}
