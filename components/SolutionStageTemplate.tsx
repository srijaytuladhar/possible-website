"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText, ArrowLeft } from "lucide-react";

export interface ProjectType {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  linkText: string;
  linkUrl: string;
}

export interface PublicationType {
  title: string;
  journal?: string;
  link: string;
}

interface SolutionStageTemplateProps {
  stageId: "innovate" | "test" | "scale" | "pipeline";
  stageName: string;
  stageSubtitle: string;
  colorClass: string;
  badgeBgClass: string;
  project: ProjectType;
  publications: PublicationType[];
}

export default function SolutionStageTemplate({
  stageId,
  stageName,
  stageSubtitle,
  colorClass,
  badgeBgClass,
  project,
  publications
}: SolutionStageTemplateProps) {
  // 3-circle stage configuration
  const stages = [
    { id: "innovate", label: "Innovate", href: "/solutions/innovate", image: "/health_process.jpg" },
    { id: "test", label: "Test", href: "/solutions/test", image: "/who_we_are_team.jpg" },
    { id: "scale", label: "Scale", href: "/solutions/scale", image: "/hero_complex_solve.jpg" }
  ];

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1 bg-white animate-in fade-in duration-300">
      
      {/* Top Left Navigation Back & Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-zinc-200 hover:border-zinc-300 text-zinc-500 hover:text-zinc-800 transition-colors bg-white shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <span className={`inline-flex items-center rounded-full ${badgeBgClass} ${colorClass} px-4 py-1.5 text-[12.5px] font-bold uppercase tracking-wider shadow-sm`}>
            {stageName}
          </span>
        </div>

        {/* Back to all solutions */}
        <Link
          href="/solutions"
          className="inline-flex items-center gap-1.5 font-equip text-[14px] font-semibold text-zinc-500 hover:text-primary-pink transition-colors"
        >
          <span>All Solutions</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Stage Progress Indicator */}
      <div className="mb-16 bg-zinc-50 border border-zinc-100 p-8 rounded-3xl flex flex-col items-center">
        <span className="text-[16px] font-extrabold text-zinc-800 uppercase tracking-wider mb-8 sm:text-[18px]">
          Development Lifecycle Progress
        </span>
        <div className="flex items-center justify-center w-full max-w-2xl">
          {stages.map((st, index) => {
            const isActive = stageId === st.id;
            const isLast = index === stages.length - 1;
            
            const getStageColors = (id: string) => {
              if (id === "innovate") {
                return {
                  circle: "border-primary-pink shadow-lg shadow-primary-pink/25 w-16 h-16",
                  label: "text-primary-pink"
                };
              }
              if (id === "test") {
                return {
                  circle: "border-secondary-blue shadow-lg shadow-secondary-blue/25 w-16 h-16",
                  label: "text-secondary-blue"
                };
              }
              if (id === "scale") {
                return {
                  circle: "border-accent-purple shadow-lg shadow-accent-purple/25 w-16 h-16",
                  label: "text-accent-purple"
                };
              }
              return {
                circle: "border-zinc-800 shadow-lg w-16 h-16",
                label: "text-zinc-800"
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
                        : "bg-zinc-200 border-zinc-300 w-12 h-12 hover:bg-zinc-300 hover:border-zinc-400"
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
                    className={`absolute -bottom-6 font-equip text-[12px] uppercase tracking-wider font-bold transition-colors ${
                      isActive ? colors.label : "text-zinc-400 group-hover:text-zinc-600"
                    }`}
                  >
                    {st.label}
                  </span>
                </Link>

                {/* Arrow connector */}
                {!isLast && (
                  <div className="flex-1 flex justify-center items-center px-4">
                    <div className="h-[2px] w-full bg-zinc-200 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-zinc-300 rotate-45" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {stageId === "pipeline" && (
          <div className="mt-8 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[12px] font-semibold uppercase tracking-wider animate-pulse">
            Currently Viewing Exploratory Pipeline Stage
          </div>
        )}
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Stage Intro */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className={`text-4xl font-extralight uppercase tracking-wide leading-tight ${colorClass}`}>
            {stageName}
          </h2>
          <div className={`h-1.5 w-16 bg-current rounded-full ${colorClass}`} />
          <p className="text-body text-body-gray leading-relaxed font-light text-justify sm:text-left">
            {stageSubtitle}
          </p>
        </div>

        {/* Right Column: Featured Project & Publications */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Featured Project Block */}
          <div className="p-8 bg-zinc-50 border border-zinc-150 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 space-y-6">
            <div className="border-b border-zinc-200/60 pb-4">
              <span className={`text-[12px] font-bold uppercase tracking-widest ${colorClass}`}>
                {project.subtitle}
              </span>
              <h3 className="h3-card font-bold text-zinc-900 uppercase mt-1">
                {project.title}
              </h3>
            </div>

            {/* Project Image */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-zinc-200 shadow-inner bg-zinc-100">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>

            <p className="text-body text-body-gray leading-relaxed font-light">
              {project.description}
            </p>

            <div className="pt-2">
              <a
                href={project.linkUrl}
                className={`inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 px-6 py-3 font-equip font-semibold text-[14px] text-zinc-800 transition-all duration-300 group hover:border-current ${colorClass}`}
              >
                <span>{project.linkText}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Publications Section */}
          {publications.length > 0 && (
            <div className="space-y-6 pt-4">
              <div className="border-b border-zinc-100 pb-3">
                <h4 className="text-[16px] font-bold text-zinc-900 uppercase tracking-wider">
                  Related Research & Publications
                </h4>
              </div>
              <ul className="space-y-4">
                {publications.map((pub, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className={`p-2 rounded-lg bg-zinc-100 shrink-0 ${colorClass} bg-opacity-10`}>
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[15px] font-semibold text-zinc-900 hover:text-primary-pink transition-colors leading-snug block"
                      >
                        {pub.title}
                      </a>
                      {pub.journal && (
                        <span className="text-[12px] text-zinc-400 block mt-1 font-light italic">
                          Published in: {pub.journal}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
