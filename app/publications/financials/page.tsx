"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, Download, Eye, FileText } from "lucide-react";
import ReportViewerModal from "@/components/ReportViewerModal";

export default function FinancialsPage() {
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"disclosures" | "reports">("disclosures");

  const financialReports = [
    { title: "Fiscal Year 2024 Audited Financial Statements", desc: "Audited financial statements detailing funding sources (global grants, private donations) and program expenditures.", date: "September 24, 2024, 11:30 AM", type: "Audited Report", link: "/docs/financials-2024.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Conflict of Interest Policy & Disclosures", desc: "Our organizational policies for maintaining transparency, integrity, and handling potential conflicts of interest.", date: "July 12, 2024, 3:45 PM", type: "Policy", link: "/docs/conflict-of-interest-policy.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Fiscal Year 2023 Audited Financial Statements", desc: "Independent auditor's report and complete balance sheet details for Sambhav and Possible US.", date: "October 18, 2023, 10:15 AM", type: "Audited Report", link: "/docs/financials-2023.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Annual Whistleblower & Transparency Policy", desc: "Policies ensuring safe channels for reporting misconduct and maintaining high corporate governance standards.", date: "May 09, 2023, 9:00 AM", type: "Policy", link: "/docs/whistleblower-policy.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Fiscal Year 2022 Audited Financial Statements", desc: "Audited statement of activities, functional expenses, and cash flows.", date: "November 28, 2022, 2:30 PM", type: "Audited Report", link: "/docs/financials-2022.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Procurement and Grant Allocation Standards", desc: "Guidelines outlining competitive bidding requirements and sub-award allocation rules for regional partners.", date: "March 15, 2022, 4:00 PM", type: "Policy", link: "/docs/procurement-policy.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Fiscal Year 2021 Audited Financial Statements", desc: "Annual statement detailing funding allocations and emergency pandemic response expenditures.", date: "December 05, 2021, 10:45 AM", type: "Audited Report", link: "/docs/financials-2021.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Executive Compensation & Board Governance Policy", desc: "Standard policies defining salary caps, board reviews, and independent member criteria.", date: "June 18, 2021, 1:15 PM", type: "Policy", link: "/docs/governance-policy.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Fiscal Year 2020 Audited Financial Statements", desc: "Complete audited financial records highlighting program cost ratios and reserve funds.", date: "November 10, 2020, 3:30 PM", type: "Audited Report", link: "/docs/financials-2020.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Donor Privacy & Fund Allocation Standards", desc: "Policies protecting individual donor details and ensuring designated funds match field executions.", date: "January 20, 2020, 11:00 AM", type: "Policy", link: "/docs/donor-privacy-policy.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    // Archive items
    { title: "Fiscal Year 2019 Audited Financial Statements", desc: "Audited statements detailing the financials of our clinical hospital operations support phase.", date: "October 14, 2019, 9:30 AM", type: "Audited Report", link: "/docs/financials-2019.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Independent Auditor Compliance Report 2019", desc: "Assessing internal controls, documentation standards, and federal reporting guidelines.", date: "August 12, 2019, 4:00 PM", type: "Audited Report", link: "/docs/compliance-2019.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Fiscal Year 2018 Audited Financial Statements", desc: "Balance sheet, program expense ratios, and independent auditor outcomes.", date: "May 20, 2018, 10:15 AM", type: "Audited Report", link: "/docs/financials-2018.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Conflict of Interest Policy Annual Disclosures 2018", desc: "Disclosures matching board and staff compliance guidelines.", date: "March 15, 2018, 9:00 AM", type: "Policy", link: "/docs/coi-2018.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Fiscal Year 2017 Audited Financial Statements", desc: "Complete audited records matching operational and emergency fund expenditures.", date: "November 10, 2017, 3:30 PM", type: "Audited Report", link: "/docs/financials-2017.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Asset Management and Disposal Policy Guidelines", desc: "Standards governing vehicle, clinic device, and infrastructure depreciation methods.", date: "September 09, 2017, 1:45 PM", type: "Policy", link: "/docs/asset-policy.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Fiscal Year 2016 Audited Financial Statements", desc: "Audited statements of cash flows, functional activities, and regional support allocations.", date: "July 20, 2016, 2:15 PM", type: "Audited Report", link: "/docs/financials-2016.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Financial Reserves and Investment Policy Standards", desc: "Outlining board instructions regarding reserve targets and conservative asset allocations.", date: "April 18, 2016, 11:00 AM", type: "Policy", link: "/docs/reserve-policy.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Fiscal Year 2015 Audited Financial Statements", desc: "audited results detailing early international donations and clinical startup funding.", date: "November 14, 2015, 10:00 AM", type: "Audited Report", link: "/docs/financials-2015.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Travel and Business Expense Reimbursement Guidelines", desc: "Policies defining standard rates, per diem limits, and travel receipt matching systems.", date: "August 12, 2015, 9:00 AM", type: "Policy", link: "/docs/travel-policy.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Fiscal Year 2014 Audited Financial Statements", desc: "The original financial reports supporting the development of clinical trials protocols.", date: "May 20, 2014, 1:15 PM", type: "Audited Report", link: "/docs/financials-2014.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Signature Authority and Purchasing Approvals Guide", desc: "Organizational structure and spending limits for executive directors and board members.", date: "February 10, 2014, 10:30 AM", type: "Policy", link: "/docs/signature-policy.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" }
  ];

  // Filter based on selected tab
  const filteredReports = financialReports.filter(item => {
    if (activeTab === "reports") {
      return item.type === "Audited Report";
    } else {
      return item.type === "Policy";
    }
  });

  const latestReports = filteredReports.slice(0, 2);
  const olderReports = filteredReports.slice(2);

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
  const itemsPerPage = 4;
  const totalPages = Math.ceil(olderReports.length / itemsPerPage);
  const paginatedOlderReports = olderReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1">
      {/* Page Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <h1 className="h1-hero text-primary-pink mb-3 uppercase tracking-wide">
          Financial Disclosure & Reports
        </h1>
        <p className="text-subheading text-body-gray font-light">
          Access our audited financial statements, tax filings, conflict of interest disclosures, and governance policies.
        </p>
      </div>

      {/* Tab Switcher Buttons */}
      <div className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row shadow-sm mb-12 rounded-lg border border-zinc-200 bg-white relative">
        <button
          onClick={() => {
            setActiveTab("disclosures");
            setCurrentPage(1);
          }}
          className={`flex-1 py-4 text-center uppercase text-[12.5px] font-bold tracking-wider transition-all relative cursor-pointer rounded-t-lg sm:rounded-tr-none sm:rounded-l-lg ${
            activeTab === "disclosures"
              ? "bg-primary-pink text-white shadow-inner"
              : "bg-white text-primary-pink border-b sm:border-b-0 sm:border-r border-zinc-200 hover:bg-zinc-50/80"
          }`}
        >
          Finance Disclosure
          {activeTab === "disclosures" && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-primary-pink z-10 animate-in fade-in duration-200" />
          )}
        </button>
        <button
          onClick={() => {
            setActiveTab("reports");
            setCurrentPage(1);
          }}
          className={`flex-1 py-4 text-center uppercase text-[12.5px] font-bold tracking-wider transition-all relative cursor-pointer rounded-b-lg sm:rounded-bl-none sm:rounded-r-lg ${
            activeTab === "reports"
              ? "bg-primary-pink text-white shadow-inner"
              : "bg-white text-primary-pink hover:bg-zinc-50/80"
          }`}
        >
          Financial Reports
          {activeTab === "reports" && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-primary-pink z-10 animate-in fade-in duration-200" />
          )}
        </button>
      </div>

      <div className="bg-zinc-100/70 p-8 sm:p-10 rounded-3xl border border-zinc-200/50 animate-in fade-in duration-300 space-y-16">
        {/* Latest Reports: Card Layout */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light text-zinc-950 uppercase tracking-wider">
            Latest {activeTab === "reports" ? "Financial Reports" : "Disclosures"}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {latestReports.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row justify-between p-6 bg-white hover:bg-zinc-50 border border-zinc-200/60 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md gap-6"
              >
                <div className="flex-1 flex flex-col justify-between">
                  <div>
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
                      <span>View Document</span>
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
                <div className="relative aspect-[3/4] w-full sm:w-32 rounded-xl overflow-hidden bg-zinc-200/50 border border-zinc-200/50 shrink-0 self-center shadow-sm">
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
          <div className="space-y-6 border-t border-zinc-200/60 pt-10">
            <h2 className="text-2xl font-light text-zinc-950 uppercase tracking-wider">
              Previous {activeTab === "reports" ? "Financial Reports" : "Disclosures"}
            </h2>
            <div className="bg-white border border-zinc-200/60 rounded-2xl overflow-hidden shadow-sm">
              <div className="divide-y divide-zinc-100">
                {paginatedOlderReports.map((item, idx) => (
                  <div key={idx} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-zinc-50/50 transition-colors">
                    <div className="space-y-1 flex-1">
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
                      <div className="relative aspect-[3/4] w-12 rounded overflow-hidden bg-zinc-100 border border-zinc-200/60 hidden md:block shrink-0 shadow-sm">
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
                  className="px-4 py-2 border border-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer bg-white"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${currentPage === page
                      ? "bg-zinc-950 text-white"
                      : "bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-600"
                      }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer bg-white"
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
        category="financial"
      />
    </div>
  );
}
