"use client";

import SolutionStageTemplate, { SolutionSubSectionType } from "@/components/SolutionStageTemplate";

export default function TestPage() {
  const subSections: SolutionSubSectionType[] = [
    {
      subSectionId: "design-to-test",
      subSectionTitle: "DESIGN TO TEST",
      projects: [
        {
          id: "include",
          title: "INCLUDE",
          subtitle: "Addressing intersectional stigma and improving HIV care",
          description: [
            "About one-third of people living with HIV stop taking their medication because they fear others may find out about their HIV status [2022]. This is especially common among minority groups and people facing mental health challenges.",
            "INCLUDE is a digital tool co-designed with government and communities, including people with lived experiences to identify and reduce stigma in HIV clinics, improving care for people living with HIV and addressing discrimination tied to gender, race, and mental health. We are currently testing INCLUDE in four HIV treatment centers to explore if it is acceptable, feasible and helpful to use in improving HIV care and support."
          ],
          publications: [
            {
              title: "Community health workers' barriers and facilitators to use a novel mHealth tool for motivational interviewing to improve adherence to care among youth living with HIV in rural Nepal. doi: 10.3126/journal.pgph.0002911.",
              link: "https://doi.org/10.3126/journal.pgph.0002911"
            },
            {
              title: "Acharya B, Sigdel K., Khatri R, Rimal P, Shrestha S, Sharma D, Shrestha J & Sapkota S (2024). Improving the quality of global mental health services with digital tools: Best practices and lessons learned from rural Nepal. Journal of Technology in Behavioral Science.",
              link: "https://doi.org/10.1007/s41347-024-00389-8"
            }
          ]
        },
        {
          id: "become-d",
          title: "BECOME-D",
          subtitle: "Dementia support intervention for older adults and their caregivers at home",
          description: "A home-based behavioral care program developed to support older adults and their caregivers. It was co-created with an expert panel of advisors, comprising clinicians, caregivers, community stakeholders, and persons with lived experience. The program helps families manage dementia-related challenges and stress while improving quality of life and daily functioning. Early pilot implementation demonstrated its acceptability and feasibility, with promising potential for further testing and scale-up.",
          publications: [
            {
              title: "Link with BECOME publications & research framework",
              link: "/solutions/scale#become"
            },
            {
              title: "View full BECOME Scale Page",
              link: "/solutions/scale"
            }
          ]
        },
        {
          id: "chissa",
          title: "Chissa",
          subtitle: "Advancing suicide prevention through personalized digital support",
          description: [
            "Chissa advances suicide prevention through personalized, just-in-time digital support. Named after a colloquial expression of love and admiration used within Nepali GBMSM communities, ‘Chissa’ reflects a compassionate, community-centered approach to suicide prevention.",
            "Chissa is an innovative digital tool designed to recognize changes in suicide risk and provide tailored support when it is needed most. We are co-creating this with GBMSM communities and local health partners, followed by pilot testing, to bring together digital innovation and community knowledge and make suicide prevention more timely, accessible, and responsive, with potential for scale in Nepal and beyond."
          ],
          publications: [
            {
              title: "Paudel, K., Gautam, K., Pandey, A. et al. Prevalence of chemsex and associated factors among gay, bisexual, and other men who have sex with men in Nepal: findings from an online national survey. Sci Rep 15, 23087 (2025).",
              link: "https://doi.org/10.1038/s41598-025-92449-z"
            },
            {
              title: "Gautam K, Aguilar C, Paudel K, Dhakal M, Wickersham JA, Acharya B, Sapkota S, Deuba K, Shrestha R. Preferences for mHealth Intervention to Address Mental Health Challenges Among Men Who Have Sex With Men in Nepal: Qualitative Study. JMIR Hum Factors 2024;11:e56002.",
              link: "https://doi.org/10.2196/56002"
            }
          ]
        },
        {
          id: "psupp",
          title: "P-SuPP",
          subtitle: "Reimagining suicide care for scale in primary health care",
          description: [
            "Southeast Asia has the highest suicide mortality rate globally, at 17.7 deaths per 100,000 population. In Nepal, suicide ideation is highly prevalent, yet help-seeking remains extremely low, highlighting an urgent need to strengthen access to effective suicide care within primary health care.",
            "This project is reimagining how suicide care can be delivered at scale by adapting and strengthening the WHO mhGAP suicide management approach to local cultural and health-system context. We first conducted a qualitative formative evaluation of the mhGAP suicide module in primary care settings and, together with key stakeholders, co-designed a culturally grounded suicide management package that integrates locally appropriate risk assessment and safety-planning strategies. By testing what works and how it can be implemented at scale, the project aims to support wider integration of suicide care into primary health care."
          ]
        }
      ]
    },
    {
      subSectionId: "tested-and-ready-for-scale",
      subSectionTitle: "TESTED AND READY FOR SCALE-UP",
      projects: [
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
        },
        {
          id: "milap",
          title: "MILAP",
          subtitle: "For intimate partner violence and mental health",
          description: [
            "Women in low- and middle-income countries like Nepal often live in multi-generational households where IPV dynamics is influenced by multiple key family members.",
            "MILAP is a family-based intervention that engages women, their husbands and mothers-in-law (MILs) to reduce IPV and mental well-being among married women. It comprises nine sessions on how to improve communication, manage stress and difficult emotions, and build healthier relationships. After two successful pilot studies, we are now testing MILAP through a randomized controlled trial with 300 families in Nepal. This five-year study, funded by the National Institute of Mental Health, will help us understand the impact of MILAP, and prepare for a larger scale."
          ],
          image: "/who_we_are_team.jpg",
          publications: [
            {
              title: "A multi-component family intervention to lower depression and address intimate partner violence (MILAP) among young married women in Nepal: a study protocol for a randomized controlled trial. doi: 10.1186/s13063-026-09507-8.",
              link: "https://doi.org/10.1186/s13063-026-09507-8"
            },
            {
              title: "Supporting women who cannot leave an abusive relationship. doi: 10.1016/S2215-0366(25)00400-6.",
              link: "https://doi.org/10.1016/S2215-0366(25)00400-6"
            },
            {
              title: "Behind the Seen: Searching for Peace in a House With Violence.",
              link: "https://doi.org/10.7326/ANNALS-25-04504"
            },
            {
              title: "Ensuring Ethical Conduct and Safeguarding Participants’ Safety in a Randomized Controlled Trial of a Multi-component Family Intervention for Intimate Partner Violence and Depression in Nepal.",
              link: "https://elibrary.nhrc.gov.np/bitstream/20.500.14356/2888/1/11.Mina_MILAP_Invited%20Presentation_Possible.pdf"
            },
            {
              title: "Daughters-in-law's perceptions and experiences with MILAP, a family-based intervention to reduce intimate partner violence and improve mental health in Nepal. doi: 10.1007/s00737-025-01643-5.",
              link: "https://doi.org/10.1007/s00737-025-01643-5"
            }
          ]
        }
      ]
    }
  ];

  return (
    <SolutionStageTemplate
      stageId="test"
      stageNumber="2"
      stageName="TEST"
      colorClass="text-secondary-blue"
      badgeBgClass="bg-secondary-blue/10"
      borderClass="border-secondary-blue/20"
      subSections={subSections}
    />
  );
}
