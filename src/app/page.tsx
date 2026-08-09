import { Hero } from "@/components/home/Hero";
import { GlobalStatement } from "@/components/home/GlobalStatement";
import { WorkedWith } from "@/components/home/WorkedWith";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { MotionWork } from "@/components/home/MotionWork";
import { WorkCarousel } from "@/components/home/WorkCarousel";
import { Process } from "@/components/home/Process";
import { ClientSignals } from "@/components/home/ClientSignals";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkedWith />
      <GlobalStatement />
      <MotionWork />
      <WorkCarousel />
      <WhatWeBuild />
      <Process />
      <ClientSignals />
      <FinalCTA />
    </>
  );
}
