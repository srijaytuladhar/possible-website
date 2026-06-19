"use client";

import { useState } from "react";
import Image from "next/image";
import { BarChart3, Download, Eye } from "lucide-react";
import ReportViewerModal from "@/components/ReportViewerModal";

export default function ImpactReportsPage() {
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reports = [
    { title: "2025 Mid-Year Progress & Outcomes Report", desc: "A detailed review of community care program metrics and digital tracking results.", date: "June 18, 2025, 2:30 PM", type: "PDF Report", link: "/reports/mid-year-2025.pdf", cover: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "2024 Annual Impact & Strategy Assessment", desc: "Overview of our yearly milestones, organizational goals, and community impact in Nepal.", date: "November 12, 2024, 10:15 AM", type: "PDF Report", link: "/reports/annual-impact-2024.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Integrated Community Care Impact Assessment", desc: "An evaluation of maternal health care delivery, showing progress in prenatal care adherence.", date: "May 08, 2024, 4:45 PM", type: "PDF Report", link: "/reports/maternal-care-2024.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Community Health Information System (CHIS) Pilot Study", desc: "Assessing patient outcomes and tracking interventions in rural communities.", date: "October 20, 2023, 9:00 AM", type: "PDF Report", link: "/reports/chis-pilot-2023.pdf", cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Chronic Disease Management Implementation Report", desc: "Delivering home-based care models for hypertension and diabetes in Nepal.", date: "August 14, 2023, 11:30 AM", type: "PDF Report", link: "/reports/chronic-disease-2023.pdf", cover: "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Mental Health Primary Care Integration Analysis", desc: "Training community health workers to address depression and anxiety.", date: "February 05, 2023, 3:15 PM", type: "PDF Report", link: "/reports/mental-health-2023.pdf", cover: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "2022 Annual Impact & Financial Overview", desc: "Highlights of our operational achievements and funding allocations.", date: "December 15, 2022, 10:00 AM", type: "PDF Report", link: "/reports/annual-impact-2022.pdf", cover: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Maternal & Child Health Care Quality Index", desc: "A multi-district analysis of prenatal care quality and child nutrition outcomes.", date: "June 22, 2022, 1:30 PM", type: "PDF Report", link: "/reports/maternal-child-2022.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "COVID-19 Emergency Care Response Evaluation", desc: "Reviewing our support to municipal hospitals during the pandemic peaks.", date: "September 09, 2021, 5:00 PM", type: "PDF Report", link: "/reports/covid-response-2021.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "2021 Annual Impact Report", desc: "Yearly progress on community-centered healthcare innovation and trials.", date: "January 15, 2021, 11:00 AM", type: "PDF Report", link: "/reports/annual-impact-2021.pdf", cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&h=350&q=80" },
    // Archive items
    { title: "Non-Communicable Diseases (NCD) Care Protocol Assessment", desc: "Standardizing clinical treatment packages for community health workers.", date: "October 10, 2020, 2:15 PM", type: "PDF Report", link: "/reports/ncd-protocol-2020.pdf", cover: "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "2020 Annual Impact Report", desc: "Yearly progress report highlighting our shift towards research-backed models.", date: "April 02, 2020, 9:45 AM", type: "PDF Report", link: "/reports/annual-impact-2020.pdf", cover: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Maternal Health Community Follow-Up Study", desc: "Assessing post-partum home visits and child health monitoring guides.", date: "January 12, 2020, 11:00 AM", type: "PDF Report", link: "/reports/maternal-follow-2020.pdf", cover: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "2019 Annual Impact Report", desc: "Evaluating clinical services transition to municipal management platforms.", date: "November 14, 2019, 2:30 PM", type: "PDF Report", link: "/reports/annual-impact-2019.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Achham Hospital Emergency Rehabilitation Study", desc: "A review of facility upgrades, medical supplies, and staffing benchmarks.", date: "August 09, 2019, 4:15 PM", type: "PDF Report", link: "/reports/achham-rehab-2019.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Integrated Health Post Infrastructure Audit", desc: "Assessing diagnostics and pharmacy supply chains across partner sites.", date: "May 20, 2019, 10:00 AM", type: "PDF Report", link: "/reports/infrastructure-audit-2019.pdf", cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "2018 Annual Impact & Metrics Overview", desc: "Reviewing patient referral loops, surgical statistics, and clinical indicators.", date: "December 15, 2018, 9:00 AM", type: "PDF Report", link: "/reports/annual-impact-2018.pdf", cover: "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Collaborative Mental Health Model: Implementation Brief", desc: "Training guidelines for counseling integration in non-specialist settings.", date: "October 08, 2018, 1:45 PM", type: "PDF Report", link: "/reports/mental-health-brief-2018.pdf", cover: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Digital Health Dashboards: User Adoption Study", desc: "Evaluating clinic staff interaction with custom electronic records interfaces.", date: "July 12, 2018, 3:30 PM", type: "PDF Report", link: "/reports/dashboard-adoption-2018.pdf", cover: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "2017 Annual Impact Report", desc: "Summarizing hospital volume shifts and early results of community care trials.", date: "November 20, 2017, 11:30 AM", type: "PDF Report", link: "/reports/annual-impact-2017.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Neonatal Health Outcomes & Interventions Report", desc: "Assessing neonatal survival rates and mid-wife training impact in rural districts.", date: "April 11, 2017, 1:15 PM", type: "PDF Report", link: "/reports/neonatal-outcomes-2017.pdf", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "2016 Annual Impact & Performance Assessment", desc: "Detailed records of clinical volume and public funding matching outcomes.", date: "December 14, 2016, 10:00 AM", type: "PDF Report", link: "/reports/annual-impact-2016.pdf", cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&h=350&q=80" }
  ];

  const latestReports = reports.slice(0, 10);
  const olderReports = reports.slice(10);

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
  const totalPages = Math.ceil(olderReports.length / itemsPerPage);
  const paginatedOlderReports = olderReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1">
      {/* Page Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-pink/10 px-3.5 py-1 text-[13px] font-medium text-primary-pink mb-4 uppercase tracking-wider">
          Publications
        </span>
        <h1 className="h1-hero text-zinc-950 mb-3 uppercase tracking-wide">
          Impact Reports
        </h1>
        <p className="text-subheading text-body-gray font-light">
          Detailed reviews of our yearly milestones, organizational goals, and community health indicators in Nepal.
        </p>
      </div>

      <div className="space-y-16 animate-in fade-in duration-300">
        {/* Latest 10 Reports: Card Layout */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light text-zinc-950 uppercase tracking-wider">Latest Reports</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {latestReports.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row justify-between p-6 bg-zinc-50 hover:bg-zinc-100/70 border border-zinc-100 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md gap-6"
              >
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-zinc-600 border border-zinc-200 shadow-sm">
                        <BarChart3 className="h-3 w-3 text-primary-pink" />
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
                      <span>View Report</span>
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

        {/* Older Reports: List Layout */}
        {olderReports.length > 0 && (
          <div className="space-y-6 border-t border-zinc-100 pt-10">
            <h2 className="text-2xl font-light text-zinc-950 uppercase tracking-wider">Archive & Older Reports</h2>
            <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="divide-y divide-zinc-100">
                {paginatedOlderReports.map((item, idx) => (
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
        category="impact"
      />
    </div>
  );
}
