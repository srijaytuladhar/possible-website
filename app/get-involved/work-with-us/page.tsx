"use client";

import { Layers, ChevronRight, Briefcase } from "lucide-react";
import Link from "next/link";

export default function WorkWithUsPage() {
  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1">
      {/* Page Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-blue/10 px-3.5 py-1 text-[13px] font-medium text-secondary-blue mb-4 uppercase tracking-wider">
          Careers
        </span>
        <h1 className="h1-hero text-zinc-950 mb-3 uppercase tracking-wide">
          Work With Us
        </h1>
        <p className="text-subheading text-body-gray font-light">
          Discover opportunities to collaborate, train, and build innovations to strengthen healthcare delivery.
        </p>
      </div>

      <div className="space-y-16 animate-in fade-in duration-300">
        {/* Available Openings (Prioritized at Top) */}
        <div className="p-8 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-pink/10 text-primary-pink rounded-lg">
              <Briefcase className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-zinc-900">Vacancy / Available Openings</h2>
          </div>
          <p className="text-[14px] text-body-gray font-light max-w-2xl">
            We are always looking for passionate people to join our mission. Explore our open roles and specialized traineeship/apprenticeship pathways below:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
            <button
              onClick={() => alert("There are currently no active job postings. Please check back later or subscribe to our newsletter.")}
              className="flex items-center justify-between px-5 py-4 bg-white border border-zinc-200 hover:border-primary-pink rounded-xl text-[14.5px] text-zinc-800 font-medium hover:text-primary-pink transition-all duration-300 text-left group cursor-pointer shadow-sm"
            >
              <span>View Open Job Postings</span>
              <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-primary-pink transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              href="/get-involved/work-with-us/traineeship-apprenticeship"
              className="flex items-center justify-between px-5 py-4 bg-white border border-zinc-200 hover:border-secondary-blue rounded-xl text-[14.5px] text-zinc-800 font-medium hover:text-secondary-blue transition-all duration-300 text-left group shadow-sm"
            >
              <span>Traineeship & Apprenticeship</span>
              <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-secondary-blue transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Quote Block */}
        <div className="relative py-12 px-8 max-w-4xl mx-auto text-center bg-zinc-50/50 rounded-3xl border border-zinc-100/80 my-8">
          <span className="absolute top-2 left-6 text-7xl font-serif text-primary-pink/20 select-none">“</span>
          <p className="text-[20px] sm:text-[24px] font-light text-zinc-800 leading-relaxed italic relative z-10 px-4">
            If you thrive on creating an impact and want to join our mission to reduce suffering and improve lives by strengthening community care systems, join our team.
          </p>
          <span className="absolute bottom-2 right-6 text-7xl font-serif text-primary-pink/20 select-none">”</span>
        </div>

        {/* How will you thrive section */}
        <div className="space-y-8 pt-6">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-light text-zinc-950 uppercase tracking-wider">
              How will you thrive with us?
            </h3>
            <div className="h-0.5 w-16 bg-primary-pink mx-auto mt-3 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Champion Rigorous and Respectful Results",
              "Engineer Global Impact",
              "Foster Holistic Mentorship",
              "Accelerate Learning Curve"
            ].map((title, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center p-6 bg-gradient-to-br from-[#FF5E97] via-primary-pink to-[#B91257] text-white rounded-2xl h-[130px] text-center shadow-lg shadow-primary-pink/15 hover:shadow-xl hover:shadow-primary-pink/25 hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <span className="text-[15px] sm:text-[16px] font-semibold leading-snug">
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
