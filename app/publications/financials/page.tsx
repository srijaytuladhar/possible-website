"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Download, Eye, ArrowLeft } from "lucide-react";
import ReportViewerModal from "@/components/ReportViewerModal";

function FinancialsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"disclosures" | "reports">(() => {
    return tabParam === "reports" ? "reports" : "disclosures";
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (tabParam === "reports") {
      setActiveTab("reports");
      setCurrentPage(1);
    } else if (tabParam === "disclosures") {
      setActiveTab("disclosures");
      setCurrentPage(1);
    }
  }, [tabParam]);

  const handleTabChange = (tab: "disclosures" | "reports") => {
    setActiveTab(tab);
    setCurrentPage(1);
    router.replace(`/publications/financials?tab=${tab}`, { scroll: false });
  };

  // Conflict of Interest / Financial Disclosures
  const disclosureReports = [
    {
      title: "FCOI Possible US",
      desc: "",
      date: "August 2021",
      type: "Policy & Disclosure",
      link: "/conflict-of-interest/FCOI Possible US.pdf",
      pdfFilename: "FCOI Possible US.pdf",
      cover: "/conflict-of-interest/thumbnails/FCOI Possible US.webp",
    },
    {
      title: "FCOI Sambhav",
      desc: "",
      date: "June 01, 2021",
      type: "Code of Conduct",
      link: "/conflict-of-interest/FCOI Sambhav.pdf",
      pdfFilename: "FCOI Sambhav.pdf",
      cover: "/conflict-of-interest/thumbnails/FCOI Sambhav.webp",
    },
  ];

  // Financial Reports (Audited Statements & IRS Form 990 filings sorted descending)
  const financialReports = [
    {
      title: "Fiscal Year 2025 Audited Financial Statements",
      desc: "",
      date: "Fiscal Year 2024 - 2025",
      type: "Audited Report",
      link: "/financial-report/Possible-2025-Audit-Report.pdf",
      pdfFilename: "Possible-2025-Audit-Report.pdf",
      cover: "/financial-report/thumbnails/Possible-2025-Audit-Report.webp",
    },
    {
      title: "2025 Form 990: Return of Organization Exempt From Income Tax",
      desc: "",
      date: "Tax Year 2025",
      type: "IRS Form 990",
      link: "/financial-report/2025-Nyaya-Health-990.pdf",
      pdfFilename: "2025-Nyaya-Health-990.pdf",
      cover: "/financial-report/thumbnails/2025-Nyaya-Health-990.webp",
    },
    {
      title: "Fiscal Year 2024 Audited Financial Statements",
      desc: "",
      date: "Fiscal Year 2023 - 2024",
      type: "Audited Report",
      link: "/financial-report/Possible-2024-Audit-Report.pdf",
      pdfFilename: "Possible-2024-Audit-Report.pdf",
      cover: "/financial-report/thumbnails/Possible-2024-Audit-Report.webp",
    },
    {
      title: "2024 Form 990: Return of Organization Exempt From Income Tax",
      desc: "",
      date: "Tax Year 2024",
      type: "IRS Form 990",
      link: "/financial-report/2024-Nyaya-Health-990.pdf",
      pdfFilename: "2024-Nyaya-Health-990.pdf",
      cover: "/financial-report/thumbnails/2024-Nyaya-Health-990.webp",
    },
    {
      title: "Fiscal Year 2023 Audited Financial Statements",
      desc: "",
      date: "August 01, 2022 - July 31, 2023",
      type: "Audited Report",
      link: "/financial-report/Nyaya-Health-Financial-Statements_July-31-2023-1.pdf",
      pdfFilename: "Nyaya-Health-Financial-Statements_July-31-2023-1.pdf",
      cover: "/financial-report/thumbnails/Nyaya-Health-Financial-Statements_July-31-2023-1.webp",
    },
    {
      title: "2023 Form 990: Return of Organization Exempt From Income Tax",
      desc: "",
      date: "Tax Year 2023",
      type: "IRS Form 990",
      link: "/financial-report/2023-Nyaya-990-Filing-1.pdf",
      pdfFilename: "2023-Nyaya-990-Filing-1.pdf",
      cover: "/financial-report/thumbnails/2023-Nyaya-990-Filing-1.webp",
    },
    {
      title: "2022 Form 990: Return of Organization Exempt From Income Tax",
      desc: "",
      date: "Tax Year 2022",
      type: "IRS Form 990",
      link: "/financial-report/2022-Nyaya-Health-Form-990-1.pdf",
      pdfFilename: "2022-Nyaya-Health-Form-990-1.pdf",
      cover: "/financial-report/thumbnails/2022-Nyaya-Health-Form-990-1.webp",
    },
    {
      title: "Fiscal Year 2021 Audited Financial Statements",
      desc: "",
      date: "August 01, 2020 - July 31, 2021",
      type: "Audited Report",
      link: "/financial-report/Nyaya-Health-Financial-Statements_July-31-2021.pdf",
      pdfFilename: "Nyaya-Health-Financial-Statements_July-31-2021.pdf",
      cover: "/financial-report/thumbnails/Nyaya-Health-Financial-Statements_July-31-2021.webp",
    },
    {
      title: "Fiscal Year 2021 Form 990 Tax Return",
      desc: "",
      date: "Tax Year FY 2021",
      type: "IRS Form 990",
      link: "/financial-report/NYAYA-TAX-RETURN-FY21.pdf",
      pdfFilename: "NYAYA-TAX-RETURN-FY21.pdf",
      cover: "/financial-report/thumbnails/NYAYA-TAX-RETURN-FY21.webp",
    },
    {
      title: "Fiscal Year 2020 Audited Financial Statements",
      desc: "",
      date: "August 01, 2019 - July 31, 2020",
      type: "Audited Report",
      link: "/financial-report/2020-Nyaya-Health-Financial-Statements_Final-1.pdf",
      pdfFilename: "2020-Nyaya-Health-Financial-Statements_Final-1.pdf",
      cover: "/financial-report/thumbnails/2020-Nyaya-Health-Financial-Statements_Final-1.webp",
    },
    {
      title: "Fiscal Year 2020 Form 990 Tax Return",
      desc: "",
      date: "Tax Year FY 2020",
      type: "IRS Form 990",
      link: "/financial-report/NYAYA-TAX-RETURN-FY20.pdf",
      pdfFilename: "NYAYA-TAX-RETURN-FY20.pdf",
      cover: "/financial-report/thumbnails/NYAYA-TAX-RETURN-FY20.webp",
    },
    {
      title: "Fiscal Year 2019 Audited Financial Statements",
      desc: "",
      date: "August 01, 2018 - July 31, 2019",
      type: "Audited Report",
      link: "/financial-report/2019-Nyaya-Health-Financial-Statements_Final-Report.pdf",
      pdfFilename: "2019-Nyaya-Health-Financial-Statements_Final-Report.pdf",
      cover: "/financial-report/thumbnails/2019-Nyaya-Health-Financial-Statements_Final-Report.webp",
    },
    {
      title: "Fiscal Year 2019 Form 990 Tax Return",
      desc: "",
      date: "Tax Year FY 2019",
      type: "IRS Form 990",
      link: "/financial-report/NYAYA-TAX-RETURN-FY19.pdf",
      pdfFilename: "NYAYA-TAX-RETURN-FY19.pdf",
      cover: "/financial-report/thumbnails/NYAYA-TAX-RETURN-FY19.webp",
    },
    {
      title: "Fiscal Year 2018 Audited Financial Statements",
      desc: "",
      date: "August 01, 2017 - July 31, 2018",
      type: "Audited Report",
      link: "/financial-report/Possible-Audit-FY18.pdf",
      pdfFilename: "Possible-Audit-FY18.pdf",
      cover: "/financial-report/thumbnails/Possible-Audit-FY18.webp",
    },
    {
      title: "2018 Form 990: Return of Organization Exempt From Income Tax",
      desc: "",
      date: "Tax Year 2018",
      type: "IRS Form 990",
      link: "/financial-report/2018-990.pdf",
      pdfFilename: "2018-990.pdf",
      cover: "/financial-report/thumbnails/2018-990.webp",
    },
    {
      title: "Fiscal Year 2017 Audited Financial Statements",
      desc: "",
      date: "August 01, 2016 - July 31, 2017",
      type: "Audited Report",
      link: "/financial-report/Possible-Audit-FY17-1.pdf",
      pdfFilename: "Possible-Audit-FY17-1.pdf",
      cover: "/financial-report/thumbnails/Possible-Audit-FY17-1.webp",
    },
    {
      title: "Fiscal Year 2017 Form 990 Tax Return",
      desc: "",
      date: "Tax Year FY 2017",
      type: "IRS Form 990",
      link: "/financial-report/Possible-FY-17-990-1.pdf",
      pdfFilename: "Possible-FY-17-990-1.pdf",
      cover: "/financial-report/thumbnails/Possible-FY-17-990-1.webp",
    },
    {
      title: "Fiscal Year 2016 Audited Financial Statements",
      desc: "",
      date: "August 01, 2015 - July 31, 2016",
      type: "Audited Report",
      link: "/financial-report/Possible-Audit-FY16-1-1.pdf",
      pdfFilename: "Possible-Audit-FY16-1-1.pdf",
      cover: "/financial-report/thumbnails/Possible-Audit-FY16-1-1.webp",
    },
    {
      title: "Fiscal Year 2016 Form 990 Tax Return",
      desc: "",
      date: "Tax Year FY 2016",
      type: "IRS Form 990",
      link: "/financial-report/fy2016-NYAYA-FINAL-990-1.pdf",
      pdfFilename: "fy2016-NYAYA-FINAL-990-1.pdf",
      cover: "/financial-report/thumbnails/fy2016-NYAYA-FINAL-990-1.webp",
    },
    {
      title: "Fiscal Year 2015 Audited Financial Statements",
      desc: "",
      date: "August 01, 2014 - July 31, 2015",
      type: "Audited Report",
      link: "/financial-report/Possible-Audit-FY2015-080114-073115-1.pdf",
      pdfFilename: "Possible-Audit-FY2015-080114-073115-1.pdf",
      cover: "/financial-report/thumbnails/Possible-Audit-FY2015-080114-073115-1.webp",
    },
    {
      title: "2015 Form 990: Return of Organization Exempt From Income Tax",
      desc: "",
      date: "Tax Year 2015",
      type: "IRS Form 990",
      link: "/financial-report/2015-NYAYA-FINAL-990-1.pdf",
      pdfFilename: "2015-NYAYA-FINAL-990-1.pdf",
      cover: "/financial-report/thumbnails/2015-NYAYA-FINAL-990-1.webp",
    },
    {
      title: "Fiscal Year 2014 Audited Financial Statements",
      desc: "",
      date: "August 01, 2013 - July 31, 2014",
      type: "Audited Report",
      link: "/financial-report/Possible-FY-2014-Audit-08.01.13-07.31.14-1.pdf",
      pdfFilename: "Possible-FY-2014-Audit-08.01.13-07.31.14-1.pdf",
      cover: "/financial-report/thumbnails/Possible-FY-2014-Audit-08.01.13-07.31.14-1.webp",
    },
    {
      title: "Fiscal Year 2014 Form 990 Tax Return",
      desc: "",
      date: "Tax Year FY 2014",
      type: "IRS Form 990",
      link: "/financial-report/NYAYA-FY-2014-990-Final-1.pdf",
      pdfFilename: "NYAYA-FY-2014-990-Final-1.pdf",
      cover: "/financial-report/thumbnails/NYAYA-FY-2014-990-Final-1.webp",
    },
    {
      title: "Fiscal Year 2013 Audited Financial Statements",
      desc: "",
      date: "August 01, 2012 - July 31, 2013",
      type: "Audited Report",
      link: "/financial-report/Nyaya-Health-Audit-FY-2013-08-01-2012-07-31-2013-1.pdf",
      pdfFilename: "Nyaya-Health-Audit-FY-2013-08-01-2012-07-31-2013-1.pdf",
      cover: "/financial-report/thumbnails/Nyaya-Health-Audit-FY-2013-08-01-2012-07-31-2013-1.webp",
    },
    {
      title: "Fiscal Year 2013 Form 990 Tax Return",
      desc: "",
      date: "Tax Year FY 2013",
      type: "IRS Form 990",
      link: "/financial-report/NYAYA-FY-2013-FORM-990-PUBLIC1-1.pdf",
      pdfFilename: "NYAYA-FY-2013-FORM-990-PUBLIC1-1.pdf",
      cover: "/financial-report/thumbnails/NYAYA-FY-2013-FORM-990-PUBLIC1-1.webp",
    },
    {
      title: "Fiscal Year 2012 Audited Financial Statements",
      desc: "",
      date: "August 01, 2011 - July 31, 2012",
      type: "Audited Report",
      link: "/financial-report/Nyaya-Health-Audit-FY-2012-08012011-07312012-1.pdf",
      pdfFilename: "Nyaya-Health-Audit-FY-2012-08012011-07312012-1.pdf",
      cover: "/financial-report/thumbnails/Nyaya-Health-Audit-FY-2012-08012011-07312012-1.webp",
    },
    {
      title: "2012 Form 990: Return of Organization Exempt From Income Tax",
      desc: "",
      date: "Tax Year 2012",
      type: "IRS Form 990",
      link: "/financial-report/PUBLIC-FINAL-990-2012-1-1.pdf",
      pdfFilename: "PUBLIC-FINAL-990-2012-1-1.pdf",
      cover: "/financial-report/thumbnails/PUBLIC-FINAL-990-2012-1-1.webp",
    },
    {
      title: "2011 Form 990: Return of Organization Exempt From Income Tax",
      desc: "",
      date: "Tax Year 2011",
      type: "IRS Form 990",
      link: "/financial-report/PUBLIC-FINAL-990-2011-1.pdf",
      pdfFilename: "PUBLIC-FINAL-990-2011-1.pdf",
      cover: "/financial-report/thumbnails/PUBLIC-FINAL-990-2011-1.webp",
    },
  ];

  const activeReports = activeTab === "disclosures" ? disclosureReports : financialReports;
  const latestReports = activeReports.slice(0, 2);
  const olderReports = activeReports.slice(2);

  const openReport = (report: any) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleDownload = (e: React.MouseEvent, link: string, filename: string) => {
    e.preventDefault();
    const a = document.createElement("a");
    a.href = link;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Pagination state: 10 items per page for older reports
  const itemsPerPage = 10;
  const totalPages = Math.ceil(olderReports.length / itemsPerPage);
  const paginatedOlderReports = olderReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1">
      {/* Top Navigation: Pink circle back arrow button */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary-pink text-white shadow-sm hover:bg-primary-pink/90 hover:scale-105 transition-all shrink-0 cursor-pointer"
          aria-label="Back to home"
        >
          <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
        </Link>
      </div>

      {/* Tabs Menu Bar */}
      <div className="w-full max-w-4xl mx-auto mb-14 sm:mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full shadow-xs">
          {/* Tab 1: Financial Disclosure */}
          <button
            type="button"
            onClick={() => handleTabChange("disclosures")}
            className={`relative py-4 sm:py-5 px-4 text-center uppercase text-[13px] sm:text-[14px] md:text-[15px] font-bold tracking-wider text-white transition-all cursor-pointer select-none flex items-center justify-center bg-primary-pink ${
              activeTab === "disclosures"
                ? "brightness-100 z-10"
                : "brightness-95 hover:brightness-105 opacity-95 hover:opacity-100"
            }`}
          >
            <span className="leading-snug">Financial Disclosure</span>
            {activeTab === "disclosures" && (
              <span
                className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[12px] border-x-transparent border-t-[10px] sm:border-x-[14px] sm:border-t-[12px] z-20 pointer-events-none"
                style={{ borderTopColor: "#ED2E84" }}
                aria-hidden="true"
              />
            )}
          </button>

          {/* Tab 2: Financial Reports */}
          <button
            type="button"
            onClick={() => handleTabChange("reports")}
            className={`relative py-4 sm:py-5 px-4 text-center uppercase text-[13px] sm:text-[14px] md:text-[15px] font-bold tracking-wider text-white transition-all cursor-pointer select-none flex items-center justify-center bg-accent-purple ${
              activeTab === "reports"
                ? "brightness-100 z-10"
                : "brightness-95 hover:brightness-105 opacity-95 hover:opacity-100"
            }`}
          >
            <span className="leading-snug">Financial Reports</span>
            {activeTab === "reports" && (
              <span
                className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[12px] border-x-transparent border-t-[10px] sm:border-x-[14px] sm:border-t-[12px] z-20 pointer-events-none"
                style={{ borderTopColor: "#782888" }}
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>

      <div className="bg-zinc-100/70 p-8 sm:p-10 rounded-3xl border border-zinc-200/50 animate-in fade-in duration-300 space-y-10">
        
        {/* CONDITIONAL POSSIBLE US HEADING - Only shows in Financial Reports tab in Purple without bold */}
        {activeTab === "reports" && (
          <div className="border-b border-zinc-200/80 pb-4">
            <h2 className="text-3xl sm:text-4xl font-normal text-accent-purple uppercase tracking-widest">
              Possible US
            </h2>
          </div>
        )}

        {/* Latest Reports: Card Layout */}
        <div className="space-y-6">
          <h3 className="text-2xl font-light text-zinc-950 uppercase tracking-wider">
            Latest {activeTab === "reports" ? "Financial Reports" : "Financial Disclosures"}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {latestReports.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row justify-between p-6 bg-white hover:bg-zinc-50 border border-zinc-200/60 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md gap-6"
              >
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4
                      onClick={() => openReport(item)}
                      className="text-[17px] sm:text-[19px] font-semibold text-zinc-950 mb-3 group-hover:text-primary-pink transition-colors cursor-pointer"
                    >
                      {item.title}
                    </h4>
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
                    <a
                      href={item.link}
                      download={item.pdfFilename}
                      onClick={(e) => handleDownload(e, item.link, item.pdfFilename)}
                      className="inline-flex items-center gap-1.5 font-equip text-[13.5px] font-medium text-primary-pink hover:text-primary-pink/80 transition-colors cursor-pointer"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>

                {/* Card Cover Image on the right */}
                <div
                  onClick={() => openReport(item)}
                  className="relative aspect-[3/4] w-full sm:w-36 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-200/60 shrink-0 self-center shadow-md p-1 cursor-pointer group-hover:shadow-lg transition-all"
                  title={`View ${item.title}`}
                >
                  <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 200px"
                    priority={idx === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Older Reports: List Layout */}
        {olderReports.length > 0 && (
          <div className="space-y-6 border-t border-zinc-200/60 pt-10">
            <h3 className="text-2xl font-light text-zinc-950 uppercase tracking-wider">
              Previous {activeTab === "reports" ? "Financial Reports" : "Disclosures"}
            </h3>
            <div className="bg-white border border-zinc-200/60 rounded-2xl overflow-hidden shadow-sm">
              <div className="divide-y divide-zinc-100">
                {paginatedOlderReports.map((item, idx) => (
                  <div key={idx} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-zinc-50/50 transition-colors">
                    <div className="space-y-1 flex-1">
                      <h4
                        onClick={() => openReport(item)}
                        className="text-[16px] font-semibold text-zinc-900 hover:text-primary-pink cursor-pointer transition-colors"
                      >
                        {item.title}
                      </h4>
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
                      <a
                        href={item.link}
                        download={item.pdfFilename}
                        onClick={(e) => handleDownload(e, item.link, item.pdfFilename)}
                        className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary-pink hover:text-primary-pink/80 transition-colors cursor-pointer"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </a>

                      {/* Thumbnail Cover Image on the right of the row */}
                      <div
                        onClick={() => openReport(item)}
                        className="relative aspect-[3/4] w-12 rounded overflow-hidden bg-zinc-50 border border-zinc-200/60 hidden md:block shrink-0 shadow-sm p-0.5 cursor-pointer hover:shadow hover:scale-105 transition-all"
                        title={`View ${item.title}`}
                      >
                        <Image
                          src={item.cover}
                          alt={item.title}
                          fill
                          className="object-contain"
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
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      currentPage === page
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
        category={activeTab === "disclosures" ? "brief" : "financial"}
      />
    </div>
  );
}

export default function FinancialsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-zinc-500 font-light">Loading financials...</div>}>
      <FinancialsContent />
    </Suspense>
  );
}