"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Beaker,
  DraftingCompass,
  GitFork,
  ArrowRight,
  ExternalLink,
  FileText,
  Mail
} from "lucide-react";

export default function SolutionsPage() {
  const [activePhase, setActivePhase] = useState<string>("all");
  const [activeTestSubTab, setActiveTestSubTab] = useState<"tested" | "designed">("tested");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "scale" || hash === "test" || hash === "innovate" || hash === "pipeline") {
      setActivePhase(hash);
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, []);

  const phases = [
    { id: "all", name: "All Solutions", icon: GitFork },
    { id: "scale", name: "Scale", icon: TrendingUp },
    { id: "test", name: "Test", icon: Beaker },
    { id: "innovate", name: "Innovate", icon: DraftingCompass },
    { id: "pipeline", name: "Pipeline", icon: GitFork },
  ];

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 md:py-16 flex flex-col flex-1 bg-white">
      {/* Page Header */}
      <div className="mb-12 text-center max-w-4xl mx-auto space-y-4">
        <h1 className="h1-hero text-zinc-950 uppercase tracking-wide leading-tight">
          Our Solutions
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-primary-pink via-secondary-blue to-accent-purple rounded-full mx-auto" />
        <p className="text-subheading text-zinc-800 font-normal max-w-3xl mx-auto pt-2">
          We don&apos;t just co-design a project, test/deliver a program, and move on. We build systems that last.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="mb-14 flex flex-wrap gap-2.5 justify-center">
        {phases.map((phase) => {
          const Icon = phase.icon;
          const isActive = activePhase === phase.id;
          return (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-equip text-[13.5px] font-semibold tracking-wide transition-all duration-200 border cursor-pointer ${
                isActive
                  ? phase.id === "scale"
                    ? "bg-accent-purple text-white border-accent-purple shadow-sm"
                    : phase.id === "test"
                      ? "bg-secondary-blue text-white border-secondary-blue shadow-sm"
                      : phase.id === "innovate"
                        ? "bg-primary-pink text-white border-primary-pink shadow-sm"
                        : phase.id === "pipeline"
                          ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                          : "bg-zinc-900 text-white border-zinc-900 shadow-sm"
                  : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{phase.name}</span>
            </button>
          );
        })}
      </div>

      {/* Solutions Phase Sections: Scale -> Test -> Innovate -> Pipeline */}
      <div className="space-y-20">

        {/* ========================================================================= */}
        {/* 1. SCALE SECTION */}
        {/* ========================================================================= */}
        {(activePhase === "all" || activePhase === "scale") && (
          <section id="scale" className="scroll-mt-24 space-y-10 border-b border-zinc-100 pb-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-accent-purple/20 pb-4">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent-purple/10 text-accent-purple mb-2">
                  Category 01
                </span>
                <h2 className="text-3xl sm:text-4xl font-light text-zinc-950 uppercase tracking-wide">
                  Scale
                </h2>
              </div>
              <Link
                href="/solutions/scale"
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-accent-purple hover:underline"
              >
                <span>Explore Scale Stage</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Scale Block: Strengthening Community Health System Through Longitudinal Care */}
            <div className="p-8 sm:p-10 bg-zinc-50/60 border border-zinc-200/80 rounded-3xl space-y-6 shadow-xs">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 leading-tight">
                  Strengthening community health system through longitudinal care: From pilot to scale
                </h3>
              </div>

              <div className="space-y-4 text-[15.5px] text-zinc-700 leading-relaxed font-light text-justify sm:text-left">
                <p>
                  Too often, health systems reach families only when they seek care, leaving gaps in continuous support that could prevent illness, identify risks early, and address health needs before they become more serious. Pregnancies may go undetected until late, newborns may miss critical follow-up, and chronic conditions may remain unmanaged until they become emergencies — gaps that are costly to fix.
                </p>
                <p>
                  <em className="font-normal italic">ProCHWs — local, trained, supervised, salaried, full-time, and digitally enabled community health workers</em> — close that gap by bringing integrated, longitudinal care directly into the community. Possible, in collaboration with the government, designed the model, grounded in WHO&apos;s guidelines for CHW programs, and tested it as a national pilot focused initially on bundled maternal and child health services. The pilot generated evidence that community-based, longitudinal care improves access and outcomes — reducing home deliveries, catching high-risk pregnancies earlier, and increasing follow-up care — while remaining affordable within the public health system.
                </p>
                <p>
                  We are now working with the government and community-based partners to strengthen and evolve the model for national scale-up: refining the delivery workflows, building the evidence base, and exploring how ProCHWs can extend beyond maternal and child health to provide a broader continuum of care across the life course.
                </p>
              </div>

              {/* Styled Callout */}
              <div className="p-5 rounded-2xl bg-accent-purple/5 border-l-4 border-accent-purple">
                <p className="text-[15px] sm:text-[16px] font-medium text-accent-purple italic">
                  <span className="font-bold not-italic mr-2">Callout:</span>
                  This isn&apos;t a parallel program, it&apos;s a government-owned system built to last.
                </p>
              </div>

              {/* Citations List */}
              <div className="pt-6 border-t border-zinc-200/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Learn More
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  <a
                    href="https://doi.org/10.1371/journal.pgph.0001512"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-zinc-200/80 hover:border-accent-purple/50 hover:bg-zinc-50 transition-colors group"
                  >
                    <FileText className="h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
                    <span className="text-[13.5px] text-zinc-700 group-hover:text-zinc-950 leading-relaxed font-light">
                      A Type II hybrid effectiveness-implementation study of an integrated CHW intervention to address maternal healthcare in rural Nepal. <span className="text-accent-purple font-medium underline break-all">https://doi.org/10.1371/journal.pgph.0001512</span>
                    </span>
                  </a>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-zinc-200/80">
                    <FileText className="h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
                    <span className="text-[13.5px] text-zinc-700 leading-relaxed font-light">
                      Costing Analysis of a Pilot Community Health Worker Program in Rural Nepal. <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 text-zinc-600 ml-1">Publication in progress</span>
                    </span>
                  </div>

                  <a
                    href="https://doi.org/10.1186/s12978-025-02225-5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-zinc-200/80 hover:border-accent-purple/50 hover:bg-zinc-50 transition-colors group"
                  >
                    <FileText className="h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
                    <span className="text-[13.5px] text-zinc-700 group-hover:text-zinc-950 leading-relaxed font-light">
                      Postpartum contraception outcomes from a pre-post effectiveness-implementation study of an integrated community health worker intervention in rural Nepal. <span className="text-accent-purple font-medium underline break-all">https://doi.org/10.1186/s12978-025-02225-5</span>
                    </span>
                  </a>

                  <a
                    href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6805428/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-zinc-200/80 hover:border-accent-purple/50 hover:bg-zinc-50 transition-colors group"
                  >
                    <FileText className="h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
                    <span className="text-[13.5px] text-zinc-700 group-hover:text-zinc-950 leading-relaxed font-light">
                      The power of peers: an effectiveness evaluation of a cluster-controlled trial of group antenatal care in rural Nepal. <span className="text-accent-purple font-medium underline break-all">https://pmc.ncbi.nlm.nih.gov/articles/PMC6805428/</span>
                    </span>
                  </a>

                  <a
                    href="https://www.thelancet.com/action/showPdf?pii=S2214-109X%2823%2900357-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-zinc-200/80 hover:border-accent-purple/50 hover:bg-zinc-50 transition-colors group"
                  >
                    <FileText className="h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
                    <span className="text-[13.5px] text-zinc-700 group-hover:text-zinc-950 leading-relaxed font-light">
                      Labour conditions in dual-cadre community health worker programs: a systematic review. <span className="text-accent-purple font-medium underline break-all">https://www.thelancet.com/action/showPdf?pii=S2214-109X(23)00357-1</span>
                    </span>
                  </a>

                  <a
                    href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9327361/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-zinc-200/80 hover:border-accent-purple/50 hover:bg-zinc-50 transition-colors group"
                  >
                    <FileText className="h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
                    <span className="text-[13.5px] text-zinc-700 group-hover:text-zinc-950 leading-relaxed font-light">
                      Comparing two data collection methods to track vital events in maternal and child health via community health workers in rural Nepal. <span className="text-accent-purple font-medium underline break-all">https://pmc.ncbi.nlm.nih.gov/articles/PMC9327361/</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 2. TEST SECTION */}
        {/* ========================================================================= */}
        {(activePhase === "all" || activePhase === "test") && (
          <section id="test" className="scroll-mt-24 space-y-10 border-b border-zinc-100 pb-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-secondary-blue/20 pb-4">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary-blue/10 text-secondary-blue mb-2">
                  Category 02
                </span>
                <h2 className="text-3xl sm:text-4xl font-light text-zinc-950 uppercase tracking-wide">
                  Test
                </h2>
              </div>
              <Link
                href="/solutions/test"
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-secondary-blue hover:underline"
              >
                <span>Explore Test Stage</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Sub-tab Menu Bar */}
            <div className="w-full max-w-4xl mx-auto mb-14 sm:mb-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full shadow-xs">
                <button
                  type="button"
                  onClick={() => setActiveTestSubTab("tested")}
                  className={`relative py-4 sm:py-5 px-4 text-center uppercase text-[13px] sm:text-[14px] md:text-[15px] font-bold tracking-wider text-white transition-all cursor-pointer select-none flex items-center justify-center ${
                    activeTestSubTab === "tested"
                      ? "bg-secondary-blue brightness-100 z-10"
                      : "bg-[#008ea8] hover:bg-[#009ebd] hover:brightness-105 opacity-95 hover:opacity-100"
                  }`}
                >
                  <span className="leading-snug">TESTED AND READY FOR SCALE-UP</span>
                  {activeTestSubTab === "tested" && (
                    <span
                      className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[12px] border-x-transparent border-t-[10px] sm:border-x-[14px] sm:border-t-[12px] z-20 pointer-events-none"
                      style={{ borderTopColor: "#00BBE2" }}
                      aria-hidden="true"
                    />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTestSubTab("designed")}
                  className={`relative py-4 sm:py-5 px-4 text-center uppercase text-[13px] sm:text-[14px] md:text-[15px] font-bold tracking-wider text-white transition-all cursor-pointer select-none flex items-center justify-center ${
                    activeTestSubTab === "designed"
                      ? "bg-secondary-blue brightness-100 z-10"
                      : "bg-[#008ea8] hover:bg-[#009ebd] hover:brightness-105 opacity-95 hover:opacity-100"
                  }`}
                >
                  <span className="leading-snug">DESIGNED TO TEST</span>
                  {activeTestSubTab === "designed" && (
                    <span
                      className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[12px] border-x-transparent border-t-[10px] sm:border-x-[14px] sm:border-t-[12px] z-20 pointer-events-none"
                      style={{ borderTopColor: "#00BBE2" }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Sub-tab 1: Tested and Ready for Scale-up */}
            {activeTestSubTab === "tested" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* MILAP */}
                <div className="p-8 bg-zinc-50/60 border border-zinc-200/80 rounded-3xl space-y-5 shadow-xs">
                  <h3 className="text-2xl font-bold text-zinc-950">
                    MILAP for intimate partner violence and mental health
                  </h3>
                  <div className="space-y-3 text-[15.5px] text-zinc-700 leading-relaxed font-light text-justify sm:text-left">
                    <p>
                      Women in low- and middle-income countries like Nepal often live in multi-generational households where IPV dynamics is influenced by multiple key family members (Pun et al., 2019; Shai et al., 2019).
                    </p>
                    <p>
                      MILAP is a family-based intervention that engages women, their husbands, and mothers-in-law (MILs) to reduce IPV and improve mental well-being among married women. It comprises nine sessions on how to improve communication, manage stress and difficult emotions, and build healthier relationships. After two successful pilot studies, we are now testing MILAP through a randomized controlled trial with 300 families in Nepal. This five-year study, funded by the National Institute of Mental Health, will help us understand the impact of MILAP and prepare for a larger scale.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-200/80 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Learn More</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <a href="https://pubmed.ncbi.nlm.nih.gov/41680806/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>A multi-component family intervention to lower depression and address intimate partner violence (MILAP) among young married women in Nepal: a study protocol for a randomized controlled trial. <span className="text-secondary-blue font-medium underline">https://pubmed.ncbi.nlm.nih.gov/41680806/</span></span>
                      </a>
                      <a href="https://pubmed.ncbi.nlm.nih.gov/41581524/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>Supporting women who cannot leave an abusive relationship. <span className="text-secondary-blue font-medium underline">https://pubmed.ncbi.nlm.nih.gov/41581524/</span></span>
                      </a>
                      <a href="https://doi.org/10.7326/ANNALS-25-04504" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>Behind the Seen: Searching for Peace in a House With Violence. <span className="text-secondary-blue font-medium underline">https://doi.org/10.7326/ANNALS-25-04504</span></span>
                      </a>
                      <a href="https://pubmed.ncbi.nlm.nih.gov/41484672/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>Daughters-in-law&apos;s perceptions and experiences with MILAP, a family-based intervention to reduce intimate partner violence and improve mental health in Nepal. <span className="text-secondary-blue font-medium underline">https://pubmed.ncbi.nlm.nih.gov/41484672/</span></span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* BECOME */}
                <div className="p-8 bg-zinc-50/60 border border-zinc-200/80 rounded-3xl space-y-5 shadow-xs">
                  <h3 className="text-2xl font-bold text-zinc-950">
                    BECOME: Bringing integrated mental health and NCD care closer to home
                  </h3>
                  <div className="space-y-3 text-[15.5px] text-zinc-700 leading-relaxed font-light text-justify sm:text-left">
                    <p>
                      Expanding Nepal&apos;s national community health worker program to deliver home-based care for chronic conditions and mental health. BECOME brings evidence-based behavioral support for common mental health conditions and non-communicable diseases into communities through trained, full-time, supervised, and digitally enabled CHWs. The intervention combines stress reduction, behavioral activation, and motivational interviewing to support people with conditions such as depression, anxiety, hypertension, and diabetes. CHWs conduct screening, behavioral intervention, and follow-up for diabetes, hypertension, depression, and anxiety, supported by the Community Health Information System (CHIS) for data-driven care.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-200/80 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Learn More</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <a href="https://pubmed.ncbi.nlm.nih.gov/41580851/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>A type II hybrid implementation-effectiveness study of the BECOME intervention: integrating Behavioral Community-Based Approaches for Mental Health and Non-Communicable Diseases delivered by community health workers - study protocol for a stepped wedge cluster randomized controlled trial. <span className="text-secondary-blue font-medium underline">https://pubmed.ncbi.nlm.nih.gov/41580851/</span></span>
                      </a>
                      <a href="https://pubmed.ncbi.nlm.nih.gov/33794990/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>Cross-cultural adaptation of motivational interviewing for use in rural Nepal. <span className="text-secondary-blue font-medium underline">https://pubmed.ncbi.nlm.nih.gov/33794990/</span></span>
                      </a>
                      <a href="https://pubmed.ncbi.nlm.nih.gov/37858578/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>Evidence-based, multilevel interventions for sustained behaviour change. <span className="text-secondary-blue font-medium underline">https://pubmed.ncbi.nlm.nih.gov/37858578/</span></span>
                      </a>
                      <Link
                        href="#scale"
                        onClick={() => setActivePhase("scale")}
                        className="text-[13.5px] font-semibold text-secondary-blue hover:underline pt-1 inline-flex items-center gap-1.5"
                      >
                        <span className="italic">Learn more link &rarr; Strengthening Community Health Systems Through Longitudinal Care</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* COMMIT */}
                <div className="p-8 bg-zinc-50/60 border border-zinc-200/80 rounded-3xl space-y-5 shadow-xs">
                  <h3 className="text-2xl font-bold text-zinc-950">
                    COMMIT: Improving treatment compliance using mHealth app
                  </h3>
                  <div className="space-y-3 text-[15.5px] text-zinc-700 leading-relaxed font-light text-justify sm:text-left">
                    <p>
                      COMMIT is an mHealth app designed with people with lived experience, health care workers, and government to support health care providers in motivating patients to stay engaged in their treatment and care. We have tested this app through the network of our community health workers among young people living with HIV and patients with depression in different stages, and have observed improved treatment compliance over time.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-200/80 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Learn More</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <a href="https://pubmed.ncbi.nlm.nih.gov/38990929/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>Community health workers&apos; barriers and facilitators to use a novel mHealth tool for motivational interviewing to improve adherence to care among youth living with HIV in rural Nepal. <span className="text-secondary-blue font-medium underline">https://pubmed.ncbi.nlm.nih.gov/38990929/</span></span>
                      </a>
                      <a href="https://pubmed.ncbi.nlm.nih.gov/33794990/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>Cross-cultural adaptation of motivational interviewing for use in rural Nepal. <span className="text-secondary-blue font-medium underline">https://pubmed.ncbi.nlm.nih.gov/33794990/</span></span>
                      </a>
                      <a href="https://doi.org/10.1007/s41347-024-00389-8" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>Improving the quality of global mental health services with digital tools: Best practices and lessons learned from rural Nepal. <span className="text-secondary-blue font-medium underline">https://doi.org/10.1007/s41347-024-00389-8</span></span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Perinatal Mental Health */}
                <div className="p-8 bg-zinc-50/60 border border-zinc-200/80 rounded-3xl space-y-5 shadow-xs">
                  <h3 className="text-2xl font-bold text-zinc-950">
                    Perinatal Mental Health: Integrating perinatal mental health into Community Health Worker-led longitudinal care
                  </h3>
                  <div className="space-y-3 text-[15.5px] text-zinc-700 leading-relaxed font-light text-justify sm:text-left">
                    <p>
                      Perinatal mental health is a major yet persistently neglected global health gap. Many women remain undetected and untreated due to limited screening, specialist capacity, and weak integration of mental health into routine perinatal care. Longitudinal community health worker (CHW) programs provide an opportunity to integrate mental health support into routine care and reach women across the perinatal period. We integrated the WHO Thinking Healthy Programme (THP), an evidence-based intervention for perinatal depression, into an existing CHW-delivered longitudinal care model in rural Nepal. Rather than delivering mental health care as a separate service, the approach embeds THP within ongoing contacts between CHWs and women, supporting continuity of care while reducing the stigma associated with seeking mental health services.
                    </p>
                    <p>
                      We evaluated this integrated model to assess its feasibility, acceptability, and potential to strengthen access to perinatal mental health care through existing community-based longitudinal care systems.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-200/80 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Learn More</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <a href="https://doi.org/10.1186/s12978-025-02225-5" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>Postpartum contraception outcomes from a pre-post effectiveness-implementation study of an integrated community health worker intervention in rural Nepal. <span className="text-secondary-blue font-medium underline">https://doi.org/10.1186/s12978-025-02225-5</span></span>
                      </a>
                      <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6805428/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>The power of peers: an effectiveness evaluation of a cluster-controlled trial of group antenatal care in rural Nepal. <span className="text-secondary-blue font-medium underline">https://pmc.ncbi.nlm.nih.gov/articles/PMC6805428/</span></span>
                      </a>
                      <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9327361/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>Comparing two data collection methods to track vital events in maternal and child health via community health workers in rural Nepal. <span className="text-secondary-blue font-medium underline">https://pmc.ncbi.nlm.nih.gov/articles/PMC9327361/</span></span>
                      </a>
                      <a href="https://doi.org/10.1186/s12982-025-00645-z" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>Addressing challenges for psychotherapy supervision in global mental health through experiential learnings from rural Nepal. <span className="text-secondary-blue font-medium underline">https://doi.org/10.1186/s12982-025-00645-z</span></span>
                      </a>
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 text-[13.5px] text-zinc-700 font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>Beyond Maternal and Child Health: Refining CHW Models for Chronic and Life course Approaches to Care. Current Opinion in Epidemiology and Public Health <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 text-zinc-600 ml-1">Awaiting online publication</span></span>
                      </div>
                      <Link
                        href="#scale"
                        onClick={() => setActivePhase("scale")}
                        className="text-[13.5px] font-semibold text-secondary-blue hover:underline pt-1 inline-flex items-center gap-1.5"
                      >
                        <span className="italic">Learn more link &rarr; Strengthening Community Health Systems Through Longitudinal Care</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-tab 2: Designed to test */}
            {activeTestSubTab === "designed" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* INCLUDE */}
                <div className="p-8 bg-zinc-50/60 border border-zinc-200/80 rounded-3xl space-y-5 shadow-xs">
                  <h3 className="text-2xl font-bold text-zinc-950">
                    INCLUDE: Addressing intersectional stigma and improving HIV care
                  </h3>
                  <div className="space-y-3 text-[15.5px] text-zinc-700 leading-relaxed font-light text-justify sm:text-left">
                    <p>
                      About one-third of people living with HIV stop taking their medication because they fear others may find out about their HIV status [2022]. This is especially common among minority groups and people facing mental health challenges.
                    </p>
                    <p>
                      INCLUDE is a digital tool co-designed with government and communities, including people with lived experience, to identify and reduce stigma in HIV clinics — improving care for people living with HIV and addressing discrimination tied to gender, race, and mental health. We are currently testing INCLUDE in four HIV treatment centers to explore if it is acceptable, feasible, and helpful in improving HIV care and support.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-200/80 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Learn More</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 text-[13.5px] text-zinc-700 font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>INCLUDE Clinical Evaluation Protocol & Primary Findings. <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200 ml-1">Link will be added once online</span></span>
                      </div>
                      <a href="https://pubmed.ncbi.nlm.nih.gov/38990929/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>Community health workers&apos; barriers and facilitators to use a novel mHealth tool for motivational interviewing to improve adherence to care among youth living with HIV in rural Nepal. <span className="text-secondary-blue font-medium underline">https://pubmed.ncbi.nlm.nih.gov/38990929/</span></span>
                      </a>
                      <a href="https://doi.org/10.1007/s41347-024-00389-8" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>Improving the quality of global mental health services with digital tools: Best practices and lessons learned from rural Nepal. Journal of Technology in Behavioral Science. <span className="text-secondary-blue font-medium underline">https://doi.org/10.1007/s41347-024-00389-8</span></span>
                      </a>
                      <button type="button" onClick={() => setActiveTestSubTab("tested")} className="text-[13.5px] font-semibold text-secondary-blue hover:underline pt-1 inline-flex items-center gap-1 text-left cursor-pointer">
                        <span>Link for COMMIT Page &rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* P-SuPP */}
                <div className="p-8 bg-zinc-50/60 border border-zinc-200/80 rounded-3xl space-y-5 shadow-xs">
                  <h3 className="text-2xl font-bold text-zinc-950">
                    P-SuPP: Reimagining suicide care for scale in primary health care
                  </h3>
                  <div className="space-y-3 text-[15.5px] text-zinc-700 leading-relaxed font-light text-justify sm:text-left">
                    <p>
                      Southeast Asia has the highest suicide mortality rate globally, at 17.7 deaths per 100,000 population (WHO, 2019). In Nepal, suicide ideation is highly prevalent, yet help-seeking remains extremely low, highlighting an urgent need to strengthen access to effective suicide care within primary health care.
                    </p>
                    <p>
                      This project is reimagining how suicide care can be delivered at scale by adapting and strengthening the WHO mhGAP suicide management approach to the local cultural and health-system context. We first conducted a qualitative formative evaluation of the mhGAP suicide module in primary care settings and, together with key stakeholders, co-designed a culturally grounded suicide management package that integrates locally appropriate risk assessment and safety-planning strategies. By testing what works and how it can be implemented at scale, the project aims to support wider integration of suicide care into primary health care.
                    </p>
                  </div>
                </div>

                {/* BECOME-D */}
                <div className="p-8 bg-zinc-50/60 border border-zinc-200/80 rounded-3xl space-y-5 shadow-xs">
                  <h3 className="text-2xl font-bold text-zinc-950">
                    BECOME-D: Dementia support intervention for older adults and their caregivers at home
                  </h3>
                  <div className="space-y-3 text-[15.5px] text-zinc-700 leading-relaxed font-light text-justify sm:text-left">
                    <p>
                      A home-based behavioral care program developed to support older adults and their caregivers. It was co-created with an expert panel of advisors comprising clinicians, caregivers, community stakeholders, and persons with lived experience. The program helps families manage dementia-related challenges and stress while improving quality of life and daily functioning. Early pilot implementation demonstrated its acceptability and feasibility, with promising potential for further testing and scale-up.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-200/80 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Learn More</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <a href="https://pubmed.ncbi.nlm.nih.gov/41580851/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>A type II hybrid implementation-effectiveness study of the BECOME intervention: integrating Behavioral Community-Based Approaches for Mental Health and Non-Communicable Diseases delivered by community health workers - study protocol for a stepped wedge cluster randomized controlled trial. <span className="text-secondary-blue font-medium underline">https://pubmed.ncbi.nlm.nih.gov/41580851/</span></span>
                      </a>
                      <a href="https://pubmed.ncbi.nlm.nih.gov/33794990/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>Cross-cultural adaptation of motivational interviewing for use in rural Nepal. <span className="text-secondary-blue font-medium underline">https://pubmed.ncbi.nlm.nih.gov/33794990/</span></span>
                      </a>
                      <a href="https://pubmed.ncbi.nlm.nih.gov/37858578/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>Evidence-based, multilevel interventions for sustained behaviour change. <span className="text-secondary-blue font-medium underline">https://pubmed.ncbi.nlm.nih.gov/37858578/</span></span>
                      </a>
                      <div className="pt-1 flex flex-wrap gap-4 text-[13.5px] font-semibold text-secondary-blue">
                        <button type="button" onClick={() => setActiveTestSubTab("tested")} className="hover:underline cursor-pointer">
                          Link to BECOME page &rarr;
                        </button>
                        <Link href="#scale" onClick={() => setActivePhase("scale")} className="hover:underline">
                          Link to CHW-led longitudinal care page &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chissa */}
                <div className="p-8 bg-zinc-50/60 border border-zinc-200/80 rounded-3xl space-y-5 shadow-xs">
                  <h3 className="text-2xl font-bold text-zinc-950">
                    Chissa: Advancing suicide prevention through personalized digital support
                  </h3>
                  <div className="space-y-3 text-[15.5px] text-zinc-700 leading-relaxed font-light text-justify sm:text-left">
                    <p>
                      Chissa advances suicide prevention through personalized, just-in-time digital support. Named after a colloquial expression of love and admiration used within Nepali GBMSM communities, &ldquo;Chissa&rdquo; reflects a compassionate, community-centered approach to suicide prevention.
                    </p>
                    <p>
                      Chissa is an innovative digital tool designed to recognize changes in suicide risk and provide tailored support when it is needed most. We are co-creating this with GBMSM communities and local health partners, followed by pilot testing, to bring together digital innovation and community knowledge and make suicide prevention more timely, accessible, and responsive — with potential for scale in Nepal and beyond.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-200/80 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Learn More</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <a href="https://doi.org/10.1038/s41598-025-92449-z" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>Prevalence of chemsex and associated factors among gay, bisexual, and other men who have sex with men in Nepal: findings from an online national survey. <span className="text-secondary-blue font-medium underline">https://doi.org/10.1038/s41598-025-92449-z</span></span>
                      </a>
                      <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11015371/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-zinc-200/80 hover:border-secondary-blue/50 text-[13.5px] text-zinc-700 hover:text-zinc-950 transition-colors font-light">
                        <FileText className="h-4 w-4 text-secondary-blue shrink-0 mt-0.5" />
                        <span>Preferences for mHealth Intervention to Address Mental Health Challenges Among Men Who Have Sex With Men in Nepal: Qualitative Study. <span className="text-secondary-blue font-medium underline">https://pmc.ncbi.nlm.nih.gov/articles/PMC11015371/</span></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ========================================================================= */}
        {/* 3. INNOVATE SECTION */}
        {/* ========================================================================= */}
        {(activePhase === "all" || activePhase === "innovate") && (
          <section id="innovate" className="scroll-mt-24 space-y-10 border-b border-zinc-100 pb-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-primary-pink/20 pb-4">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary-pink/10 text-primary-pink mb-2">
                  Category 03
                </span>
                <h2 className="text-3xl sm:text-4xl font-light text-zinc-950 uppercase tracking-wide">
                  Innovate
                </h2>
              </div>
              <Link
                href="/solutions/innovate"
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-primary-pink hover:underline"
              >
                <span>Explore Innovate Stage</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-8">
              {/* CASA */}
              <div className="p-8 sm:p-10 bg-zinc-50/60 border border-zinc-200/80 rounded-3xl space-y-5 shadow-xs">
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 leading-tight">
                  CASA: Supporting caregivers of children with Autism
                </h3>
                <div className="space-y-3 text-[15.5px] text-zinc-700 leading-relaxed font-light text-justify sm:text-left">
                  <p>
                    CASA is a mobile health app being developed with caregivers, health care workers, and experts to support caregivers of children with autism. It will provide simple, practical tips that caregivers can use at home to help children communicate, learn new skills, manage everyday challenges, and take care of their own well-being. We will test the app for three months with caregivers and therapists at two autism care centers in Nepal to understand if it is acceptable and feasible to use.
                  </p>
                </div>
              </div>

              {/* Caregiver skills training (FLAGGED: Title only in source doc, no body copy) */}
              <div className="p-8 sm:p-10 bg-zinc-50/60 border border-zinc-200/80 rounded-3xl space-y-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 leading-tight">
                    Caregiver skills training for families of children with developmental delays or disabilities
                  </h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-900 shrink-0 self-start">
                    Awaiting Client Copy
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-amber-900 text-[14px] font-light leading-relaxed">
                  <p>
                    <strong className="font-semibold">Note for Client:</strong> This entry appears as a title/short item in the source documentation without accompanying body text. It is displayed here pending your final descriptive copy.
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-200/80 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Learn More</h4>
                  <a
                    href="https://www.who.int/publications/i/item/9789240048836"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-zinc-200/80 hover:border-primary-pink/50 hover:bg-zinc-50 transition-colors group"
                  >
                    <FileText className="h-4 w-4 text-primary-pink shrink-0 mt-0.5" />
                    <span className="text-[13.5px] text-zinc-700 group-hover:text-zinc-950 leading-relaxed font-light">
                      Caregiver skills training for families of children with developmental delays or disabilities. <span className="text-primary-pink font-medium underline break-all">https://www.who.int/publications/i/item/9789240048836</span>
                    </span>
                  </a>
                </div>
              </div>

              {/* Reimagining SRHR with women with disabilities */}
              <div className="p-8 sm:p-10 bg-zinc-50/60 border border-zinc-200/80 rounded-3xl space-y-5 shadow-xs">
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 leading-tight">
                  Reimagining sexual and reproductive health services with women with disabilities
                </h3>
                <div className="space-y-3 text-[15.5px] text-zinc-700 leading-relaxed font-light text-justify sm:text-left">
                  <p>
                    Women with disabilities often face barriers to accessing sexual and reproductive health information and services. Possible worked alongside women with diverse disabilities, the Nepal Disabled Women&apos;s Association, and other stakeholders to understand these experiences and co-design an intervention grounded in their needs, priorities, and lived realities.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 4. PIPELINE SECTION */}
        {/* ========================================================================= */}
        {(activePhase === "all" || activePhase === "pipeline") && (
          <section id="pipeline" className="scroll-mt-24 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-600/20 pb-4">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-50 text-amber-700 mb-2">
                  Category 04
                </span>
                <h2 className="text-3xl sm:text-4xl font-light text-zinc-950 uppercase tracking-wide">
                  Pipeline
                </h2>
              </div>
              <Link
                href="/solutions/pipeline"
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-amber-600 hover:underline"
              >
                <span>Explore Pipeline Stage</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Pipeline Callout Banner */}
            <div className="p-7 sm:p-8 rounded-3xl bg-amber-500/5 border border-amber-500/20 flex flex-col sm:flex-row gap-4 items-start">
              <div className="p-3 bg-amber-600 text-white rounded-2xl shrink-0 shadow-xs">
                <Mail className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-zinc-900">
                  Collaborative Pipeline Opportunities
                </h3>
                <p className="text-[15px] text-zinc-700 leading-relaxed font-light">
                  Explore the culturally grounded solutions in our pipeline. We are actively seeking collaborative partners and resources to move these solutions into action. If you are interested in collaborating, please connect with us at{" "}
                  <a href="mailto:research@possiblehealth.org" className="text-amber-700 font-semibold underline hover:text-amber-800">
                    research@possiblehealth.org
                  </a>
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Solution 1: School nurses */}
              <div className="p-8 sm:p-10 bg-zinc-50/60 border border-zinc-200/80 rounded-3xl space-y-4 shadow-xs">
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 leading-tight">
                  Nurse-led mental health support for public schools
                </h3>
                <p className="text-[15.5px] text-zinc-700 leading-relaxed font-light text-justify sm:text-left">
                  Nearly half of all lifetime mental health conditions take root before adulthood, and in Nepal, nearly 7 million children are sitting in a classroom every school day. We&apos;re working with the government to position school nurses as the first line of mental health support for students, teachers, and parents. This solution hasn&apos;t been piloted yet — it&apos;s still in its earliest stage, preparing to co-design with schools, nurses, and families before we move ahead building the evidence needed to reach national scale.
                </p>
              </div>

              {/* Solution 2: AI supervision */}
              <div className="p-8 sm:p-10 bg-zinc-50/60 border border-zinc-200/80 rounded-3xl space-y-4 shadow-xs">
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 leading-tight">
                  AI-assisted supportive supervision for non-specialist health workers
                </h3>
                <p className="text-[15.5px] text-zinc-700 leading-relaxed font-light text-justify sm:text-left">
                  Nepal has widened access to mental health care by training non-specialists to deliver it. Health workers and communities doing this work refer to ongoing supportive supervision as one of the conditions that make it work. Right now that means a supervisor observing a session, reviewing a recording, or debriefing afterward with one worker at a time. It works — but as more workers are trained, both the reach and consistency of that supervision remain unaddressed. We&apos;re designing and testing an AI-assisted supportive supervision model so non-specialists can rehearse difficult cases and get feedback whenever they need it, with their human supervisor still in the loop. It&apos;s designed to run on open models that could be owned outright, so one more worker practicing costs almost nothing. The pilot starts this year: first co-designing the tool with non-specialists and field experts using human-centered design, then testing whether it is safe, acceptable, and feasible in routine practice.
                </p>
              </div>

              {/* Solution 3: Climate change & health */}
              <div className="p-8 sm:p-10 bg-zinc-50/60 border border-zinc-200/80 rounded-3xl space-y-4 shadow-xs">
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 leading-tight">
                  Addressing the intersection of climate change and health
                </h3>
                <div className="space-y-3 text-[15.5px] text-zinc-700 leading-relaxed font-light text-justify sm:text-left">
                  <p>
                    Nepal ranks 10th globally in historical climate disaster impacts (Eckstein et al., 2019). While physical infrastructure and direct health impact dominate the narrative, extreme weather events can also escalate mental health issues and increase the risk of violence.
                  </p>
                  <p>
                    Our working proposal aims to explore how extreme weather events can increase domestic violence and affect mental health, and develop a brief family support program for families affected by these intersecting challenges. We will work with communities to design the program and test whether it is practical and helpful for families experiencing domestic violence after extreme weather events.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
