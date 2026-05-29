import Image from "next/image";
import Link from "next/link";
import { Compass, Target, Activity, ShieldCheck, HeartHandshake, Eye, Users } from "lucide-react";
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
                  className={`flex flex-col p-6 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all duration-300 ${sol.color} ${
                    index === 3 || index === 4 ? "lg:col-span-1" : ""
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
              src="/presence-map.png"
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
