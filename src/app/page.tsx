import { Hero } from "@/components/home/Hero";
import { GlobalStatement } from "@/components/home/GlobalStatement";
import { WorkedWith } from "@/components/home/WorkedWith";
import { WorkCarousel } from "@/components/home/WorkCarousel";
import { Process } from "@/components/home/Process";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <div className="home-opening">
        <Hero />
        <WorkedWith />
      </div>
      <GlobalStatement />
      <WorkCarousel />
      <Process />
      <FinalCTA compact />
    </>
  );
}
