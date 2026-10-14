"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HandHeart, Users, Lightbulb } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import InteractivePresenceMap from "@/components/InteractivePresenceMap";

const PROCESS_SECTION_IMAGE = "/Codesign2.jpeg";
const HIMALAYA_SECTION_IMAGE = "/Mother_updated.png";
const TEAM_SECTION_IMAGE = "/woweare.jpg";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* SECTION 1 — Hero */}
      <HeroSlider />

      {/* SECTION 2 — Sub-Hero */}
      <section hidden className="relative py-16 sm:py-20 px-6 sm:px-8 bg-zinc-50 border-b border-zinc-100 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-radial from-secondary-blue/10 to-transparent blur-3xl -z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.2] -z-20 pointer-events-none" />

        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h2 className="h2-section text-zinc-950 uppercase tracking-wide leading-tight">
            &ldquo;Too complex to solve&rdquo; is where we start.
          </h2>
          <p className="text-zinc-800 leading-relaxed font-light text-[18px] sm:text-[21px] md:text-[23px] max-w-3xl mx-auto">
            We innovate, test, and scale the health solutions with communities and government, then help bring them into healthcare workers&apos; everyday practice and national policy.
          </p>
        </div>
      </section>

      {/* SECTION 3 — Process / Methodology Intro: How We Solve Complex Problems */}
      <section className="relative py-20 px-6 sm:px-8 bg-white border-b border-zinc-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.25] pointer-events-none" />

        <div className="mx-auto max-w-7xl flex flex-col items-center">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="h2-section text-zinc-950 uppercase tracking-wide">
              How We Solve Complex Problems
            </h2>
          </div>

          {/* Copy Above Image */}
          <div className="max-w-3xl text-center mb-10">
            <p className="text-subheading text-zinc-900 leading-relaxed font-light text-left px-4 sm:px-6">
              We take on the health problems others either neglect or call too complex and run them through a process that works: innovate them with people with lived experience, experts, governments and relevant stakeholders; test them until the evidence is clear and they fit different settings; and then help public health systems and community organizations make them part of routine care<br /><br />
              <strong>That&apos;s how suffering goes down for good, not just for the length of a grant.</strong>
            </p>
          </div>

          {/* First Image with Right-Side Brightening Overlay */}
          <div className="relative w-full max-w-3xl aspect-[6.5/4.3] rounded-3xl overflow-hidden shadow-md border border-zinc-200/50 bg-zinc-100 group">
            <Image
              src={PROCESS_SECTION_IMAGE}
              alt="Community healthcare co-design process in Nepal"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-101"
              sizes="(max-width: 1024px) 100vw, 70vw"
            />
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/35 via-white/15 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* SECTION 4 — Mission / Himalayas */}
      <section className="relative py-20 px-6 sm:px-8 overflow-hidden bg-zinc-50 border-b border-zinc-100">
        <div className="absolute top-[-10%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-radial from-secondary-blue/10 to-transparent blur-3xl -z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.2] -z-20 pointer-events-none" />

        <div className="mx-auto max-w-7xl flex flex-col items-center">
          <div className="max-w-3xl text-left mb-10">
            <p className="text-zinc-900 leading-relaxed font-light text-[20px] sm:text-[23px] md:text-[25px] px-2 sm:px-4">
              A mother in rural foothills of the Himalayas deserves the same shot at high quality healthcare as a patient in Kathmandu or New York. We are aspiring to create a health system rooted in community, proven by evidence and built to reach everyone.
            </p>
          </div>

          <div className="relative w-full max-w-3xl aspect-[6.5/4.3] rounded-3xl overflow-hidden shadow-md border border-zinc-200/50 bg-zinc-100 group">
            <Image
              src={HIMALAYA_SECTION_IMAGE}
              alt="Foothills of the Himalayas"
              fill
              className="object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-101"
              sizes="(max-width: 1024px) 100vw, 70vw"
              priority
            />
            <div className="absolute bottom-0 inset-x-0 h-3/5 bg-gradient-to-t from-black/85 via-black/55 via-50% to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* SECTION 5 — Three Stage Dynamic Process Boxes */}
      <section className="relative py-20 px-6 sm:px-8 bg-white border-b border-zinc-100 overflow-hidden">
        <div className="absolute top-[10%] left-[-5%] w-[30rem] h-[30rem] rounded-full bg-radial from-primary-pink/5 to-transparent blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30rem] h-[30rem] rounded-full bg-radial from-secondary-blue/5 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 lg:gap-6 max-w-5xl mx-auto mb-10">
            <Link
              href="/solutions/innovate"
              className="w-full md:flex-1 p-6 sm:p-7 rounded-2xl bg-[#FDF2F7] border-2 border-primary-pink shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center min-h-[210px] justify-center group"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-primary-pink mb-3">
                Innovate
              </h3>
              <p className="text-[14.5px] text-zinc-700 leading-relaxed font-light">
                Innovate health solutions with local communities and governments.
              </p>
            </Link>

            <div className="hidden md:flex items-center justify-center text-zinc-400 shrink-0">
              <ArrowRight className="h-6 w-6 stroke-[2.5]" />
            </div>

            <Link
              href="/solutions/test"
              className="w-full md:flex-1 p-6 sm:p-7 rounded-2xl bg-[#F0FBFD] border-2 border-secondary-blue shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center min-h-[210px] justify-center group"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-secondary-blue mb-3">
                Test
              </h3>
              <p className="text-[14.5px] text-zinc-700 leading-relaxed font-light">
                Prove it works, adapt it and test until the evidence is <br />
                established.
              </p>
            </Link>

            <div className="hidden md:flex items-center justify-center text-zinc-400 shrink-0">
              <ArrowRight className="h-6 w-6 stroke-[2.5]" />
            </div>

            <Link
              href="/solutions/scale"
              className="w-full md:flex-1 p-6 sm:p-7 rounded-2xl bg-[#F8F2F9] border-2 border-accent-purple shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center min-h-[210px] justify-center group"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-accent-purple mb-3">
                Scale
              </h3>
              <p className="text-[14.5px] text-zinc-700 leading-relaxed font-light">
                Help to integrate into public healthcare systems and national policy for larger impact.
              </p>
            </Link>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <p className="text-base sm:text-lg text-zinc-600 font-light italic leading-relaxed">
              Our solutions move through these stages dynamically, guided by the novelty of the approach and the strength of validated evidence.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6 — WHO WE ARE */}
      <section className="relative pt-10 sm:pt-12 pb-20 px-6 sm:px-8 bg-white border-b border-zinc-100 overflow-hidden" id="who-we-are">
        <div className="absolute bottom-[-10%] left-[-5%] w-[40rem] h-[40rem] rounded-full bg-radial from-primary-pink/5 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="mx-auto max-w-7xl flex flex-col items-center">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="h2-section text-zinc-950 uppercase tracking-wide">
              Who We Are
            </h2>
          </div>

          <div className="relative w-full max-w-4xl aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-lg border border-zinc-200/60 bg-zinc-950 group">
            <Image
              src={TEAM_SECTION_IMAGE}
              alt="Possible team of researchers, clinicians, and advocates"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/90 via-70% to-transparent pt-28 pb-8 sm:pb-12 px-6 sm:px-12 flex items-end justify-center">
              <p className="text-white text-[16px] sm:text-[18px] md:text-[20px] font-light leading-relaxed text-center max-w-3xl drop-shadow-lg">
                We are health care professionals, clinicians, engineers, and advocates who happen to also be rigorous researchers, not the other way around. Rooted in Nepal for nearly two decades, we go looking for the problems everyone else avoids: mental health, stigma, domestic violence, chronic disease, disability, and the gaps between them. <strong>We don&apos;t just co-design a project, test/deliver a program, and move on. We build systems that last.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — PARTNER WITH US (Greyish Background) */}
      <section className="relative py-20 px-6 sm:px-8 bg-zinc-100 border-y border-zinc-200/80 overflow-hidden">
        <div className="absolute top-[10%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-radial from-secondary-blue/5 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="mx-auto max-w-7xl flex flex-col items-center">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="h2-section text-zinc-950 uppercase tracking-wide">
              Partner With Us
            </h2>
            <p className="text-zinc-700 font-light text-[17px] sm:text-[19px] leading-relaxed">
              Working on a health problem others have overlooked or called too complex? We&apos;d love to hear from you.
            </p>
          </div>

          {/* Infographic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-5xl mb-12">
            {/* Card 1: Fund a Solution -> Links to Donate Page */}
            <Link
              href="/donate"
              className="p-7 rounded-3xl bg-white border-2 border-zinc-200/90 hover:border-primary-pink shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4 w-full">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-primary-pink/10 flex items-center justify-center text-primary-pink group-hover:scale-110 transition-transform">
                    <HandHeart className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-primary-pink group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-xl font-bold text-zinc-950 group-hover:text-primary-pink transition-colors">
                  Fund a Solution
                </h3>
                <p className="text-[15px] text-zinc-600 font-light leading-relaxed">
                  Back a solution where it needs support most.
                </p>
              </div>
            </Link>

            {/* Card 2: Build With Us -> Direct Hyperlink to Contact Page */}
            <Link
              href="/contact-us"
              className="p-7 rounded-3xl bg-white border-2 border-zinc-200/90 hover:border-secondary-blue shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4 w-full">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-blue/10 flex items-center justify-center text-secondary-blue group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-secondary-blue group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-xl font-bold text-zinc-950 group-hover:text-secondary-blue transition-colors">
                  Build With Us
                </h3>
                <p className="text-[15px] text-zinc-600 font-light leading-relaxed">
                  Join us to innovate, test, or scale a solution.
                </p>
              </div>
            </Link>

            {/* Card 3: Share a Problem or Idea -> Direct Hyperlink to Contact Page */}
            <Link
              href="/contact-us"
              className="p-7 rounded-3xl bg-white border-2 border-zinc-200/90 hover:border-accent-purple shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4 w-full">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-accent-purple/10 flex items-center justify-center text-accent-purple group-hover:scale-110 transition-transform">
                    <Lightbulb className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-accent-purple group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-xl font-bold text-zinc-950 group-hover:text-accent-purple transition-colors">
                  Share a Problem or Idea
                </h3>
                <p className="text-[15px] text-zinc-600 font-light leading-relaxed">
                  Tell us about a neglected health need you&apos;d like to tackle together.
                </p>
              </div>
            </Link>
          </div>

          {/* Partnership Summary Note (Plain text without background container) */}
          <div className="max-w-3xl text-center mx-auto">
            <p className="text-zinc-700 font-light text-[17px] sm:text-[19px] leading-relaxed">
              We work best with partners who work with communities and government, let evidence guide the way, and aim for change that outlasts the grant.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8 — Operational Presence Map */}
      <div className="relative">
        <InteractivePresenceMap />
      </div>
    </div>
  );
}