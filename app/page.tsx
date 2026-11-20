"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HandHeart, Users, Lightbulb } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import InteractivePresenceMap from "@/components/InteractivePresenceMap";

const DEFAULT_PROCESS_IMAGE = "/Codesign2.jpeg";
const DEFAULT_HIMALAYA_IMAGE = "/Mother_updated.JPG";
const DEFAULT_TEAM_IMAGE = "/woweare.jpg";

interface SectionData {
  id?: number;
  section_key: string;
  title: string;
  subtitle?: string;
  content?: string;
  badge?: string;
  image_url?: string;
  link_text?: string;
  link_url?: string;
  items?: any[];
  is_published?: boolean;
}

export default function Home() {
  const [sections, setSections] = useState<Record<string, SectionData>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/homepage')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.sectionsMap) {
          setSections(data.sectionsMap);
        }
      })
      .catch((err) => {
        console.error('Error fetching homepage CMS sections:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const heroSec = sections['hero'];
  const subHeroSec = sections['sub_hero'];
  const approachSec = sections['approach'];
  const missionSec = sections['mission'];
  const stagesSec = sections['stages'];
  const whoWeAreSec = sections['who_we_are'];
  const partnerSec = sections['partner_with_us'];

  // Default dynamic stages if not provided in DB
  const stageItems = stagesSec?.items && stagesSec.items.length > 0 ? stagesSec.items : [
    {
      title: "Innovate",
      desc: "Innovate health solutions with local communities and governments.",
      link: "/solutions/innovate",
      theme: "pink",
    },
    {
      title: "Test",
      desc: "Prove it works, adapt it and test until the evidence is established.",
      link: "/solutions/test",
      theme: "blue",
    },
    {
      title: "Scale",
      desc: "Help to integrate into public healthcare systems and national policy for larger impact.",
      link: "/solutions/scale",
      theme: "purple",
    },
  ];

  // Default partner cards if not provided in DB
  const partnerItems = partnerSec?.items && partnerSec.items.length > 0 ? partnerSec.items : [
    {
      title: "Fund a Solution",
      desc: "Fund a solution where it needs support most.",
      link: "/donate",
      icon: "HandHeart",
      theme: "pink",
    },
    {
      title: "Build With Us",
      desc: "Collaborate with us to innovate, test, or scale a solution.",
      link: "/contact-us",
      icon: "Users",
      theme: "blue",
    },
    {
      title: "Share a Problem or Idea",
      desc: "Tell us about a neglected health need you'd like to tackle together.",
      link: "/contact-us",
      icon: "Lightbulb",
      theme: "purple",
    },
  ];

  return (
    <div className="flex flex-col w-full bg-white">
      {/* SECTION 1 — Hero */}
      {(!heroSec || heroSec.is_published !== false) && (
        <HeroSlider data={heroSec} />
      )}

      {/* SECTION 2 — Sub-Hero */}
      {(!subHeroSec || subHeroSec.is_published !== false) && (
        <section hidden className="relative py-12 sm:py-14 px-6 sm:px-8 bg-zinc-50 border-b border-zinc-100 overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-radial from-secondary-blue/10 to-transparent blur-3xl -z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.2] -z-20 pointer-events-none" />

          <div className="mx-auto max-w-4xl text-center space-y-4">
            <h2 className="h2-section text-zinc-950 uppercase tracking-wide leading-tight">
              &ldquo;{subHeroSec?.title || "Too complex to solve"}&rdquo; is where we start.
            </h2>
            <p className="text-zinc-800 leading-relaxed font-light text-[18px] sm:text-[21px] md:text-[23px] max-w-3xl mx-auto">
              {subHeroSec?.subtitle || "We innovate, test, and scale the health solutions with communities and government, then help bring them into healthcare workers' everyday practice and national policy."}
            </p>
          </div>
        </section>
      )}

      {/* SECTION 3 — Process / Methodology Intro: How We Solve Complex Problems */}
      {(!approachSec || approachSec.is_published !== false) && (
        <section className="relative py-12 sm:py-16 px-6 sm:px-8 bg-white border-b border-zinc-100">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.25] pointer-events-none" />

          <div className="mx-auto max-w-7xl flex flex-col items-center">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-4">
              <h2 className="h2-section text-zinc-950 uppercase tracking-wide">
                {approachSec?.title || "Our approach to solve health problems"}
              </h2>
            </div>

            {/* Copy Above Image */}
            <div className="max-w-3xl text-center mb-8">
              <p className="text-subheading text-zinc-900 leading-relaxed font-light text-left px-4 sm:px-6">
                {approachSec?.subtitle || "We work on health problems most either neglect or call impossible to solve, and run through a rigorous process. We innovate health solutions with people who have lived experience, experts, governments and relevant stakeholders, and test the solutions until the evidence is established. We then support the government and community partners to scale into public healthcare systems."}
              </p>
            </div>

            {/* First Image with Right-Side Brightening Overlay */}
            <div className="relative w-full max-w-3xl aspect-[6.5/4.3] rounded-3xl overflow-hidden shadow-md border border-zinc-200/50 bg-zinc-100 group">
              <Image
                src={approachSec?.image_url || DEFAULT_PROCESS_IMAGE}
                alt="Community healthcare co-design process in Nepal"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-101"
                sizes="(max-width: 1024px) 100vw, 70vw"
              />
              <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/35 via-white/15 to-transparent pointer-events-none" />
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4 — Mission / Himalayas */}
      {(!missionSec || missionSec.is_published !== false) && (
        <section className="relative py-12 sm:py-16 px-6 sm:px-8 overflow-hidden bg-zinc-50 border-b border-zinc-100">
          <div className="absolute top-[-10%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-radial from-secondary-blue/10 to-transparent blur-3xl -z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.2] -z-20 pointer-events-none" />

          <div className="mx-auto max-w-7xl flex flex-col items-center">
            <div className="max-w-3xl text-left mb-8">
              <p className="text-zinc-900 leading-relaxed font-light text-[20px] sm:text-[23px] md:text-[25px] px-2 sm:px-4">
                {missionSec?.subtitle || "A mother in the rural foothills of the Himalayas deserves the same high-quality healthcare as anyone in Kathmandu or New York. We are working to build a health system that is rooted in communities, proven by evidence, and built to reach everyone."}
              </p>
            </div>

            <div className="relative w-full max-w-3xl aspect-[6.5/4.3] rounded-3xl overflow-hidden shadow-md border border-zinc-200/50 bg-zinc-100 group">
              <Image
                src={missionSec?.image_url || DEFAULT_HIMALAYA_IMAGE}
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
      )}

      {/* SECTION 5 — Three Stage Dynamic Process Boxes */}
      {(!stagesSec || stagesSec.is_published !== false) && (
        <section className="relative py-12 sm:py-16 px-6 sm:px-8 bg-white border-b border-zinc-100 overflow-hidden">
          <div className="absolute top-[10%] left-[-5%] w-[30rem] h-[30rem] rounded-full bg-radial from-primary-pink/5 to-transparent blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30rem] h-[30rem] rounded-full bg-radial from-secondary-blue/5 to-transparent blur-3xl -z-10 pointer-events-none" />

          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 lg:gap-6 max-w-5xl mx-auto mb-8">
              {stageItems.map((st: any, i: number) => {
                const borderClass =
                  st.theme === 'pink'
                    ? 'border-primary-pink bg-[#FDF2F7] text-primary-pink'
                    : st.theme === 'blue'
                    ? 'border-secondary-blue bg-[#F0FBFD] text-secondary-blue'
                    : 'border-accent-purple bg-[#F8F2F9] text-accent-purple';

                return (
                  <div key={i} className="flex flex-1 items-center gap-4 lg:gap-6">
                    <Link
                      href={st.link || '/solutions/scale'}
                      className={`w-full p-6 sm:p-7 rounded-2xl border-2 ${borderClass} shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center min-h-[190px] justify-center group`}
                    >
                      <h3 className="text-xl sm:text-2xl font-bold mb-2">
                        {st.title}
                      </h3>
                      <p className="text-[14.5px] text-zinc-700 leading-relaxed font-light">
                        {st.desc}
                      </p>
                    </Link>
                    {i < stageItems.length - 1 && (
                      <div className="hidden md:flex items-center justify-center text-zinc-400 shrink-0">
                        <ArrowRight className="h-6 w-6 stroke-[2.5]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center max-w-3xl mx-auto">
              <p className="text-base sm:text-lg text-zinc-600 font-light italic leading-relaxed">
                {stagesSec?.subtitle || "Our solutions move through these stages dynamically, starting with new ideas that we test and then scale."}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6 — WHO WE ARE */}
      {(!whoWeAreSec || whoWeAreSec.is_published !== false) && (
        <section className="relative py-12 sm:py-16 px-6 sm:px-8 bg-white border-b border-zinc-100 overflow-hidden" id="who-we-are">
          <div className="absolute bottom-[-10%] left-[-5%] w-[40rem] h-[40rem] rounded-full bg-radial from-primary-pink/5 to-transparent blur-3xl -z-10 pointer-events-none" />

          <div className="mx-auto max-w-7xl flex flex-col items-center">
            <div className="text-center max-w-3xl mx-auto mb-6">
              <h2 className="h2-section text-zinc-950 uppercase tracking-wide">
                {whoWeAreSec?.title || "Who We Are"}
              </h2>
            </div>

            <div className="relative w-full max-w-4xl aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-lg border border-zinc-200/60 bg-zinc-950 group">
              <Image
                src={whoWeAreSec?.image_url || DEFAULT_TEAM_IMAGE}
                alt="Possible team of researchers, clinicians, and advocates"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/90 via-70% to-transparent pt-28 pb-8 sm:pb-10 px-6 sm:px-12 flex items-end justify-center">
                <p className="text-white text-[16px] sm:text-[18px] md:text-[20px] font-light leading-relaxed text-center max-w-3xl drop-shadow-lg">
                  {whoWeAreSec?.subtitle || "We are health care professionals, clinicians, engineers, and advocates who happen to also be rigorous researchers, not the other way around. Rooted in Nepal for nearly two decades, we go looking for the problems everyone else avoids: mental health, stigma, domestic violence, chronic disease, disability, and the gaps between them. We co-design a project, test/deliver a program, and support to scale."}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7 — PARTNER WITH US */}
      {(!partnerSec || partnerSec.is_published !== false) && (
        <section className="relative py-12 sm:py-16 px-6 sm:px-8 bg-zinc-100 border-y border-zinc-200/80 overflow-hidden">
          <div className="absolute top-[10%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-radial from-secondary-blue/5 to-transparent blur-3xl -z-10 pointer-events-none" />

          <div className="mx-auto max-w-7xl flex flex-col items-center">
            <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
              <h2 className="h2-section text-zinc-950 uppercase tracking-wide">
                {partnerSec?.title || "Partner With Us"}
              </h2>
              <p className="text-zinc-700 font-light text-[17px] sm:text-[19px] leading-relaxed">
                {partnerSec?.subtitle || "Working on a health problem others have overlooked or called too complex? We'd love to hear from you."}
              </p>
            </div>

            {/* Infographic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-5xl mb-8">
              {partnerItems.map((card: any, idx: number) => {
                const isPink = card.theme === 'pink' || idx === 0;
                const isBlue = card.theme === 'blue' || idx === 1;
                const hoverBorder = isPink
                  ? 'hover:border-primary-pink'
                  : isBlue
                  ? 'hover:border-secondary-blue'
                  : 'hover:border-accent-purple';
                const iconColor = isPink
                  ? 'text-primary-pink bg-primary-pink/10 group-hover:text-primary-pink'
                  : isBlue
                  ? 'text-secondary-blue bg-secondary-blue/10 group-hover:text-secondary-blue'
                  : 'text-accent-purple bg-accent-purple/10 group-hover:text-accent-purple';
                const textHover = isPink
                  ? 'group-hover:text-primary-pink'
                  : isBlue
                  ? 'group-hover:text-secondary-blue'
                  : 'group-hover:text-accent-purple';

                return (
                  <Link
                    key={idx}
                    href={card.link || '/contact-us'}
                    className={`p-6 sm:p-7 rounded-3xl bg-white border-2 border-zinc-200/90 ${hoverBorder} shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer`}
                  >
                    <div className="space-y-4 w-full">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform`}>
                          {idx === 0 ? (
                            <HandHeart className="w-6 h-6 stroke-[2.2]" />
                          ) : idx === 1 ? (
                            <Users className="w-6 h-6 stroke-[2.2]" />
                          ) : (
                            <Lightbulb className="w-6 h-6 stroke-[2.2]" />
                          )}
                        </div>
                        <ArrowRight className={`w-5 h-5 text-zinc-400 ${textHover} group-hover:translate-x-1 transition-all`} />
                      </div>
                      <h3 className={`text-xl font-bold text-zinc-950 ${textHover} transition-colors`}>
                        {card.title}
                      </h3>
                      <p className="text-[15px] text-zinc-600 font-light leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Partnership Summary Note */}
            <div className="max-w-3xl text-center mx-auto">
              <p className="text-zinc-700 font-light text-[17px] sm:text-[19px] leading-relaxed">
                {partnerSec?.content || "We work best with partners who work with communities and government, let evidence guide the way, and aim for change that outlasts the grant."}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8 — Operational Presence Map */}
      <div className="relative">
        <InteractivePresenceMap />
      </div>
    </div>
  );
}
