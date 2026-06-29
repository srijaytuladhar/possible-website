"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TraineeshipApprenticeshipPage() {
  return (
    <div className="mx-auto max-w-4xl w-full px-6 sm:px-8 py-16 flex flex-col flex-1 space-y-12 animate-in fade-in duration-300">
      {/* Back Link */}
      <Link
        href="/get-involved/work-with-us"
        className="inline-flex items-center gap-2 text-[14px] text-body-gray hover:text-primary-pink transition-colors w-fit group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Careers
      </Link>

      {/* Page Header */}
      <div className="space-y-4">
        <span hidden className="inline-flex items-center gap-1.5 rounded-full bg-secondary-blue/10 px-3.5 py-1 text-[13px] font-medium text-secondary-blue uppercase tracking-wider">
          Professional Training
        </span>
        <h1 className="h1-hero text-zinc-950 uppercase tracking-wide">
          Traineeship & Apprenticeship Opportunities
        </h1>
      </div>

      {/* Vacancy Announcement Block */}
      <div className="p-12 bg-zinc-50 border border-zinc-200/60 rounded-3xl text-center space-y-3">
        <p className="text-[20px] font-medium text-zinc-500">
          No any vacancy
        </p>
      </div>
    </div>
  );
}
