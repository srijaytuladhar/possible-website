"use client";

import Image from "next/image";
import { Landmark, GraduationCap, Users } from "lucide-react";

interface CollaboratorSection {
  id: string;
  number: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  icon: typeof Landmark;
  theme: {
    badge: string;
    badgeOnDark: string;
    iconBg: string;
    iconText: string;
    iconBorder: string;
    accentLine: string;
  };
  collaborators: { name: string }[];
  imagePosition: "right" | "left";
}

const SECTIONS: CollaboratorSection[] = [
  {
    id: "government-public-health",
    number: "01",
    badge: "Public Sector Partners",
    title: "Government & Health Systems",
    description:
      "Working alongside federal ministries, specialized divisions, municipal governments, and international health agencies to embed high-quality care into the public healthcare architecture.",
    image: "/collaborators/Collaborators.jpg",
    imageAlt: "Fieldwork and collaborative governance in Nepal",
    imageCaption: "Fieldwork & Collaborative Governance",
    icon: Landmark,
    imagePosition: "right",
    theme: {
      badge: "bg-primary-pink/10 text-primary-pink border border-primary-pink/20",
      badgeOnDark: "bg-primary-pink/90 text-white",
      iconBg: "bg-primary-pink/10",
      iconText: "text-primary-pink",
      iconBorder: "border-primary-pink/20",
      accentLine: "bg-primary-pink",
    },
    collaborators: [
      { name: "Ministry of Health and Food Safety" },
      { name: "Department of Health Services" },
      { name: "Nursing and Social Security Division" },
      { name: "Epidemiology and Disease Control Division" },
      { name: "National Centre for AIDS & STD Control" },
      { name: "Nepal Health Research Council" },
      { name: "Social Welfare Council" },
      { name: "World Health Organization" },
      { name: "Chandragiri Municipality, Chandragiri" },
      { name: "Bardibas Municipality, Mahottari" },
      { name: "Bhimeshwor Municipality, Dolakha" },
      { name: "Tamakoshi Rural Municipality, Dolakha" },
      { name: "Baiteshwor Rural Municipality, Dolakha" },
      { name: "Kalinchowk Rural Municipality, Dolakha" },
    ],
  },
  {
    id: "academic-research",
    number: "02",
    badge: "Research & Medical Partners",
    title: "Academic & Medical Institutions",
    description:
      "Partnering with premier medical centers, universities, and global scientific institutes to conduct rigorous implementation research, clinical trials, and knowledge generation.",
    image: "/collaborators/DH__0984.JPG",
    imageAlt: "Clinical collaboration and medical care with Dhulikhel Hospital",
    imageCaption: "Clinical Innovation & Research with Dhulikhel Hospital",
    icon: GraduationCap,
    imagePosition: "left",
    theme: {
      badge: "bg-secondary-blue/10 text-secondary-blue border border-secondary-blue/20",
      badgeOnDark: "bg-secondary-blue/90 text-white",
      iconBg: "bg-secondary-blue/10",
      iconText: "text-secondary-blue",
      iconBorder: "border-secondary-blue/20",
      accentLine: "bg-secondary-blue",
    },
    collaborators: [
      { name: "Dhulikhel Hospital, Kathmandu University Hospital" },
      { name: "Kathmandu University School of Medical Sciences" },
      { name: "National Institutes of Health, USA" },
      { name: "University of California San Francisco" },
      { name: "Wheaton College" },
      { name: "Yale University" },
      { name: "Arnhold Institute for Global Health at Icahn School of Medicine at Mt. Sinai" },
      { name: "University of Connecticut" },
      { name: "University of California, Los Angeles" },
    ],
  },
  {
    id: "community-advocacy",
    number: "03",
    badge: "Advocacy & Implementation Partners",
    title: "Community & Civil Society Organizations",
    description:
      "Partnering with grassroots advocacy leaders, inclusion organizations, and community coalitions to ensure healthcare delivery is rights-based, culturally anchored, and equitable.",
    image: "/collaborators/Lilaram school_BHW.jpg",
    imageAlt: "Community health outreach and school-based engagement",
    imageCaption: "Community Outreach & School Health Engagement",
    icon: Users,
    imagePosition: "right",
    theme: {
      badge: "bg-accent-purple/10 text-accent-purple border border-accent-purple/20",
      badgeOnDark: "bg-accent-purple/90 text-white",
      iconBg: "bg-accent-purple/10",
      iconText: "text-accent-purple",
      iconBorder: "border-accent-purple/20",
      accentLine: "bg-accent-purple",
    },
    collaborators: [
      { name: "Women's Rehabilitation Centre (WOREC)" },
      { name: "Nepal Disabled Women Association" },
      { name: "Nyaya Health Nepal" },
      { name: "Community Health Impact Coalition" },
      { name: "SunyaEk" },
      { name: "Dalit Lives Matters" },
      { name: "Transcultural Psychosocial Organization Nepal (TPO Nepal)" },
      { name: "Blue Diamond Society" },
    ],
  },
];

