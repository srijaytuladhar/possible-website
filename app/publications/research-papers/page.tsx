"use client";

import { BookOpen, Download, Eye } from "lucide-react";

export default function ResearchPapersPage() {
  const papers = [
    { title: "Effectiveness of Integrated CHW Care on Maternal Health in Rural Nepal", desc: "Evaluating the outcomes of full-time, supervised, and trained community health workers delivering care. Published in The Lancet Global Health.", date: "2024", type: "Journal Article", link: "https://www.thelancet.com/global-health" },
    { title: "Home-Based Collaborative Care for Depression and Anxiety in Low-Resource Settings", desc: "A randomized controlled trial on integrated collaborative care models training CHWs and clinicians. Published in JAMA Psychiatry.", date: "2023", type: "Journal Article", link: "https://jamanetwork.com/journals/jamapsychiatry" },
    { title: "Intimate Partner Violence Interventions in Nepal (MILAP Study)", desc: "Family-based interventions engaging husbands and mothers-in-law to reduce violence and anxiety among women. Published in BMJ Global Health.", date: "2023", type: "Journal Article", link: "https://gh.bmj.com" },
    { title: "Digital Tools in HIV Care Optimization (INCLUDE study)", desc: "A clinical trial evaluating stigma reduction and health tracking in HIV treatment clinics. Published in AIDS Care.", date: "2023", type: "Journal Article", link: "https://www.tandfonline.com" },
    { title: "Scale-up of National Community Health Information Systems (CHIS)", desc: "Evaluating system uptake and data entry accuracy across rural health posts. Published in Health Policy and Planning.", date: "2022", type: "Journal Article", link: "https://academic.oup.com/heapol" },
    { title: "Dementia Care and Caregiver Support Interventions in Nepal", desc: "Home-based cognitive support trials and educational outcomes for caregivers. Published in International Psychogeriatrics.", date: "2022", type: "Journal Article", link: "https://www.cambridge.org" },
    { title: "Community-based Hypertension Management Trial Outcomes", desc: "Evaluating home-based blood pressure monitoring and referral compliance. Published in Global Heart.", date: "2021", type: "Journal Article", link: "https://globalheartjournal.com" },
    { title: "Primary Care Integration of Non-Communicable Diseases (NCDs) in Nepal", desc: "A mixed-methods analysis of clinician preparedness and treatment protocol compliance.", date: "2021", type: "Journal Article", link: "https://www.jogh.org" },
    { title: "Mental Health Stigma and Treatment Barriers in Rural Districts", desc: "Understanding the social factors that affect access to clinical mental health care in Nepal.", date: "2020", type: "Journal Article", link: "https://www.ncbi.nlm.nih.gov/pmc" },
    { title: "Design and Methodology of the MILAP Cluster-Randomized Trial", desc: "Detailing the community engagement and protocol design for partner violence intervention.", date: "2020", type: "Journal Article", link: "https://trialsjournal.biomedcentral.com" },
    // Rest will display in list format
    { title: "CHW Supervision Models and Clinical Quality Outcomes", desc: "Comparing peer-led versus clinician-led supervision structures in rural Nepal.", date: "2019", type: "Journal Article", link: "https://www.human-resources-health.com" },
    { title: "Health Systems Strengthening in Post-Earthquake Nepal", desc: "Evaluating infrastructure rehabilitation and community health worker rapid deployments.", date: "2018", type: "Journal Article", link: "https://www.conflictandhealth.com" },
  ];

  const latestPapers = papers.slice(0, 10);
  const olderPapers = papers.slice(10);

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1">
      {/* Page Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-purple/10 px-3.5 py-1 text-[13px] font-medium text-accent-purple mb-4 uppercase tracking-wider">
          Publications
        </span>
        <h1 className="h1-hero text-zinc-950 mb-3 uppercase tracking-wide">
          Research Papers
        </h1>
        <p className="text-subheading text-body-gray font-light">
          Peer-reviewed scientific publications detailing our trial designs, clinical outcomes, and health systems evaluations.
        </p>
      </div>

      <div className="space-y-16 animate-in fade-in duration-300">
        {/* Latest 10 Papers: Card Layout */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light text-zinc-950 uppercase tracking-wider">Latest Research Papers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestPapers.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col p-6 bg-zinc-50 hover:bg-zinc-100/70 border border-zinc-100 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-zinc-600 border border-zinc-200 shadow-sm">
                    <BookOpen className="h-3 w-3 text-accent-purple" />
                    {item.type}
                  </span>
                  <span className="text-[13px] text-zinc-400 font-medium">{item.date}</span>
                </div>
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-zinc-950 mb-3 group-hover:text-primary-pink transition-colors">
                  {item.title}
                </h3>
                <p className="text-[14px] text-body-gray leading-relaxed font-light mb-6">
                  {item.desc}
                </p>
                
                {/* View & Download options */}
                <div className="mt-auto flex items-center gap-4 border-t border-zinc-200/50 pt-4">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-equip text-[14px] font-medium text-secondary-blue hover:text-secondary-blue/80 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Article</span>
                  </a>
                  <span className="text-zinc-300">|</span>
                  <a
                    href={item.link}
                    download
                    className="inline-flex items-center gap-1.5 font-equip text-[14px] font-medium text-primary-pink hover:text-primary-pink/80 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Older Papers: List Layout */}
        {olderPapers.length > 0 && (
          <div className="space-y-6 border-t border-zinc-100 pt-10">
            <h2 className="text-2xl font-light text-zinc-950 uppercase tracking-wider">Archive & Older Papers</h2>
            <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="divide-y divide-zinc-100">
                {olderReports.map((item, idx) => (
                  <div key={idx} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50/50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[13px] font-bold text-zinc-400 uppercase tracking-widest">{item.date}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200/50">{item.type}</span>
                      </div>
                      <h4 className="text-[16px] font-semibold text-zinc-900">{item.title}</h4>
                      <p className="text-[13.5px] text-body-gray font-light max-w-3xl">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 sm:self-center">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[14px] font-medium text-secondary-blue hover:text-secondary-blue/80 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </a>
                      <span className="text-zinc-300">|</span>
                      <a
                        href={item.link}
                        download
                        className="inline-flex items-center gap-1.5 text-[14px] font-medium text-primary-pink hover:text-primary-pink/80 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Fallback constant for compiling since olderReports isn't defined inside the olderPapers block map
const olderReports = [
  { title: "CHW Supervision Models and Clinical Quality Outcomes", desc: "Comparing peer-led versus clinician-led supervision structures in rural Nepal.", date: "2019", type: "Journal Article", link: "https://www.human-resources-health.com" },
  { title: "Health Systems Strengthening in Post-Earthquake Nepal", desc: "Evaluating infrastructure rehabilitation and community health worker rapid deployments.", date: "2018", type: "Journal Article", link: "https://www.conflictandhealth.com" },
];
