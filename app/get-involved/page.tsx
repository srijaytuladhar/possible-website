"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Users, Briefcase, ChevronRight, MessageSquareQuote, Layers, HelpCircle, X } from "lucide-react";

function GetInvolvedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialTab = searchParams.get("tab") || "our-team";
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  useEffect(() => {
    fetch('/teamData.json')
      .then(res => res.json())
      .then(data => setTeamMembers(data))
      .catch(err => console.error("Error loading team data:", err));
  }, []);

  // Update state if search param changes
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
    router.push(`/get-involved?tab=${tabKey}`, { scroll: false });
  };

  const tabs = [
    { id: "our-team", label: "Our Team & Process", icon: Users },
    { id: "work-with-us", label: "Work With Us", icon: Briefcase },
  ];

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1">
      {/* Page Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h1 className="h1-hero text-zinc-950 mb-3 uppercase tracking-wide">
          Get Involved
        </h1>
        <p className="text-subheading text-body-gray font-light">
          Meet the researchers, clinicians, and innovators co-designing care in Nepal, and discover opportunities to join our mission.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-zinc-100 overflow-x-auto scrollbar-none gap-2 mb-8 justify-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 font-equip text-[15px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "border-primary-pink text-primary-pink"
                  : "border-transparent text-body-gray hover:text-primary-pink hover:border-zinc-200"
              }`}
            >
              <Icon className="h-4.5 w-4.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div className="flex-1 min-h-[40vh]">
        {/* OUR TEAM TAB */}
        {activeTab === "our-team" && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Who We Are Intro */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
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
              <div className="lg:col-span-5 relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
                <Image
                  src="/about_team.png"
                  alt="Possible Team Collaborating"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
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

            {/* Team Roster Block */}
            <div className="pt-12 border-t border-zinc-100">
              <div className="mb-8 text-center">
                <span className="inline-flex items-center gap-1 bg-primary-pink/10 px-3 py-1 rounded-full text-xs font-semibold text-primary-pink uppercase tracking-wider mb-2">
                  Our Team
                </span>
                <h3 className="h2-section text-zinc-950 uppercase tracking-wide">
                  Meet the People
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-col items-center group cursor-pointer"
                    onClick={() => setSelectedMember(member)}
                  >
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-zinc-50 shadow-sm transition-all duration-300 group-hover:border-primary-pink/30 group-hover:shadow-md mb-4 bg-zinc-100 flex items-center justify-center">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => { (e.target as any).style.display = 'none'; }}
                      />
                    </div>
                    <h4 className="text-[16px] font-semibold text-zinc-900 text-center group-hover:text-primary-pink transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-[13px] text-body-gray font-light text-center">
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WORK WITH US TAB */}
        {activeTab === "work-with-us" && (
          <div className="space-y-10 animate-in fade-in duration-300">
            {/* Career Block Philosophy */}
            <div className="p-8 bg-zinc-900 text-white rounded-2xl border border-zinc-800">
              <div className="max-w-2xl space-y-4">
                <span className="text-[13px] font-bold text-secondary-blue uppercase tracking-widest">Our DNA</span>
                <h3 className="h2-section text-white font-extralight uppercase tracking-wide">
                  Rigor. Respect. Results.
                </h3>
                <p className="text-[15px] text-zinc-400 font-light leading-relaxed">
                  We are defined by fierce rigor and deep respect. We build sustainable, science-backed solutions that prioritize regional context and localized expertise to generate real results.
                </p>
              </div>
            </div>

            {/* Competencies Grid */}
            <div className="space-y-6">
              <h3 className="h3-card text-zinc-950 font-semibold flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary-pink" />
                <span>Accelerated Learning Curve</span>
              </h3>
              <p className="text-[14px] text-body-gray font-light max-w-2xl">
                Our organization empowers personnel with deep operational, clinical, and strategic capabilities across key core competencies:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    title: "Policy Translation",
                    desc: "Bridging academic implementation data and policy drafts for governmental entities.",
                  },
                  {
                    title: "Tech-Enabled Systems",
                    desc: "Deploying and managing data-driven workflows using our custom CHIS platforms.",
                  },
                  {
                    title: "Global Funding",
                    desc: "Navigating international grant compliance and cultivating donor networks.",
                  },
                  {
                    title: "Co-Design",
                    desc: "Engaging in participatory development directly with local leaders and NGOs.",
                  },
                ].map((comp, idx) => (
                  <div key={idx} className="p-5 border border-zinc-100 bg-zinc-50 rounded-xl hover:border-primary-pink/35 transition-colors duration-300">
                    <h4 className="text-[14px] font-semibold text-zinc-900 mb-2 uppercase tracking-wide">{comp.title}</h4>
                    <p className="text-[13px] text-body-gray font-light leading-relaxed">{comp.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trainee Program & Posting Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-4">
              {/* Program Policy */}
              <div className="p-6 border border-zinc-200/80 rounded-2xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="p-2 bg-zinc-100 text-zinc-700 rounded-lg w-fit">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <h4 className="text-[16px] font-semibold text-zinc-900">Volunteer & Trainee Policy</h4>
                  <p className="text-[14px] text-body-gray font-light leading-relaxed">
                    We do not accept volunteers. To ensure reciprocal value, we offer limited trainee programs for up to one-year postings, providing a small stipend and direct mentorship support from our lead investigators.
                  </p>
                </div>
              </div>

              {/* Action Links */}
              <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl flex flex-col justify-center space-y-4">
                <h4 className="text-[16px] font-semibold text-zinc-900 mb-2">Available Openings</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => alert("There are currently no active job postings. Please check back later or subscribe to our newsletter.")}
                    className="w-full flex items-center justify-between px-5 py-3.5 bg-white border border-zinc-200 hover:border-primary-pink rounded-xl text-[14px] text-zinc-800 font-medium hover:text-primary-pink transition-all duration-300 text-left group cursor-pointer"
                  >
                    <span>View Open Job Postings</span>
                    <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-primary-pink transition-transform group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => alert("Trainee applications are currently closed. Next cohort opens in Fall 2026.")}
                    className="w-full flex items-center justify-between px-5 py-3.5 bg-white border border-zinc-200 hover:border-secondary-blue rounded-xl text-[14px] text-zinc-800 font-medium hover:text-secondary-blue transition-all duration-300 text-left group cursor-pointer"
                  >
                    <span>View Trainee Applications</span>
                    <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-secondary-blue transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Team Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative">
            <div className="relative h-48 w-full bg-zinc-100">
              <Image
                src={selectedMember.image}
                alt={selectedMember.name}
                fill
                className="object-cover"
                onError={(e) => { (e.target as any).style.display = 'none'; }}
              />
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-zinc-900 rounded-full shadow-sm transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-8">
              <h3 className="h3-card text-zinc-900 mb-1">{selectedMember.name}</h3>
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

export default function GetInvolvedPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-pink"></div>
      </div>
    }>
      <GetInvolvedContent />
    </Suspense>
  );
}
