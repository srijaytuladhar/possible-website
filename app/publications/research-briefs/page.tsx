"use client";

import { useState } from "react";
import Image from "next/image";
import { FileText, Download, Eye } from "lucide-react";
import ReportViewerModal from "@/components/ReportViewerModal";

export default function ResearchBriefsPage() {
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const briefs = [
    { title: "Intervention Briefs: National Expansion Guidelines", desc: "Summaries of our ongoing interventions and their clinical methodologies in Nepal.", date: "July 19, 2024, 11:00 AM", type: "Brief", link: "/briefs/intervention-briefs.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Ethics Brief: Research Conduct in Vulnerable Settings", desc: "Guidelines and ethical considerations in delivering healthcare innovations and trials.", date: "April 05, 2024, 2:45 PM", type: "Brief", link: "/briefs/ethics-brief.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Policy Brief: Strengthening Nepal's Community Health System", desc: "A translation of community health worker implementation findings into national guideline suggestions.", date: "January 14, 2024, 10:15 AM", type: "Brief", link: "/briefs/policy-brief-2024.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Behavioral Interventions for Older Adults", desc: "Short summary on dementia care workflows and caregiver training guides.", date: "November 23, 2023, 4:30 PM", type: "Brief", link: "/briefs/dementia-brief-2023.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Intimate Partner Violence Prevention (MILAP Brief)", desc: "Policy translation regarding WOREC advocacy and family-based domestic violence reduction.", date: "August 08, 2023, 9:30 AM", type: "Brief", link: "/briefs/milap-brief-2023.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Stigma Mitigation in HIV Clinics (INCLUDE Brief)", desc: "Clinical brief on stigma reduction training modules for facility healthcare staff.", date: "May 17, 2023, 1:45 PM", type: "Brief", link: "/briefs/include-brief-2023.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Digital Integration & Data Architecture Brief", desc: "Detailing data security and cloud sync strategies for the Nepal CHIS platform.", date: "December 12, 2022, 11:15 AM", type: "Brief", link: "/briefs/digital-chis-2022.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Collaborative Mental Health Model Policy Brief", desc: "An overview of primary care clinician training and medication supply integration.", date: "June 20, 2022, 3:00 PM", type: "Brief", link: "/briefs/mental-health-brief-2022.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Maternal Health Supervision Standards Brief", desc: "Standard operating procedures for maternal health tracking and high-risk case management.", date: "September 29, 2021, 2:15 PM", type: "Brief", link: "/briefs/maternal-brief-2021.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Non-Communicable Diseases (NCD) Referral Guide Brief", desc: "Guidelines for referring complex hypertensive and diabetic patients to municipal hospitals.", date: "March 08, 2021, 10:00 AM", type: "Brief", link: "/briefs/ncd-referral-2021.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    // Archive items
    { title: "Nepal Health Post Infrastructure & Equipment Needs", desc: "An assessment of basic laboratory and pharmacy supply chain gaps across rural provinces.", date: "October 11, 2020, 11:30 AM", type: "Brief", link: "/briefs/infrastructure-brief-2020.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Primary Healthcare Facilities Staffing Standards Brief", desc: "A summary analysis of clinical staff allocations, nurse midwifery ratios, and support personnel.", date: "July 24, 2020, 2:45 PM", type: "Brief", link: "/briefs/staffing-brief-2020.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Mental Health Pharmacy Supplies Logistics Brief", desc: "Evaluating supply lines, medication stockouts, and transport routes to health posts.", date: "April 02, 2020, 9:00 AM", type: "Brief", link: "/briefs/pharmacy-brief-2020.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Community Healthcare Information System Data Integrity Guidelines", desc: "Evaluating synchronization protocols, duplicate records checks, and validation rules.", date: "January 15, 2020, 11:00 AM", type: "Brief", link: "/briefs/data-brief-2020.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Maternal Health High Risk Pregnancy Referrals Protocol", desc: "Outlining transportation subsidies, emergency surgical contacts, and midwife standby rosters.", date: "October 08, 2019, 3:30 PM", type: "Brief", link: "/briefs/referral-brief-2019.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Achham District Health Post Sanitation Standards Assessment", desc: "A review of clean water resources, waste disposal infrastructure, and clinic cleanliness policies.", date: "July 12, 2019, 10:15 AM", type: "Brief", link: "/briefs/sanitation-brief-2019.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Collaborative Mental Health Supervision Framework", desc: "Clinical supervision guidelines for primary care workers utilizing video consulting portals.", date: "May 09, 2019, 1:30 PM", type: "Brief", link: "/briefs/supervision-brief-2019.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Maternal Care Adherence Strategies: Financial Incentives Review", desc: "Evaluating cash transfer programs on hospital delivery rates and prenatal follow-ups.", date: "February 28, 2019, 11:00 AM", type: "Brief", link: "/briefs/incentive-brief-2019.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Hypertension Monitoring: Patient Training Guides Analysis", desc: "Evaluating home-based blood pressure cuffs and daily diary methods in rural settings.", date: "November 10, 2018, 4:00 PM", type: "Brief", link: "/briefs/hypertension-brief-2018.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "2017 Earthquake Rehabilitation and Rebuilding Brief", desc: "Rebuilding health posts, clinic supplies transport, and emergency medical guidelines.", date: "August 15, 2017, 10:30 AM", type: "Brief", link: "/briefs/earthquake-rehab-2017.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Neonatal Survival Interventions: Kangaroo Mother Care", desc: "A guidelines brief for clinic staff introducing skin-to-skin contact practices to families.", date: "May 20, 2017, 2:15 PM", type: "Brief", link: "/briefs/neonatal-brief-2017.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "2016 Pediatric Nutrition and Supplementary Feedings Guidelines", desc: "Standard clinic measurements, growth charts, and nutrient mix recipes for child care.", date: "March 11, 2016, 9:00 AM", type: "Brief", link: "/briefs/pediatric-brief-2016.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" }
  ];

  const latestBriefs = briefs.slice(0, 10);
  const olderBriefs = briefs.slice(10);

  const openReport = (report: any) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleDownload = (e: React.MouseEvent, title: string, date: string, desc: string) => {
    e.preventDefault();
    const content = `POSSIBLE HEALTH REPORT\n======================\nTitle: ${title}\nDate: ${date}\nDescription: ${desc}\n\nThis is a mock report document generated for preview purposes.\nFor the full official publication, please contact info@possiblehealth.org.\n`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(olderBriefs.length / itemsPerPage);
  const paginatedOlderBriefs = olderBriefs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {latestBriefs.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row justify-between p-6 bg-zinc-50 hover:bg-zinc-100/70 border border-zinc-100 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md gap-6"
              >
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-zinc-600 border border-zinc-200 shadow-sm">
                        <FileText className="h-3 w-3 text-secondary-blue" />
                        {item.type}
                      </span>
                      <span className="text-[13px] text-zinc-400 font-medium">{item.date}</span>
                    </div>
                    <h3 className="text-[17px] sm:text-[19px] font-semibold text-zinc-950 mb-3 group-hover:text-primary-pink transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[13.5px] text-body-gray leading-relaxed font-light mb-6">
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* View & Download options */}
                  <div className="mt-auto pt-4 border-t border-zinc-200/50 flex items-center gap-4">
                    <button
                      onClick={() => openReport(item)}
                      className="inline-flex items-center gap-1.5 font-equip text-[13.5px] font-medium text-secondary-blue hover:text-secondary-blue/80 transition-colors cursor-pointer"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Brief</span>
                    </button>
                    <span className="text-zinc-300">|</span>
                    <button
                      onClick={(e) => handleDownload(e, item.title, item.date, item.desc)}
                      className="inline-flex items-center gap-1.5 font-equip text-[13.5px] font-medium text-primary-pink hover:text-primary-pink/80 transition-colors cursor-pointer"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                {/* Card Cover Image on the right */}
                <div className="relative h-40 w-full sm:w-44 rounded-xl overflow-hidden bg-zinc-200/50 border border-zinc-200/50 shrink-0 self-center">
                  <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 200px"
                  />
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
                {paginatedOlderBriefs.map((item, idx) => (
                  <div key={idx} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-zinc-50/50 transition-colors">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[13px] font-bold text-zinc-400 uppercase tracking-widest">{item.date}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200/50">{item.type}</span>
                      </div>
                      <h4 className="text-[16px] font-semibold text-zinc-900">{item.title}</h4>
                      <p className="text-[13.5px] text-body-gray font-light max-w-3xl">{item.desc}</p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 self-start sm:self-center">
                      <button
                        onClick={() => openReport(item)}
                        className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-secondary-blue hover:text-secondary-blue/80 transition-colors cursor-pointer"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                      <span className="text-zinc-300">|</span>
                      <button
                        onClick={(e) => handleDownload(e, item.title, item.date, item.desc)}
                        className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary-pink hover:text-primary-pink/80 transition-colors cursor-pointer"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </button>

                      {/* Thumbnail Cover Image on the right of the row */}
                      <div className="relative h-14 w-20 rounded overflow-hidden bg-zinc-100 border border-zinc-200/60 hidden md:block shrink-0">
                        <Image
                          src={item.cover}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      currentPage === page
                        ? "bg-zinc-950 text-white"
                        : "border border-zinc-200 hover:bg-zinc-50 text-zinc-600"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <ReportViewerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        report={selectedReport}
        category="brief"
      />
    </div>
  );
}
