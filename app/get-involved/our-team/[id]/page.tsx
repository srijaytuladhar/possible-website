"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, User, Share2, Check } from "lucide-react";
import { allTeamMembers } from "@/components/teamData";

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
        // Fallback to clipboard if native share dialog is dismissed
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
        <p className="text-zinc-600 mb-6 font-light">The requested team member profile could not be located.</p>
        <Link
          href="/get-involved/our-team"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-pink text-white hover:bg-primary-pink/90 transition-all shadow-sm"
          aria-label="Back to Team"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white py-12 sm:py-16 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Bar - Pink Circular Back Arrow Button */}
        <div className="flex items-center justify-start mb-8">
          <Link
            href="/get-involved/our-team"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-pink text-white hover:bg-primary-pink/90 hover:scale-105 active:scale-95 transition-all shadow-xs"
            aria-label="Back to Team"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </Link>
        </div>

        {/* Profile Content Layout */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          {/* Left Column: Photo */}
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200/80 shadow-md shrink-0">
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

          {/* Right Column: Name, Position, Actions, & Bio */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950">
                {member.name}
              </h1>
              <p className="text-base sm:text-lg text-primary-pink font-medium mt-1">
                {member.role}
              </p>

              {/* Both Action Buttons directly below position in 1 line */}
              <div className="flex items-center gap-2.5 mt-3 flex-wrap">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-[#0A66C2] text-zinc-700 hover:text-white text-xs font-semibold transition-all duration-200"
                    aria-label={`${member.name}'s LinkedIn Profile`}
                  >
                    <svg
                      className="w-3.5 h-3.5 fill-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    <span>Visit on LinkedIn</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={handleShare}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer text-xs font-semibold shadow-2xs ${
                    copied
                      ? "bg-primary-pink border-primary-pink text-white shadow-md ring-2 ring-primary-pink/20 scale-105"
                      : "border-zinc-300 text-zinc-800 bg-zinc-50 hover:bg-primary-pink hover:border-primary-pink hover:text-white"
                  }`}
                  aria-label="Share profile"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Profile</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100">
              <p className="text-zinc-700 font-light leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {member.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}