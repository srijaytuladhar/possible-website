"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { User, ArrowUpRight, X } from "lucide-react";
import {
  usBoardMembers,
  nepalBoardMembers,
  teamMembersData,
  TeamMember
} from "@/components/teamData";

export interface ExtendedTeamMember extends TeamMember {
  linkedin?: string;
}

// Inline SVG component for LinkedIn icon
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function TeamCard({
  member,
  themeColor,
  onClick
}: {
  member: ExtendedTeamMember;
  themeColor: "pink" | "blue" | "purple";
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  const colorClasses = {
    purple: {
      border: "hover:border-accent-purple/50",
      role: "text-accent-purple",
      btn: "group-hover:bg-accent-purple group-hover:text-white",
      hoverText: "group-hover:text-accent-purple"
    },
    blue: {
      border: "hover:border-secondary-blue/50",
      role: "text-secondary-blue",
      btn: "group-hover:bg-secondary-blue group-hover:text-white",
      hoverText: "group-hover:text-secondary-blue"
    },
    pink: {
      border: "hover:border-primary-pink/50",
      role: "text-primary-pink",
      btn: "group-hover:bg-primary-pink group-hover:text-white",
      hoverText: "group-hover:text-primary-pink"
    }
  }[themeColor];

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`bg-white border border-zinc-200/80 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${colorClasses.border} group cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-primary-pink/30 space-y-5`}
    >
      {/* 1. Large Top Photo Frame */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-zinc-150 bg-zinc-100 flex items-center justify-center shadow-2xs">
        {member.image && !imgError ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-zinc-400 p-4">
            <User className="h-16 w-16 stroke-[1.2]" />
            <span className="text-xs font-medium text-zinc-400 mt-2 uppercase tracking-wider">Possible</span>
          </div>
        )}

        {/* Floating LinkedIn Button on Top Right */}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${member.name}'s LinkedIn Profile`}
            className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 backdrop-blur-md text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white shadow-md transition-all duration-200 z-10"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        )}
      </div>

      {/* 2. Text Details: Name, Position, and Arrow Icon */}
      <div className="flex items-end justify-between gap-3 pt-1">
        <div className="space-y-1 flex-1">
          {/* Name First */}
          <h3 className={`text-lg sm:text-xl font-bold font-outfit text-zinc-950 leading-snug transition-colors ${colorClasses.hoverText}`}>
            {member.name}
          </h3>

          {/* Position / Role Second */}
          <p className={`text-[12px] sm:text-[13px] font-semibold tracking-wider uppercase ${colorClasses.role}`}>
            {member.role}
          </p>
        </div>

        {/* Action Arrow Icon */}
        <span className={`p-2.5 rounded-full bg-zinc-100 text-zinc-400 ${colorClasses.btn} transition-all duration-200 shrink-0`}>
          <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />
        </span>
      </div>
    </div>
  );
}