export default function CollaboratorsPage() {
  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 md:py-16 flex flex-col flex-1 bg-white">
      {/* Page Header */}
      <div className="mb-14 md:mb-20 text-center max-w-3xl mx-auto space-y-4">
        <h1 className="h1-hero text-zinc-950 uppercase tracking-wide">
          Collaborators
        </h1>
        <div className="h-1 w-16 bg-primary-pink mx-auto rounded-full" />
        <p className="text-subheading text-zinc-600 font-light max-w-2xl mx-auto pt-2">
          We collaborate with government ministries, academic medical centers, global research universities, and grassroots advocacy organizations.
        </p>
      </div>

      {/* 3 Sections in 2-Column Alternating Layout */}
      <div className="space-y-16 md:space-y-24">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isImageLeft = section.imagePosition === "left";

          // Text & Collaborator List Block
          const TextContent = (
            <div
              className={`flex flex-col justify-between bg-zinc-50/70 border border-zinc-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs ${
                isImageLeft ? "order-1 lg:order-2" : "order-1"
              }`}
            >
              <div>
                {/* Section Header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span
                    className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${section.theme.badge}`}
                  >
                    {section.number} • {section.badge}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 font-outfit tracking-tight">
                  {section.title}
                </h2>
                <div className={`h-1 w-12 ${section.theme.accentLine} rounded-full mt-3 mb-4`} />

                <p className="text-[15px] sm:text-[15.5px] text-zinc-600 font-light leading-relaxed mb-6 sm:mb-8">
                  {section.description}
                </p>

                {/* Collaborator Names List */}
                <div className="space-y-2.5">
                  {section.collaborators.map((collaborator, cIdx) => (
                    <div
                      key={cIdx}
                      className="group flex items-center gap-3.5 p-3 sm:py-3.5 sm:px-4 rounded-2xl bg-white border border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-50/80 hover:shadow-xs transition-all duration-200"
                    >
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${section.theme.iconBg} ${section.theme.iconText} ${section.theme.iconBorder} group-hover:scale-105 transition-transform shadow-2xs`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[14.5px] sm:text-[15.5px] font-medium text-zinc-800 group-hover:text-zinc-950 transition-colors leading-snug">
                        {collaborator.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Count Indicator */}
              <div className="pt-6 mt-6 border-t border-zinc-200/70 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500">
                <span>{section.collaborators.length} Partners</span>
                <span className="text-zinc-400">Possible Nepal</span>
              </div>
            </div>
          );

          // Image Block
          const ImageContent = (
            <div
              className={`relative w-full h-[420px] sm:h-[500px] lg:h-auto min-h-[420px] lg:min-h-full rounded-3xl overflow-hidden border border-zinc-200/80 shadow-md group ${
                isImageLeft ? "order-2 lg:order-1" : "order-2"
              }`}
            >
              <Image
                src={section.image}
                alt={section.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-103"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={section.id === "government-public-health"}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white z-10">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md mb-2 shadow-sm ${section.theme.badgeOnDark}`}
                >
                  {section.badge}
                </span>
                <p className="text-base sm:text-lg font-medium text-white/95 leading-snug drop-shadow-xs">
                  {section.imageCaption}
                </p>
              </div>
            </div>
          );

          return (
            <section
              key={section.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch"
            >
              {isImageLeft ? (
                <>
                  {ImageContent}
                  {TextContent}
                </>
              ) : (
                <>
                  {TextContent}
                  {ImageContent}
                </>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
