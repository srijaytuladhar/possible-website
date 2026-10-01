"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Download, Eye, ArrowLeft } from "lucide-react";
import ReportViewerModal from "@/components/ReportViewerModal";

export default function ImpactReportsPage() {
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reports = [
    {
      title: "2025 Annual Impact Report",
      desc: "",
      date: "August 01, 2024 - July 31, 2025",
      type: "PDF Report",
      link: "/annual-impact-report/Possible_AIR-2025.pdf",
      pdfFilename: "Possible_AIR-2025.pdf",
      cover: "/annual-impact-report/thumbnails/Possible_AIR-2025.webp",
    },
    {
      title: "2024 Annual Impact Report",
      desc: "",
      date: "August 01, 2023 - July 31, 2024",
      type: "PDF Report",
      link: "/annual-impact-report/AIR-2024.pdf",
      pdfFilename: "AIR-2024.pdf",
      cover: "/annual-impact-report/thumbnails/AIR-2024.webp",
    },
    {
      title: "2023 Annual Impact Report",
      desc: "",
      date: "August 01, 2022 - July 31, 2023",
      type: "PDF Report",
      link: "/annual-impact-report/AIR-2023.pdf",
      pdfFilename: "AIR-2023.pdf",
      cover: "/annual-impact-report/thumbnails/AIR-2023.webp",
    },
    {
      title: "2022 Annual Impact Report",
      desc: "",
      date: "August 01, 2021 - July 31, 2022",
      type: "PDF Report",
      link: "/annual-impact-report/AIR-2022.pdf",
      pdfFilename: "AIR-2022.pdf",
      cover: "/annual-impact-report/thumbnails/AIR-2022.webp",
    },
    {
      title: "2021 Annual Impact Report",
      desc: "",
      date: "August 01, 2020 - July 31, 2021",
      type: "PDF Report",
      link: "/annual-impact-report/2021-Annual-Impact-Report.pdf",
      pdfFilename: "2021-Annual-Impact-Report.pdf",
      cover: "/annual-impact-report/thumbnails/2021-Annual-Impact-Report.webp",
    },
    {
      title: "2018 Annual Impact Report",
      desc: "",
      date: "Fiscal Year 2017 - 2018",
      type: "PDF Report",
      link: "/annual-impact-report/AIR-FY18-1.pdf",
      pdfFilename: "AIR-FY18-1.pdf",
      cover: "/annual-impact-report/thumbnails/AIR-FY18-1.webp",
    },
    {
      title: "2017 Annual Impact Report",
      desc: "",
      date: "August 01, 2016 - July 31, 2017",
      type: "PDF Report",
      link: "/annual-impact-report/AIR_2017-1.pdf",
      pdfFilename: "AIR_2017-1.pdf",
      cover: "/annual-impact-report/thumbnails/AIR_2017-1.webp",
    },
    {
      title: "2016 Annual Impact Report",
      desc: "",
      date: "August 01, 2015 - July 31, 2016",
      type: "PDF Report",
      link: "/annual-impact-report/Possible-2016-Annual-Impact-Report.pdf",
      pdfFilename: "Possible-2016-Annual-Impact-Report.pdf",
      cover: "/annual-impact-report/thumbnails/Possible-2016-Annual-Impact-Report.webp",
    },
    {
      title: "2015 Annual Impact Report",
      desc: "",
      date: "August 01, 2014 - July 31, 2015",
      type: "PDF Report",
      link: "/annual-impact-report/2015_Possible_Annual-Impact-Report.pdf",
      pdfFilename: "2015_Possible_Annual-Impact-Report.pdf",
      cover: "/annual-impact-report/thumbnails/2015_Possible_Annual-Impact-Report.webp",
    },
    {
      title: "2014 Annual Impact Report",
      desc: "",
      date: "August 01, 2013 - July 31, 2014",
      type: "PDF Report",
      link: "/annual-impact-report/Possible_Annual-Impact-Report-1.pdf",
      pdfFilename: "Possible_Annual-Impact-Report-1.pdf",
      cover: "/annual-impact-report/thumbnails/Possible_Annual-Impact-Report-1.webp",
    },
    {
      title: "2013 Annual Report",
      desc: "",
      date: "August 01, 2012 - July 31, 2013",
      type: "PDF Report",
      link: "/annual-impact-report/Nyaya-Health-2013-Annual-Report-1.pdf",
      pdfFilename: "Nyaya-Health-2013-Annual-Report-1.pdf",
      cover: "/annual-impact-report/thumbnails/Nyaya-Health-2013-Annual-Report-1.webp",
    },
    {
      title: "2011 Annual Report",
      desc: "",
      date: "August 01, 2010 - July 31, 2011",
      type: "PDF Report",
      link: "/annual-impact-report/Nyaya-Health-2011-Annual-Report-1.pdf",
      pdfFilename: "Nyaya-Health-2011-Annual-Report-1.pdf",
      cover: "/annual-impact-report/thumbnails/Nyaya-Health-2011-Annual-Report-1.webp",
    },
  ];

  const latestReports = reports.slice(0, 2);
  const olderReports = reports.slice(2);

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

  // Pagination state: 5 items per page for older reports
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(olderReports.length / itemsPerPage);
  const paginatedOlderReports = olderReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1">
      {/* Top Navigation: Pink circle back arrow button per PDF Page 7 */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary-pink text-white shadow-sm hover:bg-primary-pink/90 hover:scale-105 transition-all shrink-0 cursor-pointer"
          aria-label="Back to home"
        >
          <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
        </Link>
      </div>

      {/* Page Header without subtitle per PDF Page 7 */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="h1-hero text-primary-pink mb-3 uppercase tracking-wide">
          Impact Reports
        </h1>
      </div>

      <div className="bg-zinc-100/70 p-8 sm:p-10 rounded-3xl border border-zinc-200/50 animate-in fade-in duration-300 space-y-16">
        {/* Latest Reports: Card Layout */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light text-zinc-950 uppercase tracking-wider">LATEST</h2>
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
                      <span>View Report</span>
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
            <h2 className="text-2xl font-light text-zinc-950 uppercase tracking-wider">PREVIOUS</h2>
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
        category="impact"
      />
    </div>
  );
}
