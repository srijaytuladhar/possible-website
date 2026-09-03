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
      {/* Page Header without 'Our Network' badge and subtitle per PDF Page 5 */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="h1-hero text-zinc-950 uppercase tracking-wide">
          Our Collaborators & Partners
        </h1>
      </div>

      <div className="animate-in fade-in duration-300 max-w-5xl mx-auto w-full">
        {/* Partner List in justified pill badges without card outline and without hover effect per PDF Page 5 */}
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {collaborators.map((partner, pIdx) => (
            <span
              key={pIdx}
              className="inline-flex items-center px-4.5 py-2.5 rounded-full text-[13.5px] sm:text-[14.5px] font-semibold bg-secondary-blue/10 text-secondary-blue border border-secondary-blue/20 shadow-xs cursor-default text-left"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
