"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Check, User } from "lucide-react";
import { nepalBoardMembers, usBoardMembers } from "@/components/teamData";

interface Member {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export default function TeamMemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 1. Check boards first (synchronously available)
    const npMember = nepalBoardMembers.find((m) => m.id === id);
    if (npMember) {
      setMember(npMember);
      setLoading(false);
      return;
    }

    const usMember = usBoardMembers.find((m) => m.id === id);
    if (usMember) {
      setMember(usMember);
      setLoading(false);
      return;
    }

    // 2. Fetch teamData.json for staff
    fetch("/teamData.json")
      .then((res) => res.json())
      .then((data) => {
        const staffMember = data.find((m: any) => m.id === id);
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
        <p className="text-body-gray font-light mb-8">
          The team member profile you are looking for does not exist or has been removed.
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

  return (
    <div className="mx-auto max-w-4xl w-full px-6 sm:px-8 py-16 flex flex-col flex-1 bg-white animate-in fade-in duration-300">
      
      {/* Back navigation: Bold pink arrow button per PDF Page 5 */}
      <div className="mb-10">
        <Link
          href="/get-involved/our-team"
          className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary-pink text-white shadow-sm hover:bg-primary-pink/90 hover:scale-105 transition-all shrink-0 cursor-pointer"
          aria-label="Back to team roster"
        >
          <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
        </Link>
      </div>

      {/* Profile Detail Block: Outer outline removed per PDF Page 5 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start bg-zinc-50 p-8 sm:p-10 rounded-3xl shadow-xs">
        
        {/* Profile Image & Share (cols 1-4) */}
        <div className="md:col-span-4 flex flex-col items-center gap-6">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-md bg-zinc-100 shrink-0">
            <Image
              src={member.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80"}
              alt={member.name}
              fill
              className="object-cover"
              sizes="192px"
            />
          </div>

          {/* Share Profile button: Pink background & 'Share Profile' per PDF Page 4 */}
          <button
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-pink hover:bg-primary-pink/90 text-white px-5 py-2.5 font-equip font-semibold text-[13px] shadow-sm hover:shadow-md transition-all w-full cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-white" />
                <span className="text-white font-semibold">Copied!</span>
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
          <div className="space-y-2 border-b border-zinc-200/60 pb-4">
            <h1 className="text-3xl font-bold text-zinc-950 tracking-wide uppercase leading-tight">
              {member.name}
            </h1>
            <p className="text-[16px] sm:text-[18px] text-primary-pink font-medium tracking-wide">
              {member.role}
            </p>
          </div>

          {/* Bio text with 'Biography' header removed per PDF Page 5 */}
          <div className="space-y-4">
            <p className="text-body text-zinc-700 leading-relaxed font-light text-justify sm:text-left whitespace-pre-line text-[16px] sm:text-[17px]">
              {member.bio}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
