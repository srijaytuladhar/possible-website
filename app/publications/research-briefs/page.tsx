"use client";

import { FileText, Download, Eye } from "lucide-react";

export default function ResearchBriefsPage() {
  const briefs = [
    { title: "Intervention Briefs: National Expansion Guidelines", desc: "Summaries of our ongoing interventions and their clinical methodologies in Nepal.", date: "2024", type: "Brief", link: "/briefs/intervention-briefs.pdf" },
    { title: "Ethics Brief: Research Conduct in Vulnerable Settings", desc: "Guidelines and ethical considerations in delivering healthcare innovations and trials.", date: "2024", type: "Brief", link: "/briefs/ethics-brief.pdf" },
    { title: "Policy Brief: Strengthening Nepal's Community Health System", desc: "A translation of community health worker implementation findings into national guideline suggestions.", date: "2024", type: "Brief", link: "/briefs/policy-brief-2024.pdf" },
    { title: "Behavioral Interventions for Older Adults", desc: "Short summary on dementia care workflows and caregiver training guides.", date: "2023", type: "Brief", link: "/briefs/dementia-brief-2023.pdf" },
    { title: "Intimate Partner Violence Prevention (MILAP Brief)", desc: "Policy translation regarding WOREC advocacy and family-based domestic violence reduction.", date: "2023", type: "Brief", link: "/briefs/milap-brief-2023.pdf" },
    { title: "Stigma Mitigation in HIV Clinics (INCLUDE Brief)", desc: "Clinical brief on stigma reduction training modules for facility healthcare staff.", date: "2023", type: "Brief", link: "/briefs/include-brief-2023.pdf" },
    { title: "Digital Integration & Data Architecture Brief", desc: "Detailing data security and cloud sync strategies for the Nepal CHIS platform.", date: "2022", type: "Brief", link: "/briefs/digital-chis-2022.pdf" },
    { title: "Collaborative Mental Health Model Policy Brief", desc: "An overview of primary care clinician training and medication supply integration.", date: "2022", type: "Brief", link: "/briefs/mental-health-brief-2022.pdf" },
    { title: "Maternal Health Supervision Standards Brief", desc: "Standard operating procedures for maternal health tracking and high-risk case management.", date: "2021", type: "Brief", link: "/briefs/maternal-brief-2021.pdf" },
    { title: "Non-Communicable Diseases (NCD) Referral Guide Brief", desc: "Guidelines for referring complex hypertensive and diabetic patients to municipal hospitals.", date: "2021", type: "Brief", link: "/briefs/ncd-referral-2021.pdf" },
    // Rest in list format
    { title: "Nepal Health Post Infrastructure & Equipment Needs", desc: "An assessment of basic laboratory and pharmacy supply chain gaps across rural provinces.", date: "2020", type: "Brief", link: "/briefs/infrastructure-brief-2020.pdf" },
  ];

  const latestBriefs = briefs.slice(0, 10);
  const olderBriefs = briefs.slice(10);

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1">
      {/* Page Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-blue/10 px-3.5 py-1 text-[13px] font-medium text-secondary-blue mb-4 uppercase tracking-wider">
          Publications
        </span>
        <h1 className="h1-hero text-zinc-950 mb-3 uppercase tracking-wide">
          Research Briefs
        </h1>
        <p className="text-subheading text-body-gray font-light">
          Policy translations and clinical methodology outlines to bridge the gap between academic trials and actual health services.
        </p>
      </div>

      <div className="space-y-16 animate-in fade-in duration-300">
        {/* Latest 10: Card Layout */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light text-zinc-950 uppercase tracking-wider">Latest Research Briefs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestBriefs.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col p-6 bg-zinc-50 hover:bg-zinc-100/70 border border-zinc-100 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-zinc-600 border border-zinc-200 shadow-sm">
                    <FileText className="h-3 w-3 text-secondary-blue" />
                    {item.type}
                  </span>
                  <span className="text-[13px] text-zinc-400 font-medium">{item.date}</span>
                </div>
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-zinc-950 mb-3 group-hover:text-primary-pink transition-colors">
                  {item.title}
                </h3>
                <p className="text-[14px] text-body-gray leading-relaxed font-light mb-6">
                  {item.desc}
                </p>
                
                {/* View & Download options */}
                <div className="mt-auto flex items-center gap-4 border-t border-zinc-200/50 pt-4">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-equip text-[14px] font-medium text-secondary-blue hover:text-secondary-blue/80 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Brief</span>
                  </a>
                  <span className="text-zinc-300">|</span>
                  <a
                    href={item.link}
                    download
                    className="inline-flex items-center gap-1.5 font-equip text-[14px] font-medium text-primary-pink hover:text-primary-pink/80 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Older Briefs: List Layout */}
        {olderBriefs.length > 0 && (
          <div className="space-y-6 border-t border-zinc-100 pt-10">
            <h2 className="text-2xl font-light text-zinc-950 uppercase tracking-wider">Archive & Older Briefs</h2>
            <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="divide-y divide-zinc-100">
                {olderBriefs.map((item, idx) => (
                  <div key={idx} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50/50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[13px] font-bold text-zinc-400 uppercase tracking-widest">{item.date}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200/50">{item.type}</span>
                      </div>
                      <h4 className="text-[16px] font-semibold text-zinc-900">{item.title}</h4>
                      <p className="text-[13.5px] text-body-gray font-light max-w-3xl">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 sm:self-center">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[14px] font-medium text-secondary-blue hover:text-secondary-blue/80 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </a>
                      <span className="text-zinc-300">|</span>
                      <a
                        href={item.link}
                        download
                        className="inline-flex items-center gap-1.5 text-[14px] font-medium text-primary-pink hover:text-primary-pink/80 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