function MemberBioModal({
  member,
  themeColor,
  onClose
}: {
  member: ExtendedTeamMember | null;
  themeColor: "pink" | "blue" | "purple";
  onClose: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!member) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [member, onClose]);

  if (!member) return null;

  const paragraphs = member.bio.split("\n\n");

  const colorClasses = {
    purple: { role: "text-accent-purple" },
    blue: { role: "text-secondary-blue" },
    pink: { role: "text-primary-pink" }
  }[themeColor];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 flex items-start justify-between border-b border-zinc-100 gap-4">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-zinc-150 bg-zinc-100 shrink-0 shadow-xs">
              {member.image && !imgError ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                  <User className="h-10 w-10 stroke-[1.5]" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-zinc-950 leading-tight">
                  {member.name}
                </h2>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s LinkedIn Profile`}
                    className="inline-flex items-center justify-center p-1.5 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all shrink-0"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                )}
              </div>
              <p className={`text-[13.5px] font-semibold tracking-wide uppercase mt-1 ${colorClasses.role}`}>
                {member.role}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 flex-1">
          {paragraphs.map((para, pIdx) => (
            <p
              key={pIdx}
              className="text-[15px] sm:text-[15.5px] text-zinc-700 leading-relaxed font-light text-justify sm:text-left"
            >
              {para}
            </p>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-8 sm:py-5 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between gap-4">
          <Link
            href={`/get-involved/our-team/${member.id}`}
            className="text-[13px] font-semibold text-zinc-700 hover:text-primary-pink inline-flex items-center gap-1 transition-colors"
          >
            <span>View Full Profile Page</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-semibold text-[13px] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function TeamPageContent() {
  const [selectedMember, setSelectedMember] = useState<ExtendedTeamMember | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "team-members";
  const isFirstMount = useRef(true);

  // Smooth scroll handler on tab change
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const element = document.getElementById("team-tabs");
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [tabParam]);

  const tabs = [
    {
      key: "team-members",
      label: "TEAM MEMBERS",
      title: "TEAM MEMBERS",
      colorHex: "#ED2E84",
      bgClass: "bg-primary-pink",
      activeColor: "pink" as const,
      list: teamMembersData
    },
    {
      key: "nepal-board",
      label: "SAMBHAV (POSSIBLE) BOARD – NEPAL",
      title: "SAMBHAV (POSSIBLE) BOARD – NEPAL",
      colorHex: "#00BBE2",
      bgClass: "bg-secondary-blue",
      activeColor: "blue" as const,
      list: nepalBoardMembers
    },
    {
      key: "us-board",
      label: "POSSIBLE BOARD – US",
      title: "POSSIBLE BOARD – US",
      colorHex: "#782888",
      bgClass: "bg-accent-purple",
      activeColor: "purple" as const,
      list: usBoardMembers
    }
  ];

  const currentTab = tabs.find((t) => t.key === tabParam) || tabs[0];
  const activeMembers = currentTab.list;
  const activeColor = currentTab.activeColor;

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 pt-0 pb-10 md:pb-14 flex flex-col flex-1 bg-white">

      {/* Top Banner Image */}
      <div className="w-full max-w-5xl mx-auto mb-0">
        <div className="relative w-full h-[250px] sm:h-[330px] md:h-[410px] rounded-t-3xl sm:rounded-t-[2rem] overflow-hidden shadow-xs">
          <Image
            src="/board.jpg"
            alt="Possible Team & Board"
            fill
            className="object-cover object-[center_22%]"
            priority
          />
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        </div>
      </div>

      {/* Tabs Menu Bar */}
      <div id="team-tabs" className="w-full max-w-5xl mx-auto mb-12 sm:mb-16 scroll-mt-28">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full shadow-xs">
          {tabs.map((tab) => {
            const isActive = tab.key === currentTab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => router.push(`/get-involved/our-team?tab=${tab.key}`, { scroll: false })}
                className={`relative py-4 sm:py-5 px-3 sm:px-4 text-center uppercase text-[13px] sm:text-[14px] md:text-[15px] font-bold tracking-wider text-white transition-all cursor-pointer select-none flex items-center justify-center ${tab.bgClass} ${
                  isActive
                    ? "brightness-100 z-10"
                    : "brightness-95 hover:brightness-105 opacity-95 hover:opacity-100"
                }`}
              >
                <span className="leading-snug">{tab.label}</span>

                {isActive && (
                  <span
                    className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[12px] border-x-transparent border-t-[10px] sm:border-x-[14px] sm:border-t-[12px] z-20 pointer-events-none"
                    style={{ borderTopColor: tab.colorHex }}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Team Cards Grid */}
      <div className="animate-in fade-in duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activeMembers.map((member) => (
            <TeamCard
              key={member.id}
              member={member}
              themeColor={activeColor}
              onClick={() => setSelectedMember(member)}
            />
          ))}
        </div>
      </div>

      {/* Interactive Bio Detail Modal */}
      <MemberBioModal
        member={selectedMember}
        themeColor={activeColor}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}

export default function OurTeamPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading team...</div>}>
      <TeamPageContent />
    </Suspense>
  );
}