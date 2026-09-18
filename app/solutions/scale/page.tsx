"use client";

import SolutionStageTemplate, { SolutionBoxType } from "@/components/SolutionStageTemplate";

export default function ScalePage() {
  const projects: SolutionBoxType[] = [
    {
      id: "longitudinal-care",
      title: "Strengthening community health system through longitudinal care: From pilot to scale",
      description: [
        "Too often, health systems reach families only when they seek care, leaving gaps in continuous support that could prevent illness, identify risks early, and address health needs before they become more serious. Pregnancies may go undetected until late, newborns may miss critical follow-up, and chronic conditions may remain unmanaged until they become emergencies — gaps that are costly to fix.",
        "ProCHWs — local, trained, supervised, salaried, full-time, and digitally enabled community health workers — close that gap by bringing integrated, longitudinal care directly into the community. Possible, in collaboration with the government, designed the model, grounded in WHO's guidelines for CHW programs, and tested it as a national pilot focused initially on bundled maternal and child health services. The pilot generated evidence that community-based, longitudinal care improves access and outcomes — reducing home deliveries, catching high-risk pregnancies earlier, and increasing follow-up care — while remaining affordable within the public health system.",
        "We are now working with the government and community-based partners to strengthen and evolve the model for national scale-up: refining the delivery workflows, building the evidence base, and exploring how ProCHWs can extend beyond maternal and child health to provide a broader continuum of care across the life course.",
        "This isn't a parallel program, it's a government-owned system built to last."
      ],
      image: "/DH__0457.jpg",
      publications: [
        {
          title: "A Type II hybrid effectiveness-implementation study of an integrated CHW intervention to address maternal healthcare in rural Nepal.",
          link: "https://doi.org/10.1371/journal.pgph.0001512"
        },
        {
          title: "Costing Analysis of a Pilot Community Health Worker Program in Rural Nepal.",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7326517/"
        },
        {
          title: "Postpartum contraception outcomes from a pre-post effectiveness-implementation study of an integrated community health worker intervention in rural Nepal.",
          link: "https://doi.org/10.1186/s12978-025-02225-5"
        },
        {
          title: "The power of peers: an effectiveness evaluation of a cluster-controlled trial of group antenatal care in rural Nepal.",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6805428/"
        },
        {
          title: "Labour conditions in dual-cadre community health worker programs: a systematic review.",
          link: "https://www.thelancet.com/action/showPdf?pii=S2214-109X%2823%2900357-1"
        },
        {
          title: "Comparing two data collection methods to track vital events in maternal and child health via community health workers in rural Nepal.",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9327361/"
        }
      ]
    },
    {
      id: "collaborative-care",
      title: "Collaborative care for improving mental health care within primary health care settings",
      description: [
        "An integrated model that trains CHWs and clinicians to identify and manage depression and anxiety within primary care settings. Co-designed and tested in remote districts in Nepal, now informing WHO-endorsed national training manuals for scale-up."
      ],
      image: "/DH__1913.jpg",
      publications: [
        {
          title: "Collaborative care model for depression in rural Nepal: a mixed-methods implementation research study.",
          link: "https://bmjopen.bmj.com/content/11/8/e048481"
        },
        {
          title: "Collaborative Care for Mental Health in Low- and Middle-Income Countries: A WHO Health Systems Framework Assessment of Three Programs.",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5790311/"
        },
        {
          title: "Improving the Quality of Global Mental Health Services with Digital Tools: Best Practices and Lessons Learned from Rural Nepal.",
          link: "https://doi.org/10.1007/s41347-024-00389-8"
        },
        {
          title: "Addressing challenges for psychotherapy supervision in global mental health through experiential learnings from rural Nepal.",
          link: "https://doi.org/10.1186/s12982-025-00645-z"
        },
        {
          title: "Evidence-based, multilevel interventions for sustained behaviour change.",
          link: "https://pubmed.ncbi.nlm.nih.gov/37858578/"
        }
      ]
    }
  ];

  return (
    <SolutionStageTemplate
      stageId="scale"
      stageNumber="1"
      stageName="SCALE"
      colorClass="text-accent-purple"
      badgeBgClass="bg-accent-purple/10"
      borderClass="border-accent-purple/20"
      projects={projects}
    />
  );
}
