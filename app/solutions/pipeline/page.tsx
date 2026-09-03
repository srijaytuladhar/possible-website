"use client";

import SolutionStageTemplate, { SolutionBoxType } from "@/components/SolutionStageTemplate";

export default function PipelinePage() {
  const projects: SolutionBoxType[] = [
    {
      id: "climate-health",
      title: "Addressing the intersection of climate and health",
      description: "Our working proposal aims to explore how extreme weather events can increase domestic violence and affect mental health. We will develop a brief family support program for families affected by these intersecting challenges. We will work with communities to design the program and test whether it is practical and helpful for families experiencing domestic violence after extreme weather events.",
      image: "/hero_digital.png"
    },
    {
      id: "school-mental-health",
      title: "Nurse-led mental health support for public schools",
      description: "Nearly half of all lifetime mental health conditions take root before adulthood, and in Nepal, nearly 7 million children are sitting in a classroom every school day. We're working with the government to position school nurses as the first line of mental health support for students, teachers, and parents. This solution hasn't been piloted yet. It’s still in its earliest stage, preparing to co design with schools, nurses and families before we move ahead building the evidence needed to reach national scale."
    }
  ];

  return (
    <SolutionStageTemplate
      stageId="pipeline"
      stageNumber="4"
      stageName="PIPELINE"
      colorClass="text-amber-600"
      badgeBgClass="bg-amber-100 text-amber-800"
      borderClass="border-amber-500/20"
      projects={projects}
    />
  );
}
