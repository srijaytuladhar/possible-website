"use client";

import SolutionStageTemplate, { ProjectType, PublicationType } from "@/components/SolutionStageTemplate";

export default function PipelinePage() {
  const project: ProjectType = {
    title: "AI-Enabled Supportive Supervision",
    subtitle: "Technology Pipeline",
    description: "Building intelligent assistant models for remote health post supervisors. By leveraging natural language processing and structured data reviews, the system automatically audits community health worker reporting and translates clinical charts into tailored feedback.",
    image: "/hero_digital.png",
    linkText: "Read AI Auditing Brief",
    linkUrl: "https://pubmed.ncbi.nlm.nih.gov/21394199/"
  };

  const publications: PublicationType[] = [
    {
      title: "AI-assisted clinical auditing for community health workers in low-resource settings: Feasibility and safety protocol",
      journal: "NPJ Digital Medicine (Placeholder)",
      link: "https://pubmed.ncbi.nlm.nih.gov/21394199/"
    },
    {
      title: "Climate change effects on rural healthcare infrastructure in the Himalayas: An exploratory framework",
      journal: "Environmental Health Perspectives (Placeholder)",
      link: "https://pubmed.ncbi.nlm.nih.gov/21394199/"
    }
  ];

  return (
    <SolutionStageTemplate
      stageId="pipeline"
      stageName="Pipeline"
      stageSubtitle="Innovative concepts and exploratory projects at the early research or trial planning stage, anticipating the future landscape of healthcare."
      colorClass="text-amber-600"
      badgeBgClass="bg-amber-100 text-amber-800"
      project={project}
      publications={publications}
    />
  );
}
