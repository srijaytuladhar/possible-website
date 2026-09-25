import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import InteractivePresenceMap from "@/components/InteractivePresenceMap";

// Image slots for upcoming client photos:
const PROCESS_SECTION_IMAGE = "/howwersolve.jpg"; // Photo below hero text (to be replaced with provided file)
const HIMALAYA_SECTION_IMAGE = "/homepagethird.jpg"; // Section 3 Himalaya-themed photo (to be replaced with provided file)
const TEAM_SECTION_IMAGE = "/woweare.jpg"; // Section 5 group around table photo (to be replaced with provided file)

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* SECTION 1 — Hero */}
      <HeroSlider />

      {/* SECTION 2 — Sub-Hero: "Too complex to solve" is where we start */}
      <section hidden className="relative py-16 sm:py-20 px-6 sm:px-8 bg-zinc-50 border-b border-zinc-100 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-radial from-secondary-blue/10 to-transparent blur-3xl -z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.2] -z-20 pointer-events-none" />

        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h2 className="h2-section text-zinc-950 uppercase tracking-wide leading-tight">
            &ldquo;Too complex to solve&rdquo; is where we start.
          </h2>
          <p className="text-zinc-800 leading-relaxed font-light text-[18px] sm:text-[21px] md:text-[23px] max-w-3xl mx-auto">
            We innovate, test, and scale health solutions until they are health care workers&apos; everyday practice and national policy.
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
            <p className="text-subheading text-zinc-900 leading-relaxed font-light text-justify sm:text-center px-4 sm:px-6">
              We take on the health problems others either neglect or call too complex and run them through a process that works: innovate them with people with lived experience, experts, governments and relavant stakeholders; test them until the evidence is proven and they are adaptable; and scale them into public healthcare systems.<strong> That&apos;s how suffering goes down for good, not just for the length of a grant.</strong>
            </p>
          </div>

          {/* Image */}
          <div className="relative w-full max-w-3xl aspect-[6.5/4.3] rounded-3xl overflow-hidden shadow-md border border-zinc-200/50 bg-zinc-100 group">
            <Image
              src={PROCESS_SECTION_IMAGE}
              alt="Community healthcare co-design process in Nepal"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-101"
              sizes="(max-width: 1024px) 100vw, 70vw"
            />
          </div>
        </div>
      </section>
 {/* SECTION 5 — Mission / Himalayas / Rooted in Community */}
      <section className="relative py-20 px-6 sm:px-8 overflow-hidden bg-zinc-50 border-b border-zinc-100">
        <div className="absolute top-[-10%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-radial from-secondary-blue/10 to-transparent blur-3xl -z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.2] -z-20 pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image */}
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-[6/4.5] rounded-3xl overflow-hidden shadow-md border border-zinc-200/50 bg-zinc-100 group">
                <Image
                  src={HIMALAYA_SECTION_IMAGE}
                  alt="A mother in rural foothills of the Himalayas receiving healthcare consultation"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
              <p className="text-zinc-900 leading-relaxed font-light text-justify sm:text-left text-[22px] sm:text-[25px] md:text-[27px]">
                A mother in rural foothills of the Himalayas deserves the same shot at high quality healthcare as a patient in Kathmandu or New York. We are aspiring to create a health system rooted in community, proven by evidence amd built to reach everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* SECTION 4 — Three Stage Dynamic Process Boxes (Innovate -> Test -> Scale) */}
      <section className="relative py-20 px-6 sm:px-8 bg-white border-b border-zinc-100 overflow-hidden">
        <div className="absolute top-[10%] left-[-5%] w-[30rem] h-[30rem] rounded-full bg-radial from-primary-pink/5 to-transparent blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30rem] h-[30rem] rounded-full bg-radial from-secondary-blue/5 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          {/* 3 Connected Process Boxes in order: Innovate -> Test -> Scale */}
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 lg:gap-6 max-w-5xl mx-auto mb-10">
            {/* Box 1: Innovate (Pink Border & Soft Background) */}
            <Link
              href="/solutions/innovate"
              className="w-full md:flex-1 p-6 sm:p-7 rounded-2xl bg-[#FDF2F7] border-2 border-primary-pink shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center min-h-[210px] justify-center group"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-primary-pink mb-3">
                Innovate
              </h3>
              <p className="text-[14.5px] text-zinc-700 leading-relaxed font-light">
                Innovate health solutions with people with lived experience, health workers, local communities and governments.
              </p>
            </Link>

            {/* Connecting Arrow 1 */}
            <div className="hidden md:flex items-center justify-center text-zinc-400 shrink-0">
              <ArrowRight className="h-6 w-6 stroke-[2.5]" />
            </div>

            {/* Box 2: Test (Cyan Border & Soft Background) */}
            <Link
              href="/solutions/test"
              className="w-full md:flex-1 p-6 sm:p-7 rounded-2xl bg-[#F0FBFD] border-2 border-secondary-blue shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center min-h-[210px] justify-center group"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-secondary-blue mb-3">
                Test
              </h3>
              <p className="text-[14.5px] text-zinc-700 leading-relaxed font-light">
                Prove it works, Adapt it and Test until the evidence in undeniable.
              </p>
            </Link>

            {/* Connecting Arrow 2 */}
            <div className="hidden md:flex items-center justify-center text-zinc-400 shrink-0">
              <ArrowRight className="h-6 w-6 stroke-[2.5]" />
            </div>

            {/* Box 3: Scale (Purple Border & Soft Background) */}
            <Link
              href="/solutions/scale"
              className="w-full md:flex-1 p-6 sm:p-7 rounded-2xl bg-[#F8F2F9] border-2 border-accent-purple shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center min-h-[210px] justify-center group"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-accent-purple mb-3">
                Scale
              </h3>
              <p className="text-[14.5px] text-zinc-700 leading-relaxed font-light">
                Integrate into permanent public health systems and national policy for lasting change.
              </p>
            </Link>
          </div>

          {/* Caption Below the 3 Boxes per IMG-02 */}
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-base sm:text-lg text-zinc-600 font-light italic leading-relaxed">
              Our solutions move through these stages dynamically, guided by the novelty of the approach and the strength of validated evidence.
            </p>
          </div>
        </div>
      </section>

     

      {/* SECTION 6 — WHO WE ARE */}
      <section className="relative py-20 px-6 sm:px-8 bg-white border-b border-zinc-100 overflow-hidden" id="who-we-are">
        <div className="absolute bottom-[-10%] left-[-5%] w-[40rem] h-[40rem] rounded-full bg-radial from-primary-pink/5 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="mx-auto max-w-7xl flex flex-col items-center">
          {/* Header matching How We Solve Complex Problems */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="h2-section text-zinc-950 uppercase tracking-wide">
              Who We Are
            </h2>
          </div>

          {/* Image with text overlaid directly on the image with dark/black shade overlay per IMG-01 */}
          <div className="relative w-full max-w-4xl aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-lg border border-zinc-200/60 bg-zinc-950 group">
            <Image
              src={TEAM_SECTION_IMAGE}
              alt="Possible team of researchers, clinicians, and advocates"
              fill
              className="object-cover object-center opacity-70 transition-transform duration-700 group-hover:scale-102"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
            {/* Dark shade overlay behind text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/40 flex items-center justify-center p-6 sm:p-12 md:p-14">
              <p className="text-white text-[16px] sm:text-[18px] md:text-[20px] font-light leading-relaxed text-center max-w-3xl drop-shadow-md">
                We are health care professionals, clinicians, engineers, and advocates who happen to also be rigorous researchers, not the other way around. Rooted in Nepal for nearly two decades, we go looking for the problems everyone else avoids: mental health, stigma, domestic violence, chronic disease, disability, and the gaps between them. <strong>We don&apos;t just co-design a project, test/deliver a program, and move on. We build systems that last.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — Operational Presence Map */}
      <div className="relative">
        <InteractivePresenceMap />
      </div>
    </div>
  );
}
