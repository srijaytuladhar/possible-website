"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface WWUItem {
  id: number;
  section_type: string;
  title: string;
  subtitle?: string;
  description: string;
  requirements?: string;
}

export default function WorkWithUsPage() {
  const [jobCount, setJobCount] = useState<number>(0);
  const [trainCount, setTrainCount] = useState<number>(0);
  const [valueCards, setValueCards] = useState<WWUItem[]>([]);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/work-with-us')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.items)) {
          const jobs = data.items.filter((i: any) => i.section_type === 'job_posting');
          const trains = data.items.filter((i: any) => i.section_type === 'traineeship');
          const cards = data.items.filter((i: any) => i.section_type === 'value_card');
          setJobCount(jobs.length);
          setTrainCount(trains.length);
          if (cards.length > 0) {
            setValueCards(cards);
          }
        }
      })
      .catch((err) => {
        console.error('Error fetching work with us overview:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 md:py-16 flex flex-col flex-1 bg-white">
      {/* Page Hero Header with Image & Black Shade */}
      <div className="relative w-full rounded-3xl overflow-hidden mb-12 md:mb-16 min-h-[220px] sm:min-h-[260px] md:min-h-[290px] flex items-center justify-center shadow-xs">
        <Image
          src="/Possible_annual planning 2025.jpg"
          alt="Work With Us - Possible"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Black Shade Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 py-10">
          <h1 className="h1-hero text-white uppercase tracking-wide drop-shadow-sm">
            Work With Us
          </h1>
          <div className="h-1 w-16 bg-primary-pink mx-auto mt-4 rounded-full" />
        </div>
      </div>

      <div className="space-y-16 animate-in fade-in duration-300">
        {/* Value Cards Grid (Custom Cards if configured, otherwise default 4 core pillars) */}
        {valueCards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {valueCards.map((card) => (
              <div
                key={card.id}
                className="p-6 sm:p-7 bg-zinc-50 border border-zinc-200/70 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-start space-y-3"
              >
                <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-[14px] text-zinc-600 leading-relaxed font-light">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Card 1: Rigor. Respect. Results. */}
            <div className="p-6 sm:p-7 bg-zinc-50 border border-zinc-200/70 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-start space-y-3">
              <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                Rigor. Respect. Results.
              </h3>
              <p className="text-[14px] text-zinc-600 leading-relaxed font-light">
                We are defined by fierce rigor and deep respect. Our work is evidence-based, effective, and guided by core ethical values.
              </p>
            </div>

            {/* Card 2: Design Global Impact */}
            <div className="p-6 sm:p-7 bg-zinc-50 border border-zinc-200/70 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-start space-y-3">
              <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                Design Global Impact
              </h3>
              <p className="text-[14px] text-zinc-600 leading-relaxed font-light">
                Together, we design projects to reduce suffering at scale.
              </p>
            </div>

            {/* Card 3: Mentorship and Support */}
            <div className="p-6 sm:p-7 bg-zinc-50 border border-zinc-200/70 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-start space-y-3">
              <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                Mentorship and Support
              </h3>
              <p className="text-[14px] text-zinc-600 leading-relaxed font-light">
                Our advisors, deeply familiar with Nepal’s health system and global best practices, provide coaching to support you on your career journey.
              </p>
            </div>

            {/* Card 4: Accelerated Learning Curve */}
            <div className="p-6 sm:p-7 bg-zinc-50 border border-zinc-200/70 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-start space-y-3">
              <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                Accelerated learning curve
              </h3>
              <ol className="space-y-1.5 text-[14px] text-zinc-700 font-light pl-0.5">
                <li className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-900">a.</span>
                  <span>Co-design</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-900">b.</span>
                  <span>Tech-enabled systems</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-900">c.</span>
                  <span>Policy translation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-900">d.</span>
                  <span>Global funding</span>
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Quote Block */}
        <div className="relative py-12 px-8 max-w-4xl mx-auto w-full text-center bg-zinc-50/70 rounded-3xl border border-zinc-100 my-8">
          <span className="absolute top-2 left-6 text-7xl font-serif text-primary-pink/20 select-none">“</span>
          <p className="text-[20px] sm:text-[23px] font-light text-zinc-800 leading-relaxed italic relative z-10 px-4">
            If you thrive on creating an impact and want to join our mission to reduce suffering and improve lives by strengthening community care systems, join our team.
          </p>
          <span className="absolute bottom-2 right-6 text-7xl font-serif text-primary-pink/20 select-none">”</span>
        </div>

        {/* Vacancies & Openings Section */}
        <div id="vacancies" className="scroll-mt-28 p-8 sm:p-12 bg-zinc-50 border border-zinc-200/80 rounded-3xl space-y-8 text-center max-w-4xl mx-auto w-full shadow-xs">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-primary-pink/10 text-primary-pink rounded-2xl w-fit">
              <Briefcase className="h-6 w-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 uppercase tracking-wide">
              Vacancies &amp; Opportunities
            </h2>
            <div className="h-0.5 w-16 bg-primary-pink rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full pt-2">
            <Link
              href="/get-involved/work-with-us/job-postings"
              className="flex items-center justify-between px-6 py-4.5 bg-white border border-zinc-200 hover:border-primary-pink rounded-2xl text-[14.5px] text-zinc-800 font-medium hover:text-primary-pink transition-all duration-300 group shadow-2xs hover:shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span>Vacancies</span>
                {jobCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary-pink/10 text-primary-pink">
                    {jobCount}
                  </span>
                )}
              </div>
              <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-primary-pink transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/get-involved/work-with-us/traineeship-apprenticeship"
              className="flex items-center justify-between px-6 py-4.5 bg-white border border-zinc-200 hover:border-secondary-blue rounded-2xl text-[14.5px] text-zinc-800 font-medium hover:text-secondary-blue transition-all duration-300 group shadow-2xs hover:shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span>Traineeship &amp; Apprenticeship</span>
                {trainCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-secondary-blue/10 text-secondary-blue">
                    {trainCount}
                  </span>
                )}
              </div>
              <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-secondary-blue transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
