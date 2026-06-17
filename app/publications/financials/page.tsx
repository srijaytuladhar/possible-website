"use client";

import { Award, Download, Eye } from "lucide-react";

export default function FinancialsPage() {
  const financialReports = [
    { title: "Fiscal Year 2024 Audited Financial Statements", desc: "Audited financial statements detailing funding sources (global grants, private donations) and program expenditures.", date: "2024", type: "Audited Report", link: "/docs/financials-2024.pdf" },
    { title: "Conflict of Interest Policy & Disclosures", desc: "Our organizational policies for maintaining transparency, integrity, and handling potential conflicts of interest.", date: "2024", type: "Policy", link: "/docs/conflict-of-interest-policy.pdf" },
    { title: "Fiscal Year 2023 Audited Financial Statements", desc: "Independent auditor's report and complete balance sheet details for Sambhav and Possible US.", date: "2023", type: "Audited Report", link: "/docs/financials-2023.pdf" },
    { title: "Annual Whistleblower & Transparency Policy", desc: "Policies ensuring safe channels for reporting misconduct and maintaining high corporate governance standards.", date: "2023", type: "Policy", link: "/docs/whistleblower-policy.pdf" },
    { title: "Fiscal Year 2022 Audited Financial Statements", desc: "Audited statement of activities, functional expenses, and cash flows.", date: "2022", type: "Audited Report", link: "/docs/financials-2022.pdf" },
    { title: "Procurement and Grant Allocation Standards", desc: "Guidelines outlining competitive bidding requirements and sub-award allocation rules for regional partners.", date: "2022", type: "Policy", link: "/docs/procurement-policy.pdf" },
    { title: "Fiscal Year 2021 Audited Financial Statements", desc: "Annual statement detailing funding allocations and emergency pandemic response expenditures.", date: "2021", type: "Audited Report", link: "/docs/financials-2021.pdf" },
    { title: "Executive Compensation & Board Governance Policy", desc: "Standard policies defining salary caps, board reviews, and independent member criteria.", date: "2021", type: "Policy", link: "/docs/governance-policy.pdf" },
    { title: "Fiscal Year 2020 Audited Financial Statements", desc: "Complete audited financial records highlighting program cost ratios and reserve funds.", date: "2020", type: "Audited Report", link: "/docs/financials-2020.pdf" },
    { title: "Donor Privacy & Fund Allocation Standards", desc: "Policies protecting individual donor details and ensuring designated funds match field executions.", date: "2020", type: "Policy", link: "/docs/donor-privacy-policy.pdf" },
    // Rest in list format
    { title: "Fiscal Year 2019 Audited Financial Statements", desc: "Audited statements detailing the financials of our clinical hospital operations support phase.", date: "2019", type: "Audited Report", link: "/docs/financials-2019.pdf" },
  ];

  const latestReports = financialReports.slice(0, 10);
  const olderReports = financialReports.slice(10);

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
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-equip text-[14px] font-medium text-secondary-blue hover:text-secondary-blue/80 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Document</span>
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
