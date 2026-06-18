"use client";

import { X, Download, Printer, FileText, CheckCircle2, TrendingUp, Calendar, Tag, ShieldCheck } from "lucide-react";
import { useEffect, useRef } from "react";

interface Report {
  title: string;
  desc: string;
  date: string;
  type: string;
  link: string;
}

interface ReportViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: Report | null;
  category: "impact" | "financial" | "brief" | "paper";
}

export default function ReportViewerModal({ isOpen, onClose, report, category }: ReportViewerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !report) return null;

  // Theme matching based on category
  const theme = {
    impact: {
      color: "text-primary-pink",
      bg: "bg-primary-pink/10",
      border: "border-primary-pink/20",
      accent: "bg-primary-pink",
      label: "Impact Report",
    },
    financial: {
      color: "text-accent-purple",
      bg: "bg-accent-purple/10",
      border: "border-accent-purple/20",
      accent: "bg-accent-purple",
      label: "Financial Report",
    },
    brief: {
      color: "text-secondary-blue",
      bg: "bg-secondary-blue/10",
      border: "border-secondary-blue/20",
      accent: "bg-secondary-blue",
      label: "Research Brief",
    },
    paper: {
      color: "text-accent-purple",
      bg: "bg-accent-purple/10",
      border: "border-accent-purple/20",
      accent: "bg-accent-purple",
      label: "Research Paper",
    },
  }[category];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const content = `
POSSIBLE HEALTH PUBLICATION REPORT
==================================
Category: ${theme.label}
Title: ${report.title}
Published Date: ${report.date}
Format: ${report.type}

DESCRIPTION:
${report.desc}

SUMMARY & KEY FINDINGS:
This document serves as an official summary record for the "${report.title}" compiled by the team at Possible Health. Our collaboration aims to advance clinical innovation and community health worker capacity across Nepal.

KEY OUTCOMES:
- Strengthened public-sector healthcare delivery across partner municipalities.
- Maintained high-quality data-driven electronic medical records (CHIS).
- Verified implementation compliance and training standards.

CONTACT:
For the full unredacted publication, raw datasets, or partnership inquiries, please contact our team at info@possiblehealth.org.
    `;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-zinc-100 overflow-hidden z-10 animate-in zoom-in-95 duration-300"
      >
        {/* Modal Header Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${theme.bg} ${theme.color} border ${theme.border}`}>
              <FileText className="h-3.5 w-3.5" />
              {theme.label}
            </span>
            <span className="hidden sm:inline text-xs text-zinc-400 font-medium">|</span>
            <span className="hidden sm:inline text-xs text-zinc-500 font-semibold uppercase tracking-wider">{report.date} Publication</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              title="Print Report"
            >
              <Printer className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              title="Download TXT Report"
            >
              <Download className="h-4.5 w-4.5" />
            </button>
            <div className="h-6 w-px bg-zinc-200 mx-1" />
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors duration-200 hover:rotate-90"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Report Paper */}
        <div className="flex-1 overflow-y-auto bg-zinc-50/50 p-6 sm:p-10 md:p-12">
          <div className="relative mx-auto max-w-3xl bg-white border border-zinc-200 rounded-2xl shadow-sm p-6 sm:p-10 md:p-12 print:border-none print:shadow-none overflow-hidden">
            {/* Color Accent Bar */}
            <div className={`absolute top-0 left-0 right-0 h-2.5 ${theme.accent}`} />

            {/* Document Title Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 border-b border-zinc-100 pb-8 mb-8">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium uppercase tracking-wider">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Published in {report.date}</span>
                  <span>•</span>
                  <Tag className="h-3.5 w-3.5" />
                  <span>{report.type}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 leading-tight">
                  {report.title}
                </h2>
              </div>
              <div className="shrink-0 flex flex-col items-end">
                <span className="font-bold text-[18px] text-zinc-800 tracking-wider">POSSIBLE</span>
                <span className="text-[10px] text-zinc-400 tracking-widest uppercase -mt-1">Health Nepal</span>
              </div>
            </div>

            {/* Document Content */}
            <div className="space-y-8 text-zinc-800 leading-relaxed font-light text-[15px] sm:text-[16px]">
              
              {/* Executive Summary Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <ShieldCheck className={`h-4 w-4 ${theme.color}`} />
                  Executive Summary
                </h3>
                <p className="text-zinc-700 font-medium leading-relaxed bg-zinc-50 border-l-4 border-zinc-300 p-4 rounded-r-xl">
                  {report.desc}
                </p>
              </div>

              {/* Dynamic Report Content simulation based on category */}
              {category === "financial" ? (
                <>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">1. Revenue & Fund Allocations</h3>
                    <p>
                      The fiscal report outlines detailed fund distributions supporting healthcare models in our partner areas. All figures are audited by independent certified auditors to verify compliance with global standards.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                        <span className="block text-xs text-zinc-400 font-medium uppercase">Direct Care Programs</span>
                        <span className="block text-xl font-bold text-accent-purple mt-1">82.4%</span>
                      </div>
                      <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                        <span className="block text-xs text-zinc-400 font-medium uppercase">Research & Trials</span>
                        <span className="block text-xl font-bold text-accent-purple mt-1">11.6%</span>
                      </div>
                      <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                        <span className="block text-xs text-zinc-400 font-medium uppercase">Operations & Admin</span>
                        <span className="block text-xl font-bold text-accent-purple mt-1">6.0%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">2. Compliance & Transparency</h3>
                    <p>
                      Possible maintains a strong commitment to transparency. Our whistleblower policies ensure secure reporting channels, and conflict of interest standards apply to all staff and advisory board members.
                    </p>
                  </div>
                </>
              ) : category === "brief" ? (
                <>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">1. Context & Policy Need</h3>
                    <p>
                      This research brief bridges the gap between academic clinical trials and real-world health service integration. It translates empirical evidence into actionable policy guidelines for regional and federal healthcare systems in Nepal.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">2. Key Actionable Recommendations</h3>
                    <ul className="space-y-2 list-none pl-0">
                      {[
                        "Standardize training programs for Community Health Workers (CHW).",
                        "Integrate digital monitoring tools (CHIS) with local health post workflows.",
                        "Establish continuous supervision channels to maintain service quality."
                      ].map((item, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start">
                          <CheckCircle2 className="h-5 w-5 text-secondary-blue shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : category === "paper" ? (
                <>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">1. Abstract & Clinical Design</h3>
                    <p>
                      Our research publications evaluate peer-reviewed studies conducted in rural Nepal. Using cluster-randomized trial designs, we evaluate the outcomes of full-time, supervised community health workers on maternal and non-communicable disease care.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">2. Outcomes & Impact Metrics</h3>
                    <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-accent-purple" />
                        <span className="font-medium">Peer-Reviewed Scientific Integrity</span>
                      </div>
                      <span className="text-xs px-2.5 py-1 bg-white border border-zinc-200 rounded text-zinc-600 font-mono">NEPAL HEALTH TRIALS</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Default / Impact Report */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">1. Program Performance & Milestones</h3>
                    <p>
                      During the reporting period, our healthcare delivery models achieved unprecedented metrics across Kathmandu, Achham, and partner municipalities. Dynamic monitoring protocols were deployed to track intervention outcomes.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                        <span className="block text-xs text-zinc-400 font-medium uppercase">Total Patient Encounters</span>
                        <span className="block text-2xl font-bold text-primary-pink mt-1">14,250+</span>
                      </div>
                      <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                        <span className="block text-xs text-zinc-400 font-medium uppercase">Community Care Adherence</span>
                        <span className="block text-2xl font-bold text-primary-pink mt-1">94.8%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">2. Research-Backed Scaling</h3>
                    <p>
                      By partnering with local municipal governments, we co-design and scale care programs. This ensures our operational findings translate directly into long-term infrastructure improvements.
                    </p>
                  </div>
                </>
              )}

              {/* Signature Footer */}
              <div className="border-t border-zinc-100 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-zinc-400 font-medium">
                <div>
                  <p className="font-semibold text-zinc-600 uppercase">Dr. Srijay Tuladhar</p>
                  <p>Clinical Innovations & Strategy Board</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-semibold text-zinc-600 uppercase">POSSIBLE HEALTH NEPAL</p>
                  <p>Official Digital Record Certificate</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
          >
            Close Viewer
          </button>
          <button
            onClick={handleDownload}
            className={`px-5 py-2 rounded-xl text-sm font-semibold text-white ${theme.accent} hover:opacity-90 shadow-md transition-all`}
          >
            Download Document
          </button>
        </div>
      </div>
    </div>
  );
}
