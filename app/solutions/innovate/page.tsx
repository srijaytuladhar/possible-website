"use client";

import SolutionStageTemplate, { SolutionBoxType } from "@/components/SolutionStageTemplate";

export default function InnovatePage() {
  const projects: SolutionBoxType[] = [
    {
      id: "casa",
      title: "CASA",
      subtitle: "Supporting caregivers of children with Autism",
      description: "CASA is a mobile health app being developed with caregivers, health care workers and experts, to support caregivers of children with autism. It will provide simple, practical tips that caregivers can use at home to help children communicate, learn new skills, manage everyday challenges, and take care of their own well-being. We will test the app for three months with caregivers and therapists at two autism care centers in Nepal to understand if it is acceptable and feasible to use.",
      image: "/health_process.jpg",
      publications: [
        {
          title: "Co-designing home-based disability care pathways with family caregivers in rural Nepal: A qualitative co-design protocol",
          link: "https://doi.org/10.1136/bmjgh-2024-placeholder"
        },
        {
          title: "Community-led rehabilitation protocols for pediatric cognitive disabilities in low-resource settings",
          link: "https://doi.org/10.1016/S2214-109X(24)placeholder"
        }
      ]
    },
    {
      id: "srhr-disabilities",
      title: "Reimagining sexual and reproductive health services with women with disabilities",
      description: "Women with disabilities often face barriers to accessing sexual and reproductive health information and services. Possible worked alongside women with diverse disabilities, the Nepal Disabled Women’s Association, and other stakeholders to understand these experiences and co-design an intervention grounded in their needs, priorities, and lived realities."
    }
  ];

  return (
    <SolutionStageTemplate
      stageId="innovate"
      stageNumber="1"
      stageName="INNOVATE"
      colorClass="text-primary-pink"
      badgeBgClass="bg-primary-pink/10"
      borderClass="border-primary-pink/20"
      projects={projects}
    />
  );
}
