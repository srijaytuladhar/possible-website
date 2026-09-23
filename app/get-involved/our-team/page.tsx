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

function TeamCard({
  member,
  themeColor,
  onClick
}: {
  member: TeamMember;
  themeColor: "pink" | "blue" | "purple";
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  const colorClasses = {
    purple: {
      border: "hover:border-accent-purple/50",
      role: "text-accent-purple",
      badge: "bg-accent-purple/10 text-accent-purple",
      btn: "group-hover:bg-accent-purple group-hover:text-white"
    },
    blue: {
      border: "hover:border-secondary-blue/50",
      role: "text-secondary-blue",
      badge: "bg-secondary-blue/10 text-secondary-blue",
      btn: "group-hover:bg-secondary-blue group-hover:text-white"
    },
    pink: {
      border: "hover:border-primary-pink/50",
      role: "text-primary-pink",
      badge: "bg-primary-pink/10 text-primary-pink",
      btn: "group-hover:bg-primary-pink group-hover:text-white"
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
      className={`bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${colorClasses.border} group cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-primary-pink/30`}
    >
      <div className="space-y-4">
        {/* Top Row: Photo on left, Arrow button on right matching [IMG-08] */}
        <div className="flex items-start justify-between gap-4">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-zinc-100 bg-zinc-100 flex items-center justify-center shrink-0 shadow-2xs">
            {member.image && !imgError ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 96px, 96px"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-zinc-400 p-2">
                <User className="h-8 w-8 stroke-[1.2]" />
                <span className="text-[9px] font-medium text-zinc-400 mt-1 uppercase tracking-wider">Possible</span>
              </div>
            )}
          </div>

          <span className={`p-2.5 rounded-full bg-zinc-100 text-zinc-400 ${colorClasses.btn} transition-all duration-200 shrink-0 mt-1 mr-1`}>
            <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />
          </span>
        </div>

        {/* Name and Role Only */}
        <div className="space-y-1 pt-1">
          <h3 className="text-lg sm:text-xl font-bold font-outfit text-zinc-900 leading-snug group-hover:text-zinc-950">
            {member.name}
          </h3>
          <p className={`text-[12px] sm:text-[13px] font-semibold tracking-wider uppercase ${colorClasses.role}`}>
            {member.role}
          </p>
        </div>
      </div>
    </div>
  );
}

function MemberBioModal({
  member,
  themeColor,
  onClose
}: {
  member: TeamMember | null;
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
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-zinc-150 bg-zinc-100 shrink-0 shadow-xs">
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
                  <User className="h-8 w-8 stroke-[1.5]" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-zinc-950 leading-tight">
                {member.name}
              </h2>
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

        {/* Modal Body: Multi-paragraph Bio */}
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
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "team-members";
  const isFirstMount = useRef(true);

  // Smooth scroll handler on tab change (skipping initial mount)
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
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-10 md:py-14 flex flex-col flex-1 bg-white">

      {/* Tabs Menu Bar */}
      <div id="team-tabs" className="w-full max-w-5xl mx-auto mb-14 sm:mb-16 scroll-mt-28">
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

                {/* Downward pointing active arrow indicator */}
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
