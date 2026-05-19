"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FileText, Award, BookOpen, BarChart3, Users, ExternalLink, Download } from "lucide-react";

// Separate search params logic to wrap in Suspense
function PublicationsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialTab = searchParams.get("tab") || "impact-report";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Update state if search param changes (e.g. from navbar clicks)
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
    router.push(`/publications?tab=${tabKey}`, { scroll: false });
  };

  const tabs = [
    { id: "impact-report", label: "Impact Reports", icon: BarChart3 },
    { id: "research-paper", label: "Research Papers", icon: BookOpen },
    { id: "research-brief", label: "Research Briefs", icon: FileText },
    { id: "financials", label: "Financials", icon: Award },
    { id: "collaborators", label: "Collaborators", icon: Users },
  ];

  // Collaborators split into blocks
  const collaboratorBlocks = [
    {
      title: "Governmental & National Advocacy Partners",
      desc: "Working alongside federal authorities and human rights associations in Nepal to drive systemic policy translation.",
      list: [
        "Ministry of Health and Population Nepal",
        "Nepal Health Research Council (NHRC)",
        "WOREC (Women's Rehabilitation Center) Nepal",
        "Nepal Disabled Women Association (NDWA)",
        "Blue Diamond Society",
        "Transcultural Psychosocial Organization (TPO) Nepal",
        "Nyaya Health Nepal",
      ],
    },
    {
      title: "Global Health Agencies & Academic Institutions",
      desc: "Partnering with global research universities and institutions to design, test, and validate clinical implementation models.",
      list: [
        "World Health Organization (WHO)",
        "National Institutes of Health (NIH) USA",
        "University of California, San Francisco (UCSF)",
        "Yale University",
        "University of California, Los Angeles (UCLA)",
      ],
    },
  ];

  // Reports data
  const publicationsData = {
    "impact-report": [
      {
        title: "Integrated Community Care Impact Assessment",
        desc: "An evaluation of maternal health care delivery, showing progress in prenatal care adherence and child nutrition monitoring across rural districts.",
        link: "#",
        type: "PDF Report",
        date: "2024",
      },
      {
        title: "Annual Health Innovation Report",
        desc: "A summary of pilot milestones, co-design activities, digital health integrations, and system scalability reviews.",
        link: "#",
        type: "PDF Report",
        date: "2023",
      },
    ],
    "research-paper": [
      {
        title: "Effectiveness of Integrated CHW Care on Maternal Health in Rural Nepal",
        desc: "Evaluating the outcomes of full-time, supervised, and trained community health workers delivering care. Published in The Lancet Global Health.",
        link: "https://www.thelancet.com/global-health",
        type: "Journal Article",
        date: "2024",
      },
      {
        title: "Home-Based Collaborative Care for Depression and Anxiety in Low-Resource Settings",
        desc: "A study on integrated collaborative care models training CHWs and clinicians to treat mental health in primary care. Published in JAMA Psychiatry.",
        link: "https://jamanetwork.com/journals/jamapsychiatry",
        type: "Journal Article",
        date: "2023",
      },
      {
        title: "Intimate Partner Violence Interventions in Nepal (MILAP Study)",
        desc: "Family-based interventions engaging husbands and mothers-in-law to reduce violence and anxiety among women. Published in BMJ Global Health.",
        link: "https://gh.bmj.com",
        type: "Journal Article",
        date: "2023",
      },
    ],
    "research-brief": [
      {
        title: "Policy Brief: Strengthening Nepal's Community Health System",
        desc: "A translation of community health worker implementation findings into national guideline suggestions for the Ministry of Health.",
        link: "#",
        type: "Brief",
        date: "2024",
      },
      {
        title: "Digital Health Brief: Lessons from CHIS Implementation",
        desc: "Key takeaways regarding the training and scaling of mobile community health information tools in rural primary care.",
        link: "#",
        type: "Brief",
        date: "2023",
      },
    ],
    financials: [
      {
        title: "Fiscal Year 2024 Financial Statements",
        desc: "Audited financial statements detailing funding sources (global grants, private donations) and program expenditures.",
        link: "#",
        type: "Audited Report",
        date: "2024",
      },
      {
        title: "Annual Tax Filings (Form 990)",
        desc: "Possible US IRS tax filings showing transparent non-profit operations.",
        link: "#",
        type: "Tax Filing",
        date: "2023",
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1">
      {/* Page Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h1 className="h1-hero text-zinc-950 mb-3 uppercase tracking-wide">
          Publications & Partners
        </h1>
        <p className="text-subheading text-body-gray font-light">
          Access our research publications, policy briefs, impact reports, and learn about our collaborative ecosystem.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-zinc-100 overflow-x-auto scrollbar-none gap-2 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 font-equip text-[15px] font-medium transition-all whitespace-nowrap cursor-pointer ${
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
        {/* Publications Tabs */}
        {activeTab !== "collaborators" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {publicationsData[activeTab as keyof typeof publicationsData]?.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col p-6 bg-zinc-50 hover:bg-zinc-100/70 border border-zinc-100 rounded-xl transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-zinc-600 border border-zinc-200 shadow-sm">
                    {item.type}
                  </span>
                  <span className="text-[13px] text-zinc-400 font-medium">{item.date}</span>
                </div>
                <h3 className="h3-card text-zinc-950 mb-3 font-semibold group-hover:text-primary-pink transition-colors">
                  {item.title}
                </h3>
                <p className="text-[14px] text-body-gray leading-relaxed font-light mb-6">
                  {item.desc}
                </p>
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 font-equip text-[14px] font-medium text-secondary-blue hover:text-secondary-blue/80 transition-colors w-fit"
                >
                  <span>{item.link.startsWith("http") ? "View Journal Article" : "Download PDF"}</span>
                  {item.link.startsWith("http") ? (
                    <ExternalLink className="h-3.5 w-3.5" />
                  ) : (
                    <Download className="h-3.5 w-3.5" />
                  )}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Collaborators Tab */}
        {activeTab === "collaborators" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {collaboratorBlocks.map((block, idx) => (
              <div key={idx} className="p-8 bg-zinc-50 border border-zinc-100 rounded-2xl">
                <h3 className="h3-card text-zinc-950 font-semibold mb-2">{block.title}</h3>
                <p className="text-[14px] text-body-gray font-light mb-6 max-w-2xl">{block.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {block.list.map((partner) => (
                    <div
                      key={partner}
                      className="px-4 py-3 bg-white border border-zinc-200/60 rounded-xl text-[14px] text-zinc-800 font-medium text-center flex items-center justify-center hover:border-primary-pink/30 hover:shadow-sm transition-all duration-300"
                    >
                      {partner}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PublicationsPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-pink"></div>
      </div>
    }>
      <PublicationsContent />
    </Suspense>
  );
}
