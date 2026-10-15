"use client";

import React from "react";
import SolutionStageTemplate, { SolutionSubSectionType } from "@/components/SolutionStageTemplate";

export default function TestPage() {
  const subSections: SolutionSubSectionType[] = [
    {
      subSectionId: "tested-and-ready-for-scale",
      subSectionTitle: "2.1 EVIDENCE BUILT, READY FOR ADOPTION",
      tabLabel: "EVIDENCE BUILT, READY FOR ADOPTION",
      subSectionSubtitle: "Interventions validated through rigorous clinical and implementation trials, prepared for integration into national health systems.",
      badge: "Scale Readiness",
      projects: [
        {
          id: "milap",
          title: "MILAP",
          subtitle: "For intimate partner violence and mental health",
          description: [
            <div key="problem" className="space-y-1.5">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Problem:
              </strong>
              <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
                Women in low- and middle-income countries like Nepal have fewer options to leave abusive relationships and often live in multi-generational households, where intimate partner violence (IPV) is influenced by several key family members (Pun et al., 2019; Shai et al., 2019).
              </p>
            </div>,

            <div key="solution" className="space-y-1.5 pt-2">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Proposed Solution:
              </strong>
              <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
                We designed MILAP, a culturally adapted multi-component family-based intervention that engages women experiencing IPV, their husbands and mothers-in-law (a key family member influencing IPV in Nepali context) to reduce IPV and improve the mental well-being of married women. It consists of nine sessions on how to improve communication, manage stress and difficult emotions, and build healthier relationships.
              </p>
            </div>,

            <div key="impact" className="space-y-2 pt-2">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Impact:
              </strong>
              <p className="text-zinc-700 font-light text-[16px]">
                The two phases of pilot studies showed:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-700 font-light text-[16px] leading-relaxed">
                <li>Improved depressive symptoms</li>
                <li>Reduced incidences of domestic violence</li>
              </ul>
            </div>,

            <p key="closing" className="pt-3 font-medium text-zinc-900 text-[16px] leading-relaxed">
              After two successful pilot studies, we are currently testing MILAP through a randomized controlled trial with 300 families in Nepal. This five-year study, funded by the National Institute of Mental Health, will help us understand the impact of MILAP, and prepare for a larger scale.
            </p>
          ],
          image: "/solutions_test/MILAP.jpg",
          publications: [
            {
              title: "A multi-component family intervention to lower depression and address intimate partner violence (MILAP).",
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
              title: "Daughters-in-law's perceptions and experiences with MILAP.",
              link: "https://pubmed.ncbi.nlm.nih.gov/41484672/"
            }
          ]
        },
        {
          id: "become",
          title: "BECOME",
          subtitle: "Bringing integrated mental health and NCD care closer to home",
          description: [
            <div key="problem" className="space-y-1.5">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Problem:
              </strong>
              <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
                Mental health conditions such as depression and anxiety often occur together with chronic diseases like high blood pressure and diabetes. Both are driven by shared risks, including stress, isolation, tobacco use, inactivity, poor diet and treatment non-adherence.
              </p>
            </div>,

            <div key="solution" className="space-y-1.5 pt-2">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Proposed Solution:
              </strong>
              <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
                We designed BECOME (Behavioral Community-based COmbined Intervention for MEntal Health and NCDs) a home-based integrated behavioral intervention delivered by community health workers (CHWs). It combines stress reduction, behavioral activation, and motivational interviewing to treat common mental health conditions and non-communicable diseases together.
              </p>
            </div>,

            <div key="impact" className="space-y-2 pt-2">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Impact:
              </strong>
              <p className="text-zinc-700 font-light text-[16px]">
                We are currently conducting a rigorous implementation-effectiveness study of BECOME by expanding Nepal’s national community health worker program to deliver home-based care for chronic conditions and mental health. Supported by the Community Health Information System (CHIS) for data-driven care, we expect to see:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-700 font-light text-[16px] leading-relaxed">
                <li>Improved depression and anxiety symptoms</li>
                <li>Better-controlled blood pressure and diabetes</li>
                <li>Acceptable, feasible and cost-effective integration of BECOME into the national community health worker program</li>
              </ul>
            </div>
          ],
          image: "/solutions_test/BECOME.jpg",
          publications: [
            {
              title: "A type II hybrid implementation-effectiveness study of the BECOME intervention.",
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
              title: "Strengthening community health system through longitudinal care: From pilot to scale",
              link: "/solutions/scale#longitudinal-care"
            }
          ]
        },
        {
          id: "commit",
          title: "COMMIT",
          subtitle: "Improving treatment compliance using mHealth app",
          description: [
            <div key="problem" className="space-y-1.5">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Problem:
              </strong>
              <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
                Many people living with HIV, especially among young people, find it hard to continue their treatment. As a result, many do not reach viral suppression, and HIV remains one of the leading causes of death among adolescents globally.
              </p>
            </div>,

            <div key="solution" className="space-y-1.5 pt-2">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Proposed Solution:
              </strong>
              <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
                COMMIT is an mHealth app designed with people with lived experience, health workers and the government to support healthcare providers in motivating patients to stay engaged in their treatment and care.
              </p>
            </div>,

            <div key="impact" className="space-y-2 pt-2">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Impact:
              </strong>
              <p className="text-zinc-700 font-light text-[16px]">
                Our 9-month pilot trial to assess acceptability and feasibility of COMMIT among health care workers and patients to improve treatment adherence and clinical outcomes showed:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-700 font-light text-[16px] leading-relaxed">
                <li>High acceptance by health care workers</li>
                <li>Improved treatment compliance over time among young people living HIV</li>
              </ul>
            </div>,

            <p key="closing" className="pt-3 font-medium text-zinc-900 text-[16px] leading-relaxed">
              Based on the findings that stigma is one barrier to treatment adherence, we co-designed INCLUDE, a digital health intervention that addresses intersectional stigma experienced by people living with HIV in healthcare settings of Nepal. We are currently testing its acceptability, feasibility and preliminary impact.
            </p>
          ],
          image: "/solutions_test/commit_updated.jpg",
          publications: [
            {
              title: "Community health workers' barriers and facilitators to use a novel mHealth tool for motivational interviewing.",
              link: "https://pubmed.ncbi.nlm.nih.gov/38990929/"
            },
            {
              title: "Cross-cultural adaptation of motivational interviewing for use in rural Nepal.",
              link: "https://pubmed.ncbi.nlm.nih.gov/33794990/"
            },
            {
              title: "Improving the quality of global mental health services with digital tools.",
              link: "https://doi.org/10.1007/s41347-024-00389-8"
            }
          ]
        },
        {
          id: "perinatal-mh",
          title: "PERINATAL-Mental Health",
          subtitle: "Integrating perinatal mental health into Community Health Worker-led longitudinal care",
          description: [
            <div key="problem" className="space-y-1.5">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Problem:
              </strong>
              <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
                Mental health problems during pregnancy and after birth (the perinatal period) are common but often neglected worldwide. Many women are never identified or treated because screening is limited, few specialists are available, and mental health is poorly integrated into routine perinatal care.
              </p>
            </div>,

            <div key="solution" className="space-y-1.5 pt-2">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Proposed Solution:
              </strong>
              <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
                We developed an evidence-based intervention for perinatal depression by integrating WHO Thinking Healthy Programme (THP) into an existing longitudinal community health worker (CHW) program that follows women over time. Instead of offering mental health care as a separate service, CHWs deliver THP during their ongoing contacts with women throughout the perinatal period, which supports continuity of care and reduces the stigma of seeking mental health services.
              </p>
            </div>,

            <div key="impact" className="space-y-2 pt-2">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Impact:
              </strong>
              <p className="text-zinc-700 font-light text-[16px]">
                Our implementation research in adapting and integrating the WHO's Thinking Healthy Programme (THP) into the existing CHW program of Dolakha, Nepal found:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-700 font-light text-[16px] leading-relaxed">
                <li>Decline in depressive symptoms</li>
                <li>High acceptability and perceived usefulness among both CHWs and women</li>
              </ul>
            </div>
          ],
          image: "/solutions_test/perinatal.jpg",
          publications: [
            {
              title: "Postpartum contraception outcomes of an integrated community health worker intervention in rural Nepal.",
              link: "https://doi.org/10.1186/s12978-025-02225-5"
            },
            {
              title: "The power of peers: an effectiveness evaluation of a cluster-controlled trial of group antenatal care.",
              link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6805428/"
            },
            {
              title: "Comparing two data collection methods to track vital events in maternal and child health via CHWs.",
              link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9327361/"
            },
            {
              title: "Addressing challenges for psychotherapy supervision in global mental health through experiential learnings.",
              link: "https://doi.org/10.1186/s12982-025-00645-z"
            },
            {
              title: "Beyond Maternal and Child Health: Refining CHW Models for Chronic and Life Course Approaches to Care.",
              link: "https://pubmed.ncbi.nlm.nih.gov/?term=Possible+Health+Nepal+CHW"
            },
            {
              title: "Strengthening Community Health System Through Longitudinal Care.",
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
            <div key="problem" className="space-y-1.5">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Problem:
              </strong>
              <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
                People living with HIV often face stigma and discrimination, and the burden is greater for those who also face discrimination because of their gender, race, or mental health. Due to the fear of this stigma, and of others finding out their HIV status, about one-third of people living with HIV stop taking their medication (NAP+N, 2022).
              </p>
            </div>,

            <div key="solution" className="space-y-1.5 pt-2">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Proposed Solution:
              </strong>
              <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
                INCLUDE is a digital tool co-designed with the government and communities, including people with HIV, to reduce stigma in HIV clinics and improve care for people living with HIV and address discrimination tied to gender, race, and mental health.
              </p>
            </div>,

            <div key="impact" className="space-y-2 pt-2">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Impact:
              </strong>
              <p className="text-zinc-700 font-light text-[16px]">
                We are conducting a 9-month single-arm trial of INCLUDE at four HIV treatment centers, in collaboration with the government. We expect to see:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-700 font-light text-[16px] leading-relaxed">
                <li>Acceptance of INCLUDE and feasibility to integrate it into routine HIV care</li>
                <li>Less stigma experiences</li>
                <li>Improved depression symptoms</li>
                <li>Fewer missed appointments and medication refills</li>
                <li>Better treatment adherence and viral load suppression</li>
              </ul>
            </div>
          ],
          image: "/solutions_test/include_latest.jpg",
          publications: [
            {
              title: "Community health workers' barriers and facilitators to use a novel mHealth tool for motivational interviewing.",
              link: "https://pubmed.ncbi.nlm.nih.gov/38990929/"
            },
            {
              title: "Improving the quality of global mental health services with digital tools.",
              link: "https://doi.org/10.1007/s41347-024-00389-8"
            },
            {
              title: "COMMIT — Improving treatment compliance using mHealth app.",
              link: "/solutions/test#commit"
            }
          ]
        },
        {
          id: "psupp",
          title: "P-SuPP",
          subtitle: "Reimagining suicide care for scale in primary health care",
          description: [
            <div key="problem" className="space-y-1.5">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Problem:
              </strong>
              <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
                Southeast Asia has the highest suicide mortality rate globally, at 17.7 deaths per 100,000 population (WHO, 2019). In Nepal, suicide ideation is highly prevalent, yet help-seeking remains extremely low, highlighting an urgent need to strengthen access to effective suicide care within primary healthcare.
              </p>
            </div>,

            <div key="solution" className="space-y-1.5 pt-2">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Proposed Solution:
              </strong>
              <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
                A culturally adapted and contextualized suicide management intervention based on the WHO mhGAP suicide module in primary care settings. Together with people with lived experience and local stakeholders, we co-designed a culturally grounded suicide management package that integrates locally appropriate risk assessment and safety-planning strategies.
              </p>
            </div>,

            <div key="impact" className="space-y-2 pt-2">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Impact:
              </strong>
              <p className="text-zinc-700 font-light text-[16px]">
                This ongoing implementation effectiveness randomized controlled trial aims to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-700 font-light text-[16px] leading-relaxed">
                <li>Support wider integration of suicide care into primary health care</li>
                <li>Lower suicidal behaviors and attempts</li>
                <li>Reduced depression symptoms severity</li>
                <li>Increased patient healthcare follow-up</li>
              </ul>
            </div>
          ],
          image: "/solutions_test/psupp.JPG"
        },
        {
          id: "become-d",
          title: "BECOME-D",
          subtitle: "Dementia support intervention for older adults and their caregivers at home",
          description: [
            <div key="problem" className="space-y-1.5">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Problem:
              </strong>
              <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
                Older adults with dementia and their family caregivers in rural communities face high stress, daily functioning challenges, and a lack of home-based behavioral care support.
              </p>
            </div>,

            <div key="solution" className="space-y-1.5 pt-2">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Proposed Solution:
              </strong>
              <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
                A home-based behavioral care program developed to support older adults and their caregivers. It was co-created with an expert panel of advisors, comprising clinicians, caregivers, community stakeholders, and persons with lived experience. The program helps families manage dementia-related challenges and stress while improving quality of life and daily functioning.
              </p>
            </div>,

            <div key="impact" className="space-y-2 pt-2">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Impact:
              </strong>
              <p className="text-zinc-700 font-light text-[16px]">
                Early pilot implementation demonstrated acceptability and feasibility, with promising potential for further testing and scale-up.
              </p>
            </div>
          ],
          image: "/solutions_test/becomeD.png",
          publications: [
            {
              title: "A type II hybrid implementation-effectiveness study of the BECOME intervention.",
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
              title: "BECOME — Bringing integrated mental health and NCD care closer to home.",
              link: "/solutions/test#become"
            },
            {
              title: "Strengthening Community Health Systems Through Longitudinal Care.",
              link: "/solutions/scale#longitudinal-care"
            }
          ]
        },
        {
          id: "chissa",
          title: "Chissa",
          subtitle: "Advancing suicide prevention through personalized digital support",
          description: [
            <div key="problem" className="space-y-1.5">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Problem:
              </strong>
              <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
                Suicide is a major global health problem, causing more than 700,000 deaths each year. Gay, bisexual and other men who have sex with men (GBMSM) are two to five times more likely to have attempted suicide than other men. Yet mental health services rarely reach them.
              </p>
            </div>,

            <div key="solution" className="space-y-1.5 pt-2">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Proposed Solution:
              </strong>
              <p className="text-zinc-700 leading-relaxed font-light text-[16px]">
                Chissa is a digital tool designed to recognize changes in a person’s suicide risk and offer personalized support at the moment it is needed. Its name comes from an everyday expression of love and admiration used in Nepali GBMSM communities, reflecting a caring, community-centered approach to suicide prevention.
              </p>
            </div>,

            <div key="impact" className="space-y-2 pt-2">
              <strong className="font-semibold text-zinc-950 block text-[17px]">
                Impact:
              </strong>
              <p className="text-zinc-700 font-light text-[16px]">
                We are co-creating and testing Chissa with GBMSM communities and local health partners, and expect to see:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-700 font-light text-[16px] leading-relaxed">
                <li>Acceptance of Chissa among GBMSM population</li>
                <li>Lower suicidal ideation and attempts</li>
                <li>Higher uptake of suicide support services</li>
              </ul>
            </div>
          ],
          image: "/solutions_test/chissa.JPG",
          publications: [
            {
              title: "Preferences for mHealth intervention to address mental health challenges among men who have sex with men.",
              link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11015371/"
            },
            {
              title: "Suicidal ideation, plan, and attempt among men who have sex with men in Nepal.",
              link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10664887/"
            },
            {
              title: "Prevalence of chemsex and associated factors among gay, bisexual, and other men who have sex with men.",
              link: "https://doi.org/10.1038/s41598-025-92449-z"
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