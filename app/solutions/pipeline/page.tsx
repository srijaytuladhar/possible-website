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
        "Nearly half of all lifetime mental health conditions take root before adulthood,  and in Nepal, nearly 7 million children are sitting in a classroom every school day. We're working with the government to position school nurses as the first line of mental health support for students, teachers, and parents. This solution hasn't been piloted yet. It’s still in its earliest stage, preparing to co design with schools, nurses and families before we move ahead building the evidence needed to reach national scale."
      ],
      image: "/pipeline1.jpg"
    },
    {
      id: "ai-supportive-supervision",
      title: "AI-assisted supportive supervision for non-specialist health workers",
      description: [
        "Nepal has widened access to mental health care by training non-specialists to deliver it. It is evident that the health workers and communities doing this work refer to ongoing supportive supervision as one of the conditions that make it work. Right now that means a supervisor observing a session, reviewing a recording, or debriefing afterwards with one worker at a time. It works. But as more workers are trained, both the reach and the consistency of that supervision remain unaddressed. We're designing and testing an AI-assisted supportive supervision model so non-specialists can rehearse difficult cases and get feedback whenever they need it, with their human supervisor still in the loop. It is designed to run on open models that could be owned outright, so one more worker practicing costs almost nothing. The pilot starts this year: first co-designing the tool with the non-specialists and field experts using human centered design, then testing whether it is safe, acceptable, and feasible in routine practice."
      ],
      image: "/pipeline2.jpg"
    },
    {
      id: "climate-change-health",
      title: "Addressing the intersection of climate change and health",
      description: [
        "Nepal ranks 10th globally in historical climate disaster impacts (Eckstein et al., 2019). While physical infrastructure and direct health impact dominate the narrative, extreme weather events can also escalate mental health issues and increase the risk of violence.",
        "Our working proposal aims to explore how extreme weather events can increase domestic violence and affect mental health, and develop a brief family support program for families affected by these intersecting challenges. We will work with communities to design the program and test whether it is practical and helpful for families experiencing domestic violence after extreme weather events."
      ],
      image: "/hero_complex_solve.jpg"
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
