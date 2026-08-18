"use client";

import SolutionStageTemplate, { ProjectType, PublicationType } from "@/components/SolutionStageTemplate";

export default function ScalePage() {
  const project: ProjectType = {
    title: "Collaborative Care Model (COCM)",
    subtitle: "Government Network Integration",
    description: "An integrated, collaborative care system training primary care clinicians and local CHWs to screen, monitor, and treat moderate-to-severe depression and anxiety. This care protocol features structural integration in health posts, shared clinical registries, and remote psychiatric consultation.",
    image: "/hero_complex_solve.jpg",
    linkText: "Read COCM Integration Guide",
    linkUrl: "https://pubmed.ncbi.nlm.nih.gov/21394199/"
  };

  const publications: PublicationType[] = [
    {
      title: "Integrating mental health into primary care in rural Nepal: A collaborative care registry-based implementation research study",
      journal: "Lancet Psychiatry (Placeholder)",
      link: "https://pubmed.ncbi.nlm.nih.gov/21394199/"
    },
    {
      title: "National Community Health Worker Program scaling in municipal structures: Assessment of electronic medical record adoption",
      journal: "Journal of Medical Systems (Placeholder)",
      link: "https://pubmed.ncbi.nlm.nih.gov/21394199/"
    }
  ];

  return (
    <SolutionStageTemplate
      stageId="scale"
      stageName="Scale"
      stageSubtitle="Transitioning validated clinical and data workflows directly into government networks and municipal healthcare infrastructures for long-term sustainability."
      colorClass="text-accent-purple"
      badgeBgClass="bg-accent-purple/10"
      project={project}
      publications={publications}
    />
  );
}
