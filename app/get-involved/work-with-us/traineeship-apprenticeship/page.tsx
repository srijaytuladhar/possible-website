"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Award, CheckCircle } from "lucide-react";

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
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-blue/10 px-3.5 py-1 text-[13px] font-medium text-secondary-blue uppercase tracking-wider">
          Professional Training
        </span>
        <h1 className="h1-hero text-zinc-950 uppercase tracking-wide">
          Traineeship & Apprenticeship Opportunities
        </h1>
        <p className="text-subheading text-body-gray font-light max-w-2xl">
          Develop deep capability in clinical research, digital health infrastructure, and evidence translation under the guidance of lead global health investigators.
        </p>
      </div>

      {/* Program Details Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl space-y-3">
          <BookOpen className="h-6 w-6 text-primary-pink" />
          <h4 className="text-[16px] font-semibold text-zinc-900">Hands-on Experience</h4>
          <p className="text-[13px] text-body-gray font-light leading-relaxed">
            Contribute directly to ongoing randomized trials and digitizing community care registries.
          </p>
        </div>

        <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl space-y-3">
          <Clock className="h-6 w-6 text-secondary-blue" />
          <h4 className="text-[16px] font-semibold text-zinc-900">12-Month Postings</h4>
          <p className="text-[13px] text-body-gray font-light leading-relaxed">
            Full-time structured immersion programs with real operational responsibilities and clinical alignment.
          </p>
        </div>

        <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl space-y-3">
          <Award className="h-6 w-6 text-accent-purple" />
          <h4 className="text-[16px] font-semibold text-zinc-900">Direct Mentorship</h4>
          <p className="text-[13px] text-body-gray font-light leading-relaxed">
            Receive individual guidance from senior investigators and technical experts in public health informatics.
          </p>
        </div>
      </div>

      {/* Program Tracks */}
      <div className="space-y-6">
        <h3 className="text-2xl font-light text-zinc-950 uppercase tracking-wide">Available Specialization Tracks</h3>
        
        <div className="divide-y divide-zinc-100 border-y border-zinc-100">
          <div className="py-6 flex flex-col md:flex-row gap-4 justify-between">
            <div className="space-y-2 md:max-w-xl">
              <h4 className="text-[16px] font-semibold text-zinc-900">Clinical Research Operations</h4>
              <p className="text-[14px] text-body-gray font-light leading-relaxed">
                Learn randomized trial management, ethical review submissions, field monitoring, and data quality check protocols.
              </p>
            </div>
            <span className="text-[13px] text-zinc-400 font-medium self-start md:self-center">2 Openings (Fall 2026)</span>
          </div>

          <div className="py-6 flex flex-col md:flex-row gap-4 justify-between">
            <div className="space-y-2 md:max-w-xl">
              <h4 className="text-[16px] font-semibold text-zinc-900">Digital Health Systems & CHIS</h4>
              <p className="text-[14px] text-body-gray font-light leading-relaxed">
                Work alongside engineering leads maintaining municipal EHR platforms, data pipelines, and field tablet syncing APIs.
              </p>
            </div>
            <span className="text-[13px] text-zinc-400 font-medium self-start md:self-center">1 Opening (Fall 2026)</span>
          </div>

          <div className="py-6 flex flex-col md:flex-row gap-4 justify-between">
            <div className="space-y-2 md:max-w-xl">
              <h4 className="text-[16px] font-semibold text-zinc-900">Health Policy Translation</h4>
              <p className="text-[14px] text-body-gray font-light leading-relaxed">
                Translate trial datasets into public policy drafts, co-design guidelines with municipal partners, and support advocacy.
              </p>
            </div>
            <span className="text-[13px] text-zinc-400 font-medium self-start md:self-center">1 Opening (Fall 2026)</span>
          </div>
        </div>
      </div>

      {/* Program Compensation & Logistics */}
      <div className="p-8 bg-zinc-900 text-white rounded-3xl space-y-6">
        <h4 className="text-xl font-light uppercase tracking-wider text-secondary-blue">Logistics & Stipend Information</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[14px]">
          <div className="space-y-2">
            <h5 className="font-semibold text-white">Stipend & Travel Support</h5>
            <p className="text-zinc-400 font-light leading-relaxed">
              All trainees receive a monthly living allowance and covered transportation costs to field implementation sites in regional Nepal.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-semibold text-white">Eligibility Criteria</h5>
            <p className="text-zinc-400 font-light leading-relaxed">
              Applicants must hold a Bachelor’s degree in Public Health, Computer Science, Statistics, Social Science, or relevant clinical field.
            </p>
          </div>
        </div>
      </div>

      {/* How to Apply */}
      <div className="p-8 border border-zinc-200 rounded-3xl bg-zinc-50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-zinc-900">Interested in applying?</h4>
          <p className="text-[14px] text-body-gray font-light leading-relaxed">
            Applications for the Fall 2026 cohort will officially open on September 1, 2026.
          </p>
        </div>
        <button
          onClick={() => alert("Applications will open on September 1, 2026. Please check back then.")}
          className="inline-flex items-center gap-2 rounded-full bg-primary-pink px-6 py-3 font-equip font-semibold text-[14px] text-white shadow-lg shadow-primary-pink/20 hover:bg-primary-pink/90 hover:shadow-primary-pink/30 hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          <span>Get Email Reminder</span>
        </button>
      </div>
    </div>
  );
}
