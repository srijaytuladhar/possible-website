"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText, ArrowLeft, ExternalLink, Sparkles } from "lucide-react";

export interface PublicationType {
  title: string;
  link: string;
  doi?: string;
  journal?: string;
}

export interface SolutionBoxType {
  id?: string;
  title: string;
  subtitle?: string;
  description: string | string[];
  image?: string;
  badge?: string;
  linkText?: string;
  linkUrl?: string;
  publications?: PublicationType[];
}

export interface SolutionSubSectionType {
  subSectionId?: string;
  subSectionTitle: string;
  subSectionSubtitle?: string;
  projects: SolutionBoxType[];
}

interface SolutionStageTemplateProps {
  stageId: "innovate" | "test" | "scale" | "pipeline";
  stageNumber: string;
  stageName: string;
  stageSubtitle: string;
  colorClass: string;
  badgeBgClass: string;
  borderClass: string;
  subSections?: SolutionSubSectionType[];
  projects?: SolutionBoxType[];
}

export default function SolutionStageTemplate({
  stageId,
  stageNumber,
  stageName,
  stageSubtitle,
  colorClass,
  badgeBgClass,
  borderClass,
  subSections,
  projects
}: SolutionStageTemplateProps) {
  const stages = [
    { id: "innovate", label: "Innovate", href: "/solutions/innovate", image: "/health_process.jpg" },
    { id: "test", label: "Test", href: "/solutions/test", image: "/who_we_are_team.jpg" },
    { id: "scale", label: "Scale", href: "/solutions/scale", image: "/hero_complex_solve.jpg" },
    { id: "pipeline", label: "Pipeline", href: "/solutions/pipeline", image: "/hero_digital.png" }
  ];

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1 bg-white animate-in fade-in duration-300">
      
      {/* Top Left Navigation Back & Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-zinc-200 hover:border-zinc-300 text-zinc-500 hover:text-zinc-800 transition-colors bg-white shrink-0"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <span className={`inline-flex items-center rounded-full ${badgeBgClass} ${colorClass} px-4 py-1.5 text-[12.5px] font-bold uppercase tracking-wider shadow-sm`}>
            {stageNumber}. {stageName}
          </span>
        </div>

        {/* Back to all solutions */}
        <Link
          href="/solutions"
          className="inline-flex items-center gap-1.5 font-equip text-[14px] font-semibold text-zinc-600 hover:text-primary-pink transition-colors"
        >
          <span>All Solutions Overview</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Stage Progress Indicator */}
      <div className="mb-14 bg-zinc-50/80 border border-zinc-150 p-6 sm:p-8 rounded-3xl flex flex-col items-center">
        <span className="text-[14px] sm:text-[16px] font-extrabold text-zinc-800 uppercase tracking-wider mb-6">
          Development Lifecycle Stage
        </span>
        <div className="flex items-center justify-center w-full max-w-3xl">
          {stages.map((st, index) => {
            const isActive = stageId === st.id;
            const isLast = index === stages.length - 1;
            
            const getStageColors = (id: string) => {
              if (id === "innovate") {
                return {
                  circle: "border-primary-pink shadow-lg shadow-primary-pink/20 ring-4 ring-primary-pink/15 w-20 h-20 sm:w-24 sm:h-24",
                  label: "text-primary-pink font-bold"
                };
              }
              if (id === "test") {
                return {
                  circle: "border-secondary-blue shadow-lg shadow-secondary-blue/20 ring-4 ring-secondary-blue/15 w-20 h-20 sm:w-24 sm:h-24",
                  label: "text-secondary-blue font-bold"
                };
              }
              if (id === "scale") {
                return {
                  circle: "border-accent-purple shadow-lg shadow-accent-purple/20 ring-4 ring-accent-purple/15 w-20 h-20 sm:w-24 sm:h-24",
                  label: "text-accent-purple font-bold"
                };
              }
              return {
                circle: "border-amber-600 shadow-lg shadow-amber-600/20 ring-4 ring-amber-500/15 w-20 h-20 sm:w-24 sm:h-24",
                label: "text-amber-600 font-bold"
              };
            };

            const colors = getStageColors(st.id);

            return (
              <div key={st.id} className="flex items-center flex-1 last:flex-initial">
                {/* Circle */}
                <Link
                  href={st.href}
                  className="flex flex-col items-center justify-center transition-all duration-300 relative group"
                >
                  <div
                    className={`rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden relative border-2 ${
                      isActive
                        ? `${colors.circle} border-current`
                        : "bg-zinc-200 border-zinc-300 w-14 h-14 sm:w-16 sm:h-16 hover:bg-zinc-300 hover:border-zinc-400"
                    }`}
                  >
                    <Image
                      src={st.image}
                      alt={st.label}
                      fill
                      className={`object-cover transition-all duration-300 ${
                        isActive ? "scale-105 opacity-100 saturate-100" : "opacity-60 saturate-50 group-hover:opacity-100 group-hover:scale-105 group-hover:saturate-100"
                      }`}
                    />
                  </div>
                  <span
                    className={`mt-2 font-equip text-[11px] sm:text-[12px] uppercase tracking-wider transition-colors ${
                      isActive ? colors.label : "text-zinc-400 group-hover:text-zinc-600 font-medium"
                    }`}
                  >
                    {st.label}
                  </span>
                </Link>

                {/* Arrow connector */}
                {!isLast && (
                  <div className="flex-1 flex justify-center items-center px-2 sm:px-4">
                    <div className="h-[2px] w-full bg-zinc-200 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-zinc-300 rotate-45" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Stage Intro Sticky Header */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
          <div className="space-y-3">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase ${colorClass}`}>
              <Sparkles className="h-3.5 w-3.5" /> Stage {stageNumber}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extralight uppercase tracking-wide leading-tight text-zinc-950">
              {stageName}
            </h1>
          </div>
          <div className={`h-1.5 w-20 rounded-full bg-current ${colorClass}`} />
          <p className="text-body text-body-gray leading-relaxed font-light text-justify sm:text-left">
            {stageSubtitle}
          </p>

          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/70 space-y-3">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-zinc-800">
              Stage Highlights
            </h4>
            <p className="text-[13px] text-zinc-600 leading-relaxed font-light">
              Solutions developed within this stage engage directly with healthcare workers, affected families, and government partners to ensure sustainable institutionalization.
            </p>
          </div>
        </div>

        {/* Right Column: Solution Boxes List */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Subsections rendering if present (e.g. Test stage: 2.1 and 2.2) */}
          {subSections && subSections.length > 0 ? (
            subSections.map((sub, sIdx) => (
              <div key={sIdx} id={sub.subSectionId} className="space-y-8 scroll-mt-28">
                <div className="border-b border-zinc-200/80 pb-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 uppercase tracking-wide">
                    {sub.subSectionTitle}
                  </h2>
                  {sub.subSectionSubtitle && (
                    <p className="text-[14px] text-body-gray font-light mt-1">
                      {sub.subSectionSubtitle}
                    </p>
                  )}
                </div>

                <div className="space-y-8">
                  {sub.projects.map((proj, pIdx) => (
                    <SolutionBoxItem
                      key={pIdx}
                      project={proj}
                      colorClass={colorClass}
                      borderClass={borderClass}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            /* Flat projects rendering (Innovate, Scale, Pipeline) */
            <div className="space-y-8">
              {projects?.map((proj, pIdx) => (
                <SolutionBoxItem
                  key={pIdx}
                  project={proj}
                  colorClass={colorClass}
                  borderClass={borderClass}
                />
              ))}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

/* Individual Solution Box Component matching the Whiteboard format */
function SolutionBoxItem({
  project,
  colorClass,
  borderClass
}: {
  project: SolutionBoxType;
  colorClass: string;
  borderClass: string;
}) {
  const paragraphs = Array.isArray(project.description)
    ? project.description
    : project.description.split("\n\n");

  return (
    <div
      id={project.id}
      className={`p-6 sm:p-8 bg-white border ${borderClass} rounded-3xl shadow-xs hover:shadow-md transition-all duration-300 space-y-6 scroll-mt-28`}
    >
      {/* Box Header: Subtitle & Title */}
      <div className="border-b border-zinc-100 pb-4 space-y-1">
        {project.subtitle && (
          <span className={`text-[12.5px] font-bold uppercase tracking-wider block ${colorClass}`}>
            {project.subtitle}
          </span>
        )}
        <h3 className="h3-card font-bold text-zinc-950 uppercase leading-snug">
          {project.title}
        </h3>
      </div>

      {/* Optional Project Image */}
      {project.image && (
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-zinc-200 shadow-inner bg-zinc-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
        </div>
      )}

      {/* Description Paragraphs */}
      <div className="space-y-3">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-body text-body-gray leading-relaxed font-light text-justify sm:text-left">
            {para}
          </p>
        ))}
      </div>

      {/* CTA Link if specified */}
      {project.linkUrl && (
        <div className="pt-1">
          <a
            href={project.linkUrl}
            className={`inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 px-5 py-2.5 font-equip font-semibold text-[13.5px] text-zinc-800 transition-all duration-300 group hover:border-current ${colorClass}`}
          >
            <span>{project.linkText || "Explore Details"}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      )}

      {/* Read More (Not clickable header) / Publications List */}
      {project.publications && project.publications.length > 0 && (
        <div className="pt-4 border-t border-zinc-100 space-y-3">
          {/* Non-clickable header specified in Whiteboard */}
          <span className="text-[13px] font-bold uppercase tracking-wider text-zinc-800 select-none block">
            Learn More:
          </span>

          <ul className="space-y-2.5 pl-1">
            {project.publications.map((pub, idx) => (
              <li key={idx} className="flex gap-3 items-start group">
                <div className={`p-1.5 rounded-md bg-zinc-100 shrink-0 mt-0.5 group-hover:bg-primary-pink/10 transition-colors ${colorClass}`}>
                  <FileText className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1">
                  <a
                    href={pub.link}
                    target={pub.link.startsWith("http") ? "_blank" : "_self"}
                    rel={pub.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-[13.5px] font-medium text-zinc-800 hover:text-primary-pink transition-colors leading-relaxed inline-flex items-start gap-1"
                  >
                    <span>{idx + 1}. {pub.title}</span>
                    {pub.link.startsWith("http") && (
                      <ExternalLink className="h-3 w-3 shrink-0 mt-1 opacity-60 group-hover:opacity-100" />
                    )}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
