"use client";

import { Handshake } from "lucide-react";

export default function CollaboratorsPartnersPage() {
  const collaborators = [
    "Ministry of Health and Food Safety",
    "Department of Health Services, divisions and centers, Nepal",
    "Nepal Health Research Council",
    "World Health Organization",
    "Chandragiri Municipality; Bardibas Municipality, Nepal",
    "Dhulikhel Hospital, Kathmandu University Hospital",
    "Bhimeshwor Municipality; Tamakoshi Rural Municipality; Baiteshwor Rural Municipality; Kalinchowk Rural Municipality, Dolakha, Nepal",
    "Women’s Rehabilitation Centre (WOREC)",
    "Nepal Disabled Women Association",
    "Nyaya Health Nepal",
    "National Institutes of Health, USA",
    "University of California San Francisco",
    "Wheaton College",
    "Yale University",
    "Arnhold Institute for Global Health at Icahn School of Medicine at Mt. Sinai",
    "University of Connecticut",
    "University of California, Los Angeles",
    "Community Health Impact Coalition",
    "SunyaEk",
    "Dalit Lives Matters",
    "Transcultural Psychosocial Organization Nepal (TPO Nepal)",
    "Blue Diamond Society",
    "Fusemachines Inc.",
    "Weiss Asset Management Foundation",
    "AutismCare Nepal Society",
    "Hope Child Development Center",
    "SVRI",
  ];

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1">
      {/* Page Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-purple/10 px-3.5 py-1 text-[13px] font-medium text-accent-purple mb-4 uppercase tracking-wider">
          Our Network
        </span>
        <h1 className="h1-hero text-zinc-950 mb-3 uppercase tracking-wide">
          Our Collaborators & Partners
        </h1>
        <p className="text-subheading text-body-gray font-light">
          We work in close cooperation with government agencies, national advocacy groups, and global health research universities.
        </p>
      </div>

      <div className="animate-in fade-in duration-300">
        <div className="p-8 sm:p-10 bg-white border border-zinc-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
          {/* Partner List in clearly visible font and list format */}
          <ul className="grid grid-cols-1 gap-4 list-none pl-0">
            {collaborators.map((partner, pIdx) => (
              <li
                key={pIdx}
                className="flex items-center gap-4 px-6 py-4 bg-zinc-50 border border-zinc-100 hover:border-primary-pink/30 hover:bg-zinc-100/50 rounded-2xl transition-all duration-200"
              >
                <div className="h-2 w-2 rounded-full bg-primary-pink shrink-0" />
                <span className="text-[16px] sm:text-[18px] font-semibold text-zinc-900 tracking-wide">
                  {partner}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
