import { Hero } from "@/components/home/Hero";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { WhyUs } from "@/components/home/WhyUs";
import { Founder } from "@/components/home/Founder";
import { WorkCarousel } from "@/components/home/WorkCarousel";
import { Testimonials } from "@/components/home/Testimonials";
import { Process } from "@/components/home/Process";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeBuild />
      <WhyUs />
      <Founder />
      <WorkCarousel />
      <Testimonials />
      <Process />
      <FinalCTA />
    </>
  );
}
