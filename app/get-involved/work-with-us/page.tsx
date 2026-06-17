"use client";

import { Layers, HelpCircle, ChevronRight } from "lucide-react";

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

      <div className="space-y-12 animate-in fade-in duration-300">
        {/* Career Block Philosophy */}
        <div className="p-8 bg-zinc-900 text-white rounded-2xl border border-zinc-800">
          <div className="max-w-2xl space-y-4">
            <span className="text-[13px] font-bold text-secondary-blue uppercase tracking-widest">Our DNA</span>
            <h3 className="h2-section text-white font-extralight uppercase tracking-wide">
              Rigor. Respect. Results.
            </h3>
            <p className="text-[15px] text-zinc-400 font-light leading-relaxed">
              We are defined by fierce rigor and deep respect. We build sustainable, science-backed solutions that prioritize regional context and localized expertise to generate real results.
            </p>
          </div>
        </div>

        {/* Competencies Grid */}
        <div className="space-y-6">
          <h3 className="h3-card text-zinc-950 font-semibold flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary-pink" />
            <span>Accelerated Learning Curve</span>
          </h3>
          <p className="text-[14px] text-body-gray font-light max-w-2xl">
            Our organization empowers personnel with deep operational, clinical, and strategic capabilities across key core competencies:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                title: "Policy Translation",
                desc: "Bridging academic implementation data and policy drafts for governmental entities.",
              },
              {
                title: "Tech-Enabled Systems",
                desc: "Deploying and managing data-driven workflows using our custom CHIS platforms.",
              },
              {
                title: "Global Funding",
                desc: "Navigating international grant compliance and cultivating donor networks.",
              },
              {
                title: "Co-Design",
                desc: "Engaging in participatory development directly with local leaders and NGOs.",
              },
            ].map((comp, idx) => (
              <div key={idx} className="p-5 border border-zinc-100 bg-zinc-50 rounded-xl hover:border-primary-pink/35 transition-colors duration-300">
                <h4 className="text-[14px] font-semibold text-zinc-900 mb-2 uppercase tracking-wide">{comp.title}</h4>
                <p className="text-[13px] text-body-gray font-light leading-relaxed">{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trainee Program & Posting Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-4">
          {/* Program Policy */}
          <div className="p-6 border border-zinc-200/80 rounded-2xl flex flex-col justify-between bg-white">
            <div className="space-y-4">
              <div className="p-2 bg-zinc-100 text-zinc-700 rounded-lg w-fit">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h4 className="text-[16px] font-semibold text-zinc-900">Volunteer & Trainee Policy</h4>
              <p className="text-[14px] text-body-gray font-light leading-relaxed">
                We do not accept volunteers. To ensure reciprocal value, we offer limited trainee programs for up to one-year postings, providing a small stipend and direct mentorship support from our lead investigators.
              </p>
            </div>
          </div>

          {/* Action Links */}
          <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl flex flex-col justify-center space-y-4">
            <h4 className="text-[16px] font-semibold text-zinc-900 mb-2">Available Openings</h4>
            <div className="space-y-3">
              <button
                onClick={() => alert("There are currently no active job postings. Please check back later or subscribe to our newsletter.")}
                className="w-full flex items-center justify-between px-5 py-3.5 bg-white border border-zinc-200 hover:border-primary-pink rounded-xl text-[14px] text-zinc-800 font-medium hover:text-primary-pink transition-all duration-300 text-left group cursor-pointer"
              >
                <span>View Open Job Postings</span>
                <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-primary-pink transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => alert("Trainee applications are currently closed. Next cohort opens in Fall 2026.")}
                className="w-full flex items-center justify-between px-5 py-3.5 bg-white border border-zinc-200 hover:border-secondary-blue rounded-xl text-[14px] text-zinc-800 font-medium hover:text-secondary-blue transition-all duration-300 text-left group cursor-pointer"
              >
                <span>View Trainee Applications</span>
                <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-secondary-blue transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
