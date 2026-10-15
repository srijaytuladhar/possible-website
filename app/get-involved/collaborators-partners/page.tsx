"use client";

import { useMemo } from "react";

export default function CollaboratorsPage() {
  const governmentCategory = useMemo(() => ({
    category: "Government and multilateral",
    partners: [
      "Ministry of Health and Food Safety (MoHFS)",
      "Nursing and Social Security Division",
      "Epidemiology and Disease Control Division",
      "National Center for AIDS and STD Control",
      "Nepal Health Research Council",
      "World Health Organization",
      "Chandragiri Municipality",
      "Bardibas Municipality",
      "Bhimeshwor Municipality (Dolakha)",
      "Tamakoshi Rural Municipality (Dolakha)",
      "Baiteshwor Rural Municipality (Dolakha)",
      "Kalinchowk Rural Municipality (Dolakha)"
    ]
  }), []);

  const academicCategory = useMemo(() => ({
    category: "Academic",
    partners: [
      "Dhulikhel Hospital, Kathmandu University Hospital",
      "University of California, San Francisco",
      "University of California, Los Angeles",
      "University of Connecticut",
      "Yale University",
      "Wheaton College",
      "Arnhold Institute for Global Health, Icahn School of Medicine at Mount Sinai",
      "Community Health Impact Coalition",
      "NAAMI- Nepal Applied Mathematics and Informatics Institute for research",
      "SunyaEk"
    ]
  }), []);

  const communityCategory = useMemo(() => ({
    category: "Community and civil society",
    partners: [
      "Women's Rehabilitation Centre (WOREC)",
      "Nepal Disabled Women Association",
      "Transcultural Psychosocial Organization Nepal (TPO Nepal)",
      "Blue Diamond Society",
      "Dalit Lives Matter",
      "GHAR"
    ]
  }), []);

  const institutionalCategory = useMemo(() => ({
    category: "Institutional and funding partners",
    partners: [
      "Possible US",
      "Weiss Asset Management Foundation",
      "Deerfield Foundation",
      "National Institutes of Health"
    ]
  }), []);

  // Pre-mapping to balance the numbers visually (2 categories per column)
  const col1Categories = [governmentCategory, academicCategory];
  const col2Categories = [communityCategory, institutionalCategory];

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 md:py-16 flex flex-col flex-1 bg-white">
      {/* Page Header */}
      <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
        <h1 className="h1-hero text-zinc-950 uppercase tracking-wide">
          Collaborators
        </h1>
        <div className="h-1 w-16 bg-primary-pink mx-auto mt-4 rounded-full" />
      </div>

      {/* Categorized Bulleted Lists in Responsive Grid within styled container */}
      <div className="animate-in fade-in duration-300 w-full">
        <div className="bg-zinc-50/70 border border-zinc-200/70 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* First Column */}
            <div className="space-y-12">
              {col1Categories.map((catData) => (
                <div key={catData.category} className="space-y-6">
                  {/* Category Heading */}
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-zinc-950">
                      {catData.category}
                    </h2>
                    <div className="h-0.5 w-12 bg-primary-pink rounded-full shrink-0" />
                  </div>
                  {/* Category List */}
                  <ul className="flex flex-col gap-y-4">
                    {catData.partners.map((partner, pIdx) => (
                      <li
                        key={`${catData.category}-p-${pIdx}`}
                        className="flex items-start gap-3.5 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-primary-pink mt-2.5 shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="text-[15.5px] sm:text-[16.5px] text-zinc-800 font-light leading-relaxed group-hover:text-zinc-950 transition-colors">
                          {partner}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Second Column */}
            <div className="space-y-12">
              {col2Categories.map((catData) => (
                <div key={catData.category} className="space-y-6">
                  {/* Category Heading */}
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-zinc-950">
                      {catData.category}
                    </h2>
                    <div className="h-0.5 w-12 bg-primary-pink rounded-full shrink-0" />
                  </div>
                  {/* Category List */}
                  <ul className="flex flex-col gap-y-4">
                    {catData.partners.map((partner, pIdx) => (
                      <li
                        key={`${catData.category}-p-${pIdx}`}
                        className="flex items-start gap-3.5 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-primary-pink mt-2.5 shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="text-[15.5px] sm:text-[16.5px] text-zinc-800 font-light leading-relaxed group-hover:text-zinc-950 transition-colors">
                          {partner}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}