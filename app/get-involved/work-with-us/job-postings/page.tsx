"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, Calendar, ArrowRight } from "lucide-react";

interface JobPosting {
  id: number;
  title: string;
  subtitle?: string;
  department?: string;
  location?: string;
  employment_type?: string;
  description: string;
  requirements?: string;
  link_url?: string;
  deadline?: string;
}

export default function JobPostingsPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/work-with-us?section_type=job_posting')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.items)) {
          setJobs(data.items);
        }
      })
      .catch((err) => {
        console.error('Error fetching job postings:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-4xl w-full px-6 sm:px-8 py-16 flex flex-col flex-1 space-y-12 animate-in fade-in duration-300">
      {/* Back Link */}
      <Link
        href="/get-involved/work-with-us"
        className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary-pink text-white shadow-sm hover:bg-primary-pink/90 hover:scale-105 transition-all shrink-0 cursor-pointer"
        aria-label="Back to Careers"
      >
        <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
      </Link>

      {/* Page Header */}
      <div className="space-y-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-pink/10 px-3.5 py-1 text-[13px] font-medium text-primary-pink uppercase tracking-wider">
          Job Openings
        </span>
        <h1 className="h1-hero text-zinc-950 uppercase tracking-wide">
          Open Job Postings
        </h1>
      </div>

      {/* Vacancies List or Fallback Block */}
      {!loading && jobs.length > 0 ? (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-8 bg-zinc-50/80 border border-zinc-200/80 rounded-3xl space-y-5 hover:border-zinc-300 transition-all duration-300 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
                    {{ job }.job.title}
                  </h2>
                  {job.subtitle && (
                    <p className="text-[14.5px] text-zinc-600 mt-1 font-light">
                      {{ job }.job.subtitle}
                    </p>
                  )}
                </div>
                {job.employment_type && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-pink/10 text-primary-pink self-start sm:self-center shrink-0">
                    {{ job }.job.employment_type}
                  </span>
                )}
              </div>

              {/* Meta Pills */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-500 font-light">
                {job.department && (
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-zinc-400" />
                    <span>{{ job }.job.department}</span>
                  </div>
                )}
                {job.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-zinc-400" />
                    <span>{{ job }.job.location}</span>
                  </div>
                )}
                {job.deadline && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                    <span>Deadline: {{ job }.job.deadline}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="text-[15px] text-zinc-700 leading-relaxed font-light whitespace-pre-line border-t border-zinc-200/60 pt-4">
                {{ job }.job.description}
              </div>

              {/* Requirements */}
              {job.requirements && (
                <div className="p-4 bg-white rounded-2xl border border-zinc-200/70 text-xs sm:text-sm text-zinc-600 space-y-1">
                  <span className="font-semibold text-zinc-900 block">Requirements:</span>
                  <p className="whitespace-pre-line leading-relaxed font-light">{{ job }.job.requirements}</p>
                </div>
              )}

              {/* Action Button */}
              {job.link_url && (
                <div className="pt-2">
                  <a
                    href={job.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-pink text-white text-sm font-semibold hover:bg-primary-pink/90 hover:shadow-md transition-all group"
                  >
                    <span>Apply for this position</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 bg-zinc-50 border border-zinc-200/60 rounded-3xl text-center space-y-3">
          <p className="text-[20px] font-medium text-zinc-500">
            No any vacancy
          </p>
        </div>
      )}
    </div>
  );
}
