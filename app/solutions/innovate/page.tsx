"use client";

import SolutionStageTemplate, { SolutionBoxType } from "@/components/SolutionStageTemplate";

export default function InnovatePage() {
  const projects: SolutionBoxType[] = [
    {
      id: "casa",
      title: "CASA",
      subtitle: "Supporting caregivers of children with Autism",
      description: [
        "CASA is a mobile health app being developed with caregivers, health care workers, and experts to support caregivers of children with autism — providing simple, practical tips for communication, new skills, everyday challenges, and caregiver well-being. It will be tested for three months with caregivers and therapists at two autism care centers in Nepal to assess acceptability and feasibility."
      ],
      image: "/solutions_innovate/CASA.jpg",
      publications: [
        {
          title: "Caregiver skills training for families of children with developmental delays or disabilities.",
          link: "https://www.who.int/publications/i/item/9789240048836"
        }
      ]
    },
    {
      id: "srhr-disabilities",
      title: "Reimagining sexual and reproductive health services with women with disabilities",
      description: [
        "Women with disabilities often face barriers to accessing sexual and reproductive health information and services. Possible worked alongside women with diverse disabilities, the Nepal Disabled Women's Association, and other stakeholders to understand these experiences and co-design an intervention grounded in their needs, priorities, and lived realities."
      ],
      image: "/solutions_innovate/Reimagining sexual and reproductive health services with women with disabilities.JPG"
    }
  ];

  return (
    <SolutionStageTemplate
      stageId="innovate"
      stageNumber="3"
      stageName="INNOVATE"
      colorClass="text-primary-pink"
      badgeBgClass="bg-primary-pink/10"
      borderClass="border-primary-pink/20"
      projects={projects}
    />
  );
}
