import Image from "next/image";
import Link from "next/link";
import { Compass, Target, Activity, ShieldCheck, HeartHandshake, Eye, Users, DraftingCompass, Beaker, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";

export default function Home() {
  const solutions = [
    {
      title: "CHWs at Scale for Chronic Disease and Behavioral Health",
      desc: "Expanding Nepal's national community health worker program to deliver home-based care for chronic conditions and mental health, supported by a state-of-the-art Community Health Information System (CHIS) to track patient outcomes and guide interventions.",
      icon: Users,
      color: "border-primary-pink hover:bg-primary-pink/5",
      badgeColor: "bg-primary-pink/10 text-primary-pink",
    },
    {
      title: "MILAP for Intimate Partner Violence",
      desc: "A family-based intervention co-created with WOREC that engages husbands and mothers-in-law to reduce domestic violence, improve mental health, and alleviate depression among women in rural communities.",
      icon: HeartHandshake,
      color: "border-secondary-blue hover:bg-secondary-blue/5",
      badgeColor: "bg-secondary-blue/10 text-secondary-blue",
    },
    {
      title: "INCLUDE for Improving HIV Care",
      desc: "A digital tool designed to identify, monitor, and reduce stigma within HIV clinics, optimizing and improving care for people living with HIV across healthcare facilities.",
      icon: ShieldCheck,
      color: "border-accent-purple hover:bg-accent-purple/5",
      badgeColor: "bg-accent-purple/10 text-accent-purple",
    },
    {
      title: "Collaborative Care for Improving Mental Health Care",
      desc: "An integrated collaborative care model training local CHWs and clinicians to identify, manage, and treat depression and anxiety effectively within primary care structures.",
      icon: Activity,
      color: "border-zinc-300 hover:border-primary-pink hover:bg-zinc-50",
      badgeColor: "bg-zinc-100 text-zinc-700",
    },
    {
      title: "Dementia Support Intervention",
      desc: "A home-based behavioral care program designed to support older adults suffering from cognitive decline and provide essential education and coping resources for their caregivers.",
      icon: Eye,
      color: "border-zinc-300 hover:border-secondary-blue hover:bg-zinc-50",
      badgeColor: "bg-zinc-100 text-zinc-700",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Image Slider */}
      <HeroSlider />

      {/* Who We Are Section */}
      <section className="relative py-24 px-6 sm:px-8 bg-white overflow-hidden" id="who-we-are">
        {/* Modern Background Blur Decorations */}
        <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] rounded-full bg-radial from-secondary-blue/10 to-transparent blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[45rem] h-[45rem] rounded-full bg-radial from-primary-pink/5 to-transparent blur-3xl -z-10 pointer-events-none" />
        
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.25] -z-20 pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-pink/10 px-4 py-1 text-[13px] font-semibold text-primary-pink uppercase tracking-wider shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Who We Are
              </span>
              
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-extralight text-zinc-950 uppercase tracking-wide leading-tight">
                  We are <br />
                  <span className="font-semibold text-primary-pink">researchers</span> <br />
                  and <span className="font-semibold text-secondary-blue">doers</span>.
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-primary-pink to-secondary-blue rounded-full" />
              </div>

              <p className="text-[16px] sm:text-[18px] text-body-gray leading-relaxed font-light">
                Possible is built by healthcare professionals, clinicians, data systems engineers, and human rights advocates. Rooted in Nepal, we build and test innovations to strengthen healthcare delivery where it is needed most.
              </p>
              
              <div className="pt-2">
                <Link
                  href="/get-involved/our-team"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 px-6 py-3 font-equip font-semibold text-[14px] text-zinc-800 hover:text-primary-pink shadow-sm hover:shadow transition-all duration-300 group"
                >
                  <span>Meet our team</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                </Link>
              </div>
            </div>

            {/* Right Interactive Cards Column */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Co-Design Card */}
              <div className="flex flex-col p-6 sm:p-8 bg-white/80 backdrop-blur border border-zinc-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-secondary-blue/30 hover:-translate-y-2 transition-all duration-300 group">
                <div className="p-3 bg-secondary-blue/10 text-secondary-blue rounded-2xl w-fit mb-6 shadow-inner group-hover:bg-secondary-blue group-hover:text-white transition-all duration-300">
                  <DraftingCompass className="h-6 w-6" />
                </div>
                <h4 className="text-[18px] font-bold text-zinc-900 uppercase tracking-wider mb-3 group-hover:text-secondary-blue transition-colors">
                  Co-Design
                </h4>
                <p className="text-[13.5px] text-body-gray leading-relaxed font-light mt-auto">
                  Creating healthcare delivery models hand-in-hand with municipal governments and local stakeholders.
                </p>
              </div>

              {/* Test Card */}
              <div className="flex flex-col p-6 sm:p-8 bg-white/80 backdrop-blur border border-zinc-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary-pink/30 hover:-translate-y-2 transition-all duration-300 group">
                <div className="p-3 bg-primary-pink/10 text-primary-pink rounded-2xl w-fit mb-6 shadow-inner group-hover:bg-primary-pink group-hover:text-white transition-all duration-300">
                  <Beaker className="h-6 w-6" />
                </div>
                <h4 className="text-[18px] font-bold text-zinc-900 uppercase tracking-wider mb-3 group-hover:text-primary-pink transition-colors">
                  Test
                </h4>
                <p className="text-[13.5px] text-body-gray leading-relaxed font-light mt-auto">
                  Evaluating operational models and clinical interventions through rigorous research trials.
                </p>
              </div>

              {/* Scale Card */}
              <div className="flex flex-col p-6 sm:p-8 bg-white/80 backdrop-blur border border-zinc-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-accent-purple/30 hover:-translate-y-2 transition-all duration-300 group">
                <div className="p-3 bg-accent-purple/10 text-accent-purple rounded-2xl w-fit mb-6 shadow-inner group-hover:bg-accent-purple group-hover:text-white transition-all duration-300">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h4 className="text-[18px] font-bold text-zinc-900 uppercase tracking-wider mb-3 group-hover:text-accent-purple transition-colors">
                  Scale
                </h4>
                <p className="text-[13.5px] text-body-gray leading-relaxed font-light mt-auto">
                  Transitioning validated clinical and data workflows directly into government networks.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. Vision & Mission Section */}
      <section className="py-16 bg-zinc-50 border-y border-zinc-100 px-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Vision card */}
            <div className="flex flex-col p-8 sm:p-10 bg-white rounded-2xl border border-zinc-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-200">
              <div className="p-3 bg-primary-pink/10 text-primary-pink rounded-xl w-fit mb-6">
                <Compass className="h-6 w-6" />
              </div>
              <h2 className="h2-section text-zinc-950 mb-4 uppercase tracking-wide">
                Our Vision
              </h2>
              <p className="text-body text-body-gray leading-relaxed font-light">
                Possible envisions a world where everyone, everywhere, has access to high-quality health care rooted in community, context, and evidence.
              </p>
            </div>

            {/* Mission card */}
            <div className="flex flex-col p-8 sm:p-10 bg-white rounded-2xl border border-zinc-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-200">
              <div className="p-3 bg-secondary-blue/10 text-secondary-blue rounded-xl w-fit mb-6">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="h2-section text-zinc-950 mb-4 uppercase tracking-wide">
                Our Mission
              </h2>
              <p className="text-body text-body-gray leading-relaxed font-light">
                We reduce suffering and improve lives by co-designing, testing, and scaling solutions that strengthen community care systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Solutions Section */}
      <section className="py-16 px-6 sm:px-8 bg-white" id="solutions">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-purple/10 px-3.5 py-1 text-[13px] font-medium text-accent-purple mb-4 uppercase tracking-wider">
              Evidence to Action
            </span>
            <h2 className="h2-section text-zinc-950 mb-4 uppercase tracking-wide">
              Our Research & Solutions
            </h2>
            <p className="text-body text-body-gray font-light">
              We design and evaluate implementation models that bridge the gap between evidence and actual health service delivery in low-resource settings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol, index) => {
              const IconComp = sol.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col p-6 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all duration-300 ${sol.color} ${index === 3 || index === 4 ? "lg:col-span-1" : ""
                    } ${index === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
                >
                  <div className={`p-2.5 rounded-lg w-fit mb-5 ${sol.badgeColor}`}>
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="h3-card text-zinc-900 mb-3 font-medium">
                    {sol.title}
                  </h3>
                  <p className="text-[14px] text-body-gray leading-relaxed font-light mt-auto">
                    {sol.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* 4. Current Operational Presence Section */}
      <section className="py-16 bg-zinc-50 border-y border-zinc-100 px-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-blue/10 px-3.5 py-1 text-[13px] font-medium text-secondary-blue mb-4 uppercase tracking-wider">
              Where We Work
            </span>
            <h2 className="h2-section text-zinc-950 mb-4 uppercase tracking-wide">
              Current Operational Presence
            </h2>
            <p className="text-body text-body-gray font-light">
              We operate across multiple districts in Nepal, ensuring remote communities have access to high-quality healthcare.
            </p>
          </div>
          <div className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[600px] rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-white flex items-center justify-center">
            <Image
              src="/presence-maps.png"
              alt="Possible Health Operational Presence Map"
              fill
              className="object-contain p-4"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 -z-10">
              <span className="text-zinc-400 font-medium">Map placeholder - please upload presence-map.png to public folder</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
