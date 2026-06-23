import { Hero } from "@/components/home/Hero";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { PhoneShowcase } from "@/components/home/PhoneShowcase";
import { WorkCarousel } from "@/components/home/WorkCarousel";
import { Process } from "@/components/home/Process";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeBuild />
      <PhoneShowcase />
      <WorkCarousel />
      <Process />
      <FinalCTA />
    </>
  );
}
