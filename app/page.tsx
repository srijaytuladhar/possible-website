import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Info, Sparkles, DraftingCompass, Beaker, TrendingUp, GitFork } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import InteractivePresenceMap from "@/components/InteractivePresenceMap";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* SECTION 1 — Hero (Page 1 in PDF) */}
      <HeroSlider />

      {/* SECTION 2 — Himalayas / Healthcare Equity (Page 2 in PDF) */}
      <section className="relative py-20 px-6 sm:px-8 overflow-hidden bg-zinc-50 border-b border-zinc-100">
        {/* Decorative Background Elements */}
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
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-pink/10 px-4 py-1 text-[13px] font-semibold text-primary-pink uppercase tracking-wider shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Healthcare Equity
              </span>

              <h2 className="h2-section text-zinc-950 font-extralight uppercase leading-tight tracking-wide">
                Rooted in Community, <br />
                <span className="font-semibold text-primary-pink">proven by evidence.</span>
              </h2>

              <div className="h-1.5 w-20 bg-gradient-to-r from-primary-pink to-secondary-blue rounded-full" />

              <p className="text-body text-body-gray leading-relaxed font-light text-justify sm:text-left text-[16px] sm:text-[17px]">
                A mother in rural foothills of the Himalayas deserves the same shot at high quality healthcare as a patient in Kathmandu or New York. We&apos;re building toward a world where that&apos;s not aspiration &mdash; it&apos;s how every health system works: rooted in community, proven by evidence, built to reach everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Process / Methodology Intro */}
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

      {/* SECTION 4 — Four Stage Solutions Grid */}
      <section className="relative py-20 px-6 sm:px-8 bg-zinc-50/50 border-b border-zinc-100 overflow-hidden">
        <div className="absolute top-[10%] left-[-5%] w-[30rem] h-[30rem] rounded-full bg-radial from-primary-pink/5 to-transparent blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30rem] h-[30rem] rounded-full bg-radial from-secondary-blue/5 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="h2-section text-zinc-950 font-extralight uppercase leading-tight tracking-wide">
              The Lifecycle of <br />
              <span className="font-semibold text-primary-pink">Sustainable Health Innovation</span>
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-primary-pink to-secondary-blue rounded-full mx-auto mt-4" />
          </div>

          {/* Cards Grid: 4 Phases (Innovate, Test, Scale, Pipeline) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Innovate */}
            <Link
              href="/solutions/innovate"
              className="group p-7 bg-white hover:bg-white border border-zinc-150 hover:border-primary-pink/40 rounded-3xl transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between min-h-[340px] relative overflow-hidden"
            >
              <div className="space-y-5 relative z-10">
                <div className="p-3.5 bg-primary-pink/10 text-primary-pink rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <DraftingCompass className="h-6 w-6" />
                </div>
                <div className="space-y-2.5">
                  <h3 className="h3-card font-bold text-zinc-900 uppercase group-hover:text-primary-pink transition-colors">
                    1. Innovate
                  </h3>
                  <p className="text-[14px] text-body-gray leading-relaxed font-light">
                    Co-designing mobile health apps and assistive care models directly with caregivers and individuals with lived experience.
                  </p>
                </div>
              </div>
              <div className="pt-5 border-t border-zinc-100 group-hover:border-primary-pink/20 flex items-center gap-2 text-primary-pink font-semibold text-[13px] uppercase tracking-wider relative z-10">
                <span>Explore Innovate</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Card 2: Test */}
            <Link
              href="/solutions/test"
              className="group p-7 bg-white hover:bg-white border border-zinc-150 hover:border-secondary-blue/40 rounded-3xl transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between min-h-[340px] relative overflow-hidden"
            >
              <div className="space-y-5 relative z-10">
                <div className="p-3.5 bg-secondary-blue/10 text-secondary-blue rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <Beaker className="h-6 w-6" />
                </div>
                <div className="space-y-2.5">
                  <h3 className="h3-card font-bold text-zinc-900 uppercase group-hover:text-secondary-blue transition-colors">
                    2. Test
                  </h3>
                  <p className="text-[14px] text-body-gray leading-relaxed font-light">
                    Evaluating clinical models through randomized controlled trials across stigma, dementia, suicide prevention, and family IPV.
                  </p>
                </div>
              </div>
              <div className="pt-5 border-t border-zinc-100 group-hover:border-secondary-blue/20 flex items-center gap-2 text-secondary-blue font-semibold text-[13px] uppercase tracking-wider relative z-10">
                <span>Explore Test</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Card 3: Scale */}
            <Link
              href="/solutions/scale"
              className="group p-7 bg-white hover:bg-white border border-zinc-150 hover:border-accent-purple/40 rounded-3xl transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between min-h-[340px] relative overflow-hidden"
            >
              <div className="space-y-5 relative z-10">
                <div className="p-3.5 bg-accent-purple/10 text-accent-purple rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div className="space-y-2.5">
                  <h3 className="h3-card font-bold text-zinc-900 uppercase group-hover:text-accent-purple transition-colors">
                    3. Scale
                  </h3>
                  <p className="text-[14px] text-body-gray leading-relaxed font-light">
                    Scaling collaborative mental health and longitudinal community health worker systems directly into government infrastructure.
                  </p>
                </div>
              </div>
              <div className="pt-5 border-t border-zinc-100 group-hover:border-accent-purple/20 flex items-center gap-2 text-accent-purple font-semibold text-[13px] uppercase tracking-wider relative z-10">
                <span>Explore Scale</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Card 4: Pipeline */}
            <Link
              href="/solutions/pipeline"
              className="group p-7 bg-white hover:bg-white border border-zinc-150 hover:border-amber-500/40 rounded-3xl transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between min-h-[340px] relative overflow-hidden"
            >
              <div className="space-y-5 relative z-10">
                <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <GitFork className="h-6 w-6" />
                </div>
                <div className="space-y-2.5">
                  <h3 className="h3-card font-bold text-zinc-900 uppercase group-hover:text-amber-600 transition-colors">
                    4. Pipeline
                  </h3>
                  <p className="text-[14px] text-body-gray leading-relaxed font-light">
                    Culturally grounded concepts addressing the intersection of climate change and health, and nurse-led support in public schools.
                  </p>
                </div>
              </div>
              <div className="pt-5 border-t border-zinc-100 group-hover:border-amber-500/20 flex items-center gap-2 text-amber-600 font-semibold text-[13px] uppercase tracking-wider relative z-10">
                <span>Explore Pipeline</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* SECTION 5 — WHO WE ARE */}
      <section className="relative py-20 px-6 sm:px-8 bg-white border-b border-zinc-100 overflow-hidden" id="who-we-are">
        <div className="absolute bottom-[-10%] left-[-5%] w-[40rem] h-[40rem] rounded-full bg-radial from-primary-pink/5 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Text Content */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <h2 className="h2-section text-zinc-950 font-extralight uppercase leading-tight tracking-wide">
                WHO WE ARE, <br />
                <span className="font-semibold text-primary-pink">neighbors building to last.</span>
              </h2>

              <div className="h-1.5 w-20 bg-gradient-to-r from-primary-pink to-secondary-blue rounded-full" />

              <div className="space-y-4">
                <p className="text-body text-body-gray leading-relaxed font-light text-justify sm:text-left">
                  We&apos;re health care professionals, clinicians, engineers, and advocates who happen to also be rigorous researchers &mdash; not the other way around. Rooted in Nepal for nearly two decades, we go looking for the problems everyone else avoids: mental health, stigma, domestic violence, chronic disease, disability, and the gaps between them. We don&apos;t just run a study, deliver an intervention/program, and move on. We build systems that last.
                </p>

                <div className="relative p-5 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-xs">
                  <p className="text-body text-zinc-800 leading-relaxed font-light italic">
                    &ldquo;We&apos;re not visitors running a study. We&apos;re neighbors building something that has to last.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative w-full aspect-[4.5/3] rounded-3xl overflow-hidden shadow-md border border-zinc-200/50 bg-zinc-100 group">
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
