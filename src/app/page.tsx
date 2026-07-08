import { Hero } from "@/components/home/Hero";
import { WorkedWith } from "@/components/home/WorkedWith";
import { GlobalStatement } from "@/components/home/GlobalStatement";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { SelectedWork } from "@/components/home/SelectedWork";
import { MotionWork } from "@/components/home/MotionWork";
import { Process } from "@/components/home/Process";
import { ClientSignals } from "@/components/home/ClientSignals";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkedWith />
      <GlobalStatement />
      <WhatWeBuild />
      <SelectedWork />
      <MotionWork />
      <Process />
      <ClientSignals />
      <FinalCTA />
    </>
  );
}
