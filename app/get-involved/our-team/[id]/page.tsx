"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, User, Share2, Check } from "lucide-react";
import { allTeamMembers } from "@/components/teamData";

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export default function TeamMemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const member = allTeamMembers.find((m) => m.id === resolvedParams.id);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareTitle = member ? `${member.name} - Possible` : "Possible Team";
    const shareText = member ? `Meet ${member.name}, ${member.role} at Possible.` : "";

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  if (!member) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto px-6">
        <h1 className="text-2xl font-bold text-zinc-950 mb-2">Team Member Not Found</h1>
        <p className="text-zinc-600 mb-6 font-light">The requested profile could not be located.</p>
        <Link
          href="/get-involved/our-team"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-pink text-white hover:bg-primary-pink/90 transition-all shadow-xs"
          aria-label="Back to Team"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white py-10 sm:py-14 px-6 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Pink Circular Back Arrow */}
        <div className="flex items-center justify-start mb-8">
          <Link
            href="/get-involved/our-team"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary-pink text-white hover:bg-primary-pink/90 hover:scale-105 active:scale-95 transition-all shadow-md"
            aria-label="Back to Team"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </Link>
        </div>

        {/* Detail Layout */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          {/* Member Photo */}
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-[28px] overflow-hidden bg-zinc-100 border border-zinc-200/80 shadow-md shrink-0">
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-400">
                <User className="w-16 h-16" />
              </div>
            )}
          </div>

          {/* Member Info & Action Buttons */}
          <div className="flex-1 space-y-5 pt-1">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
                {member.name}
              </h1>
              <p className="text-lg sm:text-xl text-primary-pink font-semibold">
                {member.role}
              </p>

              {/* Action Toolbar with Icon-Only LinkedIn Link */}
              <div className="flex items-center gap-3 pt-2 flex-wrap">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#E8F0FE] hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white transition-all duration-200 shadow-2xs"
                    aria-label={`${member.name}'s LinkedIn Profile`}
                  >
                    <LinkedinIcon className="w-4 h-4 fill-current shrink-0" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={handleShare}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-300 bg-white text-zinc-800 text-sm font-semibold transition-all duration-200 cursor-pointer hover:bg-zinc-50 ${
                    copied ? "bg-emerald-50 border-emerald-500 text-emerald-700" : ""
                  }`}
                  aria-label="Share profile"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-zinc-700" />
                      <span>Share Profile</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Bio Section */}
            {member.bio && (
              <div className="pt-5 border-t border-zinc-200/80">
                <p className="text-zinc-700 font-light leading-relaxed whitespace-pre-line text-base sm:text-[17px]">
                  {member.bio}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}