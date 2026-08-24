"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  DraftingCompass, 
  Beaker, 
  TrendingUp, 
  GitFork, 
  Info, 
  FileText, 
  BookOpen, 
  PlayCircle, 
  ExternalLink, 
  ImageIcon,
  Sparkles,
  HelpCircle
} from "lucide-react";

export default function SolutionsPage() {
  const [activePhase, setActivePhase] = useState<string>("all");

  const phases = [
    { id: "all", name: "All Phases", icon: GitFork, color: "bg-zinc-100 text-zinc-800" },
    { id: "innovate", name: "1. Innovate", icon: DraftingCompass, color: "bg-primary-pink/10 text-primary-pink border-primary-pink/20" },
    { id: "test", name: "2. Test", icon: Beaker, color: "bg-secondary-blue/10 text-secondary-blue border-secondary-blue/20" },
    { id: "scale", name: "3. Scale", icon: TrendingUp, color: "bg-accent-purple/10 text-accent-purple border-accent-purple/20" },
    { id: "pipeline", name: "4. Pipeline", icon: GitFork, color: "bg-amber-100 text-amber-700 border-amber-200" },
  ];

  // Placeholder PubMed URL
  const placeholderPubMed = "https://pubmed.ncbi.nlm.nih.gov/21394199/";

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1 bg-white">
      {/* Page Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h1 className="h1-hero text-zinc-950 mb-4 uppercase tracking-wide">
          Our Research & Solutions
        </h1>
        <p className="text-subheading text-body-gray font-light">
          Bridging the gap between medical evidence and actual health service delivery through a structured four-phase development lifecycle.
        </p>
      </div>

      {/* Engagement Flexibility Banner */}
      <div className="mb-12 bg-gradient-to-r from-accent-purple/5 via-primary-pink/5 to-secondary-blue/5 border border-accent-purple/15 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xs">
        <div className="absolute top-[-20%] right-[-10%] w-60 h-60 rounded-full bg-radial from-secondary-blue/10 to-transparent blur-2xl -z-10 pointer-events-none" />
        <div className="flex flex-col sm:flex-row gap-4 items-start relative z-10">
          <div className="p-3 bg-accent-purple text-white rounded-2xl shrink-0 shadow-md">
            <Info className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h3 className="h3-card font-semibold text-zinc-900 uppercase tracking-wide">
              Flexible Engagement Framework
            </h3>
            <p className="text-body text-body-gray leading-relaxed font-light">
              Our research and deployment model is designed for direct collaboration. Partners can engage with us at <strong className="font-semibold text-accent-purple">any phase</strong> of the pipeline. You do not need to start at Innovate; a municipal partner or funding body can enter directly at the Scale-up phase to deploy community models already proven and ready for integration.
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
                  ? phase.id === "innovate"
                    ? "bg-primary-pink text-white border-primary-pink shadow-md shadow-primary-pink/25 -translate-y-0.5"
                    : phase.id === "test"
                    ? "bg-secondary-blue text-white border-secondary-blue shadow-md shadow-secondary-blue/25 -translate-y-0.5"
                    : phase.id === "scale"
                    ? "bg-accent-purple text-white border-accent-purple shadow-md shadow-accent-purple/25 -translate-y-0.5"
                    : phase.id === "pipeline"
                    ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/25 -translate-y-0.5"
                    : "bg-zinc-800 text-white border-zinc-800 shadow-md -translate-y-0.5"
                  : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
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
        
        {/* PHASE 1: INNOVATE */}
        {(activePhase === "all" || activePhase === "innovate") && (
          <section className="scroll-mt-24 p-8 rounded-3xl border border-primary-pink/15 bg-primary-pink/[0.01] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary-pink" />
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="lg:w-1/3 space-y-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-pink/10 px-3.5 py-1 text-[12px] font-bold text-primary-pink uppercase tracking-widest">
                  Phase 01
                </span>
                <h2 className="text-3xl font-extralight text-zinc-950 uppercase tracking-wide leading-tight">
                  Innovate
                </h2>
                <p className="text-body text-body-gray font-light leading-relaxed">
                  Co-designing customized healthcare interventions directly with local community groups, patients, and administrators. This phase focuses on developing the initial protocols and workflows.
                </p>
              </div>

              <div className="lg:w-2/3 w-full">
                {/* CASA Project Card */}
                <div className="p-6 sm:p-8 bg-white border border-zinc-150 rounded-2xl shadow-xs space-y-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-zinc-100 pb-4">
                    <div>
                      <h3 className="h3-card font-bold text-zinc-900 uppercase">Disability Intervention &mdash; CASA</h3>
                      <span className="text-xs text-primary-pink font-semibold uppercase tracking-wider">Active Co-Design</span>
                    </div>
                  </div>

                  {/* Photo Placeholder */}
                  <div className="relative w-full h-48 bg-zinc-50 border border-dashed border-zinc-200 rounded-xl flex flex-col justify-center items-center gap-2 group overflow-hidden select-none">
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                    <ImageIcon className="h-8 w-8 text-primary-pink opacity-50 group-hover:scale-110 transition-transform" />
                    <span className="text-[12px] font-medium text-body-gray uppercase tracking-wider">Photo Placeholder: CASA</span>
                  </div>

                  <p className="text-[15px] text-body-gray leading-relaxed font-light">
                    A community-based disability support intervention that co-designs assistive care pathways directly with family caregivers in rural Nepal. CASA aims to integrate home-based rehabilitation workflows into municipal programs to enhance social inclusion, decrease stigma, and improve quality of life for children and adults with physical and cognitive disabilities.
                  </p>

                  <div className="pt-2">
                    <span className="text-xs font-semibold text-zinc-400 block mb-2 uppercase tracking-wider">Research Publications</span>
                    <a
                      href={placeholderPubMed}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-small font-semibold text-primary-pink hover:text-primary-pink/80 transition-colors group"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Read CASA Study (PubMed Placeholder)</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PHASE 2: TEST */}
        {(activePhase === "all" || activePhase === "test") && (
          <section className="scroll-mt-24 p-8 rounded-3xl border border-secondary-blue/15 bg-secondary-blue/[0.01] relative overflow-hidden space-y-10">
            <div className="absolute top-0 left-0 w-2 h-full bg-secondary-blue" />
            
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="lg:w-1/3 space-y-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-blue/10 px-3.5 py-1 text-[12px] font-bold text-secondary-blue uppercase tracking-widest">
                  Phase 02
                </span>
                <h2 className="text-3xl font-extralight text-zinc-950 uppercase tracking-wide leading-tight">
                  Test
                </h2>
                <p className="text-body text-body-gray font-light leading-relaxed">
                  Evaluating clinical models, tools, and platforms through scientific research trials. We test feasibility, acceptability, and efficacy before moving models into broader public systems.
                </p>
              </div>

              {/* Sub-sections of Test Phase */}
              <div className="lg:w-2/3 w-full space-y-12">
                
                {/* 2.1 Design to Test */}
                <div className="space-y-6">
                  <div className="border-b border-secondary-blue/20 pb-2">
                    <h3 className="text-lg font-bold text-zinc-800 uppercase tracking-wider">
                      2.1 Design to Test
                    </h3>
                    <p className="text-[13.5px] text-body-gray font-light mt-1">
                      Projects currently in active feasibility testing or trial protocol design phases.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* BECOME (Design to Test) */}
                    <div className="p-5 bg-white border border-zinc-150 rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div className="space-y-4">
                        <div className="relative w-full h-32 bg-zinc-50 border border-dashed border-zinc-200 rounded-lg flex flex-col justify-center items-center gap-1 select-none">
                          <ImageIcon className="h-6 w-6 text-secondary-blue opacity-40" />
                          <span className="text-[10px] font-medium text-body-gray uppercase">Placeholder: BECOME</span>
                        </div>
                        <h4 className="text-[16px] font-bold text-zinc-900 uppercase">BECOME</h4>
                        <p className="text-[13.5px] text-body-gray leading-relaxed font-light">
                          Stepped-wedge cluster trial integrating behavioral care workflows for mental health conditions and chronic noncommunicable diseases (NCDs) in primary care clinics.
                        </p>
                      </div>
                    </div>

                    {/* INCLUDE */}
                    <div className="p-5 bg-white border border-zinc-150 rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div className="space-y-4">
                        <div className="relative w-full h-32 bg-zinc-50 border border-dashed border-zinc-200 rounded-lg flex flex-col justify-center items-center gap-1 select-none">
                          <ImageIcon className="h-6 w-6 text-secondary-blue opacity-40" />
                          <span className="text-[10px] font-medium text-body-gray uppercase">Placeholder: INCLUDE</span>
                        </div>
                        <h4 className="text-[16px] font-bold text-zinc-900 uppercase">INCLUDE</h4>
                        <p className="text-[13.5px] text-body-gray leading-relaxed font-light">
                          A structural stigma-reduction study evaluating digital monitoring workflows in public HIV clinics to improve the quality of clinical consultation and retention.
                        </p>
                      </div>
                    </div>

                    {/* PSuPP */}
                    <div className="p-5 bg-white border border-zinc-150 rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div className="space-y-4">
                        <div className="relative w-full h-32 bg-zinc-50 border border-dashed border-zinc-200 rounded-lg flex flex-col justify-center items-center gap-1 select-none">
                          <ImageIcon className="h-6 w-6 text-secondary-blue opacity-40" />
                          <span className="text-[10px] font-medium text-body-gray uppercase">Placeholder: PSuPP</span>
                        </div>
                        <h4 className="text-[16px] font-bold text-zinc-900 uppercase">PSuPP</h4>
                        <p className="text-[13.5px] text-body-gray leading-relaxed font-light">
                          Suicide Prevention Package trials training community-level gatekeepers and primary healthcare clinicians in evidence-based screening and crisis referral systems.
                        </p>
                      </div>
                    </div>

                    {/* CHiSSA */}
                    <div className="p-5 bg-white border border-zinc-150 rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div className="space-y-4">
                        <div className="relative w-full h-32 bg-zinc-50 border border-dashed border-zinc-200 rounded-lg flex flex-col justify-center items-center gap-1 select-none">
                          <ImageIcon className="h-6 w-6 text-secondary-blue opacity-40" />
                          <span className="text-[10px] font-medium text-body-gray uppercase">Placeholder: CHiSSA</span>
                        </div>
                        <h4 className="text-[16px] font-bold text-zinc-900 uppercase">CHiSSA</h4>
                        <p className="text-[13.5px] text-body-gray leading-relaxed font-light">
                          Just-in-Time Adaptive Intervention (JITAI) mobile platform delivering clinical support and risk-monitoring protocols for vulnerable key groups.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2.2 Tested and Ready for Scale-Up */}
                <div className="space-y-6">
                  <div className="border-b border-secondary-blue/20 pb-2">
                    <h3 className="text-lg font-bold text-zinc-800 uppercase tracking-wider">
                      2.2 Tested & Ready for Scale-Up
                    </h3>
                    <p className="text-[13.5px] text-body-gray font-light mt-1">
                      Models with completed trials, established clinical protocols, and ready packages.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* COMMIT-D */}
                    <div className="p-5 bg-white border border-zinc-150 rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div className="space-y-4">
                        <div className="relative w-full h-32 bg-zinc-50 border border-dashed border-zinc-200 rounded-lg flex flex-col justify-center items-center gap-1 select-none">
                          <ImageIcon className="h-6 w-6 text-secondary-blue opacity-40" />
                          <span className="text-[10px] font-medium text-body-gray uppercase">Placeholder: COMMIT-D</span>
                        </div>
                        <h4 className="text-[16px] font-bold text-zinc-900 uppercase">COMMIT-D</h4>
                        <p className="text-[13.5px] text-body-gray leading-relaxed font-light">
                          An implementation package combining community-based mHealth tool workflows with motivational interviewing. It enables health workers to deliver structured depression counseling, track treatment adherence, and monitor clinical progress in rural municipalities.
                        </p>
                      </div>
                      <div className="pt-4 border-t border-zinc-100 flex flex-wrap gap-2 mt-4">
                        <a href={placeholderPubMed} className="inline-flex items-center gap-1 text-[11px] font-semibold text-secondary-blue hover:underline bg-secondary-blue/5 px-2.5 py-1 rounded-full"><FileText className="h-3.5 w-3.5" /> Paper</a>
                        <a href="#" className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-500 hover:underline bg-zinc-100 px-2.5 py-1 rounded-full"><BookOpen className="h-3.5 w-3.5" /> Manual</a>
                        <a href="#" className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-500 hover:underline bg-zinc-100 px-2.5 py-1 rounded-full"><PlayCircle className="h-3.5 w-3.5" /> Video</a>
                      </div>
                    </div>

                    {/* MILAP (Short version) */}
                    <div className="p-5 bg-white border border-zinc-150 rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div className="space-y-4">
                        <div className="relative w-full h-32 bg-zinc-50 border border-dashed border-zinc-200 rounded-lg flex flex-col justify-center items-center gap-1 select-none">
                          <ImageIcon className="h-6 w-6 text-secondary-blue opacity-40" />
                          <span className="text-[10px] font-medium text-body-gray uppercase">Placeholder: MILAP</span>
                        </div>
                        <h4 className="text-[16px] font-bold text-zinc-900 uppercase">Family Intervention MILAP</h4>
                        <p className="text-[13.5px] text-body-gray leading-relaxed font-light">
                          A family-based behavioral intervention co-created with WOREC that engages husbands and mothers-in-law to prevent intimate partner violence. Efficacy trials demonstrate significant reductions in domestic abuse and clinical depression symptoms among participating rural women.
                        </p>
                      </div>
                      <div className="pt-4 border-t border-zinc-100 flex flex-wrap gap-2 mt-4">
                        <a href="https://gh.bmj.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-semibold text-secondary-blue hover:underline bg-secondary-blue/5 px-2.5 py-1 rounded-full"><FileText className="h-3.5 w-3.5" /> Paper</a>
                        <a href="#" className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-500 hover:underline bg-zinc-100 px-2.5 py-1 rounded-full"><BookOpen className="h-3.5 w-3.5" /> Manual</a>
                        <a href="#" className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-500 hover:underline bg-zinc-100 px-2.5 py-1 rounded-full"><PlayCircle className="h-3.5 w-3.5" /> Video</a>
                      </div>
                    </div>

                    {/* BECOME (Ready for scale) */}
                    <div className="p-5 bg-white border border-zinc-150 rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div className="space-y-4">
                        <div className="relative w-full h-32 bg-zinc-50 border border-dashed border-zinc-200 rounded-lg flex flex-col justify-center items-center gap-1 select-none">
                          <ImageIcon className="h-6 w-6 text-secondary-blue opacity-40" />
                          <span className="text-[10px] font-medium text-body-gray uppercase">Placeholder: BECOME</span>
                        </div>
                        <h4 className="text-[16px] font-bold text-zinc-900 uppercase">BECOME (Completed Trial)</h4>
                        <p className="text-[13.5px] text-body-gray leading-relaxed font-light">
                          Completed evaluation of the combined behavioral intervention for NCDs and depression. Proven protocols are packaged for scale-up, detailing how dual-trained community health worker teams successfully screen, refer, and support patients under joint clinical oversight.
                        </p>
                      </div>
                      <div className="pt-4 border-t border-zinc-100 flex flex-wrap gap-2 mt-4">
                        <a href={placeholderPubMed} className="inline-flex items-center gap-1 text-[11px] font-semibold text-secondary-blue hover:underline bg-secondary-blue/5 px-2.5 py-1 rounded-full"><FileText className="h-3.5 w-3.5" /> Paper</a>
                        <a href="#" className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-500 hover:underline bg-zinc-100 px-2.5 py-1 rounded-full"><BookOpen className="h-3.5 w-3.5" /> Manual</a>
                        <a href="#" className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-500 hover:underline bg-zinc-100 px-2.5 py-1 rounded-full"><PlayCircle className="h-3.5 w-3.5" /> Video</a>
                      </div>
                    </div>

                    {/* Perinatal MH IR */}
                    <div className="p-5 bg-white border border-zinc-150 rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div className="space-y-4">
                        <div className="relative w-full h-32 bg-zinc-50 border border-dashed border-zinc-200 rounded-lg flex flex-col justify-center items-center gap-1 select-none">
                          <ImageIcon className="h-6 w-6 text-secondary-blue opacity-40" />
                          <span className="text-[10px] font-medium text-body-gray uppercase">Placeholder: PERINATAL MH</span>
                        </div>
                        <h4 className="text-[16px] font-bold text-zinc-900 uppercase">Perinatal MH IR</h4>
                        <p className="text-[13.5px] text-body-gray leading-relaxed font-light">
                          An implementation research package integrating perinatal mental health screening and peer-based behavioral therapy directly into routine antenatal care and immunization clinic models, providing support systems for pregnant women and new mothers.
                        </p>
                      </div>
                      <div className="pt-4 border-t border-zinc-100 flex flex-wrap gap-2 mt-4">
                        <a href={placeholderPubMed} className="inline-flex items-center gap-1 text-[11px] font-semibold text-secondary-blue hover:underline bg-secondary-blue/5 px-2.5 py-1 rounded-full"><FileText className="h-3.5 w-3.5" /> Paper</a>
                        <a href="#" className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-500 hover:underline bg-zinc-100 px-2.5 py-1 rounded-full"><BookOpen className="h-3.5 w-3.5" /> Manual</a>
                        <a href="#" className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-500 hover:underline bg-zinc-100 px-2.5 py-1 rounded-full"><PlayCircle className="h-3.5 w-3.5" /> Video</a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* PHASE 3: SCALE */}
        {(activePhase === "all" || activePhase === "scale") && (
          <section className="scroll-mt-24 p-8 rounded-3xl border border-accent-purple/15 bg-accent-purple/[0.01] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-accent-purple" />
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="lg:w-1/3 space-y-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-purple/10 px-3.5 py-1 text-[12px] font-bold text-accent-purple uppercase tracking-widest">
                  Phase 03
                </span>
                <h2 className="text-3xl font-extralight text-zinc-950 uppercase tracking-wide leading-tight">
                  Scale
                </h2>
                <p className="text-body text-body-gray font-light leading-relaxed">
                  Transitioning validated clinical and data workflows directly into government networks and municipal healthcare infrastructures for long-term sustainability.
                </p>
              </div>

              <div className="lg:w-2/3 w-full space-y-6">
                
                {/* COCM Card */}
                <div className="p-6 bg-white border border-zinc-150 rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="relative w-full h-32 bg-zinc-50 border border-dashed border-zinc-200 rounded-lg flex flex-col justify-center items-center gap-1 select-none">
                      <ImageIcon className="h-6 w-6 text-accent-purple opacity-40" />
                      <span className="text-[10px] font-medium text-body-gray uppercase">Placeholder: COCM</span>
                    </div>
                    <h3 className="h3-card font-bold text-zinc-900 uppercase">Collaborative Care Model (COCM)</h3>
                    <p className="text-[14px] text-body-gray leading-relaxed font-light">
                      An integrated, collaborative care system training primary care clinicians and local CHWs to screen, monitor, and treat moderate-to-severe depression and anxiety. This care protocol features structural integration in health posts, shared clinical registries, and remote psychiatric consultation.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-100 flex flex-wrap gap-2 mt-4">
                    <a href={placeholderPubMed} className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-purple hover:underline bg-accent-purple/5 px-2.5 py-1 rounded-full"><FileText className="h-3.5 w-3.5" /> Paper</a>
                    <a href="#" className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-500 hover:underline bg-zinc-100 px-2.5 py-1 rounded-full"><BookOpen className="h-3.5 w-3.5" /> Manual</a>
                    <a href="#" className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-500 hover:underline bg-zinc-100 px-2.5 py-1 rounded-full"><PlayCircle className="h-3.5 w-3.5" /> Video</a>
                  </div>
                </div>

                {/* CHW Program Card */}
                <div className="p-6 bg-white border border-zinc-150 rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="relative w-full h-32 bg-zinc-50 border border-dashed border-zinc-200 rounded-lg flex flex-col justify-center items-center gap-1 select-none">
                      <ImageIcon className="h-6 w-6 text-accent-purple opacity-40" />
                      <span className="text-[10px] font-medium text-body-gray uppercase">Placeholder: CHW PROGRAM</span>
                    </div>
                    <h3 className="h3-card font-bold text-zinc-900 uppercase">National Community Health Worker (CHW) Program</h3>
                    <p className="text-[14px] text-body-gray leading-relaxed font-light">
                      Deploying full-time, salaried, and professionally trained community health workers to deliver comprehensive maternal-child care, chronic disease screening, and behavioral health support at home. This program is powered by a state-of-the-art Community Health Information System (CHIS) that links clinical data to patient files.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-100 flex flex-wrap gap-2 mt-4">
                    <a href={placeholderPubMed} className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-purple hover:underline bg-accent-purple/5 px-2.5 py-1 rounded-full"><FileText className="h-3.5 w-3.5" /> Paper</a>
                    <a href="#" className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-500 hover:underline bg-zinc-100 px-2.5 py-1 rounded-full"><BookOpen className="h-3.5 w-3.5" /> Manual</a>
                    <a href="#" className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-500 hover:underline bg-zinc-100 px-2.5 py-1 rounded-full"><PlayCircle className="h-3.5 w-3.5" /> Video</a>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* PHASE 4: PIPELINE */}
        {(activePhase === "all" || activePhase === "pipeline") && (
          <section className="scroll-mt-24 p-8 rounded-3xl border border-amber-250 bg-amber-50/[0.05] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-amber-500" />
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="lg:w-1/3 space-y-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-800 px-3.5 py-1 text-[12px] font-bold uppercase tracking-widest">
                  Phase 04
                </span>
                <h2 className="text-3xl font-extralight text-zinc-950 uppercase tracking-wide leading-tight">
                  Pipeline
                </h2>
                <p className="text-body text-body-gray font-light leading-relaxed">
                  Innovative concepts and exploratory projects at the early research or trial planning stage, anticipating the future landscape of healthcare.
                </p>
              </div>

              <div className="lg:w-2/3 w-full space-y-6">
                
                {/* School Mental Health Program */}
                <div className="p-5 bg-white border border-zinc-150 rounded-xl shadow-xs hover:shadow-md transition-shadow">
                  <h4 className="text-[16px] font-bold text-zinc-900 uppercase mb-2">School Mental Health Program</h4>
                  <p className="text-[13.5px] text-body-gray leading-relaxed font-light">
                    Designing school-based emotional screening frameworks and early interventions. This program trains secondary school educators and student leaders to identify common psychiatric distress signals, delivering basic psychological first aid and referral services.
                  </p>
                </div>

                {/* AI-enabled supportive supervision */}
                <div className="p-5 bg-white border border-zinc-150 rounded-xl shadow-xs hover:shadow-md transition-shadow">
                  <h4 className="text-[16px] font-bold text-zinc-900 uppercase mb-2">AI-Enabled Supportive Supervision</h4>
                  <p className="text-[13.5px] text-body-gray leading-relaxed font-light">
                    Building intelligent assistant models for remote health post supervisors. By leveraging natural language processing and structured data reviews, the system automatically audits community health worker reporting and translates clinical charts into tailored feedback.
                  </p>
                </div>

                {/* Climate and Health (Provisional) */}
                <div className="p-5 bg-white border border-amber-250 rounded-xl bg-amber-50/[0.02] shadow-xs hover:shadow-md transition-shadow relative">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h4 className="text-[16px] font-bold text-zinc-900 uppercase">Climate and Health</h4>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full select-none uppercase tracking-wider shrink-0">
                      <HelpCircle className="h-3 w-3" /> Double Check
                    </span>
                  </div>
                  <p className="text-[13.5px] text-body-gray leading-relaxed font-light">
                    Investigating the direct impacts of rising ambient temperatures, changing monsoon patterns, and environmental disasters on healthcare access and system capacities in vulnerable districts, building early frameworks for adaptive community clinics.
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
