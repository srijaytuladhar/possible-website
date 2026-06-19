"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen, Eye } from "lucide-react";

export default function ResearchPapersPage() {
  const papers = [
    { title: "Effectiveness of Integrated CHW Care on Maternal Health in Rural Nepal", desc: "Evaluating the outcomes of full-time, supervised, and trained community health workers delivering care. Published in The Lancet Global Health.", date: "2024", type: "Journal Article", link: "https://www.thelancet.com/global-health", cover: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Home-Based Collaborative Care for Depression and Anxiety in Low-Resource Settings", desc: "A randomized controlled trial on integrated collaborative care models training CHWs and clinicians. Published in JAMA Psychiatry.", date: "2023", type: "Journal Article", link: "https://jamanetwork.com/journals/jamapsychiatry", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Intimate Partner Violence Interventions in Nepal (MILAP Study)", desc: "Family-based interventions engaging husbands and mothers-in-law to reduce violence and anxiety among women. Published in BMJ Global Health.", date: "2023", type: "Journal Article", link: "https://gh.bmj.com", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Digital Tools in HIV Care Optimization (INCLUDE study)", desc: "A clinical trial evaluating stigma reduction and health tracking in HIV treatment clinics. Published in AIDS Care.", date: "2023", type: "Journal Article", link: "https://www.tandfonline.com", cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Scale-up of National Community Health Information Systems (CHIS)", desc: "Evaluating system uptake and data entry accuracy across rural health posts. Published in Health Policy and Planning.", date: "2022", type: "Journal Article", link: "https://academic.oup.com/heapol", cover: "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Dementia Care and Caregiver Support Interventions in Nepal", desc: "Home-based cognitive support trials and educational outcomes for caregivers. Published in International Psychogeriatrics.", date: "2022", type: "Journal Article", link: "https://www.cambridge.org", cover: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Community-based Hypertension Management Trial Outcomes", desc: "Evaluating home-based blood pressure monitoring and referral compliance. Published in Global Heart.", date: "2021", type: "Journal Article", link: "https://globalheartjournal.com", cover: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Primary Care Integration of Non-Communicable Diseases (NCDs) in Nepal", desc: "A mixed-methods analysis of clinician preparedness and treatment protocol compliance.", date: "2021", type: "Journal Article", link: "https://www.jogh.org", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Mental Health Stigma and Treatment Barriers in Rural Districts", desc: "Understanding the social factors that affect access to clinical mental health care in Nepal.", date: "2020", type: "Journal Article", link: "https://www.ncbi.nlm.nih.gov/pmc", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Design and Methodology of the MILAP Cluster-Randomized Trial", desc: "Detailing the community engagement and protocol design for partner violence intervention.", date: "2020", type: "Journal Article", link: "https://trialsjournal.biomedcentral.com", cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&h=350&q=80" },
    // Archive items
    { title: "CHW Supervision Models and Clinical Quality Outcomes", desc: "Comparing peer-led versus clinician-led supervision structures in rural Nepal.", date: "2019", type: "Journal Article", link: "https://www.human-resources-health.com", cover: "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Health Systems Strengthening in Post-Earthquake Nepal", desc: "Evaluating infrastructure rehabilitation and community health worker rapid deployments.", date: "2018", type: "Journal Article", link: "https://www.conflictandhealth.com", cover: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Evaluating Community-Based Maternal Health Interventions", desc: "Detailed review of health indicator shifts over a three-year implementation period.", date: "2018", type: "Journal Article", link: "https://www.thelancet.com", cover: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Feasibility of Mobile Health Applications for CHWs in Achham", desc: "Assessing user interface comprehension and offline synchronization speeds.", date: "2017", type: "Journal Article", link: "https://www.jogh.org", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Decentralized Healthcare Delivery Models: A Comparative Analysis", desc: "Evaluating public-private partnership models in primary healthcare networks.", date: "2017", type: "Journal Article", link: "https://gh.bmj.com", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Developing Clinical Protocols for Rural Nepalese Health Posts", desc: "Standardizing diagnostic criteria and medication lists for non-communicable illness.", date: "2016", type: "Journal Article", link: "https://academic.oup.com/heapol", cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Cardiovascular Disease Screenings at the Community Level", desc: "Outlining cost-effective diagnostic tools for hypertensive patient registries.", date: "2016", type: "Journal Article", link: "https://globalheartjournal.com", cover: "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Depression and Anxiety Screenings: Implementing PHQ-9 in Primary Care", desc: "Validating translated mental health screening questions for rural districts.", date: "2015", type: "Journal Article", link: "https://jamanetwork.com", cover: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Community Mental Health Programs: Stakeholder Perspectives", desc: "Qualitative analysis of stigma, local healer networks, and clinical access.", date: "2015", type: "Journal Article", link: "https://www.cambridge.org", cover: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Pediatric Primary Care Guidelines in Remote Municipalities", desc: "Standardizing nutritional and infectious treatment programs for CHWs.", date: "2014", type: "Journal Article", link: "https://www.thelancet.com", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Epidemiological Assessments in Mid-Western Nepal", desc: "Baseline metrics of childhood respiratory and diarrheal illness in Achham.", date: "2013", type: "Journal Article", link: "https://www.ncbi.nlm.nih.gov", cover: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=350&q=80" },
    { title: "Initial Trial Design for Integrated Community Care Models", desc: "Outlining the cluster-randomized protocols for the original 2012 pilot study.", date: "2012", type: "Journal Article", link: "https://trialsjournal.biomedcentral.com", cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&h=350&q=80" }
  ];

  const latestPapers = papers.slice(0, 10);
  const olderPapers = papers.slice(10);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(olderPapers.length / itemsPerPage);
  const paginatedOlderPapers = olderPapers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {latestPapers.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row justify-between p-6 bg-zinc-50 hover:bg-zinc-100/70 border border-zinc-100 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md gap-6"
              >
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-zinc-600 border border-zinc-200 shadow-sm">
                        <BookOpen className="h-3 w-3 text-accent-purple" />
                        {item.type}
                      </span>
                      <span className="text-[13px] text-zinc-400 font-medium">{item.date}</span>
                    </div>
                    <h3 className="text-[17px] sm:text-[19px] font-semibold text-zinc-950 mb-3 group-hover:text-primary-pink transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[13.5px] text-body-gray leading-relaxed font-light mb-6">
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* View Article option */}
                  <div className="mt-auto pt-4 border-t border-zinc-200/50">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-equip text-[13.5px] font-semibold text-secondary-blue hover:text-secondary-blue/80 transition-colors bg-secondary-blue/10 px-4 py-2 rounded-xl"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Article</span>
                    </a>
                  </div>
                </div>

                {/* Card Cover Image on the right */}
                <div className="relative h-40 w-full sm:w-44 rounded-xl overflow-hidden bg-zinc-200/50 border border-zinc-200/50 shrink-0 self-center">
                  <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 200px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Older Papers: List Layout with Pagination */}
        {olderPapers.length > 0 && (
          <div className="space-y-6 border-t border-zinc-100 pt-10">
            <h2 className="text-2xl font-light text-zinc-950 uppercase tracking-wider">Archive & Older Papers</h2>
            <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="divide-y divide-zinc-100">
                {paginatedOlderPapers.map((item, idx) => (
                  <div key={idx} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-zinc-50/50 transition-colors">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[13px] font-bold text-zinc-400 uppercase tracking-widest">{item.date}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200/50">{item.type}</span>
                      </div>
                      <h4 className="text-[16px] font-semibold text-zinc-900">{item.title}</h4>
                      <p className="text-[13.5px] text-body-gray font-light max-w-3xl">{item.desc}</p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 self-start sm:self-center">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-secondary-blue hover:text-secondary-blue/80 transition-colors bg-secondary-blue/10 px-4 py-2 rounded-xl"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View Article</span>
                      </a>
                      
                      {/* Thumbnail Cover Image on the right of the row */}
                      <div className="relative h-14 w-20 rounded overflow-hidden bg-zinc-100 border border-zinc-200/60 hidden md:block shrink-0">
                        <Image
                          src={item.cover}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      currentPage === page
                        ? "bg-zinc-950 text-white"
                        : "border border-zinc-200 hover:bg-zinc-50 text-zinc-600"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
