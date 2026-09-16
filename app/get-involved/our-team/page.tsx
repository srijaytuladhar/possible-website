"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { User, ArrowUpRight } from "lucide-react";
import {
  usBoardMembers,
  nepalBoardMembers,
  teamMembersData,
  TeamMember
} from "@/components/teamData";

function TeamCard({
  member,
  themeColor
}: {
  member: TeamMember;
  themeColor: "pink" | "blue" | "purple";
}) {
  const [imgError, setImgError] = useState(false);
  const paragraphs = member.bio.split("\n\n");

  const colorClasses = {
    purple: {
      border: "hover:border-accent-purple/40",
      role: "text-accent-purple",
      badge: "bg-accent-purple/10 text-accent-purple",
      accent: "#782888"
    },
    blue: {
      border: "hover:border-secondary-blue/40",
      role: "text-secondary-blue",
      badge: "bg-secondary-blue/10 text-secondary-blue",
      accent: "#00BBE2"
    },
    pink: {
      border: "hover:border-primary-pink/40",
      role: "text-primary-pink",
      badge: "bg-primary-pink/10 text-primary-pink",
      accent: "#ED2E84"
    }
  }[themeColor];

  return (
    <div className={`bg-white border border-zinc-200/80 rounded-3xl p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 ${colorClasses.border} group relative`}>
      <div className="space-y-5">
        {/* Member Photo or Fallback Placeholder */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-zinc-100 shadow-xs bg-zinc-100 shrink-0 flex items-center justify-center group-hover:scale-102 transition-transform duration-300">
            {member.image && !imgError ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 112px, 112px"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-zinc-400 p-2">
                <User className="h-10 w-10 stroke-[1.5]" />
                <span className="text-[10px] font-medium text-zinc-400 mt-1 uppercase tracking-wider">Possible</span>
              </div>
            )}
          </div>

          <Link
            href={`/get-involved/our-team/${member.id}`}
            className="p-2.5 rounded-full bg-zinc-50 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors shrink-0"
            aria-label={`View ${member.name} profile`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Name & Title */}
        <div className="space-y-1.5 border-b border-zinc-100 pb-3">
          <h3 className="text-xl font-bold font-outfit text-zinc-900 leading-snug">
            {member.name}
          </h3>
          <p className={`text-[13.5px] font-semibold tracking-wide uppercase ${colorClasses.role}`}>
            {member.role}
          </p>
        </div>

        {/* Bio Text with preserved paragraph line breaks */}
        <div className="space-y-3 pt-1">
          {paragraphs.map((para, pIdx) => (
            <p
              key={pIdx}
              className="text-[14px] text-zinc-600 leading-relaxed font-light text-justify sm:text-left"
            >
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-6 mt-4 border-t border-zinc-100/80 flex items-center justify-between">
        <Link
          href={`/get-involved/our-team/${member.id}`}
          className={`text-[12.5px] font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1 ${colorClasses.role}`}
        >
          <span>View Profile & Share</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}

function TeamPageContent() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeMembers.map((member) => (
            <TeamCard
              key={member.id}
              member={member}
              themeColor={activeColor}
            />
          ))}
        </div>
      </div>
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
