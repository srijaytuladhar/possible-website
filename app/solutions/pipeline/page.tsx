"use client";

import SolutionStageTemplate, { SolutionBoxType } from "@/components/SolutionStageTemplate";

export default function PipelinePage() {
  const introText =
    "Explore the culturally grounded solutions in our pipeline. We are actively seeking collaborative partners and resources to move these solutions into action. If you're interested in collaborating, please connect with us at research@possiblehealth.org.";

  const projects: SolutionBoxType[] = [
    {
      id: "school-mental-health",
      title: "Nurse-led mental health support for public schools",
      description: [
        "Nearly half of all lifetime mental health conditions take root before adulthood, and in Nepal, nearly 7 million children sit in a classroom every school day. Possible is working with the government to position school nurses as the first line of mental health support for students, teachers, and parents. Still in its earliest stage — preparing to co-design with schools, nurses, and families before building the evidence base needed to reach national scale."
      ],
      image: "/second-landing.jpg"
    },
    {
      id: "ai-supportive-supervision",
      title: "AI-assisted supportive supervision for non-specialist health workers",
      description: [
        "Nepal has widened access to mental health care by training non-specialists to deliver it."
        /* TODO: awaiting remaining copy from client */
      ],
      image: "/hero_digital.png"
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
      introText={introText}
    />
  );
}
