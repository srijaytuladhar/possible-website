"use client";

export default function CollaboratorsPage() {
  const governmentCollaborators = [
    "Ministry of Health and Food Safety, GoN",
    "Department of Health Services, MoHFS, GoN",
    "Nursing and Social Security Division, DoHS, MoHFS, GoN",
    "Epidemiology and Disease Control Division, DoHS, MoHFS, GoN",
    "National Centre for AIDS & STD Control, MoHFS, GoN",
    "Nepal Health Research Council, GoN",
    "Social Welfare Council, GoN",
    "Chandragiri Municipality, Chandragiri",
    "Bardibas Municipality, Mahottari",
    "Bhimeshwor Municipality, Dolakha",
    "Tamakoshi Rural Municipality, Dolakha",
    "Baiteshwor Rural Municipality, Dolakha",
    "Kalinchowk Rural Municipality, Dolakha",
    "National Institutes of Health, USA",
  ];

  const nonGovernmentCollaborators = [
    "World Health Organization",
    "Dhulikhel Hospital, Kathmandu University Hospital",
    "Kathmandu University School of Medical Sciences",
    "Women's Rehabilitation Centre (WOREC)",
    "Nepal Disabled Women Association",
    "Nyaya Health Nepal",
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
      <div className="animate-in fade-in duration-300 w-full">
        <div className="bg-zinc-50/70 border border-zinc-200/70 rounded-3xl p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Government Column */}
            <div>
              <h2 className="text-lg font-bold text-primary-pink uppercase tracking-wider mb-6 border-b border-zinc-200 pb-3">
                Government
              </h2>
              <ul className="flex flex-col gap-y-4">
                {governmentCollaborators.map((partner, pIdx) => (
                  <li
                    key={`gov-${pIdx}`}
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

            {/* Non-Government Column */}
            <div>
              <h2 className="text-lg font-bold text-primary-pink uppercase tracking-wider mb-6 border-b border-zinc-200 pb-3">
                Non-Government
              </h2>
              <ul className="flex flex-col gap-y-4">
                {nonGovernmentCollaborators.map((partner, pIdx) => (
                  <li
                    key={`non-gov-${pIdx}`}
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
      </div>
    </div>
  );
}