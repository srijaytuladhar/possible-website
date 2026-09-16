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
      className={`bg-white border border-zinc-200/80 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${colorClasses.border} group cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-primary-pink/30`}
    >
      <div className="space-y-4">
        {/* Photo Container */}
        <div className="relative w-full aspect-[4/3.4] rounded-2xl overflow-hidden border border-zinc-100 bg-zinc-100 flex items-center justify-center">
          {member.image && !imgError ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-103"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-zinc-400 p-4">
              <User className="h-14 w-14 stroke-[1.2]" />
              <span className="text-[11px] font-medium text-zinc-400 mt-2 uppercase tracking-wider">Possible</span>
            </div>
          )}
        </div>

        {/* Name and Role Only */}
        <div className="space-y-1 pt-1">
          <h3 className="text-xl font-bold font-outfit text-zinc-900 leading-snug group-hover:text-zinc-950">
            {member.name}
          </h3>
          <p className={`text-[13px] font-semibold tracking-wide uppercase ${colorClasses.role}`}>
            {member.role}
          </p>
        </div>
      </div>

      {/* Subtle "Read Bio" Action indicator */}
      <div className="pt-4 mt-3 border-t border-zinc-100 flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
        <span className="group-hover:text-zinc-900 transition-colors">Read Bio</span>
        <span className="p-1.5 rounded-full bg-zinc-100 text-zinc-600 group-hover:bg-zinc-900 group-hover:text-white transition-all">
          <ArrowUpRight className="h-3.5 w-3.5" />
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
  const tabParam = searchParams.get("tab") || "us-board";
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
    { key: "us-board", label: "Possible US Board", count: usBoardMembers.length, color: "purple" as const },
    { key: "nepal-board", label: "Nepal Board", count: nepalBoardMembers.length, color: "blue" as const },
    { key: "team-members", label: "Team Members", count: teamMembersData.length, color: "pink" as const }
  ];

  const getActiveMembers = () => {
    if (tabParam === "nepal-board") return { list: nepalBoardMembers, color: "blue" as const };
    if (tabParam === "team-members") return { list: teamMembersData, color: "pink" as const };
    return { list: usBoardMembers, color: "purple" as const };
  };

  const { list: activeMembers, color: activeColor } = getActiveMembers();

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 md:py-16 flex flex-col flex-1 bg-white">
      {/* Page Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h1 className="h1-hero text-zinc-950 uppercase tracking-wide mb-3">
          Our Team
        </h1>
        <div className="h-1 w-20 bg-primary-pink mx-auto mt-4 rounded-full" />
      </div>

      {/* Tabs Navigation in requested order: Possible US Board -> Nepal Board -> Team Members */}
      <div id="team-tabs" className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row shadow-xs mb-14 rounded-2xl border border-zinc-200 scroll-mt-24 bg-white relative overflow-hidden">
        <button
          onClick={() => router.push("/get-involved/our-team?tab=us-board", { scroll: false })}
          className={`flex-1 py-4.5 px-4 text-center uppercase text-[13px] font-bold tracking-wider transition-all relative cursor-pointer ${
            tabParam === "us-board"
              ? "bg-accent-purple text-white shadow-inner"
              : "bg-white text-accent-purple border-b sm:border-b-0 sm:border-r border-zinc-200 hover:bg-zinc-50"
          }`}
        >
          Possible US Board ({usBoardMembers.length})
        </button>

        <button
          onClick={() => router.push("/get-involved/our-team?tab=nepal-board", { scroll: false })}
          className={`flex-1 py-4.5 px-4 text-center uppercase text-[13px] font-bold tracking-wider transition-all relative cursor-pointer ${
            tabParam === "nepal-board"
              ? "bg-secondary-blue text-white shadow-inner"
              : "bg-white text-secondary-blue border-b sm:border-b-0 sm:border-r border-zinc-200 hover:bg-zinc-50"
          }`}
        >
          Nepal Board ({nepalBoardMembers.length})
        </button>

        <button
          onClick={() => router.push("/get-involved/our-team?tab=team-members", { scroll: false })}
          className={`flex-1 py-4.5 px-4 text-center uppercase text-[13px] font-bold tracking-wider transition-all relative cursor-pointer ${
            tabParam === "team-members"
              ? "bg-primary-pink text-white shadow-inner"
              : "bg-white text-primary-pink hover:bg-zinc-50"
          }`}
        >
          Team Members ({teamMembersData.length})
        </button>
      </div>

      {/* Active Section Title */}
      <div className="mb-10 text-center">
        <h2 className={`text-2xl sm:text-3xl font-light uppercase tracking-wide ${
          activeColor === "purple" ? "text-accent-purple font-medium" :
          activeColor === "blue" ? "text-secondary-blue font-medium" : "text-primary-pink font-medium"
        }`}>
          {tabs.find((t) => t.key === tabParam)?.label}
        </h2>
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
