"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DraftingCompass,
  Beaker,
  TrendingUp,
  GitFork,
  Info,
  FileText,
  ArrowRight,
  ExternalLink,
  Sparkles
} from "lucide-react";

export default function SolutionsPage() {
  const [activePhase, setActivePhase] = useState<string>("all");

  const phases = [
    { id: "all", name: "All Solutions", icon: GitFork, color: "bg-zinc-900 text-white" },
    { id: "innovate", name: "1. Innovate", icon: DraftingCompass, color: "bg-primary-pink text-white" },
    { id: "test", name: "2. Test", icon: Beaker, color: "bg-secondary-blue text-white" },
    { id: "scale", name: "3. Scale", icon: TrendingUp, color: "bg-accent-purple text-white" },
    { id: "pipeline", name: "4. Pipeline", icon: GitFork, color: "bg-amber-600 text-white" },
  ];

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1 bg-white">
      {/* Page Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-pink/10 px-4 py-1 text-[13px] font-semibold text-primary-pink uppercase tracking-wider shadow-sm">
          <Sparkles className="h-3.5 w-3.5" />
          Our Solutions
        </span>
        <h1 className="h1-hero text-zinc-950 uppercase tracking-wide leading-tight">
          Evidence-Based Health Solutions
        </h1>
        <p className="text-subheading text-body-gray font-light">
          We innovate, test, and scale health solutions &mdash; until they&apos;re health workers&apos; everyday practice and national policy.
        </p>
      </div>

      {/* Engagement Flexibility Banner */}
      <div className="mb-12 bg-gradient-to-r from-accent-purple/5 via-primary-pink/5 to-secondary-blue/5 border border-accent-purple/15 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xs">
        <div className="flex flex-col sm:flex-row gap-4 items-start relative z-10">
          <div className="p-3 bg-accent-purple text-white rounded-2xl shrink-0 shadow-md">
            <Info className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h3 className="h3-card font-semibold text-zinc-900 uppercase tracking-wide">
              Flexible Engagement Framework
            </h3>
            <p className="text-body text-body-gray leading-relaxed font-light text-justify sm:text-left">
              Partners can engage with us at <strong className="font-semibold text-accent-purple">any phase</strong> of the lifecycle. You do not need to start at Innovate; government bodies, health systems, and funding partners can enter directly at the Scale phase to adopt proven community models.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Phase Filter Buttons */}
      <div className="mb-12 flex flex-wrap gap-3 justify-center">
        {phases.map((phase) => {
          const Icon = phase.icon;
          const isActive = activePhase === phase.id;
          return (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-equip text-[13.5px] font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${isActive
                ? phase.id === "innovate"
                  ? "bg-primary-pink text-white border-primary-pink shadow-md shadow-primary-pink/25 -translate-y-0.5"
                  : phase.id === "test"
                    ? "bg-secondary-blue text-white border-secondary-blue shadow-md shadow-secondary-blue/25 -translate-y-0.5"
                    : phase.id === "scale"
                      ? "bg-accent-purple text-white border-accent-purple shadow-md shadow-accent-purple/25 -translate-y-0.5"
                      : phase.id === "pipeline"
                        ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/25 -translate-y-0.5"
                        : "bg-zinc-900 text-white border-zinc-900 shadow-md -translate-y-0.5"
                : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50"
                }`}
            >
              <Icon className="h-4 w-4" />
              <span>{phase.name}</span>
            </button>
          );
        })}
      </div>

      {/* Solutions Phase Sections */}
      <div className="space-y-16 animate-in fade-in duration-500">

        {/* ========================================================================= */}
        {/* PHASE 1: INNOVATE */}
        {/* ========================================================================= */}
        {(activePhase === "all" || activePhase === "innovate") && (
          <section className="scroll-mt-24 p-6 sm:p-10 rounded-3xl border border-primary-pink/20 bg-primary-pink/[0.01] relative overflow-hidden space-y-8">
            <div className="absolute top-0 left-0 w-2.5 h-full bg-primary-pink" />

            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between border-b border-zinc-100 pb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-pink/10 px-3.5 py-1 text-[12px] font-bold text-primary-pink uppercase tracking-widest mb-2">
                  Stage 01
                </span>
                <h2 className="text-3xl font-extralight text-zinc-950 uppercase tracking-wide">
                  1. INNOVATE
                </h2>
              </div>
              <Link
                href="/solutions/innovate"
                className="inline-flex items-center gap-2 rounded-full border border-primary-pink/30 bg-white hover:bg-primary-pink/10 px-5 py-2.5 font-equip font-semibold text-[13.5px] text-primary-pink transition-colors shrink-0"
              >
                <span>View Stage Page</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Project: CASA */}
              <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                <div className="space-y-1 border-b border-zinc-100 pb-3">
                  <span className="text-xs font-bold text-primary-pink uppercase tracking-wider">
                    Supporting caregivers of children with Autism
                  </span>
                  <h3 className="h3-card font-bold text-zinc-900 uppercase">
                    CASA
                  </h3>
                </div>
                <p className="text-[14.5px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                  CASA is a mobile health app being developed with caregivers, health care workers and experts, to support caregivers of children with autism. It will provide simple, practical tips that caregivers can use at home to help children communicate, learn new skills, manage everyday challenges, and take care of their own well-being. We will test the app for three months with caregivers and therapists at two autism care centers in Nepal to understand if it is acceptable and feasible to use.
                </p>
              </div>

              {/* Project: Reimagining SRHR */}
              <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                <div className="space-y-1 border-b border-zinc-100 pb-3">
                  <span className="text-xs font-bold text-primary-pink uppercase tracking-wider">
                    Co-Designing Accessible Care
                  </span>
                  <h3 className="h3-card font-bold text-zinc-900 uppercase">
                    Reimagining sexual and reproductive health services with women with disabilities
                  </h3>
                </div>
                <p className="text-[14.5px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                  Women with disabilities often face barriers to accessing sexual and reproductive health information and services. Possible worked alongside women with diverse disabilities, the Nepal Disabled Women’s Association, and other stakeholders to understand these experiences and co-design an intervention grounded in their needs, priorities, and lived realities.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PHASE 2: TEST */}
        {/* ========================================================================= */}
        {(activePhase === "all" || activePhase === "test") && (
          <section className="scroll-mt-24 p-6 sm:p-10 rounded-3xl border border-secondary-blue/20 bg-secondary-blue/[0.01] relative overflow-hidden space-y-12">
            <div className="absolute top-0 left-0 w-2.5 h-full bg-secondary-blue" />

            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between border-b border-zinc-100 pb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-blue/10 px-3.5 py-1 text-[12px] font-bold text-secondary-blue uppercase tracking-widest mb-2">
                  Stage 02
                </span>
                <h2 className="text-3xl font-extralight text-zinc-950 uppercase tracking-wide">
                  2. TEST
                </h2>
              </div>
              <Link
                href="/solutions/test"
                className="inline-flex items-center gap-2 rounded-full border border-secondary-blue/30 bg-white hover:bg-secondary-blue/10 px-5 py-2.5 font-equip font-semibold text-[13.5px] text-secondary-blue transition-colors shrink-0"
              >
                <span>View Stage Page</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Sub-section 2.1: DESIGN TO TEST */}
            <div className="space-y-6">
              <div className="border-b border-secondary-blue/20 pb-3">
                <h3 className="text-xl font-bold text-zinc-900 uppercase tracking-wide">
                  2.1. DESIGN TO TEST
                </h3>
                <p className="text-[13.5px] text-body-gray font-light mt-1">
                  Interventions and digital platforms currently undergoing feasibility testing or trial protocol design.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Project: INCLUDE */}
                <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                  <div className="space-y-1 border-b border-zinc-100 pb-3">
                    <span className="text-xs font-bold text-secondary-blue uppercase tracking-wider">
                      Addressing intersectional stigma and improving HIV care
                    </span>
                    <h4 className="h3-card font-bold text-zinc-900 uppercase">INCLUDE</h4>
                  </div>
                  <p className="text-[14px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                    About one-third of people living with HIV stop taking their medication because they fear others may find out about their HIV status [2022]. This is especially common among minority groups and people facing mental health challenges.
                  </p>
                  <p className="text-[14px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                    INCLUDE is a digital tool co-designed with government and communities, including people with lived experiences to identify and reduce stigma in HIV clinics, improving care for people living with HIV and addressing discrimination tied to gender, race, and mental health. We are currently testing INCLUDE in four HIV treatment centers to explore if it is acceptable, feasible and helpful to use in improving HIV care and support.
                  </p>

                  {/* Learn More / Publications */}
                  <div className="pt-4 border-t border-zinc-100 space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 select-none block">
                      Related Publications:
                    </span>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-xs">
                        <FileText className="h-3.5 w-3.5 text-secondary-blue shrink-0 mt-0.5" />
                        <a href="https://doi.org/10.3126/journal.pgph.0002911" target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-secondary-blue hover:underline">
                          1. Community health workers&apos; barriers and facilitators to use a novel mHealth tool for motivational interviewing. <span className="font-semibold text-secondary-blue">doi: 10.3126/journal.pgph.0002911</span>
                        </a>
                      </li>
                      <li className="flex items-start gap-2 text-xs">
                        <FileText className="h-3.5 w-3.5 text-secondary-blue shrink-0 mt-0.5" />
                        <a href="https://doi.org/10.1007/s41347-024-00389-8" target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-secondary-blue hover:underline">
                          2. Acharya B, Sigdel K., et al. (2024). Improving the quality of global mental health services with digital tools. <span className="font-semibold text-secondary-blue">doi: 10.1007/s41347-024-00389-8</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Project: BECOME-D */}
                <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                  <div className="space-y-1 border-b border-zinc-100 pb-3">
                    <span className="text-xs font-bold text-secondary-blue uppercase tracking-wider">
                      Dementia support intervention for older adults and their caregivers at home
                    </span>
                    <h4 className="h3-card font-bold text-zinc-900 uppercase">BECOME-D</h4>
                  </div>
                  <p className="text-[14px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                    A home-based behavioral care program developed to support older adults and their caregivers. It was co-created with an expert panel of advisors, comprising clinicians, caregivers, community stakeholders, and persons with lived experience. The program helps families manage dementia-related challenges and stress while improving quality of life and daily functioning. Early pilot implementation demonstrated its acceptability and feasibility, with promising potential for further testing and scale-up.
                  </p>

                  {/* Learn More */}
                  <div className="pt-4 border-t border-zinc-100 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 select-none block">
                      Learn More:
                    </span>
                    <div className="flex flex-wrap gap-3">
                      <Link href="/solutions/scale#become" className="text-xs font-semibold text-secondary-blue hover:underline inline-flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5" /> Link with BECOME publications
                      </Link>
                      <span className="text-zinc-300">|</span>
                      <Link href="/solutions/scale" className="text-xs font-semibold text-secondary-blue hover:underline inline-flex items-center gap-1">
                        BECOME page <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Project: Chissa */}
                <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                  <div className="space-y-1 border-b border-zinc-100 pb-3">
                    <span className="text-xs font-bold text-secondary-blue uppercase tracking-wider">
                      Advancing suicide prevention through personalized digital support
                    </span>
                    <h4 className="h3-card font-bold text-zinc-900 uppercase">Chissa</h4>
                  </div>
                  <p className="text-[14px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                    Chissa advances suicide prevention through personalized, just-in-time digital support. Named after a colloquial expression of love and admiration used within Nepali GBMSM communities, ‘Chissa’ reflects a compassionate, community-centered approach to suicide prevention.
                  </p>
                  <p className="text-[14px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                    Chissa is an innovative digital tool designed to recognize changes in suicide risk and provide tailored support when it is needed most. We are co-creating this with GBMSM communities and local health partners, followed by pilot testing, to bring together digital innovation and community knowledge and make suicide prevention more timely, accessible, and responsive, with potential for scale in Nepal and beyond.
                  </p>

                  {/* Learn More */}
                  <div className="pt-4 border-t border-zinc-100 space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 select-none block">
                      Learn More:
                    </span>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-xs">
                        <FileText className="h-3.5 w-3.5 text-secondary-blue shrink-0 mt-0.5" />
                        <a href="https://doi.org/10.1038/s41598-025-92449-z" target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-secondary-blue hover:underline">
                          1. Paudel, K., et al. (2025). Prevalence of chemsex and associated factors in Nepal. <span className="font-semibold text-secondary-blue">doi: 10.1038/s41598-025-92449-z</span>
                        </a>
                      </li>
                      <li className="flex items-start gap-2 text-xs">
                        <FileText className="h-3.5 w-3.5 text-secondary-blue shrink-0 mt-0.5" />
                        <a href="https://doi.org/10.2196/56002" target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-secondary-blue hover:underline">
                          2. Gautam K, et al. (2024). Preferences for mHealth Intervention to Address Mental Health. <span className="font-semibold text-secondary-blue">doi: 10.2196/56002</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Project: P-SuPP */}
                <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                  <div className="space-y-1 border-b border-zinc-100 pb-3">
                    <span className="text-xs font-bold text-secondary-blue uppercase tracking-wider">
                      Reimagining suicide care for scale in primary health care
                    </span>
                    <h4 className="h3-card font-bold text-zinc-900 uppercase">P-SuPP</h4>
                  </div>
                  <p className="text-[14px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                    Southeast Asia has the highest suicide mortality rate globally, at 17.7 deaths per 100,000 population. In Nepal, suicide ideation is highly prevalent, yet help-seeking remains extremely low, highlighting an urgent need to strengthen access to effective suicide care within primary health care.
                  </p>
                  <p className="text-[14px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                    This project is reimagining how suicide care can be delivered at scale by adapting and strengthening the WHO mhGAP suicide management approach to local cultural and health-system context. We first conducted a qualitative formative evaluation of the mhGAP suicide module in primary care settings and, together with key stakeholders, co-designed a culturally grounded suicide management package that integrates locally appropriate risk assessment and safety-planning strategies. By testing what works and how it can be implemented at scale, the project aims to support wider integration of suicide care into primary health care.
                  </p>
                </div>
              </div>
            </div>

            {/* Sub-section 2.2: TESTED AND READY FOR SCALE-UP */}
            <div className="space-y-6 pt-6 border-t border-secondary-blue/15">
              <div className="border-b border-secondary-blue/20 pb-3">
                <h3 className="text-xl font-bold text-zinc-900 uppercase tracking-wide">
                  2.2. TESTED AND READY FOR SCALE-UP
                </h3>
                <p className="text-[13.5px] text-body-gray font-light mt-1">
                  Validated models with completed trials and clinical packages ready for system-wide scale-up.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Project: MILAP */}
                <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                  <div className="space-y-1 border-b border-zinc-100 pb-3">
                    <span className="text-xs font-bold text-secondary-blue uppercase tracking-wider">
                      Intimate Partner Violence & Mental Health
                    </span>
                    <h4 className="h3-card font-bold text-zinc-900 uppercase">
                      MILAP
                    </h4>
                  </div>
                  <p className="text-[14px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                    Women in low- and middle-income countries like Nepal often live in multi-generational households where IPV dynamics is influenced by multiple key family members.
                  </p>
                  <p className="text-[14px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                    MILAP is a family-based intervention that engages women, their husbands and mothers-in-law (MILs) to reduce IPV and mental well-being among married women. It comprises nine sessions on how to improve communication, manage stress and difficult emotions, and build healthier relationships. After two successful pilot studies, we are now testing MILAP through a randomized controlled trial with 300 families in Nepal. This five-year study, funded by the National Institute of Mental Health, will help us understand the impact of MILAP, and prepare for a larger scale.
                  </p>

                  {/* Learn More */}
                  <div className="pt-4 border-t border-zinc-100 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 select-none block">
                      Learn More:
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-700">
                      <li>
                        <a href="https://doi.org/10.1186/s13063-026-09507-8" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-blue hover:underline">
                          1. Study protocol for a randomized controlled trial. <span className="font-semibold text-secondary-blue">doi: 10.1186/s13063-026-09507-8</span>
                        </a>
                      </li>
                      <li>
                        <a href="https://doi.org/10.1016/S2215-0366(25)00400-6" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-blue hover:underline">
                          2. Supporting women who cannot leave an abusive relationship. <span className="font-semibold text-secondary-blue">doi: 10.1016/S2215-0366(25)00400-6</span>
                        </a>
                      </li>
                      <li>
                        <a href="https://doi.org/10.7326/ANNALS-25-04504" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-blue hover:underline">
                          3. Behind the Seen: Searching for Peace in a House With Violence. <span className="font-semibold text-secondary-blue">doi: 10.7326/ANNALS-25-04504</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Project: BECOME */}
                <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                  <div className="space-y-1 border-b border-zinc-100 pb-3">
                    <span className="text-xs font-bold text-secondary-blue uppercase tracking-wider">
                      Bringing integrated mental health and NCD care closer to home
                    </span>
                    <h4 className="h3-card font-bold text-zinc-900 uppercase">
                      BECOME
                    </h4>
                  </div>
                  <p className="text-[14px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                    Expanding Nepal’s national community health worker program to deliver home-based care for chronic conditions and mental health. BECOME brings evidence-based behavioral support for common mental health conditions and non-communicable diseases into communities through trained, full time, supervised, and digitally enabled CHWs. The intervention combines stress reduction, behavioral activation, and motivational interviewing to support people with conditions such as depression, anxiety, hypertension, and diabetes.
                  </p>

                  {/* Learn More */}
                  <div className="pt-4 border-t border-zinc-100 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 select-none block">
                      Learn More:
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-700">
                      <li>
                        <a href="https://doi.org/10.1186/s13063-026-09457-1" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-blue hover:underline">
                          1. Study protocol for a stepped wedge cluster RCT. <span className="font-semibold text-secondary-blue">doi: 10.1186/s13063-026-09457-1</span>
                        </a>
                      </li>
                      <li>
                        <a href="https://doi.org/10.1186/s40359-021-00557-y" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-blue hover:underline">
                          2. Cross-cultural adaptation of motivational interviewing. <span className="font-semibold text-secondary-blue">doi: 10.1186/s40359-021-00557-y</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Project: COMMIT */}
                <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                  <div className="space-y-1 border-b border-zinc-100 pb-3">
                    <span className="text-xs font-bold text-secondary-blue uppercase tracking-wider">
                      Improving treatment compliance using mHealth app
                    </span>
                    <h4 className="h3-card font-bold text-zinc-900 uppercase">
                      COMMIT
                    </h4>
                  </div>
                  <p className="text-[14px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                    COMMIT is a mHealth app designed with people with lived experience, health care workers and government to support health care providers in motivating patients to stay engaged in their treatment and care. We have tested this app through the network of our community health workers among young people living with HIV, patients with depression in different stages, and have observed improved treatment compliance over time.
                  </p>

                  {/* Learn More */}
                  <div className="pt-4 border-t border-zinc-100 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 select-none block">
                      Learn More:
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-700">
                      <li>
                        <a href="https://doi.org/10.3126/journal.pgph.0002911" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-blue hover:underline">
                          1. CHW barriers and facilitators for motivational interviewing. <span className="font-semibold text-secondary-blue">doi: 10.3126/journal.pgph.0002911</span>
                        </a>
                      </li>
                      <li>
                        <a href="https://doi.org/10.1007/s41347-024-00389-8" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-blue hover:underline">
                          2. Improving quality of mental health services with digital tools. <span className="font-semibold text-secondary-blue">doi: 10.1007/s41347-024-00389-8</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Project: Perinatal-MH */}
                <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                  <div className="space-y-1 border-b border-zinc-100 pb-3">
                    <span className="text-xs font-bold text-secondary-blue uppercase tracking-wider">
                      Integrating perinatal mental health into CHW longitudinal care
                    </span>
                    <h4 className="h3-card font-bold text-zinc-900 uppercase">
                      Perinatal-MH
                    </h4>
                  </div>
                  <p className="text-[14px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                    Perinatal mental health is a major yet persistently neglected global health gap. We integrated the WHO Thinking Healthy Programme (THP), an evidence-based intervention for perinatal depression, into an existing CHW-delivered longitudinal care model in rural Nepal. Rather than delivering mental health care as a separate service, the approach embeds THP within ongoing contacts between CHWs and women, supporting continuity of care while reducing stigma.
                  </p>

                  {/* Learn More */}
                  <div className="pt-4 border-t border-zinc-100 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 select-none block">
                      Learn More:
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-700">
                      <li>
                        <a href="https://doi.org/10.1186/s12982-025-00645-z" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-blue hover:underline">
                          1. Psychotherapy supervision in global mental health. <span className="font-semibold text-secondary-blue">doi: 10.1186/s12982-025-00645-z</span>
                        </a>
                      </li>
                      <li>
                        <a href="https://doi.org/10.1186/s12978-025-02225-5" target="_blank" rel="noopener noreferrer" className="hover:text-secondary-blue hover:underline">
                          2. Postpartum contraception outcomes from CHW intervention. <span className="font-semibold text-secondary-blue">doi: 10.1186/s12978-025-02225-5</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PHASE 3: SCALE */}
        {/* ========================================================================= */}
        {(activePhase === "all" || activePhase === "scale") && (
          <section className="scroll-mt-24 p-6 sm:p-10 rounded-3xl border border-accent-purple/20 bg-accent-purple/[0.01] relative overflow-hidden space-y-8">
            <div className="absolute top-0 left-0 w-2.5 h-full bg-accent-purple" />

            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between border-b border-zinc-100 pb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-purple/10 px-3.5 py-1 text-[12px] font-bold text-accent-purple uppercase tracking-widest mb-2">
                  Stage 03
                </span>
                <h2 className="text-3xl font-extralight text-zinc-950 uppercase tracking-wide">
                  3. SCALE
                </h2>
              </div>
              <Link
                href="/solutions/scale"
                className="inline-flex items-center gap-2 rounded-full border border-accent-purple/30 bg-white hover:bg-accent-purple/10 px-5 py-2.5 font-equip font-semibold text-[13.5px] text-accent-purple transition-colors shrink-0"
              >
                <span>View Stage Page</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Collaborative Care Model */}
              <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                <div className="space-y-1 border-b border-zinc-100 pb-3">
                  <span className="text-xs font-bold text-accent-purple uppercase tracking-wider">
                    Primary Care Integration
                  </span>
                  <h3 className="h3-card font-bold text-zinc-900 uppercase">
                    Collaborative care for improving mental health care within primary health care settings
                  </h3>
                </div>
                <p className="text-[14.5px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                  An integrated model that trains CHWs and clinicians to identify and manage depression and anxiety within primary care settings. This model is co-designed and tested in remote districts in Nepal, and is now informing WHO-endorsed national training manuals for scale-up.
                </p>

                {/* Learn More */}
                <div className="pt-4 border-t border-zinc-100 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 select-none block">
                    Learn More:
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-700">
                    <li>
                      <a href="https://doi.org/10.1136/bmjopen-2020-048481" target="_blank" rel="noopener noreferrer" className="hover:text-accent-purple hover:underline">
                        1. Collaborative care model for depression in rural Nepal. <span className="font-semibold text-accent-purple">doi: 10.1136/bmjopen-2020-048481</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://doi.org/10.1176/appi.ps.201700232" target="_blank" rel="noopener noreferrer" className="hover:text-accent-purple hover:underline">
                        2. WHO Health Systems Framework Assessment. <span className="font-semibold text-accent-purple">doi: 10.1176/appi.ps.201700232</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://doi.org/10.1007/s41347-024-00389-8" target="_blank" rel="noopener noreferrer" className="hover:text-accent-purple hover:underline">
                        3. Digital tools in rural Nepal mental health services. <span className="font-semibold text-accent-purple">doi: 10.1007/s41347-024-00389-8</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Longitudinal Care */}
              <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                <div className="space-y-1 border-b border-zinc-100 pb-3">
                  <span className="text-xs font-bold text-accent-purple uppercase tracking-wider">
                    From pilot to scale
                  </span>
                  <h3 className="h3-card font-bold text-zinc-900 uppercase">
                    Strengthening community health system through longitudinal care
                  </h3>
                </div>
                <p className="text-[14.5px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                  ProCHWs- local, trained, supervised, salaried, full-time, and digitally enabled community health workers, closes gaps by bringing integrated, longitudinal care directly into the community. Possible, in collaboration with the government, designed the model grounded in WHO guidelines for national scale-up.
                </p>

                {/* Learn More */}
                <div className="pt-4 border-t border-zinc-100 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-800 select-none block">
                    Learn More:
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-700">
                    <li>
                      <a href="https://doi.org/10.1371/journal.pgph.0001512" target="_blank" rel="noopener noreferrer" className="hover:text-accent-purple hover:underline">
                        1. Integrated CHW intervention to address maternal healthcare. <span className="font-semibold text-accent-purple">doi: 10.1371/journal.pgph.0001512</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://doi.org/10.1186/s12978-025-02225-5" target="_blank" rel="noopener noreferrer" className="hover:text-accent-purple hover:underline">
                        2. Postpartum contraception outcomes from CHW intervention. <span className="font-semibold text-accent-purple">doi: 10.1186/s12978-025-02225-5</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://doi.org/10.9745/GHSP-D-19-00393" target="_blank" rel="noopener noreferrer" className="hover:text-accent-purple hover:underline">
                        3. Costing Analysis of a Pilot CHW Program in Nepal. <span className="font-semibold text-accent-purple">doi: 10.9745/GHSP-D-19-00393</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PHASE 4: PIPELINE */}
        {/* ========================================================================= */}
        {(activePhase === "all" || activePhase === "pipeline") && (
          <section className="scroll-mt-24 p-6 sm:p-10 rounded-3xl border border-amber-500/20 bg-amber-50/[0.03] relative overflow-hidden space-y-8">
            <div className="absolute top-0 left-0 w-2.5 h-full bg-amber-500" />

            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between border-b border-zinc-100 pb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-800 px-3.5 py-1 text-[12px] font-bold uppercase tracking-widest mb-2">
                  Stage 04
                </span>
                <h2 className="text-3xl font-extralight text-zinc-950 uppercase tracking-wide">
                  4. PIPELINE
                </h2>
                <p className="text-[14px] text-body-gray font-light mt-1">
                  Bridging evidence and action: explore the culturally grounded solutions in our pipeline.
                </p>
              </div>
              <Link
                href="/solutions/pipeline"
                className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-white hover:bg-amber-50 px-5 py-2.5 font-equip font-semibold text-[13.5px] text-amber-700 transition-colors shrink-0"
              >
                <span>View Stage Page</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Climate & Health */}
              <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                <div className="space-y-1 border-b border-zinc-100 pb-3">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                    Climate Resilience
                  </span>
                  <h3 className="h3-card font-bold text-zinc-900 uppercase">
                    Addressing the intersection of climate and health
                  </h3>
                </div>
                <p className="text-[14.5px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                  Our working proposal aims to explore how extreme weather events can increase domestic violence and affect mental health. We will develop a brief family support program for families affected by these intersecting challenges. We will work with communities to design the program and test whether it is practical and helpful for families experiencing domestic violence after extreme weather events.
                </p>
              </div>

              {/* School Mental Health */}
              <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                <div className="space-y-1 border-b border-zinc-100 pb-3">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                    Public Education Integration
                  </span>
                  <h3 className="h3-card font-bold text-zinc-900 uppercase">
                    Nurse-led mental health support for public schools
                  </h3>
                </div>
                <p className="text-[14.5px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                  Nearly half of all lifetime mental health conditions take root before adulthood, and in Nepal, nearly 7 million children are sitting in a classroom every school day. We&apos;re working with the government to position school nurses as the first line of mental health support for students, teachers, and parents. This solution hasn&apos;t been piloted yet. It’s still in its earliest stage, preparing to co design with schools, nurses and families before we move ahead building the evidence needed to reach national scale.
                </p>
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
