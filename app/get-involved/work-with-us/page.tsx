"use client";

import { ChevronRight, Briefcase, CheckCircle2, ArrowRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// HERO BACKGROUND IMAGE SLOT:
// Replace with the real photo from the client drive folder once file is provided
const WORK_WITH_US_HERO_IMAGE = "/Possible-Team.jpg";

export default function WorkWithUsPage() {
  const learningCurvePoints = [
    { label: "Policy translation", text: "Move research into national public health policy." },
    { label: "Tech-enabled systems", text: "Use data and technology for decision-making in low-resource settings." },
    { label: "Global funding", text: "Secure grants from major donors, including NIH." },
    { label: "Co-design", text: "Co-create solutions with communities and governments." },
  ];

  const scrollToVacancies = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("vacancies");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. Hero Section with Background Image & Dark Overlay matching Homepage */}
      <section className="relative w-full overflow-hidden select-none bg-zinc-950 flex items-center min-h-[460px] md:min-h-[520px] px-6 sm:px-8 py-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={WORK_WITH_US_HERO_IMAGE}
            alt="Possible Team Collaborating in Nepal"
            fill
            className="object-cover object-center opacity-75 brightness-[0.9]"
            sizes="100vw"
            priority
          />
          {/* Soft dark overlay matching homepage hero */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 mx-auto max-w-7xl w-full">
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-pink/20 border border-primary-pink/30 px-4 py-1 text-[13px] font-semibold text-primary-pink uppercase tracking-wider">
              Careers & Opportunities
            </span>

            <h1 className="h1-hero text-white font-extralight leading-tight uppercase tracking-wide">
              Work <span className="font-semibold text-primary-pink">With Us</span>
            </h1>

            <p className="text-subheading text-zinc-200 font-light max-w-2xl leading-relaxed">
              Discover opportunities to collaborate, train, and build science-backed innovations to strengthen healthcare delivery where it is needed most.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              {/* Pink CTA Button: Contact Us */}
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full bg-primary-pink px-8 py-4 font-equip font-semibold text-[15px] text-white shadow-lg shadow-primary-pink/30 hover:bg-primary-pink/90 hover:shadow-primary-pink/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
              >
                <span>Contact Us</span>
                <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Vacancies In-Page Anchor Button */}
              <a
                href="#vacancies"
                onClick={scrollToVacancies}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 px-8 py-4 font-equip font-semibold text-[15px] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Vacancies</span>
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Body Content */}
      <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-16 flex flex-col flex-1 space-y-16">
        {/* "How will you thrive with us" */}
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

        {/* Quote Block */}
        <div className="relative py-12 px-8 max-w-4xl mx-auto text-center bg-zinc-50/70 rounded-3xl border border-zinc-100 my-8">
          <span className="absolute top-2 left-6 text-7xl font-serif text-primary-pink/20 select-none">“</span>
          <p className="text-[20px] sm:text-[23px] font-light text-zinc-800 leading-relaxed italic relative z-10 px-4">
            If you thrive on creating an impact and want to join our mission to reduce suffering and improve lives by strengthening community care systems, join our team.
          </p>
          <span className="absolute bottom-2 right-6 text-7xl font-serif text-primary-pink/20 select-none">”</span>
        </div>

        {/* 3. Vacancies List Section (In-Page Anchor Target: #vacancies) */}
        <div id="vacancies" className="scroll-mt-28 p-8 sm:p-12 bg-zinc-50 border border-zinc-200/80 rounded-3xl space-y-8 text-center max-w-4xl mx-auto w-full shadow-xs">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-primary-pink/10 text-primary-pink rounded-2xl w-fit">
              <Briefcase className="h-6 w-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 uppercase tracking-wide">
              Vacancies & Openings
            </h2>
            <div className="h-0.5 w-16 bg-primary-pink rounded-full mx-auto" />
          </div>

          <p className="text-[15px] text-body-gray font-light max-w-2xl mx-auto leading-relaxed">
            We are continuously looking for talented researchers, health practitioners, and operations experts. Explore our active postings and training pathways below:
          </p>

          {/* Current Postings Status Banner */}
          <div className="p-6 bg-white border border-zinc-200/80 rounded-2xl text-center space-y-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-semibold bg-zinc-100 text-zinc-600 uppercase tracking-wider">
              Current Status
            </span>
            <p className="text-[16px] font-medium text-zinc-700">
              There are currently no active public vacancies open for applications.
            </p>
            <p className="text-[13px] text-zinc-500 font-light">
              Interested in future positions or academic collaborations? You can share your CV with us at{" "}
              <a href="mailto:research@possiblehealth.org" className="text-primary-pink font-medium hover:underline">
                research@possiblehealth.org
              </a>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full pt-2">
            <Link
              href="/get-involved/work-with-us/job-postings"
              className="flex items-center justify-between px-6 py-4.5 bg-white border border-zinc-200 hover:border-primary-pink rounded-2xl text-[14.5px] text-zinc-800 font-medium hover:text-primary-pink transition-all duration-300 group shadow-2xs hover:shadow-sm"
            >
              <span>Vacancies</span>
              <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-primary-pink transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/get-involved/work-with-us/traineeship-apprenticeship"
              className="flex items-center justify-between px-6 py-4.5 bg-white border border-zinc-200 hover:border-secondary-blue rounded-2xl text-[14.5px] text-zinc-800 font-medium hover:text-secondary-blue transition-all duration-300 group shadow-2xs hover:shadow-sm"
            >
              <span>Traineeship & Apprenticeship Opportunities</span>
              <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-secondary-blue transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
