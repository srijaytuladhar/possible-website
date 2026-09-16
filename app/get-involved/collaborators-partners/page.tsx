"use client";

import Image from "next/image";
import { useState } from "react";
import { Building2 } from "lucide-react";

interface Collaborator {
  name: string;
  logo?: string;
}

export default function CollaboratorsPage() {
  // Collaborators list: logo files to be attached when provided by client
  const collaborators: Collaborator[] = [
    { name: "Ministry of Health and Food Safety", logo: undefined },
    { name: "Department of Health Services", logo: undefined },
    { name: "Nursing and Social Security Division", logo: undefined },
    { name: "Epidemiology and Disease Control Division", logo: undefined },
    { name: "National Centre for AIDS & STD Control", logo: undefined },
    { name: "Nepal Health Research Council", logo: undefined },
    { name: "Social Welfare Council", logo: undefined },
    { name: "World Health Organization", logo: undefined },
    { name: "Dhulikhel Hospital, Kathmandu University Hospital", logo: undefined },
    { name: "Kathmandu University School of Medical Sciences", logo: undefined },
    { name: "Chandragiri Municipality, Chandragiri", logo: undefined },
    { name: "Bardibas Municipality, Mahottari", logo: undefined },
    { name: "Bhimeshwor Municipality, Dolakha", logo: undefined },
    { name: "Tamakoshi Rural Municipality, Dolakha", logo: undefined },
    { name: "Baiteshwor Rural Municipality, Dolakha", logo: undefined },
    { name: "Kalinchowk Rural Municipality, Dolakha", logo: undefined },
    { name: "Women's Rehabilitation Centre (WOREC)", logo: undefined },
    { name: "Nepal Disabled Women Association", logo: undefined },
    { name: "Nyaya Health Nepal", logo: undefined },
    { name: "National Institutes of Health, USA", logo: undefined },
    { name: "University of California San Francisco", logo: undefined },
    { name: "Wheaton College", logo: undefined },
    { name: "Yale University", logo: undefined },
    { name: "Arnhold Institute for Global Health at Icahn School of Medicine at Mt. Sinai", logo: undefined },
    { name: "University of Connecticut", logo: undefined },
    { name: "University of California, Los Angeles", logo: undefined },
    { name: "Community Health Impact Coalition", logo: undefined },
    { name: "SunyaEk", logo: undefined },
    { name: "Dalit Lives Matters", logo: undefined },
    { name: "Transcultural Psychosocial Organization Nepal (TPO Nepal)", logo: undefined },
    { name: "Blue Diamond Society", logo: undefined },
  ];

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 md:py-16 flex flex-col flex-1 bg-white">
      {/* Page Header */}
      <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto space-y-4">
        <h1 className="h1-hero text-zinc-950 uppercase tracking-wide">
          Collaborators
        </h1>
        <div className="h-1 w-16 bg-primary-pink mx-auto rounded-full" />
        <p className="text-subheading text-zinc-600 font-light max-w-2xl mx-auto pt-2">
          We collaborate with government ministries, international institutions, academic medical centers, and grassroots advocacy organizations.
        </p>
      </div>

      {/* Two-Column Layout (Column 1: Photo/Logo, Column 2: Collaborator Name — One Row Per Collaborator) */}
      <div className="animate-in fade-in duration-300 max-w-4xl mx-auto w-full">
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-4 sm:p-8 shadow-xs divide-y divide-zinc-100">
          {collaborators.map((partner, pIdx) => (
            <CollaboratorRow key={pIdx} partner={partner} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CollaboratorRow({ partner }: { partner: Collaborator }) {
  const [imgError, setImgError] = useState(false);

  // Extract initials for fallback avatar (e.g. "Ministry of Health..." -> "MH")
  const initials = partner.name
    .split(/\s+/)
    .filter((w) => w.length > 2 && !["and", "for", "the", "with"].includes(w.toLowerCase()))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <div className="py-4 sm:py-5 px-3 sm:px-4 flex items-center gap-4 sm:gap-6 hover:bg-zinc-50/80 rounded-2xl transition-all duration-200 group">
      {/* Column 1: Photo / Logo Container */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-zinc-200/80 bg-zinc-100/80 shrink-0 overflow-hidden relative flex items-center justify-center shadow-2xs group-hover:border-primary-pink/30 group-hover:scale-102 transition-all">
        {partner.logo && !imgError ? (
          <Image
            src={partner.logo}
            alt={partner.name}
            fill
            className="object-contain p-2"
            sizes="64px"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-zinc-400 select-none">
            {initials ? (
              <span className="text-[13px] sm:text-[14px] font-bold text-zinc-500 tracking-wider group-hover:text-primary-pink transition-colors">
                {initials}
              </span>
            ) : (
              <Building2 className="h-6 w-6 text-zinc-400 group-hover:text-primary-pink transition-colors" />
            )}
          </div>
        )}
      </div>

      {/* Column 2: Collaborator Name */}
      <div className="flex-1">
        <h3 className="text-[15.5px] sm:text-[17px] font-medium text-zinc-800 leading-snug group-hover:text-zinc-950 transition-colors">
          {partner.name}
        </h3>
      </div>
    </div>
  );
}
