"use client";

export default function CollaboratorsPage() {
  const collaborators = [
    "Ministry of Health and Food Safety, Government of Nepal",
    "Department of Health Services, Ministry of Health and Food Safety, Government of Nepal",
    "Nursing and Social Security Division, Department of Health Services, Ministry of Health and Food Safety, Government of Nepal",
    "Epidemiology and Disease Control Division, Department of Health Services, Ministry of Health and Food Safety, Government of Nepal",
    "National Centre for AIDS & STD Control, Ministry of Health and Food Safety, Government of Nepal",
    "Nepal Health Research Council, Government of Nepal",
    "Social Welfare Council, Government of Nepal",
    "World Health Organization",
    "Dhulikhel Hospital, Kathmandu University Hospital",
    "Kathmandu University School of Medical Sciences",
    "Chandragiri Municipality, Chandragiri",
    "Bardibas Municipality, Mahottari",
    "Bhimeshwor Municipality, Dolakha",
    "Tamakoshi Rural Municipality, Dolakha",
    "Baiteshwor Rural Municipality, Dolakha",
    "Kalinchowk Rural Municipality, Dolakha",
    "Women's Rehabilitation Centre (WOREC)",
    "Nepal Disabled Women Association",
    "Nyaya Health Nepal",
    "National Institutes of Health, USA",
    "University of California San Francisco, USA",
    "Wheaton College, USA",
    "Yale University, USA",
    "Arnhold Institute for Global Health at Icahn School of Medicine at Mt. Sinai, USA",
    "University of Connecticut, USA",
    "University of California Los Angeles, USA",
    "Community Health Impact Coalition",
    "SunyaEk",
    "Dalit Lives Matters",
    "Transcultural Psychosocial Organization Nepal (TPO Nepal)",
    "Blue Diamond Society",
  ];

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 md:py-16 flex flex-col flex-1 bg-white">
      {/* Page Header */}
      <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
        <h1 className="h1-hero text-zinc-950 uppercase tracking-wide">
          Collaborators
        </h1>
        <div className="h-1 w-16 bg-primary-pink mx-auto mt-4 rounded-full" />
      </div>

      {/* Clean Bulleted List in Responsive 2-Column Grid */}
      <div className="animate-in fade-in duration-300 max-w-4xl mx-auto w-full">
        <div className="bg-zinc-50/70 border border-zinc-200/70 rounded-3xl p-8 sm:p-12 shadow-xs">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {collaborators.map((partner, pIdx) => (
              <li
                key={pIdx}
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
      </div>
    </div>
  );
}
