"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Users, MessageSquareQuote, X } from "lucide-react";

export default function OurTeamPage() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [imageFallbacks, setImageFallbacks] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/teamData.json')
      .then(res => res.json())
      .then(data => setTeamMembers(data))
      .catch(err => console.error("Error loading team data:", err));
  }, []);

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

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1">
      {/* Page Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-pink/10 px-3.5 py-1 text-[13px] font-medium text-primary-pink mb-4 uppercase tracking-wider">
          Our Team
        </span>
        <h1 className="h1-hero text-zinc-950 mb-3 uppercase tracking-wide">
          Meet the People
        </h1>
        <p className="text-subheading text-body-gray font-light">
          Meet the researchers, clinicians, and innovators co-designing care in Nepal.
        </p>
      </div>

      <div className="space-y-16 animate-in fade-in duration-300">
        {/* Who We Are Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-50 p-8 sm:p-10 rounded-3xl border border-zinc-100">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1 bg-primary-pink/10 px-3 py-1 rounded-full text-xs font-semibold text-primary-pink uppercase tracking-wider">
              Who We Are
            </span>
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

        {/* Team Roster Grid - Cleaner and More Organized */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-light text-zinc-950 uppercase tracking-wider">Our Leadership & Staff</h2>
            <div className="h-0.5 w-16 bg-primary-pink mx-auto mt-3 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="group relative flex flex-col items-center p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm hover:shadow-md hover:border-primary-pink/30 transition-all duration-300 cursor-pointer"
              >
                <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-zinc-50 shadow-sm transition-all duration-300 group-hover:border-primary-pink/30 group-hover:scale-105 mb-4 bg-zinc-100">
                  <Image
                    src={getMemberImage(member)}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 144px, 144px"
                    onError={() => handleImageError(member.id)}
                  />
                </div>
                <h4 className="text-[16px] font-semibold text-zinc-900 text-center group-hover:text-primary-pink transition-colors">
                  {member.name}
                </h4>
                <p className="text-[13px] text-body-gray font-light text-center mt-1">
                  {member.role}
                </p>
                <span className="mt-4 text-[12px] font-medium text-secondary-blue group-hover:underline">
                  View Bio &rarr;
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Voices Testimonial Block */}
        <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-100 flex flex-col md:flex-row items-start gap-6 relative overflow-hidden">
          <div className="p-3 bg-white border border-zinc-200/50 rounded-xl text-primary-pink w-fit z-10 shrink-0">
            <MessageSquareQuote className="h-6 w-6" />
          </div>
          <div className="space-y-4 z-10">
            <blockquote className="text-[16px] italic leading-relaxed text-zinc-800 font-light">
              &ldquo;Designing care systems in Nepal requires humility, respect, and scientific rigor. Our team lives these values every day, ensuring that evidence-based health innovation is accessible in the most remote areas.&rdquo;
            </blockquote>
            <cite className="block not-italic">
              <span className="block text-[14px] font-semibold text-zinc-900">Dr. Rita Thapa</span>
              <span className="block text-[13px] text-body-gray font-light">Lead Health Systems Researcher</span>
            </cite>
          </div>
          <div className="absolute right-0 bottom-0 text-zinc-100 opacity-20 -mr-6 -mb-6 z-0">
            <Users className="h-40 w-40" />
          </div>
        </div>
      </div>

      {/* Team Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative border border-zinc-100">
            <div className="relative h-48 w-full bg-zinc-100">
              <Image
                src={getMemberImage(selectedMember)}
                alt={selectedMember.name}
                fill
                className="object-cover"
                onError={() => handleImageError(selectedMember.id)}
              />
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-zinc-900 rounded-full shadow-sm transition-colors z-10 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-semibold text-zinc-900 mb-1">{selectedMember.name}</h3>
              <p className="text-[14px] font-medium text-primary-pink mb-4">{selectedMember.role}</p>
              <div className="w-12 h-1 bg-zinc-200 rounded-full mb-4"></div>
              <p className="text-[15px] text-body-gray font-light leading-relaxed">
                {selectedMember.bio}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
