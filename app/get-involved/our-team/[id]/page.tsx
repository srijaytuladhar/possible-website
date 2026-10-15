"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Check, User } from "lucide-react";
import { allTeamMembers, TeamMember } from "@/components/teamData";

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

export default function TeamMemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [member, setMember] = useState<ExtendedTeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const found = (allTeamMembers as ExtendedTeamMember[]).find((m) => m.id === id);
    if (found) {
      setMember(found);
      setLoading(false);
      return;
    }

    // Fallback search in teamData.json if custom ID
    fetch("/teamData.json")
      .then((res) => res.json())
      .then((data: ExtendedTeamMember[]) => {
        const staffMember = data.find((m) => m.id === id);
        if (staffMember) {
          setMember(staffMember);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading team member details:", err);
        setLoading(false);
      });
  }, [id]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white">
        <div className="w-10 h-10 border-4 border-primary-pink border-t-transparent rounded-full animate-spin"></div>
        <p className="text-zinc-500 font-light mt-4">Loading member details...</p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="mx-auto max-w-xl text-center py-20 px-6 bg-white">
        <div className="p-4 bg-red-50 text-red-500 rounded-full w-fit mx-auto mb-6">
          <User className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 mb-2">Member Not Found</h2>
        <p className="text-zinc-600 font-light mb-8">
          The team member profile you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/get-involved/our-team"
          className="inline-flex items-center gap-2 rounded-full bg-primary-pink px-6 py-3 font-semibold text-white shadow-md hover:bg-primary-pink/90 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Team Roster</span>
        </Link>
      </div>
    );
  }

  const paragraphs = member.bio.split("\n\n");

  return (
    <div className="mx-auto max-w-4xl w-full px-6 sm:px-8 py-12 sm:py-16 flex flex-col flex-1 bg-white animate-in fade-in duration-300">
      
      {/* Back Navigation */}
      <div className="mb-8">
        <Link
          href="/get-involved/our-team"
          className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary-pink text-white shadow-sm hover:bg-primary-pink/90 hover:scale-105 transition-all shrink-0 cursor-pointer"
          aria-label="Back to team roster"
        >
          <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
        </Link>
      </div>

      {/* Profile Detail Block */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start bg-zinc-50/80 border border-zinc-200/80 p-6 sm:p-10 rounded-3xl shadow-xs">
        
        {/* Profile Image & Share Button (cols 1-4) */}
        <div className="md:col-span-4 flex flex-col items-center gap-5 w-full">
          <div className="relative w-full max-w-[240px] aspect-square rounded-3xl overflow-hidden border-2 border-white shadow-md bg-zinc-100 shrink-0 flex items-center justify-center">
            {member.image && !imgError ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 240px, 280px"
                priority
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-zinc-400 p-4">
                <User className="h-16 w-16 stroke-1 text-zinc-400" />
                <span className="text-[11px] font-medium text-zinc-400 mt-1 uppercase tracking-wider">Possible</span>
              </div>
            )}
          </div>

          {/* Share Profile button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-pink hover:bg-primary-pink/90 text-white px-5 py-2.5 font-equip font-semibold text-[13px] shadow-sm hover:shadow-md transition-all w-full max-w-[240px] cursor-pointer active:scale-95"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-white" />
                <span className="text-white font-semibold">Copied Profile Link!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                <span>Share Profile</span>
              </>
            )}
          </button>
        </div>

        {/* Profile Details Content (cols 5-12) */}
        <div className="md:col-span-8 space-y-6">
          <div className="space-y-2 border-b border-zinc-200/80 pb-5">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-outfit text-zinc-950 tracking-tight leading-tight">
                {member.name}
              </h1>

              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s LinkedIn Profile`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white text-xs font-bold transition-all shrink-0"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>

            <p className="text-[15px] sm:text-[17px] text-primary-pink font-bold tracking-wider uppercase">
              {member.role}
            </p>
          </div>

          {/* Multi-paragraph bio text */}
          <div className="space-y-4">
            {paragraphs.map((para, pIdx) => (
              <p
                key={pIdx}
                className="text-zinc-700 leading-relaxed font-light text-justify sm:text-left text-[15.5px] sm:text-[16.5px]"
              >
                {para}
              </p>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}