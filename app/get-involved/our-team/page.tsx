"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import Image from "next/image";
import { Users, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

const nepalBoardMembers = [
  {
    id: "np-1",
    name: "Indira Basnett, MD, MPH",
    role: "Board Chair",
    image: "https://possiblehealth.org/wp-content/uploads/2021/11/Dr.-Indira.jpg",
    bio: "Dr. Indira Basnett serves as the Board Chair for Sambhav (Possible) Nepal. She has decades of experience in health systems and medical governance in Nepal."
  },
  {
    id: "np-2",
    name: "Meeta Sainju Pradhan, PhD",
    role: "Vice-Chair",
    image: "https://possiblehealth.org/wp-content/uploads/2021/06/Meeta.jpg",
    bio: "Dr. Meeta Sainju Pradhan serves as the Vice-Chair. She specializes in social science, developmental policy, and gender/equality research in healthcare access."
  },
  {
    id: "np-3",
    name: "Sushama Gautam",
    role: "Board Secretary",
    image: "https://possiblehealth.org/wp-content/uploads/2021/06/Sushama.jpg",
    bio: "Sushama Gautam is the Board Secretary. She oversees governance compliance and coordinates organizational development strategies."
  },
  {
    id: "np-4",
    name: "Rajesh Parajuli, FCA",
    role: "Board Treasurer",
    image: "https://possiblehealth.org/wp-content/uploads/2021/06/Rajesh.jpg",
    bio: "Rajesh Parajuli is a Fellow Chartered Accountant (FCA) and serves as the Board Treasurer, managing financial auditing controls and corporate governance."
  },
  {
    id: "np-5",
    name: "Prakash Nepali, LLM",
    role: "Board Member",
    image: "https://possiblehealth.org/wp-content/uploads/2021/06/Prakash.jpg",
    bio: "Prakash Nepali holds a Master of Laws (LLM) and serves as a Board Member, advising the organization on legal frameworks, human rights, and compliance."
  },
  {
    id: "np-6",
    name: "Manish Prasai, MBA",
    role: "Board Member",
    image: "https://possiblehealth.org/wp-content/uploads/2021/06/Manish.jpg",
    bio: "Manish Prasai serves as a Board Member. He brings business management expertise and strategic planning skills to the governance of Sambhav."
  },
  {
    id: "np-7",
    name: "Dewan Rai",
    role: "Board Member",
    image: "https://possiblehealth.org/wp-content/uploads/2022/10/Dewan-e1665413452132.jpg",
    bio: "Dewan Rai is a Board Member and veteran journalist who advises the organization on media communication and public advocacy."
  },
  {
    id: "np-8",
    name: "Parbata Acharya",
    role: "Board Member",
    image: "https://possiblehealth.org/wp-content/uploads/2024/09/Parwata-Acharya_headshot.jpeg",
    bio: "Parbata Acharya serves as a Board Member. She supports community engagement protocols and rural healthcare access models."
  },
  {
    id: "np-9",
    name: "Sita Mademba",
    role: "Board Member",
    image: "https://possiblehealth.org/wp-content/uploads/2024/09/Sita-Mademba.jpeg",
    bio: "Sita Mademba is a Board Member who coordinates community-led monitoring systems and public health advocacy."
  }
];

const usBoardMembers = [
  {
    id: "us-1",
    name: "Duncan Maru, MD, PhD",
    role: "Co-Founder & Board Member",
    image: "https://possiblehealth.org/wp-content/uploads/2014/02/Duncan-Maru1-1.jpg",
    bio: "Dr. Duncan Maru co-founded Possible and serves as a Board Member, advising on epidemiological research, clinical quality, and community care scaling."
  },
  {
    id: "us-4",
    name: "Kim Lipman-White",
    role: "Board Member",
    image: "https://possiblehealth.org/wp-content/uploads/2018/10/Kim-Photo-1.png",
    bio: "Kim Lipman-White serves as a member of the US Board of Directors, providing oversight and guidance on fundraising and organizational strategy."
  },
  {
    id: "us-3",
    name: "Scott Halliday",
    role: "Board Member & Advisor",
    image: "https://possiblehealth.org/wp-content/uploads/2016/12/scott_308x308-1.jpg",
    bio: "Scott Halliday serves as a board advisor, focusing on system infrastructure, logistics support, and governance compliance."
  },
];

function TeamPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "team-members";

  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
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
    { key: "team-members", label: "Team Members" },
    { key: "us-board", label: "Possible Board - US" },
    { key: "nepal-board", label: "Shambhav (Possible) Board - Nepal" }
  ];

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1">
      {/* Page Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        {/* <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-pink/10 px-3.5 py-1 text-[13px] font-medium text-primary-pink mb-4 uppercase tracking-wider">
          Our Team
        </span> */}
        <h1 className={`h1-hero mb-3 uppercase tracking-wide transition-colors duration-300 ${tabParam === "team-members" ? "text-primary-pink" :
          tabParam === "us-board" ? "text-accent-purple" : "text-secondary-blue"
          }`}>
          {tabParam === "team-members" ? "Team Members" :
            tabParam === "us-board" ? "Possible Board - US" : "Sambhav (Possible) Board - Nepal"}
        </h1>
        <p className="text-subheading text-body-gray font-light">
          Meet the researchers, clinicians, and innovators co-designing care in Nepal.
        </p>
      </div>

      {/* Who We Are Intro (Visible on all tabs, above chips) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-50 p-8 sm:p-10 rounded-3xl border border-zinc-100 mb-12">
        <div className="lg:col-span-7 space-y-6">
          {/* <span className="inline-flex items-center gap-1 bg-primary-pink/10 px-3 py-1 rounded-full text-xs font-semibold text-primary-pink uppercase tracking-wider">
            Who We Are
          </span> */}
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

      {/* Tabs Banner */}
      <div id="team-tabs" className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row overflow-hidden shadow-sm mb-16 rounded-lg border border-zinc-150 scroll-mt-24">
        <button
          onClick={() => router.push("/get-involved/our-team?tab=team-members", { scroll: false })}
          className={`flex-1 py-5 text-center text-white uppercase text-[12.5px] font-bold tracking-wider transition-all relative cursor-pointer bg-primary-pink ${tabParam === "team-members" ? "opacity-100" : "opacity-75 hover:opacity-90"
            }`}
        >
          Team Members
          {tabParam === "team-members" && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-primary-pink z-10" />
          )}
        </button>
        <button
          onClick={() => router.push("/get-involved/our-team?tab=us-board", { scroll: false })}
          className={`flex-1 py-5 text-center text-white uppercase text-[12.5px] font-bold tracking-wider transition-all relative cursor-pointer bg-accent-purple ${tabParam === "us-board" ? "opacity-100" : "opacity-75 hover:opacity-90"
            }`}
        >
          Possible Board - US
          {tabParam === "us-board" && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-accent-purple z-10" />
          )}
        </button>
        <button
          onClick={() => router.push("/get-involved/our-team?tab=nepal-board", { scroll: false })}
          className={`flex-1 py-5 text-center text-white uppercase text-[12.5px] font-bold tracking-wider transition-all relative cursor-pointer bg-secondary-blue ${tabParam === "nepal-board" ? "opacity-100" : "opacity-75 hover:opacity-90"
            }`}
        >
          Sambhav (Possible) Board - Nepal
          {tabParam === "nepal-board" && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-secondary-blue z-10" />
          )}
        </button>
      </div>

      <div className="space-y-16 animate-in fade-in duration-300">
        {/* Team Roster Grid */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-light text-zinc-950 uppercase tracking-wider">
              {tabs.find(t => t.key === tabParam)?.label}
            </h2>
            <div className="h-0.5 w-16 bg-primary-pink mx-auto mt-3 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {activeMembers.map((member) => (
              <div
                key={member.id}
                className="group relative flex flex-col items-center p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm hover:shadow-md hover:border-primary-pink/30 transition-all duration-300 overflow-hidden h-[290px]"
              >
                {/* Default Card View */}
                <div className="flex flex-col items-center h-full justify-center transition-all duration-300 group-hover:scale-95">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-50 shadow-sm transition-all duration-300 group-hover:border-primary-pink/20 mb-4 bg-zinc-100">
                    <Image
                      src={getMemberImage(member)}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 128px, 128px"
                      onError={() => handleImageError(member.id)}
                    />
                  </div>
                  <h4 className="text-[15px] font-semibold text-zinc-900 text-center line-clamp-1">
                    {member.name}
                  </h4>
                  <p className="text-[12.5px] text-body-gray font-light text-center mt-1 line-clamp-1">
                    {member.role}
                  </p>
                  <span className="mt-3 text-[11px] font-medium text-secondary-blue">
                    Hover for bio &rarr;
                  </span>
                </div>

                {/* Hover Details Overlay */}
                <div className={`absolute inset-0 p-5 flex flex-col justify-center items-center text-white opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 rounded-2xl select-none pointer-events-none ${
                  tabParam === "team-members" ? "bg-primary-pink/95" :
                  tabParam === "us-board" ? "bg-accent-purple/95" : "bg-secondary-blue/95"
                }`}>
                  <h4 className="text-[14px] font-bold text-center mb-0.5 line-clamp-1">
                    {member.name}
                  </h4>
                  <span className="text-[10px] text-white/80 uppercase tracking-wider font-semibold text-center mb-3 line-clamp-1">
                    {member.role}
                  </span>
                  <div className="w-8 h-[1px] bg-white/30 mb-3 shrink-0"></div>
                  <p className="text-[11.5px] leading-relaxed text-center font-light line-clamp-[6] text-white/90">
                    {member.bio}
                  </p>
                </div>
              </div>
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
