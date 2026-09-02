"use client";

import SolutionStageTemplate, { SolutionBoxType } from "@/components/SolutionStageTemplate";

export default function ScalePage() {
  const projects: SolutionBoxType[] = [
    {
      id: "collaborative-care",
      title: "Collaborative care for improving mental health care within primary health care settings",
      subtitle: "Integrated Primary Care Mental Health Model",
      description: "An integrated model that trains CHWs and clinicians to identify and manage depression and anxiety within primary care settings. This model is co-designed and tested in remote districts in Nepal, and is now informing WHO-endorsed national training manuals for scale-up.",
      image: "/hero_complex_solve.jpg",
      publications: [
        {
          title: "Collaborative care model for depression in rural Nepal: a mixed-methods implementation research study. doi: 10.1136/bmjopen-2020-048481.",
          link: "https://doi.org/10.1136/bmjopen-2020-048481"
        },
        {
          title: "Collaborative Care for Mental Health in Low- and Middle-Income Countries: A WHO Health Systems Framework Assessment of Three Programs. doi: 10.1176/appi.ps.201700232.",
          link: "https://doi.org/10.1176/appi.ps.201700232"
        },
        {
          title: "Improving the Quality of Global Mental Health Services with Digital Tools: Best Practices and Lessons Learned from Rural Nepal. doi: 10.1007/s41347-024-00389-8.",
          link: "https://doi.org/10.1007/s41347-024-00389-8"
        },
        {
          title: "Evidence-based, multilevel interventions for sustained behaviour change. doi: 10.1016/S2214-109X(23)00372-8.",
          link: "https://doi.org/10.1016/S2214-109X(23)00372-8"
        },
        {
          title: "Rimal P, Shrestha S, Khatri R, Sapkota S, Swar SB., Basnet M, Sigdel K, Jirel S & Acharya B (2025). Addressing challenges for psychotherapy supervision in global mental health through experiential learnings from rural Nepal. Discover Public Health, 22(1), 246.",
          link: "https://doi.org/10.1186/s12982-025-00645-z"
        }
      ]
    },
    {
      id: "longitudinal-care",
      title: "Strengthening community health system through longitudinal care",
      subtitle: "From pilot to scale",
      description: [
        "Too often, health systems reach families only when they seek care, leaving gaps in continuous support that could prevent illness, identify risks early, and address health needs before they become more serious. Pregnancies may go undetected until late, newborns may miss critical follow-up, and chronic conditions may remain unmanaged until they become emergencies- gaps that are costly to fix.",
        "ProCHWs- local, trained, supervised, salaried, full-time, and digitally enabled community health workers, closes that gap by bringing integrated, longitudinal care directly into the community. Possible, in collaboration with the government, designed the model, grounded in WHO’s guidelines for CHW programs and tested it as a national pilot focused initially on bundled maternal and child health services. The pilot generated evidence that community-based, longitudinal care improves access and outcomes- reducing home deliveries, catching high-risk pregnancies earlier, and increasing follow-up care- while remaining affordable within the public health system.",
        "We are now working with the government and community-based partners to strengthen and evolve the model for national scale-up: refining the delivery workflows, building the evidence base, and exploring how ProCHWs can extend beyond maternal and child health to provide a broader continuum of care across the life course.",
        "This isn't a parallel program, it's a government-owned system built to last."
      ],
      publications: [
        {
          title: "A Type II hybrid effectiveness-implementation study of an integrated CHW intervention to address maternal healthcare in rural Nepal. doi: 10.1371/journal.pgph.0001512.",
          link: "https://doi.org/10.1371/journal.pgph.0001512"
        },
        {
          title: "\"Now that they come to our doorsteps to teach us these things…\" - Postpartum contraception outcomes from a pre-post effectiveness-implementation study of an integrated community health worker intervention in rural Nepal. doi: 10.1186/s12978-025-02225-5",
          link: "https://doi.org/10.1186/s12978-025-02225-5"
        },
        {
          title: "The power of peers: an effectiveness evaluation of a cluster-controlled trial of group antenatal care in rural Nepal. doi: 10.1186/s12978-019-0820-8.",
          link: "https://doi.org/10.1186/s12978-019-0820-8"
        },
        {
          title: "Costing Analysis of a Pilot Community Health Worker Program in Rural Nepal. doi: 10.9745/GHSP-D-19-00393.",
          link: "https://doi.org/10.9745/GHSP-D-19-00393"
        },
        {
          title: "Labour conditions in dual-cadre community health worker programs: a systematic review.",
          link: "https://www.thelancet.com/action/showPdf?pii=S2214-109X%2823%2900357-1"
        },
        {
          title: "Comparing two data collection methods to track vital events in maternal and child health via community health workers in rural Nepal. doi: 10.1186/s12963-022-00293-4.",
          link: "https://doi.org/10.1186/s12963-022-00293-4"
        }
      ]
    },
    {
      id: "become",
      title: "BECOME",
      subtitle: "Bringing integrated mental health and NCD care closer to home",
      description: "Expanding Nepal’s national community health worker program to deliver home-based care for chronic conditions and mental health. BECOME brings evidence-based behavioral support for common mental health conditions and non-communicable diseases into communities through trained, full time, trained, supervised, and digitally enabled CHWs. The intervention combines stress reduction, behavioral activation, and motivational interviewing to support people with conditions such as depression, anxiety, hypertension, and diabetes. CHWs conduct screening, behavioral intervention, and follow-up for diabetes, hypertension, depression, and anxiety, supported by the Community Health Information System (CHIS) for data-driven care.",
      publications: [
        {
          title: "A type II hybrid implementation-effectiveness study of the BECOME intervention: integrating Behavioral Community-Based Approaches for Mental Health and Non-Communicable Diseases delivered by community health workers - study protocol for a stepped wedge cluster randomized controlled trial. doi: 10.1186/s13063-026-09457-1.",
          link: "https://doi.org/10.1186/s13063-026-09457-1"
        },
        {
          title: "Cross-cultural adaptation of motivational interviewing for use in rural Nepal. BMC Psychol. doi: 10.1186/s40359-021-00557-y.",
          link: "https://doi.org/10.1186/s40359-021-00557-y"
        }
      ]
    },
    {
      id: "commit",
      title: "COMMIT",
      subtitle: "Improving treatment compliance using mHealth app",
      description: "COMMIT is a mHealth app designed with people with lived experience, health care workers and government to support health care providers in motivating patients to stay engaged in their treatment and care. We have tested this app through the network of our community health workers among young people living with HIV, patients with depression in different stages, and have observed improved treatment compliance over the time.",
      publications: [
        {
          title: "Community health workers' barriers and facilitators to use a novel mHealth tool for motivational interviewing to improve adherence to care among youth living with HIV in rural Nepal. doi: 10.3126/journal.pgph.0002911.",
          link: "https://doi.org/10.3126/journal.pgph.0002911"
        },
        {
          title: "Cross-cultural adaptation of motivational interviewing for use in rural Nepal. BMC Psychol. doi: 10.1186/s40359-021-00557-y.",
          link: "https://doi.org/10.1186/s40359-021-00557-y"
        },
        {
          title: "Acharya B, Sigdel K., Khatri R, Rimal P, Shrestha S, Sharma D, Shrestha J & Sapkota S (2024). Improving the quality of global mental health services with digital tools: Best practices and lessons learned from rural Nepal. Journal of Technology in Behavioral Science.",
          link: "https://doi.org/10.1007/s41347-024-00389-8"
        }
      ]
    }
  ];

  return (
    <SolutionStageTemplate
      stageId="scale"
      stageNumber="3"
      stageName="SCALE"
      stageSubtitle="Transitioning validated clinical and data workflows directly into government networks and municipal healthcare infrastructures for long-term sustainability."
      colorClass="text-accent-purple"
      badgeBgClass="bg-accent-purple/10"
      borderClass="border-accent-purple/20"
      projects={projects}
    />
  );
}
