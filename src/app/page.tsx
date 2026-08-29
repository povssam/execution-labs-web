import { Hero } from "@/components/home/Hero";
import { WorkedWith } from "@/components/home/WorkedWith";
import { Process } from "@/components/home/Process";
import { CapabilityStack } from "@/components/home/CapabilityStack";
import { EvidenceViewport } from "@/components/home/EvidenceViewport";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <div className="home-opening">
        <Hero />
        <WorkedWith />
      </div>
      <CapabilityStack />
      <EvidenceViewport />
      <Process />
      <FinalCTA compact />
    </>
  );
}
