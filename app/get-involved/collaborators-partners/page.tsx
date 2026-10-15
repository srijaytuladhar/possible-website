"use client";

import { useMemo } from "react";

export default function CollaboratorsPage() {
  const categories = useMemo(
    () => [
      {
        title: "Government and Multilateral",
        partners: [
          "Ministry of Health and Food Safety (MoHFS), GoN",
          "Department of Health Services, MoHFS, GoN",
          "Nursing and Social Security Division, DoHS, MoHFS, GoN",
          "Epidemiology and Disease Control Division, DoHS, MoHFS, GoN",
          "National Centre for AIDS & STD Control, MoHFS, GoN",
          "Nepal Health Research Council, GoN",
          "World Health Organization (WHO)",
          "Chandragiri Municipality, Chandragiri",
          "Bardibas Municipality, Mahottari",
          "Bhimeshwor Municipality, Dolakha",
          "Tamakoshi Rural Municipality, Dolakha",
          "Baiteshwor Rural Municipality, Dolakha",
          "Kalinchowk Rural Municipality, Dolakha",
        ],
      },
      {
        title: "Academic",
        partners: [
          "Dhulikhel Hospital, Kathmandu University Hospital",
          "Kathmandu University School of Medical Sciences",
          "University of California San Francisco, USA",
          "University of California Los Angeles, USA",
          "University of Connecticut, USA",
          "Yale University, USA",
          "Wheaton College, USA",
          "Arnhold Institute for Global Health at Icahn School of Medicine at Mt. Sinai, USA",
          "Community Health Impact Coalition",
          "NAAMI- Nepal Applied Mathematics and Informatics Institute for research",
          "SunyaEk",
          "Fusemachines",
          "Sexual Violence Research Initiative (SVRI)",
        ],
      },
      {
        title: "Community and Civil Society",
        partners: [
          "Women's Rehabilitation Centre (WOREC)",
          "Nepal Disabled Women Association",
          "Transcultural Psychosocial Organization Nepal (TPO Nepal)",
          "Blue Diamond Society",
          "Dalit Lives Matter",
          "GHAR",
          "Nyaya Health Nepal",
          "AutismCare Nepal Society",
          "Hope Child Development Center",
        ],
      },
      {
        title: "Institutional and Funding Partners",
        partners: [
          "Possible US",
          "Weiss Asset Management, USA",
          "Deerfield Foundation, USA",
          "National Institutes of Health, USA",
        ],
      },
    ],
    []
  );

  return (
    <div className="mx-auto max-w-4xl w-full px-6 sm:px-8 py-12 md:py-16 flex flex-col bg-white">
      {/* Page Header (Middle Aligned) */}
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="h1-hero text-zinc-950 uppercase tracking-wide">
          Collaborators
        </h1>
        <div className="h-1 w-16 bg-primary-pink mt-4 rounded-full mx-auto" />
      </div>

      {/* Left-Aligned Vertical Card Stack */}
      <div className="w-full space-y-10">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="bg-zinc-50/80 border border-zinc-200/70 rounded-3xl p-8 sm:p-10 shadow-xs text-left flex flex-col items-start hover:border-zinc-300 transition-all duration-300"
          >
            {/* Category Title in Pink */}
            <div className="mb-6 flex flex-col items-start">
              <h2 className="text-xl sm:text-2xl font-bold text-primary-pink uppercase tracking-wide">
                {cat.title}
              </h2>
              <div className="h-0.5 w-12 bg-primary-pink/30 rounded-full mt-2.5" />
            </div>

            {/* Left-Aligned Partners List */}
            <ul className="w-full flex flex-col items-start space-y-3.5">
              {cat.partners.map((partner, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-left group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-pink mt-2.5 shrink-0 group-hover:scale-125 transition-transform" />
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
  );
}