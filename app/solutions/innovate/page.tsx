"use client";

import SolutionStageTemplate, { ProjectType, PublicationType } from "@/components/SolutionStageTemplate";

export default function InnovatePage() {
  const project: ProjectType = {
    title: "Disability Intervention — CASA",
    subtitle: "Active Co-Design",
    description: "A community-based disability support intervention that co-designs assistive care pathways directly with family caregivers in rural Nepal. CASA aims to integrate home-based rehabilitation workflows into municipal programs to enhance social inclusion, decrease stigma, and improve quality of life for children and adults with physical and cognitive disabilities.",
    image: "/health_process.jpg",
    linkText: "Read CASA Study",
    linkUrl: "https://pubmed.ncbi.nlm.nih.gov/21394199/"
  };

  const publications: PublicationType[] = [
    {
      title: "Co-designing home-based disability care pathways with family caregivers in rural Nepal: A qualitative co-design protocol",
      journal: "BMJ Global Health (Placeholder)",
      link: "https://pubmed.ncbi.nlm.nih.gov/21394199/"
    },
    {
      title: "Community-led rehabilitation protocols for pediatric cognitive disabilities in low-resource settings",
      journal: "Lancet Global Health (Placeholder)",
      link: "https://pubmed.ncbi.nlm.nih.gov/21394199/"
    }
  ];

  const additionalProjects: ProjectType[] = [
    {
      title: "CASA: Pilot study to evaluate the acceptability and feasibility of an mHealth app for enhancing Caregiver Assistance in Supporting children with Autism (CASA)",
      subtitle: "Pilot Study",
      description: "CASA is a mHealth app being developed with people with lived experience to support caregivers providing care to children with autism. CASA will provide simple, practical at-home guidance on communication, learning new skills, solving everyday challenges, and caring for caregivers' own well-being, based on guidance from the World Health Organization Caregiver Skills Training (WHO-CST). We will pilot test the app for three months with caregivers and therapists at two autism care centers in Nepal to understand how useful, easy to use, and suitable it is for caregivers."
    }
  ];

  return (
    <SolutionStageTemplate
      stageId="innovate"
      stageName="Innovate"
      stageSubtitle="Co-designing customized healthcare interventions directly with local community groups, patients, and administrators. This phase focuses on developing the initial protocols and workflows."
      colorClass="text-primary-pink"
      badgeBgClass="bg-primary-pink/10"
      project={project}
      additionalProjects={additionalProjects}
      publications={publications}
    />
  );
}
