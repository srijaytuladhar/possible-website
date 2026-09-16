"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Beaker,
  DraftingCompass,
  GitFork,
  Info,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function SolutionsPage() {
  const [activePhase, setActivePhase] = useState<string>("all");

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
    { id: "all", name: "All Solutions", icon: GitFork, color: "bg-zinc-900 text-white" },
    { id: "scale", name: "1. Scale", icon: TrendingUp, color: "bg-accent-purple text-white" },
    { id: "test", name: "2. Test", icon: Beaker, color: "bg-secondary-blue text-white" },
    { id: "innovate", name: "3. Innovate", icon: DraftingCompass, color: "bg-primary-pink text-white" },
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
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-equip text-[13.5px] font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                isActive
                  ? phase.id === "scale"
                    ? "bg-accent-purple text-white border-accent-purple shadow-md shadow-accent-purple/25 -translate-y-0.5"
                    : phase.id === "test"
                      ? "bg-secondary-blue text-white border-secondary-blue shadow-md shadow-secondary-blue/25 -translate-y-0.5"
                      : phase.id === "innovate"
                        ? "bg-primary-pink text-white border-primary-pink shadow-md shadow-primary-pink/25 -translate-y-0.5"
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

      {/* Solutions Phase Sections in order: 1. Scale -> 2. Test -> 3. Innovate -> 4. Pipeline */}
      <div className="space-y-16 animate-in fade-in duration-500">

        {/* ========================================================================= */}
        {/* PHASE 1: SCALE */}
        {/* ========================================================================= */}
        {(activePhase === "all" || activePhase === "scale") && (
          <section id="scale" className="scroll-mt-24 p-6 sm:p-10 rounded-3xl border border-accent-purple/20 bg-accent-purple/[0.01] relative overflow-hidden space-y-8">
            <div className="absolute top-0 left-0 w-2.5 h-full bg-accent-purple" />

            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between border-b border-zinc-100 pb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-purple/10 px-3.5 py-1 text-[12px] font-bold text-accent-purple uppercase tracking-widest mb-2">
                  Stage 01
                </span>
                <h2 className="text-3xl font-extralight text-zinc-950 uppercase tracking-wide">
                  1. SCALE
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
              {/* Project 1: Longitudinal Care */}
              <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                <div className="space-y-1 border-b border-zinc-100 pb-3">
                  <span className="text-xs font-bold text-accent-purple uppercase tracking-wider">
                    Community Health Systems
                  </span>
                  <h3 className="h3-card font-bold text-zinc-900">
                    Strengthening community health system through longitudinal care: From pilot to scale
                  </h3>
                </div>
                <p className="text-[14.5px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                  Too often, health systems reach families only when they seek care, leaving gaps in continuous support that could prevent illness, identify risks early, and address health needs before they become more serious. ProCHWs close that gap by bringing integrated, longitudinal care directly into the community.
                </p>
                <p className="text-[13.5px] font-semibold text-zinc-900 italic">
                  This isn&apos;t a parallel program, it&apos;s a government-owned system built to last.
                </p>
                <div className="pt-2">
                  <Link
                    href="/solutions/scale#longitudinal-care"
                    className="text-accent-purple font-semibold text-[13.5px] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read full project & publications</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Project 2: Collaborative Care */}
              <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                <div className="space-y-1 border-b border-zinc-100 pb-3">
                  <span className="text-xs font-bold text-accent-purple uppercase tracking-wider">
                    Primary Care Mental Health
                  </span>
                  <h3 className="h3-card font-bold text-zinc-900">
                    Collaborative care for improving mental health care within primary health care settings
                  </h3>
                </div>
                <p className="text-[14.5px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                  An integrated model that trains CHWs and clinicians to identify and manage depression and anxiety within primary care settings. Co-designed and tested in remote districts in Nepal, now informing WHO-endorsed national training manuals for scale-up.
                </p>
                <div className="pt-2">
                  <Link
                    href="/solutions/scale#collaborative-care"
                    className="text-accent-purple font-semibold text-[13.5px] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read full project & publications</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
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

            {/* Sub-section 2.1: Tested and Ready for Scale-Up */}
            <div className="space-y-6">
              <div className="border-b border-secondary-blue/20 pb-3 flex items-center justify-between">
                <h3 className="text-xl font-bold uppercase tracking-wider text-secondary-blue">
                  2.1 Tested and Ready for Scale-Up
                </h3>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary-blue/10 text-secondary-blue uppercase">
                  Scale Readiness
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* MILAP */}
                <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-4 hover:shadow-md transition-shadow">
                  <div className="space-y-1 border-b border-zinc-100 pb-3">
                    <span className="text-xs font-bold text-secondary-blue uppercase tracking-wider">
                      Intimate Partner Violence & Mental Health
                    </span>
                    <h4 className="h3-card font-bold text-zinc-900 uppercase">MILAP</h4>
                  </div>
                  <p className="text-[14.5px] text-body-gray leading-relaxed font-light">
                    A family-based intervention engaging women, their husbands, and mothers-in-law (MILs) to reduce IPV and improve mental well-being among married women. Tested through a randomized controlled trial with 300 families in Nepal funded by NIMH.
                  </p>
                  <Link href="/solutions/test#milap" className="text-secondary-blue font-semibold text-[13.5px] hover:underline inline-flex items-center gap-1">
                    <span>Learn More & publications &rarr;</span>
                  </Link>
                </div>

                {/* BECOME */}
                <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-4 hover:shadow-md transition-shadow">
                  <div className="space-y-1 border-b border-zinc-100 pb-3">
                    <span className="text-xs font-bold text-secondary-blue uppercase tracking-wider">
                      Integrated Mental Health & NCD Care
                    </span>
                    <h4 className="h3-card font-bold text-zinc-900 uppercase">BECOME</h4>
                  </div>
                  <p className="text-[14.5px] text-body-gray leading-relaxed font-light">
                    Expanding Nepal&apos;s national community health worker program to deliver home-based care for chronic conditions and mental health through trained, full-time, supervised, and digitally enabled CHWs.
                  </p>
                  <Link href="/solutions/test#become" className="text-secondary-blue font-semibold text-[13.5px] hover:underline inline-flex items-center gap-1">
                    <span>Learn More & publications &rarr;</span>
                  </Link>
                </div>

                {/* COMMIT */}
                <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-4 hover:shadow-md transition-shadow">
                  <div className="space-y-1 border-b border-zinc-100 pb-3">
                    <span className="text-xs font-bold text-secondary-blue uppercase tracking-wider">
                      mHealth App Compliance
                    </span>
                    <h4 className="h3-card font-bold text-zinc-900 uppercase">COMMIT</h4>
                  </div>
                  <p className="text-[14.5px] text-body-gray leading-relaxed font-light">
                    An mHealth app co-designed with people with lived experience, health care workers, and government to motivate patients to stay engaged in treatment, tested across HIV and depression cohorts.
                  </p>
                  <Link href="/solutions/test#commit" className="text-secondary-blue font-semibold text-[13.5px] hover:underline inline-flex items-center gap-1">
                    <span>Learn More & publications &rarr;</span>
                  </Link>
                </div>

                {/* Perinatal-MH */}
                <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-4 hover:shadow-md transition-shadow">
                  <div className="space-y-1 border-b border-zinc-100 pb-3">
                    <span className="text-xs font-bold text-secondary-blue uppercase tracking-wider">
                      Perinatal Mental Health
                    </span>
                    <h4 className="h3-card font-bold text-zinc-900 uppercase">Perinatal-MH</h4>
                  </div>
                  <p className="text-[14.5px] text-body-gray leading-relaxed font-light">
                    Integrating the WHO Thinking Healthy Programme (THP) into an existing CHW-delivered longitudinal care model in rural Nepal, embedding mental healthcare within ongoing routine contacts.
                  </p>
                  <Link href="/solutions/test#perinatal-mh" className="text-secondary-blue font-semibold text-[13.5px] hover:underline inline-flex items-center gap-1">
                    <span>Learn More & publications &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sub-section 2.2: Designed to Test */}
            <div className="space-y-6">
              <div className="border-b border-secondary-blue/20 pb-3 flex items-center justify-between">
                <h3 className="text-xl font-bold uppercase tracking-wider text-secondary-blue">
                  2.2 Designed to Test
                </h3>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary-blue/10 text-secondary-blue uppercase">
                  Active Testing
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* INCLUDE */}
                <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-4 hover:shadow-md transition-shadow">
                  <div className="space-y-1 border-b border-zinc-100 pb-3">
                    <span className="text-xs font-bold text-secondary-blue uppercase tracking-wider">
                      Intersectional Stigma & HIV Care
                    </span>
                    <h4 className="h3-card font-bold text-zinc-900 uppercase">INCLUDE</h4>
                  </div>
                  <p className="text-[14.5px] text-body-gray leading-relaxed font-light">
                    A digital tool co-designed to identify and reduce stigma in HIV clinics and address discrimination tied to gender, race, and mental health across four treatment centers.
                  </p>
                  <Link href="/solutions/test#include" className="text-secondary-blue font-semibold text-[13.5px] hover:underline inline-flex items-center gap-1">
                    <span>Learn More & publications &rarr;</span>
                  </Link>
                </div>

                {/* P-SuPP */}
                <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-4 hover:shadow-md transition-shadow">
                  <div className="space-y-1 border-b border-zinc-100 pb-3">
                    <span className="text-xs font-bold text-secondary-blue uppercase tracking-wider">
                      Suicide Care in Primary Care
                    </span>
                    <h4 className="h3-card font-bold text-zinc-900 uppercase">P-SuPP</h4>
                  </div>
                  <p className="text-[14.5px] text-body-gray leading-relaxed font-light">
                    Adapting and strengthening the WHO mhGAP suicide management approach to local cultural and health-system context with locally appropriate risk assessment and safety-planning.
                  </p>
                  <Link href="/solutions/test#psupp" className="text-secondary-blue font-semibold text-[13.5px] hover:underline inline-flex items-center gap-1">
                    <span>Learn More & details &rarr;</span>
                  </Link>
                </div>

                {/* BECOME-D */}
                <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-4 hover:shadow-md transition-shadow">
                  <div className="space-y-1 border-b border-zinc-100 pb-3">
                    <span className="text-xs font-bold text-secondary-blue uppercase tracking-wider">
                      Home-Based Dementia Support
                    </span>
                    <h4 className="h3-card font-bold text-zinc-900 uppercase">BECOME-D</h4>
                  </div>
                  <p className="text-[14.5px] text-body-gray leading-relaxed font-light">
                    A home-based behavioral care program co-created with an expert panel helping families manage dementia-related challenges and stress while improving quality of life and functioning.
                  </p>
                  <Link href="/solutions/test#become-d" className="text-secondary-blue font-semibold text-[13.5px] hover:underline inline-flex items-center gap-1">
                    <span>Learn More & publications &rarr;</span>
                  </Link>
                </div>

                {/* Chissa */}
                <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-4 hover:shadow-md transition-shadow">
                  <div className="space-y-1 border-b border-zinc-100 pb-3">
                    <span className="text-xs font-bold text-secondary-blue uppercase tracking-wider">
                      Digital Suicide Prevention
                    </span>
                    <h4 className="h3-card font-bold text-zinc-900 uppercase">Chissa</h4>
                  </div>
                  <p className="text-[14.5px] text-body-gray leading-relaxed font-light">
                    An innovative digital tool designed to recognize changes in suicide risk and provide tailored support when it&apos;s needed most, co-created with GBMSM communities.
                  </p>
                  <Link href="/solutions/test#chissa" className="text-secondary-blue font-semibold text-[13.5px] hover:underline inline-flex items-center gap-1">
                    <span>Learn More & publications &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PHASE 3: INNOVATE */}
        {/* ========================================================================= */}
        {(activePhase === "all" || activePhase === "innovate") && (
          <section className="scroll-mt-24 p-6 sm:p-10 rounded-3xl border border-primary-pink/20 bg-primary-pink/[0.01] relative overflow-hidden space-y-8">
            <div className="absolute top-0 left-0 w-2.5 h-full bg-primary-pink" />

            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between border-b border-zinc-100 pb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-pink/10 px-3.5 py-1 text-[12px] font-bold text-primary-pink uppercase tracking-widest mb-2">
                  Stage 03
                </span>
                <h2 className="text-3xl font-extralight text-zinc-950 uppercase tracking-wide">
                  3. INNOVATE
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
                    Supporting Caregivers of Children with Autism
                  </span>
                  <h3 className="h3-card font-bold text-zinc-900 uppercase">
                    CASA
                  </h3>
                </div>
                <p className="text-[14.5px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                  A mobile health app being developed with caregivers, health care workers, and experts to support caregivers of children with autism — providing simple, practical tips for communication, new skills, everyday challenges, and caregiver well-being.
                </p>
                <div className="pt-2">
                  <Link href="/solutions/innovate#casa" className="text-primary-pink font-semibold text-[13.5px] hover:underline inline-flex items-center gap-1">
                    <span>Learn More & WHO guidelines &rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Project: Reimagining SRHR */}
              <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                <div className="space-y-1 border-b border-zinc-100 pb-3">
                  <span className="text-xs font-bold text-primary-pink uppercase tracking-wider">
                    Co-Designing Accessible Care
                  </span>
                  <h3 className="h3-card font-bold text-zinc-900">
                    Reimagining sexual and reproductive health services with women with disabilities
                  </h3>
                </div>
                <p className="text-[14.5px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                  Possible worked alongside women with diverse disabilities, the Nepal Disabled Women&apos;s Association, and other stakeholders to understand these experiences and co-design an intervention grounded in their needs, priorities, and lived realities.
                </p>
                <div className="pt-2">
                  <Link href="/solutions/innovate#srhr-disabilities" className="text-primary-pink font-semibold text-[13.5px] hover:underline inline-flex items-center gap-1">
                    <span>View project details &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* PHASE 4: PIPELINE */}
        {/* ========================================================================= */}
        {(activePhase === "all" || activePhase === "pipeline") && (
          <section className="scroll-mt-24 p-6 sm:p-10 rounded-3xl border border-amber-500/20 bg-amber-500/[0.01] relative overflow-hidden space-y-8">
            <div className="absolute top-0 left-0 w-2.5 h-full bg-amber-500" />

            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between border-b border-zinc-100 pb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-800 px-3.5 py-1 text-[12px] font-bold uppercase tracking-widest mb-2">
                  Stage 04
                </span>
                <h2 className="text-3xl font-extralight text-zinc-950 uppercase tracking-wide">
                  4. PIPELINE
                </h2>
              </div>
              <Link
                href="/solutions/pipeline"
                className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-white hover:bg-amber-50 px-5 py-2.5 font-equip font-semibold text-[13.5px] text-amber-700 transition-colors shrink-0"
              >
                <span>View Stage Page</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="text-[15px] text-zinc-700 font-light leading-relaxed bg-amber-50/60 p-5 rounded-2xl border border-amber-150">
              Explore the culturally grounded solutions in our pipeline. We are actively seeking collaborative partners and resources to move these solutions into action. If you&apos;re interested in collaborating, please connect with us at{" "}
              <a href="mailto:research@possiblehealth.org" className="text-amber-700 font-medium underline">
                research@possiblehealth.org
              </a>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Nurse-Led School Mental Health */}
              <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                <div className="space-y-1 border-b border-zinc-100 pb-3">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    School-Based Care
                  </span>
                  <h3 className="h3-card font-bold text-zinc-900 uppercase">
                    Nurse-led mental health support for public schools
                  </h3>
                </div>
                <p className="text-[14.5px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                  Nearly half of all lifetime mental health conditions take root before adulthood, and in Nepal, nearly 7 million children sit in a classroom every school day. Possible is working with the government to position school nurses as the first line of mental health support for students, teachers, and parents.
                </p>
                <div className="pt-2">
                  <Link href="/solutions/pipeline#school-mental-health" className="text-amber-700 font-semibold text-[13.5px] hover:underline inline-flex items-center gap-1">
                    <span>Read pipeline roadmap &rarr;</span>
                  </Link>
                </div>
              </div>

              {/* AI-assisted Supportive Supervision */}
              <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-3xl shadow-xs space-y-5 hover:shadow-md transition-shadow">
                <div className="space-y-1 border-b border-zinc-100 pb-3">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    Digital Health Supervision
                  </span>
                  <h3 className="h3-card font-bold text-zinc-900 uppercase">
                    AI-assisted supportive supervision for non-specialist health workers
                  </h3>
                </div>
                <p className="text-[14.5px] text-body-gray leading-relaxed font-light text-justify sm:text-left">
                  Nepal has widened access to mental health care by training non-specialists to deliver it.
                  {/* TODO: awaiting remaining copy from client */}
                </p>
                <div className="pt-2">
                  <Link href="/solutions/pipeline#ai-supportive-supervision" className="text-amber-700 font-semibold text-[13.5px] hover:underline inline-flex items-center gap-1">
                    <span>Read pipeline roadmap &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
