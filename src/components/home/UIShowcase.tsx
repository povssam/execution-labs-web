import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import {
  AgentRunCard,
  WorkflowCard,
  TaskBoardCard,
  CodeCard,
  PipelineCard,
  ChartCard,
  StatusCard,
  InboxCard,
} from "./ui-cards";

type Card = React.ComponentType;

function Column({
  cards,
  duration,
  reverse,
  className,
}: {
  cards: Card[];
  duration: string;
  reverse?: boolean;
  className?: string;
}) {
  // Render the set twice so the -50% translate loops seamlessly.
  const set = [...cards, ...cards];
  return (
    <div className={className}>
      <div className="marquee-mask h-[480px] overflow-hidden sm:h-[560px] lg:h-[600px]">
        <div
          className={reverse ? "marquee-col reverse flex flex-col gap-4" : "marquee-col flex flex-col gap-4"}
          style={{ ["--mq-dur" as string]: duration }}
        >
          {set.map((C, i) => (
            <C key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function UIShowcase() {
  return (
    <section className="showcase relative overflow-hidden border-t border-line py-16 sm:py-24">
      <Container>
        <SectionHeading
          label="Live product"
          title="What we actually put in your hands"
          description="Not slideware. Working agents, pipelines, and tools, built around how your team runs."
        />
      </Container>

      <Reveal className="relative mt-12">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(231,227,218,0.06),transparent_70%)] blur-2xl"
          aria-hidden
        />
        <Container className="relative">
          <div className="flex justify-center gap-4">
            <Column
              className="w-full max-w-sm flex-1"
              duration="40s"
              cards={[AgentRunCard, ChartCard, TaskBoardCard, PipelineCard]}
            />
            <Column
              className="hidden max-w-sm flex-1 sm:block"
              duration="32s"
              reverse
              cards={[CodeCard, WorkflowCard, StatusCard, InboxCard]}
            />
            <Column
              className="hidden max-w-sm flex-1 lg:block"
              duration="46s"
              cards={[PipelineCard, AgentRunCard, ChartCard, WorkflowCard]}
            />
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
