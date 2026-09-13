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
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-14 flex flex-col flex-1 bg-white">
      {/* Page Header with elegant thin serif font */}
      <div className="mb-14 text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-serif font-light text-4xl sm:text-5xl md:text-6xl text-zinc-900 tracking-wide uppercase">
          Our Collaborators
        </h1>
        <div className="h-0.5 w-16 bg-primary-pink mx-auto rounded-full" />
      </div>

      <div className="animate-in fade-in duration-300 max-w-5xl mx-auto w-full">
        {/* Refined editorial partner treatment */}
        <div className="flex flex-wrap gap-3.5 sm:gap-4 justify-center items-center max-w-4xl mx-auto">
          {collaborators.map((partner, pIdx) => (
            <span
              key={pIdx}
              className="inline-flex items-center text-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[14px] sm:text-[15px] font-normal text-zinc-800 bg-zinc-50/90 border border-zinc-200/80 shadow-2xs hover:border-primary-pink/50 hover:bg-white hover:text-zinc-950 hover:shadow-xs transition-all duration-300 cursor-default"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
