"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, Download, Eye } from "lucide-react";
import ReportViewerModal from "@/components/ReportViewerModal";

export default function FinancialsPage() {
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    // Rest in list format
    { title: "Fiscal Year 2019 Audited Financial Statements", desc: "Audited statements detailing the financials of our clinical hospital operations support phase.", date: "October 14, 2019, 9:30 AM", type: "Audited Report", link: "/docs/financials-2019.pdf", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
  ];

  const latestReports = financialReports.slice(0, 10);
  const olderReports = financialReports.slice(10);

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

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1">
      {/* Page Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-purple/10 px-3.5 py-1 text-[13px] font-medium text-accent-purple mb-4 uppercase tracking-wider">
          Publications
        </span>
        <h1 className="h1-hero text-zinc-950 mb-3 uppercase tracking-wide">
          Financial Reports & Policies
        </h1>
        <p className="text-subheading text-body-gray font-light">
          Access our audited financial statements, tax filings, conflict of interest disclosures, and governance policies.
        </p>
      </div>

      <div className="space-y-16 animate-in fade-in duration-300">
        {/* Latest 10: Card Layout */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light text-zinc-950 uppercase tracking-wider">Latest Reports & Policies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestReports.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col p-6 bg-zinc-50 hover:bg-zinc-100/70 border border-zinc-100 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                {/* Card Cover Image */}
                <div className="relative h-48 w-full mb-5 rounded-xl overflow-hidden bg-zinc-200/50 border border-zinc-200/50 shrink-0">
                  <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-zinc-600 border border-zinc-200 shadow-sm">
                    <Award className="h-3 w-3 text-accent-purple" />
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
                  <button
                    onClick={() => openReport(item)}
                    className="inline-flex items-center gap-1.5 font-equip text-[14px] font-medium text-secondary-blue hover:text-secondary-blue/80 transition-colors cursor-pointer"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Document</span>
                  </button>
                  <span className="text-zinc-300">|</span>
                  <button
                    onClick={(e) => handleDownload(e, item.title, item.date, item.desc)}
                    className="inline-flex items-center gap-1.5 font-equip text-[14px] font-medium text-primary-pink hover:text-primary-pink/80 transition-colors cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Older Reports: List Layout */}
        {olderReports.length > 0 && (
          <div className="space-y-6 border-t border-zinc-100 pt-10">
            <h2 className="text-2xl font-light text-zinc-950 uppercase tracking-wider">Archive & Older Statements</h2>
            <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="divide-y divide-zinc-100">
                {olderReports.map((item, idx) => (
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
                      <button
                        onClick={() => openReport(item)}
                        className="inline-flex items-center gap-1.5 text-[14px] font-medium text-secondary-blue hover:text-secondary-blue/80 transition-colors cursor-pointer"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                      <span className="text-zinc-300">|</span>
                      <button
                        onClick={(e) => handleDownload(e, item.title, item.date, item.desc)}
                        className="inline-flex items-center gap-1.5 text-[14px] font-medium text-primary-pink hover:text-primary-pink/80 transition-colors cursor-pointer"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
