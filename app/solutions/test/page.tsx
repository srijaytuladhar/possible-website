"use client";

import SolutionStageTemplate, { SolutionSubSectionType } from "@/components/SolutionStageTemplate";

export default function TestPage() {
  const subSections: SolutionSubSectionType[] = [
    {
      subSectionId: "tested-and-ready-for-scale",
      subSectionTitle: "2.1 Tested and ready for scale-up",
      tabLabel: "Tested and ready for scale-up",
      subSectionSubtitle: "Interventions validated through rigorous clinical and implementation trials, prepared for integration into national health systems.",
      badge: "Scale Readiness",
      projects: [
        {
          id: "milap",
          title: "MILAP",
          subtitle: "For intimate partner violence and mental health",
          description: [
            "Women in low- and middle-income countries like Nepal often live in multi-generational households where IPV dynamics are influenced by multiple key family members (Pun et al., 2019; Shai et al., 2019). MILAP is a family-based intervention engaging women, their husbands, and mothers-in-law (MILs) to reduce IPV and improve mental well-being among married women. It comprises nine sessions on communication, stress and emotion management, and building healthier relationships.",
            "After two successful pilot studies, MILAP is now being tested through a randomized controlled trial with 300 families in Nepal, a five-year study funded by the National Institute of Mental Health."
          ],
          image: "/solutions_test/MILAP.jpg",
          publications: [
            {
              title: "A multi-component family intervention to lower depression and address intimate partner violence (MILAP) among young married women in Nepal: a study protocol for a randomized controlled trial.",
              link: "https://pubmed.ncbi.nlm.nih.gov/41680806/"
            },
            {
              title: "Supporting women who cannot leave an abusive relationship.",
              link: "https://pubmed.ncbi.nlm.nih.gov/41581524/"
            },
            {
              title: "Behind the Seen: Searching for Peace in a House With Violence.",
              link: "https://doi.org/10.7326/ANNALS-25-04504"
            },
            {
              title: "Daughters-in-law's perceptions and experiences with MILAP, a family-based intervention to reduce intimate partner violence and improve mental health in Nepal.",
              link: "https://pubmed.ncbi.nlm.nih.gov/41484672/"
            }
          ]
        },
        {
          id: "become",
          title: "BECOME",
          subtitle: "Bringing integrated mental health and NCD care closer to home",
          description: [
            "Expanding Nepal's national community health worker program to deliver home-based care for chronic conditions and mental health. BECOME brings evidence-based behavioral support for common mental health conditions and non-communicable diseases into communities through trained, full-time, supervised, and digitally enabled CHWs, combining stress reduction, behavioral activation, and motivational interviewing.",
            "CHWs conduct screening, behavioral intervention, and follow-up for diabetes, hypertension, depression, and anxiety, supported by the Community Health Information System (CHIS)."
          ],
          image: "/solutions_test/BECOME.jpg",
          publications: [
            {
              title: "A type II hybrid implementation-effectiveness study of the BECOME intervention: integrating Behavioral Community-Based Approaches for Mental Health and Non-Communicable Diseases delivered by community health workers — study protocol for a stepped wedge cluster randomized controlled trial.",
              link: "https://pubmed.ncbi.nlm.nih.gov/41580851/"
            },
            {
              title: "Cross-cultural adaptation of motivational interviewing for use in rural Nepal.",
              link: "https://pubmed.ncbi.nlm.nih.gov/33794990/"
            },
            {
              title: "Evidence-based, multilevel interventions for sustained behaviour change.",
              link: "https://pubmed.ncbi.nlm.nih.gov/37858578/"
            },
            {
              title: "Cross-link: Strengthening Community Health Systems Through Longitudinal Care (Scale Phase)",
              link: "/solutions/scale#longitudinal-care"
            }
          ]
        },
        {
          id: "commit",
          title: "COMMIT",
          subtitle: "Improving treatment compliance using mHealth app",
          description: [
            "COMMIT is an mHealth app co-designed with people with lived experience, health care workers, and government to help providers motivate patients to stay engaged in treatment. Tested through the CHW network among young people living with HIV and patients with depression at different stages, with observed improvements in treatment compliance over time."
          ],
          image: "/solutions_test/COMMIT.jpg",
          publications: [
            {
              title: "Community health workers' barriers and facilitators to use a novel mHealth tool for motivational interviewing to improve adherence to care among youth living with HIV in rural Nepal.",
              link: "https://pubmed.ncbi.nlm.nih.gov/38990929/"
            },
            {
              title: "Cross-cultural adaptation of motivational interviewing for use in rural Nepal.",
              link: "https://pubmed.ncbi.nlm.nih.gov/33794990/"
            },
            {
              title: "Improving the quality of global mental health services with digital tools: Best practices and lessons learned from rural Nepal.",
              link: "https://doi.org/10.1007/s41347-024-00389-8"
            }
          ]
        },
        {
          id: "perinatal-mh",
          title: "PERINATAL-MH",
          subtitle: "Integrating perinatal mental health into Community Health Worker-led longitudinal care",
          description: [
            "Perinatal mental health is a major yet persistently neglected global health gap.Yet many women remain undetected and untreated due to limited screening, specialist capacity, and weak integration of mental health into routine perinatal care.",
            "Longitudinal community health worker(CHW) programs provide an opportunity to integrate mental health support into routine care and reach women across the perinatal period. We integrate mental health support into routine care and reach women across the preinatal period. We integrated the WHO Thinking Healthy Programme (THP), an evidence-based intervention for perinatal depression, into an existing CHW-delivered longitudinal care model in rural Nepal. Rather than delivering mental health care as a separate service, the approach embeds THP within ongoing contacts between CHWs and women, supporting continuity of care while reducing the stigma associated with seeking mental health services. We evaluated this integrated model to assess its feasibility, acceptability, and potential to strenghten access to perinatal mental health care through existing community-based longitudinal care systems."
          ],
          image: "/solutions_test/Perinatal-MH.jpeg",
          publications: [
            {
              title: "Postpartum contraception outcomes from a pre-post effectiveness-implementation study of an integrated community health worker intervention in rural Nepal.",
              link: "https://doi.org/10.1186/s12978-025-02225-5"
            },
            {
              title: "The power of peers: an effectiveness evaluation of a cluster-controlled trial of group antenatal care in rural Nepal.",
              link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6805428/"
            },
            {
              title: "Comparing two data collection methods to track vital events in maternal and child health via community health workers in rural Nepal.",
              link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9327361/"
            },
            {
              title: "Addressing challenges for psychotherapy supervision in global mental health through experiential learnings from rural Nepal.",
              link: "https://doi.org/10.1186/s12982-025-00645-z"
            },
            {
              title: "Beyond Maternal and Child Health: Refining CHW Models for Chronic and Life Course Approaches to Care. Current Opinion in Epidemiology and Public Health (awaiting online publication).",
              link: "https://pubmed.ncbi.nlm.nih.gov/?term=Possible+Health+Nepal+CHW"
            },
            {
              title: "Strengthening Community Health Systems Through Longitudinal Care (Scale Phase)",
              link: "/solutions/scale#longitudinal-care"
            }
          ]
        }
      ]
    },
    {
      subSectionId: "designed-to-test",
      subSectionTitle: "2.2 Designed to test",
      tabLabel: "Designed to test",
      subSectionSubtitle: "Actively undergoing co-design, adaptation, and multi-site pilot evaluation across primary healthcare facilities.",
      badge: "Active Testing",
      projects: [
        {
          id: "include",
          title: "INCLUDE",
          subtitle: "Addressing intersectional stigma and improving HIV care",
          description: [
            "About one-third of people living with HIV stop taking their medication because they fear others may find out about their HIV status (2022) especially common among minority groups and people facing mental health challenges.",
            "INCLUDE is a digital tool co-designed with government and communities, including people with lived experience, to identify and reduce stigma in HIV clinics and address discrimination tied to gender, race, and mental health. Currently being tested in four HIV treatment centers to explore acceptability, feasibility, and usefulness."
          ],
          image: "/solutions_test/INCLUDE.jpg",
          publications: [
            {
              title: "Community health workers' barriers and facilitators to use a novel mHealth tool for motivational interviewing to improve adherence to care among youth living with HIV in rural Nepal.",
              link: "https://pubmed.ncbi.nlm.nih.gov/38990929/"
            },
            {
              title: "Improving the quality of global mental health services with digital tools: Best practices and lessons learned from rural Nepal. Journal of Technology in Behavioral Science.",
              link: "https://doi.org/10.1007/s41347-024-00389-8"
            },
            {
              title: "COMMIT — Improving treatment compliance using mHealth app",
              link: "/solutions/test#commit"
            }
          ]
        },
        {
          id: "psupp",
          title: "P-SUPP",
          subtitle: "Reimagining suicide care for scale in primary health care",
          description: [
            "Southeast Asia has the highest suicide mortality rate globally, at 17.7 deaths per 100,000 population (WHO, 2019). In Nepal, suicide ideation is highly prevalent, yet help-seeking remains extremely low, highlighting an urgent need to strengthen access to effective suicide care within primary health care.",
            "This project is reimagining how suicide care can be delivered at scale by adapting and strengthening the WHO mhGAP suicide management approach to local cultural and health-system context. We first conducted a qualitative formative evaluation of the mhGAP suicide module, followed by a co-designed, culturally grounded suicide management package integrating locally appropriate risk assessment and safety-planning strategies."
          ],
          image: "/solutions_test/P supp.JPG"
        },
        {
          id: "become-d",
          title: "BECOME-D",
          subtitle: "Dementia support intervention for older adults and their caregivers at home",
          description: [
            "A home-based behavioral care program developed to support older adults and their caregivers.It was co-created with an expert panel of advisors, comprising clinicians, caregivers, community stakeholders, and persons with lived experience. The program helps families manage dementia-related challenges and stress while improving quality of life and daily functioning.",
            "Early pilot implementation demonstrated acceptability and feasibility, with promising potential for further testing and scale-up."
          ],
          image: "/solutions_test/BECOME D.jpg",
          publications: [
            {
              title: "A type II hybrid implementation-effectiveness study of the BECOME intervention: integrating Behavioral Community-Based Approaches for Mental Health and Non-Communicable Diseases delivered by community health workers — study protocol for a stepped wedge cluster randomized controlled trial.",
              link: "https://pubmed.ncbi.nlm.nih.gov/41580851/"
            },
            {
              title: "Cross-cultural adaptation of motivational interviewing for use in rural Nepal.",
              link: "https://pubmed.ncbi.nlm.nih.gov/33794990/"
            },
            {
              title: "Evidence-based, multilevel interventions for sustained behaviour change.",
              link: "https://pubmed.ncbi.nlm.nih.gov/37858578/"
            },
            {
              title: "BECOME — Bringing integrated mental health and NCD care closer to home",
              link: "/solutions/test#become"
            },
            {
              title: "Strengthening Community Health Systems Through Longitudinal Care (Scale Phase)",
              link: "/solutions/scale#longitudinal-care"
            }
          ]
        },
        {
          id: "chissa",
          title: "CHISSA",
          subtitle: "Advancing suicide prevention through personalized digital support",
          description: [
            "Chissa advances suicide prevention through personalized, just-in-time digital support. Named after a colloquial expression of love and admiration used within Nepali GBMSM communities, \"Chissa\" reflects a compassionate, community-centered approach to suicide prevention.",
            "Chissa is an innovative digital tool designed to recognize changes in suicide risk and provide tailored support when it's needed most.We are co-creating with GBMSM communities and local health partners, followed by pilot testing, to bring together digital innovation and community knowledge and make suicide prevention more timely, accessible, and responsive, with potential for scale in Nepal and beyond."
          ],
          image: "/solutions_test/CHISSA.JPG",
          publications: [
            {
              title: "Prevalence of chemsex and associated factors among gay, bisexual, and other men who have sex with men in Nepal: findings from an online national survey.",
              link: "https://doi.org/10.1038/s41598-025-92449-z"
            },
            {
              title: "Preferences for mHealth Intervention to Address Mental Health Challenges Among Men Who Have Sex With Men in Nepal: Qualitative Study.",
              link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11015371/"
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
