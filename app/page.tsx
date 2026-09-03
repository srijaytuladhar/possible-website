import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import InteractivePresenceMap from "@/components/InteractivePresenceMap";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* SECTION 1 — Hero */}
      <HeroSlider />

      {/* SECTION 2 — Process / Methodology Intro (Swapped to 2nd per PDF) */}
      <section className="relative py-20 px-6 sm:px-8 bg-white border-b border-zinc-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.25] pointer-events-none" />

        <div className="mx-auto max-w-7xl flex flex-col items-center">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="h2-section text-zinc-950 uppercase tracking-wide">
              How We Solve Complex Problems
            </h2>
          </div>

          {/* Image */}
          <div className="relative w-full max-w-4xl aspect-[6.5/4.3] rounded-3xl overflow-hidden shadow-md border border-zinc-200/50 bg-zinc-100 group mb-10">
            <Image
              src="/health_process.jpg"
              alt="Community healthcare co-design process in Nepal"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-101"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </div>

          {/* Copy Below Image */}
          <div className="max-w-3xl text-center space-y-6">
            <p className="text-subheading text-zinc-900 leading-relaxed font-light text-justify sm:text-center px-4 sm:px-6">
              We take on the health problems others either neglect or call too complex &mdash; and run them through a process that works: innovate it with the people with lived experience, test it until the evidence is undeniable, and scale into permanent public systems. That&apos;s how suffering goes down for good, not just for the length of a grant.
            </p>
            <div className="pt-2 flex justify-center">
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 px-6 py-3 font-equip font-semibold text-[14px] text-zinc-800 hover:text-primary-pink shadow-sm hover:shadow transition-all duration-300 group"
              >
                <span>Learn more about our solutions</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Himalayas / Rooted in Community (Swapped to 3rd, heading removed per PDF) */}
      <section className="relative py-20 px-6 sm:px-8 overflow-hidden bg-zinc-50 border-b border-zinc-100">
        <div className="absolute top-[-10%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-radial from-secondary-blue/10 to-transparent blur-3xl -z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.2] -z-20 pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image */}
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-[6/4.5] rounded-3xl overflow-hidden shadow-md border border-zinc-200/50 bg-zinc-100 group">
                <Image
                  src="/second-landing.jpg"
                  alt="A mother in rural foothills of the Himalayas receiving healthcare consultation"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
              <p className="text-body text-zinc-800 leading-relaxed font-light text-justify sm:text-left text-[17px] sm:text-[18px]">
                A mother in rural foothills of the Himalayas deserves the same shot at high quality healthcare as a patient in Kathmandu or New York. We&apos;re building toward a world where that&apos;s not aspiration &mdash; it&apos;s how every health system works: rooted in community, proven by evidence, built to reach everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Three Stage Dynamic Process Boxes (Per PDF Page 1 & 2) */}
      <section className="relative py-20 px-6 sm:px-8 bg-white border-b border-zinc-100 overflow-hidden">
        <div className="absolute top-[10%] left-[-5%] w-[30rem] h-[30rem] rounded-full bg-radial from-primary-pink/5 to-transparent blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30rem] h-[30rem] rounded-full bg-radial from-secondary-blue/5 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-zinc-950 font-light leading-snug tracking-wide">
              Our solutions move through these stages dynamically, guided by the novelty and the strength of validated evidence
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-primary-pink to-secondary-blue rounded-full mx-auto mt-6" />
          </div>

          {/* 3 Connected Process Boxes matching PDF Page 2 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-6 max-w-5xl mx-auto">
            {/* Box 1: Innovate */}
            <Link
              href="/solutions/innovate"
              className="w-full md:flex-1 p-6 sm:p-7 rounded-2xl bg-[#EDF9F6] border-2 border-[#52B788] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center min-h-[210px] justify-center group"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 group-hover:text-[#2D6A4F] transition-colors mb-3">
                Innovate
              </h3>
              <p className="text-[14.5px] text-zinc-700 leading-relaxed font-light">
                Innovate health solutions with people with lived experience, health workers, local communities and governments.
              </p>
            </Link>

            {/* Connecting Arrow 1 */}
            <div className="hidden md:flex items-center justify-center text-zinc-500 shrink-0">
              <ArrowRight className="h-6 w-6 stroke-[2.5]" />
            </div>

            {/* Box 2: Test */}
            <Link
              href="/solutions/test"
              className="w-full md:flex-1 p-6 sm:p-7 rounded-2xl bg-[#FFF9E6] border-2 border-[#E0A96D] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center min-h-[210px] justify-center group"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 group-hover:text-[#B07D3E] transition-colors mb-3">
                Test
              </h3>
              <p className="text-[14.5px] text-zinc-700 leading-relaxed font-light">
                Prove it works, Adapt it and Test until the evidence in undeniable.
              </p>
            </Link>

            {/* Connecting Arrow 2 */}
            <div className="hidden md:flex items-center justify-center text-zinc-500 shrink-0">
              <ArrowRight className="h-6 w-6 stroke-[2.5]" />
            </div>

            {/* Box 3: Integrate */}
            <Link
              href="/solutions/scale"
              className="w-full md:flex-1 p-6 sm:p-7 rounded-2xl bg-[#FDF2F4] border-2 border-[#C97A8E] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center min-h-[210px] justify-center group"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 group-hover:text-[#9B3B52] transition-colors mb-3">
                Integrate
              </h3>
              <p className="text-[14.5px] text-zinc-700 leading-relaxed font-light">
                Integrate into permanent public health systems and national policy for lasting change.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHO WE ARE (Pink box banner, quote removed per PDF Page 2) */}
      <section className="relative py-20 px-6 sm:px-8 bg-zinc-50 border-b border-zinc-100 overflow-hidden" id="who-we-are">
        <div className="absolute bottom-[-10%] left-[-5%] w-[40rem] h-[40rem] rounded-full bg-radial from-primary-pink/5 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="mx-auto max-w-7xl space-y-12">
          {/* Solid Pink Box Banner matching PDF Page 2 */}
          <div className="w-full bg-primary-pink py-4 px-6 rounded-2xl shadow-sm text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Who we are
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Text Content */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-body text-zinc-700 leading-relaxed font-light text-justify sm:text-left text-[16px] sm:text-[17px]">
                We&apos;re health care professionals, clinicians, engineers, and advocates who happen to also be rigorous researchers &mdash; not the other way around. Rooted in Nepal for nearly two decades, we go looking for the problems everyone else avoids: mental health, stigma, domestic violence, chronic disease, disability, and the gaps between them. We don&apos;t just run a study, deliver an intervention/program, and move on. We build systems that last.
              </p>
            </div>

            {/* Right Column: Image */}
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-[4.5/3] rounded-3xl overflow-hidden shadow-md border border-zinc-200/50 bg-white group">
                <Image
                  src="/who_we_are_team.jpg"
                  alt="Possible team of researchers, clinicians, and advocates collaborating"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Operational Presence Map */}
      <div className="relative">
        <InteractivePresenceMap />
      </div>
    </div>
  );
}
