import { Hero } from "@/components/home/Hero";
import { WorkedWith } from "@/components/home/WorkedWith";
import { StudioStatement } from "@/components/home/StudioStatement";
import { Process } from "@/components/home/Process";
import { CapabilityStack } from "@/components/home/CapabilityStack";
import { ProjectPortfolio } from "@/components/home/ProjectPortfolio";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <div className="home-opening">
        <Hero />
        <WorkedWith />
      </div>
      <StudioStatement />
      <CapabilityStack />
      <ProjectPortfolio />
      <Process />
      <FinalCTA compact />
    </>
  );
}
