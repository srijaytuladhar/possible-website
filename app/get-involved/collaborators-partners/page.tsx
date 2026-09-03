"use client";

export default function CollaboratorsPartnersPage() {
  const collaborators = [
    "Ministry of Health and Food Safety",
    "Department of Health Services, divisions and centers, Nepal",
    "Nepal Health Research Council",
    "World Health Organization",
    "Chandragiri Municipality, Nepal",
    "Bardibas Municipality, Nepal",
    "Dhulikhel Hospital, Kathmandu University Hospital",
    "Bhimeshwor Municipality, Dolakha, Nepal",
    "Tamakoshi Rural Municipality, Dolakha, Nepal",
    "Baiteshwor Rural Municipality, Dolakha, Nepal",
    "Kalinchowk Rural Municipality, Dolakha, Nepal",
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
  ];

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1">
      {/* Page Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="h1-hero text-zinc-950 uppercase tracking-wide">
          Our Collaborators & Partners
        </h1>
      </div>

      <div className="animate-in fade-in duration-300 max-w-5xl mx-auto w-full">
        {/* Attractive Centered & Justified Pill Layout per PDF Page 7 */}
        <div className="flex flex-wrap gap-3.5 justify-center items-center max-w-4xl mx-auto">
          {collaborators.map((partner, pIdx) => (
            <span
              key={pIdx}
              className="inline-flex items-center text-center justify-center px-5 py-2.5 rounded-full text-[13.5px] sm:text-[14.5px] font-medium bg-[#F0F9FD] text-[#0284C7] border border-[#BAE6FD]/80 shadow-2xs transition-colors cursor-default"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
