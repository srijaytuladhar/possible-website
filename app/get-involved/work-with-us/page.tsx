"use client";

import { ChevronRight, Briefcase, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WorkWithUsPage() {
  const learningCurvePoints = [
    { label: "Policy translation", text: "Move research into national public health policy." },
    { label: "Tech-enabled systems", text: "Use data and technology for decision-making in low-resource settings." },
    { label: "Global funding", text: "Secure grants from major donors, including NIH." },
    { label: "Co-design", text: "Co-create solutions with communities and governments." },
  ];

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1">
      {/* Page Header without removed subtitle per PDF Page 8 */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="h1-hero text-zinc-950 uppercase tracking-wide">
          Work With Us
        </h1>
      </div>

      <div className="space-y-16 animate-in fade-in duration-300">
        {/* "How will you thrive with us" Brought to top in attractive box per PDF Page 7 */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-light text-zinc-950 uppercase tracking-wider">
              How will you thrive with us?
            </h2>
            <div className="h-0.5 w-16 bg-primary-pink mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Card 1: Rigor. Respect. Results. */}
            <div className="p-7 bg-zinc-50 border border-zinc-200/70 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-start space-y-3">
              <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                Rigor. Respect. Results.
              </h3>
              <p className="text-[14.5px] text-zinc-600 leading-relaxed font-light">
                We are defined by fierce rigor and deep respect. Our work is evidence-based, effective, and guided by core ethical values.
              </p>
            </div>

            {/* Card 2: Design Global Impact */}
            <div className="p-7 bg-zinc-50 border border-zinc-200/70 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-start space-y-3">
              <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                Design Global Impact
              </h3>
              <p className="text-[14.5px] text-zinc-600 leading-relaxed font-light">
                Together, we design projects to reduce suffering at scale.
              </p>
            </div>

            {/* Card 3: Mentorship and Support */}
            <div className="p-7 bg-zinc-50 border border-zinc-200/70 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-start space-y-3 md:col-span-2 lg:col-span-1">
              <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                Mentorship and Support
              </h3>
              <p className="text-[14.5px] text-zinc-600 leading-relaxed font-light">
                Our advisors, deeply familiar with Nepal’s health system and global best practices, provide coaching to support you on your career journey.
              </p>
            </div>

            {/* Card 4: Accelerated Learning Curve spanning full width */}
            <div className="p-7 sm:p-8 bg-zinc-50 border border-zinc-200/70 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 md:col-span-2 lg:col-span-3 space-y-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight mb-2">
                  Accelerated Learning Curve
                </h3>
                <p className="text-[15px] text-zinc-600 leading-relaxed font-light">
                  We support our staff to develop expertise across:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {learningCurvePoints.map((item, idx) => (
                  <div key={idx} className="p-4 bg-white border border-zinc-200/80 rounded-xl shadow-2xs flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary-pink shrink-0 mt-0.5" />
                    <p className="text-[14px] text-zinc-700 leading-relaxed">
                      <strong className="font-semibold text-zinc-900">{item.label}:</strong> {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team Banner Image */}
        <div className="w-full flex justify-center my-4">
          <Image
            src="/Possible-Team.jpg"
            alt="Possible Team"
            width={1200}
            height={800}
            className="w-full h-auto rounded-3xl shadow-sm border border-zinc-200/50"
            priority
          />
        </div>

        {/* Quote Block */}
        <div className="relative py-12 px-8 max-w-4xl mx-auto text-center bg-zinc-50/50 rounded-3xl border border-zinc-100/80 my-8">
          <span className="absolute top-2 left-6 text-7xl font-serif text-primary-pink/20 select-none">“</span>
          <p className="text-[20px] sm:text-[24px] font-light text-zinc-800 leading-relaxed italic relative z-10 px-4">
            If you thrive on creating an impact and want to join our mission to reduce suffering and improve lives by strengthening community care systems, join our team.
          </p>
          <span className="absolute bottom-2 right-6 text-7xl font-serif text-primary-pink/20 select-none">”</span>
        </div>

        {/* Available Openings */}
        <div className="p-8 sm:p-10 bg-zinc-50 border border-zinc-200/80 rounded-3xl space-y-6 text-center max-w-4xl mx-auto w-full shadow-xs">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-primary-pink/10 text-primary-pink rounded-2xl w-fit shadow-xs">
              <Briefcase className="h-6 w-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900">Vacancy / Available Openings</h2>
          </div>
          <p className="text-[14.5px] text-body-gray font-light max-w-2xl mx-auto leading-relaxed">
            We are always looking for passionate people to join our mission. Explore our open roles and specialized traineeship/apprenticeship pathways below:
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto w-full pt-2">
            <Link
              href="/get-involved/work-with-us/job-postings"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white hover:border-primary-pink hover:bg-primary-pink text-zinc-800 hover:text-white px-7 py-3.5 text-[14.5px] font-medium transition-all duration-300 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 group w-full sm:w-auto"
            >
              <span>View Open Job Postings</span>
              <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-white transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/get-involved/work-with-us/traineeship-apprenticeship"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white hover:border-primary-pink hover:bg-primary-pink text-zinc-800 hover:text-white px-7 py-3.5 text-[14.5px] font-medium transition-all duration-300 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 group w-full sm:w-auto"
            >
              <span>Traineeship & Apprenticeship</span>
              <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-white transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
