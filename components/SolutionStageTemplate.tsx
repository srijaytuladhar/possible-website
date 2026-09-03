"use client";

import Link from "next/link";
import Image from "next/image";
import { FileText, ArrowLeft, ExternalLink } from "lucide-react";

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
  stageSubtitle?: string;
  colorClass: string;
  badgeBgClass: string;
  borderClass: string;
  subSections?: SolutionSubSectionType[];
  projects?: SolutionBoxType[];
}

export default function SolutionStageTemplate({
  stageId,
  stageName,
  colorClass,
  borderClass,
  subSections,
  projects
}: SolutionStageTemplateProps) {
  // Only 3 stages in progress indicator (Pipeline removed per PDF Page 3)
  const stages = [
    { id: "innovate", label: "Innovate", href: "/solutions/innovate", image: "/health_process.jpg" },
    { id: "test", label: "Test", href: "/solutions/test", image: "/who_we_are_team.jpg" },
    { id: "scale", label: "Scale", href: "/solutions/scale", image: "/hero_complex_solve.jpg" }
  ];

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1 bg-white animate-in fade-in duration-300">
      
      {/* Top Left Navigation Back (Pink circle button per PDF Page 3, All solutions hidden) */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary-pink text-white shadow-sm hover:bg-primary-pink/90 hover:scale-105 transition-all shrink-0 cursor-pointer"
          aria-label="Back to home"
        >
          <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
        </Link>
      </div>

      {/* Stage Progress Indicator (Larger circles, only 3 stages per PDF Page 3) */}
      <div className="mb-14 bg-zinc-50/80 border border-zinc-150 p-6 sm:p-8 rounded-3xl flex flex-col items-center w-full max-w-5xl mx-auto">
        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-zinc-900 text-center uppercase tracking-wide mb-8 max-w-4xl leading-relaxed">
          Our solutions move through these stages dynamically, guided by the novelty of the approach and the strength of validated evidence.
        </h2>
        <div className="flex items-center justify-center w-full max-w-3xl px-2 sm:px-6">
          {stages.map((st, index) => {
            const isActive = stageId === st.id;
            const isLast = index === stages.length - 1;
            
            const getStageColors = (id: string) => {
              if (id === "innovate") {
                return {
                  circle: "border-primary-pink shadow-lg shadow-primary-pink/20 ring-4 ring-primary-pink/15 w-24 h-24 sm:w-28 sm:h-28",
                  label: "text-primary-pink font-bold"
                };
              }
              if (id === "test") {
                return {
                  circle: "border-secondary-blue shadow-lg shadow-secondary-blue/20 ring-4 ring-secondary-blue/15 w-24 h-24 sm:w-28 sm:h-28",
                  label: "text-secondary-blue font-bold"
                };
              }
              return {
                circle: "border-accent-purple shadow-lg shadow-accent-purple/20 ring-4 ring-accent-purple/15 w-24 h-24 sm:w-28 sm:h-28",
                label: "text-accent-purple font-bold"
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
                        : "bg-zinc-200 border-zinc-300 w-18 h-18 sm:w-20 sm:h-20 hover:bg-zinc-300 hover:border-zinc-400"
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
                    className={`mt-2 font-equip text-[12px] sm:text-[13px] uppercase tracking-wider transition-colors ${
                      isActive ? colors.label : "text-zinc-400 group-hover:text-zinc-600 font-medium"
                    }`}
                  >
                    {st.label}
                  </span>
                </Link>

                {/* Pink Connecting Line without arrowhead per PDF Page 3 */}
                {!isLast && (
                  <div className="flex-1 flex justify-center items-center px-2 sm:px-6">
                    <div className="h-[3px] w-full bg-primary-pink rounded-full" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage Header without Stage badge and without description per PDF Page 3 & 4 */}
      <div className="max-w-4xl mx-auto w-full mb-12">
        <h1 className="text-3xl sm:text-4xl font-extralight uppercase tracking-wide leading-tight text-zinc-950">
          {stageName}
        </h1>
        <div className={`h-1.5 w-20 rounded-full bg-current ${colorClass} mt-3`} />
      </div>

      {/* Full-width Solutions Content Layout */}
      <div className="max-w-4xl mx-auto w-full space-y-16">
        {subSections && subSections.length > 0 ? (
          subSections.map((sub, sIdx) => (
            <div key={sIdx} id={sub.subSectionId} className="space-y-12 scroll-mt-28">
              <div className="border-b border-zinc-200 pb-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 uppercase tracking-wide">
                  {sub.subSectionTitle}
                </h2>
                {sub.subSectionSubtitle && (
                  <p className="text-[15px] text-body-gray font-light mt-1.5">
                    {sub.subSectionSubtitle}
                  </p>
                )}
              </div>

              <div className="space-y-14">
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
          <div className="space-y-14">
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
  );
}

/* Individual Full-Width Solution Item (Ordered: Heading -> Text -> Photo -> Learn More non-clickable header + list) */
function SolutionBoxItem({
  project,
  colorClass,
}: {
  project: SolutionBoxType;
  colorClass: string;
  borderClass?: string;
}) {
  const paragraphs = Array.isArray(project.description)
    ? project.description
    : project.description.split("\n\n");

  return (
    <div
      id={project.id}
      className="space-y-6 scroll-mt-28 pb-12 border-b border-zinc-200 last:border-b-0"
    >
      {/* 1. Heading: Subtitle & Title */}
      <div className="space-y-1 pb-2">
        <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 uppercase leading-snug">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="text-[15px] sm:text-[16px] text-zinc-600 font-medium leading-relaxed">
            {project.subtitle}
          </p>
        )}
      </div>

      {/* 2. Text / Description Paragraphs */}
      <div className="space-y-4">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-body text-zinc-700 leading-relaxed font-light text-justify sm:text-left text-[16px] sm:text-[17px]">
            {para}
          </p>
        ))}
      </div>

      {/* 3. Photo / Image */}
      {project.image && (
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-zinc-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
        </div>
      )}

      {/* 4. Non-clickable "Learn More" Publications Header & List per PDF Page 4 Item 4 */}
      {project.publications && project.publications.length > 0 && (
        <div className="pt-6 border-t border-zinc-100 space-y-4">
          <h4 className="text-[14px] font-bold uppercase tracking-wider text-zinc-900 select-none block">
            Learn More
          </h4>

          <ul className="space-y-3 pl-1">
            {project.publications.map((pub, idx) => (
              <li key={idx} className="flex gap-3 items-start group">
                <div className={`p-1.5 rounded-md bg-zinc-100 shrink-0 mt-0.5 group-hover:bg-primary-pink/10 transition-colors ${colorClass}`}>
                  <FileText className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <a
                    href={pub.link}
                    target={pub.link.startsWith("http") ? "_blank" : "_self"}
                    rel={pub.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-[14.5px] font-medium text-zinc-800 hover:text-primary-pink transition-colors leading-relaxed inline-flex items-start gap-1.5"
                  >
                    <span>{idx + 1}. {pub.title}</span>
                    {pub.link.startsWith("http") && (
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 mt-1 opacity-60 group-hover:opacity-100" />
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
