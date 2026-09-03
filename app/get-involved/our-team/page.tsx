"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { nepalBoardMembers, usBoardMembers } from "@/components/teamData";

function TeamPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "nepal-board";

  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [imageFallbacks, setImageFallbacks] = useState<Record<string, string>>({});
  const isFirstMount = useRef(true);

  useEffect(() => {
    fetch('/teamData.json')
      .then(res => res.json())
      .then(data => {
        // Exclude specific US board members from the primary staff list to avoid duplication
        const staff = data.filter((m: any) => m.id !== "34" && m.id !== "26" && m.id !== "30");
        setTeamMembers(staff);
      })
      .catch(err => console.error("Error loading team data:", err));
  }, []);

  // Smooth scroll handler on tab change (skipping initial page mount)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const element = document.getElementById("team-tabs");
    if (element) {
      // Small timeout to allow Next.js state update/render to register
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [tabParam]);

  const getMemberImage = (member: any) => {
    if (!member) return "";
    return imageFallbacks[member.id] || member.image;
  };

  const handleImageError = (memberId: string) => {
    setImageFallbacks(prev => ({
      ...prev,
      [memberId]: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80"
    }));
  };

  const getActiveMembers = () => {
    if (tabParam === "us-board") return usBoardMembers;
    if (tabParam === "nepal-board") return nepalBoardMembers;
    return teamMembers;
  };

  const activeMembers = getActiveMembers();

  const tabs = [
    { key: "nepal-board", label: "Shambhav (Possible) Board - Nepal" },
    { key: "us-board", label: "Possible Board - US" },
    { key: "team-members", label: "Team Members" }
  ];

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1">
      {/* Page Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <h1 className={`font-outfit text-3xl md:text-4xl font-extralight mb-3 uppercase tracking-wide transition-colors duration-300 ${tabParam === "team-members" ? "text-primary-pink" :
          tabParam === "us-board" ? "text-accent-purple" : "text-secondary-blue"
          }`}>
          {tabParam === "team-members" ? (
            <>Team <span className="font-semibold">Members</span></>
          ) : tabParam === "us-board" ? (
            <>Possible Board - <span className="font-semibold">US</span></>
          ) : (
            <>Sambhav (Possible) Board - <span className="font-semibold">Nepal</span></>
          )}
        </h1>
        <p className="text-subheading text-body-gray font-light" hidden>
          Meet the researchers, clinicians, and innovators co-designing care in Nepal.
        </p>
      </div>

      {/* Who We Are Intro */}
      <div hidden className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-50 p-8 sm:p-10 rounded-3xl border border-zinc-100 mb-12">
        <div className="lg:col-span-7 space-y-6">
          <p className="text-subheading text-zinc-900 leading-relaxed font-light">
            We are researchers and doers—health workers, clinicians, engineers, and advocates. Rooted in Nepal, we build and test innovations to strengthen healthcare delivery where it is needed most.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="border-l-2 border-secondary-blue pl-4">
              <h4 className="text-[14px] font-semibold text-zinc-900 uppercase tracking-wider">Co-Design</h4>
              <p className="text-[13px] text-body-gray font-light mt-1">Creating health models in partnership with local municipalities.</p>
            </div>
            <div className="border-l-2 border-primary-pink pl-4">
              <h4 className="text-[14px] font-semibold text-zinc-900 uppercase tracking-wider">Test</h4>
              <p className="text-[13px] text-body-gray font-light mt-1">Evaluating clinical effectiveness through strict research trials.</p>
            </div>
            <div className="border-l-2 border-accent-purple pl-4">
              <h4 className="text-[14px] font-semibold text-zinc-900 uppercase tracking-wider">Scale</h4>
              <p className="text-[13px] text-body-gray font-light mt-1">Transitioning validated protocols into government networks.</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl border border-zinc-200 shadow-sm bg-zinc-100">
          <Image
            src="/about_team.png"
            alt="Possible Team Collaborating"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
      </div>

      {/* Tabs Banner (No overflow-hidden so the indicator arrow shows, and custom highlights to easily distinguish active/inactive tabs) */}
      <div id="team-tabs" className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row shadow-sm mb-16 rounded-lg border border-zinc-200 scroll-mt-24 bg-white relative">
        <button
          onClick={() => router.push("/get-involved/our-team?tab=nepal-board", { scroll: false })}
          className={`flex-1 py-5 text-center uppercase text-[12.5px] font-bold tracking-wider transition-all relative cursor-pointer rounded-t-lg sm:rounded-tr-none sm:rounded-l-lg ${tabParam === "nepal-board"
            ? "bg-secondary-blue text-white shadow-inner"
            : "bg-white text-secondary-blue border-b sm:border-b-0 sm:border-r border-zinc-200 hover:bg-zinc-50/80"
            }`}
        >
          Sambhav (Possible) Board - Nepal
          {tabParam === "nepal-board" && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-secondary-blue z-10 animate-in fade-in duration-200" />
          )}
        </button>
        <button
          onClick={() => router.push("/get-involved/our-team?tab=us-board", { scroll: false })}
          className={`flex-1 py-5 text-center uppercase text-[12.5px] font-bold tracking-wider transition-all relative cursor-pointer ${tabParam === "us-board"
            ? "bg-accent-purple text-white shadow-inner"
            : "bg-white text-accent-purple border-b sm:border-b-0 sm:border-r border-zinc-200 hover:bg-zinc-50/80"
            }`}
        >
          Possible Board - US
          {tabParam === "us-board" && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-accent-purple z-10 animate-in fade-in duration-200" />
          )}
        </button>
        <button
          onClick={() => router.push("/get-involved/our-team?tab=team-members", { scroll: false })}
          className={`flex-1 py-5 text-center uppercase text-[12.5px] font-bold tracking-wider transition-all relative cursor-pointer rounded-b-lg sm:rounded-bl-none sm:rounded-r-lg ${tabParam === "team-members"
            ? "bg-primary-pink text-white shadow-inner"
            : "bg-white text-primary-pink hover:bg-zinc-50/80"
            }`}
        >
          Team Members
          {tabParam === "team-members" && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-primary-pink z-10 animate-in fade-in duration-200" />
          )}
        </button>
      </div>

      <div className="space-y-16 animate-in fade-in duration-300">
        {/* Team Roster Grid (3 columns per row for consistency) */}
        <div className="space-y-8">
          <div className="text-center" hidden>
            <h2 className="text-2xl font-light text-zinc-950 uppercase tracking-wider">
              {tabs.find(t => t.key === tabParam)?.label}
            </h2>
            <div className="h-0.5 w-16 bg-primary-pink mx-auto mt-3 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {activeMembers.map((member) => (
              <Link
                key={member.id}
                href={`/get-involved/our-team/${member.id}`}
                className="group relative flex flex-col items-center p-6 bg-white rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden h-[320px] cursor-pointer"
              >
                {/* Default Card View */}
                <div className="flex flex-col items-center h-full justify-center transition-all duration-300 group-hover:scale-95">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-zinc-50 shadow-sm transition-all duration-300 group-hover:border-primary-pink/20 mb-4 bg-zinc-100">
                    <Image
                      src={getMemberImage(member)}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 160px, 160px"
                      onError={() => handleImageError(member.id)}
                    />
                  </div>
                  <h4 className="text-[17px] font-outfit font-semibold text-zinc-900 text-center line-clamp-1">
                    {member.name}
                  </h4>
                  <p className="text-[13px] font-outfit text-body-gray font-light text-center mt-1 line-clamp-1">
                    {member.role}
                  </p>
                  <span className="mt-3 text-[11px] font-outfit font-medium text-secondary-blue">
                    Hover for bio &rarr;
                  </span>
                </div>

                {/* Hover Details Overlay */}
                <div className={`absolute inset-0 p-5 flex flex-col justify-center items-center text-white opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 rounded-2xl ${tabParam === "team-members" ? "bg-primary-pink/95" :
                  tabParam === "us-board" ? "bg-accent-purple/95" : "bg-secondary-blue/95"
                  }`}>
                  <h4 className="text-[14px] font-bold text-center mb-0.5 line-clamp-1">
                    {member.name}
                  </h4>
                  <span className="text-[10px] text-white/80 uppercase tracking-wider font-semibold text-center mb-2 line-clamp-1">
                    {member.role}
                  </span>
                  <div className="w-8 h-[1px] bg-white/30 mb-2 shrink-0"></div>
                  <p className="text-[11px] leading-relaxed text-center font-light line-clamp-[5] text-white/90 mb-3">
                    {member.bio}
                  </p>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white transition-all">
                    View Profile & Share &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
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
