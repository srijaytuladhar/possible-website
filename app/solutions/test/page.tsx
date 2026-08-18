"use client";

import SolutionStageTemplate, { ProjectType, PublicationType } from "@/components/SolutionStageTemplate";

export default function TestPage() {
  const project: ProjectType = {
    title: "Family Intervention MILAP",
    subtitle: "Randomized Controlled Trial",
    description: "A family-based behavioral intervention co-created with WOREC that engages husbands and mothers-in-law to prevent intimate partner violence. Efficacy trials demonstrate significant reductions in domestic abuse and clinical depression symptoms among participating rural women.",
    image: "/who_we_are_team.jpg",
    linkText: "Read MILAP Efficacy Study",
    linkUrl: "https://pubmed.ncbi.nlm.nih.gov/21394199/"
  };

  const publications: PublicationType[] = [
    {
      title: "Addressing Intimate Partner Violence in Rural Nepal: Efficacy of the MILAP Family-Based Behavioral Intervention",
      journal: "BMJ Global Health (Placeholder)",
      link: "https://pubmed.ncbi.nlm.nih.gov/21394199/"
    },
    {
      title: "COMMIT-D: Integrating mobile health tools with motivational interviewing for depression counseling in primary care: A cluster trial protocol",
      journal: "Lancet Psychiatry (Placeholder)",
      link: "https://pubmed.ncbi.nlm.nih.gov/21394199/"
    },
    {
      title: "Structural stigma-reduction evaluation in public HIV clinics in Nepal (INCLUDE Study)",
      journal: "JAIDS (Placeholder)",
      link: "https://pubmed.ncbi.nlm.nih.gov/21394199/"
    }
  ];

  return (
    <SolutionStageTemplate
      stageId="test"
      stageName="Test"
      stageSubtitle="Evaluating clinical models, tools, and platforms through scientific research trials. We test feasibility, acceptability, and efficacy before moving models into broader public systems."
      colorClass="text-secondary-blue"
      badgeBgClass="bg-secondary-blue/10"
      project={project}
      publications={publications}
    />
  );
}
