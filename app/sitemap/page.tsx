import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function SitemapPage() {
  const siteStructure = [
    {
      title: "Main Navigation",
      links: [
        { name: "Home", href: "/" },
        { name: "Contact Us", href: "/contact-us" },
        { name: "Donate", href: "/donate" },
      ]
    },
    {
      title: "Our Solutions",
      links: [
        { name: "Solutions Hub (All Phases)", href: "/solutions" },
        { name: "1. Scale (Longitudinal Health System, Collaborative Care)", href: "/solutions/scale" },
        { name: "2. Test (Tested for Scale & Designed to Test)", href: "/solutions/test" },
        { name: "3. Innovate (CASA, Disability SRHR)", href: "/solutions/innovate" },
        { name: "4. Pipeline (School Mental Health, AI Supportive Supervision)", href: "/solutions/pipeline" },
      ]
    },
    {
      title: "Team & Engagement",
      links: [
        { name: "Our Team", href: "/get-involved/our-team" },
        { name: "Collaborators", href: "/get-involved/collaborators-partners" },
        { name: "Work With Us", href: "/get-involved/work-with-us" },
      ]
    },
    {
      title: "Newsroom & Publications",
      links: [
        { name: "News Updates", href: "/news" },
        { name: "Annual Impact Reports (AIR)", href: "/publications/impact-reports" },
        { name: "Financial Disclosures & COI", href: "/publications/financials" },
      ]
    },
    {
      title: "Policies & Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Use", href: "/terms-of-use" },
      ]
    }
  ];

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-14 flex flex-col flex-1 bg-white">
      <div className="mb-12 text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-pink/10 px-4 py-1 text-[13px] font-semibold text-primary-pink uppercase tracking-wider shadow-sm">
          <Sparkles className="h-3.5 w-3.5" />
          Navigation Map
        </span>
        <h1 className="h1-hero text-zinc-950 uppercase tracking-wide">
          Site Map
        </h1>
        <p className="text-subheading text-body-gray font-light">
          Overview of all public pages, research pipelines, reports, and accountability documents across Possible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {siteStructure.map((category, idx) => (
          <div key={idx} className="p-6 bg-zinc-50 border border-zinc-200/70 rounded-3xl space-y-4 shadow-xs">
            <h3 className="text-[16px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-2">
              {category.title}
            </h3>
            <ul className="space-y-2.5">
              {category.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-[14px] text-zinc-700 hover:text-primary-pink transition-colors font-medium group"
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-primary-pink transition-colors" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
