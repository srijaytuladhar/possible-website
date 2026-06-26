"use client";

import { useState, useMemo } from "react";
import { Sparkles, Compass } from "lucide-react";
import { NepalMap, DISTRICT_NAMES } from "nepal-district-map";

export default function InteractivePresenceMap() {
  const districts = useMemo(() => [
    {
      id: "surkhet",
      name: "Surkhet",
      number: 1,
      region: "Karnali Province",
      stats: [
        { label: "Clinicians Trained", value: "30+" },
        { label: "Posts Supported", value: "12" },
        { label: "Population Reached", value: "15,000+" }
      ],
      projects: [
        "Collaborative Care Model for Mental Health Care Integration",
        "Primary Care Clinician Mental Health Identification Training",
        "Community Mental Health Referral Network trials"
      ],
      desc: "In Surkhet, we evaluate collaborative care protocols for depression and anxiety within primary care structures, empowering local clinicians through structured training.",
      color: "from-rose-500 to-pink-600",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-100"
    },
    {
      id: "rupandehi",
      name: "Rupandehi",
      number: 2,
      region: "Lumbini Province",
      stats: [
        { label: "Health Posts", value: "15" },
        { label: "Clinicians Trained", value: "18+" },
        { label: "Population Reached", value: "10,000+" }
      ],
      projects: [
        "Pediatric Care Capacity Building and Provider Support",
        "Maternal and Neonatal Health Service Quality Audits",
        "Local Government Health Systems Strategy Development"
      ],
      desc: "Our Rupandehi project bridges resource gaps by supporting local municipalities in strategic health planning and elevating the quality of pediatric primary care.",
      color: "from-rose-500 to-pink-600",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-100"
    },
    {
      id: "bara",
      name: "Bara",
      number: 3,
      region: "Madhesh Province",
      stats: [
        { label: "CHWs Active", value: "18" },
        { label: "EHR Installations", value: "4" },
        { label: "Registry Entries", value: "5,000+" }
      ],
      projects: [
        "Electronic Health Records (EHR) Implementation and Pilot",
        "Digital Healthcare Registry System Infrastructure",
        "Community Health Worker Digitization and Monitoring"
      ],
      desc: "In Bara, we pilot secure cloud-hosted EHR frameworks to streamline clinical workflows and optimize patient follow-ups at municipal health posts.",
      color: "from-rose-500 to-pink-600",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-100"
    },
    {
      id: "kathmandu",
      name: "Kathmandu",
      number: 4,
      region: "Bagmati Province",
      stats: [
        { label: "Core Staff", value: "24" },
        { label: "Research Studies", value: "6+" },
        { label: "Policy Briefs", value: "National" }
      ],
      projects: [
        "National Health Policy Brief Translation & Advocacy",
        "Informatics and CHIS Cloud Infrastructure Hub",
        "Research Design, Ethics, and Trial Management Center"
      ],
      desc: "Our Kathmandu Valley hub houses our leadership, data systems engineering, policy advocacy teams, and coordinates global research partnerships.",
      color: "from-rose-500 to-pink-600",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-100"
    },
    {
      id: "bhaktapur",
      name: "Bhaktapur",
      number: 5,
      region: "Bagmati Province",
      stats: [
        { label: "CHWs Trained", value: "20+" },
        { label: "Patients Enrolled", value: "8,000+" },
        { label: "Referral Rate", value: "94%" }
      ],
      projects: [
        "Community-based Chronic Disease Care (NCD Screenings)",
        "Hypertension & Type 2 Diabetes Management Protocols",
        "Home-based Screening and Early Detection Systems"
      ],
      desc: "In Bhaktapur, our programs leverage digital screening dashboards operated by Community Health Workers to manage chronic diseases directly at home.",
      color: "from-rose-500 to-pink-600",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-100"
    },
    {
      id: "lalitpur",
      name: "Lalitpur",
      number: 6,
      region: "Bagmati Province",
      stats: [
        { label: "Researchers", value: "12" },
        { label: "Pilot Clinics", value: "3" },
        { label: "Studies Started", value: "3" }
      ],
      projects: [
        "Mental Health registry trials and software evaluations",
        "Digital health dashboard co-design workshops",
        "Public health system optimization research studies"
      ],
      desc: "Lalitpur serves as a key site for clinical registry evaluations, working directly with local health clinics to improve digital intake processes.",
      color: "from-rose-500 to-pink-600",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-100"
    },
    {
      id: "dolakha",
      name: "Dolakha",
      number: 7,
      region: "Bagmati Province",
      stats: [
        { label: "Clinicians Trained", value: "25+" },
        { label: "Rehabbed Posts", value: "5" },
        { label: "Dementia Cases", value: "150+" }
      ],
      projects: [
        "Integrated Post-Earthquake Health Post Rehabilitation",
        "Dementia Behavioral Support and Caregiver Education Trials",
        "Intimate Partner Violence Support Services (MILAP Study)"
      ],
      desc: "In Dolakha, we rehabilitate infrastructure and test community support interventions for dementia caregivers and survivors of intimate partner violence.",
      color: "from-rose-500 to-pink-600",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-100"
    },
    {
      id: "sarlahi",
      name: "Sarlahi",
      number: 8,
      region: "Madhesh Province",
      stats: [
        { label: "Advocates", value: "14" },
        { label: "Local NGOs", value: "5" },
        { label: "Workshops Held", value: "40+" }
      ],
      projects: [
        "Community Advocacy Groups against Domestic Violence",
        "MILAP Intimate Partner Violence Support Expansion",
        "Sensitization Workshops for Local Health Committees"
      ],
      desc: "Sarlahi centers around the MILAP study, scaling community advocacy networks and training health committees to identify and support survivors.",
      color: "from-rose-500 to-pink-600",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-100"
    },
    {
      id: "mahottari",
      name: "Mahottari",
      number: 9,
      region: "Madhesh Province",
      stats: [
        { label: "CHWs Engaged", value: "40+" },
        { label: "Population Reached", value: "20,000+" },
        { label: "Digital Devices", value: "45" }
      ],
      projects: [
        "Community Health Information System (CHIS) Pilot & Scale-up",
        "Integrated Reproductive and Neonatal Health Monitoring",
        "Data-driven Resource Allocation for Local Clinics"
      ],
      desc: "In Mahottari, CHWs utilize digital tablets to log and sync real-time neonatal data, streamlining local healthcare resource distribution.",
      color: "from-rose-500 to-pink-600",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-100"
    },
    {
      id: "udayapur",
      name: "Udayapur",
      number: 10,
      region: "Koshy Province",
      stats: [
        { label: "Health Posts", value: "6" },
        { label: "CHWs Trained", value: "15" },
        { label: "Patients Screened", value: "3,500+" }
      ],
      projects: [
        "Non-Communicable Disease (NCD) Tracking Systems",
        "Clinical Referral Optimization Frameworks",
        "Hypertension Screening Campaign Coordination"
      ],
      desc: "Udayapur acts as a testing bed for NCD screening campaigns, ensuring patients flagged with high blood pressure are quickly referred to tertiary care.",
      color: "from-rose-500 to-pink-600",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-100"
    },
    {
      id: "sunsari",
      name: "Sunsari",
      number: 11,
      region: "Koshi Province",
      stats: [
        { label: "CHWs Active", value: "22" },
        { label: "Patients Reached", value: "12,000+" },
        { label: "Training Cycles", value: "6" }
      ],
      projects: [
        "Primary Care Integration & Collaborative Care Registries",
        "Digital Health Dashboard Optimization Studies",
        "Community-driven HIV Care Stigma Reduction Pilots"
      ],
      desc: "Sunsari runs active trials for integrated primary care and collaborative care registries, improving coordination between community health workers and local facilities.",
      color: "from-rose-500 to-pink-600",
      badgeColor: "bg-rose-50 text-rose-600 border-rose-100"
    }
  ], []);

  const [activeDistrictId, setActiveDistrictId] = useState("kathmandu");

  const activeDistrict = useMemo(() => {
    return districts.find((d) => d.id === activeDistrictId) || districts[3]; // Default to Kathmandu
  }, [districts, activeDistrictId]);

  // Map of district name -> data configuration for nepal-district-map
  const mapData = useMemo(() => {
    const data: Record<string, { color: string; value: number; tooltip: string }> = {};
    districts.forEach((d) => {
      data[d.name] = {
        color: d.id === activeDistrictId ? "#DE1D7C" : "#DE1D7C", // Match the highlighted pink/magenta style
        value: d.number,
        tooltip: `${d.number}. ${d.name}`
      };
    });
    return data;
  }, [districts, activeDistrictId]);

  // Labels override to show only numbers for our 11 highlighted districts
  const shortNames = useMemo(() => {
    const names: Record<string, string> = {};
    // Populate all districts with empty label by default
    DISTRICT_NAMES.forEach((name) => {
      names[name] = "";
    });
    // Set numbers only for our 11 districts
    districts.forEach((d) => {
      names[d.name] = String(d.number);
    });
    return names;
  }, [districts]);

  return (
    <section className="py-20 bg-zinc-50 border-y border-zinc-100 px-6 sm:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.15] pointer-events-none" />
      <div className="mx-auto max-w-7xl relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-blue/10 px-3.5 py-1 text-[13px] font-semibold text-secondary-blue mb-4 uppercase tracking-wider">
            Where We Work
          </span> */}
          <h2 className="h2-section text-zinc-950 mb-4 uppercase tracking-wide">
            Innovation and Implementation Sites
          </h2>
          <p className="text-body text-body-gray font-light">
            We operate and conduct research in collaboration with local governments across Nepal. Hover or click on the highlighted districts below to learn more about our implementation sites.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Map Column (Left 7) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-100 shadow-sm flex flex-col justify-between relative min-h-[500px]">

            {/* Interactive geographic presence label & pulsing status */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] text-zinc-400 uppercase tracking-widest font-bold">Innovation & Implementation Sites</span>
              </div>

              {/* Compass Rose icon */}
              <div className="flex flex-col items-center text-zinc-400 opacity-60">
                <span className="text-[10px] font-bold tracking-widest leading-none mb-0.5">N</span>
                <Compass className="h-5 w-5 animate-spin-slow" />
              </div>
            </div>

            {/* Stylized Interactive Nepal Map Wrapper */}
            <div className="relative w-full flex-1 flex items-center justify-center my-2 nepal-district-map-container">
              <NepalMap
                data={mapData}
                colorMode="flat"
                baseColor="#00B2E2" // Cyan/blue background for all other districts
                strokeColor="#ffffff" // White borders between districts
                strokeWidth={1}
                hoverColor="#FFD600"
                highlightedDistricts={[activeDistrict.name]}
                highlightColor="#ffffff"
                showLabels={true}
                labelFontSize={12}
                labelColor="#ffffff" // White labels for numbers
                shortNames={shortNames}
                showTooltip={true}
                renderTooltip={(districtName) => {
                  const matched = districts.find((d) => d.name === districtName);
                  if (matched) {
                    return (
                      <div className="px-2 py-1.5 text-xs font-semibold text-white bg-zinc-900 rounded shadow-md border border-zinc-800">
                        {matched.number}. {matched.name}
                      </div>
                    );
                  }
                  return (
                    <div className="px-2 py-1 text-xs text-zinc-400 bg-zinc-900 rounded shadow-md">
                      {districtName}
                    </div>
                  );
                }}
                onDistrictClick={(name) => {
                  const matched = districts.find((d) => d.name === name);
                  if (matched) {
                    setActiveDistrictId(matched.id);
                  }
                }}
                className="w-full h-auto drop-shadow-md select-none"
                maxHeight="420px"
              />
            </div>

            {/* Implementation Sites Legend Table (Bottom Left of Map) */}
            <div className="mt-6 border border-zinc-200 rounded-xl overflow-hidden max-w-lg shadow-sm">
              <div className="bg-zinc-800 text-white text-[11.5px] font-bold px-3 py-2 uppercase tracking-wide">
                Innovation and Implementation Sites
              </div>
              <div className="grid grid-cols-2 bg-zinc-100 text-[11px] text-zinc-800 font-medium">
                {/* Column 1 (Sites 1-6) */}
                <div className="border-r border-zinc-200 division-y">
                  {districts.slice(0, 6).map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setActiveDistrictId(d.id)}
                      className={`w-full text-left px-3.5 py-1.5 transition-colors border-b border-zinc-200 hover:bg-zinc-200/50 flex items-center gap-2 ${activeDistrictId === d.id ? "bg-rose-50 text-rose-700 font-bold" : ""
                        }`}
                    >
                      <span className={`inline-flex items-center justify-center h-4 w-4 rounded text-[9px] font-bold ${activeDistrictId === d.id ? "bg-rose-600 text-white" : "bg-zinc-300 text-zinc-700"
                        }`}>{d.number}</span>
                      <span>{d.name}</span>
                    </button>
                  ))}
                </div>
                {/* Column 2 (Sites 7-11) */}
                <div className="division-y">
                  {districts.slice(6).map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setActiveDistrictId(d.id)}
                      className={`w-full text-left px-3.5 py-1.5 transition-colors border-b border-zinc-200 hover:bg-zinc-200/50 flex items-center gap-2 ${activeDistrictId === d.id ? "bg-rose-50 text-rose-700 font-bold" : ""
                        }`}
                    >
                      <span className={`inline-flex items-center justify-center h-4 w-4 rounded text-[9px] font-bold ${activeDistrictId === d.id ? "bg-rose-600 text-white" : "bg-zinc-300 text-zinc-700"
                        }`}>{d.number}</span>
                      <span>{d.name}</span>
                    </button>
                  ))}
                  {/* Empty spacer for alignment */}
                  <div className="px-3.5 py-1.5 bg-zinc-50 border-b border-zinc-200 text-zinc-300 select-none">
                    &nbsp;
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Details Column (Right 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white p-8 sm:p-10 rounded-3xl border border-zinc-100 shadow-sm transition-all duration-500 relative">
            {/* Color Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 to-pink-600 rounded-t-3xl" />

            <div className="space-y-6">
              <div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${activeDistrict.badgeColor}`}>
                  {activeDistrict.region}
                </span>
                <div className="flex items-center gap-3 mt-3">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-rose-600 text-white font-bold text-sm shadow-sm">
                    {activeDistrict.number}
                  </span>
                  <h3 className="text-[24px] sm:text-[28px] font-bold text-zinc-900 leading-tight">
                    {activeDistrict.name}
                  </h3>
                </div>
              </div>

              <p className="text-[14.5px] text-body-gray leading-relaxed font-light">
                {activeDistrict.desc}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 border-y border-zinc-100 py-6">
                {activeDistrict.stats.map((stat, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <span className="block text-[22px] sm:text-[24px] font-bold text-zinc-900 tracking-tight">{stat.value}</span>
                    <span className="block text-[11px] text-zinc-400 uppercase font-semibold mt-0.5 leading-snug">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Active Solutions List */}
              <div className="space-y-3">
                <h4 className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest">Active Solutions</h4>
                <ul className="space-y-2.5">
                  {activeDistrict.projects.map((proj, i) => (
                    <li key={i} className="flex gap-2 items-start text-[13.5px] text-zinc-800 leading-relaxed font-light">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-600 mt-2 shrink-0"></span>
                      <span>{proj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-zinc-100 flex justify-between items-center">
              <span className="text-[12px] font-bold text-zinc-400 uppercase tracking-wider">Operational Status</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                Active Research Site
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

